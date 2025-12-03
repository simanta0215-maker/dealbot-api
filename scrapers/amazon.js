async function scrapeAmazon() {
  try {
    return [
      {
        source: "Amazon (demo)",
        title: "Wireless Earbuds with Noise Cancelling",
        link: "https://www.amazon.com/",
        price: "$39.99",
        score: 50
      },
      {
        source: "Amazon (demo)",
        title: "4K Smart TV 55-inch",
        link: "https://www.amazon.com/",
        price: "$299.99",
        score: 45
      },
      {
        source: "Amazon (demo)",
        title: "Mechanical Gaming Keyboard RGB",
        link: "https://www.amazon.com/",
        price: "$59.99",
        score: 40
      }
    ];
  } catch (err) {
    console.error("Amazon demo scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeAmazon;
