// console.log("Playlists Ctrl loaded"); // Feedback
angular.module('playlistsCtrl', ['ridesService'])
.controller('PlaylistsCtrl', function($scope, testVariable, testFunction,$http) {
  console.log(testFunction(5));
  console.log(testVariable);
$scope.test = function($cordovaOauth){
  console.log($cordovaOauth)
  ngCordovaOauth.google("xUDkon_2x6pBtISsx1dj0C-O-TSRrbRR", ["email"]).then(function(result) {
    console.log("Response Object -> " + JSON.stringify(result));
  }, function(error) {
    console.log("Error -> " + error);
  });
}
  var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/user/create";
  $http.post(url, {
    "userID":userID,
    "message":email,
    // "passwrd": storedUsername
  }).then(function (resps) {
    console.log(resps)
  })
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
    "userID": "sam"
  }).then(function (resps) {
    console.log(resps)
  })
 $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', dropoff: 'Golden Gate Bridge, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', dropoff: '755 Ocean Ave, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', dropoff: '680 Point Lobos Ave, San Francisco, CA 94121', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  dropoff: 'Salesforce Twoer, San Francisco, CA 94105', pickup: 'Menlo School, Atherton, CA 94027' },
  ];
})
