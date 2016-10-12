'use strict';
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;
/*Defining the job Card web component*/
angular.module('samarth-webcomponents')
    .component('jobCard', {
        bindings: {
            job: '<'

        },
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/jobCard.html',
        controller: jobCardController,
        transclude: true
    });

/*Controller for job Card*/
function jobCardController($scope) {
    $scope.job = this.job;
}
