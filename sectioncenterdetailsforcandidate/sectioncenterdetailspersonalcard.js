(function() {
    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;

 
    angular.module('samarth-webcomponents')
        .component('myCenterdetailspersonal', {
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/templates/sectioncenterdetailspersonalcard.html',
            controller: centerdetailspersonalcardCtrl,
            bindings: {
                candidateid: '<',
                showheader: '<',
                },
            
        })
        
    function centerdetailspersonalcardCtrl($scope, $http, $mdDialog, centersPersonalData, $state) {
        var ctrl = this;
        ctrl.centerdetailspersonal=[];
        console.log("in personal ctrl");
        
        getCenterList();
        function getCenterList(){
          centersPersonalData.getCenter(ctrl.candidateid).then(function(result) {
            console.log(result);

            ctrl.centerdetailspersonal=result;
        },function(err){
            console.log(err);
        });  
        }    
    }

})();

