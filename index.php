<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
session_start();
if (!isset($_SESSION["user_id"]) && !isset($_SESSION['token_id'])){$page = isset($_SERVER['REQUEST_URI'])?$_SERVER['REQUEST_URI']:'/index.php'; $page = urlencode($page); exit(header("Location: login.php?page=$page"));}
if (!defined('ROOT_PATH')) define('ROOT_PATH', isset($_SERVER['DOCUMENT_ROOT'])?$_SERVER['DOCUMENT_ROOT']:'/var/www/html');
if (!defined('VIEW_PATH')) define('VIEW_PATH', ROOT_PATH. DIRECTORY_SEPARATOR. 'views');
$page_id = isset($_GET['pageid']) ? $_GET['pageid'] : '';
$page_array = explode('.',$page_id);
$page_sub_id = 0;
$pageid = 0;
if(isset($page_array[0])) $pageid = intval(($page_array[0]));
if(isset($page_array[1])) $page_sub_id = intval(($page_array[1]));
$token = $_SESSION['token_id'];
$userid= $_SESSION['user_id'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Tell the browser to be responsive to screen width -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
    <link href="/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <!-- chartist CSS -->
    <link href="/assets/plugins/chartist-js/dist/chartist.min.css" rel="stylesheet">
    <link href="/assets/plugins/chartist-js/dist/chartist-init.css" rel="stylesheet">
    <link href="/assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css" rel="stylesheet">
    <!--This page css - Morris CSS -->
    <link href="/assets/plugins/c3-master/c3.min.css" rel="stylesheet">    
    <link href="/assets/plugins/timepicker/bootstrap-timepicker.min.css" rel="stylesheet">
    <link href="/assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet">
    <link href="/assets/plugins/datatables/media/css/dataTables.bootstrap4.css" rel="stylesheet">
    <!-- toast CSS -->
    <link href="/assets/plugins/toast-master/css/jquery.toast.css" rel="stylesheet">
    <link href="/assets/plugins/select2/dist/css/select2.min.css" rel="stylesheet" type="text/css" />
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

<body class="fix-header fix-sidebar card-no-border">
    <!-- ============================================================== -->
    <!-- Preloader - style you can find in spinners.css -->
    <!-- ============================================================== -->
    <div class="preloader">
        <svg class="circular" viewBox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10" /> 
        </svg>
    </div>
    <!-- ============================================================== -->
    <!-- Main wrapper - style you can find in pages.scss -->
    <!-- ============================================================== -->
    <div id="main-wrapper">
        <!-- ============================================================== -->
        <!-- Topbar header - style you can find in pages.scss -->
        <!-- ============================================================== -->
        <?php include_once('views/common/header.php'); ?>
        <!-- ============================================================== -->
        <!-- End Topbar header -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <?php include_once('views/common/leftsidebar.php'); ?>
        <!-- ============================================================== -->
        <!-- End Left Sidebar - style you can find in sidebar.scss  -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Page wrapper  -->
        <!-- ============================================================== -->
        <div class="page-wrapper"> 
            <div class="preloader1" id="aloader" style="margin-top: 70px;opacity: .6;">
                <svg class="circular" viewBox="25 25 50 50">
                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle> 
                </svg>
            </div>
        
            <div class="container-fluid">
            </div>
            <!-- ============================================================== -->
            <!-- Container fluid  -->
            <!-- ============================================================== -->
            <?php //include_once('container.php'); ?>
            <!-- ============================================================== -->
            <!-- End Container fluid  -->
            <!-- ============================================================== -->
            <!-- ============================================================== -->
            <!-- footer -->
            <!-- ============================================================== -->
            <footer class="footer"> © 2018 SVG Columbus. </footer>
            <!-- ============================================================== -->
            <!-- End footer -->
            <!-- ============================================================== -->
        </div>
        <!-- ============================================================== -->
        <!-- End Page wrapper  -->
        <!-- ============================================================== -->
    </div>
</body>


<!-- Mirrored from wrappixel.com/demos/admin-templates/material-pro/material/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Mon, 24 Dec 2018 08:12:39 GMT -->
</html>
<script>
var token = "<?=$token ?>";
var userid= "<?=$userid; ?>";
var pageid= "<?=$page_id; ?>";
</script>
<script src="/assets/plugins/jquery/jquery.min.js"></script>
<script src="/assets/plugins/popper/popper.min.js"></script>
<script src="/assets/plugins/bootstrap/js/bootstrap.min.js"></script>
<script src="/js/jquery.slimscroll.js"></script>
<script src="/js/waves.js"></script>
<script src="/js/sidebarmenu.js"></script>
<script src="js/custom.js?v=1.0"></script>
<script src="/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
<script src="/assets/plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="/assets/plugins/chartist-js/dist/chartist.min.js"></script>
<script src="/assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.min.js"></script>
<script src="/assets/plugins/d3/d3.min.js"></script>
<script src="/assets/plugins/c3-master/c3.min.js"></script>
<script src="/assets/plugins/moment/moment.js"></script>
<script src="/assets/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<script src="/assets/plugins/daterangepicker/daterangepicker.js"></script>
<!-- This is data table -->
<script src="/assets/plugins/datatables/datatables.min.js"></script>
<!-- start - This is for export functionality only -->
<script src="/assets/plugins/datatables/dataTables.buttons.min.js"></script>
<script src="/assets/plugins/datatables/buttons.flash.min.js"></script>
<script src="/assets/plugins/datatables/jszip.min.js"></script>
<script src="/assets/plugins/datatables/buttons.html5.min.js"></script>
<script src="../assets/plugins/toast-master/js/jquery.toast.js"></script>
<script src="../assets/plugins/select2/dist/js/select2.full.min.js" type="text/javascript"></script>
    
<script src="/js/getdata.js"></script>  
<script src="/assets/plugins/icheck/icheck.min.js"></script>
    <script src="/assets/plugins/icheck/icheck.init.js"></script>
<script>
$(function(){$(".preloader").fadeOut()});

 $(document).ajaxStart(function() {
    $("#aloader").fadeIn();
});

$(document).ajaxStop(function() {
    $("#aloader").fadeOut();
}); 
</script>
    <script>
        
    $.ajax({
            async : true,
            crossDomain : true,
            url : '/controller.php?pageid='+pageid,
            success : function(result){
                //console.log((result));
                $('.container-fluid').html(result);
                $(".container-fluid").find("script").each(function(i) {
                    eval($(this).text());
                });
                
            }
        });
        
        
            
    </script>  