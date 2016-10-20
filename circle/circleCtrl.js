var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

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
function circleCrtl($http, $log, $scope) {
    console.log("data : " + this.data);
    $scope.prof = this.data;
    $log.log("enter in component");


    $scope.getRandomColor = function() {


        var letters = '0123456789ABCDEF'.split('');
        var color = '#';

        color += letters[Math.round(Math.random() * 15)] + letters[Math.round(Math.random() * 15)] + letters[Math.round(Math.random() * 15)] + letters[Math.round(Math.random() * 15)] + letters[Math.round(Math.random() * 15)] + letters[Math.round(Math.random() * 15)];

        return color;

    }

}


// angular.module('samarth-webcomponents')
//     .controller('dialogController', function() {


//     });
