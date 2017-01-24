// test: click generating virtual pageview
$('.ec-virtual').click(function () {

    var $button = $(this);
    var productId = $button.data('productId');
    var category = $button.data('category');

    dataLayer.push({
        'event': 'virtualPageView',
        'productId': productId, // populate page
        'category': category // populate title
    });
});