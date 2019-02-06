<!-- Daterange picker plugins css -->
<link href="../assets/plugins/timepicker/bootstrap-timepicker.min.css" rel="stylesheet">
<link href="../assets/plugins/daterangepicker/daterangepicker.css" rel="stylesheet">
<link href="../assets/plugins/datatables/media/css/dataTables.bootstrap4.css" rel="stylesheet">
<style>
.customtab2 li a.nav-link {
border: 1px solid #ccc;
}
.card .card-subtitle {
    margin-bottom: 10px;
}
.card-subtitle {
    margin-top: -.375rem;
    margin-bottom: 0;
}
.hr-text {
  line-height: 1em;
  position: relative;
  outline: 0;
  border: 0;
  color: black;
  text-align: center;
  height: 1.5em;
  opacity: 0.5;
}
.hr-text:before {
  content: "";
  background: linear-gradient(to right, transparent, #000, transparent);
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
}
.hr-text:after {
  content: attr(data-content);
  position: relative;
  display: inline-block;
  color: black;
  padding: 0 0.5em;
  line-height: 1.5em;
  color: #000;
  background-color: #fcfcfa;
}
/* for custom audio player */
.customplayer {
  width: 100%;
}
p.track {
  text-transform: uppercase;
  color: #FFF;
}
p.track span {
  color: #999;
}
.audiobtn {
  background-color: rgba(255, 255, 255, 0);
  border: 1px solid #FFF;
  border-radius: 50%;
  color: #FFF;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  transition: all 0.2s ease 0;
  align-items: center;
}
.audiobtngrp{
    vertical-align: middle;
    align-items: center;
    display:flex;
    justify-content: center;
}
button[data-am-button^="large"] {
  width: 60px;
  height: 60px;
  margin: 0 5px;
}
button[data-am-button^="large"] i {
  font-size: 25px;
}
button[data-am-button^="small"] {
  width: 40px;
  height: 40px;
}
button[data-am-button^="small"] i {
  font-size: 14px;
}
button:hover {
  color: #999;
  border-color: #999;
}
button:focus {
  outline: none;
}
#progress-bar {
  width: 100%;
  background-color: #000;
  height: 5px;
  position: relative;
  margin: 1em 0;
  cursor: pointer;
}
#progress-bar #progress {
  background-color: #999;
  height: 5px;
  position: absolute;
  left: 0;
  transition: width 2.5s linear 0;
}
</style>
<div class="container-fluid">
    <!-- ============================================================== -->
    <!-- Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <div class="row page-titles">
        <div class="col-md-5 col-8 align-self-center">
            <h3 class="text-themecolor">Audit</h3>
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.php?pageid=0">Home</a></li>
                <li class="breadcrumb-item active">Audit calls</li>
            </ol>
        </div>        
    </div>
    <!-- ============================================================== -->
    <!-- End Bread crumb and right sidebar toggle -->
    <!-- ============================================================== -->
    <!-- ============================================================== -->
    <!-- Start Page Content -->
    <!-- ============================================================== -->
    <!-- Row -->
    <!-- ============================================================== -->
    <!-- start Modal box for audit rating -->
    <!-- ============================================================== -->
    <div class="modal fade auditmodal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" id="auditmodal">Audit Call</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">
                <div class="row">
                    <div class="card" style="width:100%">
                        <div class="audiodiv" style="background-color: #40424c;"> 
                            <audio preload="auto" controls="controls" class="d-none">

                                <source src="https://s3.ap-south-1.amazonaws.com/svg-columbus-call-recording/call_records/2018/11/01/6853611.mp3" />

                            </audio>
                        <!--Custom audio player-->
                        <div class="customplayer m-t-10 m-b-10">
                            <div class="audiobtngrp">
                                <button data-am-button="small" id="btn-mute" class="audiobtn"><i class="fa fa-volume-off"></i></button>
                                <button data-am-button="large" id="btn-play-pause" class="audiobtn"><i class="fa fa-play"></i></button>
                                <button data-am-button="small" id="btn-stop" class="audiobtn"><i class="fa fa-stop"></i></button>
                            </div>	
                            <div id="progress-bar"><span id="progress"></span></div>	
                        </div>
                        <!--Custom audio player end-->
                    </div>
                    
                        <!-- Nav tabs -->
                        <ul class="nav nav-tabs customtab2" role="tablist">
                            <li class="nav-item"> <a class="nav-link active" data-toggle="tab" href="#nonsales" role="tab"><span class="hidden-sm-up"><i class="ti-home"></i></span> <span class="hidden-xs-down">Non Sales</span></a> </li>
                            <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#dispositiontab" role="tab"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Disposition</span></a> </li>
                            <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#funnel" role="tab"><span class="hidden-sm-up"><i class="ti-email"></i></span> <span class="hidden-xs-down">Funnel</span></a> </li>
                            <li class="nav-item"> <a class="nav-link" data-toggle="tab" href="#sales" role="tab"><span class="hidden-sm-up"><i class="ti-user"></i></span> <span class="hidden-xs-down">Sales</span></a> </li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div class="tab-pane active" id="nonsales" role="tabpanel">
                                <div class="p-20">
                                    <h4 class="card-title">Appropriate Opening</h4>
                                    <div class="demo-radio-button">
                                        <input name="group1" type="radio" id="radio_1" />
                                        <label for="radio_1">Yes</label>
                                        <input name="group1" type="radio" id="radio_2" />
                                        <label for="radio_2">No</label>
                                    </div>
                                    <h4 class="card-title">Need Analysis Done</h4>
                                    <div class="demo-radio-button">
                                        <input name="group2" type="radio" id="radio_1" />
                                        <label for="radio_1">Yes</label>
                                        <input name="group2" type="radio" id="radio_2" />
                                        <label for="radio_2">No</label>
                                    </div>
                                    <h4 class="card-title">Apt Product Presentation</h4>
                                    <div class="demo-radio-button">
                                        <input name="group2" type="radio" id="radio_1" />
                                        <label for="radio_1">Yes</label>
                                        <input name="group2" type="radio" id="radio_2" />
                                        <label for="radio_2">No</label>
                                    </div>
                                    <h4 class="card-title">Appropriate Closing</h4>
                                    <div class="demo-radio-button">
                                        <input name="group2" type="radio" id="radio_1" />
                                        <label for="radio_1">Yes</label>
                                        <input name="group2" type="radio" id="radio_2" />
                                        <label for="radio_2">No</label>
                                    </div>
                                    <h4 class="card-title">Call Disposed correctly </h4>
                                    <div class="demo-radio-button">
                                        <input name="group2" type="radio" id="radio_1" />
                                        <label for="radio_1">Yes</label>
                                        <input name="group2" type="radio" id="radio_2" />
                                        <label for="radio_2">No</label>
                                    </div>

                                </div>
                            </div>
                            <div class="tab-pane p-20" id="dispositiontab" role="tabpanel">2</div>
                            <div class="tab-pane p-20" id="funnel" role="tabpanel">3</div>
                            <div class="tab-pane p-20" id="sales" role="tabpanel">2</div>
                        </div>
                    </div>
                </div>
                </div>
                    
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger waves-effect text-left" data-dismiss="modal">Close</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div> 

    <!-- ============================================================== -->
    <!-- end Modal box for audit rating -->
    <!-- ============================================================== -->
    
    <div class="row">
        <!-- Column -->
        <div class="col-lg-12 col-md-12">
            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-4 align-self-center">
                            <h4 class="card-title">Audit calls</h4>
                        </div>
                        <div class='form-group col-md-3 mb-0'>
                                   <!-- <h6 class="card-subtitle">Select Date Range</h6> -->
                                    <div class='input-group '>
                                        <input type='text' class="form-control form-control-sm daterange" />
                                        <div class="input-group-append">
                                            <span class="input-group-text">
                                                <span class="ti-calendar"></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                        <div class='form-group col-md-3 mb-0'>
                                    <!-- <h6 class="card-subtitle">Select Project</h6> -->
                                    <div class="input-group ">
                                        <select class="form-control form-control-sm" id="project">
                                            <option selected="">Choose Project...</option>
                                        </select>
                                    </div>
                                </div>
                        <div class="col-md-1 col-1 align-self-center">
                            <button class="waves-effect waves-light btn-success btn btn-circle btn-sm pull-right float-right" data-toggle="modal" data-target=".bs-example-modal-lg"><i class="mdi mdi-filter"></i></button>
                        
                        </div>
                        <div class="col-md-1 col-1 align-self-center">
                            <button class="waves-effect waves-light btn-success btn btn-circle btn-sm pull-right float-right"><i class="mdi mdi-subdirectory-arrow-right"></i></button>
                        </div>
                    </div>
                <!-- sample modal content -->
                <div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" style="display: none;">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myLargeModalLabel">Filter Calls</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                            </div>
                            <div class="modal-body">
                            <div class="row">
                                
                                
                                <div class='form-group col-md-6'>
                                    <h6 class="card-subtitle">Select Dispostions</h6>
                                    <div class="input-group ">
                                        <select class="form-control form-control-sm" id="disposition">
                                            <option selected="">Choose...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='form-group col-md-6'>
                                    <h6 class="card-subtitle">Select Sub Dispositions</h6>
                                    <div class="input-group ">
                                        <select class="form-control form-control-sm" id="subdisposition">
                                            <option selected="">Choose...</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='form-group col-md-6'>
                                    <h6 class="card-subtitle">Select Agent</h6>
                                    <div class="input-group ">
                                        <select class="form-control form-control-sm" id="agent">
                                            <option selected="">Choose...</option>
                                        </select>
                                    </div>
                                </div>
                                <!-- <div class="col-md-12 m-t-20" style="height: 20px; border-bottom: 1px solid black; text-align: center">
                                    <span style="background-color: #F3F5F6; padding: 0 10px;">
                                        OR
                                    </span>
                                </div> -->
                                <div class='form-group col-md-12'>
                                <hr class="hr-text" data-content="OR">
                                    <h6 class="card-subtitle">Lead Id</h6>
                                    <div class="input-group ">
                                        <select class="form-control form-control-sm" id="inlineFormCustomSelect">
                                            <option selected="">Choose...</option>
                                            <option value="1">One</option>
                                            <option value="2">Two</option>
                                            <option value="3">Three</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            </div>
                                
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger waves-effect text-left" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->
                <div class="table-responsive m-t-40">
                    <table id="audittable" class="display nowrap table table-hover table-striped table-bordered" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th>Lead ID</th>
                                <th>Name</th>
                                <th>Mobile</th>
                                <th>Disposition</th>
                                <th>Sub Disposition</th>
                                <th>Audit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>420</td>
                                <td>Master jojo</td>
                                <td>9999999999</td>
                                <td>pata nahi</td>
                                <td>kuch pata nahi</td>
                                <td><label class="label label-rounded label-success" data-toggle="modal" data-target=".auditmodal">Audit</label></td>
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
    
</div>
<?include_once(VIEW_PATH.'/common/commonjs.php');?>
<script src="/assets/plugins/sticky-kit-master/dist/sticky-kit.min.js"></script>
<script src="/assets/plugins/sparkline/jquery.sparkline.min.js"></script>
<script src="/assets/plugins/chartist-js/dist/chartist.min.js"></script>
<script src="/assets/plugins/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.min.js"></script>
<script src="/assets/plugins/d3/d3.min.js"></script>
<script src="/assets/plugins/c3-master/c3.min.js"></script>
<script src="/assets/plugins/moment/moment.js"></script>
<script src="/assets/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<script src="/assets/plugins/daterangepicker/daterangepicker.js"></script>
<!-- This is data table -->
<script src="/assets/plugins/datatables/datatables.min.js"></script>
<!-- start - This is for export functionality only -->
<script src="/assets/plugins/datatables/dataTables.buttons.min.js"></script>
<script src="/assets/plugins/datatables/buttons.flash.min.js"></script>
<script src="/assets/plugins/datatables/jszip.min.js"></script>
<script src="/assets/plugins/datatables/buttons.html5.min.js"></script>
<script src="/js/getdata.js"></script>
<script src="/js/audit.js"></script>
<!-- end - This is for export functionality only -->
