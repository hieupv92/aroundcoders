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