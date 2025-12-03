const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Import our routes
const routes = require("./routes");
app.use("/", routes);

// Start server
app.listen(3000, () => console.log("DealBot API running on port 3000"));
