<?php
session_start();
$token = $_SESSION['token_id'];
$userid= $_SESSION['user_id']
?>
<div id='test'>

</div>
<script src="../assets/plugins/jquery/jquery.min.js"></script>
<script src="../js/getdata.js"></script>
<script>

function processApiData(result){
    console.log(result);
}
//getDataApi("https://api1.svgcolumbus.com/campaigns?user_id=<?=$userid?>&token_id=<?=$token?>",'GET','','getcampaignlist');


$.ajax({
    async : true,
    crossDomain : true,
    url : '/controller.php',
    headers : {
        "content-type":"text/html"
    },
    success : function(result){
        console.log(result);
        $('#test').html(result);
    }
});

</script>