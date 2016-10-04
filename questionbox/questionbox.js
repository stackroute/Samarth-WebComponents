


angular.module('sm-skillprofile')
    .component('myQuestionbox',{             
        templateUrl: 'webcomponents/questionbox/templates/questionbox.html',
        controller: questionBoxCtrl          
});

function questionBoxCtrl($timeout, quesnboxService) {
    var ctrl = this;
        ctrl.showMaxBtn=false;
    ctrl.showInputBox=function(){
       ctrl.displayInputBox = false;
    }
     
    ctrl.startInpuBox = function() {
        $timeout(ctrl.showInputBox, 5000);
    }

    ctrl.questionArray = quesnboxService.questionGenerator();
    ctrl.displayInputBox = true;
    ctrl.displayAnswerdBox = false;
    ctrl.currentQuestionIndex = 0;
    ctrl.nextQuestionIndex = 0;
    ctrl.val = 0;
    ctrl.clear = '';

    ctrl.increaseIndex = function() {
        if (ctrl.clear=='') {
                alert('Please Enter');
        }
        else
        {
           ctrl.clear = '';
        ctrl.currentQuestionIndex = ctrl.currentQuestionIndex + 1;
        ctrl.val = Math.floor((ctrl.currentQuestionIndex / ctrl.questionArray.length) * 100);
        if (ctrl.currentQuestionIndex == ctrl.questionArray.length) {
            $timeout(ctrl.hideQuestionBox, 300);
        }
        }
    }
    ctrl.hideQuestionBox = function() {
        ctrl.displayInputBox = true;
        ctrl.displayAnswerdBox = true;
        $timeout(ctrl.showQuestionBox, 3000);
    }
     ctrl.minimizeQuestionBox = function() {
        ctrl.displayInputBox = true;
        ctrl.showMaxBtn=true;

    }
    ctrl.showQuestionBox = function() {
        ctrl.currentQuestionIndex = 0;
        ctrl.val = 0;
        ctrl.displayInputBox = false;
        ctrl.displayAnswerdBox = false;
    }                

}



