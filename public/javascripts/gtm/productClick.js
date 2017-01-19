/**
 * Call this function when a user clicks on a product link. This function uses the event
 * callback datalayer variable to handle navigation after the ecommerce data has been sent
 * to Google Analytics.
 * @param {Object} productObj An object representing a product.
 */
function productClick(productObj) {
    dataLayer.push({
        'event': 'productClick',
        'ecommerce': {
            'click': {
                'actionField': {'list': 'Search Results'},      // Optional list property.
                'products': [{
                    'name': productObj.name,                      // Name or ID is required.
                    'id': productObj.id,
                    'price': productObj.price,
                    'brand': productObj.brand,
                    'category': productObj.category,
                    'variant': productObj.variant,
                    'position': productObj.position
                }]
            }
        },
        'eventCallback': function() {
            document.location = productObj.url
        }
    });
}

$('.product-click-button').click(function () {
    var $targetButton = $(this);
    var productObj = {};
    var dataAttributes = ['name', 'id', 'price', 'brand', 'category', 'variant', 'position', 'url'];
    $.each(dataAttributes, function (index, value) {
        productObj[value] = $targetButton.data(value);
    })
    console.log('productClick:');
    console.log(productObj);

    productClick(productObj);
});