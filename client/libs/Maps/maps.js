var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: {lat: 10.983812, lng: -74.8180175},  // Barranquilla
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });

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
  var markerF = new google.maps.Marker({
    position: {lat: 11.0181227,lng: -74.8507938},
  });
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    if(markers.length>0){
      calculateAndDisplayRoute(directionsService, directionsDisplay, markerF);
    }
  });
}
function addMarker(location, map) {
  // Add the marker at the clicked location, and add the next-available label
  // from the array of alphabetical characters.
  var marker = new google.maps.Marker({
    position: location,
    label: labels[labelIndex++ % labels.length],
    map: map
  });
  markers.push(marker);
}
function clearMarkers(map){
  for (var i = 0; i < labelIndex; i++) {
      markers[i].setMap(null);
  }
}
function calculateAndDisplayRoute(directionsService, directionsDisplay, markerF) {
  var waypts = [];
  for (var i = 1; i < labelIndex-1; i++) {
      waypts.push({
        location: markers[i].position,
        stopover: true
      });
  }
  clearMarkers(directionsDisplay.map);
  directionsService.route({
    origin: markers[0].position,
    destination: markerF.position,
    waypoints: waypts,
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      alert('Could not display directions due to: ' + status);
    }
  });
}
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}