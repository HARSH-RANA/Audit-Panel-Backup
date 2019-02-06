<?php


if($_POST['user_name'] == 'somesh' )
echo json_encode(array('status'=> true,'user_id'=>"1","user_name"=>"adminnnext","agent_name"=>"Sanjeev","email_id"=>"sanjeev.dubey@svgcolumbus.com","user_type" => "A"));
else echo json_encode(array('status'=> false,'message'=>'Invalid Username/password'));

?>