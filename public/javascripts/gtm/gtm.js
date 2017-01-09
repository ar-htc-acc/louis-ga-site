console.log('Custom GTM events.');

$('#gtm-id1').click(function (eventObject) {
    console.log('GTM callback: ' + $(this).text());
    dataLayer.push({
        'event': 'eventTracker',
        'eventCat': 'custom button',
        'eventAct': 'click',
        'eventLbl': $(this).text()
    });
});