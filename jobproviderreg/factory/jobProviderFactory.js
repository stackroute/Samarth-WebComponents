(function() {
    'use strict'
    angular
        .module("samarth-webcomponents")
        .factory('jobproviderfactory', jobproviderfactory);

    function jobproviderfactory($http,$q) {
        var service = {
            Upload: Upload,
            jobproviderdata: jobproviderdata,
            jpCodeCheck: jpCodeCheck,
            getJobProviderbyid: getJobProviderbyid,
            updatejobprovider: updatejobprovider
        };
        return service;

        function Upload(file){
            var deferred = $q.defer();
             return $http({
                    method: 'GET',
                    url: '/employer/aws'
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
        }

        function jpCodeCheck(jpCode) {
            // console.log(jpCode);
            return $http({
                method: 'GET',
                url: '/employer/codeCheck/' + jpCode
            })

        }

        function getJobProviderbyid(job) {
            return $http({
                method: 'GET',
                url: '/employer/getJobProviderbyid/' + job,
                data: job

            })

        }

        function updatejobprovider(job) {
            return $http({
                method: 'PATCH',
                url: '/employer/jobupdate',
                data: job

            })

        }

        function jobproviderdata(data) {
            return $http({
                method: 'POST',
                url: '/employer/registeremployer',
                data: data
            })

        }
    }
})();
