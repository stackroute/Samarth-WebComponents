angular.module('samarth-sahayak')
    .service('circlesGetService', function($http) {
        return {
            getCircle: function() {
                return $http.get('/circle')
                    .then(function(res) {
                        console.log("got circles data");
                        return res;
                    }, function(res) {
                        console.log(res);
                        return;

                    });
            }
        }
    });
