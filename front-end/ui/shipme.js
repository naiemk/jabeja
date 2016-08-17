
(function() {
    angular.module("jabeja").component('shipMe', {
            template : `
<div class="container space">
  <div class="panel">
    <div class="panel-body">
      <div class="row space">
          <div class="col col-sm-12">
              <label>I am at</label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.from"></fancy-dropDown>
      <div class="row">
          <div class="col col-sm-12">
            <label>
                I want to send
            </label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.what"></fancy-dropDown>
      <div class="row">
          <div class="col col-sm-12">
            <label>
                to
            </label>
          </div>
      </div>
      <fancy-dropDown items="ctrl.to"></fancy-dropDown>
    </div>
  </div>
</div>

<search-results
  from="ctrl.from.selected"
  to="ctrl.to.selected"
  what="ctrl.what.selected"
  ></search-results>

            `,
            controller : function LoginBoxController() {
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
                  items : [ "Money", "Documents" ],
                  selected: "Money"
                }
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
