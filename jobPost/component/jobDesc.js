(function (){
  'use strict';
   angular
      .module('samarth-webcomponents')
      .component('jobDesc',{
      templateUrl: './samarth-webcomponents/jobPost/template/jobDesc.html',
      bindings: { data: '<',
                   txt: '@'      
                },
       controller:'jobDescCtrl',
       controllerAs:'vm',
       scope:true,
       transclude:true
      })
      .controller('jobDescCtrl', jobDescCtrl);
      function jobDescCtrl(){
            let vm=this;
        console.log("ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd");
        console.log(vm.data);
            vm.job=vm.data;
            vm.job.skills=vm.data.skills;
            vm.newSkill=function(){};

            function newSkill(chip) {
            return {
                name: chip,
                expertise: 'unknown',
                priority:'unknown'
            };
          }
      }
      }());
