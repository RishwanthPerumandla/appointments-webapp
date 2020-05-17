const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");

const app = express();

// Passport Config
require("./config/passport")(passport);

// DB Config
const db = require('./config/keys').mongoURI;


// Connect to MongoDB
mongoose.set("useFindAndModify", false);

mongoose
  .connect(
    db,
    { useNewUrlParser: true,useUnifiedTopology:true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



//View Engine
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use('/static',express.static("public"));

// Express session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/book-apppointment", require("./routes/form.js"));
app.use("/users", require("./routes/user.js"));

//Port
const port = process.env.PORT || 5000;

//Server Running
app.listen(port, console.log(`Server Running on port ${port}`));





