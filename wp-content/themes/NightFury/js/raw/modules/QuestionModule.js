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