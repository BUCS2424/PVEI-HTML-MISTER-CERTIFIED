import "@/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import JobGallery from "@/pages/JobGallery";
import Residential from "@/pages/Residential";
import Commercial from "@/pages/Commercial";
import Industrial from "@/pages/Industrial";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";

function App() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/general-contractor-services" element={<About />} />
            <Route path="/construction-services" element={<Services />} />
            <Route path="/handyman-services-in-pasco" element={<Navigate to="/construction-services" replace />} />
            <Route path="/job-gallery" element={<JobGallery />} />
            <Route path="/residential-contracting-services" element={<Residential />} />
            <Route path="/commercial-contracting-services" element={<Commercial />} />
            <Route path="/industrial-infrastructure-contracting" element={<Industrial />} />
            <Route path="/contact-pvei-home-services" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
