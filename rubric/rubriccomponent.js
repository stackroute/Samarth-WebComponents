(function() {

    'use strict';
    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length - 1].src;
    angular.module('samarth-webcomponents')
        .component('smVerificationRubric', {
            bindings: {
                brand: '<',
                data: '=',
                outcome: '='

            },
            templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
                '/')) + '/template/rubric.html',
            controller: rubricCtrl
        });

    function rubricCtrl() {

        console.log(this.brand);
        console.log(this.data);
        if (this.data == 'Candidate') {

            this.description = [{
                name: "Education Details",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid education details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'edu'



            }, {
                name: "Personal Details",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid personal details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'pd'


            }, {
                name: "Experience Details",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid experience details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'ed'


            }, {
                name: "Skill Details",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid skill details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'sd'



            }];
        } else {
            this.description = [{
                name: "Job Description",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid job details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'jd'



            }, {
                name: "Required Skills",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid required skill details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'rs'



            }, {
                name: "Required Experience",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid required experience details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 're'


            }, {
                name: "Salary Details",
                columns: [
                    { title: 'invalid', desc: 'The profile is invalid due to invalid salary details', value: 1 },
                    { title: 'valid', desc: "The profile is valid and proper", value: 2 },
                    { title: 'wrong', desc: "Wrong description given", value: 3 },
                    { title: 'satisfactory', desc: "Looks like a good satisfactory profile", value: 4 }

                ],
                model: 'sal'


            }];
        }





        this.headers = ['Invalid', 'Valid', 'Wrong', 'Satisfactory', 'Grade'];
        // this.domains = ['Education Details', 'Personal Details', 'Experience Details', 'Skill Details'];



        this.average = function(desc) {
            var sum = 0;
            angular.forEach(desc, function(value, key) {


                sum = sum + parseInt(value.model);
                //console.log(sum);
            });
            var len = desc.length;

            this.outcome = (sum / len);
            console.log(this.outcome);


        }



    }



})();
