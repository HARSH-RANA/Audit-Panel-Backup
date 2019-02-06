$(function() {
    "use strict";
    function stripScripts(s) {
        var div = document.createElement('div');
        div.innerHTML = s;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
        while (i--) {
          scripts[i].parentNode.removeChild(scripts[i]);
        }
        return div.innerHTML;
      }
    $(function() {
        $(".preloader").fadeOut()
    }), jQuery(document).on("click", ".mega-dropdown", function(i) {
        i.stopPropagation()
    });
    var i = function() {
        var i = window.innerWidth > 0 ? window.innerWidth : this.screen.width,
            e = 70;
        1170 > i ? ($("body").addClass("mini-sidebar"), $(".navbar-brand span").hide(),$(".fix-header .topbar").stick_in_parent({}), $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"), $(".sidebartoggler i").addClass("ti-menu")) : ($("body").removeClass("mini-sidebar"), $(".navbar-brand span").show(),$(".fix-header .topbar").stick_in_parent({}));
        var o = (window.innerHeight > 0 ? window.innerHeight : this.screen.height) - 1;
        o -= e, 1 > o && (o = 1), o > e && $(".page-wrapper").css("min-height", o + "px")
    };
    $(window).ready(i), $(window).on("resize", i), $(".sidebartoggler").on("click", function() {
        $("body").hasClass("mini-sidebar") ? ($("body").trigger("resize"), $(".scroll-sidebar, .slimScrollDiv").css("overflow", "hidden").parent().css("overflow", "visible"), $("body").removeClass("mini-sidebar"), $(".navbar-brand span").show()) : ($("body").trigger("resize"), $(".scroll-sidebar, .slimScrollDiv").css("overflow-x", "visible").parent().css("overflow", "visible"), $("body").addClass("mini-sidebar"), $(".navbar-brand span").hide())
    }), $(".nav-toggler").click(function() {
        $("body").toggleClass("show-sidebar"), $(".nav-toggler i").toggleClass("ti-menu"), $(".nav-toggler i").addClass("ti-close")
    }), $(".sidebartoggler").on("click", function() {}), $(".search-box a, .search-box .app-search .srh-btn").on("click", function() {
        $(".app-search").toggle(200)
    }), $(".right-side-toggle").click(function() {
        $(".right-sidebar").slideDown(50), $(".right-sidebar").toggleClass("shw-rside")
    }), $(".floating-labels .form-control").on("focus blur", function(i) {
        $(this).parents(".form-group").toggleClass("focused", "focus" === i.type || this.value.length > 0)
    }).trigger("blur"), $(function() {
        for (var i = window.location, e = $("ul#sidebarnav a").filter(function() {
                return this.href == i
            }).addClass("active").parent().addClass("active");;) {
            if (!e.is("li")) break;
            e = e.parent().addClass("in").parent().addClass("active")
        }
    }), $(function() {
        $('[data-toggle="tooltip"]').tooltip()
    }), $(function() {
        $('[data-toggle="popover"]').popover()
    }), $(function() {
        $("#sidebarnav").metisMenu()
    }), $(".scroll-sidebar").slimScroll({
        position: "left",
        size: "5px",
        height: "100%",
        color: "#dcdcdc"
    }), $(".message-center").slimScroll({
        position: "right",
        size: "5px",
        color: "#dcdcdc"
    }), $(".aboutscroll").slimScroll({
        position: "right",
        size: "5px",
        height: "80",
        color: "#dcdcdc"
    }), $(".message-scroll").slimScroll({
        position: "right",
        size: "5px",
        height: "570",
        color: "#dcdcdc"
    }), $(".chat-box").slimScroll({
        position: "right",
        size: "5px",
        height: "470",
        color: "#dcdcdc"
    }), $(".slimscrollright").slimScroll({
        height: "100%",
        position: "right",
        size: "5px",
        color: "#dcdcdc"
    }), $("body").trigger("resize"), $(".list-task li label").click(function() {
        $(this).toggleClass("task-done")
    }), $("#to-recover").on("click", function() {
        $("#loginform").slideUp(), $("#recoverform").fadeIn()
    }), $('a[data-action="collapse"]').on("click", function(i) {
        i.preventDefault(), $(this).closest(".card").find('[data-action="collapse"] i').toggleClass("ti-minus ti-plus"), $(this).closest(".card").children(".card-body").collapse("toggle")
    }), $('a[data-action="expand"]').on("click", function(i) {
        i.preventDefault(), $(this).closest(".card").find('[data-action="expand"] i').toggleClass("mdi-arrow-expand mdi-arrow-compress"), $(this).closest(".card").toggleClass("card-fullscreen")
    }), $('a[data-action="close"]').on("click", function() {
        $(this).closest(".card").removeClass().slideUp("fast")
    }),$("ul#sidebarnav a").click(function(e){
        e.preventDefault();
        if($(this).attr("href") != '#'){
            $("ul#sidebarnav a").removeClass("active").parent().removeClass("active");
            $("ul#sidebarnav ul").removeClass("in").parent().removeClass("in");
            //console.log($(this).attr("href"));
            window.history.pushState({"pageTitle":''},"", $(this).attr("href"));
            var url = new URL(window.location);
            var pageid = url.searchParams.get("pageid");
        // console.log(window.location);
            for (var i = window.location, le = $("ul#sidebarnav a").filter(function() {
                return this.href == i.href
            }).addClass("active").parent().addClass("active");;) {
                if (!le.is("li")) break;
                le = le.parent().addClass("in").parent().addClass("active");
            }
            
            $.ajax({
                async : true,
                crossDomain : true,
                url : '/controller.php?pageid='+pageid,
                success : function(result){
                    var regexMatch = result.match(/<script.*?>([\s\S]*?)<\/script>/gmi)
                    if(regexMatch.length>0){
                        for(var i=0; i<regexMatch.length; i++){
                            var regex = RegExp("<script?\\w+(?:\\s+(?:src=\"([^\"]*)\")|[^\\s>]+|\\s+)*>","gi");
                            var matches = regex.exec(regexMatch[i]);
                            if(typeof(matches) !=="undefined" && matches.length>1){
                               var script = document.createElement('script');
                               script.setAttribute('src', matches[1]);
                               script.setAttribute('type', 'text/javascript');
                               document.getElementsByTagName('head')[0].appendChild(script);
                            }
                        }
                    }
                // console.log(result);
                $('.container-fluid').html(stripScripts(result));
                   
                }
            });
        //console.log('a clicked');
        }
    })
});