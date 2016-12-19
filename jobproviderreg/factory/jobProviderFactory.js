(function(){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .factory('jobproviderfactory',jobproviderfactory);

    function jobproviderfactory($http){
      var service = {
        jobproviderdata :  jobproviderdata,
        jpCodeCheck : jpCodeCheck
      };
      return service;

    function jpCodeCheck(jpCode){
      console.log(jpCode);
      return $http({
        method : 'GET',
        url : '/employer/codeCheck/'+jpCode
      })

    }

    function getJobProviderbyid(job) {
                return $http({
                    method: 'GET',
                    url: '/employer/getJobProviderbyid/'+job,
                    data: job

                })

            }


    function jobproviderdata(data){
     return $http({
        method : 'POST',
        url : '/employer/registeremployer',
        data : data
     })

   }
 }
})();
