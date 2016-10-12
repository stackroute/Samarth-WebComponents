(function() {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('samarth-webcomponents')
        .component('sectionRubric', {
            bindings: {
                brand: '<'

            },
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/template/rubric.html',
            controller: rubricCtrl
        });

    function rubricCtrl() {

        this.descriptions = [{
            name: "Education Details",
            invalid: "The profile is invalid due to invalid education details",
            valid: "The profile is valid and proper",
            wrong: "Wrong description given",
            satisfactory: "Looks like a good satisfactory profile",
            invalidvalue: 1,
            validvalue: 2,
            wrongvalue: 3,
            satisfactoryvalue: 4,
            model: 'e'

        }, {
            name: "Personal Details",
            invalid: "The profile is invalid due to invalid personal details",
            valid: "The profile is valid and proper",
            wrong: "Wrong description given",
            satisfactory: "Looks like a good satisfactory profile",
            invalidvalue: 1,
            validvalue: 2,
            wrongvalue: 3,
            satisfactoryvalue: 4,
            model: 'p'
        }, {
            name: "Experience Details",
            invalid: "The profile is invalid due to invalid experience details",
            valid: "The profile is valid and proper",
            wrong: "Wrong description given",
            satisfactory: "Looks like a good satisfactory profile",
            invalidvalue: 1,
            validvalue: 2,
            wrongvalue: 3,
            satisfactoryvalue: 4,
            model: 'ex'
        }, {
            name: "Skill Details",
            invalid: "The profile is invalid due to invalid skill details",
            valid: "The profile is valid and proper",
            wrong: "Wrong description given",
            satisfactory: "Looks like a good satisfactory profile",
            invalidvalue: 1,
            validvalue: 2,
            wrongvalue: 3,
            satisfactoryvalue: 4,
            model: 'sk'
        }];




        this.headers = ['Invalid', 'Valid', 'Wrong', 'Satisfactory', 'Grade'];
        // this.domains = ['Education Details', 'Personal Details', 'Experience Details', 'Skill Details'];



        this.average = function(desc) {
            var sum = 0;
            angular.forEach(desc, function(value, key) {


                sum = sum + parseInt(value.model);
                console.log(sum);
            });
            var len = desc.length;

            this.avg = (sum / len);
            console.log(this.avg);


        }



    }



})();
