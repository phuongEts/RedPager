<?php
/**
 * Twenty Fifteen functions and definitions
 *
 * Set up the theme and provides some helper functions, which are used in the
 * theme as custom template tags. Others are attached to action and filter
 * hooks in WordPress to change core functionality.
 *
 * When using a child theme you can override certain functions (those wrapped
 * in a function_exists() call) by defining them first in your child theme's
 * functions.php file. The child theme's functions.php file is included before
 * the parent theme's file, so the child theme functions would be used.
 *
 * @link https://codex.wordpress.org/Theme_Development
 * @link https://codex.wordpress.org/Child_Themes
 *
 * Functions that are not pluggable (not wrapped in function_exists()) are
 * instead attached to a filter or action hook.
 *
 * For more information on hooks, actions, and filters,
 * {@link https://codex.wordpress.org/Plugin_API}
 *
 * @package WordPress
 * @subpackage Twenty_Fifteen
 * @since Twenty Fifteen 1.0
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 *
 * @since Twenty Fifteen 1.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 660;
}

/**
 * Twenty Fifteen only works in WordPress 4.1 or later.
 */
if ( version_compare( $GLOBALS['wp_version'], '4.1-alpha', '<' ) ) {
	require get_template_directory() . '/inc/back-compat.php';
}

if ( ! function_exists( 'twentyfifteen_setup' ) ) :
/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 *
 * @since Twenty Fifteen 1.0
 */
function twentyfifteen_setup() {

	/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on twentyfifteen, use a find and replace
	 * to change 'twentyfifteen' to the name of your theme in all the template files
	 */
	load_theme_textdomain( 'twentyfifteen', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
	add_theme_support( 'title-tag' );

	/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * See: https://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
	 */
	add_theme_support( 'post-thumbnails' );
	set_post_thumbnail_size( 825, 510, true );

	// This theme uses wp_nav_menu() in two locations.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu',      'twentyfifteen' ),
		'social'  => __( 'Social Links Menu', 'twentyfifteen' ),
	) );

	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

	/*
	 * Enable support for Post Formats.
	 *
	 * See: https://codex.wordpress.org/Post_Formats
	 */
	add_theme_support( 'post-formats', array(
		'aside', 'image', 'video', 'quote', 'link', 'gallery', 'status', 'audio', 'chat'
	) );

	/*
	 * Enable support for custom logo.
	 *
	 * @since Twenty Fifteen 1.5
	 */
	add_theme_support( 'custom-logo', array(
		'height'      => 248,
		'width'       => 248,
		'flex-height' => true,
	) );

	$color_scheme  = twentyfifteen_get_color_scheme();
	$default_color = trim( $color_scheme[0], '#' );

	// Setup the WordPress core custom background feature.
	add_theme_support( 'custom-background', apply_filters( 'twentyfifteen_custom_background_args', array(
		'default-color'      => $default_color,
		'default-attachment' => 'fixed',
	) ) );

	/*
	 * This theme styles the visual editor to resemble the theme style,
	 * specifically font, colors, icons, and column width.
	 */
	add_editor_style( array( 'css/editor-style.css', 'genericons/genericons.css', twentyfifteen_fonts_url() ) );

	// Indicate widget sidebars can use selective refresh in the Customizer.
	add_theme_support( 'customize-selective-refresh-widgets' );
}
endif; // twentyfifteen_setup
add_action( 'after_setup_theme', 'twentyfifteen_setup' );

/**
 * Register widget area.
 *
 * @since Twenty Fifteen 1.0
 *
 * @link https://codex.wordpress.org/Function_Reference/register_sidebar
 */
function twentyfifteen_widgets_init() {
	register_sidebar( array(
		'name'          => __( 'Widget Area', 'twentyfifteen' ),
		'id'            => 'sidebar-1',
		'description'   => __( 'Add widgets here to appear in your sidebar.', 'twentyfifteen' ),
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
}
add_action( 'widgets_init', 'twentyfifteen_widgets_init' );

if ( ! function_exists( 'twentyfifteen_fonts_url' ) ) :
/**
 * Register Google fonts for Twenty Fifteen.
 *
 * @since Twenty Fifteen 1.0
 *
 * @return string Google fonts URL for the theme.
 */
function twentyfifteen_fonts_url() {
	$fonts_url = '';
	$fonts     = array();
	$subsets   = 'latin,latin-ext';

	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Noto Sans, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Noto Sans font: on or off', 'twentyfifteen' ) ) {
		$fonts[] = 'Noto Sans:400italic,700italic,400,700';
	}

	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Noto Serif, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Noto Serif font: on or off', 'twentyfifteen' ) ) {
		$fonts[] = 'Noto Serif:400italic,700italic,400,700';
	}

	/*
	 * Translators: If there are characters in your language that are not supported
	 * by Inconsolata, translate this to 'off'. Do not translate into your own language.
	 */
	if ( 'off' !== _x( 'on', 'Inconsolata font: on or off', 'twentyfifteen' ) ) {
		$fonts[] = 'Inconsolata:400,700';
	}

	/*
	 * Translators: To add an additional character subset specific to your language,
	 * translate this to 'greek', 'cyrillic', 'devanagari' or 'vietnamese'. Do not translate into your own language.
	 */
	$subset = _x( 'no-subset', 'Add new subset (greek, cyrillic, devanagari, vietnamese)', 'twentyfifteen' );

	if ( 'cyrillic' == $subset ) {
		$subsets .= ',cyrillic,cyrillic-ext';
	} elseif ( 'greek' == $subset ) {
		$subsets .= ',greek,greek-ext';
	} elseif ( 'devanagari' == $subset ) {
		$subsets .= ',devanagari';
	} elseif ( 'vietnamese' == $subset ) {
		$subsets .= ',vietnamese';
	}

	if ( $fonts ) {
		$fonts_url = add_query_arg( array(
			'family' => urlencode( implode( '|', $fonts ) ),
			'subset' => urlencode( $subsets ),
		), 'https://fonts.googleapis.com/css' );
	}

	return $fonts_url;
}
endif;

/**
 * JavaScript Detection.
 *
 * Adds a `js` class to the root `<html>` element when JavaScript is detected.
 *
 * @since Twenty Fifteen 1.1
 */
function twentyfifteen_javascript_detection() {
	echo "<script>(function(html){html.className = html.className.replace(/\bno-js\b/,'js')})(document.documentElement);</script>\n";
}
add_action( 'wp_head', 'twentyfifteen_javascript_detection', 0 );

/**
 * Enqueue scripts and styles.
 *
 * @since Twenty Fifteen 1.0
 */
