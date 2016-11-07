angular.module('samarth-webcomponents')
    .factory('sectionskillcard', function($http, $rootScope) {
        return {
            getjson: function(candidateid) {
                let skill = {};
                // var candidateid = UserAuthService.getUser().uname;

                return $http({
                    method: 'get',
                    url: '/skill/' + candidateid

                }).then(function mySucces(response)  {
                    // console.log("res",response.data[0])
                    for (let prop in response.data[0])  {
                        if (prop == 'skills')  {
                            skill[prop] = response.data[0][prop];
                        }
                    }
                    // console.log("skill",skill);

                    return skill;
                }, function myError(response) {
                    console.log('error in getting sectionskill');
                });
            }

        };
    })
    .factory('datagenerate', function($http) {
        return {
            getjson: function(key, lang) {
                let data = {};
                return $http({
                    method: 'GET',
                    url: '/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;


                    console.log(data);
                    return data;
                }, function errorCallback(response) {
                    return response.error.message;
                });
            }

        };
    });
