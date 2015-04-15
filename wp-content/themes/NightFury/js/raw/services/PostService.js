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