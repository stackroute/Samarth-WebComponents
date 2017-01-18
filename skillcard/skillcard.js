(function() {
        let scripts = document.getElementsByTagName('script');
        let currentScriptPath = scripts[scripts.length - 1].src;

        angular.module('samarth-webcomponents')        
            .component('mySkillcard',   {
                templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                    '/')) + '/templates/skillcard.html',
                            controller: skillcardCtrl,
                bindings: {
                    candidateid: '<',
                    showheader: '<',
                    picsize: '@?',
                    contentsize : '@?',
                    data: "=?"
                },
                transclude: {
                    cardactions: 'cardactions',
                    badges: 'badges',
                    buttons: 'buttons'
                }
        });

        function skillcardCtrl($window, $timeout, $mdDialog, Upload, skillcardService, $rootScope, $state, $http) {
            let ctrl = this;
            let name;
            console.log("entered in to controller of skillcard");

            console.log($rootScope);
            if($rootScope.pre=="dashboard")
            {
                ctrl.view="View Detail";
                ctrl.action="Suggest";
            }
            if($rootScope.pre=="jobsearch")
            {
                ctrl.view="View Detail";
                ctrl.action="Apply";
            }
            if($rootScope.pre=="jobprofile")
            {
                ctrl.view="approve";
                ctrl.action="Reject";
            }

            
            
            $rootScope.$on('$stateChangeStart', function(event, toState,previousState, toParams, fromState) {
                console.log("pre"+$rootScope.pre);
                console.log(fromState.name);
                console.log(toState.name);
                });

            let showEditForm = false ;
            let newPicURL = '';
            let candidateID = this.candidateid; 

            closeEditForm = function () {
                /* body... */
                this.showEditForm =false;
            }

            this.uploadFiles = function (files) {
                this.Files = files;

                // async.series([
                //     function(done) {
                //         console.log('ConnectAWS function')
                //         done()
                //     },
                //       function() {
                //         console.log('second thing')
                        
                //         // done(new Error('another thing'))
                //       }

                // ])
                // this.amazonBucket = [];
                // skillcardService.ConnectAWS().then(function (result) {
                //     /* body... */
                //     // amazonBucket = result;
                //     console.log('Connected to storage server!!!');
                // }, function (error) {
                //     /* body... */
                //     console.log('Error while connecting to storage server!!!');
                // });

                if (files && files.length > 0) {
                    angular.forEach(this.Files, function (file, key) {
                        skillcardService.Upload(file).then(function (result) {
                            // Mark as success
                            file.Success = true;
                            newPicURL = result.Location;
                            console.log('newPicURL: '+ newPicURL);
                            skillcardService.uploadPicUrl(newPicURL,candidateID);
                            closeEditForm();
                        }, function (error) {
                            // Mark the error
                            this.Error = error;
                            this.showEditForm =false;
                            alert('some error occured while uploading the pic, Please try after sometime!');

                        }, function (progress) {
                            // Write the progress as a percentage
                            file.Progress = (progress.loaded / progress.total) * 100
                        });
                    });
                }
            }

            this.edit = function(){
                // console.log("newURl ---->",newUrl);
                if(this.showEditForm){

                    // skillcardService.uploadPicUrl(newUrl,this.candidateid);
                    // ctrl.data.profilepic = newUrl;
                    console.log("upload form open");

                    this.showEditForm =false;
                }else{
                    this.showEditForm = true;
                    console.log(this.showEditForm);
                }
            }

            if(!this.picsize) {
                this.picsize = 'default';
            }
            if(!this.contentsize) {
                this.content = 'default';
            }

            skillcardService.getskillcarddata(this.candidateid).then(function(result) {
                ctrl.data = result;
                console.log("canduidate id =" , ctrl.candidateid);
                $http({
                    method: 'GET',
                    url: '/jobpreferences/' + ctrl.candidateid
                }).then(function successCallback(response) {
                    console.log('entered into  response of factory of skill card', response)
                    // console.log(response.data[0].preferences.looking_jobs);
                    if(response.data[0] === undefined)
                    {
                        console.log("entered into if loop");
                        ctrl.data.looking_jobs = "No"   
                    }
                    else{
                        ctrl.data.looking_jobs = response.data[0].preferences.looking_jobs;
                    }
                    }, function errorCallback(response) {
                        console.log('Error occurred during preferences');
                    });
            });

            function createDownloadUrl() {
                name = ctrl.data.name + '.png';
                ctrl.data1 = ctrl.data;
                ctrl.downloaddata = JSON.stringify(ctrl.data1);

                blob = new Blob([ctrl.downloaddata], {
                        type: 'text/plain'
                    }),
                    url = $window.URL || $window.webkitURL;
                ctrl.fileUrl = url.createObjectURL(blob);
            }
            let getCanvas;
            $timeout(createDownloadUrl, 1000);

            ctrl.render = function(ev) {

                // html2canvas(document.getElementById('totalcardarea').innerHTML, {
                //     useCORS: true,
                //     onrendered: function (canvas) {
                //     var imgval = canvas.toDataURL("image/png");
                //     // document.getElementById("HiddenField1").value = dataUrl;
                //                      imgval = imgval.Replace("data:image/png;base64,", "");
                //     byte[] imgData = Convert.FromBase64String(imgval);

                //     using (System.Drawing.Image image = System.Drawing.Image.FromStream(new MemoryStream(imgData)))
                //     {
                //         String path = Server.MapPath("~/imgFolder");
                //          image.Save(path + "\\output.jpg", ImageFormat.Jpeg);  // Or Png

                //     }
                //     }
                // });
                let card = document.querySelector('#totalcardarea');
                console.log(card);
                
                // let card = angular.element(document.querySelector('#totalcardarea'));
                // let card = document.getElementById('totalcardarea').innerHTML;
                html2canvas(card, { allowTaint: true,
                    useCORS: true,
                    logging: true,
                    onrendered: function(canvas) {
                        // getCanvas = canvas;
                        // card.appendChild(getCanvas);
                        // ctrl.downloadcard(canvas);
                        // ctrl.showConfirm(ev);
                        // var myImage = canvas.toDataURL("image/png");
                        // window.open(canvas.toDataURL("image/jpeg"));

                        let anchor = angular.element(document.querySelector('#download'));
                        var imgageData = canvas.toDataURL("image/png");
                        var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
                        anchor.attr("download", "your_pic_name.png").attr("href", newData);
                    }
                    });
                    
                // });
            };

            ctrl.downloadcard = function(card) {
                let imgageData = card.toDataURL('image/png');
                console.log(imgageData);
                // let newData = imgageData.replace(/^data:image\/png/,
                //     'data:application/octet-stream');
                // console.log(newData);
                // let dwld = angular.element(document.querySelector('#download'));
                // console.log(dwld);
                dwld.attr('download', name).attr('href', imgageData);
            };
        }
})();