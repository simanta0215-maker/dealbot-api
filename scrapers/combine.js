const scrapeSlickdeals = require("./slickdeals");
const scrapeRedditDeals = require("./reddit");

async function getAllDeals() {
  const slick = await scrapeSlickdeals();
  const reddit = await scrapeRedditDeals();

  const combined = [...slick, ...reddit];

  combined.sort((a, b) => (b.votes || 0) - (a.votes || 0));

  return combined.slice(0, 15);
}

module.exports = getAllDeals;
