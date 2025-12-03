const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeGoogleTrends() {
  try {
    const url = "https://trends.google.com/trending/rss?pn=p1";
    const res = await axios.get(url, { timeout: 10000 });

    const parsed = await xml2js.parseStringPromise(res.data);
    const items = parsed?.rss?.channel?.[0]?.item || [];

    return items.slice(0, 10).map(item => ({
      source: "Google Trends",
      title: item.title?.[0] || "Trending search",
      link: item.link?.[0] || "https://trends.google.com/trending",
      searches: 0
    }));
  } catch (err) {
    console.error("Google Trends scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeGoogleTrends;
