(function(){
 'use strict'
  angular
    .module("samarth-webcomponents")
    .controller('jobDataCtrl',jobDataCtrl);
    function jobDataCtrl(){
                var vm = this;
                vm.jobData={};
                vm.jobData.desc={};
                vm.jobData.criteria={};
                // vm.jobData.employer={};

                vm.submitJob=function(){
                  alert("working  "+ vm.jobData);
                }
        }
})();
