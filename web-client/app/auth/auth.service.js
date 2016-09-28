(function(){
  'use strict';
   angular
    .module('authApp')
    .factory('authService', authService);

    authService.$inject = ['$http'];

    function authService($http) {
      var service = {
        signUp: signUp,
        logIn: logIn,
        facebookLogin: facebookLogin
      };
      return service;

      function facebookLogin(accessToken) {
        return $http.get('/jabeja/api/user/auth/facebook/token?access_token=' + accessToken)
          .then(getAuthToken)
          .catch(checkError)
      }

      function logIn(username, password) {

      }

      function signUp(username, password, email, firstName, lastName) {

      }

      function getAuthToken(response) {
        return response.data.token;
      }

      function checkError(error) {
        console.log(error);
      }
    }
})();
