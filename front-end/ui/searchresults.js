
(function() {
  angular.module("jabeja").component('searchResults', {
    template : `
      <div class="container">
        <div class="row space" ng-repeat="trip in ctrl.results | orderBy: '-deliveryDate'">
          <div class="col col-sm-12">
            <div class="card">
              <img class="card-img-top" src="{{trip.img}}" alt="Facebook image">
              <div class="card-block">
                <h4 class="card-title">{{trip.userName}}</h4>
                <p class="card-text">{{trip.deliveryDate}}</p>
                <a href="{{trip.facebookLink}}">Facebook Page</a>
                <br/><br/>
                <a href="mailto:{{trip.contact}}" ng-show="ctrl.isLoggedIn" class="btn btn-primary">Contact</a>
                <a href="#" ng-hide="ctrl.isLoggedIn" class="btn btn-primary">Log-in to Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>`,
    controller : function SearchResultController(loginService, $http, $timeout) {
      var ctrl = this;
      loginService.onChange(function() {
        $timeout(function(){ctrl.isLoggedIn = loginService.getUserId() || false;});
      });

      ctrl.results = [
      ];

      ctrl.$onChanges = function(changes) {
        ctrl.refresh();
      }

      ctrl.toDate = function (str) {
        // Date
        var date = new Date(str);
        var monthNames = ["January", "February", "March", "April", "May", "June",
                          "July", "August", "September", "October", "November", "December"];
        return monthNames[date.getMonth()] + " " + date.getFullYear();
      }

      ctrl.refresh = function() {
        var url = "/jabeja/api/trip/search/" + ctrl.what + "/" + ctrl.from + "/" + ctrl.to;
        console.log("Getting " + url);
        $http({ method: 'GET', url: url, params: {} }).then(
            function success(result) {
                console.log("Got ", result);

                $timeout(function() {
                  ctrl.results = result.data.map(function(item) {
                    var searchItem = {
                      img : item.userImg || "https://randomuser.me/api/portraits/thumb/women/80.jpg",
                      userName : item.name,
                      deliveryDate: ctrl.toDate(item.finishDate),
                      facebookLink: "https://facebook.com/" + item.userId,
                      contact: item.email
                    };
                    return searchItem;
                  });
                });
            },
            function error(err) {
                console.log(err);
            }
        );
      }
    },
    controllerAs : 'ctrl',
    bindings: {
        from: '<',
        to: '<',
        what: '<'
    }
  });
}());
