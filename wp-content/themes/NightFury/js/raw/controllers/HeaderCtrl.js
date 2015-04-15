NightFuryTheme.controller('HeaderCtrl',function($rootScope,$scope,$location){
	$scope.GoGome = function(){
		if($location.$$path == '/'){
			$('body').scrollTop(0);
		}
	}
});