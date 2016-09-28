(function() {
  'use strict';
  angular
    .module('authApp')
    .controller('AuthController', AuthController);

    AuthController.$inject = ['authService'];
    function AuthController(authService) {
      var vm = this;
      vm.facebookLogin = facebookLogin;
      vm.userToken = "";

      function facebookLogin() {
        FB.login(function(response) {
          if (response.authResponse) {
            FB.api('/me', function(response) {
              var authResponse = FB.getAuthResponse().accessToken;
              authService.facebookLogin(authResponse)
                .then(function(data) {
                  console.log(data);
                });
            });
          } 
        });
     }
    }
})();
