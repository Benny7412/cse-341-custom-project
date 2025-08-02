// app.js
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');

const dotenv = require("dotenv");
const mongodb = require("./data/database");
dotenv.config();

// Import routes
const indexRoutes = require('./routes/index');
const catsRoutes = require('./routes/cats');
const catBreedsRoutes = require('./routes/catBreeds');


const app = express();

/* ---------- middleware ---------- */
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve /public


/* ---------- swagger docs ---------- */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/docs/swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ---------- routes ---------- */
app.use("/", indexRoutes);
app.use("/cats", catsRoutes);
app.use("/catBreeds", catBreedsRoutes);


/* ---------- start server ---------- */
const port = process.env.PORT || 8080;
mongodb.initDb()
  .then((client) => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

module.exports = app;
