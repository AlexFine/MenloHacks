// console.log("Playlist Ctrl Loaded"); // Debugging
angular.module('playlistCtrl', ['ionic', 'ridesService', 'geocodingService', 'ionic-timepicker', 'ionic-datepicker'])
.controller('PlaylistCtrl', function($scope, $ionicPopup, $stateParams, retrieveSchedule, pushSchedule, ionicTimePicker, ionicDatePicker, reverseGeocode, geocodeAddress, $http, $state) {
  
  // Test reverse geocoding
  reverseGeocode(34.07636433, -118.4290661);
  geocodeAddress("Salesforce Tower, San Francisco, CA 94105");

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

  // Set location on start
  $scope.pickup = $scope.playlists[lastChar-1].pickup;
  $scope.dropoff = $scope.playlists[lastChar-1].dropoff;

  // Update the scope value every time there's a change
  $scope.updatedLocation = function() {
    $scope.pickup = document.getElementById('pickup').value;
    $scope.dropoff = document.getElementById('dropoff').value;
  }

  // Day of the week picker
  $scope.daysOfWeekLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  $scope.daysOfWeekShort = ["S", "M", "T", "W", "T", "F", "S"];
  $scope.showColon = function() { // To decide if showing a colon
    for(var i = 0; i < 7; i++) { // Cycle
      if ($scope.playlists[lastChar-1].repeatedDays[i] == true) {
        return true // Show colon
      }
    }
  }
  $scope.showComma = function(index) {
    var repeatedDays = $scope.playlists[lastChar-1].repeatedDays;
    var lastSelectedDay = 0;
    for (var i = 0; i < repeatedDays.length; i++) {
      if (repeatedDays[i]) {
        lastSelectedDay = i;
        // console.log("Last selected day:", lastSelectedDay); // Debugging
      }
    }
    if (index == lastSelectedDay) {
      // console.log("Not using comma");
      return false
    } else {
      // console.log("Using comma");
      return true
    }
  }
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

  $scope.data = $scope.playlists[lastChar-1].repeatedDays; // Starting values
  // Repeating day toggle switch value
  $scope.showPopup = function() {
    var repeatedDays = retrieveSchedule[lastChar-1].repeatedDays;
    var template = "<ion-list>";
    for (var i = 0; i < repeatedDays.length; i++) { // Repeat for all days of week
      template += "<ion-checkbox ng-model='data[";
      template += i;
      template += "]'>";
      template += $scope.daysOfWeekLong[i];
      template += "</ion-checkbox>";
    }
    template += "</ion-list>";

    var schedulePopup = $ionicPopup.show({
      template: template,
      title: 'Recurring Schedule',
      subTitle: 'Select days of the week',
      scope: $scope,
      buttons: [
        { text: 'Cancel' },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (false) {
              // Will never trigger
              e.preventDefault();
            } else {
              // Save data
              var oldPlaylist = retrieveSchedule[lastChar-1];
              var updatedPlaylist = {
                time: oldPlaylist.time,
                id: $scope.lastChar,
                date: oldPlaylist.date,
                repeating: oldPlaylist.repeating,
                repeatedDays: $scope.data,
                image: oldPlaylist.image,
                dropoff: oldPlaylist.dropoff,
                pickup: oldPlaylist.pickup
              }
              $scope.playlists[lastChar-1] = updatedPlaylist;
              pushSchedule(updatedPlaylist)
              return repeatedDays;
            }
          }
        }
      ]
    });
  }

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

	$scope.update = function() {

    var address = $scope.pickup;
    console.log("Geocode started");
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, function(results, status) {
      console.log("Geo finished");
      if (status === google.maps.GeocoderStatus.OK) { // Success
        var position = results[0].geometry.location;
        var pickupLat = position.lat();
        var pickupLng = position.lng();

        var address = $scope.dropoff;
        console.log("Geocode 2 started");
        geocoder.geocode({'address': address}, function(results, status) {
          console.log("Geo 2 finished");
          if (status === google.maps.GeocoderStatus.OK) { // Success
            var position2 = results[0].geometry.location;
            var dropLat = position2.lat();
            var dropLng = position2.lng();
            console.log("Geocoding 2 successful", dropLat, dropLng);
            console.log("Geocoding 1 successful", pickupLat, pickupLng);

            var id = $scope.lastChar;
        		var date = $scope.playlists[id].date;
        		date = JSON.stringify(date);

        		var repeatedDays = $scope.playlists[id].repeatedDays;
        		repeatedDays = JSON.stringify(repeatedDays)

        		var url = "https://uberschedulerp.appspot.com/_ah/api/uberApi/v1/ride/create";
            $http.post(url, {
              "daysOfWeek": repeatedDays,
              "dropLat": dropLat,
              "dropLong": dropLng,
              "timeSec": "3",
              "pickLat": pickupLat,
              "time":$scope.playlists[id].time,
              "pickLong": pickupLng,
              "userID": "sam",
            	"date": date,
            	"message":'Hello world'
              // EDIT THIS IF NECCESSARY
            }).then(function (resps) {
              console.log("RESPONSE" + resps)
          		console.log(resps)
          		console.log(resps.data.key)
          		//add key to array
          		$scope.playlists[id].key = resps.data.key;
              $state.go('app.playlists')
            })

          } else { // Error
            alert('Geocode was not successful for the following reason: ' + status);
          }
        });
      } else { // Error
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
	}
});
