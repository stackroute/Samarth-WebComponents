let scripts = document.getElementsByTagName('script');
let currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-webcomponents')
    .component('myCircle', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/circles.html',
        controller: circleCrtl,
        bindings: {
            data: '<'
        }
    });
// Ctrl for circle component
function circleCrtl($http, $log, $scope, $mdColorPalette) {
    console.log('data : ' + this.data);
    $scope.prof = this.data;
    let colors = Object.keys($mdColorPalette);

    $scope.gerColler = function(a) {
        console.log(a.length);
        return colors[a.length];
    };
}


// angular.module('samarth-webcomponents')
//     .controller('dialogController', function() {


//     });
