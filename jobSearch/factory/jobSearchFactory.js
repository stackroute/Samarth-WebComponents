(function(){
  'use strict'
 angular
   .module('samarth-webcomponents')  
   .factory("jobSearchFactory", ['$http',function($http){  
    var obj = {};
    obj.searchJobDetails = function(){ 
        return $http.get('jobSearch/jobSearchData/jobSearchData.json');
    }
    return obj;
}]);
})();
   
