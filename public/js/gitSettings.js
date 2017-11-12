$(function(){
    var password = $("#password");
    var passwordToggle = $("#passwordToggle");
    var toggled = false;

    passwordToggle.click(function () {
         if (!toggled) {
             password[0].type = 'text';
             passwordToggle.addClass("teal-text");
             toggled = true;
         } else {
             password[0].type = 'password';
             passwordToggle.removeClass("teal-text");
             toggled = false;
         }
    });
});