<aside class="left-sidebar">
    <!-- Sidebar scroll-->
    <div class="scroll-sidebar">
        <!-- Sidebar navigation-->
        <nav class="sidebar-nav">
            <ul id="sidebarnav">
                 <li class="<?=$pageid==0?"active":"";?>"> 
					<a class="waves-effect waves-dark <?=$pageid==0?"active":"";?>" href="index.php?pageid=0" aria-expanded="false"><i class="mdi mdi-view-dashboard"></i><span
                    class="hide-menu">Dashboard </span></a>   
				</li>
				<li class="<?=($pageid == 1)? "active":"";?>"> 
					<a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="<?=($pageid==1)?"true":"false";?>"><i class="mdi mdi-phone-in-talk"></i><span
                            class="hide-menu">Audit</span></a>
                    <ul aria-expanded="<?=$pageid == 1 && ($page_sub_id==0)?"true":"false";?>" class="collapse <?=$pageid == 1 && ($page_sub_id == 0)?"in":"";?>">
                        <li class="<?=$pageid == 1 && $page_sub_id==0?"active":"";?>"><a href="index.php?pageid=1" class="<?=$pageid == 1 && $page_sub_id==0?"active":"";?>">Audit call</a></li>
                    </ul>
                </li>

                <!-- <li class="<?=($pageid == 2)?"active":"";?>"> 
					<a class="waves-effect waves-dark <?=($pageid == 2)?"active":"";?>" href="index.php?pageid=2" aria-expanded="false"><i class="mdi mdi-table-large"></i><span
                    class="hide-menu"> Audit Reports </span></a>   
                </li> -->
                <li class="<?=($pageid == 2)? "active":"";?>"> 
					<a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="<?=($pageid==2)?"true":"false";?>"><i class="mdi mdi-table-large"></i><span
                            class="hide-menu">Reports</span></a>
                    <ul aria-expanded="<?=$pageid == 2 && ($page_sub_id==1)?"true":"false";?>" class="collapse <?=$pageid == 2 && ($page_sub_id == 1)?"in":"";?>">
                        <li class="<?=$pageid == 2 && $page_sub_id==1?"active":"";?>"><a href="index.php?pageid=2.1" class="<?=$pageid == 2 && $page_sub_id==1?"active":"";?>">Audit</a></li>
                    </ul>
                </li>

                <!-- <li class="<?=($pageid == 2)? "active":"";?>"> 
					<a class="has-arrow waves-effect waves-dark" href="#" aria-expanded="<?=($pageid == 2)?"true":"false";?>"><i class="mdi mdi-table-large"></i><span
                            class="hide-menu">Reports</span></a>
                    <ul aria-expanded="<?=$pageid == 2 && ($page_sub_id == 0 || $page_sub_id == 1 || $page_sub_id == 2 || $page_sub_id == 3)?"true":"false";?>" class="collapse <?=$pageid == 2 && ($page_sub_id == 0 || $page_sub_id == 1 || $page_sub_id == 1 || $page_sub_id == 3)?"in":"";?>">
                        
                        <li class="<?=$pageid == 2 && $page_sub_id==2?"active":"";?>"><a href="index.php?pageid=2.2" class="<?=($pageid == 2 && $page_sub_id==2)?"active":"";?>">Disposition Report</a></li>
                        <li class="<?=$pageid == 2 && $page_sub_id==3?"active":"";?>"><a href="index.php?pageid=2.3" class="<?=($pageid == 2 && $page_sub_id==3)?"active":"";?>">Sale Agent Report</a></li>
                        <li class="<?=$pageid == 2 && $page_sub_id==1?"active":"";?>"><a href="index.php?pageid=2.1" class="<?=$pageid == 2 && $page_sub_id==1?"active":"";?>">Transactional Report</a></li>
                        <li class="<?=$pageid == 2 && $page_sub_id==4?"active":"";?>"><a href="index.php?pageid=2.4" class="<?=($pageid == 2 && $page_sub_id==4)?"active":"";?>">VOC Agent Report</a></li>
                        
                    </ul>
                </li>  -->
                <li class="<?=$pageid==3?"active":"";?>"> 
					<a class="has-arrow waves-effect waves-dark" id="campaignConfigLink" href="#" aria-expanded="<?=($pageid == 3)?"true":"false";?>"><i class="mdi mdi-settings"></i><span
                    class="hide-menu">Manage</span></a>   
                    <ul aria-expanded="<?=$pageid == 3 ?"true":"false";?>" class="collapse <?=$pageid == 3?"in":"";?>">
                        <li class="<?=$pageid == 3 ?"active":"";?>"><a href="index.php?pageid=3" class="<?=($pageid == 3)?"active":"";?>">Campaign</a></li>
                    </ul>
				</li>
            </ul>
        </nav>
        <!-- End Sidebar navigation -->
    </div>
    <!-- End Sidebar scroll-->
    <!-- Bottom points-->
   
    <!-- End Bottom points-->
</aside>