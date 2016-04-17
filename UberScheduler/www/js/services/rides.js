// console.log("Rides service file loaded"); // Feedback
angular.module('ridesService', ['ionic'])
  .factory('testVariable', function() {
    return "Rides Service Works"
  })

  .factory('testFunction', function() {
      return function(num) {
        return num * 2
      }

  })

  .factory('retrieveSchedule', function() {
    var playlists = [
      { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', dropoff: 'Golden Gate Bridge, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027'},
      { time: '4:00 PM', id: 2, image: 'img/Art.jpg', dropoff: '755 Ocean Ave, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027' },
      { time: '6:30 PM', id: 3, image: 'img/Land.jpg', dropoff: '680 Point Lobos Ave, San Francisco, CA 94121', pickup: 'Menlo School, Atherton, CA 94027' },
      { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  dropoff: 'Salesforce Twoer, San Francisco, CA 94105', pickup: 'Menlo School, Atherton, CA 94027' },
    ];
    return playlists
  })

  .factory('pushSchedule', function() {
    return function(playlist) {
      console.log("Pushing playlist:", playlist);
    }
  })

  .factory('timeEstimate', function() {
    return function(long, lat, uber_level) {
      baseurl = "https://sandbox-api.uber.com/v1/estimates/time"

      parameters = {
        'server_token': 'ikGvlAJSejPSY6bUp7APhxkwyu5ermguZnreUaCd',
        'start_latitude': str(lat),
        'start_longitude': str(long),
      }

      url = baseurl + "?" + "server_token=" + parameters['server_token'] + "&start_latitude=" + parameters[
          'start_latitude'] + "&start_longitude=" + parameters['start_longitude']
      $http.get(url).success(function(data){
        return data
      })

    }

  })

.directive('googleplace', function(){
	return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
 
            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});