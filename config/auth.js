module.exports = {

    ensureAuthenticated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            req.flash("error_message", "Pls login to view this resource");
            res.redirect("/users/login")
        }
    }
}