
(function() {
    angular.module("jabeja").component('searchResults', {
            template : `
 <div class="container">
  <div class="row space" ng-repeat="item in ctrl.results">
      <div class="panel">
        <div class="panel-body">
        <img class="search-img" src="img/status.gif" />
         <h1>{{item.text}}</h1>
          <span class="label label-info">{{item.subText}} </span>
          <br/><br/>
        <a href="mailto:{{item.contact}}" class="learnmore_btn" ng-show="ctrl.isLoggedIn"> contact </a>
        <a href="#" class="learnmore_btn" ng-hide="ctrl.isLoggedIn">Log in to see</a>
      </div>

  </div>
</div>
            `,
            controller : function SearchResultController(loginService, $timeout) {
                var ctrl = this;
                loginService.onChange(function() {
                  console.log("ASDASD")
                  $timeout(function(){ctrl.isLoggedIn = loginService.getUserId() || false;});
                });

                ctrl.results = [
                  { img: '', text: 'George Clooney', subText: "Takes everything", contact: 's1@sw.com'},
                  { img: '', text: 'Hasan Panchar', subText: "Only documents", contact: 's1@sw.com'}
                ];
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
