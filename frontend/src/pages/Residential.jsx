import MarketPage from "@/components/MarketPage";
import { markets } from "@/data/siteData";

const market = markets.find((m) => m.key === "residential");

const Residential = () => <MarketPage market={market} />;

export default Residential;
