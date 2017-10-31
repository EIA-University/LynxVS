
(function($){

    function toggleFullScreen() {
        var elem = $('#screenToggle');
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
            elem.find("i").text('fullscreen_exit');
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            elem.find("i").text('fullscreen');
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    }


    $(function(){

        $('.button-collapse').sideNav();
        var elem = document.getElementById("screenToggle");

        elem.onclick = function() {
            toggleFullScreen();
        };

        $('.tap-target').tapTarget('open');

        document.getElementById("body").onclick = function () {
            $('.tap-target').tapTarget('close');
        };

    }); // end of document ready
})(jQuery); // end of jQuery name space