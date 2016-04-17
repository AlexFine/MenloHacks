// console.log("Geocoding service file loaded"); // Debugging
angular.module('geocodingService', ['ionic'])
  .factory('reverseGeocode', function() {
    return function(lat, lng) {
      var locationStr = "[" + lat + ", " + lng +"]:";
      var geocoder = new google.maps.Geocoder;
      var latlng = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
      console.log(locationStr, "Reverse geocode lookup started");
      geocoder.geocode({
        'location': latlng
      }, function (results, status) {
        console.log("RG lookup finished")
        if (status === google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var address = results[1];
            console.log(locationStr, address)
            return address
          } else {
            console.log("RG: No results found");
            return "No address found"
          }
        } else {
          console.log("Geocoder failed due to:", status);
          return "Address lookup failed"
        }
      });
    };
  })

  .factory('geocodeAddress', function() {
    return function(address) {
      console.log("Geocode started");
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address': address}, function(results, status) {
        console.log("Geo finished");
        if (status === google.maps.GeocoderStatus.OK) { // Success
          var position = results[0].geometry.location;
          var lat = position.lat();
          var lng = position.lng();
          console.log("Geooding successful", lat, lng);
          return [lat, lng]
        } else { // Error
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  })
