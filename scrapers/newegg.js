const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeNewegg() {
  try {
    const url = "https://www.newegg.com/todays-deals";
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    const deals = [];

    $("a.item-title").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim() || "Newegg Deal";
      const link = $(el).attr("href");
      deals.push({
        source: "Newegg",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("Newegg scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeNewegg;
