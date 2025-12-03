const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeBestBuy() {
  try {
    const url = "https://www.bestbuy.com/rss/featureddeals.xml";
    const res = await axios.get(url, { timeout: 10000 });

    const parsed = await xml2js.parseStringPromise(res.data);
    const items = parsed?.rss?.channel?.[0]?.item || [];

    return items.slice(0, 10).map(item => ({
      source: "BestBuy",
      title: item.title?.[0] || "BestBuy deal",
      link: item.link?.[0] || "https://www.bestbuy.com/site/top-deals",
      description: item.description?.[0] || "",
      score: 0
    }));
  } catch (err) {
    console.error("BestBuy scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeBestBuy;
