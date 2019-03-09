var app = angular.module('myApp', []);
app.config(function($httpProvider) {
    //$httpProvider.defaults.common['Authorization'] = "e6f26944155298b1b11981038b156742";
    // For angular 1.5, use:
     //$httpProvider.defaults.headers.common['Authorization'] = "e6f26944155298b1b11981038b156742";
     //$httpProvider.defaults.headers.common['X-Yahoo-App-Id'] = "DdW3M76q";
      $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
});
app.controller('MainController',['$scope','$http',function($scope,$http) {
        var url = 'https://weather-ydn-yql.media.yahoo.com/forecastrss';
        var method = 'GET';
        var app_id = 'DdW3M76q';
        var consumer_key = 'dj0yJmk9ZUF0QnNSR05kYUk4JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PTg2';
        var consumer_secret = '714b5a47058a838dfbd92267f33753d45039d4f6';
        var concat = '&';
        var query = {'location': '10001', 'format': 'json','d':6};







    $scope.title = "WEATHER";
    $scope.city = '';
    $scope.clock = '';
    $scope.today = true;
    //$scope.key = "e6f26944155298b1b11981038b156742";

    // Search the city inputed
    $scope.search = function(city) {
      //**********************************logic from the docs plus same edits***************************************************/
      var oauth = {
         'oauth_consumer_key': consumer_key,
         'oauth_nonce': Math.random().toString(36).substring(2),
         'oauth_signature_method': 'HMAC-SHA1',
         'oauth_timestamp': parseInt(new Date().getTime() / 1000).toString(),
         'oauth_version': '1.0'
      };
      var city = $scope.city;
      //console.log(city);
      query.location = city;
      var merged = {};
      $.extend(merged, query, oauth);
      // Note the sorting here is required
      var merged_arr = Object.keys(merged).sort().map(function(k) {
       return [k + '=' + encodeURIComponent(merged[k])];
      });
      var signature_base_str = method
       + concat + encodeURIComponent(url)
       + concat + encodeURIComponent(merged_arr.join(concat));

      var composite_key = encodeURIComponent(consumer_secret) + concat;
      var hash = CryptoJS.HmacSHA1(signature_base_str, composite_key);
      var signature = hash.toString(CryptoJS.enc.Base64);

      oauth['oauth_signature'] = signature;
      var auth_header = 'OAuth ' + Object.keys(oauth).map(function(k) {
       return [k + '="' + oauth[k] + '"'];
      }).join(',');
      //*************************************************************************************/

         try{
              $http({
                  method : "GET",
                  url : url + '?' + $.param(query),
                  headers: {
                    'Authorization': auth_header,
                    'X-Yahoo-App-Id': app_id
                  }
              }).then(function mySucces(response) {
                  $scope.weather = response.data;
                // console.log(response)
              }, function myError(response) {
                  $scope.weather = response.statusText;
              });
            }
            catch(e){
              //console.log(e);
            }

            //console.log($scope.weather);
    }

    // Get the date, Time.
   $scope.getTimeString = function(clock) {
        var d = new Date (new Date().toDateString() + ' ' + clock);
        var str = '';
        var hrs = d.getHours();

        var meridian = hrs < 12 ? ' am' : ' pm';  // Setting the am : pm
        hrs = hrs % 12;
        if (hrs == 0) { hrs = 12; }               //if hrs is 0 paste the am to hrs
        str += hrs;

        str += ':';
        var mins = d.getMinutes();                //Get the currently Minute
        str += (mins < 10 ? '0' : '') + mins;     //Minute is less than 10 paste "0" to min

        str += meridian;
        return str;
    };

    //get forcast length
    $scope.getForLen = function(data){
    //  console.log(data);
      if(data !== undefined){
        //now check the length
        if(data.forecasts.length == 0){
          return true;
        }
      }
      else{
        return false;
      }

    }
    //wind speed is km/h for u=f (default) or m/h for u=c
    $scope.windSpeed =  "km/h";

    // Formatting to the Data type
    $scope.formatDate = function(date) {
        var str = date.split(" ");

        return str[0] + " " + str[1];
    };
    // Formatting to the Time type by getTimeString
    $scope.formatTime = function(timeStr) {
      return $scope.getTimeString(timeStr);
    }

    // clear city and all the weather results
    $scope.clear = function() {
      $scope.city    = "";
      $scope.weather = "";
    }

    // toggle display
    $scope.toggle = function() {
      $scope.today = !$scope.today;
    }
}]);
