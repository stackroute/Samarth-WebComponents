(function (){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .component("criteria",{
        templateUrl: './samarth-webcomponents/jobPost/template/criteria.html',
        bindings: { data: '<',
                     txt: '@'      
                  },
                  controller: 'criteriaCtrl',
                  controllerAs : 'vm'
              })
              .controller('criteriaCtrl',criteriaCtrl);
              function criteriaCtrl(){
              let vm = this;
                // console.log("dddddddddddddddddddd");
                // console.log(vm.data);
              vm.criteria=vm.data;
              vm.criteria.qualifications=vm.data.qualifications;
      }
}());
