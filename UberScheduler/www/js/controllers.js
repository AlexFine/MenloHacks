angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', place: 'Golden Gate Bridge, San Francisco, CA'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', place: '755 Ocean Ave, San Francisco, CA' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', place: '680 Point Lobos Ave, San Francisco, CA 94121' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  place: 'Salesforce Twoer, San Francisco, CA 94105' },
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
    $scope.oneOn = true;
    $scope.toggleTab = function(){
        $scope.oneOn = !$scope.oneOn;
        console.log('Hello BOIIIOIOI')
    }
    
    
    $scope.currentpage = window.location.href;
    var currentpage = window.location.href;
    var lastChar = currentpage.charAt(currentpage.length - 1);
    $scope.lastChar = lastChar;

     $scope.playlists = [
    { time: '9:45 AM', id: 1, image: 'img/Golden.jpg', dropoff: 'Golden Gate Bridge, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027'},
    { time: '4:00 PM', id: 2, image: 'img/Art.jpg', dropoff: '755 Ocean Ave, San Francisco, CA', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '6:30 PM', id: 3, image: 'img/Land.jpg', dropoff: '680 Point Lobos Ave, San Francisco, CA 94121', pickup: 'Menlo School, Atherton, CA 94027' },
    { time: '5:00 AM', id: 4, image: 'img/Salesforce.jpg',  dropoff: 'Salesforce Twoer, San Francisco, CA 94105', pickup: 'Menlo School, Atherton, CA 94027' },
  ];
});

