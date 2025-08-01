// app.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const indexRoutes = require("./routes/index");

/* ---------- middleware ---------- */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve /public

/* ---------- routes ---------- */
app.use("/", indexRoutes);

/* ---------- start server ---------- */
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
