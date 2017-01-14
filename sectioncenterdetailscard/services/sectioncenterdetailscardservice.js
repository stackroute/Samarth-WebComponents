angular.module('samarth-webcomponents').factory('datagenerate', ['$http',
    function($http) {

        return {
            getjson: function() {
                return $http({
                    method: 'get',
                    url: '/center/getall/',
                }).then(function success(response) {
                    return response.data;
                }, function error(err) {
                    console.log("error", err);
                });
            }
        }
    }
]);
