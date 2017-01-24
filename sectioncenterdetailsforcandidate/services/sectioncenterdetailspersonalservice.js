angular.module('samarth-webcomponents')
    .factory('centersPersonalData', function($http) {
        return {
            getCenter: function(candidateid) {
                let data = {};
                return $http({
                    method: 'GET',
                    url: '/center/particularCenter/' + candidateid,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;
                    // console.log(data);
                    return data;
                }, function errorCallback(response) {
                    return response.error.message;
                });
            }
        };
    });
