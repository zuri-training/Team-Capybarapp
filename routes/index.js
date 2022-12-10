const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");


router.get("/", (req, res) => {
    res.render("welcome")
})
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        name: req.user.name,
        email: req.user.email
    })
})

router.get("/links", ensureAuthenticated, (req, res) => {
    res.render("link", {
        title: "Qrcode Generator - links"
    })
})

router.get("/help", ensureAuthenticated, (req, res) => {
    res.render("help", {
        title: "Qrcode Generator - Help"
    })
})

router.get("/active", ensureAuthenticated, (req, res) => {
    res.render("active", {
        title: "Qrcode Generator - Active Qr's"
    })
})


router.get("/draft", ensureAuthenticated, (req, res) => {
    res.render("draft", {
        title: "Qrcode Generator - Home"
    })
})

router.get("/links", ensureAuthenticated, (req, res) => {
    res.render("link", {
        title: "Qrcode Generator - Generated Links"
    })
})

router.get("/generate", ensureAuthenticated, (req, res) => {
    res.render("generate", {
        title: "Qrcode Generator - Generate link"
    })
})

module.exports = router;