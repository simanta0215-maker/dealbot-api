const scrapeSlickdeals = require("./slickdeals");
const scrapeRedditDeals = require("./reddit");
const scrapeGoogleTrends = require("./googleTrends");

async function getAllDeals() {
    const slick = await scrapeSlickdeals();
    const reddit = await scrapeRedditDeals();
    const trends = await scrapeGoogleTrends();

    const combined = [...slick, ...reddit, ...trends];

    // Sort by engagement (votes or searches)
    combined.sort((a, b) => {
        const aScore = parseInt(a.votes || a.searches || "0");
        const bScore = parseInt(b.votes || b.searches || "0");
        return bScore - aScore;
    });

    return combined.slice(0, 20); // top 20 results
}

