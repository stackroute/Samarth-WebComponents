(function() {

   var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    let jobpreferencesconversationpath = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/templates/sectionjobpreferencesconversation.html';

    angular.module('samarth-webcomponents')
        .component('myJobpreferencessectioncard', {
          
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/templates/sectionjobpreferencescard.html',
            controller: jobpreferencessectioncardCtrl,
            bindings: {
                candidateid: '<',
                showheader: '<',
                languagedata: '='
            },
            transclude: {
                verify: 'verify'
            }
        });

    function jobpreferencessectioncardCtrl($http, $mdDialog, datagenerate, $rootScope, $scope) {
        console.log("jobpreferencessectioncardCtrl");
        let ctrl = this;
        ctrl.preferences = {};
        ctrl.loadLangData = function(lang) {
            datagenerate.getjson('section', lang).then(function(result) {
                ctrl.items = result;
            }); // end datagenerate
        };

        function getItem(key) {
            // return localStorageService.get(key);
        }

        ctrl.loadLangData('English');

        $http({
            method: 'GET',
            url: '/jobpreferences/' + ctrl.candidateid

        }).then(function successCallback(response) {
            
            ctrl.preferences = response.data[0].preferences;

        }, function errorCallback(response) {
            console.log('Error accord during preferences Sec');
        });

        $rootScope.$on('preferencedata', function() {
                $http({
                method: 'GET',
                url: '/jobpreferences/' + ctrl.candidateid

            }).then(function successCallback(response) {
              
                ctrl.preferences = response.data[0].preferences;
            }, function errorCallback(response) {
                console.log('Error accord during preferences Section');
            });
        });

        ctrl.showAdvanced = function(ev, header, object) {
            console.log("dsgdsg");
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: jobpreferencesconversationpath,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    locals: {
                        header: header,
                        object: object,
                        candidateid: ctrl.candidateid
                    }
                }).
                then(
                    function(answer) {},
                    function() {}
                );
        };

        function DialogController($scope, $mdDialog, $http, header, object, candidateid) {
            $scope.IsVisible = false;
            $scope.ShowPassport = function (value) {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsVisible = value == "Y";
            }
    if(object!='') 
         {     
        if (object.looking_jobs == "Yes") {$scope.IsVisible = true;}}
            $scope.candidateid = candidateid;
            $scope.header = header;
/*            $scope.projectObj = object;
*/         
            console.log("skills", $scope.skills);
             console.log(object);
            if (object != '') {
                $scope.looking_jobs=object.looking_jobs;
                $scope.expected_salary = "";
                $scope.roles = object.roles;
                $scope.skills = object.skills;
                $scope.engagement_type="";
                $scope.joining_date="";
                $scope.locations = object.locations;
            } else {
                $scope.looking_jobs="",
                $scope.expected_salary = "";
                $scope.joining_date="";
                $scope.engagement_type="";
                $scope.roles = "";
                $scope.locations = "";
                $scope.skills = "";
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
                var skill = $scope.skills.toString().split(",");
                var location=$scope.locations.toString().split(",");
                var role=$scope.roles.toString().split(",");

                console.log("Header" + header)
                console.log("save");
                console.log("kumariiii");
                console.log($scope.looking_jobs);
                /*if($scope.looking_jobs=="Yes")
                {*/
                var preferenceData = {

                    "preferences":{
                        "looking_jobs":$scope.looking_jobs,
                        "expected_salary": $scope.expected_salary,
                        "locations": location,
                        "roles": role,
                        "skills": skill,
                        "joining_date":$scope.joining_date,
                        "engagement_type":$scope.engagement_type
                        
                    }
                };
           /* }*/

           /* if($scope.looking_jobs=="No")
                {
                var preferenceData = {

                    "preferences":{
                        "looking_jobs":$scope.looking_jobs,
                        "expected_salary": "",
                        "locations":"",
                        "roles": "",
                        "skills": "",
                        "joining_date":"",
                        "engagement_type":""
                        
                    }
                };
            }*/

                if (header == 'Edit Job Preferences') {
                    console.log('before adding preferences', preferenceData);
                    $http({
                        method: 'POST',
                        url: '/jobpreferences/' + $scope.candidateid,
                        data: preferenceData,
                        crossDomain: true
                    }).then(function successCallback(response) {
                        console.log('After adding preferences', response.data);
                        console.log("afeer");
                        $rootScope.$emit('preferencedata', {});
                    }, function errorCallback(response) {
                        console.log('Error accord during Preferences');
                    });
                } 
            };
        }
    }
})();
