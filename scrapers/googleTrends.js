const axios = require("axios");

async function scrapeGoogleTrends() {
    try {
        const url = "https://trends.google.com/trends/api/dailytrends?hl=en-US&geo=US&ns=15";

        const res = await axios.get(url);

        // Google returns weird text ")]}'," before the JSON, so we remove it
        const fixed = res.data.replace(")]}',", "");

        const json = JSON.parse(fixed);

        const trending = json.default.trendingSearchesDays[0].trendingSearches;

        return trending.slice(0, 10).map(item => ({
            source: "Google Trends",
            title: item.title.query,
            searches: item.formattedTraffic,
            link: item.title.exploreLink
        }));

    } catch (err) {
        console.error("Google Trends scrape error:", err.message);
        return [];
    }
}

module.exports = scrapeGoogleTrends;
