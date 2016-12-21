(function (){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl($scope,jobProfileFactory,$state,jobProviderList,$mdDialog){
                // var vm = this;
                $scope.msg="";
                $scope.jobData={};
                $scope.jobData.desc={};
                $scope.joprovider="";
                $scope.jobData.criteria={};
                $scope.submitJob=submitJob;

                $scope.val1= $state.params.key;
                console.log("param value 1 " + $scope.val1);
                $scope.val2 = $state.params.key1;
                console.log("param value 2 " + $scope.val2);

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

                $scope.showAlert = function(ev) {
                // Appending dialog to document.body to cover sidenav in docs app
                // Modal dialogs should fully cover application
                // to prevent interaction outside of dialog
                $mdDialog.show(
                $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Posted Successfully')
                .textContent('Details of job has been posted.')
                .ariaLabel('Alert Dialog Demo')
                .ok('Got it!')
                .targetEvent(ev)
                );
                };
        }
}());
