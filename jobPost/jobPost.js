(function(){
  'use strict';
    angular
        .module("samarth-webcomponents")
        .config(jobPostconfig);
        function jobPostconfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
         $stateProvider
         .state('index.home.jobPost', {
            url:'/jobPost',
            views: {
                'content@': {
                    templateUrl: './samarth-webcomponents/jobPost/template/jobPost.html',
                    controller: 'jobDataCtrl',
                }
            }
     
        })
     }
 })();   
