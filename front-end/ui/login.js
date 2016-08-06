
(function() {
    angular.module("jabeja").component('loginBox', {
            template : `
            <center>
                    <a href="#featuresSection" class="learnmore_btn">Login</a>
              <center>
            `,
            controller : function LoginBoxController() {
                var ctrl = this;
                var menus = this.menuItems;
                ctrl.items = [];
                return this;
            },
            controllerAs : 'action',
            bindings: {
            }
        });
}());
