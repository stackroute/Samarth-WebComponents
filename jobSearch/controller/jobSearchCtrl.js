(function(){
  'use strict'
	angular
	   .module('samarth-webcomponents')
		 .controller('jobSearchCtrl', function($rootScope,jobSearchFactory, $scope, $http) {
		  	var vm = this;
		  	vm.arrayLength=0;
		  	vm.arrayspace=[];
		  	vm.result = [{}];
		  	// vm.i=0;
		  	vm.title="";
		  	$scope.s=function(key){
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
				{	console.log("b4 push");
		     vm.arrayspace.push(vm.result[i]);
		     console.log("after push");
				 $rootScope.$broadcast('san',vm.arrayspace);
				}
				else {
				 	// console.log("no");
				  }
			 	}
				})
			}
	});
})();		 

	 //bckp
// angular
//    .module('samarth.jobSearch')
// 	 .controller('jobSearchCtrl', function($rootScope,jobSearchFactory, $scope, $http) {
// 	  $scope.s=function(key){
// 	  	jobSearchFactory.searchJobDetails().then(function(response){
//       var searchString=$scope.searchString;
// 			console.log(searchString);
// 			$scope.result = response.data.Search;
// 			console.log($scope.result);
// 			var arrayLength=$scope.result.length;
// 			var i=0;
// 			var arrayspace=[];
//       for(i=0;i<arrayLength;i++){
// 		 	var title=$scope.result[i].Title;
// 			if(title==searchString)
// 			{
// 	     arrayspace.push($scope.result[i]);
// 			 $rootScope.$broadcast('san',arrayspace);
// 			}
// 			else {
// 			 	console.log("no");
// 			  }
// 		 	}
// 			})
// 		}
// });

	 //
 


