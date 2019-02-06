
// $("#datepicker").datepicker( {
//     format: "mm-yyyy",
//     viewMode: "months", 
//     minViewMode: "months"
// });

var startdate = moment();
var enddate = moment();
$('#todate').val(enddate.format('YYYYMMDD'));
$('#fromdate').val(startdate.format('YYYYMMDD'));
$('#transactionalreportrange span').html(startdate.format('DD/MM/YYYY') + ' - ' + enddate.format('DD/MM/YYYY'));
$('#transactionalreportrange').daterangepicker({
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
        $('#transactionalreportrange span').html(start.format('DD/MM/YYYY') + ' - ' + end.format('DD/MM/YYYY'));
        $('#todate').val(end.format('YYYYMMDD'));
        $('#fromdate').val(start.format('YYYYMMDD'));
        getAuditTableData();
    }
); 

    $('#transactionalAgentReport').DataTable({
        
    });  

