const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeSlickdeals() {
  try {
    const url = "https://slickdeals.net/newsearch.php?searcharea=deals&searchin=first&rss=1";
    const res = await axios.get(url, { timeout: 10000 });

    const parsed = await xml2js.parseStringPromise(res.data);
    const items = parsed?.rss?.channel?.[0]?.item || [];

    return items.slice(0, 10).map(item => ({
      source: "Slickdeals",
      title: item.title?.[0] || "Slickdeals deal",
      link: item.link?.[0] || "https://slickdeals.net",
      description: item.description?.[0] || "",
      score: 0
    }));
  } catch (err) {
    console.error("Slickdeals scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeSlickdeals;
