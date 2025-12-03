const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DealBot API is running");
});

app.use("/", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("DealBot API running on port " + PORT);
});
