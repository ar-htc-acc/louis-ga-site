var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    res.locals.title = "Louis' tabs";
    next();
});

router.get('/about', (req, res, next) => {
    res.render('tabs/about');
});

router.get('/details', (req, res, next) => {
    res.render('tabs/details');
});

router.get('/products', (req, res, next) => {
    res.render('tabs/products');
});

router.get('/signUp', (req, res, next) => {
    res.render('tabs/signUp');
});

module.exports = router;
