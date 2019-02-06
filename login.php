<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if ( ! session_id() ) session_start();
$error_msg = isset($GET_['err']) ? $GET_['err'] : '';
if (isset($_SESSION["user_id"]) && isset($_SESSION['token_id'])) exit(header("Location: index.php?pageid=0"));
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
        $u_name = isset($_POST['u_name']) ? $_POST['u_name'] : '';
        $u_pd = isset($_POST['u_pd']) ? $_POST['u_pd'] : '';
        if($u_name != '' && $u_pd != ''){
            $key = hash('sha256','92182736',true);
            $ivlen = openssl_cipher_iv_length($cipher="aes-256-cbc");
            $iv = openssl_random_pseudo_bytes($ivlen);
            $ciphertext_raw = openssl_encrypt($u_pd, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
            $cipherpwd = base64_encode( $iv.$ciphertext_raw );
            //echo $cipherpwd;  
            //die();
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL,"https://api1.svgcolumbus.com/auth");
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode(array('login_key' => $u_name,'password'=>$cipherpwd)));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            
            $server_output = curl_exec($ch);
            $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close ($ch);
            //var_dump(($httpcode == 200));
            //die();
            $response = json_decode($server_output);
            //var_dump($response);
            if ($httpcode == 200) {
                $_SESSION['user_id'] = $response->user_id;
                $_SESSION['user_name'] = $response->user_name;
                $_SESSION['agent_name'] = $response->agent_name;
                $_SESSION['email_id'] = $response->email_id;
                $_SESSION['token_id'] = $response->token_id;
				$redirection_url = isset($_GET["page"])?$_GET["page"]:"/index.php";
                header("Location: $redirection_url");
            } else { 
                $error_msg = $response->title;
            }
            //header("Location: index.php");
        }else{
            $error_msg = 'Invalid Inputs';
        }
}
?>
<!DOCTYPE html>
<html lang="en">


<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <!-- Favicon icon -->
    <link rel="apple-touch-icon" sizes="57x57" href="/assets/images/favicon/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60" href="/assets/images/favicon/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72" href="/assets/images/favicon/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76" href="/assets/images/favicon/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114" href="/assets/images/favicon/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120" href="/assets/images/favicon/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144" href="/assets/images/favicon/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152" href="/assets/images/favicon/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"  href="/assets/images/favicon/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96" href="/assets/images/favicon/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon/favicon-16x16.png">
	<link rel="manifest" href="/assets/images/favicon/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/assets/images/favicon/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
    <title>Audit Panel</title>
    <!-- Bootstrap Core CSS -->
    <link href="../assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom CSS -->
    <link href="css/style.css" rel="stylesheet">
    <!-- You can change the theme colors from here -->
    <link href="css/colors/blue.css" id="theme" rel="stylesheet">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
    <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body>
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> </svg>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <section id="wrapper">
        <div class="login-register" >
            <div class="login-box card">
                <div class="card-body">
                    <form class="form-horizontal form-material" method="POST" id="loginform" action="<?=isset($_SERVER['REQUEST_URI'])?$_SERVER['REQUEST_URI']:$_SERVER['PHP_SELF']; ?>">
                        <h3 class="box-title m-b-20">Sign In</h3>
                        <?php if($error_msg != '') { ?>
                        <div class="alert alert-danger"><?php echo $error_msg; ?><button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span> </button></div>
                        <?php } ?>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="text" name="u_name" required placeholder="username or email"> </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12">
                                <input class="form-control" type="password" name="u_pd" required placeholder="password"> </div>
                        </div>
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-info btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Log In</button>
                            </div>
                        </div>
                    </form>
                   <!-- <form class="form-horizontal" id="recoverform" action="https://wrappixel.com/demos/admin-templates/material-pro/material/index.html">
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <h3>Recover u_pd</h3>
                                <p class="text-muted">Enter your Email and instructions will be sent to you! </p>
                            </div>
                        </div>
                        <div class="form-group ">
                            <div class="col-xs-12">
                                <input class="form-control" type="text" required="" placeholder="Email"> </div>
                        </div>
                        <div class="form-group text-center m-t-20">
                            <div class="col-xs-12">
                                <button class="btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light" type="submit">Reset</button>
                            </div>
                        </div>
                    </form> -->
                </div>
            </div>
        </div>
    </section>
    <!-- ============================================================== -->
    <!-- End Wrapper -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- All Jquery -->
    <!-- ============================================================== -->
    <script src="../assets/plugins/jquery/jquery.min.js"></script>
    <!-- Bootstrap tether Core JavaScript -->
    <script src="../assets/plugins/popper/popper.min.js"></script>
    <script src="../assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <!-- slimscrollbar scrollbar JavaScript -->
    <script src="js/jquery.slimscroll.js"></script>
    <!--Wave Effects -->
    <script src="js/waves.js"></script>
    <!--Menu sidebar -->
    <script src="js/sidebarmenu.js"></script>
    <!--stickey kit -->
    <script src="../assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
    <script src="../assets/plugins/sparkline/jquery.sparkline.min.js"></script>
    <!--Custom JavaScript -->
    <script src="js/custom.min.js"></script>
    <!-- ============================================================== -->
    <!-- Style switcher -->
    <!-- ============================================================== -->
    <script src="../assets/plugins/styleswitcher/jQuery.style.switcher.js"></script>
    
</body>


<!-- Mirrored from wrappixel.com/demos/admin-templates/material-pro/material/pages-login.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 24 Dec 2018 08:14:19 GMT -->
</html>