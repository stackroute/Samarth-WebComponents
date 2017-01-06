(function (){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .component("criteria",{
        templateUrl: './samarth-webcomponents/jobPost/template/criteria.html',
        bindings: { data: '=',
                     txt: '@'      
                  },
                  controller: 'criteriaCtrl',
                  controllerAs : 'vm'
              })
              .controller('criteriaCtrl',criteriaCtrl);
              function criteriaCtrl($rootElement){
              let vm = this;
            if($rootElement.attr('ng-app')=="samarth")
           {  
             vm.value1=true;
           }
           else
           {
              vm.value1=false;
           }
              vm.criteria=vm.data;
              vm.criteria.qualifications=vm.data.qualifications;
      }
}());
