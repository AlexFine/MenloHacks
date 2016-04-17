angular.module('playlistCtrl', [])
.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope.oneOn = true;
    $scope.toggleTab = function(){
        $scope.oneOn = !$scope.oneOn;
        console.log("Toggling");
    }


    $scope.currentpage = window.location.href;
    var currentpage = window.location.href;
    var lastChar = currentpage.charAt(currentpage.length - 1);
    $scope.lastChar = lastChar;

     $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', place: 'Golden Gate Bridge, San Francisco, CA'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', place: '755 Ocean Ave, San Francisco, CA' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', place: '680 Point Lobos Ave, San Francisco, CA 94121' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  place: 'Salesforce Twoer, San Francisco, CA 94105' },
  ];
});
