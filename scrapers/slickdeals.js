const axios = require("axios");
const xml2js = require("xml2js");

async function scrapeSlickdeals() {
  try {
    const url = "https://slickdeals.net/newsearch.php?mode=frontpage&searcharea=deals&searchin=first";
    const res = await axios.get(url);
    const xml = res.data;

    const parsed = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
    const items = parsed.rss.channel[0].item;

    return items.slice(0, 10).map(item => ({
      source: "Slickdeals",
      title: item.title[0],
      link: item.link[0],
      description: item.description ? item.description[0] : ""
    }));
  } catch (err) {
    console.error("Slickdeals scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeSlickdeals;
