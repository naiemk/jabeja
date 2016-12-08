(function() {
  'use strict';
  angular
    .module('tripApp')
    .controller('TripController', TripController);

  TripController.$inject = ['utilServices', '$location', '$window', 'authService'];
  function TripController(utilServices, $location, $window, authService) {
    init();
    var vm = this;
    vm.userToken = utilServices.getAuthToken();
    vm.logOut = logOut();

    function init() {
      if (!utilServices.getAuthToken())
        $window.location.href = '#/auth';
    }
    
    function logOut() {
      if (vm.userToken) {
        authService.logOut();
      }
    }
  }
})();
