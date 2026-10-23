var app = {};
var pathname = window.location.pathname;

$(document).ready(function () {
    app = {
        vars:{
            initBreakpointDesktop: null
        },
        init: function () {
            app.checkMenu();
			app.experienceMenu();
			app.smallMenu();
            app.onLoadResize();
            app.cookies();
			app.darkMode();
        },
		
        //CHECK MENU
        checkMenu:function(){
                $("#top-bar2 #site_title").empty();
                $("#top-bar2 #site_title").append('<h1 class="d-block"><a href="/gerador"><span class="bold">Gerador da Declaração</span><br>de Acessibilidade e Usabilidade</a></h1>');
                $("#small_menu #site_title_small").empty();
                $("#small_menu #site_title_small").append('<h1 class="d-block"><span class="bold">Gerador da Declaração<br class="d-sm-none d-block">de Acessibilidade e Usabilidade</span></h1>');
        },

        //IF MOBILE ADD CLASSES (ACCORDIONS)
        onLoadResize:function(){
            var width = window.innerWidth;
                if(width < 992){
                //Pre-footer
                $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                    $(this).attr("data-toggle", "collapse");
                    $(this).attr("aria-expanded", "false");

                });
                $('#pre_footer div[data-toggle="collapse"] a').click(function (e) {
                   e.preventDefault();
                });

                //Experience Menu - HEADER
                $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                    $(this).attr("data-toggle", "collapse");
                    $(this).attr("aria-expanded", "false");
                });

                $('#experience_menu div[data-toggle="collapse"] a').click(function (e) {
                    e.preventDefault();
                });

                 if(width < 767){
                    $("#experience_menu_desc").addClass("collapse");
                    $("#experience_menu #experience_menu_title").attr("data-toggle", "collapse");
                    $("#experience_menu #experience_menu_title").attr("data-target", "#experience_menu_desc");
                    
                }
                else{
                    $("#experience_menu_desc").removeClass("collapse");
                    $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                    $("#experience_menu #experience_menu_title").attr("data-target", "")
                }

            }else{

                //Pre-footer
                $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                    $(this).attr("data-toggle", "");
                    $(this).attr("aria-expanded", "");
                });

                //Experience Menu homepage
                $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                    $(this).attr("data-toggle", "");
                    $(this).attr("aria-expanded", "");
                });
                $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                $("#experience_menu #experience_menu_title").attr("data-target", "");
                $('#experience_menu div[data-toggle="collapse"] a').click(function (e) {
                    e.preventDefault();
                 });

            }

            $(window).on("resize", function(){
                var width = window.innerWidth;
                if(width < 992){
                    //Pre-footer
                    $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                        $(this).attr("data-toggle", "collapse");
                        $(this).attr("aria-expanded", "false");
                    });
                    $('#pre_footer div[data-toggle="collapse"] a').click(function (e) {
                        e.preventDefault();
                     });

                    //Experience Menu - HEADER
                    $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                        $(this).attr("data-toggle", "collapse");
                        $(this).attr("aria-expanded", "false");
                    });
                    
                    $('#experience_menu div[data-toggle="collapse"] a').click(function (e) {
                        e.preventDefault();
                    });

                    if(width < 767){
                        $("#experience_menu_desc").addClass("collapse");
                        $("#experience_menu #experience_menu_title").attr("data-toggle", "collapse");
                        $("#experience_menu #experience_menu_title").attr("data-target", "#experience_menu_desc");
                        
                    }
                    else{
                        $("#experience_menu_desc").removeClass("collapse");
                        $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                        $("#experience_menu #experience_menu_title").attr("data-target", "")
                    }
                }
                else{
                
                    //Pre-footer
                    $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                        $(this).attr("data-toggle", "");
                        $(this).attr("aria-expanded", "");
                    });
                    $('#pre_footer div[data-toggle=""] a').click(function (e) {
                        window.location = this.href;
                     }); 

                    //Experience Menu homepage
                    $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                        $(this).attr("data-toggle", "");
                        $(this).attr("aria-expanded", "");
                    });

                    $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                    $("#experience_menu #experience_menu_title").attr("data-target", "")

                }
            });
        },

        //COOKEIS
        cookies:function(){
            $( ".btn_cookies" ).click(function() {
                $( "#cookies_bar" ).fadeOut( "slow");
            });
        },
		

        //EXPERIENCE MENU - OPEN/CLOSE
        experienceMenu:function(){            
            $("#btn_experience_menu" ).click(function(event) {

                $("#experience_menu").toggle();
                if($("#experience_menu").is(":visible")){
                    $("#btn_experience_menu").attr("aria-expanded","true");
                    $("#top-bar2").hide();
                    $("#navbar").hide();
                    $("main").children("section").each(function(){
                        $(this).hide();
                    });
                    $("#pre_footer").hide();
                    $(".footer").hide();
                    $("#cookies_bar").hide();
                    $("#jump_main").hide();

                    $("#top-bar2").attr("aria-hidden","true");
                    $("main").children("section").each(function(){
                        $(this).attr("aria-hidden","true");
                    });
                    $("#pre_footer").attr("aria-hidden","true");
                    $(".footer").attr("aria-hidden","true");
                    $("#cookies_bar").attr("aria-hidden", "true");
                    $("#jump_main").attr("aria-hidden", "true");

                    $("#btn_experience_menu .icon-arrow-drop").css({'transform' : 'rotate('+ 180 +'deg)'});
                    //Disable scroll
                  $('body').css({
                        overflow: 'hidden',
                        height: '100%'
                    });
                }
                else{
                    $("#btn_experience_menu").attr("aria-expanded","false");
                    $("#top-bar2").show();
                    $("#navbar").show();
                    $("main").children("section").each(function(){
                        $(this).show();
                    });
                    $("#pre_footer").show();
                    $(".footer").show();
                    $("#cookies_bar").show();
                    $("#jump_main").show();

                    $("#top-bar2").attr("aria-hidden","false");
                    $("main").children("section").each(function(){
                        $(this).attr("aria-hidden","false");
                    });
                    $("#pre_footer").attr("aria-hidden","false");
                    $(".footer").attr("aria-hidden","false");
                    $("#cookies_bar").attr("aria-hidden", "false");
                    $("#jump_main").attr("aria-hidden", "false");
                    

                    $("#btn_experience_menu .icon-arrow-drop").css({'transform' : 'rotate('+ 360 +'deg)'});
                    //Restore scroll
                    $('body').css({
                        overflow: 'auto',
                        height: 'auto'
                    }); 
                }
            });

         
        },


        //OPEN SMALL MENU
        smallMenu:function(){
            $("#open_small_menu").click(function() {
                $("#small_menu").show();
                $("#open_small_menu").attr("aria-expanded", "true");
                $("#close_small_menu").attr("aria-expanded", "true");
                $("#top-bar2").css({'display':'none'});
                $("#top-bar").css({'display':'none'});
                $("main").children("section").each(function(){
                    $(this).hide();
                });
                $("#pre_footer").hide();
                $(".footer").hide();
                $("#cookies_bar").hide();
                $("#jump_main").hide();

                $("#top-bar2").attr("aria-hidden","true");
                $("#top-bar").attr("aria-hidden","true");
                $("main").children("section").each(function(){
                    $(this).attr("aria-hidden","true");
                });
                $("#pre_footer").attr("aria-hidden","true");
                $(".footer").attr("aria-hidden","true");
                $("#cookies_bar").attr("aria-hidden", "true");
                $("#jump_main").attr("aria-hidden", "true");
            });

            //CLOSE SMALL MENU
            $("#close_small_menu").click(function() {
                $("#small_menu").hide();
                $("#open_small_menu").attr("aria-expanded", "false");
                $("#close_small_menu").attr("aria-expanded", "false");
                $("#top-bar2").css({'display':'block'});
                $("#top-bar").css({'display':'block'});
                $("main").children("section").each(function(){
                    $(this).show();
                });
                $("#pre_footer").show();
                $(".footer").show();
                $("#cookies_bar").show();
                $("#jump_main").show();

                $("#top-bar2").attr("aria-hidden","false");
                $("#top-bar").attr("aria-hidden","false");
                $("main").children("section").each(function(){
                    $(this).attr("aria-hidden","false");
                });
                $("#pre_footer").attr("aria-hidden","false");
                $(".footer").attr("aria-hidden","false");
                $("#cookies_bar").attr("aria-hidden", "false");
                $("#jump_main").attr("aria-hidden", "false");
            });
        },        


        //BACK TO HOMEPAGE => 404 
        /*backHomePage:function(){
            var origin   = window.location.origin;
            $("#back_home").click(function(){
                window.location.replace(origin + "/acessibilidade/index.php");
            })
        },*/
		
		darkMode:function(){
            var origin = window.location.origin;
            if(sessionStorage.getItem("dark_mode") == "true"){
                $('#btn_dark_mode a').prepend("Modo Claro");
                $('#dark_mode_text_small').text("Ver Modo Claro");
                $("head").append('<link rel="stylesheet" type="text/css" href="/gerador/css/dark_mode.css" />');
				
            }
            else{
                $('#btn_dark_mode a').prepend("Modo Escuro");
                $('#dark_mode_text_small').text("Ver Modo Escuro");
            }
            $("#btn_dark_mode").click(function(){
                var dark = '';
                if(sessionStorage.getItem("dark_mode") == "true"){
                    sessionStorage.setItem("dark_mode", false);
                    $dark = false;
                }
                else{
                    sessionStorage.setItem("dark_mode", true);
                    $dark = true;
                }
                var ajax_url = origin+'/wp-admin/admin-ajax.php';
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        dark: dark,
                        action: 'change_mode',
                    },
                    success:function(data){
                        location.reload();
                    },
                    error: function(xhr, status, error){
                      console.log(error);
                    }
                });
            });

            $("#dark_mode_small").click(function(){
                var dark = '';
                if(sessionStorage.getItem("dark_mode") == "true"){
                    sessionStorage.setItem("dark_mode", false);
                    $dark = false;
                }
                else{
                    sessionStorage.setItem("dark_mode", true);
                    $dark = true;
                }
                var ajax_url = origin+'/wp-admin/admin-ajax.php';
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        dark: dark,
                        action: 'change_mode',
                    },
                    success:function(data){
                        location.reload();
                    },
                    error: function(xhr, status, error){
                      console.log(error);
                    }
                });
            });
        },

    }

})




