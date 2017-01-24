$('.sign-in-btn').click(function () {
    var $btn = $(this);
    document.cookie = 'userId=' + $btn.data('userId') + '; path=/';
});

$('.sign-out-btn').click(function () {
    document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
});