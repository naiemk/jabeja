
(function() {
    angular.module("jabeja").component('fancyDropdown', {
      template : `
        <div class="row space">
            <div class="col col-sm-12">
              <select ng-model="ctrl.items.selected"
                ng-options = "o for o in ctrl.items.items" > </select>
          </div>
        </div>
      `,
      controller : function FancyDropdownController() {
          var ctrl = this;
      },
      controllerAs : 'ctrl',
      bindings: {
        items: '<'
      }
  });
}());
