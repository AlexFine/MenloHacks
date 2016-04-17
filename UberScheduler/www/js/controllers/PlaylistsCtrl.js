console.log("Playlists Ctrl loaded");
angular.module('playlistsCtrl', ['ridesService'])
.controller('PlaylistsCtrl', function($scope, testVariable, testFunction) {
  console.log(testFunction(5));
  console.log(testVariable);

  $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', place: 'Golden Gate Bridge, San Francisco, CA'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', place: '755 Ocean Ave, San Francisco, CA' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', place: '680 Point Lobos Ave, San Francisco, CA 94121' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  place: 'Salesforce Twoer, San Francisco, CA 94105' },
  ];
})
