angular.module('samarth-webcomponents')
    .service('jobCardService', ['$http', function($http) {
        /*Service for geting the job details with the id specified*/
        this.getJobByID = function(jobID, companyName) {
            return $http.get('http://localhost:8081/jobProfile/getjobDetail/' + jobID + "/" + companyName);
        }
    }]);
