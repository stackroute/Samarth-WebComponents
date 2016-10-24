angular.module('samarth-webcomponents')
    .factory('sectionskillcard', function($http, $rootScope) {
        return {
            getjson: function(candidateid) {
                var skill = {};
                // var candidateid = UserAuthService.getUser().uname;

                return $http({ 
                    method: "get",
                    url: "http://localhost:8081/skill/" + candidateid,

                }).then(function mySucces(response)  { 
                    // console.log("res",response.data[0])
                    for (var prop in response.data[0])  { 
                        if (prop == "skills")  { 

                            skill[prop] = response.data[0][prop]; 
                        }

                    }
                    //console.log("skill",skill);
                     
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
                var data = {};
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/resource/' + key + lang,
                    type: 'JSON'

                }).then(function mySucces(response) {
                    data = response.data;


                    console.log(data);
                    return data;

                }, function errorCallback(response) {
                    return (response.error.message);
                });
            }

        };
    });
