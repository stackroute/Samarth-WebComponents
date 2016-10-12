angular.module('samarth-coordinator', ['ui.router', 'ngMaterial', 'ngMdIcons']);
angular.module('samarth-coordinator')
    .config(function($stateProvider) {

        $stateProvider
            .state('circles', {
                url: '/circles',
                template: '<my-circle></my-circle>',

            })
            .state('circleDetail', {
                url: '/circleDetails',
                templateUrl: 'webcomponents/circle/templates/circleDetails.html',
                controller: 'circleDetail'

            })

    });
