






var app=angular
.module('sm-skillprofile')
.component('myEducationcard',
{
  templateUrl:'/webcomponents/sectionseducationcard/templates/sectionseducationcard.html',
  controller:educationCardController

});

function educationCardController($mdDialog,$http)
{
  var ctrl=this;

  ctrl.eduDetails={};
  ctrl.schools=[];
  ctrl.colleges=[];

  $http.get('api/profiles/01').then(function(response) 
  {
    for(var prop in response.data)
    {
      if(prop=="Education")
      {
        ctrl.eduDetails[prop]=response.data[prop];
      }
    }
    for(var prop in ctrl.eduDetails)
    {
      for(var key in ctrl.eduDetails[prop])
      {
       for(var k in ctrl.eduDetails[prop][key])
       {
        if(ctrl.eduDetails[prop][key][k]=="school")
        {
          ctrl.schools.push(ctrl.eduDetails[prop][key]);
        }
        if(ctrl.eduDetails[prop][key][k]=="work")
        {
          ctrl.colleges.push(ctrl.eduDetails[prop][key]);
        }
      }
    }
  }
});

  ctrl.showAdvanced = function(ev,header,object) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: '/webcomponents/sectionseducationcard/templates/educonvoNEW.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      locals:
      {
        header:header,
        object:object
      }
    })
    .then(
      function(answer) {},
      function() {}
      );
  };

  function DialogController($scope, $mdDialog,$http,header,object) {
    $scope.header=header;
    
    if(object!='')
    {
      $scope.Titleofeducation=object.Titleofeducation;
      $scope.Completionyear=object.Completionyear;
      $scope.Percentage=object.Percentage;
      $scope.Name=object.Name;
      $scope.Location=object.Location;
      $scope.Affiliation=object.Affiliation;
    }
    else
    {
      $scope.Titleofeducation="course";
      $scope.Completionyear="some year";
      $scope.Percentage="some value";
      $scope.Name="some college";
      $scope.Location="at some location";
      $scope.Affiliation="some controlling body";
    }
    
    $scope.eduobj={
      "Type":"school",
      "Titleofeducation":$scope.Titleofeducation,
      "Completionyear":$scope.Completionyear,
      "Percentage":$scope.Percentage,
      "Name":$scope.Name,
      "Location":$scope.Location,
      "Affiliation":$scope.Affiliation

    }

    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };

    
    $scope.save=function()
    {
      
      $http({
        method:'POST',

        url:'api/profiles/01/',
        'Content-Type':'application/json',
        data:$scope.eduobj
      })
      .then(function successCallback(response) {
        alert('success');
      },
      function errorCallback(response) {
        alert('error');
      });
    }
  }


}