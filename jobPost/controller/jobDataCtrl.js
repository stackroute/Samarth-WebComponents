(function (){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl($scope,jobProfileFactory,jobProviderList){
                // var vm = this;
                $scope.jobData={};
                $scope.jobData.desc={};
                $scope.jobData.criteria={};
                $scope.submitJob=submitJob;

                jobProviderList.getJobProvider().then(function(response){
                    //succes data get
                 }),function(err){
                    console.log('Error in job provider data');
                 }

                function submitJob(){
                 jobProfileFactory.jobPost($scope.jobData).then(function(response){
                    console.log("Data post success");
                 }),function(err){
                    console.log('Error in data post');
                 }
                }
        }
}());
