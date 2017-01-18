angular.module('samarth-webcomponents')
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
    .factory('deleteEducationService', function($http, $rootScope) {
        return {
            removeEducation: function(candidateid, title, nameofins) {
                return $http({
                    method: 'DELETE',
                    url: '/education/' + candidateid + '/' + title + '/' + nameofins
                }).then(function mySucces(response)  {
                    console.log('mySucces service');
                }, function myError(response) {
                    console.log('error in getting sectioneducation');
                });
            }
        };
    });
