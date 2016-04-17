// console.log("Playlist Ctrl Loaded"); // Debugging
angular.module('playlistCtrl', ['ridesService', 'ionic-timepicker', 'ionic-datepicker'])
.controller('PlaylistCtrl', function($scope, $stateParams, retrieveSchedule, pushSchedule, ionicTimePicker, ionicDatePicker) {
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

  // Day of the week picker
  $scope.daysOfWeekLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $scope.daysOfWeekShort = ["S", "M", "T", "W", "T", "F", "S"];
  $scope.toggleRepeatedDay = function(index) {
    // console.log(index); // Debugging
    var oldPlaylist = retrieveSchedule[lastChar-1]; // Store old
    var newRepeat = oldPlaylist.repeatedDays; // Store old
    newRepeat[index] = !oldPlaylist.repeatedDays[index]; // Toggle
    console.log("Toggling", $scope.daysOfWeekLong[index], "to", newRepeat[index]); // Debugging

    var updatedPlaylist = {
      time: oldPlaylist.time,
      id: $scope.lastChar,
      date: oldPlaylist.date,
      repeating: oldPlaylist.repeating,
      repeatedDays: newRepeat,
      image: oldPlaylist.image,
      dropoff: oldPlaylist.dropoff,
      pickup: oldPlaylist.pickup
    }
    pushSchedule(updatedPlaylist); // Push to server
  }

  // Repeat toggle switch value
  $scope.repeating = false; // Initial value
  $scope.initialRepeat = function() {
    $scope.repeating = retrieveSchedule[lastChar-1].repeating;
  }
  $scope.changedRepeat = function() {
    var oldPlaylist = retrieveSchedule[lastChar-1];
    var repeatVal = document.getElementById('repeatingCheckboxVal').innerHTML;
    console.log(repeatVal);
    var updatedPlaylist = {
      time: oldPlaylist.time,
      id: $scope.lastChar,
      date: oldPlaylist.date,
      repeating: repeatVal,
      repeatedDays: oldPlaylist.repeatedDays,
      image: oldPlaylist.image,
      dropoff: oldPlaylist.dropoff,
      pickup: oldPlaylist.pickup
    };
    pushSchedule(updatedPlaylist);
  }


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
        // console.log(selectedTime);
        var hour = selectedTime.getUTCHours();
        var str = "AM";
        if (hour > 12) {
          hour += -12;
          str = "PM"
        } else if (hour == 12) {
          str = "PM"
        }
        if (hour == 0) {
          hour = 12; // Fix the 0 hour issue
        }
        var minutes = selectedTime.getUTCMinutes();
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        var concatString = hour + ":" + minutes + " " + str;
        // console.log(concatString); // Feedback

        var oldPlaylist = retrieveSchedule[lastChar-1];
        var updatedPlaylist = {
          time: concatString,
          id: $scope.lastChar,
          date: oldPlaylist.date,
          repeating: oldPlaylist.repeating,
          repeatedDays: oldPlaylist.repeatedDays,
          image: oldPlaylist.image,
          dropoff: oldPlaylist.dropoff,
          pickup: oldPlaylist.pickup
        }
        $scope.playlists[lastChar-1] = updatedPlaylist;
        pushSchedule(updatedPlaylist)
      }
    },
    // Optional settings
    inputTime: currentEpoche + (60 * 60), // Pass in epoche time + an hour
    format: 12,
    step: 5,
    setLabel: "Save",
    closeLabel: "Cancel"
  };

  // Setting time
  $scope.editTime = function() { // lastChar is the index in the URL
    ionicTimePicker.openTimePicker(timePicker); // Open time picker object
  }

  // Initializing datepicker
  var datepicker = {
    callback: function (val) { // Mandatory callback
      console.log('Return value from the datepicker popup is : ' + val, new Date(val));
      var oldPlaylist = retrieveSchedule[lastChar-1];
      var updatedPlaylist = {
        time: oldPlaylist.time,
        id: $scope.lastChar,
        date: new Date(val),
        repeating: oldPlaylist.repeating,
        repeatedDays: oldPlaylist.repeatedDays,
        image: oldPlaylist.image,
        dropoff: oldPlaylist.dropoff,
        pickup: oldPlaylist.pickup
      }
      $scope.playlists[lastChar-1] = updatedPlaylist;
      pushSchedule(updatedPlaylist); // Push to server
    },
    // Optional
    disabledDates: [],
    from: new Date(), // Only allow future dates
    inputDate: retrieveSchedule[lastChar-1].date,
    showTodayButton: true,
    mondayFirst: false,
    closeOnSelect: false,
    setLabel: "Save",
    closeLabel: "Cancel",
    templateType: 'popup'
  };

  $scope.editDate = function() {
    ionicDatePicker.openDatePicker(datepicker); // Open date picker object
  };

  // Setting date

	$scope.gPlace;

});
