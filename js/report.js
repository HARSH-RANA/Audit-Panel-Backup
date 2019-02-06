var startdate = moment();
var enddate = moment();
$('#todate').val(enddate.format('YYYYMMDD'));
$('#fromdate').val(startdate.format('YYYYMMDD'));
$('#reportrange span').html(startdate.format('DD/MM/YYYY') + ' - ' + enddate.format('DD/MM/YYYY'));
$('#reportrange').daterangepicker({
    startDate: startdate,
    endDate: enddate,
    opens : 'left',
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
        getReport(-1);
    }
); 

// $("#datepicker").datepicker( {
//     format: "mm-yyyy",
//     viewMode: "months", 
//     minViewMode: "months"
// });

$(function(){    
    $(".select2").select2({ width: '100%' });  
    document.getElementById("reportContent").style.visibility = "hidden";
    getDataApi("https://api1.svgcolumbus.com/campaigns?user_id="+userid+"&token_id="+token,'GET','','getcampaignlistReport');

    

}); 

var campaignResultReport=function(data){
    $('#disposition').find('option').remove().end().append($("<option></option>").attr("value",-1).text("Choose Disposition")); 
    $.each(data['campaign_list'],function(key,d){
        
        $("#campaignNameReport").append($("<option></option>").attr("value",d.campaign_id).text(d.campaign_name));
    });
     
}

var campaignDataResultReport=function(data){
    if($("#auditReportFooter").length){
        $("#auditReportFooter").remove();
    }
    var tableId=$("#auditReportTable");
    var offset=1;
    console.log(role_type);

    var roleName=(role_type=='agent')?'Agent':((role_type=='manager')?'Manager':'Auditor');
    
    if(data['report_type']=='disposition'){
        tableId.html('').append('<thead><tr><th>'+ roleName +' Name</th><th>Genuine Count</th><th>Genuine Percent</th><th>Grand Total</th><th>Non Genuine Count</th><th>Non Genuine percent</th></tr></thead><tbody>');
        if(data['report_data'].length>0){
            document.getElementById("reportContent").style.visibility = "visible";
            $.each(data['report_data'],function(i,d){   
                var row='<tr>' + '<td>'+ d['report_val'] + '</td>' + '<td>'+ d['genuine_count'] + '</td>'  + '<td>'+ d['genuine_perc'] + '</td>' + '<td>'+ d['grand_total'] + '</td>' + '<td>'+ d['non_genuine_count'] + '</td>' + '<td>'+ d['non_genuine_perc'] + '</td>'+ '</tr>';
                tableId.append(row);  
            });
        }else{
            var row='<tr><td colspan="7" style="text-align:center">No record to display.</td></tr>';
            tableId.append(row);
        }
        
        tableId.append('</tbody>');

    }else if(data['report_type']=='transactional'){
        tableId.html('').append('<thead><tr><th>'+roleName+' Name</th><th>Call Count</th><th>Fatal Count</th><th>Fatal Percent</th><th>Quality Percent</th></thead><tbody>');
        if(data['report_data'].length>0){
            $.each(data['report_data'],function(i,d){
                var row='<tr>'+ '<td>'+ d['report_val'] + '</td>' + '<td>'+ d['call_count'] + '</td>'  + '<td>'+ d['fatal_count'] + '</td>' + '<td>'+ d['fatal_perc'] + '</td>' + '<td>'+ d['quality_perc'] + '</td>'  + '</tr>';
                tableId.append(row);
            });
        }else{
            var row='<tr><td colspan="6" style="text-align:center">No record to display.</td></tr>';
            tableId.append(row);
        }
        tableId.append('</tbody>');

    }else if(data['report_type']=='sales'){
        tableId.html('').append('<thead><tr><th>'+roleName+' Name</th><th>Approved Count</th><th>Approved Percent</th><th>Not Approved Count</th><th>Not Approved Percent</th><th>Pending Count</th><th>Pending Percent</th></thead><tbody>');
        if(data['report_data'].length>0){
            $.each(data['report_data'],function(i,d){
                var row='<tr>'+  '<td>'  + d['report_val']+'</td>' + '<td>'+ d['approved_count'] + '</td>'  + '<td>'+ d['approved_perc'] + '</td>' + '<td>'+ d['not_approved_count'] + '</td>' + '<td>'+ d['not_approved_perc'] + '</td>' + '<td>'+ d['pending_count'] + '</td>' + '<td>'+ d['pending_perc'] + '</td>' +  '</tr>'; 
                tableId.append(row);
            });
        }else{
            var row='<tr><td colspan="8" style="text-align:center">No record to display.</td></tr>';
            tableId.append(row);
        }    
        tableId.append('</tbody>');

    }else if(data['report_type']=='voc'){

    }else{
        $(".tst2").click();      
    } 

    var pageCount=1;
    var disableClass=(offset==1)?"disabled":"";
    var reportRecordsPerPage=5;
    var paginationHtml='<div class="dataTables_paginate paging_simple_numbers" id="auditFooterPagination" style="float:right"><ul class="pagination"><li class="paginate_button page-item previous '+disableClass+'" id="campaignListing_previous"><a onclick="getAuditTableData(0)" aria-controls="campaignListing" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>';
    if(pageCount<10){
        for(i=1;i<=pageCount;i++){
            var activeClass=(offset==i)?"active":"";
            paginationHtml+='<li class="paginate_button page-item '+activeClass+'"><a onclick="getAuditTableData('+i+')" aria-controls="campaignListing" data-dt-idx="1" tabindex="0" class="page-link">'+i+'</a></li>';
        }
    }
    var disableClass=(offset==pageCount)?"disabled":"";
    paginationHtml+='<li class="paginate_button page-item next '+disableClass+'" id="campaignListing_next"><a onclick="getAuditTableData(-1)" aria-controls="campaignListing" data-dt-idx="4" tabindex="0" class="page-link">Next</a></li></ul></div>';
    var totalRecords=data['report_data'].length;
    var pageInfo=(totalRecords==0)?0:(offset-1)*reportRecordsPerPage+1;
    var todataRecord=(pageInfo==0)?0:(pageInfo+data['report_data'].length-1);
    $("#auditReportTable").after('<div class="container row" id="auditReportFooter"><div class="col-md-6" id="auditfooter"><p>showing '+ pageInfo +' to '+ todataRecord + ' of '+totalRecords+' entries</p></div><div class="col-md-6">'+ paginationHtml +'</div></div>');
 
    
}

