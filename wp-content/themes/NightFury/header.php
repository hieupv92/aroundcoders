<!DOCTYPE html>
<html>
	<head>
		<title>Around Coders</title>
		<script src="<?php echo THEME_URI; ?>/bower_components/jquery/dist/jquery.min.js"></script>
		<script src="<?php echo THEME_URI; ?>/bower_components/angular/angular.min.js"></script>
		<script src="<?php echo THEME_URI; ?>/bower_components/angular-route/angular-route.min.js"></script>
		<script src="<?php echo THEME_URI; ?>/bower_components/angular-animate/angular-animate.min.js"></script>
		<script src="<?php echo THEME_URI; ?>/bower_components/angular-cookies/angular-cookies.min.js"></script>
		<script src="<?php echo THEME_URI; ?>/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

		<script type="text/javascript">
			var THEME_URI = "<?php echo THEME_URI; ?>";
		</script>

		<script src="<?php echo THEME_URI; ?>/js/nightfury.js"></script>

		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/bower_components/bootstrap/dist/css/bootstrap.min.css">
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/bower_components/bootstrap/dist/css/bootstrap-theme.min.css">
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/style.css">
		<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/css/raw/css/nightfury.css">
	</head>
	<body ng-app="NightFuryTheme">
		<script>
			window.fbAsyncInit = function() {
			FB.init({
			  appId      : '654705788008160',
			  xfbml      : true,
			  version    : 'v2.3'
			});
			};

			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "//connect.facebook.net/en_US/sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
	    </script>
		<header ng-controller="HeaderCtrl">
			<nav class="navbar navbar-default navbar-fixed-top">
				<div class="container">
					<div class="col-md-12 col-sm-12 col-xs-12">
						<div class="navbar-header">
							<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
								<span class="sr-only">Toggle navigation</span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
								<span class="icon-bar"></span>
							</button>
							<a class="navbar-brand" href="/" ng-click="GoGome()"><img src="<?php header_image(); ?>" alt="AroundCoders Logo" /></a>
							</div>
							<?php wp_nav_menu( array(
								'theme_location'  => 'header-menu',
								'container'       => 'div',
								'menu_class'      => 'nav navbar-nav',
							) ); ?>
						</div> <!-- navbar-header -->
					</div>
				</div>
			</nav>
		</header>
		<div class="spinner" ng-show="showSpinner">
			<div>
				<img src="<?php echo get_template_directory_uri(); ?>/images/loading.gif" alt="">
			</div>
		</div>
		<div ng-view>
