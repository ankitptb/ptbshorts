
export interface User {
  name: string;
  email: string;
  avatar: string; // Initials or image URL
}

export type Category =
  | "All"
  | "Real Estate"
  | "Sustainability"
  | "Artificial Intelligence"
  | "Construction"
  | "Market Trends"
  | "Finance";

export interface NewsItem {
  id: string;
  title: string;
  description: string; // Short bullets or text
  imageUrl: string;
  date: string;
  source: string;
  category: Category;
  hashtags: string[];
}

export const currentUser: User = {
  name: "Ankit Yadav",
  email: "ankit@proptechbuzz.com",
  avatar: "A",
};

export const categories: Category[] = [
  "Real Estate",
  "Sustainability",
  "Artificial Intelligence",
  "Construction",
  "Market Trends",
  "Finance",
];

const generateNews = (id: string, category: Category, title: string, desc: string, img: string, date: string): NewsItem => ({
  id,
  title,
  description: desc,
  imageUrl: img,
  date,
  source: "PropTechBuzz",
  category,
  hashtags: ["#" + category.replace(/\s+/g, "").toLowerCase(), "#news"],
});

export const dummyNews: NewsItem[] = [
  // Real Estate
  generateNews("1", "Real Estate", "Visitt raises $22 million Series B to embed AI in commercial property", "Visitt, a proptech platform focused on embedding artificial intelligence into day-to-day commercial property operations, has raised $22 million in Series B funding.", "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop", "2 Jan 2026"),
  generateNews("2", "Real Estate", "London prime property market sees sudden surge", "International buyers returning to London's prime postcodes drive a 12% increase in transactions this quarter.", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop", "3 Jan 2026"),
  generateNews("3", "Real Estate", "NYC office conversions gain momentum", "Developers rush to convert empty Midtown offices into luxury apartments as city offers new tax incentives.", "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000", "4 Jan 2026"),
  generateNews("4", "Real Estate", "Zillow predicts modest growth for 2026 housing", "Analysts suggest a stable year for US housing with a predicted 3.4% appreciation rate nationwide.", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000", "5 Jan 2026"),
  generateNews("5", "Real Estate", "Proptech investment hits 5-year high in Q4", "Venture capital pours into property management software as landlords seek efficiency.", "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000", "6 Jan 2026"),
  generateNews("6", "Real Estate", "Dubai real estate market continues record run", "Luxury villa sales in Palm Jumeirah set new transaction volume records for the third consecutive month.", "https://images.unsplash.com/photo-1512453979798-5ea936a7fe65?auto=format&fit=crop&q=80&w=1000", "7 Jan 2026"),
  generateNews("7", "Real Estate", "Co-living spaces trending in major tech hubs", "Young professionals drive demand for premium co-living arrangements in San Francisco and Berlin.", "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000", "8 Jan 2026"),
  generateNews("8", "Real Estate", "Smart homes become standard for new luxury builds", "Developers report that integrated smart home tech is now a minimum requirement for premium listings.", "https://images.unsplash.com/photo-1558002038-1091a16606f3?auto=format&fit=crop&q=80&w=1000", "9 Jan 2026"),
  generateNews("9", "Real Estate", "Rental yields tighten across European capitals", "Rising property prices outpace rental growth in Paris, Madrid, and Rome.", "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000", "10 Jan 2026"),
  generateNews("10", "Real Estate", "Virtual tours reduce physical viewings by 40%", "Agents efficiently filter leads using high-fidelity 3D tours, saving time for both buyers and sellers.", "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?auto=format&fit=crop&q=80&w=1000", "11 Jan 2026"),

  // Sustainability
  generateNews("11", "Sustainability", "Green Building Materials Market to Reach $500B", "New market research indicates a surge in demand for sustainable construction materials like bamboo and recycled steel.", "https://images.unsplash.com/photo-1518005052304-a37d605be08d?auto=format&fit=crop&q=80&w=1000", "1 Jan 2026"),
  generateNews("12", "Sustainability", "Solar glass technology improves efficiency", "New transparent solar panels could turn skyscrapers into massive energy generators.", "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000", "2 Jan 2026"),
  generateNews("13", "Sustainability", "EU mandates zero-emission buildings by 2030", "Stricter regulations force developers to rethink insulation and heating systems in new projects.", "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=1000", "3 Jan 2026"),
  generateNews("14", "Sustainability", "Cross-laminated timber towers reach new heights", "Architects push the boundaries of wood construction with a new 30-story tower permit in Vancouver.", "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000", "4 Jan 2026"),
  generateNews("15", "Sustainability", "Carbon concrete poised to disrupt the industry", "New concrete mix captures CO2 during the curing process, turning buildings into carbon sinks.", "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1000", "5 Jan 2026"),
  generateNews("16", "Sustainability", "Vertical forests combat urban heat islands", "Cities like Milan and Singapore expand green facades to cool downtown areas naturally.", "https://images.unsplash.com/photo-1520699697851-3dc68aa3a474?auto=format&fit=crop&q=80&w=1000", "6 Jan 2026"),
  generateNews("17", "Sustainability", "Rainwater harvesting becomes mandatory in drought zones", "New legislation in California requires all new commercial builds to include water recapture systems.", "https://images.unsplash.com/photo-1516937941348-c03e58843ccb?auto=format&fit=crop&q=80&w=1000", "7 Jan 2026"),
  generateNews("18", "Sustainability", "Recycled plastic roads tested in Netherlands", "Modular road sections made from recycled bottles show promise for durability and easy repair.", "https://images.unsplash.com/photo-1592833159057-65a284572242?auto=format&fit=crop&q=80&w=1000", "8 Jan 2026"),
  generateNews("19", "Sustainability", "Passive House standards gain traction in residential", "Homeowners willing to pay premiums for ultra-efficient, airtight homes that slash energy bills.", "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&q=80&w=1000", "9 Jan 2026"),
  generateNews("20", "Sustainability", "Geothermal heating adoption doubles in 2025", "Incentives drive homeowners to switch from gas furnaces to stable ground-source heat pumps.", "https://images.unsplash.com/photo-1585822765329-87c2fb2711dc?auto=format&fit=crop&q=80&w=1000", "10 Jan 2026"),

  // Artificial Intelligence
  generateNews("21", "Artificial Intelligence", "AI Agents Revolutionize Property Management", "Autonomous AI agents are now capable of handling 80% of tenant inquiries without human intervention.", "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000", "30 Dec 2025"),
  generateNews("22", "Artificial Intelligence", "Generative design tools speed up architecture", "Architects use AI to generate hundreds of floor plan iterations in minutes, optimizing for light and flow.", "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000", "1 Jan 2026"),
  generateNews("23", "Artificial Intelligence", "Predictive maintenance saves millions for CRE", "IoT sensors coupled with AI predict HVAC failures weeks before they happen.", "https://images.unsplash.com/photo-1535378437326-97102951cc53?auto=format&fit=crop&q=80&w=1000", "2 Jan 2026"),
  generateNews("24", "Artificial Intelligence", "Automated valuation models get smarter", "New algorithms account for micro-location factors, improving appraisal accuracy by 15%.", "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000", "3 Jan 2026"),
  generateNews("25", "Artificial Intelligence", "Chatbots handle entire leasing lifecycle", "From initial inquiry to lease signing, AI assistants are closing deals 24/7.", "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=1000", "4 Jan 2026"),
  generateNews("26", "Artificial Intelligence", "AI in construction safety monitoring", "Computer vision analyzes job sites in real-time to detect safety hazards and prevent accidents.", "https://images.unsplash.com/photo-1581092921461-eab62496096b?auto=format&fit=crop&q=80&w=1000", "5 Jan 2026"),
  generateNews("27", "Artificial Intelligence", "Personalized property recommendations improve", "Netflix-like algorithms suggest homes based on lifestyle patterns, not just bedroom count.", "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&q=80&w=1000", "6 Jan 2026"),
  generateNews("28", "Artificial Intelligence", "Smart grids optimize district energy use", "AI balances energy loads across entire neighborhoods, integrating solar and battery storage.", "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000", "7 Jan 2026"),
  generateNews("29", "Artificial Intelligence", "Robotic process automation in mortgage lending", "Banks reduce loan processing time from weeks to days using RPA for document verification.", "https://images.unsplash.com/photo-1556740979-1c91d84b574c?auto=format&fit=crop&q=80&w=1000", "8 Jan 2026"),
  generateNews("30", "Artificial Intelligence", "AI-driven urban planning simulations", "City planners test traffic flow and zoning changes in digital twins before implementing them.", "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=1000", "9 Jan 2026"),

  // Construction
  generateNews("31", "Construction", "Global Construction Output Set to Grow by 3.5%", "Despite economic headwinds, the global construction sector shows resilience with massive infrastructure projects.", "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=1000", "28 Dec 2025"),
  generateNews("32", "Construction", "Modular construction gains market share", "Factories producing prefabricated rooms reduce on-site waste and construction time by 30%.", "https://images.unsplash.com/photo-1536895058696-a69b1c7ba34d?auto=format&fit=crop&q=80&w=1000", "29 Dec 2025"),
  generateNews("33", "Construction", "3D printed homes entering mainstream", "Texas developer announces a 100-home community built entirely with concrete 3D printers.", "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?auto=format&fit=crop&q=80&w=1000", "30 Dec 2025"),
  generateNews("34", "Construction", "Drone surveys cut surveying costs", "Aerial drones provide topographical data with millimeter accuracy in a fraction of the time.", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=1000", "31 Dec 2025"),
  generateNews("35", "Construction", "Shortage of skilled labor persists", "Contractors raise wages to attract electricians and plumbers as trades gap widens.", "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000", "1 Jan 2026"),
  generateNews("36", "Construction", "Smart helmets enhance worker safety", "IoT-enabled hard hats track vitals and detect falls, alerting site foremen instantly.", "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?auto=format&fit=crop&q=80&w=1000", "2 Jan 2026"),
  generateNews("37", "Construction", "BIM mandates expand globally", "Governments require Building Information Modeling for all public infrastructure projects.", "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=1000", "3 Jan 2026"),
  generateNews("38", "Construction", "Self-healing concrete trials successful", "Bacteria-infused concrete automatically repairs cracks, extending infrastructure lifespan.", "https://images.unsplash.com/photo-1517646133316-9919f96b293d?auto=format&fit=crop&q=80&w=1000", "4 Jan 2026"),
  generateNews("39", "Construction", "Robotic bricklayers deployed in UK", "Automated masonry robots work alongside humans to speed up housing developments.", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1000", "5 Jan 2026"),
  generateNews("40", "Construction", "Supply chain stabilization for 2026", "Lumber and steel prices normalize after years of post-pandemic volatility.", "https://images.unsplash.com/photo-1584467541268-bc8974a77aee?auto=format&fit=crop&q=80&w=1000", "6 Jan 2026"),

  // Market Trends
  generateNews("41", "Market Trends", "Commercial Real Estate: Return to Office Debate", "Hybrid work models reshape office demand; Class A buildings thrive while older properties struggle.", "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000", "23 Dec 2025"),
  generateNews("42", "Market Trends", "Suburban revival continues", "Millennials move to suburbs for space, but demand urban-like amenities and walkability.", "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000", "24 Dec 2025"),
  generateNews("43", "Market Trends", "Luxury branded residences boom", "Hotel brands partner with developers to offer serviced apartments in resort destinations.", "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000", "25 Dec 2025"),
  generateNews("44", "Market Trends", "Retail reinvents as experiential spaces", "Malls convert empty anchors into gyms, entertainment centers, and co-working hubs.", "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000", "26 Dec 2025"),
  generateNews("45", "Market Trends", "Data center demand skyrockets", "AI growth drives a race to build hyperscale data centers in power-rich regions.", "https://images.unsplash.com/photo-1558494949-ef2a27883bb4?auto=format&fit=crop&q=80&w=1000", "27 Dec 2025"),
  generateNews("46", "Market Trends", "Senior living sector evolves for Boomers", "Active adult communities focus on wellness and technology rather than medical care.", "https://images.unsplash.com/photo-1529612700005-e35377bf1415?auto=format&fit=crop&q=80&w=1000", "28 Dec 2025"),
  generateNews("47", "Market Trends", "Fractional ownership broadens access to vacation homes", "Platforms allow middle-class buyers to own shares of luxury second homes.", "https://images.unsplash.com/photo-1512918760537-8c3e338b4b70?auto=format&fit=crop&q=80&w=1000", "29 Dec 2025"),
  generateNews("48", "Market Trends", "Industrial real estate cools but stays strong", "Warehouse demand stabilizes as e-commerce growth normalizes.", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000", "30 Dec 2025"),
  generateNews("49", "Market Trends", "Affordable housing crisis persists globally", "Governments test rent controls and social housing quotas to address spiraling costs.", "https://images.unsplash.com/photo-1460317442991-0ec2aa92e5a5?auto=format&fit=crop&q=80&w=1000", "31 Dec 2025"),
  generateNews("50", "Market Trends", "Digital nomads influence rental markets", "Short-term rental regulations tighten in tourist hotspots like Barcelona and Lisbon.", "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1000", "1 Jan 2026"),

  // Finance
  generateNews("51", "Finance", "Interest Rates Stabilize, Housing Market Relieved", "After months of volatility, central banks pause hikes. Mortgage applications rise 15%.", "https://images.unsplash.com/photo-1565514020176-6c2235c87445?auto=format&fit=crop&q=80&w=1000", "25 Dec 2025"),
  generateNews("52", "Finance", "REITs outperform S&P 500 in Q4", "Real Estate Investment Trusts attract investors seeking stable dividends in uncertain markets.", "https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=1000", "26 Dec 2025"),
  generateNews("53", "Finance", "Crowdfunding platforms face regulatory scrutiny", "SEC tightens rules for real estate crowdfunding to protect retail investors.", "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000", "27 Dec 2025"),
  generateNews("54", "Finance", "Green bonds issuance for real estate soars", "Investors prefer bonds tied to sustainable development projects, offering lower yields to issuers.", "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?auto=format&fit=crop&q=80&w=1000", "28 Dec 2025"),
  generateNews("55", "Finance", "Private credit fills bank lending gap", "Non-bank lenders step in to finance commercial projects as traditional banks tighten standards.", "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&q=80&w=1000", "29 Dec 2025"),
  generateNews("56", "Finance", "Blockchain simplifies property title transfers", "Pilot programs in Sweden and Georgia show blockchain reduces closing times significantly.", "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=1000", "30 Dec 2025"),
  generateNews("57", "Finance", "Tax changes impact foreign investors", "New levies on non-resident buyers in Canada and Australia aim to cool hot markets.", "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000", "31 Dec 2025"),
  generateNews("58", "Finance", "Insurance costs spike for coastal properties", "Climate risk models drive premiums up by 30% in Florida and California.", "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000", "1 Jan 2026"),
  generateNews("59", "Finance", "Family offices increase allocation to real assets", "Wealthy families seek inflation protection through direct ownership of farmland and multifamily.", "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&q=80&w=1000", "2 Jan 2026"),
  generateNews("60", "Finance", "Mortgage-backed securities see renewed interest", "Institutional investors return to MBS market as default rates remain historically low.", "https://images.unsplash.com/photo-1526304640152-d4619684e484?auto=format&fit=crop&q=80&w=1000", "3 Jan 2026"),
];
