angular.module('samarth-webcomponents')
    .factory('datagenerate', function($http) {
        return {
            getjson: function(key, lang) {
                console.log('key, lang', key, lang);
                let data = {};
                return $http({
                    method: 'GET',
                    url: '/resource/' + key + lang,
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
    })
    .factory('deleteProjectService', function($http) {
        return {
            removeproject: function(candidateid, projName) {
                return $http({
                    method: 'DELETE',
                    url: '/project/' + candidateid + '/' + projName
                }).then(function mySucces(response)  {
                    console.log('mySucces service');
                }, function myError(response) {
                    console.log('error in getting sectionProject');
                });
            }
        };
    });
