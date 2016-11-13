(function() {
    'use strict';

    let scripts = document.getElementsByTagName('script');
    let currentScriptPath = scripts[scripts.length - 1].src;

 //   var path = currentScriptPath.substring(0, currentScriptPath.lastIndexOf('/')) + '/template/notification.html';  //wave 9

    angular.module('samarth-webcomponents')
        .component('smVerificationRubric', {
            bindings: {
                name: '<',
                outcome: '=',
                remarks: '='

            },
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/template/rubric.html',
            controller: rubricCtrl
        });


    function rubricCtrl(rubricservice, $scope) {
        let ctrl = this;

        ctrl.description = [];
        ctrl.desc = {};
        ctrl.outcome = 0;
        ctrl.remarks = '';

        rubricservice.getrubricdata(ctrl.name)
            .then(function(response) {
                // console.log("inside rubricCtrl", response.data);
                ctrl.description.push(response.data);

                ctrl.desc = ctrl.description[0];

                ctrl.desc1 = ctrl.desc[0];
                ctrl.name = ctrl.desc1.type.name[0];   //wave 9

                // console.log(ctrl.desc1);
                // console.log(ctrl.desc1.scale);
            }, function(err) {
                console.log(err);
            });

        // console.log(ctrl.outcome);


        ctrl.average = function(desc) {
            angular.forEach(desc, function(value, key) {
                ctrl.outcome = parseInt(value.model);
            });

            ctrl.message = "Ratings Saved Successfully!";
            console.log(ctrl.outcome);
            console.log(ctrl.remarks);
        };
    }
}());
