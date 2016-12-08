(function() {
  'use strict';
  angular
    .module('JabeJa')
    .controller('JabejaController', JabejaController);
    JabejaController.$inject = ['utilServices', '$location'];
    function JabejaController() {
       init();
       var vm = this;
       vm.userToken = '';

       function init() {
         var token = utilServices.getAuthToken();
         if (token) {
           vm.userToken = token;
         } else {
           $location.path('')
         }
       }


   }
})();
