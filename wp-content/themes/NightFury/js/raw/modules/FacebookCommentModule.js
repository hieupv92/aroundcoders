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