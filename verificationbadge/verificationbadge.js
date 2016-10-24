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
                console.log("inside bad", res.data);
                ctrl.verification_status = "grade";
                ctrl.pval = res.data[0].Personal_Information.value;
                ctrl.sval = res.data[0].Skills.value;
                ctrl.qval = res.data[0].Qualification.value;
                ctrl.prval = res.data[0].Project.value;
                ctrl.wval = res.data[0].Work_History.value;

                ctrl.average = (ctrl.pval + ctrl.sval + ctrl.qval + ctrl.prval + ctrl.wval) / 5;
                //ctrl.verification_ratings = res.data[0].verification_ratings;
                console.log(ctrl.average);
                var i = parseInt(ctrl.average);

                for (var a = 0; a < i; a++) {

                    ctrl.arr.push(a);


                }
                //console.log(ctrl.arr);


                ctrl.updated_on = res.data[0].updated_on;
                ctrl.a = new
                Date(ctrl.updated_on);
                //console.log(ctrl.a);
            },
            function(err) {

            });



}
