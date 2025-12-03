const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeBestBuy() {
  try {
    const url = "https://www.bestbuy.com/site/top-deals/all-deals/pcmcat1563306452015.c?id=pcmcat1563306452015";
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);

    const deals = [];

    $("a[href*='/site/']").slice(0, 10).each((i, el) => {
      const title = $(el).text().trim();
      const href = $(el).attr("href");
      if (!title || !href) return;
      const link = "https://www.bestbuy.com" + href;
      deals.push({
        source: "BestBuy",
        title,
        link
      });
    });

    return deals;
  } catch (err) {
    console.error("BestBuy scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeBestBuy;
