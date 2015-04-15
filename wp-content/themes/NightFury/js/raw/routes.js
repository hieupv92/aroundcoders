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

