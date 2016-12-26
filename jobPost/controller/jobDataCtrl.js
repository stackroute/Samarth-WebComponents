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
    $scope.updateJob=updateJob;

    $scope.showAlert = function(ev) 
    {
      // Appending dialog to document.body to cover sidenav in docs app
      // Modal dialogs should fully cover application
      // to prevent interaction outside of dialog
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Message')
        .textContent($scope.msg)
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
        .targetEvent(ev)
      );
    };

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
    {$scope.jobShow = true;
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
      console.log("In final submit button");
      console.log($scope.jobData);
      jobProfileFactory.jobPost($scope.jobData).then(function(response)
      {
       $scope.msg=response.data.msg;
       $scope.showAlert();
       // $scope.showAlert();
      },
      function(err)
      {
      $scope.msg='Some error occurred! Please try again..';
      });
    }
    console.log("controller");
    console.log($scope.jobData);


    function updateJob()
    {
      console.log("update");
      console.log($scope.jobData);
      // alert($scope.jobData.jobcode+" "+"in update ");
      console.log($scope.jobData.criteria.jobcode+" "+"in update ");
      // console.log("hey")
      // console.log($scope.jobData);
      // $scope.jobData.desc = '';
      console.log('Job data before update: ', $scope.jobData);
      jobProfileFactory.updateJob($scope.jobData).then(function(response)  
      {
        // alert('in factory update');e 
        // console.log("inside function");
       $scope.msg = response.data.msg;
       // console.log($scope.msg);
       $scope.showAlert();
      }, function(err) {
        console.log("Error in updating job: ", err);
        alert("in error fac ", err);
        $scope.msg='Some error occurred! Please try again..';
        $scope.msg=err;
      });
    }

  } 
  //end of controller
}());
