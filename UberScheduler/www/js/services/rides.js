console.log("Rides service file loaded");
angular.module('ridesService', ['ionic','$http'])
  .factory('testVariable', function() {
    return "Rides Service Works"
  })

  .factory('testFunction', function() {
      return function(num) {
        return num * 2
      }

  })

  .factory('timeEstimate', function() {
    return function(long, lat, uber_level) {
      baseurl = "https://sandbox-api.uber.com/v1/estimates/time"

      parameters = {
        'server_token': 'ikGvlAJSejPSY6bUp7APhxkwyu5ermguZnreUaCd',
        'start_latitude': str(lat),
        'start_longitude': str(long),
      }

      url = baseurl + "?" + "server_token=" + parameters['server_token'] + "&start_latitude=" + parameters[
          'start_latitude'] + "&start_longitude=" + parameters['start_longitude']
      $http.get(url).success(function(data){
        return data
      })

    }

  })
