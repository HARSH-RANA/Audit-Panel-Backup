<?php
$pageid = isset($_GET['pageid']) ? $_GET['pageid'] : '';
$page_array = explode('.',$pageid);
$page_sub_id = 0;
$pageid = 0;
if(isset($page_array[0])) $pageid = intval(($page_array[0]));
if(isset($page_array[1])) $page_sub_id = intval(($page_array[1]));

switch ($pageid) {
    case 0:
        //include_once('views/dashboard/dashboard.php');
        print_r(file_get_contents('/var/www/html/views/dashboard/dashboard.html'));
        break;
    case 1:
        print_r(file_get_contents('/var/www/html/views/audit/auditcall.html'));
        break;
    case 2: 
		switch ($page_sub_id) {
           
            
			case 1:
                print_r(file_get_contents('/var/www/html/views/reports/report.html'));
			break;
			// case 2:
            //     print_r(file_get_contents('/var/www/html/views/reports/transactional_agent.html'));
			// break;
			// case 3:
            //     print_r(file_get_contents('/var/www/html/views/reports/sales_agent.html'));
            // break;
            // case 4:
            //     print_r(file_get_contents('/var/www/html/views/reports/voc_agent.html'));
			// break;
			// default:
            //     print_r(file_get_contents('/var/www/html/views/dashboard/dashboard.html'));
			// break;
		}        
		break;    
	case 3:
        //include_once('views/campaign/campaign_config.php');
        print_r(file_get_contents('/var/www/html/views/campaign/campaign_config.html'));
		break;	
    default:
		 echo "<script>window.location.href='/404.html'</script>";
}
//window.history.pushState({"pageTitle":''},"", '/index.php?pageid=2');
//print_r(file_get_contents('/var/www/html/views/audit/auditcall.html'));
?>