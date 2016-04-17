// console.log("Playlist Ctrl Loaded"); // Debugging
angular.module('playlistCtrl', ['ridesService', 'ionic-timepicker'])
.controller('PlaylistCtrl', function($scope, $stateParams, retrieveSchedule, pushSchedule, ionicTimePicker) {
  // Get playlist from service
  $scope.playlists = retrieveSchedule;

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

  // Retrieve the schedule data from service
  $scope.playlists = retrieveSchedule;

  // Create time picker object
  // Time picker documentation: https://github.com/rajeshwarpatlolla/ionic-timepicker
  var currentEpoche = (((new Date()).getHours() * 60 * 60) + ((new Date()).getMinutes() * 60));
  currentEpoche = 3600 * Math.round(currentEpoche/3600); // Round to the nearest hour
  var timePicker = {
    callback: function (val) { // Mandatory callback when closed or saved
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else { // Valid input
        var selectedTime = new Date(val * 1000);
        // console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), 'H :', selectedTime.getUTCMinutes(), 'M');
        console.log(selectedTime);
        var hour = selectedTime.getUTCHours();
        var str = "AM";
        if (hour > 12) {
          hour += -12;
          str = "PM"
        } else if (hour == 12) {
          str = "PM"
        }
        var minutes = selectedTime.getUTCMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var concatString = hour + ":" + minutes + " " + str;
        console.log(concatString);

        var oldPlaylist = retrieveSchedule[lastChar-1];
        var updatedPlaylist = {
          time: concatString,
          id: $scope.lastChar,
          image: oldPlaylist.image,
          dropoff: oldPlaylist.dropoff,
          pickup: oldPlaylist.pickup
        }
        pushSchedule(updatedPlaylist)
      }
    },
    // Optional settings
    inputTime: currentEpoche + (60 * 60), // Pass in epoche time + an hour
    format: 12,
    step: 5,
    setLabel: 'Save',
    closeLabel: 'Cancel'
  };

  // Setting time
  $scope.editTime = function(lastChar) { // lastChar is the index in the URL
    // console.log(lastChar); // Debugging

    // Open time picker object
    ionicTimePicker.openTimePicker(timePicker);
  }
	
	$scope.gPlace;

});
