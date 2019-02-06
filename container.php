<?php

switch ($pageid) {
    case 0:
        include_once('views/dashboard/dashboard.php');
        break;
    case 1:
        //include_once('views/testd3.php');
        include_once('views/audit/auditcall.html');
        break;
    case 2: 
		switch ($page_sub_id) {
			case 1:
				include_once('views/reports/disposition_report.php');
			break;
			case 2:
				include_once('views/reports/sales_agent.php');
			break;
			case 3:
				include_once('views/reports/voc_agent.php');
			break;
			default:
				include_once('views/reports/transactional_agent.php');
			break;
		}        
		break;    
	case 3:
		include_once('views/campaign/campaign_config.php');
		break;	
    default:
		 echo "<script>window.location.href='/404.html'</script>";
}
?>