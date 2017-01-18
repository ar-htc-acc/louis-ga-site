/** Change header class (selected) */
$('.blog-nav-item').removeClass('active').filter(function (index, element) {
    return $(element).attr('href') == window.location.pathname;
}).addClass('active');

$('.sign-up-button').click(function () {
    location.href = '/tabs/signUp/';
});

$('.transaction-button').click(function () {
    location.href = '/tabs/receipt/';
});