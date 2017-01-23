var $container = $('div.custom-dim');
var author = $container.data('author');
var category = $container.data('category');
var sport = $container.data('sport');
if (author && category && sport) dataLayer.push({'author': author, 'category': category, 'sport': sport});