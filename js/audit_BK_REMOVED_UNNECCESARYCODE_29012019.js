var auditJsonTransactional = "";
var auditJsonVoc = "";
var auditJsonSales = "";
var auditJsonDisposition = "";
var projectchange = false;
$("#auditModal1").modal({
    backdrop: 'static',
    keyboard: false
});

$(".select2").select2({ width: '100%' });
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
        getAuditTableData();
    }
);
$("#audittablebody").append('<tr><td colspan=6 style="text-align: center;">No record to display.</td><tr>');

//set disposition select
function dispositionResult (dispositionlist){
    if(!(jQuery.isEmptyObject(dispositionlist))){
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Disposition")); ;
        $.each(dispositionlist, function(key, value) {   
            $.each(value, function(key1, value1) { 
            $('#disposition').append($("<option></option>").attr("value",value1.disposition_id).text(value1.disposition_value)); 
            });
        });
        $('#disposition').trigger('change');
    }else{
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text('No Disposition Assigned')); 
    }
}
//set subdisposition select
function subdispositionResult (subdispositionlist){
    if(!(jQuery.isEmptyObject(subdispositionlist))){
        $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition")); ;
        $.each(subdispositionlist, function(key, value) {   
            $.each(value, function(key1, value1) { 
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
        $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Agent")); ;
        $.each(agentlist, function(key, value) { 
            $.each(value, function(key1, value1) { 
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
        $('#project').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Project"));
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
    if(auditlist.result.length > 0){
        $("#audittable tbody").html('');
        var tablebody = '';
        auditlist.result.forEach(function(audit) {
            tablebody += "<tr>";
            tablebody +="<td>"+audit.call_id+"</td><td>"+audit.customer_mobile+"</td><td>"+audit.disposition_value+"</td><td>"+audit.sub_disposition_value+"</td><td>"+audit.call_date+"</td><td><label class='label label-success mr-1' data-callid='"+audit.call_id+"' data-toggle='modal' data-target='.auditmodal'>Audit</label><label class='label label-success' data-toggle='modal' data-target='.auditinfo' data-leadid='"+audit.lead_id+"' data-agentname='"+audit.agent_name+"' data-calldate='"+audit.call_date+"' data-calltype='"+audit.call_type+"' data-cusno='"+audit.customer_mobile+"'data-cusname='"+audit.customer_name+"' data-disp='"+audit.disposition_value+"' data-subdisp='"+audit.sub_disposition_value+"' data-leaddate='"+audit.lead_date+"'><i class='fas fa-info-circle'></i></label></td>"; 
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
$('#project').on('change', function() {
    if( this.value > 0 ){
        $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Disposition")); 
        $('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition")); 
        $('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition"));
        $('#leadid').val('');  
        projectchange = true; 
    }
});


var offset=1;
function handleAjaxErrorAuditTable(jqXHR, textStatus, errorThrown) {
    console.log('status:'+jqXHR.status);
    if (jqXHR.status == 403) {
        window.location = "https://audit.svgcolumbus.com/logout.php?err=Session Expired";
      } else if (jqXHR.status == 400) {
            alert('Invalid data');
      } else if(jqXHR.status == 500) {
            alert('Server Error!!!');
      }else if(jqXHR.status == 0) {
        alert('Server Error!!!');
    } 
}
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

    //$('#disposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Disposition...")); 
    //$('#subdisposition').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition...")); 
    //$('#agent').find('option').remove().end().append($("<option></option>").attr("value",0).text("Choose Sub Disposition..."));
    //$('#leadid').val('');   
    var totalRecords=0;
    var dataRowCount=0;
    let url="https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id="+disposition+"&sub_disposition_id="+subdisposition+"&agent_id="+agent+"&from_date="+fromdate+"&to_date="+todate+"&pagination="+recordsPPPage+"&offset="+(offset-1)+"&lead_id="+leadid+"&fetch_type=view";
    $.ajax({
        async : true,
        crossDomain : true,
        url : url,
        method : 'GET',
        success : function(data, status){
            //console.log(data);
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
                $("#audittablebody").append('<tr style="'+ borderStyle +'"><td>'+value['call_id']+'</td>'+'<td>'+value['customer_mobile']+'</td>'+'<td>'+value['disposition_value']+'</td>'+'<td>'+value['sub_disposition_value']+'</td>'+'<td>'+value['call_date']+'</td>'+'<td>'+'<label class="label label-success mr-1" data-toggle="modal" data-target=".auditmodal" data-callid="'+value['call_id']+'" data-afurl="'+value['audio_file_url']+'">Audit</label><label class="label label-success" data-toggle="modal" data-target=".auditinfo" data-leadid='+value['lead_id']+' data-agentname="'+value['agent_name']+'" data-calldate="'+value['call_date']+'" data-calltype="'+value['call_type']+'" data-cusno="'+value['customer_mobile']+'" data-cusname="'+value['customer_name']+'" data-disp="'+value['disposition_value']+'" data-subdisp="'+value['sub_disposition_value']+'" data-leaddate="'+value['lead_date']+'"><i class="fas fa-info-circle"></i></label>'+'</td></tr>');
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
        },
        error: handleAjaxErrorAuditTable
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

function createAuditModelHtml(audit_type,parameter) {
    var paramhtml = '';
    var i = 0;
    if(parameter.parameters.length > 0 )  {
       parameter.parameters.forEach(function(parameter1){
        var paramtype = typeof parameter1.parameter_type !== 'undefined' ? parameter1.parameter_type : 'radio';
        paramhtml += '<h5 class="">'+parameter1.parameter_title+'</h5><div data-title="'+parameter1.parameter_title+'" data-intype="'+paramtype+'" class="demo-radio-button">';
        
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
                paramhtml += '<textarea class="form-control" name="'+audit_type+'_'+parameter.parameter_type+'_'+i+'" rows="2" id="'+audit_type+'_'+parameter.parameter_type+'_'+i+'">'+selected+'</textarea>';
                z++
                break;
            default:
              console.log('Not a valid input type');
          }
          paramhtml +='<hr class="mt-0"></div>';
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
        if(projectchange)  getDataApi("https://api1.svgcolumbus.com/dispositions?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid,'GET','','getdispositionlist');
        if(projectchange) getDataApi("https://api1.svgcolumbus.com/agents?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid,'GET','','getagentlist');
        $('.bs-example-modal-lg').modal('show');
        projectchange = false;
    }else{
        //alert('Please select campaign');
        $.toast({
            heading: 'No Project Selected',
            text: 'Please select campaign',
            position: 'top-center',
            loaderBg:'#ff6849',
            icon: 'error',
            hideAfter: 3000, 
            stack: 6
        });
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
//Edit audit json from audit modal
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
        if (e == BreakException) error = true; {
            var errorhtml = '<div class="alert alert-danger"> <i class="ti-user"></i>Please Fill All Fields.<button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">×</span></button></div>';
            $('.tabs-vertical a[href="#'+divid+'"]').tab('show');
            $("#"+divid).prepend(errorhtml);
            //alert('Please Fill all Questions');
            $.toast({
                heading: 'Fill all Inputs',
                text: 'Please Fill all Questions',
                position: 'top-center',
                loaderBg:'#ff6849',
                icon: 'error',
                hideAfter: 3000, 
                stack: 6
            });
        }
    }
}

//callback for Save aaaudit results 
function postCampaignParameterResult(parameterresult){
    //console.log(parameterresult);
    if(parameterresult.title = "Audit added/updated successfully.") {
        $.toast({
            heading: 'Success',
            text: 'Audit updated successfully.',
            position: 'top-center',
            loaderBg:'#ff6849',
            icon: 'info',
            hideAfter: 3000, 
            stack: 6
        });
    }
    else {
        $.toast({
            heading: 'Failed',
            text: 'Some Error Occured',
            position: 'top-center',
            loaderBg:'#ff6849',
            icon: 'error',
            hideAfter: 3000, 
            stack: 6
        });
    }
}
//Save aaaudit results 
var error = false;
  $( "#save_audit_params" ).click(function(e) {
    var callid = $("#model_call_id").val();
    var campaignid = $('#project').val();
    error = false;
    if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Transactional"){        
        loopauditinput('transactional_dynamic','dynamic','transactional')
        if(!error) loopauditinput('transactional_static','static','transactional')
        if(!error)  getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&call_id="+callid+"&audit_type=transactional",'POST',auditJsonTransactional,'postparameterlist');
        //console.log(auditJsonTransactional)
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Sales"){
        loopauditinput('sales_dynamic','dynamic','sales')
        if(!error) loopauditinput('sales_static','static','sales')     
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&call_id="+callid+"&audit_type=sales",'POST',auditJsonSales,'postparameterlist');
        //console.log(auditJsonSales)   
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Voc"){
        loopauditinput('voc_dynamic','dynamic','voc')
        if(!error) loopauditinput('voc_static','static','voc')
        if(!error) loopauditinput('voc_dynamic_csat','dynamic_csat','voc')
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&call_id="+callid+"&audit_type=voc",'POST',auditJsonVoc,'postparameterlist');
        //console.log(auditJsonVoc)
    }else if($.find("ul.customtab2 li a.active span.hidden-xs-down")[0].textContent=="Disposition"){
        if(!error) loopauditinput('disposition_static','static','disposition')
        if(!error) getDataApi("https://api1.svgcolumbus.com/audit_entry?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&call_id="+callid+"&audit_type=disposition",'POST',auditJsonDisposition,'postparameterlist');
        //console.log(auditJsonDisposition)
    }
 });


 //Download Audit call list
 function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel, type) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;    
    var CSV = '';    
    //Set Report title in first row or line
    //CSV += ReportTitle + '\r\n\n';
    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1); 
        row = row.replace(/,\s*$/, "");

        //append Label row with line break
        CSV += row + '\r\n';
    }    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }
        row.slice(0, row.length - 1);   
        row = row.replace(/,\s*$/, "");     
        //add a line break after each row
         CSV += row + '\r\n';
    }
    if (CSV == '') {        
        alert("Invalid data");
        return;
    }       
    //Generate a file name
    var fileName = "Audit_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    if(type == 'csv') var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    else {
        let uri = 'data:application/vnd.ms-excel;base64,', 
        template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><title></title><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>', 
    base64 = function(s) { return window.btoa(decodeURIComponent(encodeURIComponent(s))) },         format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; })}
    } 
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension 
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    if(type == 'csv') link.download = fileName + ".csv";
    else link.download = fileName + ".xlsx";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}  
function download(type){ 
    var campaignid = $("#project").val();
    if(campaignid > 0 ){
        var fromdate = $('#fromdate').val();
        var todate = $('#todate').val();
        var recordsPPPage=$("#auditTablePPRecords").val();

        var disposition = $('#disposition').val() != '' ? $('#disposition').val() : 0;
        var subdisposition = $('#subdisposition').val() != '' ? $('#subdisposition').val() : 0;
        var agent = $('#agent').val() != '' ? $('#agent').val() : 0;
        var leadid = $('#leadid').val() != '' ? $('#leadid').val() : 0;
        $.get("https://api1.svgcolumbus.com/audit?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignid+"&disposition_id="+disposition+"&sub_disposition_id="+subdisposition+"&agent_id="+agent+"&from_date="+fromdate+"&to_date="+todate+"&pagination="+recordsPPPage+"&offset="+(offset-1)+"&lead_id="+leadid+"&fetch_type=download", function(data, status){
            dataRowCount=data['result'].length;
            if(status=='success' && data['result'].length>0){
                if(type == 'csv') {
                    JSONToCSVConvertor(data.result,'Call List',true, 'csv');
                }
                else{
                    var tabularData = [{
                            "sheetName": "Sheet1",
                            "data": [data.result]
                    }];
                    var options = {
                            fileName: "Audit Call List"
                        };
                        Jhxlsx.export(tabularData, options);
                } 

            }
        });
    }
}