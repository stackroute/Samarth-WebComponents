angular.module('sm-skillprofile')
    .component('myPersonalinfocard', {
        templateUrl: '/webcomponents/sectionpersonalinfocard/templates/sectionpersonalinfocard.html',
        controller: personalinfoCardController
    });

function personalinfoCardController($http) {
    var ctrl = this;

    // ctrl.name='Afrin';
    //   ctrl.age=22;
    //   ctrl.dob='22/4/99';
    //   ctrl.matstatus='unmarried';
    //   ctrl.contact=9978674543;
    //   ctrl.email='afrin@gmail.com';
    //   ctrl.address='7th block, koramangala,bangalore';
    //   ctrl.pin=571342;
    ctrl.personal = {};
    $http({
        method: "GET",
        url: 'api/profiles/01'
    }).then(function successCallback(response) {
        for (var prop in response.data)  {
            if (prop=="Personalinfo" ) { 
                ctrl.personal[prop] = response.data[prop]; 
              
            }
        }
    }, function errorCallback(response) {
        console.log('Error ');
    });  

    // }).success(function(response) {
    //     ctrl.details = response[0];
    //     console.log(response[0]);
    // });

    ctrl.save = function() {

    };
}
