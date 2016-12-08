(function(){
  'use strict';
   angular
    .module('utilApp')
    .factory('utilServices', utilServices);

    utilServices.$inject = ['localStorageService'];

    function utilServices(localStorageService) {
      var service = {
        setAuthToken: setAuthToken,
        getAuthToken: getAuthToken,
        removeAuthToken: removeAuthToken
      };
      return service;

      function setAuthToken(token) {
        return localStorageService.set('jabejaToken', token);
      }

      function getAuthToken() {
        return localStorageService.get('jabejaToken');
      }

      function removeAuthToken() {
        return localStorageService.remove('jabejaToken');
      }
    }
})();
