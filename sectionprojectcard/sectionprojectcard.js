angular.module('sm-skillprofile')
    .component('myProjectsectioncard', {            
        templateUrl: 'webcomponents/sectionprojectcard/templates/sectionprojectcard.html',
        controller: projectsectioncardCtrl          
    });

function projectsectioncardCtrl($http, $mdDialog) {
    var ctrl = this;  
    ctrl.changeFont = 'changeProjectNameFont';
    ctrl.profile = {}; 
    ctrl.totalProjects = 0;
    ctrl.limitval = 4;
    ctrl.increaseLimit = function() {
        ctrl.limitval = ctrl.totalProjects.length;
    }

    ctrl.decreaseLimit = function() {
        ctrl.limitval = 4;
    }

    $http({
        method: 'GET',
        url: 'api/profiles/01',
    }).then(function successCallback(response) {
        for (var prop in response.data)  {
            if (prop != "id" && prop != "UserName" && prop != "Personalinfo" && prop != "Education" && prop != "Skills" && prop != "Work Experiance" && prop != "Certification") { 
                ctrl.profile[prop] = response.data[prop]; 
                ctrl.totalProjects = ctrl.profile[prop].length;
            }
        }
    }, function errorCallback(response) {
        console.log('Error accord during Project Section')
    });  

    ctrl.showAdvanced = function(ev, header, object) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: '/webcomponents/sectionprojectcard/templates/sectionprojectconversation.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                locals: {
                    header: header,
                    object: object
                }
            })
            .then(
                function(answer) {},
                function() {}
            );
    };

    function DialogController($scope, $mdDialog, $http, header, object) {
        $scope.header = header;

        if (object != '') {
            $scope.Project = object.Project;
            $scope.Duration = object.Duration;
            $scope.Client = object.Client;
            $scope.Location = object.Location;
            $scope.Salary = object.Salary;
        } else {
            $scope.Project = "project";
            $scope.Duration = "some months";
            $scope.Client = "client";
            $scope.Location = "at some location";
            $scope.Salary = "some salary";
        }

        /*$scope.projectobj={
          "Project":$scope.Titleofeducation,
          "Duration":$scope.Duration,
          "Client":$scope.Client,
          "Location":$scope.Location,
          "Salary":$scope.Salary

        }*/

        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };


        $scope.save = function() {
            console.log($scope.Duration);
            /*$http({
              method:'PATCH',
              url:'api/profiles/01/',
              'Content-Type':'application/json',
              data:$scope.projectobj
            })
            .then(function successCallback(response) {
              alert('success');
            },
            function errorCallback(response) {
              alert('error');
            });*/
        }
    }

}

