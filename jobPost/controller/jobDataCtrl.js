(function(){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl($scope){
                // var vm = this;
                $scope.jobData={};
                $scope.jobData.desc={};
                $scope.jobData.criteria={};
                $scope.submitJob=submitJob;

                function submitJob(){
                 alert("works "+$scope.jobData.desc.role);
                 console.log($scope.jobData.criteria.renumeration);
                 // jobProfileFactory.jobPost($scope.jobData).then(function(response){
                 //    console.log("Data post success");
                 // }),function(err){
                 //    console.log('Error in data post');
                 // }
                }
        }
})();
