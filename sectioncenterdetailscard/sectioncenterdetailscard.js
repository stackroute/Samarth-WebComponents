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
            reg: '<'
        },        
    })
    .controller('centerdetailscardCtrl',centerdetailscardCtrl);

    function centerdetailscardCtrl($scope, $http, $mdDialog, datagenerate, $state) {
        var ctrl = this;
        ctrl.centerDetails=[];
        datagenerate.getjson().then(function(result) {
            ctrl.centerDetails=result;
        },function(err){
            console.log(err);
        });

        ctrl.showAdvance = function(ev, centerDetails, title) {
            console.log("Current Script path ", currentScriptPath);
            $mdDialog.show({
                controller: dialogCtrl,
                templateUrl: centerdetailspath,
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    val: centerDetails,
                    header: title
                },
                    fullscreen: ctrl.customFullscreen
                })
            .then(function(answer) {
                ctrl.status = 'You said the information was "' + answer + '".';
            }, function() {
                ctrl.status = 'You cancelled the dialog.';
            });
        };

        function dialogCtrl($scope, $mdDialog, val, header,$http) {
            $scope.centerObject =val;
            console.log($scope.centerObject);
            // $scope.header = header;
            // console.log(header);
            $scope.hide = function() {
                $mdDialog.hide();
            };
            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.save = function(centerdetailsObject) {
                    $http({
                        method: 'POST',
                        url: '/center/update' + $scope.centerObject.reg
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
