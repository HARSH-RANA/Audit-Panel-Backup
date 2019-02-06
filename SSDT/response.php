<?php


$pagination=$_POST['length'];
$offset=$_POST['start'];
$params=$_POST;
$url="https://api1.svgcolumbus.com/audit?user_id=1422&token_id=EuWYUIscC5zxqVRs2Vvff808EyU6zDCV&campaign_id=273&from_date=20180103&to_date=20190105&pagination=".$pagination."&offset=".$offset."&disposition_id=0&sub_disposition_id=0&agent_id=0&lead_id=0";

$ch = curl_init();
// Will return the response, if false it print the response
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
// Set the url
curl_setopt($ch, CURLOPT_URL,$url);
// Execute
$result=curl_exec($ch);
// Closing
curl_close($ch);

// Will dump a beauty json :3
//var_dump(json_decode($result, true));


$temp=json_decode($result, true);

//var_dump($temp["result"]);







$data = array();
    

    foreach($temp["result"] as $row){
        array_push($data,array($row['agent_name'],$row['call_date'],$row['lead_id'],$row['agent_user_name'],$row['campaign_id']));

    }
    
           
    $totalRecords=$temp["query_record_count"];
 
	$json_data = array(
        "draw"            => intval( $params['draw'] ),   
        "recordsTotal"    => intval( $totalRecords ),  
        "recordsFiltered" => intval($totalRecords),
        "data"            => $data   // total data array
        );

echo json_encode($json_data); 