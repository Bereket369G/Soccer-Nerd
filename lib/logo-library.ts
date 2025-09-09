
const logoMap: Record<string, string> = {
  "chelsea": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e1.png",
  "lester city": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e6.png",
  "liverpool fc": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e5.png",
  "man united": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e7.png",
  "swansea afc": "https://cdn.freebiesupply.com/logos/large/2x/swansea-city-afc-logo-png-transparent.png",
  "tottenham": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4f4.png",
  "arsenal": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4df.png",
  "stoke city": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4ee.png",
  "barcelona": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e3.png",
  "bayern munich": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e8.png",
  "man city": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e0.png",
  "real madrid": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e2.png",
  "juventus": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4e9.png",
  "psg": "https://assets.stickpng.com/images/580b57fcd9996e24bc43c4d3.png"
};

// A fallback logo for any team not in our map, preventing broken images.
const fallbackLogo = "https://www.freeiconspng.com/uploads/football-icon-png-22.png";

export const getTeamLogo = (teamName: string): string => {
  const normalizedName = teamName.toLowerCase();
  return logoMap[normalizedName] || fallbackLogo;
};