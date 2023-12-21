// Import the Express module
const express = require('express');
const path = require('path');
var session = require('express-session');
const mongoose = require('mongoose');

// Create an instance of the Express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
    .connect('mongodb://localhost:27017/nhb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log('Error connecting to MongoDB', err.message);
    });

app.use(express.static('public'));

app.use(
    session({
        secret: 'My Open Secret!',
        resave: false,
        saveUninitialized: true,
    })
);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.use('/', require('./routes/authentication'));

// Set the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(Server is running on http://localhost:${port});
});