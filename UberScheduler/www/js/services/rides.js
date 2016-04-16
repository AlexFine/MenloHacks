console.log("Rides service file loaded");
angular.module('ridesService', ['ionic'])
  .factory('testVariable', function() {
    return "Rides Service Works"
  })

  .factory('testFunction', function() {
    return function(num) {
      return num * 2
    }
  })
