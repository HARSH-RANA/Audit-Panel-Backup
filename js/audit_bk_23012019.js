var auditJsonTransactional = "";
var auditJsonVoc = "";
var auditJsonSales = "";
var auditJsonDisposition = "";
var carName = "";
var carName = "";
$("#auditModal1").modal({
    backdrop: 'static',
    keyboard: false
});

$(".select2").select2();
var startdate = moment();
var enddate = moment();
$('#todate').val(enddate.format('YYYYMMDD'));
$('#fromdate').val(startdate.format('YYYYMMDD'));
$('#reportrange span').html(startdate.format('DD/MM/YYYY') + ' - ' + enddate.format('DD/MM/YYYY'));
$('#reportrange').daterangepicker({
    startDate: startdate,
    endDate: enddate,
    ranges: {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    }},function(start, end) {
        $('#reportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        $('#todate').val(end.format('YYYYMMDD'));
        $('#fromdate').val(start.format('YYYYMMDD'));
    }
);
// $('#audittable').DataTable({dom: 'Bfrtip',buttons: ['csv', 'excel']});     commented
$("#audittablebody").append('<tr><td colspan=6 style="text-align: center;">No record to display.</td><tr>');

//set disposition select
function dispositionResult (dispositionlist){
    if(!(jQuery.isEmptyObject(dispositionlist))){
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose...")); ;
        $.each(dispositionlist, function(key, value) {   
            //console.log(value);
            $.each(value, function(key1, value1) { 
                //console.log(value1);
            $('#disposition').append($("<option></option>").attr("value",value1.disposition_id).text(value1.disposition_value)); 
            });
        });
    }else{
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text('No Disposition Assigned')); 
    }
}
//set subdisposition select
function subdispositionResult (subdispositionlist){
    if(!(jQuery.isEmptyObject(subdispositionlist))){
        $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose...")); ;
        $.each(subdispositionlist, function(key, value) {   
            //console.log(value);
            $.each(value, function(key1, value1) { 
                //console.log(value1);
            $('#subdisposition').append($("<option></option>").attr("value",value1.sub_disposition_id).text(value1.sub_disposition_value)); 
            });
        });
    }else{
        $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text('No Disposition Assigned')); 
    }
}
////set agent select
function agentResult (agentlist){
    if(!(jQuery.isEmptyObject(agentlist))){
        $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose...")); ;
        $.each(agentlist, function(key, value) {   
            //console.log(value);
            $.each(value, function(key1, value1) { 
                //console.log(value1);
            $('#agent').append($("<option></option>").attr("value",value1.agent_id).text(value1.agent_name)); 
            });
        });
    }else{
        $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text('No Disposition Assigned')); 
    }
}
//set campaign select
function campaignResult(camplist){
    if(!(jQuery.isEmptyObject(camplist))){
        $('#project').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Project..."));
        $.each(camplist, function(key, value) {   
            // console.log(value);
            $.each(value, function(key1, value1) { 
            $('#project').append($("<option></option>").attr("value",value1.campaign_id).text(value1.campaign_name)); 
            });
        });
    }else{
        $('#project').find('option').remove().end().append($("<option></option>").attr("value",0).text('No Campaign Assigned')); 
    }
}
//Fill table data from audit list
function auditResult(auditlist){
    //console.log(auditlist.result);
    if(auditlist.result.length > 0){
        $("#audittable tbody").html('');
        var tablebody = '';
        auditlist.result.forEach(function(audit) {
            tablebody += "<tr>";
            tablebody +="<td>"+audit.call_id+"</td><td>"+audit.customer_mobile+"</td><td>"+audit.disposition_value+"</td><td>"+audit.sub_disposition_value+"</td><td>"+audit.call_date+"</td><td><label class='label label-rounded label-success' data-callid='"+audit.call_id+"' data-toggle='modal' data-target='.auditmodal'>Audit</label><label class='label label-rounded label-success' data-toggle='modal' data-target='.auditinfo' data-leadid='"+audit.lead_id+"' data-agentname='"+audit.agent_name+"' data-calldate='"+audit.call_date+"' data-calltype='"+audit.call_type+"' data-cusno='"+audit.customer_mobile+"'data-cusname='"+audit.customer_name+"' data-disp='"+audit.disposition_value+"' data-subdisp='"+audit.sub_disposition_value+"' data-leaddate='"+audit.lead_date+"'><i class='fas fa-info-circle'></i></label></td>"; 
            tablebody += "</tr>";
        });
        $("#audittable").DataTable().destroy();
        $("#audittable tbody").html(tablebody);
        $('#audittable').DataTable({dom: 'Bfrtip',buttons: ['csv', 'excel']});
    }else{

    }
       
}

