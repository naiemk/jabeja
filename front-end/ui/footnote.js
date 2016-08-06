
(function() {
    angular.module("jabeja").component('footNote', {
            template : `

<!-- START FOOTER SECTION -->
<footer id="footer">
  <div class="container">
    <div class="row">
      <div class="col col-xs-1"></div>
      <div class="col col-xs-8">
        <div class="contact_social">
          <a class="fb" href="#"><i class="fa fa-facebook"></i></a>
          <a class="twitter" href="#"><i class="fa fa-twitter"></i></a>
          <a class="gplus" href="#"><i class="fa fa-google-plus"></i></a>
        </div>
      </div>
    </div>
    <div class="row space">
      <div class="col-lg-12 col-md-12">
        <div class="footer_area">
          <p>Designed By <a href="http://wpfreeware.com/" rel="nofollow">Iranian Hack-night Seattle</a></p>
        </div>
      </div>
    </div>
  </div>
</footer>
<!-- END FOOTER SECTION -->

            `,
            controller : function SearchResultController() {
                var ctrl = this;
            },
            controllerAs : 'ctrl',
            bindings: {
            }
        });
}());
