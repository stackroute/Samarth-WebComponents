angular.module('samarth-webcomponents')
    .factory('workexperience', function($http) {

    })
    .factory('datagenerate', function($http) {
        return {
            getjson: function(key, lang) {
                var data = {};
                return $http({
                    method: 'GET',
                    url: '/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;
                    return data;

                }, function errorCallback(response) {
                    return (response.error.message);
                });
            }

        };
    })
    .factory('deleteWEService', function($http) {
        return {
            removeworkexp: function(candidateid, designation) {
                return $http({
                    method: 'DELETE',
                    url: '/work/' + candidateid + '/' + designation
                }).then(function mySucces(response)  {
                    console.log('mySucces service');
                }, function myError(response) {
                    console.log('error in getting sectionWorkExperience');
                });
            }
        };
    });