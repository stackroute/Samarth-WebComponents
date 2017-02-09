angular.module('samarth-webcomponents')
.factory('dataCenters', ['$http',
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
    ])
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
})
.factory('statuscenterFactory', function($http) {
    return {
        statusdisable : function(regId, centerDetail) {
            return $http({
                method: 'POST',
                url: '/center/disable/' + regId,
                data: centerDetail

            }).then(function(response)  {
             return response.data;
         });
        }
    }
});
