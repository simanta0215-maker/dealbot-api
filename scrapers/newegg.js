const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeNewegg() {
  try {
    const url = "https://www.newegg.com/d/deals/rss";
    const res = await axios.get(url, { timeout: 10000 });

    const parsed = await xml2js.parseStringPromise(res.data);
    const items = parsed?.rss?.channel?.[0]?.item || [];

    return items.slice(0, 10).map(item => ({
      source: "Newegg",
      title: item.title?.[0] || "Newegg deal",
      link: item.link?.[0] || "https://www.newegg.com/d/deals",
      score: 0
    }));
  } catch (err) {
    console.error("Newegg scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeNewegg;
