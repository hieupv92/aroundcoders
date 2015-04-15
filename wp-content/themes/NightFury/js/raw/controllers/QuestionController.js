NightFuryTheme.controller('QuestCtrl',function($rootScope,$scope,$routeParams,$location,POST,CACHE){
	$rootScope.showSpinner = true;
	if($rootScope.viewQuest != undefined && $rootScope.viewQuest.slug == $routeParams.slug){
		$scope.question = $rootScope.viewQuest;
		$rootScope.showSpinner = false;
	}else{
		var PostService = POST.getPostSlug($routeParams.slug);
		PostService.then(function(response){
			console.log("GET POST BY SLUG", response);
			$scope.question = response[0];
			$rootScope.showSpinner = false;
		});
	}
})