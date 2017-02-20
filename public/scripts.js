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
    var map = L.map('map').setView([mapConfig['center']['lat'], mapConfig['center']['lng']], mapConfig['zoom']);

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    $.get('/data', function(data){
        var markers = L.markerClusterGroup();
        $.each(data, function(id, park){
            markers.addLayer(L.marker(park['pos']).bindPopup(park['name']));
        });
        map.addLayer(markers);
    });
}