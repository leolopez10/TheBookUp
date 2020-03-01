//=================================================================
//Lets do it
//=================================================================
require("dotenv").config();
const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

//Models for sending email and password to database
const db = require("./models");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sessions
app.use(session({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true }))
app.use(express.json())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

//Playing with api routes outside of route folder

app.get("/api/hello", function (req, res) {
    res.send("hello");
})

//Setting up sign up route
app.post("/api/signup", function (req, res) {
    db.User.create(req.body).then(dbUser => {
        res.json(dbUser);
    }).catch(err => console.log(err));
})

//Login route
app.post("/api/login", function (req, res) {
    //Do I have an entry with this email address
    db.User.findOne({ email: req.body.email }).then(dbUser => {
        if (!dbUser) {
            return res.status(401).json(false)
        } else {
            console.log(dbUser);
            dbUser.checkPassword(req.body.password).then(isMatch => {
                if (isMatch) {
                    console.log("signed in");
                    return res.status(200).json(dbUser);
                } else {
                    return res.status(401).json(false);
                }
            })
        }
    }).catch(err => console.log(err));
})

// Add routes, both API and view 
app.use(routes);


// Send every other request to the React app
// Define any API routes before this runs
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/thebookupDB")
    .then(() => console.log("Database is connected"))
    .catch(err => console.log(err));

// Start the API server
app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
