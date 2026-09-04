import { partners } from "@/data/siteData";

const PartnersMarquee = () => {
  const doubled = [...partners, ...partners];
  return (
    <div className="overflow-hidden py-2" data-testid="partners-marquee">
      <div className="flex w-max animate-marquee gap-14 items-center">
        {doubled.map((p, idx) => (
          <img
            key={`${p.name}-${idx}`}
            src={p.src}
            alt={`${p.name} \u2014 trusted brand partner`}
            loading="lazy"
            className="h-10 sm:h-12 w-auto object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default PartnersMarquee;
