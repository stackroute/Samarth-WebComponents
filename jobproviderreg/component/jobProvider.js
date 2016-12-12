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
                vm.msg="";
                vm.jobprovider = {};
                vm.jobprovider.jpCode="";
                vm.subjobprovider = subjobprovider;
               $scope.$watch('vm.jobprovider.jpCode', function(newValue, oldValue) {
                 // do stuff to the text everytime it chan
                 if(newValue.length===5){
                  jobproviderfactory.jpCodeCheck(vm.jobprovider.jpCode).then(function(response){
                    if(response.data.count>=1){
                    // $scope.myForm.jpCode.$setValidity(false);
                    // console.log("in code "+response.data.count);
                    // vm.msg="Some error occurred";
                    }else
                    vm.msg="";
                  }),function(err){
                    console.log("error in code check")
                  }
                  
                 }
               });
                function subjobprovider(){
                  console.log(vm.jobprovider);
                  jobproviderfactory.jobproviderdata(vm.jobprovider).then(function(response){
                    // if(response.body.error) {
                      //Jobprovider code is taken up already
                      // console.log("Data post success");
                      // this.error = response.body.error;
                    // } else {
                      //success posted
                      vm.msg="Registered successfully";

                    
                     
                  }),function(err){
                     console.log('Error in data post');
                  }
                }
              }

      }
)();
