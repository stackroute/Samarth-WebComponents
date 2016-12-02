(function(){
  'use strict'
angular
  .module('samarth-webcomponents')
  .component("jobSearchResult",{
    templateUrl:'jobSearch/template/jobSearchResult.html',
    bindings:{
       value:'='
      },
    controller:function($scope){
      $scope.$on('san', function(event, data)
      {
       $scope.foo=data;
       $scope.newSkill = function(chip){
       return {
        name: chip,
        expertise: 'unknown'
          };
        };
      });
    }
  })
})(); 
