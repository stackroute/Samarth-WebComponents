var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('samarth-webcomponents')        .component('mySkillcard',          {            
    templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
        '/')) + '/templates/skillcard.html',
                controller: skillcardctrl,
    bindings: {
        data: "="
    },
    transclude: true             
});

function skillcardctrl($window, $timeout)            {
    var ctrl = this;

    function createDownloadUrl() {

        ctrl.data1 = ctrl.data;
        console.log("download " + ctrl.data);             
        ctrl.downloaddata = JSON.stringify(ctrl.data1);

        blob = new Blob([ctrl.downloaddata], {
                type: 'text/plain'
            }),
            url = $window.URL || $window.webkitURL;
        ctrl.fileUrl = url.createObjectURL(blob);
    }
    $timeout(createDownloadUrl, 1000);

                
}        

           
