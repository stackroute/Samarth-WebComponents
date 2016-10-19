var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-webcomponents')
    .component('myCircle', {            
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/circles.html',
        controller: circleCrtl
    });
// Ctrl for circle component
function circleCrtl($http, $log, $mdDialog, circlesGetService) {
    console.log("enter in controller");
    var ctrl = this;
    // ctrl.circle.profilePic = "http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/artheader.jpg";

    circlesGetService.getCircle()
        .then(function(response) {
            ctrl.profiling = response.data;

            // console.log(ctrl.profiling.rCount);
 // console.log(ctrl.profiling.name);

        }, function(err) {

        });

    ctrl.showForm = function(ev) {
        $mdDialog.show({
                templateUrl: 'webcomponents/circle/templates/addCircle.html',
                controller: 'dialogController',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
            })
            .then(function(circle) {
                //    console.log(circle);
                circle.profilePic = "http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/artheader.jpg";
                //  console.log(circle);
                circlesGetService.addCircle(circle);
            }).then(function success(response) {
                //alert("circle added");
            }, function(err) {

            });
    };

}
//adds the circle to neo4j
function dialogController($scope, $mdDialog, circlesGetService) {
    $scope.cancel = function() {
        $mdDialog.cancel();
    }
    $scope.submit = function(circle) {
        console.log(circle);
        $mdDialog.hide(circle);
    }

}

// angular.module('samarth-webcomponents')
//     .controller('dialogController', function() {


//     });
