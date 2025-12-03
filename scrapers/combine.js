const scrapeRedditDeals = require("./reddit");
const scrapeSlickdeals = require("./slickdeals");
const scrapeGoogleTrends = require("./googleTrends");
const scrapeWalmart = require("./walmart");
const scrapeAmazon = require("./amazon");
const scrapeTechRadar = require("./techradar");
const scrapeTomsGuide = require("./tomsguide");
const scrapeBestBuy = require("./bestbuy");
const scrapeNewegg = require("./newegg");

async function safe(fn, label) {
  try {
    const data = await fn();
    const arr = Array.isArray(data) ? data : [];
    console.log(`✅ ${label} returned ${arr.length} results`);
    return arr;
  } catch (err) {
    console.error(`❌ ${label} FAILED:`, err.message);
    return [];
  }
}

async function getAllDeals() {
  const results = await Promise.all([
    safe(scrapeRedditDeals, "Reddit"),
    safe(scrapeSlickdeals, "Slickdeals"),
    safe(scrapeGoogleTrends, "Google Trends"),
    safe(scrapeWalmart, "Walmart"),
    safe(scrapeAmazon, "Amazon"),
    safe(scrapeTechRadar, "TechRadar"),
    safe(scrapeTomsGuide, "TomsGuide"),
    safe(scrapeBestBuy, "BestBuy"),
    safe(scrapeNewegg, "Newegg")
  ]);

  let combined = results.flat();

  combined.forEach(d => {
    if (typeof d.score !== "number") {
      d.score = d.votes || 0;
    }
  });

  combined.sort((a, b) => (b.score || 0) - (a.score || 0));

  return combined.slice(0, 40);
}

module.exports = getAllDeals;
