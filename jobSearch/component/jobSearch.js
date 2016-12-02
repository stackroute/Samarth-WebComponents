(function(){
  'use strict'
angular
  .module('samarth-webcomponents')
  /*creating component for job search*/
  .component("jobSearch",{
   	templateUrl:'jobSearch/template/jobSearch.html',
    controller:'jobSearchCtrl'
   	/*bindings:{
   		name :"=",
   		txt:'@'
   	},
   	controller:function()
   	{
   	
   	}*/
  })
})();