function twentyfifteen_scripts() {
	// Add custom fonts, used in the main stylesheet.
	wp_enqueue_style( 'twentyfifteen-fonts', twentyfifteen_fonts_url(), array(), null );

	// Add Genericons, used in the main stylesheet.
	wp_enqueue_style( 'genericons', get_template_directory_uri() . '/genericons/genericons.css', array(), '3.2' );

	// Load our main stylesheet.
	wp_enqueue_style( 'twentyfifteen-style', get_stylesheet_uri() );

	// Load the Internet Explorer specific stylesheet.
	wp_enqueue_style( 'twentyfifteen-ie', get_template_directory_uri() . '/css/ie.css', array( 'twentyfifteen-style' ), '20141010' );
	wp_style_add_data( 'twentyfifteen-ie', 'conditional', 'lt IE 9' );

	// Load the Internet Explorer 7 specific stylesheet.
	wp_enqueue_style( 'twentyfifteen-ie7', get_template_directory_uri() . '/css/ie7.css', array( 'twentyfifteen-style' ), '20141010' );
	wp_style_add_data( 'twentyfifteen-ie7', 'conditional', 'lt IE 8' );

	wp_enqueue_script( 'twentyfifteen-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20141010', true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	if ( is_singular() && wp_attachment_is_image() ) {
		wp_enqueue_script( 'twentyfifteen-keyboard-image-navigation', get_template_directory_uri() . '/js/keyboard-image-navigation.js', array( 'jquery' ), '20141010' );
	}

	wp_enqueue_script( 'twentyfifteen-script', get_template_directory_uri() . '/js/functions.js', array( 'jquery' ), '20150330', true );
	wp_localize_script( 'twentyfifteen-script', 'screenReaderText', array(
		'expand'   => '<span class="screen-reader-text">' . __( 'expand child menu', 'twentyfifteen' ) . '</span>',
		'collapse' => '<span class="screen-reader-text">' . __( 'collapse child menu', 'twentyfifteen' ) . '</span>',
	) );
}
add_action( 'wp_enqueue_scripts', 'twentyfifteen_scripts' );

/**
 * Add featured image as background image to post navigation elements.
 *
 * @since Twenty Fifteen 1.0
 *
 * @see wp_add_inline_style()
 */
function twentyfifteen_post_nav_background() {
	if ( ! is_single() ) {
		return;
	}

	$previous = ( is_attachment() ) ? get_post( get_post()->post_parent ) : get_adjacent_post( false, '', true );
	$next     = get_adjacent_post( false, '', false );
	$css      = '';

	if ( is_attachment() && 'attachment' == $previous->post_type ) {
		return;
	}

	if ( $previous &&  has_post_thumbnail( $previous->ID ) ) {
		$prevthumb = wp_get_attachment_image_src( get_post_thumbnail_id( $previous->ID ), 'post-thumbnail' );
		$css .= '
			.post-navigation .nav-previous { background-image: url(' . esc_url( $prevthumb[0] ) . '); }
			.post-navigation .nav-previous .post-title, .post-navigation .nav-previous a:hover .post-title, .post-navigation .nav-previous .meta-nav { color: #fff; }
			.post-navigation .nav-previous a:before { background-color: rgba(0, 0, 0, 0.4); }
		';
	}

	if ( $next && has_post_thumbnail( $next->ID ) ) {
		$nextthumb = wp_get_attachment_image_src( get_post_thumbnail_id( $next->ID ), 'post-thumbnail' );
		$css .= '
			.post-navigation .nav-next { background-image: url(' . esc_url( $nextthumb[0] ) . '); border-top: 0; }
			.post-navigation .nav-next .post-title, .post-navigation .nav-next a:hover .post-title, .post-navigation .nav-next .meta-nav { color: #fff; }
			.post-navigation .nav-next a:before { background-color: rgba(0, 0, 0, 0.4); }
		';
	}

	wp_add_inline_style( 'twentyfifteen-style', $css );
}
add_action( 'wp_enqueue_scripts', 'twentyfifteen_post_nav_background' );

/**
 * Display descriptions in main navigation.
 *
 * @since Twenty Fifteen 1.0
 *
 * @param string  $item_output The menu item output.
 * @param WP_Post $item        Menu item object.
 * @param int     $depth       Depth of the menu.
 * @param array   $args        wp_nav_menu() arguments.
 * @return string Menu item with possible description.
 */
function twentyfifteen_nav_description( $item_output, $item, $depth, $args ) {
	if ( 'primary' == $args->theme_location && $item->description ) {
		$item_output = str_replace( $args->link_after . '</a>', '<div class="menu-item-description">' . $item->description . '</div>' . $args->link_after . '</a>', $item_output );
	}

	return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'twentyfifteen_nav_description', 10, 4 );

/**
 * Add a `screen-reader-text` class to the search form's submit button.
 *
 * @since Twenty Fifteen 1.0
 *
 * @param string $html Search form HTML.
 * @return string Modified search form HTML.
 */
function twentyfifteen_search_form_modify( $html ) {
	return str_replace( 'class="search-submit"', 'class="search-submit screen-reader-text"', $html );
}
add_filter( 'get_search_form', 'twentyfifteen_search_form_modify' );

/**
 * Implement the Custom Header feature.
 *
 * @since Twenty Fifteen 1.0
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 *
 * @since Twenty Fifteen 1.0
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Customizer additions.
 *
 * @since Twenty Fifteen 1.0
 */
require get_template_directory() . '/inc/customizer.php';


/***************code by bninh*************************/
function creatRole(){
	add_role('userNormal', __(
		'UserNomal'),
		array(
			'read'              => true, // Allows a user to read
			'create_posts'      => true, // Allows user to create new posts
			'edit_posts'        => true, // Allows user to edit their own posts
			'edit_others_posts' => false, // Don't Allows user to edit others posts too
			'publish_posts'     => true, // Allows the user to publish posts
			'manage_categories' => true, // Allows user to manage post categories
			'delete_posts' => false,
			)
	);
	add_role('userPremium', __(
		'UserPremium'),
		array(
			'read'              => true, // Allows a user to read
			'create_posts'      => true, // Allows user to create new posts
			'edit_posts'        => true, // Allows user to edit their own posts
			'edit_others_posts' => false, // Don't Allows user to edit others posts too
			'publish_posts'     => true, // Allows the user to publish posts
			'manage_categories' => true, // Allows user to manage post categories
			'delete_posts' => false,
			)
	);

}
add_action( 'init', 'creatRole' );

function registerUser($username, $password, $email, $phone){
	//$email = $wpdb->escape(trim($email));
	if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
		$mess = 'Email address is not valid!';
		return $mess;
	}else if(email_exists($email) ) {
		$mess = 'Email already exists'; 
		return $mess;
	}else{
		$typeuser = 'userNormal';
		if (checkIssetUsername($phone)){
			$mess = 'Phone number already exists';
			return $mess;
		}else{
			$user_id = wp_insert_user( array ('user_pass' => apply_filters('pre_user_user_pass', $password), 'user_login' => apply_filters('pre_user_user_login', $phone), 'user_email' => apply_filters('pre_user_user_email', $email), 'display_name' => apply_filters('pre_user_display_name', $username), 'role' => $typeuser ) );
			if( is_wp_error($user_id)) {
				$mess = 'Error on user creation';
				return $mess;
			} else {								
				do_action('user_register', $user_id);
				update_user_meta($user_id, "avaiable", "true");

				/*update connection*/
				update_user_meta($user_id, "connection_free", 3);
				
				$mess = 'Sign Up Success!';	
				return true;
			}
		}
	}
}
function checkLogin($id, $password){
	$idUser = getIdUser($id, $password);
	if ($idUser != 0){
		return true;
	}else{
		return false;
	}
}
function updataTokenUser($idUser, $token){
	if ($token == "" || $token == null || $token === null || $token === ""){
		return false;
	}else{
		update_user_meta($idUser, "token", $token);
		$tokenAf = get_user_meta($idUser, "token", true);
		if ($tokenAf == "" || $tokenAf == null || $tokenAf === null || $tokenAf === ""){
			return false;
		}else{
			return true;
		}
	}
	
	
}
function logout($id){
	update_user_meta($id, "token", "");
	$token = get_user_meta($id, "token", true);
	if ($token == ""){
		return true;
	}else{
		return false;
	}
}

function getIdUser($username, $password) {
	$creds = array();
	if (is_numeric($username)){
		$creds['user_login'] = $username;
	}else{
		$dataUser = get_user_by( 'email', $username );
		if ($dataUser === false){
			return 0;
		}else{
			$user_login = $dataUser->data->user_login;
			$creds['user_login'] = $user_login;
		}
	}
	$creds['user_password'] = $password;
	$user = wp_signon( $creds, false );
	if ( is_wp_error($user) ) {
	   return 0;
	   die();
	   }
	else {
		return $user->ID;
	}
}
function getIdUser_ByUsername($username) {
	if (is_numeric($username)){
		$dataUser = get_user_by( 'login', $username );
	}else{
		$dataUser = get_user_by( 'email', $username );
	}
	
	if ($dataUser === false){
		return 0;
	}else{
		$idUser = $dataUser->data->ID;
		return $idUser;
	}
}
function checkIssetUsername($username) {
	if (is_numeric($username)){
		$dataUser = get_user_by( 'login', $username );
	}else{
		$dataUser = get_user_by( 'email', $username );
	}
	
	if ($dataUser === false){
		return false;
	}else{
		return true;
	}
}
function updateRoleUser($idUser){

	$currentDay = date("F j, Y, g:i a",time());
	$long = strtotime($currentDay);
	$long1 = get_user_meta($idUser, 'endDayUpgrade', true);

	if ($long1 < $long){
		$user_meta_bf=get_userdata($idUser);
		$user_roles_bf=$user_meta_bf->roles;

		if ($user_roles_bf[0] == 'userPremium'){
			$u = new WP_User($idUser);
			$u->remove_role('userPremium');
			$u->add_role( 'userNormal' );
		}
		$user_meta=get_userdata($idUser);
		$user_roles=$user_meta->roles;

		if ($user_roles[0] == 'userNormal'){
			return true;
		}else{
			return false;
		}
	}
	return true;
}
function getRoleUser($idUser){
	$role = '';
	$user_meta=get_userdata($idUser);
	$user_roles=$user_meta->roles;
	if ($user_roles[0] != ''){
		$role = $user_roles[0];
	}
	return $role;
}
function getDisplayNameUser($idUser){
	$user_meta=get_userdata($idUser);
	$displayName = $user_meta->data->display_name;
	return $displayName;
}
function getEmailUser($idUser){
	$user_meta=get_userdata($idUser);
	$displayName = $user_meta->data->user_email;
	return $displayName;
}
function getPhoneUser($idUser){
	$user_meta=get_userdata($idUser);
	$displayName = $user_meta->data->user_login;
	return $displayName;
}
function checkIssetUser($idUser){
	$user_meta=get_userdata($idUser);
	if ($user_meta === false){
		return false;
	}else{
		return true;
	}
}
function addStr($str, $itemStr){
	if ($str == ""){
		$str = "".$itemStr;
	}else{
		if (strpos($str, ''.$itemStr ) === false){
			$str = $str.",".$itemStr;
		}
	}
	return $str;
}
function deleteStr($str, $itemStr){
	$str = str_replace( $itemStr.',', '', $str );
	$str = str_replace( ','.$itemStr, '', $str );
	$str = str_replace( $itemStr, '', $str );
	if (strpos($str, ''.$itemStr ) === false){
		return $str;
	}else{
		return false;
	}
}
function checkIssetPostInvite($idUser, $idUserTo){
	$argsB = array(
		'posts_per_page'   => 1,
		'offset'           => 0,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'meta_key'         => 'fromuser',
		'meta_value'       => $idUser,
		'post_type'        => 'invites',
		'post_status'      => 'publish',
		'suppress_filters' => true,
		'meta_query' => array(
							array('key' => 'touser',
								  'value' => $idUserTo
							)
						)
	);
	$posts_arrayB = get_posts( $argsB );
	$postB = $posts_arrayB[0];

	if ($postB != null){
		return true;
	}else{
		return false;
	}
}
function checkIssetPostConnection($idUser, $idUserTo){
	$argsB = array(
		'posts_per_page'   => 1,
		'offset'           => 0,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'meta_key'         => 'user_a',
		'meta_value'       => $idUser,
		'post_type'        => 'connection',
		'post_status'      => 'publish',
		'suppress_filters' => true,
		'meta_query' => array(
							array('key' => 'user_b',
								  'value' => $idUserTo
							)
						)
	);
	$posts_arrayB = get_posts( $argsB );
	$postB = $posts_arrayB[0];

	if ($postB != null){
		return true;
	}else{
		$argsC = array(
			'posts_per_page'   => 1,
			'offset'           => 0,
			'orderby'          => 'date',
			'order'            => 'DESC',
			'meta_key'         => 'user_a',
			'meta_value'       => $idUserTo,
			'post_type'        => 'connection',
			'post_status'      => 'publish',
			'suppress_filters' => true,
			'meta_query' => array(
								array('key' => 'user_b',
									  'value' => $idUser
								)
							)
		);
		$posts_arrayC = get_posts( $argsC );
		$postC = $posts_arrayC[0];

		if ($postC != null){
			return true;
		}else{			
			return false;
		}
	}
}
function sendInvites($idUser, $email){
	$mess = '';
	if (checkIssetUsername($email)){
		$idUserTo = getIdUser_ByUsername($email);
		if ($idUserTo != 0){
			/*kiem tra ton tai post invite chua*/
			if (checkIssetPostInvite($idUser, $idUserTo)){
				/*da ton tai post invite*/
				return true;
			}else{
				/*chua ton tai post invite*/
				/*creat post invite*/
				$title = 'Invited demo';
				$my_post = array(
				  'post_title'    => $title,
				  'post_status'   => 'publish',
				  'post_author'   => $idUser,
				  'post_type'   => 'invites'
				);
				// Insert the post into the database
				$ktpost = wp_insert_post( $my_post );
				if ($ktpost != 0){
					
					/*update data post invite*/
					$currentDate = date("F j, Y, g:i a",time());
					update_post_meta($ktpost, 'fromuser', $idUser);
					update_post_meta($ktpost, 'touser', $idUserTo);
					update_post_meta($ktpost, 'date', $currentDate);
					
					/*update data from user*/
					$listinvited = get_user_meta($idUser, 'listinvited', true);
					$listinvited = addStr($listinvited, $ktpost);
					update_user_meta($idUser, 'listinvited', $listinvited);
					
					$listpending = get_user_meta($idUser, 'pending', true);
					$listpending = addStr($listpending, $ktpost);
					update_user_meta($idUser, 'pending', $listpending);
					
					/*update data to user*/
					$listinvitedwaiting = get_user_meta($idUserTo, 'listinvitedwaiting', true);
					$listinvitedwaiting = addStr($listinvitedwaiting, $ktpost);
					update_user_meta($idUserTo, 'listinvitedwaiting', $listinvitedwaiting);
					return true;
				}else{
					return false;
				}
			}	
		}else{
			$mess = 'Get user '.$email.' fault';
			return $mess;
		}
	}else{
		$mess = 'Email or phone number is not registered';
		return $mess;
	}
}
function getListInvited($idUser){
	$data = array();
	$listPostInvite = get_user_meta($idUser, "listinvited", true);
	if ($listPostInvite != ''){
		$listPost_tem = explode(",",$listPostInvite );
		foreach($listPost_tem as $itemPost ){			
			$idUserTo = get_post_meta($itemPost, 'touser', true);
			$dateInvite = get_post_meta($itemPost, 'date', true);
			if (checkIssetUser($idUserTo)){
				$displayNameUser = getNameUserConnect($idUser, $idUserTo);
				if ($displayNameUser === false){
					$displayNameUser = getDisplayNameUser($idUserTo);
				}	
				$temObject = (object) array("id"=>(int)$itemPost, "idUserTo"=>(int) $idUserTo, "name"=>$displayNameUser, "date"=>$dateInvite);
				array_push($data, $temObject );
			}else{
				$listPostInvite = deleteStr($listPostInvite, $itemPost);	
			}
		}
		update_user_meta($idUser, "listinvited", $listPostInvite);
	}
	return $data;
}
function getListInvitedWaiting($idUser){
	$data = array();
	$listPostInvite = get_user_meta($idUser, "listinvitedwaiting", true);
	if ($listPostInvite != ''){
		$listPost_tem = explode(",",$listPostInvite );
		foreach($listPost_tem as $itemPost ){
			$idUserFrom = get_post_meta($itemPost, 'fromuser', true);
			$dateInvite = get_post_meta($itemPost, 'date', true);
			if (checkIssetUser($idUserFrom)){
				$displayNameUser = getDisplayNameUser($idUserFrom);
				$temObject = (object) array("id"=>(int)$itemPost, "idUserFrom"=>(int) $idUserFrom, "name"=>$displayNameUser, "date"=>$dateInvite);			
				array_push($data, $temObject );
			}else{
				$listPostInvite = deleteStr($listPostInvite, $itemPost);
			}
		}
		update_user_meta($idUser, "listinvitedwaiting", $listPostInvite);
	}
	return $data;
}
function getCountInvitedWaiting($idUser){
	$data = 0;
	$listPostInvite = get_user_meta($idUser, "listinvitedwaiting", true);
	if ($listPostInvite != ''){
		$listPost_tem = explode(",",$listPostInvite );
		foreach($listPost_tem as $itemPost ){
			$idUserFrom = get_post_meta($itemPost, 'fromuser', true);
			$dateInvite = get_post_meta($itemPost, 'date', true);
			if (checkIssetUser($idUserFrom)){
				$data = $data +1;
			}else{
				$listPostInvite = deleteStr($listPostInvite, $itemPost);
			}
		}
		update_user_meta($idUser, "listinvitedwaiting", $listPostInvite);
	}
	return $data;
}
function getListPending($idUser){
	$data = array();
	$listpending = get_user_meta($idUser, "pending", true);
	if ($listpending != ''){
		$listPost_tem = explode(",",$listpending );
		foreach($listPost_tem as $itemPost ){
			$idUserTo = get_post_meta($itemPost, 'touser', true);
			$dateInvite = get_post_meta($itemPost, 'date', true);
			if (checkIssetUser($idUserTo)){
				$displayNameUser = getDisplayNameUser($idUserTo);
				$temObject = (object) array("id"=>(int)$itemPost, "idUserTo"=>(int) $idUserTo, "name"=>$displayNameUser, "date"=>$dateInvite);			
				array_push($data, $temObject );
			}else{
				$listpending = deleteStr($listpending, $itemPost);
			}
		}
		update_user_meta($idUser, "pending", $listpending);
	}
	return $data;
}
function countConnection($idUser){
	$connection = getListConnection($idUser);
	$soConnection = count($connection);
	return $soConnection;
}
function acceptInvited($idUser, $idInvite){
	$mess = '';
	$idUserFrom = get_post_meta($idInvite, 'fromuser', true);
	if ($idUserFrom != ''){
		
		$connection_free = (int) get_user_meta($idUserFrom, "connection_free", true);		
		if (0 < $connection_free){
			/*update idUser from to list connect*/
			$listconnection = get_user_meta($idUser, 'listconnection', true);
			$listconnection = addStr($listconnection, $idUserFrom);
			update_user_meta($idUser, 'listconnection', $listconnection);
			
			$listconnected = get_user_meta($idUser, 'listconnected', true);
			$listconnected = addStr($listconnected, $idUserFrom);
			update_user_meta($idUser, 'listconnected', $listconnected);
			
			/*update idUser from to list connect for user invited*/
			$listconnection1 = get_user_meta($idUserFrom, 'listconnection', true);
			$listconnection1 = addStr($listconnection1, $idUser);
			update_user_meta($idUserFrom, 'listconnection', $listconnection1);
			
			$listconnected1 = get_user_meta($idUserFrom, 'listconnected', true);
			$listconnected1 = addStr($listconnected1, $idUser);
			update_user_meta($idUserFrom, 'listconnected', $listconnected1);
			
			$listpending = get_user_meta($idUserFrom, 'pending', true);
			$listpending = deleteStr($listpending, $idInvite);
			update_user_meta($idUserFrom, 'pending', $listpending);
			
			if ($connection_free == 1){
				sendNotificationPurchase($idUserFrom);
			}
			
			$connection_free = $connection_free -1;
			update_user_meta($idUserFrom, 'connection_free', $connection_free);
			
			$listPostInvitewaiting = get_user_meta($idUser, "listinvitedwaiting", true);
			$listPostInvitewaiting = deleteStr($listPostInvitewaiting, $idInvite);
			update_user_meta($idUser, 'listinvitedwaiting', $listPostInvitewaiting);
			
			//changeConnectionAfterAcceptInvite($idUser, $idInvite);
			
			/*register post type connection*/
			/*config connection*/
			/*kiem tra ton tai post invite chua*/
			if (checkIssetPostConnection($idUser, $idUserFrom)){
				/*da ton tai post invite*/
				return true;
			}else{
				/*chua ton tai post connection*/
				/*creat post connection*/
				$title = 'Connection demo';
				$my_post = array(
				  'post_title'    => $title,
				  'post_status'   => 'publish',
				  'post_author'   => $idUser,
				  'post_type'   => 'connection'
				);
				// Insert the post into the database
				$ktpost = wp_insert_post( $my_post );
				if ($ktpost != 0){
					
					/*update data post invite*/
					$currentDate = date("F j, Y, g:i a",time());
					update_post_meta($ktpost, 'user_a', $idUser);
					update_post_meta($ktpost, 'user_b', $idUserFrom);
					update_post_meta($ktpost, 'date', $currentDate);
					update_post_meta($ktpost, 'vibrate_a', "true");
					update_post_meta($ktpost, 'vibrate_b', "true");
					update_post_meta($ktpost, 'light_a', "true");
					update_post_meta($ktpost, 'light_b', "true");
					update_post_meta($ktpost, 'sound_a', "true");
					update_post_meta($ktpost, 'sound_b', "true");
					
					return true;
				}else{
					$mess = 'Create post type connection fault!';
					return $mess;
				}
			}
		}else{
			$user_meta_bf=get_userdata($idUserFrom);
			$user_roles_bf=$user_meta_bf->roles;
			if ($user_roles_bf[0] == 'userPremium'){
				$u = new WP_User($idUser);
				$u->remove_role('userPremium');
				$u->add_role( 'userNormal' );
			}
			$mess = 'Can not accept invite because user invited full connection!';
			return $mess;
		}
	}else{
		$mess = 'get id user invited fault!';
		return $mess;
	}
}
function getListConnection($idUser ){
	$data = array();
	$listconnection = get_user_meta($idUser, 'listconnection', true);
	if ($listconnection != ''){
		$listPost_tem = explode(",",$listconnection );
		foreach($listPost_tem as $itemPost ){
			$connected = checkConnected($idUser, $itemPost);
			if (checkIssetUser($itemPost)){
				$displayNameUser = getNameUserConnect($idUser, $itemPost);
				if ($displayNameUser === false){
					$displayNameUser = getDisplayNameUser($itemPost);
				}		
				$temObject = (object) array("id"=>(int)$itemPost, "name"=>$displayNameUser, "connected"=>$connected);			
				array_push($data, $temObject );
			}else{
				$listconnection = deleteStr($listconnection, $itemPost);
			}		
		}
		update_user_meta($idUser, 'listconnection', $listconnection);
	}
	return $data;
}
function addConnected($idUser, $idUserTo){
	$listconnected = get_user_meta($idUser, 'listconnected', true);
	$listconnected = addStr($listconnected, $idUserTo);
	update_user_meta($idUser, 'listconnected', $listconnected);
	
	$listconnectedKt = get_user_meta($idUser, 'listconnected', true);
	if (strpos($listconnectedKt, ''.$idUserTo ) === false){
		return false;
	}else{
		return true;
	}
}
function deleteConnected($idUser, $idUserTo){
	$listconnected = get_user_meta($idUser, 'listconnected', true);
	$listconnected = deleteStr($listconnected, $idUserTo);
	update_user_meta($idUser, 'listconnected', $listconnected);
	
	$listconnectedKt = get_user_meta($idUser, 'listconnected', true);
	if (strpos($listconnectedKt, ''.$idUserTo ) === false){
		return true;
	}else{
		return false;
	}
}
function checkConnected($idUser, $idUserTo){
	$listconnected = get_user_meta($idUser, 'listconnected', true);
	if (checkIssetUser($idUserTo)){
		if (strpos($listconnected, ''.$idUserTo ) === false){
			return false;
		}else{
			return true;
		}
	}else{
		$listconnected = deleteStr($listconnected, $idUserTo);
		update_user_meta($idUser, "listconnected", $listconnected);
		return false;
	}	
}
function checkConnectedAll($idUser, $idUserTo){
	$mess = '';
	$listconnected = get_user_meta($idUser, 'listconnected', true);
	if (strpos($listconnected, ''.$idUserTo ) === false){
		$nameUser = getDisplayNameUser($idUserTo);
		$mess = 'you are not connect to '.$nameUser;
		return $mess;
	}else{
		$listconnected1 = get_user_meta($idUserTo, 'listconnected', true);
		if (strpos($listconnected1, ''.$idUser ) === false){
			$nameUser = getDisplayNameUser($idUserTo);
			$mess = $nameUser.' not connect to you';
			return $mess;
		}else{
			return true;
		}
	}
}
function getListSendAlert($idUser){
	$data = array();
	$listconnected = get_user_meta($idUser, 'listconnection', true);
	if ($listconnected != ''){
		$listPost_tem = explode(",",$listconnected );
		foreach($listPost_tem as $itemPost ){
			$displayNameUser = getNameUserConnect($idUser, $itemPost);
				if ($displayNameUser === false){
					$displayNameUser = getDisplayNameUser($itemPost);
				}	
			$avaiable = false;
			$reason = checkConnectedAll($idUser, $itemPost);
			if ($reason === true){
				$avaiable = true;
			}
		
			$stt = get_user_meta($itemPost, "avaiable", true);
			if ($stt == "" || $stt == "false"){
				$avaiable = false;
				$reason = $displayNameUser.' Offline';
			}
			
			$tokenItem = get_user_meta($itemPost, "token", true);
			if ($tokenItem == ""){
				$avaiable = false;
				$reason = $displayNameUser.' logged out';
			}
			
			$temObject = (object) array("id"=>(int)$itemPost, "name"=>$displayNameUser, "avaiable"=>$avaiable, "reason"=>$reason);			
			array_push($data, $temObject );			
		}
	}
	return $data;
}
function sendAlert($idUser, $idUserAlert){
	$mess = '';
	$token = get_user_meta($idUserAlert, "token", true);
	$displayNameUser = getDisplayNameUser($idUserAlert);
	if ($token != ""){
		$stt = get_user_meta($idUserAlert, "avaiable", true);
		if ($stt === "" || $stt === "false"){
			$mess = $displayNameUser.' Offline';
			return $mess;
		}else{
			$reason = checkConnectedAll($idUser, $idUserAlert);
			if ($reason === true){
				$dataConfig = getDataConfigConnection($idUser, $idUserAlert);
				$vibrate = $dataConfig->vibrate;
				$light = $dataConfig->light;
				$sound = $dataConfig->sound;
				
				if ($vibrate){
					$vibrate = 1;
				}else{
					$vibrate = 0;
				}
				
				if ($light){
					$light = 1;
				}else{
					$light = 0;
				}
				
				if ($sound){
					$sound = 1;
				}else{
					$sound = 0;
				}
				
				$ktSaveHistory = saveHistorySendAlert($idUser, $idUserAlert);
				if ($ktSaveHistory === false){
					return "Save History Send Alert Error";
				}else{
					$nameUser = getNameUserConnect($idUserAlert, $idUser);
					if ($nameUser === false){
						$nameUser = getDisplayNameUser($idUser);
					}	
					$messConfig = array(
						"type"=>"Send Alert", 
						"vibrate"=>$vibrate, 
						"light"=>$light, 
						"sound"=>$sound, 
						"idUserAlert"=>$idUser, 
						"nameUserAlert"=>$nameUser,
						"idAlert"=>$ktSaveHistory
					);
					$messConfig = json_encode($messConfig);
					$kt = sendCloudMessaseToAndroid($token, $messConfig);
					return true;
				}		
			}else{
				return $reason;
			}
		}
	}else{		
		$mess = $displayNameUser.' logged out';
		return $mess;
	}

}
function sendCloudMessaseToAndroid($deviceToken = "", $message = "", $push_data = array()) {        
    $url = 'https://fcm.googleapis.com/fcm/send ';
    $serverKey = "AIzaSyAxe5XnltW2HtYJvCJwqSsjupJMG2k80lA";
    $msg = array(
        'message' => $message,
        'data' => $push_data
    );            
    $fields = array();
    $fields['data'] = $msg;
    if (is_array($deviceToken)) {
        $fields['registration_ids'] = $deviceToken;
    } else {
        $fields['to'] = $deviceToken;
    }
    $headers = array(
        'Content-Type:application/json',
        'Authorization:key=' . $serverKey
    );   
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));
    $result = curl_exec($ch);
    if ($result === FALSE) {
        die('FCM Send Error: '  .  curl_error($ch));
    }
    curl_close($ch);
    return $result;
}   
function getDataUser($idUser){
	$data = array();
	
	$nameUser = getDisplayNameUser($idUser);
	$emailUser = getEmailUser($idUser);
	$phoneUser = getPhoneUser($idUser);
	
	$tokenUser = get_user_meta($idUser, "token", true);
	$roleUser = getRoleUser($idUser);
	$connection_free = (int) get_user_meta($idUser, "connection_free", true);
	
	$temObject = (object) array("id"=>(int)$idUser, "name"=>$nameUser, "token"=>$tokenUser, "email"=>$emailUser, "phone"=>$phoneUser,"role"=>$roleUser, "connection_remaining"=>$connection_free);			
				array_push($data, $temObject );
	
	return $data;
}
function setAvaiableUser($idUser, $avaiable){
	update_user_meta($idUser, "avaiable", $avaiable);
	$avaiableTem = get_user_meta($idUser, "avaiable", true);
	if ($avaiableTem == $avaiable){
		return true;
	}else{
		return false;
	}
}
function saveHistorySendAlert($idUser, $idUserTo){
	$mess = '';
	/*creat post sendalert*/
	$currentDate = date("F j, Y, g:i a",time());
	$nameUser = getDisplayNameUser($idUser);
	$nameUserTo = getDisplayNameUser($idUserTo);
	
	$title = 'Send alert from '.$nameUser.' To '.$nameUserTo.'-'.$currentDate;
	$my_post = array(
	  'post_title'    => $title,
	  'post_status'   => 'publish',
	  'post_author'   => $idUser,
	  'post_type'   => 'sendalert'
	);
	// Insert the post into the database
	$ktpost = wp_insert_post( $my_post );
	if ($ktpost != 0){
		
		/*update data post invite*/		
		update_post_meta($ktpost, 'fromuser', $idUser);
		update_post_meta($ktpost, 'touser', $idUserTo);
		update_post_meta($ktpost, 'date', $currentDate);
		
		/*update data from user*/
		$listsend = get_user_meta($idUser, 'listsend', true);
		$listsend = addStr($listsend, $ktpost);
		update_user_meta($idUser, 'listsend', $listsend);
		
		/*update data to user*/
		$listreceived = get_user_meta($idUserTo, 'listreceived', true);
		$listreceived = addStr($listreceived, $ktpost);
		update_user_meta($idUserTo, 'listreceived', $listreceived);
		return $ktpost;
	}else{
		return false;
	}
}
function getListSended($idUser){
	$data = array();
	$listsend = get_user_meta($idUser, "listsend", true);
	if ($listsend != ''){
		$listPost_tem = explode(",",$listsend );
		foreach($listPost_tem as $itemPost ){			
			$idUserTo = get_post_meta($itemPost, 'touser', true);
			$dateSended = get_post_meta($itemPost, 'date', true);
			$displayNameUser = getNameUserConnect($idUser, $idUserTo);
				if ($displayNameUser === false){
					$displayNameUser = getDisplayNameUser($idUserTo);
				}	
			if ($displayNameUser != null){
				$temObject = (object) array("id"=>(int)$itemPost, "idUserTo"=>(int) $idUserTo, "name"=>$displayNameUser, "date"=>$dateSended);
				array_push($data, $temObject );
			}else{
				$listsend = deleteStr($listsend, $itemPost);
			}
		}
		update_user_meta($idUser, "listsend", $listsend);
	}
	return $data;
}
function getListReceived($idUser){
	$data = array();
	$listreceived = get_user_meta($idUser, "listreceived", true);
	if ($listreceived != ''){
		$listPost_tem = explode(",",$listreceived );
		foreach($listPost_tem as $itemPost ){
			$idUserFrom = get_post_meta($itemPost, 'fromuser', true);
			$dateSended = get_post_meta($itemPost, 'date', true);
			$displayNameUser = getNameUserConnect($idUser, $idUserFrom);
				if ($displayNameUser === false){
					$displayNameUser = getDisplayNameUser($idUserFrom);
				}	
			if ($displayNameUser != null){
				$temObject = (object) array("id"=>(int)$itemPost, "idUserFrom"=>(int) $idUserFrom, "name"=>$displayNameUser, "date"=>$dateSended);			
				array_push($data, $temObject );
			}else{
				$listreceived = deleteStr($listreceived, $itemPost);				
			}			
		}
		update_user_meta($idUser, "listreceived", $listreceived);
	}
	return $data;
}
function getSoLuongOrder(){
	$args = array(
		'posts_per_page'   => -1,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'post_type'        => 'orderpremium',
		'post_status'      => 'publish',
		'suppress_filters' => true
	);
	$posts_array = get_posts( $args );
	$soluongOrder = count($posts_array);
	return $soluongOrder;
}
function table_list_order_payment(){
	//get list order payment

	$args = array(
		'posts_per_page'   => -1,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'post_type'        => 'orderpremium',
		'post_status'      => 'publish',
		'suppress_filters' => true
	);
	$posts_array = get_posts( $args );
	$soluongOrder = count($posts_array);

	?>
	<form method="post">
		<table class="wp-list-table widefat fixed striped toplevel_page_lv-orders">
			<thead>
				<tr>
					<th class="manage-column" >Id</th>
					<th class="manage-column" >From User</th>
					<th class="manage-column" >Date Start</th>
					<th class="manage-column" >Price</th>
					<th class="manage-column" >Payment Method</th>
					<th class="manage-column" >Transaction Code</th>
				</tr>
			</thead>
			<tbody>
				<?php if ($soluongOrder == 0):?>
					<p>Empty</p>
				<?php else:?>
					<?php foreach($posts_array as $itemPost):?>
						<?php
							$id = $itemPost->ID;
							$idOrder = $itemPost->post_title;
							$idAuthor = $itemPost->post_author;
							$user_meta=get_userdata($idAuthor);
							$author = $user_meta->data->display_name;
							$date = get_post_meta($id, "date", true);
							$money = get_post_meta($id, "money", true);
							$currency = get_post_meta($id, "currency", true);
							$payment_method = get_post_meta($id, "payment_method", true);
							$transaction = get_post_meta($id, "transaction", true);
							global $wpdb;
							$prefix = $wpdb->prefix;
						?>
						<tr>
							<td><?php echo $idOrder;?></td>
							<td>
								<a href= "<?php echo get_edit_user_link($idAuthor); ?>"><?php echo $author;?></a>
							</td>
							<td><?php echo $date;?></td>
							<td><?php echo $money.' '.$currency;?></td>
							<td><?php echo $payment_method;?></td>
							<td><?php echo $transaction;?></td>
						</tr>
					<?php endforeach;?>
				<?php endif;?>
			</tbody>
		</table>
	</form>
<?php
}
function upgrade($idUser, $money, $transaction, $payment_method, $currency){

	$currentDay = date("Y-m-d");
	$long = strtotime($currentDay);

	update_user_meta($idUser, 'startDayUpgrade', $long);

	$user_meta_bf=get_userdata($idUser);
	$user_roles_bf=$user_meta_bf->roles;
	if ($user_roles_bf[0] == 'userNormal'){
		$u = new WP_User($idUser);
		$u->remove_role('userNormal');
		$u->add_role( 'userPremium' );
	}

	$user_meta=get_userdata($idUser);
	$user_roles=$user_meta->roles;

	if ($user_roles[0] == 'userPremium'){
		/*khoi tao post order*/
		// Create post object

		$my_post = array(
		  'post_title'    => 'title tem',
		  'post_status'   => 'publish',
		  'post_author'   => $idUser,
		  'post_type'   => 'orderpremium'
		);
		// Insert the post into the database
		$ktpost = wp_insert_post( $my_post );
		if ($ktpost != 0){

			$args = array(
				'posts_per_page'   => -1,
				'orderby'          => 'date',
				'order'            => 'DESC',
				'post_type'        => 'orderpremium',
				'post_status'      => 'publish',
				'suppress_filters' => true
			);
			$posts_array = get_posts( $args );
			$soluongOrder = count($posts_array);

			if ($soluongOrder == 1){
				// Update post 37
					$my_post = array(
					  'ID'           => $ktpost,
					  'post_title'   => '#1',
					);
					wp_update_post( $my_post );
				//Update post meta
					update_post_meta($ktpost, "id", 1);
			}else{

				$idTem = $posts_array[1]->ID;
				$idbefore = get_post_meta($idTem, "id", true);
				if ($idbefore == ''){
					$idbefore = $ktpost;
				}else{
					$idbefore = $idbefore +1;
				}
				// Update post 37
					$my_post = array(
					  'ID'           => $ktpost,
					  'post_title'   => '#'.$idbefore,
					);
					wp_update_post( $my_post );
				//Update post meta
					update_post_meta($ktpost, "id", $idbefore);
			}
				update_post_meta($ktpost, "date", $currentDay);
				update_post_meta($ktpost, "money", $money);
				update_post_meta($ktpost, "currency", $currency);
				update_post_meta($ktpost, "payment_method", $payment_method);
				update_post_meta($ktpost, "transaction", $transaction);
				
				$connection_free = (int)get_user_meta($idUser, "connection_free", true);
				if ($money == 9){
					$connection_free = $connection_free + 12;
				}else{
					$connection_free = $connection_free + 64;
				}
				update_user_meta($idUser, "connection_free", $connection_free);
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}
function deleteUser($idUser){
	require_once(ABSPATH.'wp-admin/includes/user.php' );
	$kt = wp_delete_user($idUser);
	if ($kt == true){
		return true;
	}
	return false;
}
function getCountConnection($idUser){
	$con_f = get_user_meta($idUser, "connection_f", true);
	$con_a = get_user_meta($idUser, "connection_a", true);
	$con_b = get_user_meta($idUser, "connection_b", true);
	$con_c = get_user_meta($idUser, "connection_c", true);
	$con_d = get_user_meta($idUser, "connection_d", true);
	
	$count = 0;
	$count = $con_f + $con_a + $con_b + $con_c + $con_d;
	return $count;
}
function getConnectionIncrease($idUser){
	$con_f = get_user_meta($idUser, "connection_f", true);
	$con_a = get_user_meta($idUser, "connection_a", true);
	$con_b = get_user_meta($idUser, "connection_b", true);
	$con_c = get_user_meta($idUser, "connection_c", true);
	$con_d = get_user_meta($idUser, "connection_d", true);
	
	$conInc = 0;
	if ($con_a > 0){
		$conInc = 12;
	}
	if ($con_b > 0){
		$conInc = 6;
	}
	if ($con_c > 0){
		$conInc = 3;
	}
	if ($con_d > 0){
		$conInc = 1;
	}
	if ($con_f > 0){
		$conInc = 0;
	}
	return $conInc;
}
function changeConnectionAfterAcceptInvite($idUser, $idUserFrom){
	/*change connection current user*/
	$connectionIncrease = getConnectionIncrease($idUserFrom);
	if ($connectionIncrease > 0){
		if ($connectionIncrease == 12){
			$con_b = get_user_meta($idUser, "connection_b", true);
			$con_b = $con_b + 12;
		}
		if ($connectionIncrease == 6){
			$con_c = get_user_meta($idUser, "connection_c", true);
			$con_c = $con_c + 6;
		}
		if ($connectionIncrease == 3){
			$con_d = get_user_meta($idUser, "connection_d", true);
			$con_d = $con_d + 3;
		}
		if ($connectionIncrease == 1){
			$con_f = get_user_meta($idUser, "connection_f", true);
			$con_f = $con_f + 1;
		}
	}
	
	
	/*change connection user from */
	/*giam connection di 1*/
	/*bat dau tu connection_f*/
	
	$con_f_from = get_user_meta($idUserFrom, "connection_f", true);
	$con_a_from = get_user_meta($idUserFrom, "connection_a", true);
	$con_b_from = get_user_meta($idUserFrom, "connection_b", true);
	$con_c_from = get_user_meta($idUserFrom, "connection_c", true);
	$con_d_from = get_user_meta($idUserFrom, "connection_d", true);
	
	if ($con_f_from > 0){
		$con_f_from = $con_f_from - 1;
	}else{
		if ($con_a_from > 0){
			$con_a_from = $con_a_from - 1;
		}else{
			if ($con_b_from > 0){
				$con_b_from  = $con_b_from - 1;
			}else{
				if ($con_c_from > 0){
					$con_c_from = $con_c_from - 1;
				}else{
					if ($con_d_from > 0){
						$con_d_from = $con_d_from - 1;
					}
				}
			}
		}
	}
	update_user_meta($idUserFrom, "connection_f", $con_f_from);
	update_user_meta($idUserFrom, "connection_a", $con_a_from);
	update_user_meta($idUserFrom, "connection_b", $con_b_from);
	update_user_meta($idUserFrom, "connection_c", $con_c_from);
	update_user_meta($idUserFrom, "connection_d", $con_d_from);
	
}
function getConnectionUser($idUser){
	$con_f = get_user_meta($idUser, "connection_f", true);
	$con_a = get_user_meta($idUser, "connection_a", true);
	$con_b = get_user_meta($idUser, "connection_b", true);
	$con_c = get_user_meta($idUser, "connection_c", true);
	$con_d = get_user_meta($idUser, "connection_d", true);
	
	$data = (object) array("connection_free"=>(int)$con_f, "connection_64"=>(int) $con_a, "connection_12"=>$con_b, "connection_6"=>$con_c, "connection_3"=>$con_d);
	return $data;
}
function getDataConfigConnection($idUser, $idUserTo){
	$argsB = array(
		'posts_per_page'   => 1,
		'offset'           => 0,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'meta_key'         => 'user_a',
		'meta_value'       => $idUser,
		'post_type'        => 'connection',
		'post_status'      => 'publish',
		'suppress_filters' => true,
		'meta_query' => array(
							array('key' => 'user_b',
								  'value' => $idUserTo
							)
						)
	);
	$posts_arrayB = get_posts( $argsB );
	$postB = $posts_arrayB[0];

	if ($postB != null){
		$idB = $postB -> ID;
		$vibrate = get_post_meta($idB, "vibrate_b", true);
		$light = get_post_meta($idB, "light_b", true);
		$sound = get_post_meta($idB, "sound_b", true);
		
		$data = (object) array("vibrate"=>(boolean)$vibrate, "light"=>(boolean)$light, "sound"=>(boolean)$sound);	
		return $data;
	}else{
		$argsC = array(
			'posts_per_page'   => 1,
			'offset'           => 0,
			'orderby'          => 'date',
			'order'            => 'DESC',
			'meta_key'         => 'user_a',
			'meta_value'       => $idUserTo,
			'post_type'        => 'connection',
			'post_status'      => 'publish',
			'suppress_filters' => true,
			'meta_query' => array(
								array('key' => 'user_b',
									  'value' => $idUser
								)
							)
		);
		$posts_arrayC = get_posts( $argsC );
		$postC = $posts_arrayC[0];

		if ($postC != null){
			$idB = $postC -> ID;
			$vibrate = get_post_meta($idB, "vibrate_a", true);
			$light = get_post_meta($idB, "light_a", true);
			$sound = get_post_meta($idB, "sound_a", true);
			
			$data = (object) array("vibrate"=>(boolean)$vibrate, "light"=>(boolean)$light, "sound"=>(boolean)$sound);	
			return $data;
		}else{			
			$data = (object) array();	
			return $data;
		}
	}
}
function sendDataConfigUser($idUser, $idUserTo, $vibrate, $light, $sound){
	$argsB = array(
		'posts_per_page'   => 1,
		'offset'           => 0,
		'orderby'          => 'date',
		'order'            => 'DESC',
		'meta_key'         => 'user_a',
		'meta_value'       => $idUser,
		'post_type'        => 'connection',
		'post_status'      => 'publish',
		'suppress_filters' => true,
		'meta_query' => array(
							array('key' => 'user_b',
								  'value' => $idUserTo
							)
						)
	);
	$posts_arrayB = get_posts( $argsB );
	$postB = $posts_arrayB[0];

	if ($postB != null){
		$idB = $postB -> ID;
		update_post_meta($idB, "vibrate_b", $vibrate);
		update_post_meta($idB, "light_b", $light);
		update_post_meta($idB, "sound_b", $sound);
		
		return true;
	}else{
		$argsC = array(
			'posts_per_page'   => 1,
			'offset'           => 0,
			'orderby'          => 'date',
			'order'            => 'DESC',
			'meta_key'         => 'user_a',
			'meta_value'       => $idUserTo,
			'post_type'        => 'connection',
			'post_status'      => 'publish',
			'suppress_filters' => true,
			'meta_query' => array(
								array('key' => 'user_b',
									  'value' => $idUser
								)
							)
		);
		$posts_arrayC = get_posts( $argsC );
		$postC = $posts_arrayC[0];

		if ($postC != null){
			$idB = $postC -> ID;
			update_post_meta($idB, "vibrate_a", $vibrate);
			update_post_meta($idB, "light_a", $light);
			update_post_meta($idB, "sound_a", $sound);
			
			return true;
		}else{			
			return false;
		}
	}
}
function getTextShare(){
	return "Download Red Pager here so we can always be in touch if there’s an emergency or something really important (link to google play)";
}
add_filter( 'wp_mail_from', 'my_mail_from' );
function my_mail_from( $email ) {
	return "change-this-to-your-email-address";
}
add_filter( 'wp_mail_from_name', 'my_mail_from_name' );
function my_mail_from_name( $name ) {
	return "My Name";
}
function sentEmail(){
//sent email to User donate by bninh
			
			$billing_email	= 'kumocvip@gmail.com';
			$blogname = 'Cherityfair';
			$admin_email = 'buivanninh251094@gmail.com';		
			
			$headers = 'From: '.$blogname .' <'.$admin_email .'>' . PHP_EOL .
				'Reply-To: '.$blogname .' <'.$admin_email .'>' . PHP_EOL .
				'X-Mailer: PHP/' . phpversion();
			$headers .= "MIME-Version: 1.0\r\n";
			$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";				
			$subject = 'Your payment has been verified' ;	
		
			$message = '<div style="width: 600px; margin: 0 auto">';		
			$message .= '<div style="padding: 30px; color: #737373; border: 1px solid #D2D2D2">';
			$message .= 'Thank you for your donation! Your payment has been verified and the order is confirmed!';
			$message .= '<p>';
			$message .= 'ID: ';
			$message .= '</p>';
			$message .= '<p>';
			$message .= 'Donate for: ';
			$message .= '</p>';
			$message .= '<p>';
			$message .= 'Amount: ';
			$message .= '</p>';
			$message .= '<p>';
			$message .= 'Event: ';
			$message .= '</p>';
			$message .= '<p>';
			$message .= 'Charity: ';
			$message .= '</p>';
			$message .= '<p>';
			$message .= 'Comment: ';
			$message .= '</p>';
			$message .= '</div>';
			$message .= '</div>';
		
		return wp_mail( $billing_email, $subject, $message, $headers );
		//end sent email
}
function sendResultAlert($idAlert){
	$fromuser = get_post_meta($idAlert, "fromuser", true);
	$touser = get_post_meta($idAlert, "touser", true);
	$nameToUser = getNameUserConnect($fromuser, $touser);
	if ($nameToUser === false){
		$nameToUser = getDisplayNameUser($touser);
	}	

	$dateReceived = date("F j, Y, g:i a",time());
	
	$token = get_user_meta($fromuser, "token", true);
	if ($token != ""){
		$messConfig = array(
			"type"=>"Confirm Alert", 
			"nameUser"=>$nameToUser, 
			"dateReceived"=>$dateReceived
		);
		$messConfig = json_encode($messConfig);
		$kt = sendCloudMessaseToAndroid($token, $messConfig);
	}
}
function sendNotificationPurchase($idUser){
	$token = get_user_meta($idUser, "token", true);
	if ($token != ""){
		$messConfig = array(
			"type"=>"Notification Purchase"
		);
		$messConfig = json_encode($messConfig);
		$kt = sendCloudMessaseToAndroid($token, $messConfig);
	}
}
function xoa($idUser){
	update_user_meta($idUser, "nameUserConnect", null);
}
function addNameUserConnect($idUser, $idUserConnect, $title){
	$name = getNameUserConnect($idUser, $idUserConnect);
	if ($name === false){
		$arrNameUser = get_user_meta($idUser, "nameUserConnect", true);

		if ($arrNameUser ==""){
			$arrNameUser = array($idUserConnect => $title);
			
		}else{
			$arrNameUser = unserialize($arrNameUser);
			$arrNameUser[$idUserConnect] = $title;
			
		}
		$arrNameUser = serialize($arrNameUser);
		update_user_meta($idUser, "nameUserConnect", $arrNameUser);

		$nameKt = getNameUserConnect($idUser, $idUserConnect);
		if ($nameKt === false){
			return false;
		}else{
			return true;
		}
	}
	return true;
}
function getNameUserConnect($idUser, $idUserConnect){
	$arrNameUser = get_user_meta($idUser, "nameUserConnect", true);
	if ($arrNameUser == ""){
		return false;
	}else{
		$arrNameUser = unserialize($arrNameUser);
		$name = $arrNameUser[$idUserConnect];
		if ($name === null){
			return false;
		}else{
			return $name;
		}
	}
}
function editNameUserConnect($idUser, $idUserConnect, $title){
	$name = getNameUserConnect($idUser, $idUserConnect);
	if ($name === false){
		$ktAdd = addNameUserConnect($idUser, $idUserConnect, $title);
		if ($ktAdd){
			return true;
		}else{
			return false;
		}
	}else{
		$arrNameUser = get_user_meta($idUser, "nameUserConnect", true);
		$arrNameUser = unserialize($arrNameUser);
		$arrNameUser[$idUserConnect] = $title;

		$arrNameUser = serialize($arrNameUser);
		update_user_meta($idUser, "nameUserConnect", $arrNameUser);

		$nameKt = getNameUserConnect($idUser, $idUserConnect);
		if ($nameKt === false){
			return false;
		}else{
			return true;
		}
	}
}




















