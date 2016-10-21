var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-webcomponents')
    .component('verificationBadge', {
        templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
            '/')) + '/templates/badge.html',
        controller: badgeCtrl,
        bindings: {
            candidateid: '<'
        }
    });

function badgeCtrl(verificationbadgeService) {
    var ctrl = this;
    ctrl.arr = [];
    verificationbadgeService.getbadgedata(ctrl.candidateid)
        .then(function(res) {
                ctrl.verification_status = res.data[0].verification_status;
                ctrl.verification_ratings = res.data[0].verification_ratings;
                var i = parseInt(ctrl.verification_ratings);

                for (var a = 0; a < i; a++) {

                    ctrl.arr.push(a);


                }
                console.log(ctrl.arr);


                ctrl.updated_on = res.data[0].updated_on;
                ctrl.a = new
                Date(ctrl.updated_on);
                console.log(ctrl.a);
            },
            function(err) {

            });



}
