const scrapeSlickdeals = require("./slickdeals");
const scrapeRedditDeals = require("./reddit");
const scrapeGoogleTrends = require("./googleTrends");
const scrapeWalmart = require("./walmart");
const scrapeAmazon = require("./amazon");
const scrapeTechRadar = require("./techradar");
const scrapeTomsGuide = require("./tomsguide");
const scrapeBestBuy = require("./bestbuy");
const scrapeNewegg = require("./newegg");

async function getAllDeals() {
  const results = await Promise.allSettled([
    scrapeSlickdeals(),
    scrapeRedditDeals(),
    scrapeGoogleTrends(),
    scrapeWalmart(),
    scrapeAmazon(),
    scrapeTechRadar(),
    scrapeTomsGuide(),
    scrapeBestBuy(),
    scrapeNewegg()
  ]);

  let combined = [];
  for (const r of results) {
    if (r.status === "fulfilled" && Array.isArray(r.value)) {
      combined = combined.concat(r.value);
    }
  }

  combined.forEach(d => {
    if (d.votes) d._score = d.votes;
    else if (d.searches) {
      const num = parseInt(String(d.searches).replace(/[^0-9]/g, "")) || 0;
      d._score = num;
    } else {
      d._score = 0;
    }
  });

  combined.sort((a, b) => (b._score || 0) - (a._score || 0));

  return combined.slice(0, 40);
}

module.exports = getAllDeals;
