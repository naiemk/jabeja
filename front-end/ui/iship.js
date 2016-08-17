
(function() {
    angular.module("jabeja").component('iShip', {
            template : `
 <div id="box" class="container">
  <div class="row space"></div>
  <div class="row space">
      <div class="col col-sm-12">
      <center>
          <a href="#" ng-click="ctrl.toggle()" ng-show="ctrl.isLoggedIn"
              class="learnmore_btn wide">I WANT TO HELP SHIPPING STUFF</a>
          <a href="#" ng-hide="ctrl.isLoggedIn"
              class="learnmore_btn wide">LOG IN TO HELP SHIPPING STUFF</a>
          </center>
      </div>
  </div>
</div>

  <div class="row space"></div>
  <div class="row space"></div>
<form name="iShipFrm" novalidate>

<div  class="animate-show" ng-show="ctrl.iShip">
<div  class="container" >
  <div class="row space">
  <div class="col col-sm-12 col-md-12">

  <div class="panel">
    <div class="panel-body">
      <div class="row space">
          <div class="col col-sm-12">
              <label>I am flying from</label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.from"></fancy-dropDown>
      <div class="row">
          <div class="col col-sm-12">
            <label>
                to
            </label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.to"></fancy-dropDown>
      <div class="row">
          <div class="col col-sm-12">
            <label>
                In month
            </label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.month"></fancy-dropDown>
      <div class="row">
          <div class="col col-sm-12">
            <label>
                And I accept
            </label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.what"></fancy-dropDown>

      <div class="row space">
          <div class="col col-sm-12">
            <label>
                Contact me using
            </label>
          </div>
      </div>
      <div class="row">
          <div class="col col-sm-12">
            <input type="email" name="email" required placeholder="email@gmail.com" ng-model="ctrl.email"/>
          </div>
      </div>
      <div class="row space">
          <div class="col col-sm-12">
          <div role="alert">
            <span class="label label-danger" ng-show="iShipFrm.email.$error.required">
              Required!</span>
            <span class="label label-danger" ng-show="iShipFrm.email.$error.email">
              Not valid email!</span>
          </div>
          </div>
      </div>

      <div class="row space">
          <div class="col col-sm-12">
          <center>
              <a href="#" ng-click="ctrl.register(iShipFrm.$valid)" class="learnmore_btn">Submit</a>
              </center>
          </div>
      </div>

    </div>
    </div>
    </div>
  </div>
</div>
</div>
</form>

            `,
            controller : function LoginBoxController($http, $timeout, loginService) {
                var ctrl = this;
                ctrl.userName = "Chili";
                ctrl.from = {
                  items: ["Seattle", "Tehran"],
                  selected: "Seattle"
                };

                ctrl.to = {
                  items: [ "Tehran", "Seattle" ],
                  selected: "Tehran"
                }

                ctrl.what = {
                  items : [ "Money", "Documents", "Both" ],
                  selected: "Money"
                }

                ctrl.month = {
                  items : [ "Aug", "Sep", "Oct", "Nov", "Dec" ],
                  selected: "Aug"
                }

                ctrl.getFinishMonth = function() {
                  var mon = ctrl.month.selected;
                  console.log(new Date(Date.parse(mon + " 1, 2016")));
                  return new Date(Date.parse(mon + " 1, 2016"));
                }

                ctrl.iShip = false;
                ctrl.toggle = function() {
                  ctrl.iShip = true;
                  $timeout(function() {
                    $('#box').scrollView();
                  }, 1000);
                }

                ctrl.register = function(isValid) {
                  if (isValid) {
                    var userId = loginService.getUserId();
                    var name = loginService.getUserName();

                    var trip = {
                      userId : userId,
                      name : name,
                      email : ctrl.email,
                      deliveryType : ctrl.what.selected,
                      source : ctrl.from.selected,
                      dest : ctrl.to.selected,
                      finishDate : ctrl.getFinishMonth(),
                      userImg : ctrl.userImg
                    };

                    console.log(trip);

                    $http({ method: 'POST', url: '/jabeja/api/trip', data: trip }).then(
                        function success(result) {
                            $timeout(function() {
                              console.log(result);
                            });
                        },
                        function error(err) {
                            console.log(err);
                        }
                    );

                    $timeout(function() {
                      ctrl.iShip = false;
                    });
                  }
                }

                $.fn.scrollView = function () {
                    return this.each(function () {
                        $('html, body').animate({
                            scrollTop: $(this).offset().top
                        }, 1000);
                    });
                }

                // Update user email if logged in.
                loginService.onChange(function() {
                  console.log("LOGGED IN!")
                  $timeout(function(){
                    ctrl.isLoggedIn = loginService.getUserId() || false;
                    var user = loginService.getUser();
                    if (user) {
                      ctrl.email = user.email;
                      ctrl.userImg = user.img;
                      console.log("USER IMG IS ", ctrl.userImg)
                    }
                  });
                });
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
