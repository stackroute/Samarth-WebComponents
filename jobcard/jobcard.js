'use strict';
let scripts = document.getElementsByTagName('script');
let currentScriptPath = scripts[scripts.length - 1].src;
/* Defining the job Card web component*/
angular.module('samarth-webcomponents')
    .component('jobCard', {
        /* Binding jobID*/
        bindings: {
            data: '<'
            // showheader: '<'
        },
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/jobcard.html',
        controller: jobcardCtrl,
        transclude: {
            buttons:'buttons',
            message: "?message"
        }
    })
    .directive('fallbackSrc', function () {
    var fallbackSrc = {
    link: function postLink(scope, iElement, iAttrs) {
      iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
      });
     }
    }
   return fallbackSrc;
    });
    
/* Controller for job Card*/
function jobcardCtrl($scope, jobCardService,$rootElement, $window, $timeout) {
    if($rootElement.attr('ng-app')=="samarth")
    {
        $scope.name = "Suggest";
    }
    else
    {
        $scope.name = "apply";
    }

    $scope.downloadJob = function(){
        let card = document.querySelector('#jobCard');
                console.log(card);
                
                
                html2canvas(card, { allowTaint: false,
                    useCORS: true,
                    logging: true,
                    // height: 400,
                    // width: 300,
                    background: "#0b61ea",
                    proxy: "https://samarthuploads.s3.ap-south-1.amazonaws.com/",
                    onrendered: function(canvas) {
                        // var extra_canvas = document.createElement("canvas");
                        // // extra_canvas.setAttribute('width',40);
                        // // extra_canvas.setAttribute('height',30);
                        // var ctx = extra_canvas.getContext('2d');
                        // ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,400,300);
                // var dataURL = extra_canvas.toDataURL();
                // var img = $(document.createElement('img'));
                // img.attr('src', dataURL);
                // // insert the thumbnail at the top of the page
                // $('body').prepend(img);

                        let anchor = angular.element(document.querySelector('#download'));
                        var imgageData = canvas.toDataURL("image/png");
                        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
                        anchor.attr("download", "your_pic_name.png").attr("href", newData);
                    }
                    });
    };
    // $scope.job = this.job;
     //let data = this.data;
    // let jobID = data.jobID;
    // let employerID = data.employerID;
    //console.log(this.data);
    /* Calling the service for getting the details*/
    // jobCardService.getJobByID(jobID, employerID)
    //     .then(function successCallback(response) {
    //             console.log('Connected successfully' + response.data);
    //             let job = response.data;
    //             $scope.job = job[0];
    //         },
    //         function errorCallback(response) {
    //             console.log('some error occured');
    //         });

    // function createDownloadUrl() {
    //     name = $scope.job.jobID + '.png';
    //     // ctrl.data1 = ctrl.data;
    //     $scope.downloaddata = JSON.stringify($scope.job);
    //
    //     let blob = new Blob([$scope.downloaddata], {
    //             type: 'text/plain'
    //         }),
    //         url = $window.URL || $window.webkitURL;
    //     $scope.fileUrl = url.createObjectURL(blob);
    // }
    // let getCanvas;
    // $timeout(createDownloadUrl, 1000);
    // $scope.render = function(ev) {
    //     let card = angular.element(document.querySelector('#totalcardarea'));
    //     html2canvas(card, {
    //         onrendered: function(canvas) {
    //             getCanvas = canvas;
    //             $scope.downloadCard();
    //         }
    //     });
    // };
    // $scope.downloadedData = function() {
    //     let download = angular.element(document.querySelector('#jsonDownload'));
    //     download.attr('download', $scope.job.jobID + '.json').attr('href', $scope.fileUrl);
    // };
    // $scope.downloadCard = function() {
    //     let imageData = getCanvas.toDataURL('image/png');
    //     let newData = imageData.replace(/^data:image\/png/,
    //         'data:application/octet-stream');
    //     let download = angular.element(document.querySelector('#download'));
    //     download.attr('download', name).attr('href', newData);
    // };
}
