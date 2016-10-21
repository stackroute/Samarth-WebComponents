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
            '/')) + '/templates/jobcard.html',
        controller: jobcardCtrl,
        transclude: true
    });

/*Controller for job Card*/
function jobcardCtrl($scope, jobCardService) {
    //$scope.job = this.job;
    var data = this.data;
    var jobID = data.jobID;
    var employerID = data.employerID;
    console.log("ID : " + this.data);
    /*Calling the service for getting the details*/
    jobCardService.getJobByID(jobID, employerID)
        .then(function successCallback(response) {
                console.log("Connected successfully" + response.data);
                var job = response.data;
                $scope.job = job[0];
                //console.log("ID" + $scope.job.jobID);
            },
            function errorCallback(response) {
                console.log("some error occured");
            });

    function createDownloadUrl() {
        name = $scope.job.jobID + ".png";
        //ctrl.data1 = ctrl.data;            
        $scope.downloaddata = JSON.stringify($scope.job);

        blob = new Blob([$scope.downloaddata], {
                type: 'text/plain'
            }),
            url = $window.URL || $window.webkitURL;
        ctrl.fileUrl = url.createObjectURL(blob);
    }
    var getCanvas;
    $scope.render = function(ev) {
        var card = angular.element(document.querySelector('#totalcardarea'));
        html2canvas(card, {
            onrendered: function(canvas) {
                getCanvas = canvas;
                $scope.downloadCard();
            }
        });
    }
    $scope.downloadCard = function() {
        var imageData = getCanvas.toDataURL("image/png");
        var newData = imageData.replace(/^data:image\/png/,
            "data:application/octet-stream");
        var download = angular.element(document.querySelector('#download'));
        download.attr("download", name).attr("href", newData);
    }
}
