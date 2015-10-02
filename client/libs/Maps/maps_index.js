var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];
function initMap() {
  var customMapType = [
      {
        stylers: [
          {visibility: 'simplified'},
          {lightness: 30}
        ]
      },
      {
        elementType: 'labels',
        stylers: [{visibility: 'off'}]
      }
    ];
  var customMapTypeId = 'custom_style';

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 10.983812, lng: -74.8180175},  // Barranquilla
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  map.setOptions({styles: customMapType})

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      map.setCenter(pos);
    }, function() {
    });
  } else {
    // Browser doesn't support Geolocation
  }
}
