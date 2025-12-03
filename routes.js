const express = require("express");
const router = express.Router();

// 1. Trending keywords (placeholder for now)
router.get('/trending', async (req, res) => {
  res.json([
    { topic: "iphone 16 deals", score: 97 },
    { topic: "ps5 bundle", score: 89 },
    { topic: "airpods discount", score: 76 }
  ]);
});

// 2. Best Deals (placeholder for now)
router.get('/best-deals', async (req, res) => {
  res.json([
    {
      title: "AirPods Pro",
      price: "$169",
      original: "$249",
      discount: "32%",
      link: "https://amazon.com"
    }
  ]);
});

// 3. AI summary (placeholder)
router.get('/ai-summary', async (req, res) => {
  res.json({
    summary: "Top deals today: AirPods 32% off, PS5 bundle discount, iPhone 14 $120 off."
  });
});

module.exports = router;
