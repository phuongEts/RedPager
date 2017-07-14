<?php
	$parse_uri = explode('wp-content', $_SERVER['SCRIPT_FILENAME']);
	require_once( $parse_uri[0] . 'wp-load.php' );
	//global $wpdb, $PasswordHash, $current_user, $user_ID;

?>
<?php
	//Catch the data from App
  $json = file_get_contents("php://input");
  $obj = json_decode($json, TRUE);

  if( $obj ){
    switch ($obj['Action']) {
			case 'login':
				$response =	login_default($obj);
				break;
    }
    echo $response;
  } else {
    ?>{"error":"ERROR"}<?php
  }
?>