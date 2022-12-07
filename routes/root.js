const express = require('express')
const router = express.Router()
const path = require('path')

// Home Page
router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html' ))
})

// Login Page
router.get('^/$|/login(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'login.html' ))
})

// Register Page
router.get('^/$|/register(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'register.html' ))
})

// Product Page
router.get('^/$|/product(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'product.html' ))
})

module.exports = router