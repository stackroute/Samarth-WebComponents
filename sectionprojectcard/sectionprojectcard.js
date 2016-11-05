let scriptsElementProject = document.getElementsByTagName('script');
let currentScriptPathProject = scriptsElementProject[scriptsElementProject.length - 1].src;
let path3 = currentScriptPathProject.substring(0, currentScriptPathProject.lastIndexOf('/')) + '/templates/sectionprojectconversation.html';

angular.module('samarth-webcomponents')
    .component('myProjectsectioncard', {
        templateUrl: currentScriptPathProject.substring(0, currentScriptPathProject.lastIndexOf(
            '/')) + '/templates/sectionprojectcard.html',
        controller: projectsectioncardCtrl,
        bindings: {
            candidateid: '<',
            showheader: '<',
            languagedata: '='
        },
        transclude: {
            verify: 'verify'
        }
    });

function projectsectioncardCtrl($http, $mdDialog, datagenerate, $rootScope, $scope) {
    let ctrl = this;
    // var candidateid = UserAuthService.getUser().uname;
    ctrl.loadLangData = function(lang) {
            datagenerate.getjson('section', lang).then(function(result) {
                ctrl.items = result;
                // console.log("for skills");
            }); // end datagenerate
        };
        // ctrl.loadLangData(getItem("lang"));

    function getItem(key) {
        // return localStorageService.get(key);
    }
    // $scope.loadLangData("Hindi");
    ctrl.loadLangData('English');
    // $rootScope.$on("lang_changed", function(event, data) {
    //     // console.log("User switch to language " + data.language);
    //     ctrl.loadLangData(data.language);
    // });

    ctrl.changeFont = 'changeProjectNameFont';
    ctrl.profile = [];
    ctrl.profile1 = [];
    ctrl.totalProjects = 0;
    ctrl.limitval = 8;
    ctrl.increaseLimit = function() {
        /* if((ctrl.limitval+3)<=ctrl.totalProjects){
          ctrl.limitval = ctrl.limitval+4;
        }
        else*/
        ctrl.limitval = ctrl.totalProjects;
    };

    ctrl.decreaseLimit = function() {
        ctrl.limitval = 8;
    };

    $http({
        method: 'GET',
        url: '/proxy/project/' + ctrl.candidateid

    }).then(function successCallback(response) {
        for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {
            for (let record = 0; record < response.data[noOfObjects].projects.length; record++) {
                ctrl.profile.push(response.data[noOfObjects].projects[record]);
            }
        }
        ctrl.totalProjects = ctrl.profile.length;
    }, function errorCallback(response) {
        console.log('Error accord during Project Section');
    });
    $rootScope.$on('projectdata', function() {
        ctrl.profile = [];
        ctrl.totalProjects = 0;
        $http({
            method: 'GET',
            url: '/proxy/project/' + ctrl.candidateid

        }).then(function successCallback(response) {
            for (let noOfObjects = 0; noOfObjects < response.data.length; noOfObjects++) {
                for (let record = 0; record < response.data[noOfObjects].projects
                    .length; record++) {
                    ctrl.profile.push(response.data[noOfObjects].projects[record]);
                }
            }
            ctrl.totalProjects = ctrl.profile.length;
        }, function errorCallback(response) {
            console.log('Error accord during Project Section');
        });
    });

    ctrl.showAdvanced = function(ev, header, object) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: path3,
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
        // var candidateid = UserAuthService.getUser().uname;
        $scope.header = header;
        $scope.projectObj = object;
        $scope.skills = $scope.projectObj.skills;
        console.log('skills', $scope.skills);

        $scope.submit = function() {
            $scope.Skills.push('');
        };
        if (object != '') {
            $scope.Project = object.name;
            $scope.Duration = object.duration.durationInMonths;
            $scope.Client = object.workplace;
            $scope.Location = object.location;
            $scope.Salary = object.income;
            // $scope.Skills = [];
            // for (var skill in object.skills) {
            //     console.log("Inside section project ",object.skills[skill]);
            //     $scope.Skills.push(object.skills[skill]);
            // }*/
        } else {
            $scope.Project = '';
            $scope.Duration = '';
            $scope.Client = '';
            $scope.Location = '';
            $scope.Salary = '';
            $scope.Skills = ['skillname'];
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


        $scope.save = function(header) {
            let skill = $scope.skills.toString().split(',');
            console.log('Header' + header);

            let projectData = {

                projects: [{
                    name: $scope.Project,
                    workplace: $scope.Client,
                    location: $scope.Location,
                    income: $scope.Salary,
                    duration: {
                        from: '09/08/2016',
                        to: '09/11/2016',
                        durationInMonths: $scope.Duration
                    },
                    skills: skill,
                    meta: []
                }]
            };
            if (header == 'Add Project') {
                console.log('before adding project', projectData);
                $http({
                    method: 'POST',
                    url: '/proxy/project/' + ctrl.candidateid,
                    data: projectData,
                    crossDomain: true
                }).then(function successCallback(response) {
                    console.log('After adding project', response.data);
                    $rootScope.$emit('projectdata', {});
                }, function errorCallback(response) {
                    console.log('Error accord during Project Section');
                });
            } else {
                console.log('projectdata', projectData);
                $http({
                    method: 'PATCH',
                    url: '/proxy/project/' + ctrl.candidateid + '/' +
                        object.name,
                    data: projectData,
                    crossDomain: true
                }).then(function successCallback(response) {
                    console.log('After updating project', response.data);
                    $rootScope.$emit('projectdata', {});
                }, function errorCallback(response) {
                    console.log('Error accord during updating Project Section');
                });
            }
        };
    }
}
