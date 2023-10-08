const express = require("express"); //import
const expressSession = require("express-session");
//const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const sessions = require("express-session");
const path = require("path");
const app = new express();
app.use(cookieParser());
const localStorage = require("localStorage");

//Setting localStorage Item
localStorage.setItem("UserName", "Manntrix");

const ejs = require("ejs"); //import ejs
app.set("view engine", "ejs"); //set ejs
app.use(express.static("public"));

app.use(
  sessions({
    secret: "secretkey123",
    saveUninitialized: true,
    cookie: { maxAge: 1000000000000000 },
    resave: false,
  })
);

app.get("/", (req, res) => {
  res.render("index"); //route for dashboard
});
app.get("/index", (req, res) => {
  res.render("index"); //route for dashboard
});

app.get("/g-test", (req, res) => {
  res.render("g-test"); //route for g-test
});

app.get("/login", (req, res) => {
  res.render("login"); //route for login
});

app.get("/cart", (req, res) => {
  console.log(req.session.user);
  res.render("cart"); //route for login
});

app.get("/signup", (req, res) => {
  res.render("signup"); //route for login
});
app.get("/driver", (req, res) => {
  res.render("driver"); //route for driver
});

app.listen(4000, () => {
  console.log("App listening on port 4000");
});

const mongoose = require("mongoose");

connection_uri =
  "mongodb+srv://shubhamkarande:8rIZQZlBsVsmPKS8@cluster0.cb7ehih.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connection_uri); // connect to mongodb via mongoose

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: ")); //catch error
db.once("open", function () {
  console.log("Connected successfully");
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const bodyParser = require("body-parser"); //import middleware

// parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/profile", (req, res) => {
  const received_data = req.session.user;
  res.render("profile", { user: received_data[0] }); //populate profile page
});

const completeSignupController = require("./controllers/complete-signup");
app.post("/complete-signup", completeSignupController);

const completeLoginController = require("./controllers/complete-login");

app.post("/complete-login", completeLoginController);
