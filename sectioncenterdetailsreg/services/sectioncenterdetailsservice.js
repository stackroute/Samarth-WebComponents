angular.module('samarth-webcomponents')
    .factory('datagenerate', function($http) {
        return {
            getjson: function() {
                let data = {};
                return $http({
                    method: 'GET',
                    url: '/resource/',
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;
                    return data;
                    console.log(data);
                }, function errorCallback(response) {
                    return response.error.message;
                });
            }
        };
    });
