var $container = $('div.custom-dim');
var author = $container.data('author');
var category = $container.data('category');
if (author && category) dataLayer.push({'author': author, 'category': category});