var role_type='';
var campaignIDReport=0;
var fromReportDate='';
var toReportDate='';
var reportRecordsPP='';
var report_type='';
var getReport=function(param){
    if(param==undefined){
        var param=-2;
    }
    reportRecordsPP=$('#reportTablePPRecords').val();
    campaignIDReport=$("#campaignNameReport").val();
    report_type=$("#reportType").val();
    role_type=$("#inlineFormCustomSelect").val();
    var reportDate=$("#reportrange").find('span').text().split('-');
    fromReportDate=reportDate[0].trim().split("/").reverse().join("");
    toReportDate=reportDate[1].trim().split("/").reverse().join("");

    var getReportData=function(){
        var url="https://api1.svgcolumbus.com/report?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignIDReport+"&from_date="+fromReportDate+"&to_date="+toReportDate+"&pagination="+reportRecordsPP+"&offset=0&fetch_type=view&role_type="+role_type+"&report_type="+report_type;
        getDataApi(url,'GET','','getReportData');
    }

    
    if(param==-1){
        if(campaignIDReport!=-1 && report_type!='-1' && role_type!='-1' && reportDate!=" "){
            getReportData(campaignIDReport, report_type, role_type, fromReportDate, toReportDate);
        }else{
            return;
        }
    }
    else if(campaignIDReport==-1 || report_type=='-1' || role_type=='-1' || reportDate==" "){
        $.toast({
            heading: 'Kindly select all values before submit.',
            position: 'top-center',
            loaderBg:'#ff6849',
            icon: 'warning',
            hideAfter: 3500, 
            stack: 6
          }); 
        return;

    }else if(report_type=='transactional' || report_type=='sales' || report_type=='disposition' ){
        getReportData(campaignIDReport, report_type, role_type, fromReportDate, toReportDate);

    }else{

    }
}


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
    var fileName = "";
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
function downloadreport(type){  
    
    if(campaignIDReport > 0 ){
        

        

        $.get("https://api1.svgcolumbus.com/report?user_id="+userid+"&token_id="+token+"&campaign_id="+campaignIDReport+"&from_date="+fromReportDate+"&to_date="+toReportDate+"&pagination="+reportRecordsPP+"&offset=0&fetch_type=download&role_type="+role_type+"&report_type="+report_type, function(data, status){
            dataRowCount=data['report_data'].length;
            if(status=='success' && dataRowCount>0){
                if(type == 'csv') {
                    JSONToCSVConvertor(data.report_data,'Report',true, 'csv');  
                }
                else{
                    var tabularData = [{
                            "sheetName": "Sheet1",
                            "data": [data.report_data]
                    }];
                    var options = {
                            fileName: "Report"
                        };
                        Jhxlsx.export(tabularData, options);
                } 

            }
        });
    }
}