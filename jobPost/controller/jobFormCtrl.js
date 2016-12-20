(function (){
   'use strict'
    angular
      .module('samarth-webcomponents')
      .controller('dialogController', dialogController);
      function dialogController ($scope,$mdDialog,professionFac) 
               {  $scope.skills=[{}];
                  $scope.qualifications=[{}];
                  $scope.showJobDesc = function(event,jobCtrl) {
                  $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  fullscreen: true,        
                  preserveScope: true,           
                  templateUrl: './samarth-webcomponents/jobPost/template/jobDescForm.html',
                  controller: function dialogController($scope, $mdDialog,professionFac) {
                       $scope.expertise = [
                                              "Beginner",
                                              "Skilled",
                                              "Proficient",
                                              "Expert"
                                          ];
                        $scope.priority = [
                                              "Mandatory",
                                              "Optional"
                                          ];  
                        $scope.addInput=addInput;                                    
                        $scope.submitDescData=submitDescData;
                        
                          professionFac.profReq().then(function(data)
                          {
                            let temp = [];
                            for(let i = 0; i < data.data.length; i = i + 1)
                            {
                              temp[i] = data.data[i].professions;
                            }
                            $scope.items = temp;
                            // console.log($scope.items);
                          });
                      
                                        
                        function addInput() {
                        $scope.skill={};
                        $scope.skills.push($scope.skill);
                      };
                    
                      function submitDescData()
                     {  jobCtrl.job=$scope.job;
                        jobCtrl.job.skills=$scope.skills;
                        // jobCtrl.job.profession=$scope.items;
                        console.log(jobCtrl.job.profession);
                        jobCtrl.data.desc=jobCtrl.job;
                        $mdDialog.hide();
                      }
                        $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                      
                  }
                    
               })
            };
            $scope.showQualification = function(event,criteriaCtrl) {
               $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  fullscreen: true,        
                  preserveScope: true,           
                  templateUrl: './samarth-webcomponents/jobPost/template/criteriaForm.html',
                  controller: function dialogController($scope, $mdDialog,professionFac) {
                     $scope.priority = [
                                              "Mandatory",
                                              "Optional"
                                          ];               
                     $scope.addQual=addQual;                          
                     $scope.submitCriteriaData=submitCriteriaData;

                      function addQual(){
                        $scope.qualification={};
                        $scope.qualifications.push($scope.qualification);
                      }

                      function submitCriteriaData()
                     {
                        criteriaCtrl.criteria=$scope.criteria;
                        criteriaCtrl.criteria.qualifications=$scope.qualifications;
                        criteriaCtrl.data.criteria=criteriaCtrl.criteria;
                        $mdDialog.hide();
                      }
                        $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
            }
}
}());