//COOKEIS

$(document).ready(function() {
    listenUser();
    $("button.btn_cookies").click(function(){
        createCookie();
    });
    
    $("button.btn_no_cookies").click(function(){
        noCookie();
    });
    
});

if (document.cookie.indexOf('AcessibilidadeGovGeradorCookie=true') > -1) {
    $(".cookies_bar").hide();
    

    
}else if(getCookie()==false || getCookie()=='false'){
    $(".cookies_bar").hide();
}else{
    $(".cookies_bar").show();
}

function noCookie() {
    $('.cookies_bar').slideDown("slow");
    setCookie(false)  
}

function createCookie(){

    var dataExpira = new Date()
    dataExpira.setTime(dataExpira.getTime() + 60*24*60*60*1000);
    document.cookie = 'AcessibilidadeGovGeradorCookie=true; expires=' + dataExpira +'; path=/';
    $('.cookies').hide();
    /*(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-35831726-1', 'auto');
    ga('send', 'pageview');*/

    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-35831726-11');
    
}

function setCookie(id){
    var AcessibilidadeGovGeradorCookie = id;
    sessionStorage.setItem('AcessibilidadeGovGeradorCookie', AcessibilidadeGovGeradorCookie);
}

function getCookie(){
    var AcessibilidadeGovGeradorCookie = sessionStorage.getItem('AcessibilidadeGovGeradorCookie');
    return AcessibilidadeGovGeradorCookie;
}	

