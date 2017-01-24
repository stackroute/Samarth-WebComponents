angular.module('samarth-webcomponents')
   .service('sectionprofilegalleryservice', function($http, $filter, $rootScope,$q) {
        

       

        return {


            getGallery: function(candidateid) {
                // let skillcarddata = {};
                return $http({
                    method: 'get',
                    url: '/profilegallery/' + candidateid

                }).then(function mySucces(response)  {
                    console.log(response);
                    let object = response.data[0].gallery;
                    console.log('reached service of profilegallery');
                    console.log(object);
                    return object;
                }, function myError(response) {
                    console.log('error in getting skillcard details');
                });
            },

        	Upload: function (file) {
                
               return $http({
                    method: 'GET',
                    url: '/profilegallery/aws'
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
                var params = { Bucket: 'samarthuploads', Key: file.name, ContentType: file.type, Body: file };
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

            uploadGallery: function(candidateid,imgtitle,imgdesc,imgurl){
                console.log("inside Uploadgallery function");
                console.log(imgtitle,imgdesc);
                return $http({
                    method: 'POST',
                    url: '/profilegallery/' + candidateid ,
                    data: {
                    	URL:imgurl,
                    	CANDIDATEID: candidateid,
                    	TITLE: imgtitle,
                    	DESC: imgdesc
                    }
                }).then(function successCallback(response) {
                    console.log("Updating newPic in Profile Gallery schema");
                    return response;
                }, function errorCallback(err) {
                    console.log('Error occured during adding pic to Profile Gallery!!!!!!!')
                    return err;
                });  
            }//end uploadPicUrl()
        }
    });




  
