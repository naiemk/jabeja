
(function() {
    angular.module("jabeja").component('iShip', {
            template : `
 <div id="box" class="container">
  <div class="row space"></div>
  <div class="row space">
      <div class="col col-sm-12">
      <center>
          <a href="#" ng-click="ctrl.toggle()"
              class="learnmore_btn wide">I WANT TO HELP SHIPPING STUFF</a>
          </center>
      </div>
  </div>
</div>

  <div class="row space"></div>
  <div class="row space"></div>
  
<div  class="container space animate-show" ng-show="ctrl.iShip">
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
          <center>
              <a href="#" ng-click="ctrl.register()" class="learnmore_btn">Submit</a>
              </center>
          </div>
      </div>
    </div>
  </div>
</div>

            `,
            controller : function LoginBoxController($timeout) {
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

                ctrl.iShip = false;
                ctrl.toggle = function() {
                  ctrl.iShip = true;
                  $timeout(function() {
                    $('#box').scrollView();
                  }, 1000);
                }

                ctrl.register = function() {
                  ctrl.iShip = false;
                }

                $.fn.scrollView = function () {
                    return this.each(function () {
                        $('html, body').animate({
                            scrollTop: $(this).offset().top
                        }, 1000);
                    });
                }
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
