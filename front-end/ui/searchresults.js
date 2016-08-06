
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
        <a href="mailto:{{item.contact}}" class="learnmore_btn"> contact </a>
      </div>

  </div>
</div>
            `,
            controller : function SearchResultController() {
                var ctrl = this;
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
