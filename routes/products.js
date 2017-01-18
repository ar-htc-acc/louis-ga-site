var express = require('express');
var router = express.Router();

router.use((req, res, next) => {
    res.locals.title = "Product Tab";
    next();
});

router.get('/:productId', (req, res, next) => {
    res.render('products/' + req.params.productId);
});

module.exports = router;