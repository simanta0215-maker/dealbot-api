const express = require("express");
const cors = require("cors");
const getAllDeals = require("./scrapers/combine");

const app = express();
app.use(cors());
app.use(express.json());


//  PRETTY PRINT ENDPOINT (add this before other routes)
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


//  MAIN HEALTH CHECK
app.get("/", (req, res) => {
    res.send("DealBot API is running");
});


//  API: RAW DEAL LIST
app.get("/trending", async (req, res) => {
    try {
        const deals = await getAllDeals();
        res.json(deals);
    } catch (err) {
        console.error("Trending route error:", err.message);
        res.status(500).json({ error: "Could not load deals" });
    }
});


//  OPTIONAL — AI Summary endpoint
app.get("/ai-summary", async (req, res) => {
    try {
        const deals = await getAllDeals();

        const top5 = deals.slice(0, 5)
            .map((d, i) => `${i + 1}. ${d.title} — from ${d.source}`)
            .join("\n");

        res.json({
            summary: "Top deals today:\n" + top5,
            count: deals.length
        });

    } catch (err) {
        console.error("AI summary error:", err.message);
        res.status(500).json({ error: "Could not generate summary" });
    }
});


// SERVER START — Render uses PORT variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(` DealBot API running on port ${PORT}`);
});
