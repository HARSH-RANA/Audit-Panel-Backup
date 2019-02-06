/*
Template Name: Monster Admin
Author: Themedesigner
Email: niravjoshi87@gmail.com
File: js
*/
$(function() {
    "use strict";
      $(".tst2").click(function(){
           $.toast({
            heading: 'Kindly select all values before submit.',
            position: 'top-center',
            loaderBg:'#ff6849',
            icon: 'warning',
            hideAfter: 3500, 
            stack: 6
          }); 

     });
      
});
          
