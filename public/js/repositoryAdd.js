$(function(){
    var path;
    var iFrame = document.getElementById("pepe");
    var breadcrumb = $("#breadcrumb");

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

    var form = $("#formAddRepo");

    form.submit(function(eventObj) {

        var tags = [];
        var oTags = $('.chips').material_chip('data');

        for (var i = 0; i < oTags.length; i++) {
            tags[i] = oTags[i].tag;
        }

        $('<input />').attr('type', 'hidden')
            .attr('name', "path")
            .attr('value', path)
            .appendTo(form);
        // tags
        $('<input />').attr('type', 'hidden')
            .attr('name', "tags")
            .attr('value',  JSON.stringify(tags))
            .appendTo(form);
        return true;
    });

    $('.chips').material_chip();
}); // end of document ready
