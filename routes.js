const express = require("express");
const router = express.Router();
const getAllDeals = require("./scrapers/combine");

router.get("/trending", async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.json(deals);
  } catch (err) {
    console.error("Error in /trending:", err);
    res.status(500).json({ error: "Failed to load deals" });
  }
});

router.get("/ai-summary", async (req, res) => {
  try {
    const deals = await getAllDeals();
    if (!deals.length) {
      return res.json({ summary: "No deals available right now.", count: 0 });
    }

    const top = deals.slice(0, 5);
    const parts = top.map((d, i) => {
      const price = d.price || d.currentPrice || "a great price";
      const source = d.source || "online";
      return `${i+1}) ${d.title} at ${price} from ${source}`;
    });

    const summaryText = "Today’s hottest deals:\n" + parts.join("\n");

    res.json({
      summary: summaryText,
      count: deals.length
    });
  } catch (err) {
    console.error("Error in /ai-summary:", err);
    res.status(500).json({ error: "Failed to build summary" });
  }
});

module.exports = router;
