(function(){
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
              var vm = this;
              vm.criteria = {};
              vm.criteria.qualifications={};
              data.criteria=vm.criteria;
      }
})();
