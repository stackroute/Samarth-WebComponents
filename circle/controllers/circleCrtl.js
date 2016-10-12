var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-coordinator')

.component('myCircle', {            
    templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
        '/')) + '/templates/circles.html',
    controller: circleCrtl
});

function circleCrtl($http, $log, $mdDialog, circlesGetService) {
    console.log("enter in controller");
    var ctrl = this;
    circlesGetService.getCircle()
        .then(function(response) {
            ctrl.profiling = response.data;
            console.log(ctrl.profiling);
        });

    ctrl.showForm = function(ev) {
        $mdDialog.show({
                templateUrl: 'webcomponents/circle/templates/addCircle.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
            })
            .then(function(circle) {
                console.log(" by md submit");
            }, function() {});
    };

    ctrl.cancel = function() {
        $mdDialog.cancel();
    }
    ctrl.addCircle = function() {
        console.log("submit");
    }


}
