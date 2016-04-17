console.log("Playlist Ctrl Loaded")
angular.module('playlistCtrl', ['ridesService'])
.controller('PlaylistCtrl', function($scope, $stateParams, retrieveSchedule) {

    // For tabs
    $scope.oneOn = true;
    $scope.toggleTab = function(){
        $scope.oneOn = !$scope.oneOn;
        console.log("Toggling");

    }


    // Identifying which page
    $scope.currentpage = window.location.href;
    var currentpage = window.location.href;
    var lastChar = currentpage.charAt(currentpage.length - 1);
    $scope.lastChar = lastChar;

    $scope.playlists = retrieveSchedule;
     $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', dropoff: 'Golden Gate Bridge, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', dropoff: '755 Ocean Ave, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', dropoff: '680 Point Lobos Ave, San Francisco, CA 94121', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  dropoff: 'Salesforce Twoer, San Francisco, CA 94105', pickup: 'Menlo School, Atherton, CA 94027' },
  ];
	
});
