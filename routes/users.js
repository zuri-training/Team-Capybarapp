require("../models/db");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport")

// user model
const User = require("../models/User");


// login page
router.get("/login", (req, res) => {
    res.render("login");
})


// Register page
router.get("/register", (req, res) => {
    res.render("register");
});

// Register handle
router.post("/register", (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ message: "Pls fill in all fields" });
    }

    // check password match
    if (password !== password2) {
        errors.push({ message: "Passwords do not match" });
    }

    // check pass length
    if (password.length < 6) {
        errors.push({ message: "Passwords should be atleast 6 characters" });
    }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            name,
            email,
            password,
            password2
        })
        console.log(errors)
    } else {
        // validation passed
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    // user exixt
                    errors.push({ message: "Email is already registerd" })
                    res.render("register", {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    // hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            // set passsword to hashed
                            newUser.password = hash;
                            // save new user\
                            newUser.save()
                                .then(user => {
                                    req.flash("sucess_message", "You are now registerd and can login");
                                    res.redirect("/users/login")
                                })
                                .catch(err => console.log(err))
                        });
                    });
                }
            });
    }

});




// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});


// Logout
// router.get('/logout', (req, res) => {
//     req.logOut();
//     req.logout();
//     console.log(req.logout())
//     console.log(req.logOut())
//     req.flash("sucess_message", "You are logged out");
//     res.redirect('/users/login');
// });



router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash("sucess_message", "You are logged out");
        res.redirect('/users/login');
    });
});





module.exports = router;