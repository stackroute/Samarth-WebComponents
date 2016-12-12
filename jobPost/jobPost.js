(function (){
  'use strict';
    angular
        .module("samarth-webcomponents")
        .config(jobPostconfig);
        function jobPostconfig($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/');
         $stateProvider
         .state('index.jobPost', {
            url:'jobPost',
            views: {
                'content@': {
                    templateUrl: './samarth-webcomponents/jobPost/template/jobPost.html',
                    controller: 'jobDataCtrl',
                }
            }
     
        })
     //     .state('index.jobPost.ui', {
     //        url:'qwe',
     //        views: {
     //            'content@': {
     //                template: "<h1>'./samarth-webcomponents/jobPost/template/jobPost.html'</h1>"
                   
     //            }
            
          }
     // });
 }());   
