<?php
define('THEME_URI',get_template_directory_uri());

function register_my_menu() {
  register_nav_menu('header-menu',__( 'Header Menu' ));
}
add_action( 'init', 'register_my_menu' );
$args = array(
	'default-image' => get_template_directory_uri() . '/images/logo.png',
);
add_theme_support( 'custom-header', $args );
add_theme_support( 'post-thumbnails' ); 
?>