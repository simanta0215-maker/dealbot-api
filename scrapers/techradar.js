const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTechRadar() {
  try {
    const url = "https://www.techradar.com/deals";
    const res = await axios.get(url, { timeout: 10000 });

    const $ = cheerio.load(res.data);
    const deals = [];

    $("a.article-link").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href");
      if (!title || !href) return;
      const link = href.startsWith("http") ? href : "https://www.techradar.com" + href;

      deals.push({
        source: "TechRadar",
        title,
        link,
        score: 0
      });
    });

    return deals;
  } catch (err) {
    console.error("TechRadar scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeTechRadar;
