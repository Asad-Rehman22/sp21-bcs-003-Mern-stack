// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/nhb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// ... other middleware and routes

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
