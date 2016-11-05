angular.module('samarth-webcomponents')
    .service('rubricservice', function($http) {
        return {
            getrubricdata: function(name, profiletype) {
                let data = {};
                return $http({
                    method: 'GET',
                    url: 'http://localhost:8081/rubric/' + name


                }).then(function(response) {
                    data = response;
                    console.log('from service', data);

                    // console.log(data);
                    return data;
                }, function errorCallback(response) {
                    return response.error.message;
                });
            }

        };
    });
