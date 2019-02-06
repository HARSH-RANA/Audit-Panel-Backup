function handleAjaxError(jqXHR, textStatus, errorThrown) {
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
function getDataApi(url,method,data,type){
    switch(type) {
        case 'getcampaignlist': 
            //var url = 'https://jsonplaceholder.typicode.com/todos/1';
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignResult,
                error: handleAjaxError
            });
        break;  
        case 'getcampaignlistReport':
            //var url = 'https://jsonplaceholder.typicode.com/todos/1';
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignResultReport,
                error: handleAjaxError
            });
        break;
        case 'getReportData':
            //var url = 'https://jsonplaceholder.typicode.com/todos/1';
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignDataResultReport,
                error: handleAjaxError
            });
        break;
        case 'getdispositionlist':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : dispositionResult,
                error: handleAjaxError
            });
        break;
        case 'getsubdispositionlist':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : subdispositionResult,
                error: handleAjaxError
            });
        break;
        case 'getagentlist':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : agentResult,
                error: handleAjaxError 
            });
        break;
        case 'getauditlist':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : auditResult,
                error: handleAjaxError
            });
        break;
        case 'getparameterlist':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignParameterResult,
                error: handleAjaxError
            });
        break;
        //save audit
        case 'postparameterlist':
              $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success : postCampaignParameterResult,
                error: handleAjaxError
            }); 
        break;
        case 'getparameterlistvoc':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignParameterResultvoc,
                error: handleAjaxError
            });
        break;
        case 'getparameterlistsales':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: data,
                success : campaignParameterResultsales,
                error: handleAjaxError
            });
        break;
        case 'createCampaignParameter':
            $.ajax({
                async : true,
                crossDomain : true,
                url : url,
                method : method,
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                success : createCampaignParameterResult,
                error: handleAjaxError
            });
        break;
    }        
}