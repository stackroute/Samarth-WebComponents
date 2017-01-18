(function() {
    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;

    angular.module('samarth-webcomponents')
    .component('myCenterdetailsreg', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/sectioncenterdetailsreg.html',
        controller: centerdetailsregCtrl,
        bindings: {
            center: '=',
            formSubmit: '&',
        },

    })

    function centerdetailsregCtrl($http, $scope, $mdDialog, $rootScope, $state, datagenerateFactory,$rootElement) {

        var ctrl = this;
        ctrl.centerDetails = {};
        datagenerateFactory.getdata().then(function(response){
             ctrl.centerType = response;
             console.log(response);
        })
        

        $scope.cancelButton = function(){
            // $mdDialog.cancel();
            console.log("cancel button");
            $state.go("index.centerdetails");
        }
    }
})();
