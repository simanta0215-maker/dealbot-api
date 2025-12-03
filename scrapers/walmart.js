const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeWalmart() {
  try {
    const url = "https://www.walmart.com/browse/deals/all-deals/";
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    const deals = [];

    $("a[href*='/ip/']").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim() || "Walmart Deal";
      const link = "https://www.walmart.com" + $(el).attr("href");

      deals.push({
        source: "Walmart",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("Walmart scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeWalmart;
