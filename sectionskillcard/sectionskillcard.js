(function() {
	let scripts = document.getElementsByTagName('script');
	let currentScriptPath = scripts[scripts.length - 1].src;
	let path1 = currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
		'/')) + '/templates/sectionskillconversation.html';

	angular.module('samarth-webcomponents')
		.component('mysectionSkillCard', {
			templateUrl: currentScriptPath.substring(0, currentScriptPath.lastIndexOf(
				'/')) + '/templates/sectionskillcard.html',
			controller: sectionskillcardCtrl,
			bindings: {
				candidateid: '<',
				showheader: '<',
				languagedata: '='
			},
			transclude: {
				verify: 'verify'

			}
		})
		.filter('capitalize', function() {
			return function(input) {
				return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() :
					'';
			}
		});

	function sectionskillcardCtrl($http, sectionskillcard, $mdDialog, datagenerate, deleteSkillService,
		$rootScope,$rootElement) {
		var ctrl = this;
		console.log("Inside skill section", ctrl);
		// ctrl.lang = "English";
		ctrl.loadLangData = function(lang) {
			// ctrl.lang = lang;
			// Setting language default to English for Samarth-Placement, as it is not multilingual as of now
		 // if($rootElement.attr('ng-app')=="samarth")
		 //    {
		 //        ctrl.lang = "English";
		 //    }

			datagenerate.getjson("section",lang).then(function(result) {
				ctrl.items = result;
				if($rootElement.attr('ng-app')=="samarth")
			{
				ctrl.languagedata = result;
			}
			});
			//end datagenerate
		}

		function getItem(key) {
			// return localStorageService.get(key);
		}
		ctrl.loadLangData("English");
		ctrl.limitval = 12;
		ctrl.value = 40;
		ctrl.skill = {};

		ctrl.primary = [];
		ctrl.plen = 0;
		ctrl.slen = 0;
		ctrl.secondary = [];
		ctrl.total = 0;
		ctrl.increaseLimit = function() {
			ctrl.limitval = ctrl.limitval + 60;
		};

		ctrl.decreaseLimit = function() {
			ctrl.limitval = ctrl.limitval - 60;
		};

		sectionskillcard.getjson(ctrl.candidateid).then(function(result) {
			ctrl.skill = result;

			for (let prop in ctrl.skill) {
				ctrl.primary = ctrl.skill[prop];
			}

			ctrl.total = ctrl.primary.length + ctrl.secondary.length;
			ctrl.plen = ctrl.primary.length;
			ctrl.slen = ctrl.secondary.length;
		});
		$rootScope.$on('skilldatachanged', function() {
			sectionskillcard.getjson(ctrl.candidateid).then(function(result) {
				ctrl.skill = result;
				ctrl.primary = [];
				ctrl.secondary = [];
				ctrl.total = 0;
				ctrl.plen = 0;
				ctrl.slen = 0;
				for (let prop in ctrl.skill) {
					ctrl.primary = ctrl.skill[prop];
				}

				ctrl.total = ctrl.primary.length + ctrl.secondary.length;
				ctrl.plen = ctrl.primary.length;
				ctrl.slen = ctrl.secondary.length;
			});
		});

		ctrl.status = '  ';
		ctrl.customFullscreen = false;
		ctrl.showAdvanced = function(ev, value, title) {
			$mdDialog.show({
					controller: DialogController,
					templateUrl: path1, //  skillconvopath
					parent: angular.element(document.body),
					targetEvent: ev,
					clickOutsideToClose: true,
					locals: {
						val: value,
						header: title,
						candidateid: ctrl.candidateid
					},
					fullscreen: ctrl.customFullscreen // Only for -xs, -sm breakpoints.
				})
				.then(function(answer) {
					ctrl.status = 'You said the information was "' + answer + '".';
				}, function() {
					ctrl.status = 'You cancelled the dialog.';
				});
		};

		function DialogController($scope, $mdDialog, val, header) {
			$scope.exp = [];
			for (i = 0; i <= 40; i++) {
				$scope.exp.push(i);
			}
			console.log("dsddsddsw",val != '');
			if(val != '')
			{
				console.log("Entered into if loop", val);
				$scope.skillObject = val;
				let skill = val.skillname;
			}
			$scope.header = header;
			$scope.hide = function() {
				$mdDialog.hide();
			};
			$scope.cancel = function() {
				$mdDialog.cancel();
			};
			$scope.save = function(skillobj, header) {
				let skillObj = {
					skills: [{
						skillname: skillobj.skillname,
						category: skillobj.category,
						expertise: skillobj.expertise,
						experience: skillobj.experience,
						metadata: {}
					}]
				};
				console.log("skilllllllll", skillobj);
				if (header === 'Add Skill') {
					$http({
						method: 'post',
						url: '/skill/' + ctrl.candidateid, //url: "http://localhost:8081/skill/" + ctrl.candidateid,
						data: skillObj
					}).then(function mySucces(response)  {
						console.log('res', response.data[0]);
						$rootScope.$emit('skilldatachanged', {});
					}, function myError(response) {
						console.log('error in adding skill section');
					});
				}
				if (header === 'Edit Skill') {
					$http({
						method: 'patch',
						url: '/skill/' + ctrl.candidateid + '/' + skillobj.skillname,
						//url: "http://localhost:8081/skill/" + ctrl.candidateid + "/" + skill,
						data: skillObj
					}).then(function mySucces(response)  {
						console.log('res', response);
						$rootScope.$emit('skilldatachanged', {});
					}, function myError(response) {
						console.log('error in updating skill section');
					});
				}
				$mdDialog.hide();
			};
		}
		ctrl.deleteSkill = function(value) {
					let skill = value.skillname;
					deleteSkillService.removeSkill(ctrl.candidateid, skill).then(function mySucces(response)  {
							console.log('delete res');
							$rootScope.$emit('skilldatachanged', {});
					}, function myError(response) {
							console.log('error in deleting skill section');
					});
				}
	}
})();

