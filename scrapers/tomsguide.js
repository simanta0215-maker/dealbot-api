const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeTomsGuide() {
  try {
    const url = "https://www.tomsguide.com/deals";
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    const deals = [];

    $("a.article-link").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim() || "Tom's Guide Deal";
      const link = $(el).attr("href");
      deals.push({
        source: "Tom's Guide",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("Tom's Guide scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeTomsGuide;