function listenUser(){
	
    $(document).bind("click scroll", triggerUser);

    var flag = false;
    var refreshId = null
    function triggerUser(e) {
        if(flag == false){
            refreshId = setInterval(setTime, 1000);
            flag = true;
        }

    }
    
    var totalSeconds = 0;

    function setTime() {

        ++totalSeconds;

        if(totalSeconds == 20){
            $( "#cookies_bar" ).fadeOut( "slow");
            createCookie();
            clearInterval(refreshId);
        }
        
    }
    


}






//  <!--################################################################################################################ Script Tabs -->


// tabs https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
/*
*   This content is licensed according to the W3C Software License at
*   https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
*/
(function () {
    var tablist = document.querySelectorAll('[role="tablist"]')[0];
    var tabs;
    var panels;
    var paginador;

    generateArrays();

    function generateArrays () {
        tabs = document.querySelectorAll('[role="tab"]');
        panels = document.querySelectorAll('[role="tabpanel"]');
        paginador = document.querySelectorAll('[role="button"]'); 

    };


    // Bind listeners
    for (i = 0; i < tabs.length; ++i) {
        addListenersTabs(i);
    };
    for (i = 0; i < paginador.length; ++i) {
        addListenersButtons(i);
    };

    function addListenersTabs (index) {
        $(tabs[index]).parents('li')[0].addEventListener('click', clickEventListener);
        //tabs[index].addEventListener('click', clickEventListener);
        tabs[index].index = index;
    };

    function addListenersButtons (index) {
        paginador[index].addEventListener('click', clickEventListener);
        paginador[index].index = index;
    };

    // When a tab is clicked, activateTab is fired to activate it
    function clickEventListener (event) {       
	

        if($(this).is('a')){
			//botões
            controls = this.getAttribute('aria-controls');
            var tab = $('#tab-menu').find('[aria-controls="'+controls+'"]')[0];
            console.log(tab);
        }
        else{
			
			//menu lateral
			var tabURL = this.children[0].children[0];
            var tab = this.children[0];
			location.href = tabURL
        }

       activateTab(tab, false);
      
    };

    // Activates any given tab panel
    function activateTab (tab, setFocus) {
        setFocus = setFocus || true;
        // Deactivate all other tabs
        deactivateTabs();


        // Get the value of aria-controls (which is an ID)
        var controls = tab.getAttribute('aria-controls');
		
        // Set the tab as selected
        tab = $('#tab-menu').find('[aria-controls="'+controls+'"]');
        tab.parents('li').addClass('selected');
		tab[0].setAttribute('aria-selected', 'true');

         // Remove tabindex attribute
        tab[0].removeAttribute('tabindex');

       

        // Remove hidden attribute from tab panel to make it visible
        document.getElementById(controls).removeAttribute('hidden');

        // Set focus when required
        if (setFocus) {
            tab[0].focus();
        };
    };

    // Deactivate all tabs and tab panels
    function deactivateTabs () {
        for (t = 0; t < tabs.length; t++) {
            tabs[t].setAttribute('tabindex', '-1');
            tabs[t].setAttribute('aria-selected', 'false');
			//tabs[t].parentElement.parentElement.removeAttribute('class', 'selected');   // adicionado paulo
            tabs[t].parentElement.removeAttribute('class', 'selected');   // adicionado paulo
            // tabs[t].removeEventListener('focus', focusEventHandler);
        };

        for (p = 0; p < panels.length; p++) {
            panels[p].setAttribute('hidden', 'hidden');
        };
    };

}());

//  <!--################################################################################################################ Fim Script Tabs -->