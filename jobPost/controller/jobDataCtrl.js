(function (){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl($scope,jobProfileFactory,jobProviderList){
                // var vm = this;
                $scope.msg="";
                $scope.jobData={};
                $scope.jobData.desc={};
                $scope.joprovider="";
                $scope.jobData.criteria={};
                $scope.submitJob=submitJob;

                jobProviderList.getJobProvider().then(function(response){
                $scope.querySearch=response.data;
                 }),function(err){
                    $scope.msg='Could not load job providers data!';
                 }
                function submitJob(){
                 $scope.jobData.jpCode= $scope.selectedItem.jpCode;  
                 jobProfileFactory.jobPost($scope.jobData).then(function(response){
                   $scope.msg=response.data.msg;
                 }),function(err){
                    $scope.msg='Some error occurred! Please try again..';
                 }
                }
        }
}());
