
(function() {


    angular.module('samarth-webcomponents')
        .component('circle', {
            templateUrl:  './samarth-webcomponents/circle/templates/circles.html',
            controller: circleCtrl,
            bindings: {
                data: '<'
            },
            transclude: {

                    circleStats: 'circleStats'
                   
                }

                circleStats: 'circleStats'

            
            }

        });

    // Ctrl for circle component
    function circleCtrl($http, $log, $scope, $mdColorPalette) {
        console.log('data : ');
        $scope.prof = this.data;
        console.log($scope.prof);
        let colors = Object.keys($mdColorPalette);
        $scope.gerColler = function(a) {
            return colors[a.length];
        };
    }
})();
