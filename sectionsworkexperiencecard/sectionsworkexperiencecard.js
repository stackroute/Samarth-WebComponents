var app = angular
    .module('sm-skillprofile')
    .component('myWorkexperiencecard', {
        templateUrl: '/webcomponents/sectionsworkexperiencecard/templates/sectionsworkexperiencecard.html',
        controller: workexperienceCardController

    });

function workexperienceCardController($http, $mdDialog) {
    var ctrl = this;
    ctrl.workexperiance = {};
    $http.get('api/profiles/01').then(function success(response) {
        for (var prop in response.data) {
            if (prop=="Work Experiance"){ 
                ctrl.workexperiance[prop] = response.data[prop];

            }

        }
        for(var prop in ctrl.workexperiance){
            for(var key in ctrl.workexperiance[prop]){

            }

        }
        console.log("workexp", ctrl.workexperiance);
    })
    
}
