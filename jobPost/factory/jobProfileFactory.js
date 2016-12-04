(function(){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .factory('jobProfileFactory',jobProfileFactory);

    function jobProfileFactory($http){
      var service = {
        jobPost :  jobPost
      };
      return service;
    }

    function jobPost(job){
     return $http({
        method : 'post',
        url : '/jobpost',
        data : job
     }).then(function success(response){
      return response;
     });
   }
})();
