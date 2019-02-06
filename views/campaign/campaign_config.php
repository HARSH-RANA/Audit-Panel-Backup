
<link href="../assets/plugins/datatables/media/css/dataTables.bootstrap4.css" rel="stylesheet">

<?php
$token = $_SESSION['token_id'];
$userid= $_SESSION['user_id'];

?>

<style>

    i{
        font-size:30px;
        cursor:pointer;
    }

    
</style>

<input type="hidden" id="hiddenCampValue"/>
 <div class="container-fluid">
        <!-- ============================================================== -->
        <!-- Bread crumb and right sidebar toggle -->
        <!-- ============================================================== -->
        <div class="row page-titles">
            <div class="col-md-5 col-8 align-self-center">
                <h3 class="text-themecolor m-b-0 m-t-0">Reporting</h3>
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="javascript:void(0)">Home</a>
                    </li>
                    <li class="breadcrumb-item active">Report</li>
                </ol>
            </div>
            
        </div>
        <!-- ============================================================== -->
        <!-- End Bread crumb and right sidebar toggle -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Start Page Content -->
        <!-- ============================================================== -->
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        
                        <h4 class="card-title">Campaigns Listing</h4> 
                            
                            
                            
                        <div class="table-responsive m-t-40">
                            <table id="campaignListing" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                
                                <tbody id="campaignDataBody">

                                   
                                </tbody>
                            </table>

                            
                        </div>
                    </div>
                </div>
                
            </div>
        </div>

<div class="modal fade bs-add-modal-lg" data-controls-modal="myModal2" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Add Question</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row" id="optionsListDivAdd">
                 </div>
               
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success waves-effect text-left" onclick="submitAddParameters()" data-dismiss="">Save</button>
                <button type="button" class="btn btn-danger waves-effect text-left" data-dismiss="modal">Cancel</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade bs-edit-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Edit Question</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <div class="row" id="optionsListDiv">
                </div>
                
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-success waves-effect text-left" onclick="submitEditParameters()" data-dismiss="">Save</button>
                <button type="button" class="btn btn-danger waves-effect text-left" data-dismiss="modal">Cancel</button>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

<div class="modal fade bs-listing-modal-lg" data-controls-modal="myModal1" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myLargeModalLabel">Questions Listing</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
            </div>
            <div class="modal-body">
                <button type="button" class="btn btn-success waves-effect text-left" onclick="initAddOptionsCounter()" data-toggle="modal" data-target=".bs-add-modal-lg" style="float:right">Add</button>
                <div class="table-responsive m-t-40">
                    <table id="questionsListing" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        
                        <tbody id="questionsListingRows">
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>

       
        <!-- ============================================================== -->
        <!-- End PAge Content -->
        <!-- ============================================================== -->
        <!-- ============================================================== -->
        <!-- Right sidebar -->
        <!-- ============================================================== -->
        <!-- .right-sidebar -->
       
        <!-- ============================================================== -->
        <!-- End Right sidebar -->
        <!-- ============================================================== -->
    </div>





 <?include_once(VIEW_PATH.'/common/commonjs.php');?>
<script src="/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>

<!-- This is data table -->
<script src="/assets/plugins/datatables/datatables.min.js"></script>

