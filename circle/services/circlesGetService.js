angular.module('samarth-webcomponents')
    .service('circlesGetService', function($http, $window) {
        var objcircle = {};
        // var userdata = $window.localStorage["member-user"];
        // var username = userdata.data.email;

        //gets the circle from neo4j and mongo
        objcircle.getCircle = function() {
            var username = 'ak@gmail.com';
            return $http.get('http://localhost:8081/circle/' + username)
                .then(function(res) {
                    //console.log("got circles data");
                    return res;
                }, function(error) {
                    // console.log(res);
                    return error;
                });
        }

        //adds the circle to mongodb and neo4j
        objcircle.addCircle = function(circle) {
            //console.log("service circle", circle);
            return $http({
                    url: "http://localhost:8081/circle/",
                    method: "POST",
                    data: circle
                })
                .then(function(response) {
                        return response;
                    },
                    function(error) {
                        return error;
                    });


        }
        return objcircle;
    });
