var express = require('express');
var router = express.Router();

router.get('/about', (req, res, next) => {
    res.render('tabs/about');
});

module.exports = router;
