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
        console.log(` ${label} returned ${data.length} results`);
        return data;
    } catch (err) {
        console.error(` ${label} FAILED:`, err.message);
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

    const combined = results.flat();

    combined.sort((a, b) => {
        const aScore = parseInt(a.score || a.votes || a.searches || 0);
        const bScore = parseInt(b.score || b.votes || b.searches || 0);
        return bScore - aScore;
    });

    return combined.slice(0, 40);
}

module.exports = getAllDeals;
