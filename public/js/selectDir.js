$(function() {

    $(".folderClick").click(function () {
        var path = (this).getElementsByTagName('p')[0].innerHTML.replace('/', '');
        window.location.href = window.location.pathname + '\/' + path;
    });

    $("#fab").click( function () {
        window.history.back();
    });

    var form = $("#addFolder");

    // attach route to form
    form.submit(function (obj) {
        var src = window.location.pathname.substr(6, window.location.pathname.length);
        $('<input />').attr('type', 'hidden')
            .attr('name', "src")
            .attr('value', src)
            .appendTo(form);
    });

    $("#sub").click(function () {
        form.submit();
    });
});