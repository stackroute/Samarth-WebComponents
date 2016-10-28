angular.module('samarth-webcomponents')
    .service('verificationbadgeService', ['$http', function($http) {


        return {
            getbadgedata: function(candidateid) {
                return $http.get('http://localhost:8080/verification/' + candidateid);
            }
        }



    }]);
