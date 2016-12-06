(function(){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .component("jobprovider",{
        templateUrl: 'jobproviderreg/template/jobproviderreg.html',
        bindings: { name: '=',
                     txt: '@'
                  },
                  controller: 'jobproviderreg',
                  controllerAs : 'vm'
              })
              .controller('jobproviderreg',jobproviderreg);
              function jobproviderreg($scope)
              {

              }

      }
)();
