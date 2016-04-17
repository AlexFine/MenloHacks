// console.log("Playlists Ctrl loaded"); // Feedback
angular.module('playlistsCtrl', ['ridesService'])
.controller('PlaylistsCtrl', function($scope, testVariable, testFunction,$http, $ionicPopup, retrieveSchedule) {
  console.log(testFunction(5));
  console.log(testVariable);
  // $scope.test = function($cordovaOauth){
  //   console.log($cordovaOauth)
  //   ngCordovaOauth.google("xUDkon_2x6pBtISsx1dj0C-O-TSRrbRR", ["email"]).then(function(result) {
  //     console.log("Response Object -> " + JSON.stringify(result));
  //   }, function(error) {
  //     console.log("Error -> " + error);
  //   });
  // }
  // var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/user/create";
  // $http.post(url, {
  //   "userID":userID,
  //   "message":email,
  //   // "passwrd": storedUsername
  // }).then(function (resps) {
  //   console.log(resps)
  // })
  // var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/ride/return";
  // $http.post(url, {
  //   "userID":userID
  // }).then(function (resps) {
  //   console.log(resps)
  // })
  // var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/ride/create";
  // $http.post(url, {
  //   "daysOfWeek": "1",
  //   "dropLat": 2,
  //   "dropLong": 2,
  //   "timeSec": "3",
  //   "pickLat": 12,
  //   "time": "2",
  //   "pickLong": 3,
  //   "userID": "sam"
  // }).then(function (resps) {
  //   console.log(resps)
  // })
	$scope.playlists = retrieveSchedule;

	
		$scope.addRide = function(){
			console.log("hello")
        var myPopup = $ionicPopup.show({
          template: "Add a new ride?",
          title: "Add Ride",
          scope: $scope,
          buttons: [
            
            {
              text: 'Cancel',
              type: 'button-stable',
              onTap: function () {
                console.log("hello2");
                myPopup.close();
              

              }
            },
						{
              text: 'Add',
              type: 'button-dark',
              onTap: function () {
                console.log("hello1");
                myPopup.close();
                $scope.playlists.push({
								 time: '9:45 AM',
        					id: 1,
        					date: new Date(2016, 20, 4),
        					repeating: false,
        					repeatedDays: [false, true, false, true, false, true, false],
        					image: 'img/Golden.jpg',
        				dropoff: 'Golden Gate Bridge, San Francisco, CA',
        					pickup: 'Menlo School, Atherton, CA 94027'
								})


              }
            }
          ]
        });
        $scope.closepopup = function () {
          myPopup.close();
        }
      }
	
	
})
