NightFuryTheme.controller('HomeCtrl',function($rootScope,$scope,$http,POST,CACHE){
	$rootScope.showSpinner = true;
	/*
	* load post
	*/
	if(CACHE.get(CACHE_POST) == undefined || CACHE.get(CACHE_POST).length == 0){
		var PostService = POST.getPostInCategory('news',5);
			PostService.then(function(response){
				console.log("GET NEWS RESPONSE",response);
				$scope.posts = response;
				CACHE.put(CACHE_POST,response);
				$rootScope.showSpinner = false;
			})
	}else{
		$scope.posts = CACHE.get(CACHE_POST);
		$rootScope.showSpinner = false;
		console.log("LOAD POST FROM CACHE",$scope.posts);
	};
	var Loading      = false;
	var StopLoadMore = false;
	$(window).scroll(function(e){
		if(($(window).scrollTop() + $(window).height()) > ($(document).height() - 300)) {
			if(Loading || StopLoadMore){
				return;
			}else{
				try{
					Loading = true;
					$scope.Loading = Loading;
					var length = $scope.posts.length;
					var PostService = POST.LoadMorePost('news',length,5);
						PostService.then(function(response){
							if(response.length == 0){
								StopLoadMore = true;
								Loading = false;
								$scope.Loading = Loading;
								console.log("StopLoadMore");
								return;
							}else{
								CACHE.put(CACHE_POST,$scope.posts.concat(response));
								$scope.posts = CACHE.get(CACHE_POST);
								Loading = false;
								$scope.Loading = Loading;
							}
						})
					}catch(e){
						console.log(e);
					}
			}
		}
	})
	/*
	* view post
	*/
	$scope.ViewPost = function(post){
		$rootScope.viewPost = post;
	}
})