var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-webcomponents')
    .component('myCircle', {            
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/circles.html',
        controller: circleCrtl,
        bindings: {
            prof: '<'
        }
    });
// Ctrl for circle component
function circleCrtl($http, $log) {
    $log.log("enter in component");

}


// angular.module('samarth-webcomponents')
//     .controller('dialogController', function() {


//     });
