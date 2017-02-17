(function() {
    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;
    let projectconversationpath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/templates/sectionprojectconversation.html';

    angular.module('samarth-webcomponents')
        .component('myProjectsectioncard', {
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/templates/sectionprojectcard.html',
            controller: projectsectioncardCtrl,
            bindings: {
                candidateid: '<',
                showheader: '<',
                languagedata: '=',
            },
            transclude: {
                verify: 'verify'
            }
        });

    function projectsectioncardCtrl($http, $mdDialog, datagenerate, deleteProjectService, $rootScope, $scope,$rootElement) {
        let ctrl = this;

        // if(!ctrl.languagedata) {
        //     ctrl.languagedata = 'English';
        // }

        // console.log("hjjjjjjjjjjjjjjjjggggggggggggggggggggggggggggggggggg");
        // console.log(ctrl.candidateid);
       // ctrl.lang = "English";
        ctrl.loadLangData = function(lang) {
            // ctrl.lang = lang;
            // Setting language default to English for Samarth-Placement, as it is not multilingual as of now
         // if($rootElement.attr('ng-app')=="samarth")
         //    {
         //        ctrl.lang = "English";
         //    }
            
            datagenerate.getjson("section",lang).then(function(result) {
                
                ctrl.items = result;
             
                 if($rootElement.attr('ng-app')==="samarth")
            {
                ctrl.languagedata = result;
                              
            }
            }); // end datagenerate
            
        };

        function getItem(key) {
            // return localStorageService.get(key);
        }

        ctrl.loadLangData('English');

        ctrl.changeFont = 'changeProjectNameFont';
        ctrl.profile = [];
        ctrl.profile1 = [];
        ctrl.totalProjects = 0;
        ctrl.limitval = 3;
        ctrl.increaseLimit = function() {
            ctrl.limitval = ctrl.limitval + 60;
        };

        ctrl.decreaseLimit = function() {

            ctrl.limitval = ctrl.limitval - 60;
        };

        $http({
            method: 'GET',
            url: '/project/' + ctrl.candidateid

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
                url: '/project/' + ctrl.candidateid

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


        //--------- confirm project delete function ---------------
        ctrl.showConfirm = function(ev,object) {
    
            var confirm = $mdDialog.confirm()
            .title('Would you like to delete the selected Project?')          
            .targetEvent(ev)
            .ok('YES!')
            .cancel('Not sure, maybe later!');

            $mdDialog.show(confirm).then(function() { //when user clicks on "YES"
                // console.log(object);
                // alert("inside confirm event of deletion function");
                let projectName = object.name;
                deleteProjectService.removeproject(ctrl.candidateid, projectName).then(function mySucces(response)  {
                            console.log('deleted project data successfully');
                            $rootScope.$emit('projectdata', {});//reloads the Project section with new records after deletion
                    }, function myError(response) {
                            console.log('error in deleting project');
                    });
                $mdDialog.hide();
            }, function() { 
                $mdDialog.hide();//Hide the prompt when user clicks CANCEL!
            });
        };//end showConfirm

        ctrl.showAdvanced = function(ev, header, object) {
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: projectconversationpath,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        header: header,
                        object: object,
                        candidateid: this.candidateid
                    }
                })
                .then(
                    function(answer) {},
                    function() {}
                );
        };

        function DialogController($scope, $mdDialog, $http, header, object, candidateid) {

            $scope.candidateid = candidateid;
            $scope.header = header;
            $scope.project = {};
            // $scope.skills = $scope.projectObj.skills;
            // console.log("skills", $scope.skills)

            $scope.submit = function() {
                $scope.Skills.push('');
            };
            if (object != '') {
                $scope.project = object;
               
            } 
            $scope.submit = function() {
                $scope.Skills.push('');
            };
            
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
                console.log("Save called");
                // var skill = $scope.skills.toString().split(",");
                // console.log("Header" + header)

                // var projectData = {

                //     "projects": [{
                //         "name": $scope.Project,
                //         "workplace": $scope.Client,
                //         "location": $scope.Location,
                //         "role": $scope.Role,
                //         "durationInMonths": $scope.Duration,
                //         "skills": skill,
                //         "meta": []
                //     }]
                // } 

                if (header == 'Add Project') {
                   // console.log('before adding project', projectData);
                    $http({
                        method: 'POST',
                        url: '/project/' + ctrl.candidateid,
                        data: $scope.project,
                        crossDomain: true
                    }).then(function successCallback(response) {
                        // console.log('After adding project', response.data);
                        $rootScope.$emit('projectdata', {});
                    }, function errorCallback(response) {
                        console.log('Error accord during Project Section');
                    });
                } else {
                    console.log(header);
                    // console.log('projectdata', projectData);
                    $http({
                        method: 'PATCH',
                        url: '/project/' + ctrl.candidateid + '/' +
                            object.name,
                        data: $scope.project,
                        crossDomain: true
                    }).then(function successCallback(response) {
                        // console.log('After updating project', response.data);
                        $rootScope.$emit('projectdata', {});
                    }, function errorCallback(response) {
                        console.log('Error accord during updating Project Section');
                    });
                }
            };
        }
    }
})();

