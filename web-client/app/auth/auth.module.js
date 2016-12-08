(function(){
  'use strict';
   angular
    .module('authApp', ['moment-picker']);

  window.fbAsyncInit = function() {
   FB.init({
     appId      : '667445550076180',
     xfbml      : true,
     version    : 'v2.7'
   });
 };

 (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
})();
