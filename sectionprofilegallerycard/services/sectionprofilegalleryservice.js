angular.module('samarth-webcomponents')
   .service('sectionprofilegalleryservice', function($http, $filter, $rootScope,$q) {
        

       

        return {


            getGallery: function(candidateid) {
                // let skillcarddata = {};
                return $http({
                    method: 'get',
                    url: '/profilegallery/' + candidateid

                }).then(function mySucces(response)  {
                    if(response.data[0] !== undefined){
                    let object = response.data[0].gallery;
                     return object;
                  }
                   
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
                    // console.log("Connecting to storage server!!!!");
                    // console.log(response);
                    let awsBucket = response.data;
                    // console.log('from input function: '+awsBucket.region);
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
                
                return $http({
                    method: 'POST',
                    url: '/profilegallery/' + candidateid ,
                    data: {
                    	URL:imgurl,
                    	CANDIDATEID: candidateid,
                    	TITLE: imgtitle,
                    	DESC: imgdesc
                    }
                }) 
            },//end uploadPicUrl()

            removeImage: function(candidateid,imageTitle){
                return $http({
                    method: 'DELETE',
                    url: '/profilegallery/' + candidateid + '/' + imageTitle
                    
                }) 
            }
        }
    });




  
