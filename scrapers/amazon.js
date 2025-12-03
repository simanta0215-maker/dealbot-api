const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeAmazon() {
  try {
    const url = "https://www.amazon.com/Best-Sellers/zgbs";
    const res = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (DealBot)"
      },
      timeout: 10000
    });

    const $ = cheerio.load(res.data);
    const deals = [];

    $("div.zg-grid-general-faceout a.a-link-normal").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim() || "Amazon Best Seller";
      const link = "https://www.amazon.com" + ($(el).attr("href") || "");
      deals.push({
        source: "Amazon Best Sellers",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("Amazon scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeAmazon;