<script src="../js/getdata.js"></script>

  <!-- end - This is for export functionality only -->
  <script>
        
        
        $('#myModal1').modal({
            backdrop: 'static',
            keyboard: false
        });
        $('#myModal2').modal({
            backdrop: 'static'
        });
        $(document).on('show.bs.modal', '.modal', function () {
            var zIndex = 1040 + (10 * $('.modal:visible').length);
            $(this).css('z-index', zIndex);
            setTimeout(function() {
                $('.modal-backdrop').not('.modal-stack').css('z-index', zIndex - 1).addClass('modal-stack');
            }, 0);
        });


        function campaignResult(result){
            $.each(result['campaign_list'],function(i,d){

                $("#campaignDataBody").append('<tr><td>'+d['campaign_id']+'</td><td>'+d['campaign_name']+'</td><td><span data-toggle="modal" data-target=".bs-listing-modal-lg"><i class="mdi mdi-sale" onclick="getParameters('+d['campaign_id']+',\'nonsales\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Non-sales audit"></i></span><span data-toggle="modal" data-target=".bs-listing-modal-lg"><i class="mdi mdi-library-books" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Disposition"></i></span><span data-toggle="modal" data-target=".bs-listing-modal-lg"><i class="mdi mdi-book-open" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Funnel audit"></i></span><span data-toggle="modal" data-target=".bs-listing-modal-lg"><i class="mdi mdi-bookmark-check" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="Sales"></i></span></td></tr>');

            });
            $('#campaignListing').DataTable({});

        }
        getDataApi("https://api1.svgcolumbus.com/campaigns?user_id=<?=$userid?>&token_id=<?=$token?>",'GET','','getcampaignlist');
        

        var params=[];
        function campaignParameterResult(result){
            console.log(result);
            params=result;
            console.log(params.length);
            $("#questionsListingRows").html('');
            $.each(params,function(id,data){
                $("#questionsListingRows").append('<tr><td>'+data['parameter_title']+'</td><td><span data-toggle="modal" data-target=".bs-edit-modal-lg"><i class="mdi mdi-pencil" onclick="campaignParameterOptionsEdit('+id+')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="edit question"></i></span><span data-toggle="modal" data-target=""><i class="mdi mdi-delete" onclick="campaignParameterOptionsDelete('+id+')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="delete question"></i></span> <tr>');
            });

        }

        var OptionCounterAdd=0;
        var OptionCounterEdit=0;
        var optionsAddArray=[];
        var optionsEditArray=[];
        
        function initAddOptionsCounter(){
            $("#optionsListDivAdd").html('');
            $("#optionsListDivAdd").append(' <div class="form-group col-12"><label>Question:</label><input type="text" class="form-control" id="parameterTitleAdd" placeholder="Type question here......" name="question" required></div><div class="form-group col-12"><button type="button" onclick="addOptionsAdd()" class="btn waves-effect waves-light btn-success col-2">Add Option</button></div>');
            OptionCounterAdd=0;
            optionsAddArray=[];
        }   

        function campaignParameterOptionsEdit(index){
            OptionCounterEdit=0;
            optionsEditArray=[];
            console.log(index);
            console.log(params[index]['parameter_values']);
            $("#optionsListDiv").html('');
            $("#optionsListDiv").append('<div class="form-group col-12"><label>Question:</label><input id="id="parameterTitleEdit" type="text" class="form-control" value="'+params[index]['parameter_title']+'" name="question" required></div><div class="form-group col-12"><button type="button" onclick="addFunctionsEdit()" class="btn waves-effect waves-light btn-success col-2">Add Option</button></div>');
            $.each(params[index]['parameter_values'],function(index,value){
                console.log("value:"+value['key']);
                $("#optionsListDiv").append('<div class="col-12 row" id="optionDivEdit'+OptionCounterEdit+'"><div class="form-group col-4"><label>Option name:</label><input type="text" class="form-control" id="optionValueInputEdit'+OptionCounterEdit+'" name="yesWeightage" value="'+value['key']+'" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputEdit'+OptionCounterEdit+'" max="100" value="'+value['value']+'" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivEdit('+OptionCounterEdit+')">×</button></div>');
                optionsEditArray.push(OptionCounterEdit);
                OptionCounterEdit++;

            });     


        }

        function campaignParameterOptionsDelete(index){
            console.log(index);
        }
        
        var getParameters=function(camp_id,param){
            document.getElementById("hiddenCampValue").value = camp_id;
            
            getDataApi("https://api1.svgcolumbus.com/parameters?user_id=<?=$userid?>&token_id=<?=$token?>&campaign_id="+camp_id+"&param_type=transactional",'GET','','getparameterlist');

        }

        var removeDivAdd=function(id){
            console.log(id);
            $("#optionDivAdd"+id).remove();
            var index = optionsAddArray.indexOf(id);
            if (index > -1) {
                optionsAddArray.splice(index, 1);
            }
            console.log(optionsAddArray);

        }
        var removeDivEdit=function(id){
            console.log(id);
            $("#optionDivEdit"+id).remove();
            var index = optionsEditArray.indexOf(id);
            if (index > -1) {
                optionsEditArray.splice(index, 1);
            }
            console.log(optionsEditArray);
        }

        
        var addOptionsAdd=function(){
            $("#optionsListDivAdd").append('<div class="col-12 row" id="optionDivAdd'+OptionCounterAdd+'"><div class="form-group col-4"><label>Option name:</label><input type="text" class="form-control" id="optionValueInputAdd'+OptionCounterAdd+'" name="yesWeightage" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputAdd'+OptionCounterAdd+'" max="100" value="0" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivAdd('+OptionCounterAdd+')">×</button></div>');
            console.log(OptionCounterAdd);
            optionsAddArray.push(OptionCounterAdd);
            console.log(optionsAddArray);
            OptionCounterAdd++;
        }

        var addFunctionsEdit=function(){
            console.log('here');
            
                $("#optionsListDiv").append('<div class="col-12 row" id="optionDivEdit'+OptionCounterEdit+'"><div class="form-group col-4"><label>Option name:</label><input type="text" id="optionValueInputEdit'+OptionCounterEdit+'" class="form-control" name="yesWeightage" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputEdit'+OptionCounterEdit+'" max="100" value="0" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivEdit('+OptionCounterEdit+')">×</button></div>');
                optionsEditArray.push(OptionCounterEdit);
                console.log(OptionCounterEdit);
                console.log(optionsEditArray);
                
                OptionCounterEdit++;
                
           
        }  



        function submitAddParameters(){
            var addQuestionJson=params;
            var tempJson={};
            var tempArray=[];    
            var titleAdd=$("#parameterTitleAdd").val();
            if(titleAdd==""){
                alert("Please enter question before submit..");
                return;
            }else{
                
                
                

                if(optionsAddArray.length>0){
                    $.each(optionsAddArray,function(i,d){
                        console.log($("#optionValueInputAdd"+d).val()); 
                        console.log($("#optionWeightageInputAdd"+d).val());

                        if($("#optionValueInputAdd"+d).val()=="" || $("#optionWeightageInputAdd"+d).val()==""){
                            alert('enter option text and weighatge value..');
                            return;
                        }else{
                            tempArray.push({"key":$("#optionValueInputAdd"+d).val(),"value":$("#optionWeightageInputAdd"+d).val()});
                           
                        }


                    });
                    tempJson['parameter_values']=tempArray;
                    tempJson['parameter_title']=titleAdd;
                    addQuestionJson.push(tempJson); 

                    console.log('createdjson:'+JSON.stringify(addQuestionJson));
                    var camp_id=$("#hiddenCampValue").val();
                    console.log("https://api1.svgcolumbus.com/parameters?user_id=<?=$userid?>&token_id=<?=$token?>&campaign_id="+camp_id+"&param_type=transactional");

                    getDataApi("https://api1.svgcolumbus.com/parameters?user_id=<?=$userid?>&token_id=<?=$token?>&campaign_id="+camp_id+"&param_type=transactional",'POST',addQuestionJson,'createCampaignParameter');

                    

                }else{
                    alert('add at least one option...');
                    return;
                }

                
            }
            
            console.log('submitted');
        }

        function submitEditParameters(){ 
            var EditQuestionJson=params;
            var tempJson={};
            var tempArray=[];    
            var titleEdit=$("#parameterTitleEdit").val();
            if(titleEdit==""){
                alert("Please enter question before submit..");
                return;
            }else{
                
                
                

                if(optionsEditArray.length>0){
                    $.each(optionsEditArray,function(i,d){
                        console.log($("#optionValueInputEdit"+d).val()); 
                        console.log($("#optionWeightageInputEdit"+d).val());

                        if($("#optionValueInputEdit"+d).val()=="" || $("#optionWeightageInputEdit"+d).val()==""){
                            alert('enter option text and weighatge value..');
                            return;
                        }else{
                            tempArray.push({"key":$("#optionValueInputEdit"+d).val(),"value":$("#optionWeightageInputEdit"+d).val()});
                           
                        }


                    });
                    tempJson['parameter_values']=tempArray;
                    tempJson['parameter_title']=titleEdit;
                    EditQuestionJson.push(tempJson); 

                    console.log('createdjson:'+JSON.stringify(EditQuestionJson));
                    var camp_id=$("#hiddenCampValue").val();
                    console.log("https://api1.svgcolumbus.com/parameters?user_id=<?=$userid?>&token_id=<?=$token?>&campaign_id="+camp_id+"&param_type=transactional");

                    getDataApi("https://api1.svgcolumbus.com/parameters?user_id=<?=$userid?>&token_id=<?=$token?>&campaign_id="+camp_id+"&param_type=transactional",'POST',EditQuestionJson,'createCampaignParameter');

                    

                }else{
                    alert('add at least one option...');
                    return;
                }

                
            }
            
            console.log('submitted');
        }

        function createCampaignParameterResult(result){
            console.log('here');
            console.log(result);
        }



    </script> 