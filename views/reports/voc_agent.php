
<link href="../assets/plugins/datatables/media/css/dataTables.bootstrap4.css" rel="stylesheet">
<link href="../assets/plugins/bootstrap-datepicker/monthly-datepicker.css" rel="stylesheet">


    <!-- ============================================================== -->
    <!-- Container fluid  -->
    <!-- ============================================================== -->
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
                        <div class="row">
                            <h4 class="card-title col-4">VOC Report</h4> 
                            <div class="col-3" style="float:right">
                                <select class="custom-select col-12" id="inlineFormCustomSelect">
                                    <option value="1" selected>Agent Wise</option>
                                    <option value="2">Manager Wise</option>
                                    <option value="3">Auditor Wise</option>
                                </select>
                            </div>
                            <div class="col-3">
                                <!-- <input class="form-control" type="month" value="2011-08" sname="monthlyDate" id="example-month-input"> -->
                                <div class="input-group date" id="datepicker" data-date="01-2019" data-date-format="mm-yyyy">
                                
                                    <div class="input-group-prepend add-on">
                                        <span class="input-group-text" id="basic-addon1"><i class="mdi mdi-calendar-blank"></i></span>
                                    </div>
                                    <input class="form-control add-on" type="text" value="01-2019" name="date" readonly> 
                                    
                                </div>
                            </div>
                            <div class="col-2">
                                <button type="button" class="btn waves-effect waves-light btn-success">Get Report</button>
                            </div>
                        </div>
                        <div class="table-responsive m-t-40">
                            <table id="vocAgentReport" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                                <thead>
                                    <tr>
                                        <th>Call Status</th>
                                        <th>Approved</th>
                                        <th>Not Approved</th>
                                        <th>Pending</th>
                                        <th>Grand Total</th>
                                    </tr>
                                </thead>
                                <!-- <tfoot>
                                    <tr>
                                        <th>Grand Total</th>
                                        <th>78</th>
                                        <th>2</th>
                                        <th>119</th>
                                        <th>199</th>
                                    </tr>
                                </tfoot> -->
                                <tbody>
                                    <tr>
                                        <td>Contacted</td>
                                        <td>71</td>
                                        <td>10</td>
                                        <td>4</td>
                                        <td>85</td>
                                    </tr>
                                    
                                    <tr>
                                        <td>Not Contacted</td>
                                        <td></td>
                                        <td></td>
                                        <td>64</td>
                                        <td>64</td>
                                    </tr>
                                    <tr>
                                        <td>Yet to dial</td>
                                        <td></td>
                                        <td></td>
                                        <td>51</td>
                                        <td>51</td>
                                    </tr>
                                   
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
            </div>
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
    <!-- ============================================================== -->
    <!-- End Container fluid  -->
    <?include_once(VIEW_PATH.'/common/commonjs.php');?>
<script src="/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>

<!-- This is data table -->
<script src="/assets/plugins/datatables/datatables.min.js"></script>
<!-- start - This is for export functionality only -->
<script src="//cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.8.0/js/bootstrap-datepicker.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.2.2/js/buttons.flash.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jszip/2.5.0/jszip.min.js"></script>
<script src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js"></script>
<script src="//cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js"></script>
<script src="//cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js"></script>
<script src="//cdn.datatables.net/buttons/1.2.2/js/buttons.print.min.js"></script>  

<script src="../assets/plugins/bootstrap-datepicker/monthly-datepicker.js"></script>
   
    <!-- end - This is for export functionality only -->
<script>
$("#datepicker").datepicker( {
    format: "mm-yyyy",
    viewMode: "months", 
    minViewMode: "months"
});

$('#vocAgentReport').DataTable({
    
    dom: 'Bfrtip',
    buttons: [{
            extend: 'excelHtml5',
            title: 'voc_agent',
            footer: true
        },
        {
            extend: 'pdfHtml5',
            title: 'voc_agent',
            footer: true
        },
        {
            extend: 'csvHtml5',
            title: 'voc_agent',
            footer: true
        } ]
});



    </script> 
    <!-- ============================================================== -->
  