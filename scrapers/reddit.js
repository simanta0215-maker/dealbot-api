const axios = require("axios");

async function scrapeRedditDeals() {
  try {
    const url = "https://www.reddit.com/r/deals/hot.json?limit=10";

    const res = await axios.get(url, {
      headers: { "User-Agent": "DealBot/1.0" }
    });

    const posts = res.data.data.children;

    return posts.map(p => ({
      source: "Reddit r/deals",
      title: p.data.title,
      link: "https://reddit.com" + p.data.permalink,
      votes: p.data.ups
    }));
  } catch (err) {
    console.error("Reddit scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeRedditDeals;
