(function() {
  'use strict';
  angular
    .module('authApp')
    .controller('AuthController', AuthController);

    AuthController.$inject = ['authService', 'utilServices',
      '$location', '$window'];
    function AuthController(authService, utilServices, $location, $window) {
      var vm = this;
      vm.facebookLogin = facebookLogin;
      vm.localLogin = localLogin;
      vm.closeAlert = closeAlert;
      vm.createNewUser = createNewUser;
      vm.userToken = "";
      vm.username = "";
      vm.password = "";
      vm.authError = false;
      vm.userNotFound = false;
      vm.signup = false;
      vm.keepToken = false;

      function facebookLogin() {
        FB.login(function(response) {
          if (response.authResponse) {
            FB.api('/me', function(response) {
              var authResponse = FB.getAuthResponse().accessToken;
              authService.facebookLogin(authResponse)
                .then(function(token) {
                  if (token === "unauthorized") {
                    vm.authError = true;
                  } else {
                    utilServices.setAuthToken(token);
                    vm.userToken = token;
                  }
                });
            });
          }
        });
     }

     function localLogin() {
       authService.localLogin(vm.username, vm.password)
        .then(function(response) {
          if (response.data.success) {
            vm.userToken = response.data.token;
            utilServices.removeAuthToken();
            utilServices.setAuthToken(vm.userToken);
            $window.location.href = '#/trip';
            //can be redirected to list page
          } else if (!response.data.success &&
            (response.data.token.indexOf("User not found.") != -1)) {
            vm.userNotFound = true;
          } else {
            vm.authError = true;
          }
        });
     }

     function closeAlert() {
       if (vm.authError) vm.authError = false;
       if (vm.userNotFound) vm.userNotFound = false;
     }

     function createNewUser() {
       vm.signUp = true;
     }
    }
})();
