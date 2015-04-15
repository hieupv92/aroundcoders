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