//set campaign data
getDataApi("https://api1.svgcolumbus.com/campaigns?user_id="+userid+"&token_id="+token,'GET','','getcampaignlist');

//onchange project 
/*
$('#project').on('change', function() {
    if( this.value > 0 ){
        $("#audittable").DataTable().destroy();
        var campaignid = this.value;
        var fromdate = $('#fromdate').val();
        var todate = $('#todate').val();
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Disposition...")); 
        $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition...")); 
        $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition..."));
        $('#leadid').val('');   
        $('#audittable').DataTable({
            "bProcessing": true,
            "serverSide": true,
            "ajax":{
                url : "views/audit/getdata.php?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id=0&sub_disposition_id=0&agent_id=0&from_date="+fromdate+"&to_date="+todate+"&lead_id=0",
                type: "POST",  // type of method  , by default would be get
                error: function(){  // error handling code
                    $("#audittable").css("display","none");
                }
             }
        }); 
        //$("#audittable tbody").html(tablebody);
        //$('#audittable').DataTable({dom: 'Bfrtip',buttons: ['csv', 'excel']}); 
         //getDataApi("https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id=0&sub_disposition_id=0&agent_id=0&from_date="+fromdate+"&to_date="+todate+"&pagination=10&offset=0&lead_id=0",'GET','','getauditlist');
    
    }
});*/


