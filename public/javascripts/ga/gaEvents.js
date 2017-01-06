console.log('GA events.');

$("a[href$='.pdf']").click(function (event) {
    var href = $(this).attr('href');
    console.log('PDF href was clicked: ' + href);
    ga('send', 'event', 'pdf', 'click', href);
});