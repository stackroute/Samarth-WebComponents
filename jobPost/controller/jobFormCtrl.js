(function (){
 'use strict'
 angular
 .module('samarth-webcomponents')
 .controller('dialogController', dialogController);
 function dialogController ($scope, $mdDialog, professionFac, jobProfileFactory) 
 {
  $scope.skills=[{}];
  $scope.qualifications=[{}];
  $scope.tempLanguage=[{}];
  $scope.lang=[];
  $scope.showJobDesc = function(event,jobCtrl) {
    $mdDialog.show({
      clickOutsideToClose: true,
      scope: $scope,
      fullscreen: true,
      preserveScope: true,
      templateUrl: './samarth-webcomponents/jobPost/template/jobDescForm.html',
      controller: function dialogController($scope, $mdDialog, professionFac, jobProfileFactory)
      {
        $scope.expertise = [
          "Beginner",
          "Skilled",
          "Proficient",
          "Expert"
        ];
        $scope.priority = [
          "Mandatory",
          "Optional"
        ];

        $scope.selectedLanguage = [0];
        let lanIter = 0;
        let arr=[];

        console.log('hello',jobCtrl.data);
        if(jobCtrl.data.qualifications != undefined)
        {
          $scope.job=jobCtrl.job;
          $scope.skills=jobCtrl.job.skills;
          for(let j=0;j<jobCtrl.job.languages.length;j++)
          {
            console.log('length', jobCtrl.job.languages.length);

            if(j != 0)
            {
              $scope.selectedLanguage.push(j);
            }
            $scope.lang.push(jobCtrl.job.languages[j].name);
            $scope.tempLanguage.push(jobCtrl.job.languages);
            $scope.tempLanguage[j].speak = jobCtrl.job.languages[j].speak;
            $scope.tempLanguage[j].read = jobCtrl.job.languages[j].read;
            $scope.tempLanguage[j].write = jobCtrl.job.languages[j].write;
            lanIter = lanIter + 1;
          }
        }

        console.log(jobCtrl);
        $scope.addInput=addInput;                                    
        $scope.submitDescData=submitDescData;

        professionFac.profReq().then(function(data)
        {
          let temp = [];
          for(let i = 0; i < data.data.length; i = i + 1)
          {
            temp[i] = data.data[i].professions;
          }
          $scope.items = temp;
        // console.log($scope.items);
        });

        jobProfileFactory.languageReq().then(function(data)
        {
         let arr = [];
          console.log("language",data.data.length);
          for( let p = 0; p < data.data.length; p = p + 1)
          {
            arr.push(data.data[p].language);
          }
            $scope.language = arr;
        });

        function addInput() {
          $scope.skill={};
          $scope.skills.push($scope.skill);
        };

        
        // insert a language to the selected language
        function insertLang()
        {
          lanIter++;
          $scope.selectedLanguage.push(lanIter);
        };

        function removeLang()
        {
          if(lanIter != 0)
          $scope.selectedLanguage.pop();
          if(lanIter >= 1)
          lanIter--;
          console.log(lanIter);
        };

        $scope.insertLang = insertLang;
        $scope.removeLang = removeLang;

        function submitDescData()
        {
          console.log("ppppppppppppppppppppppppp");
          console.log(jobCtrl);
          jobCtrl.job={};
          jobCtrl.data={};
          console.log($scope.tempLanguage[0]);

            let count = 0;
            for(var i = 0; i <= lanIter; i = i + 1)
            { console.log("entered for loop");
              if($scope.tempLanguage[lanIter].speak === false && $scope.tempLanguage[lanIter].read === false && $scope.tempLanguage[lanIter].write === false)
              {
                $scope.hide=false;
                $scope.msg='Please fill the language details';
                $timeout(function () { $scope.hide = true; }, 3000);
                break;
              }
              else
              {
                count++;
              }
            }
            if(count === lanIter + 1)
            {
              for(var i = 0; i <= lanIter; i = i + 1)
              {
                var temp={};
                console.log($scope.lang[i]);
                temp.name=$scope.lang[i];
                if($scope.tempLanguage[i].speak === undefined)
                {
                  temp.speak = false;
                }
                else
                {
                  temp.speak=$scope.tempLanguage[i].speak;
                }
                if($scope.tempLanguage[i].read === undefined)
                {
                  temp.read = false;
                }
                else
                {
                  temp.read=$scope.tempLanguage[i].read;
                }
                if($scope.tempLanguage[i].write === undefined)
                {
                  temp.write = false;
                }
                else
                {
                  temp.write=$scope.tempLanguage[i].write;
                }
                // console.log(temp);
                arr.push(temp);
                // console.log(arr);
              }
          jobCtrl.job=$scope.job;

          jobCtrl.job.languages=arr;
          console.log(jobCtrl.job);

          jobCtrl.job.skills=$scope.skills;
          // jobCtrl.job.profession=$scope.items;
          console.log("in submitdesc");
          console.log(jobCtrl);
          jobCtrl.data.desc=jobCtrl.job;
          $mdDialog.hide();
          }
      }
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
    }
    })
  };
  $scope.showQualification = function(event,criteriaCtrl) 
  {
    $mdDialog.show({
    clickOutsideToClose: true,
    scope: $scope,
    fullscreen: true,
    // locals: {
    // }        
    preserveScope: true,
    templateUrl: './samarth-webcomponents/jobPost/template/criteriaForm.html',
    controller: function dialogController($scope, $mdDialog,professionFac) 
    {
      // console.log("Parameters to dialog: ", keyAnkit, ' and ', ritesh);
      console.log("jkdkjdjdssdldsldsldslkdsldsldlkds");
      console.log(criteriaCtrl);
      if(criteriaCtrl.criteria.qualifications != undefined)
      {
        // console.log("entering");
        // console.log(criteriaCtrl.criteria);
        $scope.qualifications = criteriaCtrl.criteria.qualifications;
        $scope.criteria = criteriaCtrl.criteria;
      }
      $scope.priority = [
        "Mandatory",
        "Optional"
      ];               
      $scope.addQual=addQual;                          
      $scope.submitCriteriaData=submitCriteriaData;

      function addQual(){
        $scope.qualification={};
        $scope.qualifications.push($scope.qualification);
      }

      function submitCriteriaData()
      {
        criteriaCtrl.criteria=$scope.criteria;
        criteriaCtrl.criteria.qualifications=$scope.qualifications;
        criteriaCtrl.data.criteria=criteriaCtrl.criteria;
        console.log("dsdddddsadadasssasssssdsdsds");
        console.log(criteriaCtrl);
        $mdDialog.hide();
          // $mdDialog.hide({data:'i love you from dialog'});
        }
        $scope.closeDialog = function() {
          $mdDialog.hide();
        }
      }
    })
 // .then(function(result), {
 //    console.log('data from dialog: ', result);
 // }, function(cancel){
 //    console.log('Dialog was cancelled ');
 // });
  };
}
}());
