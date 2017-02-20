$(function(){
    countdown();
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