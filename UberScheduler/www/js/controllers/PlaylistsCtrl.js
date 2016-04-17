// console.log("Playlists Ctrl loaded"); // Feedback
angular.module('playlistsCtrl', ['ridesService'])
.controller('PlaylistsCtrl', function($scope, testVariable, testFunction) {
  console.log(testFunction(5));
  console.log(testVariable);

 $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', dropoff: 'Golden Gate Bridge, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', dropoff: '755 Ocean Ave, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', dropoff: '680 Point Lobos Ave, San Francisco, CA 94121', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  dropoff: 'Salesforce Twoer, San Francisco, CA 94105', pickup: 'Menlo School, Atherton, CA 94027' },
  ];
})
