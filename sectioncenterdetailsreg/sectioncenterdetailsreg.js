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
        
    function centerdetailsregCtrl($http, $mdDialog, $rootScope, datagenerate,$rootElement) {
        
        var ctrl = this;
        ctrl.centerDetails = {};
        
    }
})();
