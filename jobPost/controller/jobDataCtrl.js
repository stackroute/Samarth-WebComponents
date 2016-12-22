(function (){
  'use strict';

  angular
  .module("samarth-webcomponents")
  .controller('jobDataCtrl',jobDataCtrl);

  function jobDataCtrl($scope,jobProfileFactory,$state,jobProviderList,$mdDialog) 
  {
    // var vm = this;
    $scope.msg="";
    $scope.jobData={};
    $scope.jobData.desc={};
    $scope.joprovider="";
    $scope.jobData.criteria={};
    $scope.submitJob=submitJob;

    console.log("param value 1 " + $state.params.key);
    // $scope.val2 = $state.params.key1;
    console.log($state.params.key1);
    if(1 === $state.params.key) 
    {   
      $scope.jobData = $state.params.key1;
      jobProviderList.getJobProvider().then(function(response)
      {
        for(let i = 0; i < response.data.length; i = i + 1)
        {
          if(response.data[i].jpCode === $state.params.key1.jobprovider)
          {
            $scope.selectedItem = response.data[i];
            break;
          }
          $scope.jobShow = false;
        } // End of for loop
      },
      function(err)
      {
        $scope.msg='Could not load job providers data!';
      });
    }
    else
    {
      jobProviderList.getJobProvider().then(function(response)
      {
        console.log(response.data);
        $scope.querySearch=response.data;
      },
      function(err)
      {
        $scope.msg='Could not load job providers data!';
      });
    } //end of if else

    function submitJob()
    {
      $scope.jobData.jpCode= $scope.selectedItem.jpCode;
      console.log("dsssssssssssssssssssssssssssssssssssssssssssssssss");
      console.log($scope.jobData);
      jobProfileFactory.jobPost($scope.jobData).then(function(response)
      {
       $scope.msg=response.data.msg;
       // $scope.showAlert();
      },
      function(err)
      {
      $scope.msg='Some error occurred! Please try again..';
      });
    }

    // $scope.showAlert = function(ev) 
    // {
    //   // Appending dialog to document.body to cover sidenav in docs app
    //   // Modal dialogs should fully cover application
    //   // to prevent interaction outside of dialog
    //   $mdDialog.show(
    //     $mdDialog.alert()
    //     .parent(angular.element(document.querySelector('#popupContainer')))
    //     .clickOutsideToClose(true)
    //     .title('Message')
    //     .textContent('Job Posted Successfully')
    //     .ariaLabel('Alert Dialog Demo')
    //     .ok('Got it!')
    //     .targetEvent(ev)
    //   );
    // };
  } //end of controller
}());
