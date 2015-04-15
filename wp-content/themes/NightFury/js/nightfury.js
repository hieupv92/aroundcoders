/*
* Cache key
*/
var CACHE_POST     = 'CACHE_POST';
var CACHE_QUESTION = 'CACHE_QUESTION ';

var CacheApp = angular.module('CacheService',[]);

CacheApp.factory('CACHE', function ($cacheFactory) {
    return $cacheFactory('myCache');
});

var NightFuryPostService = angular.module('PostService',[]);

NightFuryPostService.service('POST',function($q,$http){
	this.getPostInCategory = function(category_name,posts_per_page){ //if category_name == null => get posts in all page
		var url	= '/wp-json/posts';
			url	+= '?&filter[posts_per_page]=' + posts_per_page;
		if(category_name != null){
			url += '&filter[category_name]='+ category_name;
		}
		var defferer = $q.defer();
		$http.get(url).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	};
	this.getPostSlug = function(slug){
		var url = '/wp-json/posts?filter[name]=' + slug;
		var defferer = $q.defer();
		$http.get(url).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
	this.LoadMorePost = function(category_name,number_post_loaded,posts_per_page){
		var page_loaded = Math.ceil(number_post_loaded/posts_per_page);
		page_loaded++;
		var url = '/wp-json/posts?page=' + page_loaded +'&filter[category_name]=' + category_name + '&filter[posts_per_page]=' + posts_per_page;
		var defferer = $q.defer();
		$http.get(url).success(function(response){
			defferer.resolve(response);
		})
		return defferer.promise;
	}
});
var NightFuryTheme = angular.module('NightFuryTheme',['ngRoute','ngAnimate','FBCommentModule','PostService','CacheService','QuestionModule']);

NightFuryTheme.run(function($rootScope,$location){
	$rootScope.THEME_URI = THEME_URI;
	$rootScope.showSpinner = false;
	$rootScope.$watch(function(){
		return $location.$$absUrl;
	},function(){
		$('body').scrollTop(0);
	})
});
var FBCommentModule = angular.module('FBCommentModule',[]);
FBCommentModule.directive('fbComment',function(){
	return {
		restrict: 'E',
		scope: {
			numPosts: '@',
		},
		template: '<div class="fb-comments" data-href="{{ CurrentHref }}" data-numposts="{{ numPosts }}" data-width="0px" data-colorscheme="light"></div>',
		controller: 'FbCommentCtrl',
	};
});
FBCommentModule.controller('FbCommentCtrl',function($scope,$location,$timeout){
	$scope.$watch(function(){
		return $location.$$absUrl;
	},function(){
		$scope.CurrentHref = $location.$$absUrl;
		$timeout(function(){
			try{
				FB.XFBML.parse(document.getElementById('fbcomment'));
			}catch(e){
				console.log("FB.XFBML.parse()",e);
			}
		},50,false);
	})
})
var QuestionModule = angular.module('QuestionModule',['PostService','CacheService']);

QuestionModule.directive('questionBlock',function(){
	return {
		restrict: 'E',
		scope: {
			categoryName: '=',
			numberPosts: '=', 
		},
		templateUrl: THEME_URI + '/directives/question-block.html',
		controller: 'QuestionBlockCtrl'
	}
})
QuestionModule.controller('QuestionBlockCtrl',function($rootScope,$scope,POST,CACHE){
	if(CACHE.get(CACHE_QUESTION) == undefined || CACHE.get(CACHE_QUESTION).length == 0){
		var PostService = POST.getPostInCategory($scope.categoryName,$scope.numberPosts);
			PostService.then(function(response){
				console.log("GET QUESTION RESPONSE",response);
				$scope.questions = response;
				CACHE.put(CACHE_QUESTION,response);
			})
	}else{
		$scope.questions = CACHE.get(CACHE_QUESTION);
		console.log("LOAD QUESTION FROM CACHE",$scope.questions);
	};
	$scope.ViewQuest = function(question){
		$rootScope.viewQuest = question;
	}
})
NightFuryTheme.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
	$routeProvider
		.when('/',{
			templateUrl: THEME_URI + '/directives/home.html',
			controller: 'HomeCtrl',
		})
		.when('/blog',{
			templateUrl: THEME_URI + '/directives/blog.html',
			controller: 'BlogCtrl',
		})
		.when('/news/:slug',{
			templateUrl: THEME_URI + '/directives/post.html',
			controller: 'PostCtrl',
		})
		.when('/questions/:slug',{
			templateUrl: THEME_URI + '/directives/question.html',
			controller: 'QuestCtrl',
		});
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
}]);


NightFuryTheme.filter('unsafe',function($sce){
	return $sce.trustAsHtml;
});
NightFuryTheme.filter('shortContent',function(){
	return function(html, length){
		try{
			var removeHtmlTagRegex = /(<([^>]+)>)/ig
			html = html.replace(removeHtmlTagRegex,"");
			if(html.length <= length){
				return html;
			}else{
				html = html.substring(0,length);
				var html_length = html.length;
				var SpaceIndex = [html_length-1,html_length-2,html_length-3,html_length-4,html_length-5,html_length-6];
				SpaceIndex.forEach(function(v,k){
					if(html.charAt(v) == ' '){
						html = html.substring(0,SpaceIndex[k]);
						return;
					}
				})
				return html + '...';
			}
		}catch(e){
			return html;
		}
	}
})
NightFuryTheme.controller('BlogCtrl',function($rootScope,$scope,$http){
	
})
NightFuryTheme.controller('HeaderCtrl',function($rootScope,$scope,$location){
	$scope.GoGome = function(){
		if($location.$$path == '/'){
			$('body').scrollTop(0);
		}
	}
});
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