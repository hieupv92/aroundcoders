NightFuryTheme.controller('PostCtrl',function($rootScope,$scope,$routeParams,$location,POST,CACHE){
	$rootScope.showSpinner = true;
	if($rootScope.viewPost != undefined && $rootScope.viewPost.slug == $routeParams.slug){
		$scope.post = $rootScope.viewPost;
		$rootScope.showSpinner = false;
	}else{
		var PostService = POST.getPostSlug($routeParams.slug);
		PostService.then(function(response){
			console.log("GET POST BY SLUG", response);
			$scope.post = response[0];
			$rootScope.showSpinner = false;
		});
	}
});