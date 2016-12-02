(function(){
  'use strict'
angular
  .module("samarth-webcomponents")
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('index.home.jobSearch', {
      url:'/jobsearch',
      views:{
        'content@': {
          templateUrl: './samarth-webcomponents/jobSearch/template/jobSearchIndex.html'
        }
      }
    })
  });
})();
