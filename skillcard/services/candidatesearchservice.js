angular.module('samarth-coordinaor').service('candidateservice',function($http) {
  console.log("in service");
  return {
    getcandidatedata: function() {
      return $http({
        method:'get',
        url:'http://localhost:8081/skillcard'
      }).then(function success(response){
        console.log(response.data);
        return response.data;
      });
    }
  }
});
