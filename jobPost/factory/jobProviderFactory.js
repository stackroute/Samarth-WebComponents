(function (){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .factory('jobProviderList',jobProviderList);

    function jobProviderList($http){
      var service = {
        getJobProvider :  getJobProvider
      };
      return service;
   
    function getJobProvider(){
     return $http({
        method : 'GET',
        url : '/employer/getJobProvider'
     })
    
   }
 }
}());
