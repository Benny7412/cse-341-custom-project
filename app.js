require('dotenv').config();
const path       = require('path');
const express    = require('express');

// MongoDB connection
const mongodb = require("./data/database");

// Import routes
const indexRoutes = require('./routes/index');
const catsRoutes = require('./routes/cats');
const catBreedsRoutes = require('./routes/catBreeds');

//authentication
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github').Strategy;
const cors = require('cors');

// Init express 
const app = express();

/* ---------- swagger docs ---------- */
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./routes/docs/swagger.json');




/* ---------- middleware ---------- */

app
  .use(express.json())
  //serve public
  .use(express.static(path.join(__dirname, "public")))
  //session middleware
  .use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })) 
  .use(passport.initialize())
  .use(passport.session())

  // CORS headers
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, OPTIONS, DELETE");
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'] }))
  .use(cors({ origin: '*' }))
  .use("/", require("./routes/index.js"));

/* ---------- routes ---------- */
app.use("/", indexRoutes);
app.use("/cats", catsRoutes);
app.use("/catBreeds", catBreedsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// CORS headers

passport.use(new GithubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
 }));

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});


app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out" )});

app.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api-docs', session: false }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });


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