var offset=1;
var getAuditTableData=function(page){
    if(page!=undefined){
        if(page==0 || page ==-1){
            offset=(parseInt(page)==0)?(offset-1):(offset+1); 
        }else{
            offset=parseInt(page); 

        }
    }
    
    var campaignid = $("#project").val();
    var fromdate = $('#fromdate').val();
    var todate = $('#todate').val();
    var recordsPPPage=$("#auditTablePPRecords").val();

    var disposition = $('#disposition').val() != '' ? $('#disposition').val() : 0;
    var subdisposition = $('#subdisposition').val() != '' ? $('#subdisposition').val() : 0;
    var agent = $('#agent').val() != '' ? $('#agent').val() : 0;
    var leadid = $('#leadid').val() != '' ? $('#leadid').val() : 0;

    $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Disposition...")); 
    $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition...")); 
    $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition..."));
    $('#leadid').val('');   
    var totalRecords=0;
    var dataRowCount=0;
    $.get("https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id="+disposition+"&sub_disposition_id="+subdisposition+"&agent_id="+agent+"&from_date="+fromdate+"&to_date="+todate+"&pagination="+recordsPPPage+"&offset="+(offset-1)+"&lead_id="+leadid, function(data, status){
        dataRowCount=data['result'].length;
        if(status=='success' && data['result'].length>0){
            totalRecords=data['query_record_count'];

            $("#audittablebody").html('');
            var temp_leadId=0
            $.each(data['result'],function(index,value){
                if(index==0){
                    temp_leadId=value['lead_id'];
                }
                
                var borderStyle=(temp_leadId!=value['lead_id'])?"border-top: 2px dashed #1e88e5;":"";
                $("#audittablebody").append('<tr style="'+ borderStyle +'"><td>'+value['call_id']+'</td>'+'<td>'+value['customer_mobile']+'</td>'+'<td>'+value['disposition_value']+'</td>'+'<td>'+value['sub_disposition_value']+'</td>'+'<td>'+value['call_date']+'</td>'+'<td>'+'<label class="label label-rounded label-success" data-toggle="modal" data-target=".auditmodal" data-callid='+value['call_id']+' data-afurl='+value['audio_file_url']+'>Audit</label><label class="label label-rounded label-success" data-toggle="modal" data-target=".auditinfo" data-leadid='+value['lead_id']+' data-agentname='+value['agent_name']+' data-calldate='+value['call_date']+' data-calltype='+value['call_type']+' data-cusno='+value['customer_mobile']+' data-cusname='+value['customer_name']+' data-disp='+value['disposition_value']+' data-subdisp='+value['sub_disposition_value']+' data-leaddate='+value['lead_date']+'><i class="fas fa-info-circle"></i></label>'+'</td></tr>');
                temp_leadId=value['lead_id'];
            });
            if(data['result'].length){
                
                if ($('#auditFooterPagination').length) {
                    $('#auditFooterPagination').remove();
                } 
                if ($('#auditfooter').length) {
                    $('#auditfooter').remove();
                } 

                var pageCount=Math.ceil(totalRecords/recordsPPPage);
                //pageCount=13;
                if(offset==1){
                    var disableClass=(offset==1)?"disabled":"";
                    var paginationHtml='<div class="dataTables_paginate paging_simple_numbers" id="auditFooterPagination" style="float:right"><ul class="pagination"><li class="paginate_button page-item previous '+disableClass+'" id="campaignListing_previous"><a onclick="getAuditTableData(0)" aria-controls="campaignListing" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>';

                    if(pageCount<10){
                        for(i=1;i<=pageCount;i++){
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                    }else{
                        
                        for(i=1;i<5;i++){
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                        paginationHtml+='<li class="paginate_button page-item"><a aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">...</a></li>';

                        for(i=pageCount-3;i<=pageCount;i++){ 
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                    }
                    
                    var disableClass=(offset==pageCount)?"disabled":"";
                    paginationHtml+='<li class="paginate_button page-item next '+disableClass+'" id="campaignListing_next"><a onclick="getAuditTableData(-1)" aria-controls="campaignListing" data-dt-idx="4" tabindex="0" class="page-link">Next</a></li></ul></div>';
                }else{ 
                    var disableClass=(offset==1)?"disabled":"";
                    var paginationHtml='<div class="dataTables_paginate paging_simple_numbers" id="auditFooterPagination" style="float:right"><ul class="pagination"><li class="paginate_button page-item previous '+disableClass+'" id="campaignListing_previous"><a onclick="getAuditTableData(0)" aria-controls="campaignListing" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>';
                    if(pageCount<10){
                        for(i=1;i<=pageCount;i++){
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                        var disableClass=(offset==pageCount)?"disabled":"";
                        paginationHtml+='<li class="paginate_button page-item next '+disableClass+'" id="campaignListing_next"><a onclick="getAuditTableData(-1)" aria-controls="campaignListing" data-dt-idx="4" tabindex="0" class="page-link">Next</a></li></ul></div>';
                    }else{
                        var diffPage=pageCount-offset;
                    if(diffPage>=9){ 
                        for(i=offset-1;i<offset+3;i++){
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                        paginationHtml+='<li class="paginate_button page-item"><a aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">...</a></li>';

                        for(i=pageCount-3;i<=pageCount;i++){ 
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                        var disableClass=(offset==pageCount)?"disabled":"";
                        paginationHtml+='<li class="paginate_button page-item next '+disableClass+'" id="campaignListing_next"><a onclick="getAuditTableData(-1)" aria-controls="campaignListing" data-dt-idx="4" tabindex="0" class="page-link">Next</a></li></ul></div>';
                    }else{
                        for(i=1;i<5;i++){
                            var activeClass=(offset==i)?"active":"";
                            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                        }
                        paginationHtml+='<li class="paginate_button page-item"><a aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">...</a></li>';
                        if(offset==pageCount){
                            for(i=pageCount-3;i<=pageCount;i++){ 
                                var activeClass=(offset==i)?"active":"";
                                paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                            }
                        }else{
                            for(i=offset-2;i<=offset+1;i++){ 
                                var activeClass=(offset==i)?"active":"";
                                paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
                            }
                        }
                        var disableClass=(offset==pageCount)?"disabled":"";
                        paginationHtml+='<li class="paginate_button page-item next '+disableClass+'" id="campaignListing_next"><a onclick="getAuditTableData(-1)" aria-controls="campaignListing" data-dt-idx="4" tabindex="0" class="page-link">Next</a></li></ul></div>';

                        }

                    }
                    
                    
                    
                    
                    

                }
                
                
               
                
                
                var pageInfo=(offset-1)*recordsPPPage+1;
                $("#audittable").after('<div class="container row"><div class="col-md-6" id="auditfooter"><p>showing '+ pageInfo +' to '+ (pageInfo+dataRowCount-1) + ' of '+totalRecords+' entries</p></div><div class="col-md-6">'+ paginationHtml +'</div></div>'); 
                
            }else{
                $("#audittablebody").append('<tr><td colspan=6 style="text-align: center;">No record to display.</td><tr>'); 

            }
            
        }else{
            if ($('#auditFooterPagination').length) {
                $('#auditFooterPagination').remove();
            } 
            if ($('#auditfooter').length) {
                $('#auditfooter').remove();
            } 
            $("#audittablebody").html('').append('<tr><td colspan=6 style="text-align: center;">No record to display.</td><tr>'); 
        }
    });
    
    
        
    
    //$("#audittable tbody").html(tablebody);
    //$('#audittable').DataTable({dom: 'Bfrtip',buttons: ['csv', 'excel']}); 
        //getDataApi("https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id=0&sub_disposition_id=0&agent_id=0&from_date="+fromdate+"&to_date="+todate+"&pagination=10&offset=0&lead_id=0",'GET','','getauditlist');

}



//onchange disposition 
$('#disposition').on('change', function() {
    if( this.value > 0 && $('#project').val() > 0){            
        var campaign_id = $('#project').val();
        getDataApi("https://api1.svgcolumbus.com/sub_dispositions?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&disposition_id="+this.value,'GET','','getsubdispositionlist');
    }
});
//get audit list
$('#submit').on('click', function() {
    if($('#project').val() > 0){   
        $("#audittable").DataTable().destroy();         
        var campaignid = $('#project').val();
        var disposition = $('#disposition').val() != '' ? $('#disposition').val() : 0;
        var subdisposition = $('#subdisposition').val() != '' ? $('#subdisposition').val() : 0;
        var agent = $('#agent').val() != '' ? $('#agent').val() : 0;
        var leadid = $('#leadid').val() != '' ? $('#leadid').val() : 0;
        var fromdate = $('#fromdate').val();
        var todate = $('#todate').val();
        $('#audittable').DataTable({
            "bProcessing": true,
            "serverSide": true,
            "ajax":{
                url : "views/audit/getdata.php?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id="+disposition+"&sub_disposition_id="+subdisposition+"&agent_id="+agent+"&from_date="+fromdate+"&to_date="+todate+"&lead_id="+leadid,
                type: "POST",  // type of method  , by default would be get
                error: function(){  // error handling code
                    $("#audittable").css("display","none");
                }
             }
           }); 
        //getDataApi("https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&disposition_id="+disposition+"&sub_disposition_id="+subdisposition+"&agent_id="+agent+"&from_date="+fromdate+"&to_date="+todate+"&pagination=10&offset=0&lead_id=0",'GET','','getauditlist');
    }else{
        $.toast({
            heading: 'No Project Selected',
            text: 'Please select a project',
            position: 'mid-center',
            loaderBg:'#ff6849',
            icon: 'info',
            hideAfter: 3000, 
            stack: 6
        });
    } 
});

function createAuditModelHtml(audit_type,parameter) {
    var paramhtml = '';
    var i = 0;
    if(parameter.parameters.length > 0 )  {
       parameter.parameters.forEach(function(parameter1){
        var paramtype = typeof parameter1.parameter_type !== 'undefined' ? parameter1.parameter_type : 'radio';
        paramhtml += '<h6 class="card-title">'+parameter1.parameter_title+'</h6><div data-title="'+parameter1.parameter_title+'" data-intype="'+paramtype+'" class="demo-radio-button">';
        
        var z=0;
        switch (paramtype) {
            case 'radio':                
                parameter1.parameter_values.forEach(options => {
                    var checked = (options.value == parameter1.parameter_selected_value) ? 'checked' : '';
                    paramhtml += '<input name="'+audit_type+'_'+parameter.parameter_type+'_'+i+'" type="radio" value="'+options.value+'" id="'+audit_type+'_'+parameter.parameter_type+'_'+i+'_'+z+'"  '+checked+' required/><label for="'+audit_type+'_'+parameter.parameter_type+'_'+i+'_'+z+'">'+options.key+'</label>';
                    z++; 
                });
                break;
            case 'checkbox':
                break;
            case 'textbox':
            case 'text':
                var selected = (parameter1.parameter_selected_value != '-1') ? parameter1.parameter_selected_value : '';
                paramhtml += '<textarea class="form-control" name="'+audit_type+'_'+parameter.parameter_type+'_'+i+'" rows="3" id="'+audit_type+'_'+parameter.parameter_type+'_'+i+'">'+selected+'</textarea>';
                z++
                break;
            default:
              console.log('Not a valid input type');
          }
            /*paramhtml += '<input name="transactional_dynamic_group_'+i+'" type="radio" value="'+options.value+'" id="transactional_dynamic_group_'+i+'_'+z+'" + boolCond +/><label for="transactional_dynamic_group_'+i+'_'+z+'">'+options.key+'</label>'; 

            if(parameter.parameter_selected_value==options.value){
                console.log('here:'+"#transactional_dynamic_group_"+i+'_'+z);
                idsArray.push('transactional_dynamic_group_'+i+'_'+z);
            }*/   
       i++;        
       });
       $('#'+audit_type+'_'+parameter.parameter_type).html(paramhtml);
    }else{
        $('#'+audit_type+'_'+parameter.parameter_type).html('No Parameters are set for the campaign.');
    }
}


//campaignParameterResulttransactional
function campaignParameterResult(parameterresult){ 
    if(parameterresult.audit_type == 'transactional') auditJsonTransactional = parameterresult;
    if(parameterresult.audit_type == 'voc') auditJsonVoc = parameterresult;
    if(parameterresult.audit_type == 'sales') auditJsonSales = parameterresult;
    if(parameterresult.audit_type == 'disposition') auditJsonDisposition = parameterresult;
    if(parameterresult.parameters.length > 0 )  {
        parameterresult.parameters.forEach(function(parameter) {
            $('#'+parameterresult.audit_type+'_'+parameter.parameter_type).html('');
            createAuditModelHtml(parameterresult.audit_type,parameter);
        });
    }else{
        alert('No Parameters set for the campaign.');
    }
}
//campaignParameterResultvoc
function campaignParameterResultvoc(parameterresult){
    $('#voc_dynamic').html('');
    var paramhtml = '';
    var i = 0;
    parameterresult.forEach(function(parameter) {
       paramhtml += '<h6 class="card-title">'+parameter.parameter_title+'</h6><div data-title="'+parameter.parameter_title+'" class="demo-radio-button">';
       var z=0;       
       parameter.parameter_values.forEach(function(options){
            paramhtml += '<input name="voc_dynamic_group_'+i+'" type="radio" value="'+options.value+'" id="voc_dynamic_group_'+i+'_'+z+'"/><label for="voc_dynamic_group_'+i+'_'+z+'">'+options.key+'</label>'; 
            z++;           
       });
       i++;
       paramhtml += '</div>';
       //$("input[name='transactional_dynamic_group_0']:checked").val();
    });
    $('#voc_dynamic').html(paramhtml);
}
//campaignParameterResultsales
function campaignParameterResultsales(parameterresult){
    $('#sales_dynamic').html('');
    var paramhtml = '';
    var i = 0
    parameterresult.forEach(function(parameter) {
       paramhtml += '<h6 class="card-title">'+parameter.parameter_title+'</h6><div data-title="'+parameter.parameter_title+'" class="demo-radio-button">';
       var z=0;       
       parameter.parameter_values.forEach(function(options){
            paramhtml += '<input name="sales_dynamic_group_'+i+'" type="radio" value="'+options.value+'" id="sales_dynamic_group_'+i+'_'+z+'"/><label for="transactional_dynamic_group_'+i+'_'+z+'">'+options.key+'</label>'; 
            z++;           
       });
       i++;
       paramhtml += '</div>';
       //$("input[name='transactional_dynamic_group_0']:checked").val();
    });
    $('#sales_dynamic').html(paramhtml);
}
//Hardcoded For Now(Camiagnid and parameter type)
$('.auditmodal').on('show.bs.modal', function (e) {
    var button = $(e.relatedTarget);
    var callid = button.data('callid');
    var campaign_id = $('#project').val();
    $('.customtab2 a[href="#transactional"]').tab('show');
    $('.tabs-vertical a[href="#transactional_dynamic"]').tab('show');
    if(button.data('afurl') != '' && callid != ''){
        $("#model_call_id").val(callid);
        $("#call_rec").attr("src", button.data('afurl'));
        getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&call_id="+callid+"&audit_type=transactional",'GET','','getparameterlist');
        getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&call_id="+callid+"&audit_type=voc",'GET','','getparameterlist');
        getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&call_id="+callid+"&audit_type=sales",'GET','','getparameterlist');
        getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&call_id="+callid+"&audit_type=disposition",'GET','','getparameterlist');
    }else{
        alert('No audio file Exists');
    }
});
$('.auditmodal').on('hidden.bs.modal', function (e) {   
    auditJsonTransactional = '';
    auditJsonVoc = '';
    auditJsonSales = '';
    auditJsonDisposition = '';
})


 $( "#filter_btn" ).click(function() { 
     //console.log($('#project').val());
     var campaignid = $('#project').val();
     if($('#project').val() > 0){
        getDataApi("https://api1.svgcolumbus.com/dispositions?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid,'GET','','getdispositionlist');
        getDataApi("https://api1.svgcolumbus.com/agents?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid,'GET','','getagentlist');
        $('.bs-example-modal-lg').modal('show');
    }else{
        alert('Please select campaign');
    }
  });

  $('.auditinfo').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget) // Button that triggered the modal
    var infohtml = '<li>Lead Id <span class="text-muted">'+button.data('leadid')+'</span></li><li>Agent Name <span class="text-muted">'+button.data('agentname')+'</span></li>';
    infohtml += '<li>Call Date<span class="text-muted">'+button.data('calldate')+'</span></li><li>Call Type<span class="text-muted">'+button.data('calltype')+'</span></li>';
    infohtml += '<li>Customer Mobile<span class="text-muted">'+button.data('cusno')+'</span></li><li>Customer Name <span class="text-muted">'+button.data('cusname')+'</span></li>';
    infohtml += '<li>Disposition <span class="text-muted">'+button.data('disp')+'</span></li><li>Sub Disposition <span class="text-muted">'+button.data('subdisp')+'</span></li>';
    infohtml += '<li>Lead Date<span class="text-muted">'+button.data('leaddate')+'</span></li>';
    $(this).find('.modal-body .feeds').html(infohtml);
  })

  function changevalue( value, update , type,audittype ) {
    if(audittype == 'transactional'){
        for (var i in auditJsonTransactional.parameters) {
        if (auditJsonTransactional.parameters[i].parameter_type == type) {                          
            //console.log(auditJsonTransactional.parameters[i].parameters);
            for (var j in auditJsonTransactional.parameters[i].parameters) {
                //console.log('reached');
                //console.log(auditJsonTransactional.parameters[i].parameters[j])
                if (auditJsonTransactional.parameters[i].parameters[j].parameter_title == value) {
                    auditJsonTransactional.parameters[i].parameters[j].parameter_selected_value = update;
                }
            }
            break;
        }
        }
    }
    if(audittype == 'voc'){
        for (var i in auditJsonVoc.parameters) {
        if (auditJsonVoc.parameters[i].parameter_type == type) {                          
            //console.log(auditJsonTransactional.parameters[i].parameters);
            for (var j in auditJsonVoc.parameters[i].parameters) {
                //console.log('reached');
                //console.log(auditJsonTransactional.parameters[i].parameters[j])
                if (auditJsonVoc.parameters[i].parameters[j].parameter_title == value) {
                    auditJsonVoc.parameters[i].parameters[j].parameter_selected_value = update;
                }
            }
            break;
        }
        }
    }
    if(audittype == 'sales'){
        for (var i in auditJsonSales.parameters) {
        if (auditJsonSales.parameters[i].parameter_type == type) {                          
            //console.log(auditJsonTransactional.parameters[i].parameters);
            for (var j in auditJsonSales.parameters[i].parameters) {
                //console.log('reached');
                //console.log(auditJsonTransactional.parameters[i].parameters[j])
                if (auditJsonSales.parameters[i].parameters[j].parameter_title == value) {
                    auditJsonSales.parameters[i].parameters[j].parameter_selected_value = update;
                }
            }
            break;
        }
        }
    }
    if(audittype == 'disposition'){
        for (var i in auditJsonDisposition.parameters) {
        if (auditJsonDisposition.parameters[i].parameter_type == type) {                          
            //console.log(auditJsonTransactional.parameters[i].parameters);
            for (var j in auditJsonDisposition.parameters[i].parameters) {
                //console.log('reached');
                //console.log(auditJsonTransactional.parameters[i].parameters[j])
                if (auditJsonDisposition.parameters[i].parameters[j].parameter_title == value) {
                    auditJsonDisposition.parameters[i].parameters[j].parameter_selected_value = update;
                }
            }
            break;
        }
        }
    }
 } 

function loopauditinput(divid,type,audittype) {
    var BreakException = {};
    try {
        $("#"+divid+" .demo-radio-button").each(function(i){     
            var paramtitle = $(this).data('title');
            if($(this).data('intype') == 'radio'){
                if($("input:radio[name='"+divid+"_"+i+"']").is(':checked')) { 
                    changevalue( paramtitle, $("input:radio[name='"+divid+"_"+i+"']:checked").val(), type,audittype);
                }else{
                    throw BreakException;
                }
                    
            }else if($(this).data('intype') == 'text' || $(this).data('intype') == 'textbox'){
                changevalue( paramtitle, $("textarea[name='"+divid+"_"+i+"']").val(), type,audittype);
            }
        });
    }catch (e) {
        if (e == BreakException) error = true; alert('Please Fill all Questions');
    }
}
function postCampaignParameterResult(parameterresult){
    //console.log(parameterresult);
    if(parameterresult.title = "Audit added/updated successfully.") alert('Audit Updated successfully');
    else alert('Some error occured');
}
var error = false;
  $( "#save_audit_params" ).click(function(e) {
    var callid = $("#model_call_id").val();
    error = false;
    if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Transactional"){
        //console.log(auditJsonTransactional);
        
        loopauditinput('transactional_dynamic','dynamic','transactional')
        loopauditinput('transactional_static','static','transactional')
        if(!error)  getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id=273&call_id="+callid+"&audit_type=transactional",'POST',auditJsonTransactional,'postparameterlist');
        //console.log(auditJsonTransactional)
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Sales"){
        loopauditinput('sales_dynamic','dynamic','sales')
        loopauditinput('sales_static','static','sales')     
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id=273&call_id="+callid+"&audit_type=sales",'POST',auditJsonSales,'postparameterlist');
        //console.log(auditJsonSales)   
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Voc"){
        loopauditinput('voc_dynamic','dynamic','voc')
        loopauditinput('voc_static','static','voc')
        loopauditinput('voc_dynamic_csat','dynamic_csat','voc')
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id=273&call_id="+callid+"&audit_type=voc",'POST',auditJsonVoc,'postparameterlist');
        //console.log(auditJsonVoc)
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Disposition"){
        loopauditinput('disposition_static','static','disposition')
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id=273&call_id="+callid+"&audit_type=disposition",'POST',auditJsonDisposition,'postparameterlist');
        //console.log(auditJsonDisposition)
    }
 });