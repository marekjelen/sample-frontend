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

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), mapConfig);
    $.get('/data', function(data){
        $.each(data, function(id, park){
            var infowindow = new google.maps.InfoWindow({
                content: park['name']
            });
            var marker = new google.maps.Marker({
                position: {lat: park['pos'][0], lng: park['pos'][1]},
                map: map,
                title: park['name']
            });
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            });
        });
    });
}