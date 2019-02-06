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
            if(result['campaign_list'].length>0){
                $.each(result['campaign_list'],function(i,d){

                    $("#campaignDataBody").append('<tr><td>'+d['campaign_id']+'</td><td>'+d['campaign_name']+'</td><td><button type="button" class="btn waves-effect waves-light btn-sm btn-success" onclick="getParameters('+d['campaign_id']+',\'transactional\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="transactional">Transactional</button>&nbsp;<button type="button" class="btn waves-effect waves-light btn-sm btn-success" onclick="getParameters('+d['campaign_id']+',\'sales\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="sales">Sales</button>&nbsp;<button type="button" class="btn waves-effect waves-light btn-sm btn-success" onclick="getParameters('+d['campaign_id']+',\'voc\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="voc">VOC</button>&nbsp;<button type="button" class="btn waves-effect waves-light btn-sm btn-success" onclick="getParameters('+d['campaign_id']+',\'voc_csat\')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="voc">VOC CSAT</button></td></tr>');
    
                });
            }
            
            $('#campaignListing').DataTable({});

        }

         
        getDataApi("https://api1.svgcolumbus.com/campaigns?user_id="+userid+"&token_id="+token,'GET','','getcampaignlist');

        var params=[];
        function campaignParameterResult(result){
            
            params=result;
            // $("#questionsListingRows").html('');
            
            if(params.length>0){
                $.each(params,function(id,data){
                    var rowClass=(id%2==0?'odd':'even');
                    var backgroundColor=(id%2==0?'f2f4f8':'FFFFFF');
                    var param_type=(data['parameter_type']!=undefined)?data['parameter_type']:'radio';
                    $("#questionsListingRows").append('<tr role="row" class="'+ rowClass +'" style="background-color:#'+backgroundColor+'"><td>'+data['parameter_title']+'</td><td>'+param_type +'</td><td><span data-toggle="modal" data-target=".bs-edit-modal-lg"><i class="mdi mdi-pencil" onclick="campaignParameterOptionsEdit('+id+')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="edit question"></i></span><span data-toggle="modal" data-target=""><i class="mdi mdi-delete" onclick="campaignParameterOptionsDelete('+id+')" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="delete question"></i></span> <tr>');
                    
                });
            }else{
                $("#questionsListingRows").append('<tr><td colspan="3" style="text-align: center;">No record to display. </td><tr>');
            }
            $("#listingModal").modal('show'); 
                    

                
            

            
            

        }

        var OptionCounterAdd=0;
        var OptionCounterEdit=0;
        var optionsAddArray=[];
        var optionsEditArray=[];
        var addType='';
        function initAddOptionsCounter(){
          
           
            $("#optionsListDivAdd").html('');
            $("#optionsListDivAdd").append(' <div class="form-group col-12"><label>Question:</label><input type="text" class="form-control" id="parameterTitleAdd" placeholder="Type question here......" onfocus="onFocusAddTitle()" name="question" required></div><div class="container row"><div class="form-group col-md-3 m-t-20"><select class="form-control" id="questionType" onchange="setQuestionType()"><option value="radio">Radio</option><option value="textbox">TextBox</option></select></div><div class="form-group col-md-3 m-t-20" id="addQuestionDiv"><button type="button" id="addOptionButton" onclick="addOptionsAdd()" class="btn waves-effect waves-light btn-success col-12">Add Option</button></div></div>');
            OptionCounterAdd=0;
            optionsAddArray=[];
        }   
        var QuestionType='radio';
        function setQuestionType(){
            QuestionType=$("#questionType").children("option:selected").val();
            let x = document.getElementById("addOptionButton");
            $.each(optionsAddArray,function(i,d){
                if($("#optionDivAdd"+d).length){
                    $("#optionDivAdd"+d).remove();
                }
            });
            optionsAddArray=[];
            OptionCounterAdd=0;
            if (QuestionType=='textbox' || QuestionType=='star') {
                x.style.display = "none";
                
            } else {
                x.style.display = "block";
            }

        }
        function setQuestionTypeEdit(){
            QuestionTypeEdit=$("#questionTypeEdit").children("option:selected").val();
            let x = document.getElementById("EditQuestionDiv");
            $.each(optionsEditArray,function(i,d){
                if($("#optionDivEdit"+d).length){
                    $("#optionDivEdit"+d).remove();
                }
            });
            optionsEditArray=[];
            OptionCounterEdit=0;
            if (QuestionTypeEdit=='textbox' || QuestionTypeEdit=='star') {
                x.style.display = "none";
                
            } else {
                x.style.display = "block";
            }

        }
        var parameterRowEdit=0;
        function campaignParameterOptionsEdit(index){
            parameterRowEdit=index;
            OptionCounterEdit=0;
            optionsEditArray=[];
            
            $("#optionsListDiv").html('');
            $("#optionsListDiv").append('<div class="form-group col-12"><label>Question:</label><input id="parameterTitleEdit" type="text" class="form-control" value="'+params[index]['parameter_title']+'" onfocus="onFocusAddTitle()" name="question" required></div><div class="container row"><div class="form-group col-md-3"><select class="form-control" id="questionTypeEdit" onchange="setQuestionTypeEdit()"><option value="radio">Radio</option><option value="textbox">TextBox</option></select></div><div class="form-group col-md-3" id="EditQuestionDiv"><button type="button" onclick="addFunctionsEdit()" class="btn waves-effect waves-light btn-success ">Add Option</button></div></div>');   

            if(typeof(params[index]['parameter_type']) != "undefined" && params[index]['parameter_type'] !== null){
                $("#questionTypeEdit").val(params[index]['parameter_type']);

            }
            setQuestionTypeEdit();


            $.each(params[index]['parameter_values'],function(index,value){
                $("#optionsListDiv").append('<div class="col-12 row" id="optionDivEdit'+OptionCounterEdit+'"><div class="form-group col-4"><label>Option name:</label><input type="text" class="form-control" id="optionValueInputEdit'+OptionCounterEdit+'" name="yesWeightage" value="'+value['key']+'" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputEdit'+OptionCounterEdit+'" max="100" value="'+value['value']+'" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivEdit('+OptionCounterEdit+')">×</button></div>');
                optionsEditArray.push(OptionCounterEdit);
                OptionCounterEdit++;

            });     


        }
        var deleteQuestionJson=Array();
        function campaignParameterOptionsDelete(index){
            if (index > -1) {
                params.splice(index, 1);
                deleteQuestionJson=params;
                var camp_id=$("#hiddenCampValue").val();
                getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+clickedParam,'POST',params,'createCampaignParameter');
            }
            

        }
        var clickedParam='';
        var getParameters=function(camp_id,param){
            clickedParam=param;
            document.getElementById("hiddenCampValue").value = camp_id;
            $("#questionsListingRows").html('');
            getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+param,'GET','','getparameterlist');

        }

        var removeDivAdd=function(id){
            $("#optionDivAdd"+id).remove();
            var index = optionsAddArray.indexOf(id);
            if (index > -1) {
                optionsAddArray.splice(index, 1);
            }

        }
        var removeDivEdit=function(id){
            $("#optionDivEdit"+id).remove();
            var index = optionsEditArray.indexOf(id);
            if (index > -1) {
                optionsEditArray.splice(index, 1);
            }
        }

        
        var addOptionsAdd=function(){
            $("#addQuestionDiv").after('<div class="col-12 row" id="optionDivAdd'+OptionCounterAdd+'" ><div class="form-group col-4"><label>Option name:</label><input type="text" class="form-control" id="optionValueInputAdd'+OptionCounterAdd+'" name="yesWeightage" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputAdd'+OptionCounterAdd+'" max="100" value="0" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivAdd('+OptionCounterAdd+')">×</button></div>');
            optionsAddArray.push(OptionCounterAdd);
            OptionCounterAdd++;  
            
        }

        var addFunctionsEdit=function(){
            
                $("#EditQuestionDiv").after('<div class="col-12 row" id="optionDivEdit'+OptionCounterEdit+'"><div class="form-group col-4"><label>Option name:</label><input type="text" id="optionValueInputEdit'+OptionCounterEdit+'" class="form-control" name="yesWeightage" required></div><div class="form-group col-4"><label>Weightage:</label><input type="number" class="form-control" id="optionWeightageInputEdit'+OptionCounterEdit+'" max="100" value="0" name="yesWeightage" required></div><button type="button" class="close" onclick="removeDivEdit('+OptionCounterEdit+')">×</button></div>');
                optionsEditArray.push(OptionCounterEdit);
                
                OptionCounterEdit++;
                
           
        }  

        

        
        var addQuestionJson=Array();
        function submitAddParameters(){
            QuestionType=$("#questionType").children("option:selected").val();
            var checkPoint=1;
            addQuestionJson=[];   
            //$("#submitAddButton").attr("disabled", "disabled");
            if($("#noTitleMsg").length || $("#noOPtionText").length){
                $("#noTitleMsg").remove();
                $("#noOPtionText").remove();
            }
            //console.log(clickedParam);
            //console.log(optionsAddArray);
            addQuestionJson=params;
            var tempJson={};
            var tempArray=[];    
            var titleAdd=$("#parameterTitleAdd").val();
            if(titleAdd==""){
                // alert("Please enter question before submit..");
                $("#parameterTitleAdd").after('<div class="alert alert-danger" id="noTitleMsg" style="background-color:#FFFFFF;border-color:#FFFFFF;padding-top: 0px;padding-left: 0px;padding-bottom: 0px;">Enter title before submitting .</div>');
                return;
            }else{
                if(optionsAddArray.length>0 && (QuestionType=='radio' || QuestionType=='checkbox')){
                    //console.log('radio');
                    $.each(optionsAddArray,function(i,d){

                        if($("#optionValueInputAdd"+d).val()=="" || $("#optionWeightageInputAdd"+d).val()==""){
                            $("#parameterTitleAdd").after('<div class="alert alert-danger col-md-12" id="noOPtionText" style="background-color:#FFFFFF;border-color:#FFFFFF;padding-top: 0px;padding-left: 0px;padding-bottom: 0px;">Enter option values before submitting .</div>');
                            checkPoint=0;
                            return;
                        }else{
                            tempArray.push({"key":$("#optionValueInputAdd"+d).val(),"value":$("#optionWeightageInputAdd"+d).val()});
                           
                        }
                    });
                    if(checkPoint){
                       tempJson['parameter_values']=tempArray;
                        tempJson['parameter_title']=titleAdd;
                        tempJson['parameter_selected_value']=-1;  
                        tempJson['parameter_type']=QuestionType;
                        addQuestionJson.push(tempJson); 
                        
                        var camp_id=$("#hiddenCampValue").val(); 
                       getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+clickedParam,'POST',addQuestionJson,'createCampaignParameter');
                    }
                }else if(optionsAddArray.length==0 && (QuestionType=='textbox' || QuestionType=='star')){
                    //console.log('tb');
                    tempJson['parameter_values']=tempArray;
                    tempJson['parameter_title']=titleAdd;
                    tempJson['parameter_selected_value']=-1;
                    tempJson['parameter_type']=QuestionType;
                    addQuestionJson.push(tempJson);
                    var camp_id=$("#hiddenCampValue").val(); 
                    getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+clickedParam ,'POST',addQuestionJson,'createCampaignParameter');
                }else{
                    alert('add at least one option...');
                    return;
                }

                
            }
            
            
        }
        var EditQuestionJson=Array();
        function submitEditParameters(){ 
            QuestionTypeEdit=$("#questionTypeEdit").children("option:selected").val();
            var checkPoint=1;
            if($("#noTitleMsg").length || $("#noOPtionText").length){
                $("#noTitleMsg").remove();
                $("#noOPtionText").remove();
            }
            EditQuestionJson=params;
            var tempJson={};
            var tempArray=[];    
            var titleEdit=$("#parameterTitleEdit").val();
            if(titleEdit==""){
                $("#parameterTitleEdit").after('<div class="alert alert-danger col-md-12" id="noOPtionText" style="background-color:#FFFFFF;border-color:#FFFFFF;padding-top: 0px;padding-left: 0px;padding-bottom: 0px;">Enter option values before submitting .</div>'); 
                checkPoint=0;
                return;
            }else{
                if(optionsEditArray.length>0 && (QuestionTypeEdit=='radio' || QuestionTypeEdit=='checkbox')){
                    $.each(optionsEditArray,function(i,d){

                        if($("#optionValueInputEdit"+d).val()=="" || $("#optionWeightageInputEdit"+d).val()==""){
                            if($("#noOPtionText").length){
                                $("#noOPtionText").remove();
                            }
                            $("#parameterTitleEdit").after('<div class="alert alert-danger" id="noOPtionText" style="background-color:#FFFFFF;border-color:#FFFFFF;padding-top: 0px;padding-left: 0px;padding-bottom: 0px;">Enter option values before submitting .</div>');
                            checkPoint=0;
                            return;
                        }else{
                            
                            tempArray.push({"key":$("#optionValueInputEdit"+d).val(),"value":$("#optionWeightageInputEdit"+d).val()});
                           
                        }


                    });
                    if(checkPoint){
                        tempJson['parameter_values']=tempArray;
                        tempJson['parameter_title']=titleEdit;
                        tempJson['parameter_selected_value']=-1; 
                        tempJson['parameter_type']=QuestionTypeEdit;
                        EditQuestionJson[parameterRowEdit]=tempJson; 
                        // EditQuestionJson.push(tempJson); 

                        var camp_id=$("#hiddenCampValue").val();

                        getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+clickedParam,'POST',EditQuestionJson,'createCampaignParameter');

                    }
                    
                    

                }else if(optionsEditArray.length==0 && (QuestionTypeEdit=='textbox' || QuestionTypeEdit=='star')){
                    tempJson['parameter_values']=tempArray;
                    tempJson['parameter_title']=titleEdit;
                    tempJson['parameter_selected_value']=-1;
                    tempJson['parameter_type']=QuestionTypeEdit;
                    EditQuestionJson[parameterRowEdit]=tempJson;
                    var camp_id=$("#hiddenCampValue").val();
                    getDataApi("https://api1.svgcolumbus.com/parameters?user_id="+userid+"&token_id="+token+"&campaign_id="+camp_id+"&param_type="+clickedParam,'POST',EditQuestionJson,'createCampaignParameter');
                    
                }else{ 
                    alert('add at least one option...');
                    return;
                }

                
            }
            
        }

        function createCampaignParameterResult(result){   
            
            // $("#parameterSuccess").click();
            $(".tst1").click();

            $("#questionsListingRows").html('');

            if(addQuestionJson.length>0){
                campaignParameterResult(addQuestionJson);
                addQuestionJson=[];
            }else if(EditQuestionJson.length>0){
                campaignParameterResult(EditQuestionJson);
                EditQuestionJson=[];
            }else{
                campaignParameterResult(deleteQuestionJson);
                deleteQuestionJson=[];
            }
            
            $(".bs-add-modal-lg").modal('hide');
            $(".bs-edit-modal-lg").modal('hide');

            
             
        }


        function onFocusAddTitle(){
            
            if($("#noTitleMsg").length || $("#noOPtionText").length){
                $("#noTitleMsg").remove();
                $("#noOPtionText").remove();
            }
            
        }
        