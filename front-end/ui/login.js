
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
              <img src="{{ctrl.userImg}}" /> <br/>
                    <p>Welcome {{ctrl.name}}</p>
              <center>
            </div>
            `,
            controller : function LoginBoxController($http, $timeout, loginService) {
                var ctrl = this;
                var parts = (window.location.hash || "").split(/user_id:/);
                if (parts.length == 2) {
                  var userId = parts[1];
                  console.log(userId)
                  $http({ method: 'GET', url: '/user', params: {userId: userId} }).then(
                      function success(result) {
                          $timeout(function() {
                            console.log(result.data);
                            ctrl.userImg = result.data.img;
                            ctrl.name = result.data.name;
                            ctrl.loggedIn = true;
                            loginService.loggedIn(userId, ctrl.name);
                          });
                      },
                      function error(err) {
                          errorCallback(err);
                      }
                  );
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
