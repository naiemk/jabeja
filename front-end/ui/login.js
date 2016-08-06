
(function() {
    angular.module("jabeja").component('loginBox', {
            template : `
            <div ng-hide="ctrl.loggedIn">
              <center>
                    <a href="/login" class="learnmore_btn">Login with Facebook</a>
              <center>
            </div>
            <div ng-show="ctrl.loggedIn">
              <center>
                    <a class="learnmore_btn">Welcome {{ctrl.name}}</a>
              <center>
            </div>
            `,
            controller : function LoginBoxController($http, $timeout) {
                var ctrl = this;
                var parts = (window.location.hash || "").split(/user_id:/);
                if (parts.length == 2) {
                  var userId = parts.length[1];
                  $http({ method: 'GET', url: '/user', params: {userId: userId} }).then(
                      function success(result) {
                          $timeout(function() {
                            ctrl.name = result.data.name;
                          });
                      },
                      function error(err) {
                          errorCallback(err);
                      }
                  );
                  ctrl.loggedIn = true;
                } else {
                  ctrl.loggedIn = false;
                };

                return this;
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
