var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var labelIndex = 0;
var markers = [];
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: -24.345, lng: 134.46}  // Australia.
  });

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
    draggable: true,
    map: map
  });
  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
    if(markers.length>1){
      calculateAndDisplayRoute(directionsService, directionsDisplay);
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
function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var waypts = [];
  for (var i = 1; i < labelIndex-2; i++) {
      waypts.push({
        location: markers[i].position
      });
  }
  clearMarkers(directionsDisplay.map);
  directionsService.route({
    origin: markers[0].position,
    destination: markers[labelIndex-1].position,
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