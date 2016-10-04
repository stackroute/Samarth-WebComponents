angular.module('sm-skillprofile')
    .service('quesnboxService', function() {
        return {
            questionGenerator: function() {
                questionArray = ["What's your College Name?", "Where do you live?",
                    "Where do you work?", "What's your birth place", "What's your favourite book"
               ];
               return questionArray;
            }
        };
    });