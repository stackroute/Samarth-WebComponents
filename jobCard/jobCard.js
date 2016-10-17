'use strict';
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;
/*Defining the job Card web component*/
angular.module('samarth-webcomponents')
    .component('jobCard', {
        /*Binding jobID*/
        bindings: {
            data: '<'

        },
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/jobCard.html',
        controller: jobCardController,
        transclude: true
    });

/*Controller for job Card*/
function jobCardController($scope, jobCardService) {
    //$scope.job = this.job;
    var jobID = this.data;
    console.log("ID : " + this.data);
    /*Calling the service for getting the details*/
    jobCardService.getJobByID(jobID)
        .then(function successCallback(response) {
                console.log("Connected successfully" + response.data);
                var job = response.data;
                $scope.job = job[0];
                //console.log("ID" + $scope.job.jobID);
            },
            function errorCallback(response) {
                console.log("some error occured");
            });
}
