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
});
