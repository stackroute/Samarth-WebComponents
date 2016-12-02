(function(){
  'use strict'
angular
  .module("samarth-webcomponents",[])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('index.home.jobSearch', {
      url:'/jobsearch',
      views:{
        'content@': {
          templateUrl: 'jobSearch/template/jobSearchIndex.html'
        }
      }
    })
  });
})();

