$(function(){
    countdown();
    loadCookies();
    stickySessions();
});

var countdown = function() {
    var el = $('#countdown');
    var value = parseInt(el.html());
    if(value == 0) {
        location.reload();
    } else {
        el.html(value - 1);
        setTimeout(function(){ countdown(); }, 1000);
    }
};

var stickySessions = function() {
    var button = $('#sticky');
    if(cookies["sticky"] == "false") {
        button.html('Enable sticky session');
        button.click(function(){
            deleteCookie("sticky");
            $(this).attr('disabled', 'true');
        });
        deleteCookies();
    } else {
        button.html('Disable sticky session');
        button.click(function(){
            setCookie("sticky", "false");
            $(this).attr('disabled', 'true');
        })
    }
};

var cookies = {};
var myCookies = ["sticky"];

var loadCookies = function(){
    if(document.cookie == "") return;
    $.each(decodeURIComponent(document.cookie).split(";"), function(key, value) {
        var v = value.split("=", 2);
        if(v[0].charAt(0) == " ") v[0] = v[0].substr(1);
        cookies[v[0]] = v[1];
    });
    console.log(cookies);
};

var setCookie = function (name, value) {
    document.cookie = name + "=" + value + ";";
};

var deleteCookie = function(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

var deleteCookies = function() {
    $.each(cookies, function(name) {
        if(myCookies.indexOf(name) == -1) {
            deleteCookie(name);
        }
    });
};