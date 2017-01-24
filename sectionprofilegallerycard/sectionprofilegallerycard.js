(function() {
    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;

    let expandedview = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/templates/expandedview.html';
    let addNewView = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/templates/addNew.html';

    angular.module('samarth-webcomponents')
        .component('myProfilegallerycard', {
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/templates/sectionprofilegallerycard.html',
            controller: profilegallerycardCtrl,
            bindings: {
                candidateid: '<',
                showheader: '<',
                languagedata: '='
            },
            transclude: {
                verify: "verify",

            }
        });
        


    

    function profilegallerycardCtrl($scope, $http, $mdDialog, $rootScope,$rootElement, sectionprofilegalleryservice) {
        var ctrl = this;
        ctrl.personalInfo = {};
        // console.log(this.candidateid);
        // let candidateID = this.candidateid;

        // ctrl.lang = "English";
        // console.log("$rootElement.attr('ng-app')");
        // console.log($rootElement.attr('ng-app'));
        // ctrl.loadLangData = function(lang) {
        //     // ctrl.lang = lang;
        //     // Setting language default to English for Samarth-Placement, as it is not multilingual as of now
        //  // if($rootElement.attr('ng-app')=="samarth")
        //  //    {
        //  //        ctrl.lang = "English";
        //  //    }

        alert('In profilegallerycard controller');

        sectionprofilegalleryservice.getGallery(this.candidateid).then(function(result) {
                ctrl.data = result;
                
                console.log('data in gallery controller ');
                console.log(ctrl.data);
                
            });

        // ctrl.images = [
        //     {
        //       'name': '1.jpg',
        //       'title': 'Image 1',
        //       'desc': 'this is image 1 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/350x150' // used only for this example
        //     },
        //     {
        //       'name': '2.gif',
        //       'title': 'Image 2',
        //       'desc': 'this is image 2 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/500x200'
        //     },
        //     {
        //       'name': '3.png',
        //       'title': 'Image 3',
        //       'desc': 'this is image 3 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/200x200'
        //     },
        //     {
        //       'name': '4.png',
        //       'title': 'Image 4',
        //       'desc': 'this is image 4 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/500x500'
        //     },
        //     {
        //       'name': '5.png',
        //       'title': 'Image 5',
        //       'desc': 'this is image 5 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/300x200'
        //     },
        //     {
        //       'name': '6.png',
        //       'title': 'Image 6',
        //       'desc': 'this is image 6 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/150x150'
        //     },
        //     {
        //       'name': '7.png',
        //       'title': 'Image 7',
        //       'desc': 'this is image 7 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/150x150'
        //     },
        //     {
        //       'name': '8.png',
        //       'title': 'Image 8',
        //       'desc': 'this is image 8 and it is a sample image uploaded by noone.',
        //       'link': 'http://placehold.it/150x150'
        //     },
        //     ];
               
            ctrl.expand = function(ev,currentimage) {
                $mdDialog.show({
                    controller: expandDialogController,
                    templateUrl: expandedview,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen, // Only for -xs, -sm breakpoints.
                    locals: {
                        currentimage: currentimage
                    }
                })
                .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
            };

            function expandDialogController($scope, $mdDialog, currentimage) {

                $scope.image = currentimage;
                $scope.name = currentimage.name;
                $scope.title = currentimage.title;
                $scope.desc = currentimage.desc;
                $scope.url = currentimage.url;


                console.log($scope.url);

                $scope.hide = function() {
                  $mdDialog.hide();
                };

                $scope.cancel = function() {
                  $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                  $mdDialog.hide(answer);
                };
            }

            ctrl.addNew = function(ev) {
                $mdDialog.show({
                    controller: addNewDialogController,
                    templateUrl: addNewView,
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose:true,
                    fullscreen: $scope.customFullscreen,
                    locals: {
                        candidateid: ctrl.candidateid
                    } // Only for -xs, -sm breakpoints.
                    
                })
                .then(function(answer) {
                  $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                  $scope.status = 'You cancelled the dialog.';
                });
            };

            function addNewDialogController($scope, $mdDialog, candidateid) {

                $scope.title = '';
                $scope.desc = '';


                console.log($scope.title);
                console.log($scope.desc);
                let cid = candidateid;
                let title = $scope.title; 
                let desc = $scope.desc; 
                // $scope.url = currentimage.link;

                $scope.uploadFiles = function (files) {
                    let Files = files;


                if (files && files.length > 0) {
                    angular.forEach(Files, function (file, key) {
                        sectionprofilegalleryservice.Upload(file).then(function (result) {
                            // Mark as success
                            file.Success = true;
                            let url = result.Location;
                            console.log('newPicURL: '+ url);
                            // ctrl.data.profilepic = newPicURL;
                            sectionprofilegalleryservice.uploadGallery(cid,$scope.title,$scope.desc,url);
                            
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

                $scope.hide = function() {
                  $mdDialog.hide();
                };

                $scope.cancel = function() {
                  $mdDialog.cancel();
                };

                $scope.answer = function(answer) {
                  $mdDialog.hide(answer);
                };
            }
        //     datagenerate.getjson("section",lang).then(function(result) {
        //         if($rootElement.attr('ng-app')=="samarth")
        //     {
        //         ctrl.languagedata = result;
        //     }


        //         ctrl.items = result;
        //     });
        //     //end datagenerate
        // }

        // function getItem(key) {
        //     // return localStorageService.get(key);
        // }
        // ctrl.loadLangData("English");

        // $http({
        //     method: "GET",
        //     name: '/personalinfo/' + ctrl.candidateid
        // }).then(function successCallback(response) {
        //     ctrl.personalInfo = response.data[0];

        // }, function errorCallback(response) {
        //     console.log('Error in personal info');
        // }); 
        // ctrl.value = false;
        // ctrl.value1 = true; 

        // ctrl.toggle = function() {

        //     ctrl.value = !(ctrl.value) ? true : false;
        //     ctrl.value1 = !(ctrl.value1) ? true : false;
        //     console.log('toggle', ctrl.value);

        // };

        // ctrl.status = '  ';
        // ctrl.customFullscreen = false;
        // ctrl.showAdvanced = function(ev, personalInfo, title) {
        //     console.log("Current Script path ", currentScriptPath);
        //     $mdDialog.show({
        //             controller: dialogCtrl,
        //             templatename: personalinfopath,
        //             parent: angular.element(document.body),
        //             targetEvent: ev,
        //             clickOutsideToClose: true,
        //             locals: {
        //                 val: personalInfo,
        //                 header: title
        //             },
        //             fullscreen: ctrl.customFullscreen // Only for -xs, -sm breakpoints.
        //         })
        //         .then(function(answer) {
        //             ctrl.status = 'You said the information was "' + answer + '".';
        //         }, function() {
        //             ctrl.status = 'You cancelled the dialog.';
        //         });
        // };

        // function dialogCtrl($scope, $mdDialog, val, header) {
        //     $scope.personalObject = val;

        //     $scope.header = header;
        //     $scope.hide = function() {
        //         $mdDialog.hide();
        //     };
        //     $scope.cancel = function() {
        //         $mdDialog.cancel();
        //     };
        //     $scope.save = function(personalinfoObject, header) {
        //         let personalinfoObj = {
        //             personalInfo: {
        //                 name: personalinfoObject.name,
        //                 adharcard: personalinfoObject.adharcard,
        //                 dob: personalinfoObject.dob,
        //                 gender: personalinfoObject.gender,
        //                 maritialstatus: personalinfoObject.maritialstatus,
        //                 location: personalinfoObject.location,
        //                 mothertongue: personalinfoObject.mothertongue,
        //                 email: personalinfoObject.email,
        //                 contact: personalinfoObject.contact,
        //                 address: personalinfoObject.address,
        //                 pincode: personalinfoObject.pincode
        //             }
        //         };

        //         if (header === 'Edit Info') {
        //             $http({
        //                 method: 'POST',
        //                 name: '/personalinfo/' + personalinfoObject.contact,
        //                 data: personalinfoObj

        //             }).then(function mySucces(response)  {

        //             }, function myError(response) {
        //                 console.log(response);
        //             });
        //         }
        //         $mdDialog.hide();
        //     };
        // }
    }
})();

