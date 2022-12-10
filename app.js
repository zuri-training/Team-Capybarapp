const express = require("express");
const expressLayouts = require("express-ejs-layouts");
// const mongoose = require("mongoose");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport")

const app = express();
const PORT = process.env.PORT || 3000;
require("dotenv").config();

// passport config 
require("./config/passport")(passport)

// ejs
app.use(expressLayouts);
app.set("layout", "./layouts/main");
app.set("view engine", ("ejs"));

// bodyParser
app.use(express.urlencoded({ extended: false }));

// express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


// Passport middlewares
app.use(passport.initialize());
app.use(passport.session());



// connect flash 
app.use(flash());
app.use(express.static(__dirname + '/public'));

// global variables
app.use((req, res, next) => {
    res.locals.sucess_message = req.flash("sucess_message");
    res.locals.error_message = req.flash("error_message");
    res.locals.error = req.flash("error");
    next();
});


// Routes
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));


app.listen(PORT, console.log(`Server started on port ${PORT}`))