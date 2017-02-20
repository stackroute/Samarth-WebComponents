(function() {
    'use strict'
    angular
        .module("samarth-webcomponents")
        .component("jobprovider", {
            templateUrl: './samarth-webcomponents/jobproviderreg/template/jobproviderreg.html',
            bindings: {
                name: '=',
                txt: '@'
            },
            controller: 'jobproviderreg',
            controllerAs: 'vm'
        })
        .controller('jobproviderreg', jobproviderreg);

    function jobproviderreg($scope, jobproviderfactory, $state, $mdDialog) {
        var vm = this;
        vm.msg = "";
        vm.availability = "disabled";
        vm.checked = false;
        vm.jobprovider = {};
        vm.jobprovider.jpCode = "";
        vm.subjobprovider = subjobprovider;
        vm.savechanges = savechanges;
        vm.uploadFiles = uploadFiles;
        vm.foo = $state.params.key;
        // console.log(vm.foo);
        vm.bar = $state.params.key1;
        // console.log("y" + vm.bar);
        vm.save = true;
        vm.register = false;

        // vm.showAlert = showAlert;
        if (vm.foo == "1") {

            jobproviderfactory.getJobProviderbyid(vm.bar).then(function(response) {
                vm.save = false;
                vm.register = true;
                $scope.profiling = response.data;
               
                vm.jobprovider = $scope.profiling[0];
                vm.checked = true;

            });
        }


        function uploadFiles(files){
            let Files = files;


                if (files && files.length > 0) {
                    angular.forEach(Files, function (file, key) {
                        jobproviderfactory.Upload(file).then(function (result) {
                            // Mark as success
                            file.Success = true;
                            // alert(result);
                            vm.jobprovider.url = result.Location;
                            // console.log('newPicURL: '+ vm.jobprovider.url);
                                                                       
                            
                        }, function (error) {
                            // Mark the error
                            this.Error = error;
                            
                            alert('some error occured while uploading the pic, Please try after sometime!');

                        }, function (progress) {
                            // Write the progress as a percentage
                            file.Progress = (progress.loaded / progress.total) * 100
                        });
                    });
                }

        }

        function savechanges() {

            // if(vm.availability=="Available"){
            jobproviderfactory.updatejobprovider(vm.jobprovider).then(function(response) {
              vm.msg = "Updated Successfully";
              showAlert();
                    console.log("hey" + vm.msg);
                    function showAlert(ev) {
                       // Appending dialog to document.body to cover sidenav in docs app
                       // Modal dialogs should fully cover application
                       // to prevent interaction outside of dialog
                       $mdDialog.show(
                           $mdDialog.alert()
                           .parent(angular.element(document.querySelector('#popupContainer')))
                           .clickOutsideToClose(true)
                           .title("Message")
                           .textContent("User "+ vm.jobprovider.jpCode+"! "+" "+"is"+vm.msg)
                           .ariaLabel('Alert Dialog Demo')
                           .ok('Got it!')
                           .targetEvent(ev)
                       );
                    };
                    // console.log("Called before");
                    $state.go('index.emp');
                    // console.log("Called after");
                }),
                function(err) {
                    vm.msg = 'Some error occurred';
                }
                // }else{
                //   vm.msg="Please try with some other jobprovider code!!";
                // }
                //  function showAlert(ev) {
                //     // Appending dialog to document.body to cover sidenav in docs app
                //     // Modal dialogs should fully cover application
                //     // to prevent interaction outside of dialog
                //     $mdDialog.show(
                //         $mdDialog.alert()
                //         .parent(angular.element(document.querySelector('#popupContainer')))
                //         .clickOutsideToClose(true)
                //         .title("Message")
                //         .textContent(vm.msg)
                //         .ariaLabel('Alert Dialog Demo')
                //         .ok('Got it!')
                //         .targetEvent(ev)
                //     );
                // };


        }





        $scope.$watch('vm.jobprovider.jpCode', function(newValue, oldValue) {
            if (newValue.length === 5) {
                jobproviderfactory.jpCodeCheck(vm.jobprovider.jpCode).then(function(response) {
                        if (response.data.count >= 1) {
                            vm.availability = "Not available";
                        }
                        if (response.data.count == 0) {
                            // console.log(response.data.count+" =0");
                            vm.availability = "Available";
                        }
                    }),
                    function(err) {
                        vm.msg = "Some error occured!!";
                    }
            } else {
                vm.availability = "disabled";
            }
        });

        function subjobprovider() {
            // if(vm.availability=="Available"){

            jobproviderfactory.jobproviderdata(vm.jobprovider).then(function(response) {
                    vm.msg = response.data.msg;
                    showAlert();
                    function showAlert(ev) {
                       // Appending dialog to document.body to cover sidenav in docs app
                       // Modal dialogs should fully cover application
                       // to prevent interaction outside of dialog
                       $mdDialog.show(
                           $mdDialog.alert()
                           .parent(angular.element(document.querySelector('#popupContainer')))
                           .clickOutsideToClose(true)
                           .title("Message")
                           .textContent("User "+ vm.jobprovider.jpCode+"!"+"is"+vm.msg)
                           .ariaLabel('Alert Dialog Demo')
                           .ok('Got it!')
                           .targetEvent(ev)
                       );
                    };
                    jobproviderfactory.jpCodeCheck(vm.jobprovider.jpCode).then(function(response) {
                            if (response.data.count >= 1) {
                                vm.availability = "Not available";
                            }
                            if (response.data.count == 0) {
                                // console.log(response.data.count+" =0");
                                vm.availability = "Available";
                            }

                        }),
                        function(err) {
                            vm.msg = "Some error occured!!";
                        }

                    $state.go('index.emp');
                   
                }),
                function(err) {
                    vm.msg = 'Some error occurred';
                }

              //  function showAlert(ev) {
                    // Appending dialog to document.body to cover sidenav in docs app
                    // Modal dialogs should fully cover application
                //     // to prevent interaction outside of dialog
                //     $mdDialog.show(
                //         $mdDialog.alert()
                //         .parent(angular.element(document.querySelector('#popupContainer')))
                //         .clickOutsideToClose(true)
                //         .title("Message")
                //         .textContent(vm.msg)
                //         .ariaLabel('Alert Dialog Demo')
                //         .ok('Got it!')
                //         .targetEvent(ev)
                //
                //     );
                // };
                // }else{
                //   vm.msg="Please try with some other jobprovider code!!";
                // }
        }

    }
})();
