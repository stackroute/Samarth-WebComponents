(function(){
  'use strict'
   angular
    .module("samarth-webcomponents")
    .component("jobprovider",{
        templateUrl: './samarth-webcomponents/jobproviderreg/template/jobproviderreg.html',
        bindings: { name: '=',
                     txt: '@'
                  },
                  controller: 'jobproviderreg',
                  controllerAs : 'vm'
              })
              .controller('jobproviderreg',jobproviderreg);
              function jobproviderreg($scope,jobproviderfactory)
              {
                var vm = this;
                vm.availability="disabled";
                vm.jobprovider = {};
                vm.jobprovider.jpCode="";
                vm.subjobprovider = subjobprovider;
               $scope.$watch('vm.jobprovider.jpCode', function(newValue, oldValue) {
                 if(newValue.length===5){
                  jobproviderfactory.jpCodeCheck(vm.jobprovider.jpCode).then(function(response){
                    if(response.data.count>=1){
                    vm.availability="Not available";
                    }if(response.data.count==0){
                    // console.log(response.data.count+" =0");
                    vm.availability="Available";
                  }
                  }),function(err){
                    vm.msg="Some error occured!!";
                  }
                 }else{
                    vm.availability="disabled";
                 }
               });
                function subjobprovider(){
                  // if(vm.availability=="Available"){
                  jobproviderfactory.jobproviderdata(vm.jobprovider).then(function(response){
                  vm.msg=response.data.msg;
                  jobproviderfactory.jpCodeCheck(vm.jobprovider.jpCode).then(function(response){
                    if(response.data.count>=1){
                    vm.availability="Not available";
                    }if(response.data.count==0){
                    // console.log(response.data.count+" =0");
                    vm.availability="Available";
                  }
                  }),function(err){
                    vm.msg="Some error occured!!";
                  }
                  }),function(err){
                     vm.msg='Some error occurred';
                  }
                // }else{
                //   vm.msg="Please try with some other jobprovider code!!";
                // }
                  }
            
              }
      }
)();
