(function(){
   'use strict'
    angular
      .module('samarth-webcomponents')
      .controller('dialogController', dialogController);
      function dialogController ($scope,$mdDialog) 
               {  $scope.skills=[{}];
                  $scope.qualifications=[{}];
                  $scope.showJobDesc = function(event,jobCtrl) {
                  $mdDialog.show({
                  clickOutsideToClose: true,
                  scope: $scope,
                  fullscreen: true,        
                  preserveScope: true,           
                  templateUrl: './samarth-webcomponents/jobPost/template/jobDescForm.html',
                  controller: function dialogController($scope, $mdDialog) {
                       $scope.expertise = [
                                              "Beginner",
                                              "Skilled",
                                              "Proficient",
                                              "Expert"
                                          ];
                        $scope.priority = [
                                              "Mandatory",
                                              "Optional",
                                          ];  
                        $scope.addInput=addInput;                                    
                        $scope.submitDescData=submitDescData;
                        
                        function addInput() {
                        $scope.skill={};
                        $scope.skills.push($scope.skill);
                      };
                    
                      function submitDescData()
                     {  jobCtrl.data=$scope.job;
                        jobCtrl.data.skills=$scope.skills;
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
                  controller: function dialogController($scope, $mdDialog) {
                     $scope.priority = [
                                              "Mandatory",
                                              "Optional",
                                          ];               
                     $scope.addQual=addQual;                          
                     $scope.submitCriteriaData=submitCriteriaData;

                      function addQual(){
                        $scope.qualification={};
                        $scope.qualifications.push($scope.qualification);
                      }

                      function submitCriteriaData()
                     {
                        criteriaCtrl.data.criteria=$scope.criteria;
                        criteriaCtrl.data.criteria.qualifications=$scope.qualifications;
                        $mdDialog.hide();
                      }
                        $scope.closeDialog = function() {
                        $mdDialog.hide();
                     }
                  }
               });
            };
}
})();
