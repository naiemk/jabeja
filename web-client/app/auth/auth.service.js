(function(){
  'use strict';
   angular
    .module('authApp')
    .factory('authService', authService);

    authService.$inject = ['$http', 'utilServices', '$window'];

    function authService($http, utilServices, $window) {
      var service = {
        signUp: signUp,
        localLogin: localLogin,
        facebookLogin: facebookLogin,
        logOut: logOut
      };
      return service;

      function facebookLogin(accessToken) {
        return $http.get('http://localhost:8000/jabeja/api/user/auth/facebook/token?access_token=' + accessToken)
          .then(getAuthToken)
          .catch(checkError)
      }

      function localLogin(username, password) {
        var req = {
          method: 'POST',
          url: 'http://localhost:8000/jabeja/api/user/auth/local',
          data: {email: username, password: password}
        }
        return $http(req)
          .success(function(data) {
            getAuthToken(undefined, data);
          })
          .error(function handler() {
            console.log("error happend");
          })
      }

      function signUp(username, password, email, firstName, lastName) {

      }

      function getAuthToken(response, data) {
        var token = (typeof data === "undefined") ?  response.data.token : data.token;
        if (token.toLowerCase().startsWith("jwt")) {
          return token.split(" ")[1];
        }
        return "unauthorized";
      }

      function logOut() {
        utilServices.removeAuthToken();
        $window.location.href = '#/auth';
      }

      function checkError(error) {
        console.log(error);
      }
    }
})();
