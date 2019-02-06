<?php 
?>

<html>

<head>

    <link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/r/dt/dt-1.10.9/datatables.min.css"/>
    
    <script type="text/javascript" charset="utf8" src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.8.2.min.js"></script>
	 
     <script type="text/javascript" src="https://cdn.datatables.net/r/dt/dt-1.10.9/datatables.min.js"></script>
 
    

</head>
<body>
<div class="container">
	    <div class="">
	    
	        	<div class="">
					<table id="employee_grid" class="display" width="100%" cellspacing="0">
			        <thead>
			            <tr>
			                <th>Agent name</th>
			                <th>Call date</th>
                             <th>Lead id</th>
                             <th>agent_user_name</th>
                             <th>campaign_id</th>
                             
			            </tr>
			        </thead>
			       
			    </table>
			</div>
	 	</div>

	</div>
</body>


</html>

 


<script>
$( document ).ready(function() {
	$('#employee_grid').DataTable({
        "aLengthMenu": [[10,20,50], [10,20,50]],
        "iDisplayLength": 10,
		 "bProcessing": true,
         "serverSide": true,
         "ajax":{
            url :"response.php", // json datasource
            type: "POST",  // type of method  , by default would be get
            error: function(){  // error handling code
              $("#employee_grid_processing").css("display","none");
            }
          }
        });   
});  

</script>
