import MarketPage from "@/components/MarketPage";
import { markets } from "@/data/siteData";

const market = markets.find((m) => m.key === "industrial");

const Industrial = () => <MarketPage market={market} />;

export default Industrial;
