const express = require("express");
const cors = require("cors");
const getAllDeals = require("./scrapers/combine");

const app = express();
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("DealBot API is running");
});

// Pretty formatted JSON (optional)
app.get("/pretty", async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.setHeader("Content-Type", "text/html");
    res.send("<pre>" + JSON.stringify(deals, null, 2) + "</pre>");
  } catch (err) {
    console.error("Pretty route error:", err.message);
    res.status(500).send("Error loading formatted deals");
  }
});

// Raw trending list
app.get("/trending", async (req, res) => {
  try {
    const deals = await getAllDeals();
    res.json(deals);
  } catch (err) {
    console.error("Trending route error:", err.message);
    res.status(500).json({ error: "Could not load deals" });
  }
});

// Simple AI-like summary (no external key)
app.get("/ai-summary", async (req, res) => {
  try {
    const deals = await getAllDeals();
    const top5 = deals.slice(0, 5).map((d, i) => {
      return `${i + 1}. ${d.title} — from ${d.source}`;
    }).join("\n");

    res.json({
      summary: deals.length ? "Top deals today:\n" + top5 : "No deals found.",
      count: deals.length
    });
  } catch (err) {
    console.error("AI summary error:", err.message);
    res.status(500).json({ error: "Could not generate summary" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("🔥 DealBot API running on port " + PORT);
});
