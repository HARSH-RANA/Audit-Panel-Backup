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
$('#audittable').DataTable({dom: 'Bfrtip',buttons: ['csv', 'excel']});


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
            tablebody +="<td>"+audit.call_id+"</td><td>"+audit.customer_mobile+"</td><td>"+audit.disposition_value+"</td><td>"+audit.sub_disposition_value+"</td><td>"+audit.call_date+"</td><td><label class='label label-rounded label-success' data-toggle='modal' data-target='.auditmodal'>Audit</label><label class='label label-rounded label-success' data-toggle='modal' data-target='.auditinfo' data-leadid='"+audit.lead_id+"' data-agentname='"+audit.agent_name+"' data-calldate='"+audit.call_date+"' data-calltype='"+audit.call_type+"' data-cusno='"+audit.customer_mobile+"'data-cusname='"+audit.customer_name+"' data-disp='"+audit.disposition_value+"' data-subdisp='"+audit.sub_disposition_value+"' data-leaddate='"+audit.lead_date+"'><i class='fas fa-info-circle'></i></label></td>"; 
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
});
//onchange disposition 
$('#disposition').on('change', function() {
    if( this.value > 0 && $('#project').val() > 0){            
        var campaign_id = $('#project').val();
        getDataApi("https://api1.svgcolumbus.com/sub_dispositions?user_id="+userid+"&token_id="+token+"&campaign_id="+campaign_id+"&disposition_id="+this.value,'GET','','getsubdispositionlist');
    }
});
//get audit list
$('#submit').on('click', function() {
    console.log('reached');
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

//campaignParameterResulttransactional
function campaignParameterResult(parameterresult){
    //console.log(parameterresult);
    $('#transactional_dynamic').html('');
    var paramhtml = '';
    var i = 0
    parameterresult.forEach(function(parameter) {
       paramhtml += '<h6 class="card-title">'+parameter.parameter_title+'</h6><div data-title="'+parameter.parameter_title+'" class="demo-radio-button">';
       var z=0;       
       parameter.parameter_values.forEach(function(options){
            paramhtml += '<input name="transactional_dynamic_group_'+i+'" type="radio" value="'+options.value+'" id="transactional_dynamic_group_'+i+'_'+z+'"/><label for="transactional_dynamic_group_'+i+'_'+z+'">'+options.key+'</label>'; 
            z++;           
       });
       i++;
       paramhtml += '</div>';
       //$("input[name='transactional_dynamic_group_0']:checked").val();
    });
    $('#transactional_dynamic').html(paramhtml);
}
//campaignParameterResultvoc
function campaignParameterResultvoc(parameterresult){
    $('#voc_dynamic').html('');
    var paramhtml = '';
    var i = 0
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
    if(button.data('afurl') != ''){
        $("#call_rec").attr("src", button.data('afurl'));
        getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id=273&param_type=transactional",'GET','','getparameterlist');
        getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id=273&param_type=voc",'GET','','getparameterlistvoc');
        getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id=273&param_type=sales",'GET','','getparameterlistsales');
    }else{
        alert('No audio file Exists');
    }
});


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

  $( "#save_transactional_params" ).click(function(e) {
    //console.log('clicked');
    var jsontransactional = {};
    jsontransactional["audit_type"] = 'transactional';
    jsontransactional["parameters"] = [];
    var jsontransactionaldynamic = {};
    jsontransactionaldynamic['parameter_type'] = 'dynamic';
    jsontransactionaldynamic['parameters'] = [];
    //jsontransactional["parameters"].push();
    $("#transactional_dynamic .demo-radio-button").each(function(i){
        //console.log($(this).data('title'));        
        //console.log($("input:radio[name='transactional_dynamic_group_"+i+"']:checked").val());
        jsonparam = {};
        jsonparam['parameter_value'] = $("input:radio[name='transactional_dynamic_group_"+i+"']:checked").val();
        jsonparam['parameter_title'] = $(this).data('title');
        jsontransactionaldynamic['parameters'].push(jsonparam);
    });
    console.log(jsontransactionaldynamic['parameters']);
    jsontransactionaldynamic['parameters'].push(jsontransactionaldynamic['parameters']);
    //console.log(jsontransactional);
 });