(function() {

    // Retrieve module rather than creating one.
    var app = angular.module("jabeja");

    app.service('loginService', [function () {
        var svc = this;
        svc.callbacks = [];
        svc.loggedIn = function(userId, name) {
          svc.userId = userId;
          svc.name = name;
          console.log("CV", svc.callbacks)
          while(cb = svc.callbacks.pop()) {
            if (cb) cb();
          }
        };

        svc.getUserId = function() {
          return svc.userId
        };

        svc.getUserName = function() {
          return svc.name
        };

        svc.onChange = function(callBack) {
          if (svc.userId) {
             callBack();
             return;
          }

          svc.callbacks.push(callBack);
        }
    }]);
}());
