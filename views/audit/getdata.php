<?php
$pagination=isset($_POST['length']) ? $_POST['length'] : 10;
$offset=isset($_POST['start']) ? $_POST['start'] : 10;
$params=$_POST;
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : '0';
$token_id = isset($_GET['token_id']) ? $_GET['token_id'] : '0';
$campaign_id = isset($_GET['campaign_id']) ? $_GET['campaign_id'] : '0';
$disposition_id = isset($_GET['disposition_id']) ? $_GET['disposition_id'] : '0';
$sub_disposition_id = isset($_GET['sub_disposition_id']) ? $_GET['sub_disposition_id'] : '0';
$agent_id = isset($_GET['agent_id']) ? $_GET['agent_id'] : '0';
$from_date = isset($_GET['from_date']) ? $_GET['from_date'] : '0';
$to_date = isset($_GET['to_date']) ? $_GET['to_date'] : '0';
$lead_id = isset($_GET['lead_id']) ? $_GET['lead_id'] : '0';

$url="https://api1.svgcolumbus.com/audit?user_id=$user_id&token_id=$token_id&campaign_id=$campaign_id&from_date=$from_date&to_date=$to_date&pagination=".$pagination."&offset=".$offset."&disposition_id=$disposition_id&sub_disposition_id=$sub_disposition_id&agent_id=$agent_id&lead_id=$lead_id";
//var_dump($url);
$ch = curl_init();
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_URL,$url);
$result=curl_exec($ch);
$responseInfo = curl_getinfo($result);
$httpResponseCode = $responseInfo['http_code'];
if($httpResponseCode == 403) {
    exit(header("Location: login.php?page=$page"));
}
curl_close($ch);
$temp=json_decode($result, true);
$data = array();
foreach($temp["result"] as $row){
    array_push($data,array($row['call_id'],$row['customer_mobile'],$row['disposition_value'],$row['sub_disposition_value'],$row['call_date'],
    "<label class='label label-rounded label-success' data-toggle='modal' data-target='.auditmodal' data-afurl='{$row['audio_file_url']}'>Audit</label><label class='label label-rounded label-success' data-toggle='modal' data-target='.auditinfo' data-leadid='{$row['call_date']}' data-agentname='{$row['agent_name']}' data-calldate='{$row['call_date']}' data-calltype='{$row['call_type']}' data-cusno='{$row['customer_mobile']}'data-cusname='{$row['customer_name']}' data-disp='{$row['disposition_value']}' data-subdisp='{$row['sub_disposition_value']}' data-leaddate='{$row['lead_date']}'><i class='fas fa-info-circle'></i></label>"
    ));
}       
$totalRecords=$temp["query_record_count"];
$json_data = array(
    "draw"            => intval( $params['draw'] ),   
    "recordsTotal"    => intval( $totalRecords ),  
    "recordsFiltered" => intval($totalRecords),
    "data"            => $data   // total data array
    );
echo json_encode($json_data); 
