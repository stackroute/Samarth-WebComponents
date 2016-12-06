angular.module("samarth-webcomponents")
    .config(function($stateProvider, $urlRouterProvider){

    $urlRouterProvider.otherwise('/');
     $stateProvider
     .state('index.home.empreg', {
        url:'/employerregistration',
        views: {
            'content@': {
                templateUrl: 'jobproviderreg/template/jobproviderregistration.html',
                controller:'jobProviderCtrl'

            }
        }

    })
 });
