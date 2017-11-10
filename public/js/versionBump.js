$(function(){
    var path;
    var iFrame = document.getElementById("pepe");
    var breadcrumb = $("#breadcrumb");
    var form = $("#formBumpVersion");

    $('#pepe').iframeTracker({
        blurCallback: function(){
            setTimeout(function () {
                path = iFrame.contentWindow.location.pathname.substr(6, iFrame.contentWindow.location.pathname.length);
                updateBreadcrumb(path);
            }, 200);
        }
    });

    function updateBreadcrumb(path) {
        breadcrumb.html("<a class=\"breadcrumb\">home</a>");
        var crumbs = path.split('/');

        for (var i = 0; i < crumbs.length; i++) {
            breadcrumb.append(
                "<a class=\"breadcrumb\">" + crumbs[i] +"</a>"
            );
        }
    }

    form.submit(function(eventObj) {

        $('<input />').attr('type', 'hidden')
            .attr('name', "path")
            .attr('value', path)
            .appendTo(form);
        return true;
    });

}); // end of document ready