(function() {
    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;
    let centerdetailspath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/templates/sectioncenterdetailsconv.html';

    angular.module('samarth-webcomponents')
    .component('myCenterdetailscard', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/sectioncenterdetailscard.html',
        controller: centerdetailscardCtrl,
        bindings: {
            centerCode: '<'
        },
    })
    .controller('centerdetailscardCtrl',centerdetailscardCtrl);

    function centerdetailscardCtrl($scope, $http, $mdDialog, dataCenters, datagenerateFactory, statuscenterFactory, $state) {
        var ctrl = this;
        ctrl.centerDetails=[];
        ctrl.centerType=[];
        // ctrl.centerstatus='';
        // ctrl.regId='';
        function getCenterList(){
          dataCenters.getjson().then(function(result) {
            console.log(result);
            ctrl.centerDetails=result;
        },function(err){
            console.log(err);
        });  
        }
        
        getCenterList();
        datagenerateFactory.getdata().then(function(response){
             ctrl.centerType = response;
             // console.log("centerType" + response);
        });


        ctrl.disable = function(centerDetail) {
            console.log(centerDetail);
            centerstatus = centerDetail.status;
            regId = centerDetail.centerCode;
            console.log(" centerCode id "+regId);
            
            statuscenterFactory.statusdisable(regId, centerDetail).then(function(response){
             // ctrl.centerDetail = response;
             getCenterList();
             console.log("center status: " + centerstatus);
        });
        };
        

        ctrl.showAdvance = function(ev, centerDetails,title) {

            centerType=ctrl.centerType;
            
            console.log("Current Script path ", currentScriptPath);
            $mdDialog.show({
                controller: dialogCtrl,
                templateUrl: centerdetailspath,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    val: centerDetails,
                    header: title,
                    ctype:centerType
                },
                    fullscreen: ctrl.customFullscreen
                })
            .then(function(answer) {
                ctrl.status = 'You said the information was "' + answer + '".';
            }, function() {
                ctrl.status = 'You cancelled the dialog.';
            });
        };

        function dialogCtrl($scope, $mdDialog, val,ctype, header,$http) {
            $scope.centerObject =val;
            $scope.centerType=ctype;

            console.log($scope.centerObject);
            console.log($scope.centerType);
            
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.save = function(centerdetailsObject) {
                    $http({
                        method: 'POST',
                        url: '/center/update/' + centerdetailsObject.centerCode,
                        data:centerdetailsObject
                    }).then(function mySucces(response)  {
                       console.log("dsds");
                    }, function myError(response) {
                        console.log(response);
                });
                $mdDialog.hide();
            };
        }
    }
})();
