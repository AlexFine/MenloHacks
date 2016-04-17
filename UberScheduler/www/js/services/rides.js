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

  .factory('retrieveSchedule', function($http) {
    // Pull from server
	var userID = "sam";
	var email = "menlohacks@gmail.com"
//	var time = '9:45 AM';
//  var date = [2016, 20, 4],
//	date = JSON.stringify(date);
//  var repeating = false;
//  var repeatedDays = [false, true, false, true, false, true, false];
//  var repeatedDays = JSON.stringify(repeatedDays)
//  var image = 'img/Golden.jpg';
//  var dropoff = 'Golden Gate Bridge, San Francisco, CA';
//  var pickup = 'Menlo School, Aherton, CA 94027'
						
				
	
  var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/ride/return";
  $http.post(url, {
    "userID":userID
  }).then(function (resps) {
    console.log(resps)
  })
  var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/ride/create";
  $http.post(url, {
    "daysOfWeek": "1",
    "dropLat": 2,
    "dropLong": 2,
    "timeSec": "3",
    "pickLat": 12,
    "time": "2",
    "pickLong": 3,
    "userID": "sam",
		"date": "2016, 20, 4"
  }).then(function (resps) {
    console.log(resps)
  })
	

    var playlists = [
      {
        time: '9:45 AM',
        id: 1,
        date: new Date(2016, 20, 4),
        repeating: false,
        repeatedDays: [false, true, false, true, false, true, false],
        image: 'img/Golden.jpg',
        dropoff: 'Golden Gate Bridge, San Francisco, CA',
        pickup: 'Menlo School, Atherton, CA 94027',
				key: 'ABCDEFG'
      },
      {
        time: '4:00 PM',
        id: 2,
        date: new Date(2016, 20, 4),
        repeating: false,
        repeatedDays: [false, false, false, false, false, false, false],
        image: 'img/Art.jpg',
        dropoff: '755 Ocean Ave, San Francisco, CA',
        pickup: 'Menlo School, Atherton, CA 94027',
				key: 'ABCDEFG'
      },
      {
        time: '6:30 PM',
        id: 3,
        date: new Date(2016, 20, 4),
        repeating: false,
        repeatedDays: [false, true, false, true, false, true, false],
        image: 'img/Land.jpg',
        dropoff: '680 Point Lobos Ave, San Francisco, CA 94121',
        pickup: 'Menlo School, Atherton, CA 94027',
				key: 'ABCDEFG'
      },
      {
        time: '5:00 AM',
        id: 4,
        date: new Date(2016, 20, 4),
        repeating: false,
        repeatedDays: [false, true, false, true, false, true, false],
        image: 'img/Salesforce.jpg',
        dropoff: 'Salesforce Twoer, San Francisco, CA 94105',
        pickup: 'Menlo School, Atherton, CA 94027',
				key: 'ABCDEFG'
      },
    ];

	
    return playlists
  })

  .factory('pushSchedule', function() {
    return function(playlist) {
      console.log("Pushing playlist:", playlist);
      // Push to server
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
