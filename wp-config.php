<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'aroundcoders');

/** MySQL database username */
define('DB_USER', '');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'p>g.qQLM({k23JPdIlfY2~T?KM@HM5g$=@(g10$D]]Y|g;|0{e=FZ2HGPf|NTg!1');
define('SECURE_AUTH_KEY',  'q8QJ2z&H4UC{ WO4AGij8I@a:0^.FzfrsODSz/i#(CYpc`d)-9*?E.a2]`pb_ !q');
define('LOGGED_IN_KEY',    '^Ew.%kYigB/Vh}!2U ?,*h|[dA86qSIBZ&M^Qpci3W9O926M=*gY`7@#]|hpJOl2');
define('NONCE_KEY',        '6VzSwVe5C[V+3|Kku1[!x_o#$YSGdZQjxXF-aayT_.DyN-xQxBzZ*fU]&wEYSYqA');
define('AUTH_SALT',        '=404+S; q;o-Z,c|G]FcL@=`_Y=/s5Q*h7s-g26%W~Nt</+bO<)T&2=vU/HW.P6R');
define('SECURE_AUTH_SALT', 'M(*cO~/O453av99Q7WHRV>c+|3sqwU+?fKz$vxC{4_{vr|IT|CMgJfc}1V:h g}C');
define('LOGGED_IN_SALT',   '/68HrmEgRW+fEr50q}T[sT+]+HaBF- ,T^RD8.P07(I/LXynn<_a+i|h&mS-,bZS');
define('NONCE_SALT',       '%~]hiEeiVaJhy8%_`;hu6. Ae/}`u_<r-h:@:|6I>[_N9D9xRwWvV++u%E4^#x].');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'ar_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
