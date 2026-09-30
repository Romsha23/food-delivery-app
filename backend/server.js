const express = require("express");
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 4000;
app.use(express.json({ limit: "2mb" }));
app.use(cors(corsOptions));
app.use("/images", express.static(path.join(__dirname, "uploads")));
app.use("/api/food", require("./routes/foodRoute"));
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/cart", require("./routes/cartRoute"));
app.use("/api/order", require("./routes/orderRoute"));
app.get("/", (_req, res) => res.json({ service: "food-delivery-api", mode: "demo" }));
app.get("/healthz", (_req, res) => res.status(200).send("ok"));
app.listen(port, "0.0.0.0", () => console.log("Server listening on port " + port));