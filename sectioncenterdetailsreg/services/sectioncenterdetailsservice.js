angular.module('samarth-webcomponents')
    .factory('datagenerateFactory', function($http) {
        return {
            getdata: function() {
                let data = {};
                return $http({
                    method: 'GET',
                    url: '/centertype',
                    type: 'JSON'
                })
                .then(function mySucces(response) {
                    data = response.data;
                    return data;
                }, function errorCallback(response) {
                    return response.error.message;
                });
            }
        };
    });
