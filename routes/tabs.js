var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    res.locals.title = "Louis' tabs";
    next();
});

router.get('/:targetTab', (req, res, next) => {
    res.render('tabs/' + req.params.targetTab);
});

module.exports = router;
