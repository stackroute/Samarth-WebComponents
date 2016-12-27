(function() {
    angular.module('samarth-webcomponents')
        .component('jobProvider', {
            templateUrl: './samarth-webcomponents/jobprovidercard/template/jobprovidercard.html',
            controller: jobProviderCtrl,
            bindings: {
                data: '<'
            }
        })
        .directive('fallbackSrc', function () {
        var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
        iElement.bind('error', function() {
        angular.element(this).attr("src", iAttrs.fallbackSrc);
          });
         }
    }
   return fallbackSrc;
    });
    // Ctrl for circle component
    function jobProviderCtrl($http, $log, $scope, $mdColorPalette) {
        $scope.prof = this.data;
        let colors = Object.keys($mdColorPalette);
        $scope.gerColler = function(a) {
            return colors[a.length];
        };

    }


})();
