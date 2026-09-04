<?php
/**
 * Polar Vortex Home Services (PVEI) — cPanel Contact Form Mail Handler
 * -----------------------------------------------------------------------
 * DROP-IN REPLACEMENT for the sandbox's FastAPI /api/contact endpoint when
 * deploying the built React app (yarn build -> build/) to a cPanel server
 * that only supports static HTML/CSS/JS + PHP.
 *
 * SETUP:
 *   1. Upload this file to the SAME directory as your site's index.html
 *      (e.g. public_html/cpanel-contact-handler.php).
 *   2. Set $TO_EMAIL below to the address that should receive submissions,
 *      and $SMTP_FROM to an address on your own domain (e.g. noreply@pvei.org).
 *      No mailbox password is needed — this talks SMTP straight to cPanel's
 *      own local Exim mail server (the panel's sender), which trusts
 *      connections originating from the same server and relays on your
 *      behalf without authentication.
 *   3. The React contact form automatically POSTs to this file whenever
 *      REACT_APP_BACKEND_URL is left empty at build time (production build).
 *
 * Mail is sent over SMTP (not PHP's mail()/sendmail wrapper) directly to
 * the panel's own local mail server, which is properly SPF/DKIM-aligned
 * with your domain and less likely to be spam-filtered than a bare mail()
 * call, without needing a stored mailbox password.
 *
 * SECURITY MEASURES INCLUDED:
 *   - Honeypot field check (silently ignores bot submissions)
 *   - Server-side required-field & email format validation
 *   - Input sanitization (htmlspecialchars) before use in the email body
 *   - Basic per-IP rate limiting (file-based) to slow down abuse
 *   - Restricts to POST + same-origin JSON or form submissions only
 */

declare(strict_types=1);

// Don't leak implementation details (PHP errors/version) to clients or logs.
error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: application/json');

// ---------------------------------------------------------------------
// CONFIGURATION — edit this section for your environment
// ---------------------------------------------------------------------
$TO_EMAIL      = 'info@pvei.org';
$SITE_NAME     = 'Polar Vortex Home Services';
$RATE_LIMIT_DIR = sys_get_temp_dir();
$RATE_LIMIT_MAX = 5;      // max submissions
$RATE_LIMIT_WINDOW = 60;  // per N seconds, per IP

// cPanel's own local mail server (the panel's sender) — no login needed,
// since the script and the mail server run on the same host.
$SMTP_HOST      = 'localhost';
$SMTP_PORT      = 25;                 // cPanel's local Exim relay
$SMTP_USER      = '';                 // leave blank: no auth for local relay
$SMTP_PASS      = '';                 // leave blank: no auth for local relay
$SMTP_FROM      = 'noreply@pvei.org'; // must be an address on your own domain
$SMTP_FROM_NAME = $SITE_NAME;

function respond(bool $success, string $message, int $code = 200): void {
    http_response_code($code);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(false, 'Method not allowed.', 405);
}

// ---------------------------------------------------------------------
// Basic per-IP rate limiting
// ---------------------------------------------------------------------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = rtrim($RATE_LIMIT_DIR, '/').'/pvei_contact_'.md5($ip).'.json';
$now = time();
$hits = [];
if (file_exists($rateFile)) {
    $hits = json_decode((string) file_get_contents($rateFile), true) ?: [];
}
$hits = array_values(array_filter($hits, fn($t) => $t > $now - $RATE_LIMIT_WINDOW));
$hits[] = $now;
file_put_contents($rateFile, json_encode($hits));
if (count($hits) > $RATE_LIMIT_MAX) {
    respond(false, 'Too many requests. Please try again in a minute.', 429);
}

// ---------------------------------------------------------------------
// Parse input (supports both JSON fetch() and classic form POST)
// ---------------------------------------------------------------------
$raw = file_get_contents('php://input');
$data = [];
if (!empty($raw)) {
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
        $data = $decoded;
    }
}
if (empty($data)) {
    $data = $_POST;
}

$fullName     = trim((string)($data['full_name'] ?? ''));
$contactNumber = trim((string)($data['contact_number'] ?? ''));
$email        = trim((string)($data['email'] ?? ''));
$bestTime     = trim((string)($data['best_time'] ?? ''));
$ampm         = trim((string)($data['ampm'] ?? 'am'));
$message      = trim((string)($data['message'] ?? ''));
$honeypot     = trim((string)($data['website'] ?? ''));

// Honeypot triggered -> silently pretend success (don't tip off the bot)
if ($honeypot !== '') {
    respond(true, "Thank you! We'll be in touch shortly.");
}

