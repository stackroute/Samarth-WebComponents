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

        function skillcardCtrl($window, $timeout, $mdDialog, skillcardService, $rootScope, $state, $http) {
            let ctrl = this;
            let name= '';
            ctrl.downloadCard = true;
            ctrl.data = {};
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
            let hideEditForm = true ;
            let newPicURL = '';
            let candidateID = this.candidateid; 

            // closeEditForm = function () {
            //      body... 
            //     this.showEditForm =false;
            // }


            this.cancelUpload = function (){
                console.log(this.showEditForm);
                this.showEditForm = false;
            }



            this.uploadFiles = function (files) {
                this.Files = files;


                if (files && files.length > 0) {
                    angular.forEach(this.Files, function (file, key) {
                        skillcardService.Upload(file).then(function (result) {
                            // Mark as success
                            file.Success = true;
                            newPicURL = result.Location;
                            console.log('newPicURL: '+ newPicURL);
                            ctrl.data.profilepic = newPicURL;
                            skillcardService.uploadPicUrl(newPicURL,candidateID);
                            ctrl.showEditForm = false;
                            ctrl.hideEditForm = true;
                        }, function (error) {
                            // Mark the error
                            this.Error = error;
                            ctrl.showEditForm =true;
                            ctrl.hideEditForm = false;
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
                // if(this.showEditForm){

                //     // skillcardService.uploadPicUrl(newUrl,this.candidateid);
                //     // ctrl.data.profilepic = newUrl;
                //     console.log("upload form open");

                //     this.showEditForm =false;
                // }else{
                    ctrl.showEditForm = true;
                    // console.log(this.showEditForm);
                    ctrl.hideEditForm = false;
                // }
            }

            if(!this.picsize) {
                this.picsize = 'default';
            }
            if(!this.contentsize) {
                this.content = 'default';
            }

            skillcardService.getskillcarddata(this.candidateid).then(function(result) {
                ctrl.data = result;
                // console.log(result);
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
                if(ctrl.data != undefined){
                name = ctrl.data.name + '.png';
                ctrl.data1 = ctrl.data;
                ctrl.downloaddata = JSON.stringify(ctrl.data1);

                blob = new Blob([ctrl.downloaddata], {
                        type: 'text/plain'
                    }),
                    url = $window.URL || $window.webkitURL;
                ctrl.fileUrl = url.createObjectURL(blob);
            }
            }
            let getCanvas;
            $timeout(createDownloadUrl, 1000);

 ctrl.render = function() {

                // var lines = '<div id="downloadCard" layout="row" flex="70" class="dontShow"> \
                //                 <div flex="35" layout="column">\
                //                     <b>{{$ctrl.data.name}}</b>\
                //                     <b>{{$ctrl.data.profession}} ({{$ctrl.data.designation}})</b>\
                //                     <b>DOB: {{$ctrl.data.dob}} ({{$ctrl.data.age}} yrs)</b>\
                //                     <b>Email: {{$ctrl.data.email}}</b> <b>Phone: {{$ctrl.data.contact}}</b>\
                //                     <b>Location: {{$ctrl.data.location}}</b> <b>Skills:</b><i ng-repeat="skill in $ctrl.data.skills">{{skill.skillname}}</i>\
                //                 </div>\
                //                 <div flex="35" layout="column">\
                //                     <img crossOrigin="anonymous" class="pic_circle_small" ng-src="{{$ctrl.data.profilepic}}">\
                //                 </div>\
                //             </div>'

                let card = document.querySelector('#totalcardarea');
                console.log(card);
                
                
                html2canvas(card, { allowTaint: false,
                    useCORS: true,
                    logging: true,
                    // height: 400,
                    // width: 300,
                    background: "#0b61ea",
                    proxy: "https://samarthuploads.s3.ap-south-1.amazonaws.com/",
                    onrendered: function(canvas) {
                        // var extra_canvas = document.createElement("canvas");
                        // // extra_canvas.setAttribute('width',40);
                        // // extra_canvas.setAttribute('height',30);
                        // var ctx = extra_canvas.getContext('2d');
                        // ctx.drawImage(canvas,0,0,canvas.width, canvas.height,0,0,400,300);
                // var dataURL = extra_canvas.toDataURL();
                // var img = $(document.createElement('img'));
                // img.attr('src', dataURL);
                // // insert the thumbnail at the top of the page
                // $('body').prepend(img);

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