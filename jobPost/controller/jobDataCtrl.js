(function(){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl($scope){
                // var vm = this;
                $scope.jobData={};
                // $scope.jobData.desc={};
                // $scope.jobData.criteria={};
                // vm.jobData.employer={};

                $scope.submitJob=function(){
                    alert("works "+$scope.jobData.role);
                    console.log($scope.jobData);
                }
        }
})();
