angular.module('samarth-webcomponents')
    .service('skillcardService', function($http, $filter, $rootScope,$q) {
        // AWS.config.region = 'ap-south-1';
        // AWS.config.update({ accessKeyId: 'AKIAIEJFMACVX4TI2O5A', secretAccessKey: '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' });

        // var bucket = new AWS.S3({ params: { Bucket: 'samarthuploads', maxRetries: 10 }, httpOptions: { timeout: 360000 } });
        //         console.log(bucket);
        // let awsBucket= {};
        // awsBucket = bucket;
        // console.log(awsBucket);

        this.Progress = 0;

        return {
            getskillcarddata: function(candidateid) {
                let skillcarddata = {};
                return $http({
                    method: 'get',
                    url: '/skillcard/' + candidateid

                }).then(function mySucces(response)  {
                    let object = response.data.result;

                    if (object.personalinfo[0].name != undefined) {
                        skillcarddata.name = object.personalinfo[0].name;
                    }
                    if (object.personalinfo[0].dob != undefined) {
                        skillcarddata.dob = $filter('date')(object.personalinfo[
                            0].dob, 'dd/MMM/yyyy');
                        skillcarddata.age = (new Date()).getFullYear() - $filter(
                            'date')(object.personalinfo[0].dob, 'yyyy');
                    }
                    if (object.personalinfo[0].gender != undefined) {
                        skillcarddata.gender = object.personalinfo[0].gender;
                    }
                    if (object.personalinfo[0].maritialstatus != undefined) {
                        skillcarddata.maritalstatus = object.personalinfo[0].maritialstatus;
                    }
                    if (object.personalinfo[0].contact != undefined) {
                        skillcarddata.contact = object.personalinfo[0].contact;
                    }
                    if (object.personalinfo[0].email != undefined) {
                        skillcarddata.email = object.personalinfo[0].email;
                    }

                    if (object.workexp[0].workexperience.length > 0) {
                        skillcarddata.location = object.workexp[0].workexperience[
                            0].Location;
                    }
                    if (object.personalinfo[0].location != undefined) {
                        skillcarddata['location'] = object.personalinfo[0].location;
                    }
                    if (object.workexp[0].workexperience.length > 0) {
                        skillcarddata.designation = object.workexp[0].workexperience[
                            0].designation;
                    }

                    if (object.skill[0].skills.length > 0) {
                        skillcarddata.skills = object.skill[0].skills;
                    }
                    if (object.personalinfo[0].profilepic.length > 0) {
                        skillcarddata.profilepic = object.personalinfo[0].profilepic;
                    }
                    if (object.profile[0].profession.length > 0) {
                        skillcarddata.profession = object.profile[0].profession;
                    }
                    // skillcarddata['name']=object.personalinfo[0].name;
                    return skillcarddata;
                }, function myError(response) {
                    console.log('error in getting skillcard details');
                });
            },

            // ConnectAWS: function () {
            //     /* body... */
            //     return $http({
            //         method: 'GET',
            //         url: '/skillcard/aws'
            //         // data: {profilepicUrl:newUrl}
            //     }).then(function successCallback(response) {
            //         console.log("Connecting to storage server!!!!");
            //         console.log(response);
            //         let awsBucket = response.data;
            //         console.log('from input function: '+awsBucket.region);
            //         return response;
            //     }, function errorCallback(err) {
            //         console.log('Error connecting to storage server!!!!');
            //         return err;
            //     });  

            // },

            Upload: function (file) {
                
               return $http({
                    method: 'GET',
                    url: '/skillcard/aws'
                    // data: {profilepicUrl:newUrl}
                }).then(function successCallback(response) {
                    console.log("Connecting to storage server!!!!");
                    console.log(response);
                    let awsBucket = response.data;
                    console.log('from input function: '+awsBucket.region);
                     // ConnectAWS();
                AWS.config.region = awsBucket.region;
                AWS.config.update({ accessKeyId: awsBucket.accessKeyId, secretAccessKey: awsBucket.secretAccessKey });

                var bucket = new AWS.S3({ params: { Bucket: awsBucket.Bucket, maxRetries: 10 }, httpOptions: { timeout: 360000 } });
                console.log(bucket);
                var deferred = $q.defer();
                var params = { Bucket: awsBucket.Bucket, Key: file.name, ContentType: file.type, Body: file };
                var options = {
                    // Part Size of 10mb
                    partSize: 10 * 1024 * 1024,
                    queueSize: 1,
                    // Give the owner of the bucket full control
                    ACL: 'bucket-owner-full-control'
                };
                var uploader = bucket.upload(params, options, function (err, data) {
                    if (err) {
                        deferred.reject(err);
                    }
                    console.log(data);
                    deferred.resolve(data);
                });
                uploader.on('httpUploadProgress', function (event) {
                    deferred.notify(event);
                });

                return deferred.promise;
                    // return response;
                }, function errorCallback(err) {
                    console.log('Error connecting to storage server!!!!');
                    return err
                });  
               
            },//end Upload()
            uploadPicUrl: function(newUrl,candidateid){
                console.log("inside service");
                return $http({
                    method: 'POST',
                    url: 'personalinfo/' + candidateid + '/' +"profilepic/",
                    data: {profilepicUrl:newUrl}
                }).then(function successCallback(response) {
                    console.log("Updating newPicURL in Database");
                    return response;
                }, function errorCallback(err) {
                    console.log('Error accord during Project Section')
                    return err;
                });  
            }//end uploadPicUrl()

        };
    });