$(function() {
    $(".folderClick").click(function () {
        var path = (this).getElementsByTagName('p')[0].innerHTML.replace('/', '');
        window.location.href = window.location.pathname + '\/' + path;
    });

    $("#fab").click( function () {
        window.history.back();
    });
});