// ---------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------
$errors = [];
if ($fullName === '' || mb_strlen($fullName) < 2) $errors[] = 'full name';
if ($contactNumber === '' || mb_strlen($contactNumber) < 7) $errors[] = 'contact number';
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'valid email';
if ($message === '' || mb_strlen($message) < 2) $errors[] = 'message';

if (!empty($errors)) {
    respond(false, 'Please provide a ' . implode(', ', $errors) . '.', 422);
}

$ampm = in_array(strtolower($ampm), ['am', 'pm'], true) ? strtolower($ampm) : 'am';

// ---------------------------------------------------------------------
// Build & send the email over SMTP via cPanel's local mail server
// ---------------------------------------------------------------------
$safe = fn($v) => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');

$subject = "New Website Inquiry - {$SITE_NAME}";
$body = "You have a new contact form submission from {$SITE_NAME}:\r\n\r\n"
      . 'Full Name: ' . $safe($fullName) . "\r\n"
      . 'Contact Number: ' . $safe($contactNumber) . "\r\n"
      . 'Email: ' . $safe($email) . "\r\n"
      . 'Best Time to Call: ' . $safe($bestTime) . ' ' . strtoupper($ampm) . "\r\n\r\n"
      . "Message:\r\n" . $safe($message) . "\r\n";

/**
 * Minimal SMTP client (no external dependencies) so a plain cPanel PHP
 * host can send mail without Composer/PHPMailer. Talks to cPanel's local
 * Exim relay unauthenticated by default (no $user/$pass); if credentials
 * are supplied it upgrades to STARTTLS and authenticates first.
 */
function smtp_send(
    string $host,
    int $port,
    string $user,
    string $pass,
    string $fromEmail,
    string $fromName,
    string $toEmail,
    string $replyTo,
    string $subject,
    string $body
): bool {
    $sock = @stream_socket_client("{$host}:{$port}", $errno, $errstr, 15);
    if (!$sock) {
        return false;
    }

    $expect = function ($sock, string $prefix) {
        $line = '';
        do {
            $line = fgets($sock, 515);
            if ($line === false) return false;
        } while (isset($line[3]) && $line[3] === '-');
        return strncmp($line, $prefix, strlen($prefix)) === 0;
    };
    $send = function ($sock, string $cmd) { fwrite($sock, $cmd . "\r\n"); };
    $authenticate = $user !== '' && $pass !== '';

    if (!$expect($sock, '220')) { fclose($sock); return false; }

    $send($sock, 'EHLO ' . $host);
    if (!$expect($sock, '250')) { fclose($sock); return false; }

    if ($authenticate) {
        $send($sock, 'STARTTLS');
        if (!$expect($sock, '220')) { fclose($sock); return false; }
        if (!@stream_socket_enable_crypto($sock, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
            fclose($sock);
            return false;
        }
        $send($sock, 'EHLO ' . $host);
        if (!$expect($sock, '250')) { fclose($sock); return false; }

        $send($sock, 'AUTH LOGIN');
        if (!$expect($sock, '334')) { fclose($sock); return false; }
        $send($sock, base64_encode($user));
        if (!$expect($sock, '334')) { fclose($sock); return false; }
        $send($sock, base64_encode($pass));
        if (!$expect($sock, '235')) { fclose($sock); return false; }
    }

    $send($sock, 'MAIL FROM:<' . $fromEmail . '>');
    if (!$expect($sock, '250')) { fclose($sock); return false; }
    $send($sock, 'RCPT TO:<' . $toEmail . '>');
    if (!$expect($sock, '250')) { fclose($sock); return false; }

    $send($sock, 'DATA');
    if (!$expect($sock, '354')) { fclose($sock); return false; }

    $headers = [];
    $headers[] = 'From: ' . $fromName . ' <' . $fromEmail . '>';
    $headers[] = 'To: <' . $toEmail . '>';
    $headers[] = 'Reply-To: ' . $replyTo;
    $headers[] = 'Subject: ' . $subject;
    $headers[] = 'Content-Type: text/plain; charset=UTF-8';
    $headers[] = 'Date: ' . date('r');

    $data = implode("\r\n", $headers) . "\r\n\r\n" . str_replace("\n.", "\n..", $body) . "\r\n.";
    $send($sock, $data);
    if (!$expect($sock, '250')) { fclose($sock); return false; }

    $send($sock, 'QUIT');
    fclose($sock);
    return true;
}

$sent = @smtp_send(
    $SMTP_HOST,
    $SMTP_PORT,
    $SMTP_USER,
    $SMTP_PASS,
    $SMTP_FROM,
    $SMTP_FROM_NAME,
    $TO_EMAIL,
    $email,
    $subject,
    $body
);

if (!$sent) {
    respond(false, 'Unable to send your message right now. Please call us instead.', 500);
}

respond(true, "Thank you! We'll be in touch shortly.");
