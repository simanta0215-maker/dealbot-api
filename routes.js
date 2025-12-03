const express = require("express");
const router = express.Router();
const getAllDeals = require("./scrapers/combine");

// Trending using REAL scrapers
router.get("/trending", async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.json(deals);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load deals" });
  }
});

// AI summary placeholder
router.get("/ai-summary", async (req, res) => {
  res.json({ summary: "Top deals updated from Slickdeals + Reddit" });
});

module.exports = router;
