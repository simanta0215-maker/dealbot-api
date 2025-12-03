const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTechRadar() {
  try {
    const url = "https://www.techradar.com/deals";
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    const deals = [];

    $("a.article-link").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim() || "TechRadar Deal";
      const link = $(el).attr("href");
      deals.push({
        source: "TechRadar",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("TechRadar scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeTechRadar;
