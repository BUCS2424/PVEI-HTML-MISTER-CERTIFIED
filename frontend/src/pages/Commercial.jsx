import MarketPage from "@/components/MarketPage";
import { markets } from "@/data/siteData";

const market = markets.find((m) => m.key === "commercial");

const Commercial = () => <MarketPage market={market} />;

export default Commercial;
