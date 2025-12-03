async function scrapeWalmart() {
  try {
    return [
      {
        source: "Walmart (demo)",
        title: "Gaming Laptop 15.6\" RTX 4060",
        link: "https://www.walmart.com/",
        price: "$849.00",
        score: 42
      },
      {
        source: "Walmart (demo)",
        title: "Air Fryer 5QT Digital",
        link: "https://www.walmart.com/",
        price: "$49.00",
        score: 38
      },
      {
        source: "Walmart (demo)",
        title: "Queen Memory Foam Mattress",
        link: "https://www.walmart.com/",
        price: "$199.00",
        score: 35
      }
    ];
  } catch (err) {
    console.error("Walmart demo scraper error:", err.message);
    return [];
  }
}

module.exports = scrapeWalmart;
