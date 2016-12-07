(function(){
  'use strict'
angular
	  .module('samarth-webcomponents')
		.controller('jobSearchCtrl', function($rootScope,jobSearchFactory, $scope, $http) {
		  	var vm = this;
		  	vm.result = [{}];
		    vm.title="";

		  	$scope.s=function(key){
		  	vm.arrayspace=[];
		  	vm.arrayLength=0;

		  	jobSearchFactory.searchJobDetails().then(function(response){
				//console.log(searchString);
				vm.result = response.data.Search;
				//console.log($scope.result);
				vm.arrayLength=vm.result.length;
				//var i=0;
				//var arrayspace=[];
	      for(var i=0;i<vm.arrayLength;i++){
	      	//console.log("for");
			 	vm.title=vm.result[i].Title;
				if(vm.title==$scope.searchString)
				{	/*console.log("b4 push");*/
		     vm.arrayspace.push(vm.result[i]);
		     //console.log("after push");
				 $rootScope.$broadcast('san',vm.arrayspace);
				}
				else {
				 	// console.log("no");
				  }
			 	}
				},
				function (err)
				{
					alert("Result Not Found"+err);
				}

				)
			}
	});
})();



