(function (){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .factory('jobProfileFactory',jobProfileFactory);

    function jobProfileFactory($http){
      var service = {
        jobPost : jobPost,
        updateJob: updateJob
      };
      return service;
   
    function jobPost(job){
     return $http({
        method : 'post',
        url : '/jobProfile/jobpost',
        data : job
     })
   }

    function updateJob(job) {
      return $http.patch('/jobProfile/updateJob', job);
   }
 }
}());
