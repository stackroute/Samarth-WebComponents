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
        // ctrl.personalInfo = {};
        


        sectionprofilegalleryservice.getGallery(this.candidateid).then(function(result) {
                ctrl.data = result;
                
                console.log('data in gallery controller ');
                console.log(ctrl.data);
                
            });

        $rootScope.$on("gallerydata", function() {
            ctrl.data = [];
            ctrl.totaldata = 0;

            $http.get('/profilegallery/' + ctrl.candidateid)
                .then(function success(response) {
                    for (var noofobj = 0; noofobj < response.data.length; noofobj++) {
                        for (var record = 0; record < response.data[noofobj].gallery
                            .length; record++) {
                            ctrl.data.push(response.data[noofobj].gallery[
                                record]);
                        }
                        ctrl.totaldata = ctrl.data.length;
                    }
                }, function error(response) {
                    console.log("error occored ", response);
                });

        })

         //--------- confirm gallery-image delete function ---------------
        ctrl.showConfirm = function(ev,object) {
    
            var confirm = $mdDialog.confirm()
            .title('Would you like to delete the selected Image?')          
            .targetEvent(ev)
            .ok('YES!')
            .cancel('Not sure, maybe later!');

            $mdDialog.show(confirm).then(function() { //when user clicks on "YES"
                // console.log(object);
                // alert("inside confirm event of deletion function");
                let imageTitle = object.title;
                let imageName = object.filename;
                sectionprofilegalleryservice.Delete(ctrl.candidateid,imageName).then(function mySucces(response)  {
                            console.log('deleted gallery image successfully from aws!!!!');
                            // alert("the image has been deleted, refresh the page!!!!");
                            sectionprofilegalleryservice
                            .removeImage(ctrl.candidateid,imageTitle)
                            .then(function successCallback(response) {
                                console.log("Deleted from db!!!!", response);
                                
                            $rootScope.$emit('gallerydata', {});                            
                    }, function myError(response) {
                            console.log('error in deleting gallery image');
                    });
                $mdDialog.hide();
                }, function() { 
                    $mdDialog.hide();//Hide the prompt when user clicks CANCEL!
                });
            });
        }//end showConfirm

        
               
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
            }//end expand

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
            }//end expandDialogController

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
                .then(function(newUploadFile) {
                  console.log('You said the information was "', newUploadFile);
                   // ctrl.data.push(newUploadFile);
                }, function(err) {
                  console.log('You cancelled the dialog.', err);
                });
            }//end addNew

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
                        sectionprofilegalleryservice.Upload(file,cid).then(function (result) {
                            // Mark as success
                            file.Success = true;
                            let url = result.Location;
                            console.log('newPicURL: '+ url);
                            let fileName = file.name;
                            // ctrl.data.profilepic = newPicURL;
                            sectionprofilegalleryservice
                            .uploadGallery(cid,$scope.title,$scope.desc,url,fileName)
                            .then(function successCallback(response) {
                                console.log("Updating newPic in Profile Gallery schema ", response);
                                $mdDialog.hide(response.data);
                                $rootScope.$emit('gallerydata', {});
                            }, function errorCallback(err) {
                                console.log('Error occured during adding pic to Profile Gallery!!!!!!!')
                                $mdDialog.cancel(err);
                            });                         
                            
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
            

                $scope.hide = function() {
                  $mdDialog.hide();
                };

                $scope.cancel = function() {
                  $mdDialog.cancel();
                };
            }
     
    
        }// end addNewDialogController

 }
})();
