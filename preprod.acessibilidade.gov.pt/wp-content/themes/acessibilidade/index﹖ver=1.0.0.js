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
            app.searchSubmit();
            app.accessMonitorSend();
            app.darkMode();
            app.footerImages();
        },
        //CHECK MENU
        checkMenu:function(){
            var origin = window.location.origin;
            var origin2 = window.location.href;
            if(/*pathname == '/wordpress/index.php' ||*/ pathname == '/'){
                $("#top-bar2 #site_title").empty();
                $("#top-bar2 #site_title").append('<h1 class="d-block"><span class="bold">acessibilidade</span><br class="d-sm-none d-block">.gov.pt</h1>');
                $("#small_menu #site_title_small").empty();
                $("#small_menu #site_title_small").append('<h1 class="d-block"><span class="bold">acessibilidade<br class="d-sm-none d-block"></span>.gov.pt</h1>');
            }
            else{
                $("#top-bar2 #site_title").empty(); 
                $("#top-bar2 #site_title").append('<a href="'+origin+'/" title="ir para a página de entrada do acessibilidade.gov.pt"><span class="bold">acessibilidade</span><br class="d-sm-none d-block">.gov.pt</a>');
                $("#small_menu #site_title_small").empty();
                $("#small_menu #site_title_small").append('<a href="'+origin+'/" title="ir para a página de entrada do acessibilidade.gov.pt"><span class="bold">acessibilidade<br class="d-sm-none d-block"></span>.gov.pt</a>');
            }
            switch(pathname) {
                case "/":
                    $("#nav_index").attr("aria-current","page");
                    $("#nav_small_index").parent().attr("aria-current","page");
                    $("#nav_small_index").attr("aria-current","page");
                    $("#title_description_small").show();
                break;
                case "/quem-somos/":
                    $("#nav_about").attr("aria-current","page");
                    $("#nav_small_about").parent().attr("aria-current","page");
                    $("#nav_small_about").attr("aria-current","page");
                break;
                case "/contactos/":
                    $("#nav_contacts").attr("aria-current","page");
                    $("#nav_small_contacts").parent().attr("aria-current","page");
                    $("#nav_small_contacts").attr("aria-current","page");
                break;
                case "/blogue/":
                    $("#nav_blogue").attr("aria-current","page");
                    $("#nav_small_blogue").parent().attr("aria-current","page");
                    $("#nav_small_blogue").attr("aria-current","page");
                break;
                case "/publicacoes/":
                    $("#nav_publications").attr("aria-current","page");
                    $("#nav_small_publications").parent().attr("aria-current","page");
                    $("#nav_small_publications").attr("aria-current","page");
                break;
                case "/tutoriais/":
                    $("#nav_tutorials").attr("aria-current","page");
                    $("#nav_small_tutorials").parent().attr("aria-current","page");
                    $("#nav_small_tutorials").attr("aria-current","page");
                break;
                case "/ferramentas/":
                    $("#nav_tools").attr("aria-current","page");
                    $("#nav_small_tools").parent().attr("aria-current","page");
                    $("#nav_small_tools").attr("aria-current","page");
                break;  
                default:
                    if(origin2.indexOf("/blogue/") >= 0){
                        $("#nav_blogue").attr("aria-current","page");
                        $("#nav_small_blogue").parent().attr("aria-current","page");
                        $("#nav_small_blogue").attr("aria-current","page");
                    }
                    if(origin2.indexOf("/tutorial/") >= 0){
                        $("#nav_tutorials").attr("aria-current","page");
                        $("#nav_small_tutorials").parent().attr("aria-current","page");
                        $("#nav_small_tutorials").attr("aria-current","page");
                    }
                    if(origin2.indexOf("/quem-somos/") >= 0){
                        $("#nav_about").attr("aria-current","page");
                        $("#nav_small_about").parent().attr("aria-current","page");
                        $("#nav_small_about").attr("aria-current","page");
                    }
                    if(origin2.indexOf("/publicacao/") >= 0){
                        $("#nav_publications").attr("aria-current","page");
                        $("#nav_small_publications").parent().attr("aria-current","page");
                        $("#nav_small_publications").attr("aria-current","page");
                    }
                break;      
            }

            // Instantiate the Bootstrap carousel
                $('.multi-item-carousel').carousel({
                    interval: false
                });
                
                // for every slide in carousel, copy the next slide's item in the slide.
                // Do the same for the next, next item.
                $('.multi-item-carousel .item').each(function(){
                    var next = $(this).next();
                    if (!next.length) {
                    next = $(this).siblings(':first');
                    }
                    next.children(':first-child').clone().appendTo($(this));
                    
                    if (next.next().length>0) {
                    next.next().children(':first-child').clone().appendTo($(this));
                    } else {
                        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
                    }
                });

            $('.textwidget').contents().unwrap();
                
        },

        footerImages:function(){
            var origin = window.location.origin+'/wp-content/themes/acessibilidade/imgs/';
            if(sessionStorage.getItem("dark_mode") == "true"){
                $("#republica_portuguesa").attr("src",origin+'republica_portuguesa-dk.png');
                $("#ama_img").attr("src",origin+'ama-modernizacao_administrativa-dk.png');
                $("#compete_2020").attr("src",origin+'compete_2020-dk.png');
                $("#uniao_europeia").attr("src",origin+'UE-uniao_europeia-dk.png');
                $("#portugal_2020").attr("src",origin+'portugal_2020-dk.png');
            }
        },

        darkMode:function(){
            var origin = window.location.origin;
            if(sessionStorage.getItem("dark_mode") == "true"){
                //$('head').append('<link rel="stylesheet" type="text/css" href="'+origin+'/wp-content/themes/acessibilidade/css/dark_mode.css">');
                $('#dark_mode_text_small').text("Ver Modo Claro");
                $('#dark_mode').prepend("Modo Claro");
            }
            else{
                $('#dark_mode_text_small').text("Ver Modo Escuro");
                $('#dark_mode').prepend("Modo Escuro");
            }
            $("#dark_mode").click(function(){
                var dark = '';
                var ajax_url = origin+'/wp-admin/admin-ajax.php';
                if(sessionStorage.getItem("dark_mode") == "true"){
                    sessionStorage.setItem("dark_mode", false);
                    dark = false;
                }
                else{
                    sessionStorage.setItem("dark_mode", true);
                    dark = true;
                }
                
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
                var ajax_url = origin+'/wp-admin/admin-ajax.php';
                if(sessionStorage.getItem("dark_mode") == "true"){
                    sessionStorage.setItem("dark_mode", false);
                    $('#dark_mode_text_small').text("Ver Modo Claro");
                    $('#dark_mode').text("Modo Claro");
                    dark = false;
                }
                else{
                    sessionStorage.setItem("dark_mode", true);
                    $('#dark_mode_text_small').text("Ver Modo Escuro");
                    $('#dark_mode').text("Modo Escuro");
                    dark = true;
                }
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

                //TOOLS & PUBLICATIONS - ACCORDIONS
                $(".tools_list .w-100").addClass("collapse");
                $(".tools_list .tool_category").each(function(){
                    $(this).attr("data-toggle", "collapse");
                    $(this).attr("aria-expanded", "false");
                });

                //TUTORIAL STICKY BAR
                if(pathname.indexOf("/tutorial/") >= 0){
                    $("#index_tutorial_full").addClass("sticky-top");
                    $("#index_sticky").removeClass("sticky-top");
                }
                //SEARCH - FILTERS
                if(pathname == "/resultados-de-pesquisa/"){
                    $("#filters").addClass("sticky-top");
                }
            }
            else{
                //TUTORIAL STICKY BAR
                if(pathname.indexOf("/tutorial/") >= 0){
                    $("#index_tutorial_full").removeClass("sticky-top");
                    $("#index_sticky").addClass("sticky-top");
                }
                //SEARCH - FILTERS
                if(pathname == "/resultados-de-pesquisa/"){
                    $("#filters").removeClass("sticky-top");
                }
            
                //Pre-footer
                $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                    $(this).attr("data-toggle", "");
                    $(this).attr("aria-expanded", "true");
                });

                //Experience Menu homepage
                $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                    $(this).attr("data-toggle", "");
                    $(this).attr("aria-expanded", "true");
                });
                $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                $("#experience_menu #experience_menu_title").attr("data-target", "");
                $('#experience_menu div[data-toggle="collapse"] a').click(function (e) {
                    e.preventDefault();
                 });

                //TOOLS & PUBLICATIONS 
                $(".tools_list .w-100").removeClass("collapse");
                $(".tools_list .tool_category").each(function(){
                    $(this).attr("data-toggle", "");
                    $(this).attr("aria-expanded", "true");
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
                    
                    //TOOLS & PUBLICATIONS - ACCORDIONS
                    $(".tools_list .w-100").addClass("collapse");
                    $(".tools_list .tool_category").each(function(){
                        $(this).attr("data-toggle", "collapse");
                        $(this).attr("aria-expanded", "false");
                    });


                    //TUTORIAL STICKY BAR
                    if(pathname.indexOf("/tutorial/") >= 0){
                        $("#index_tutorial_full").addClass("sticky-top");
                        $("#index_sticky").removeClass("sticky-top");
                    }
                    //SEARCH - FILTERS
                    if(pathname == "/resultados-de-pesquisa/"){
                        $("#filters").addClass("sticky-top");
                    }
                }
                else{
                    //TUTORIAL STICKY BAR
                    if(pathname.indexOf("/tutorial/") >= 0){
                        $("#index_tutorial_full").removeClass("sticky-top");
                        $("#index_sticky").addClass("sticky-top");
                    }
                    //SEARCH - FILTERS
                    if(pathname == "/resultados-de-pesquisa/"){
                        $("#filters").removeClass("sticky-top");
                    }
                
                    //Pre-footer
                    $('#pre_footer .container .row .col-lg-4').children('.align-items-center').each(function () {
                        $(this).attr("data-toggle", "");
                        $(this).attr("aria-expanded", "true");
                    });
                    $('#pre_footer div[data-toggle=""] a').click(function (e) {
                        window.location = this.href;
                     }); 

                    //Experience Menu homepage
                    $('#experience_menu .container #experience_links .col-12').children('.d-inline-flex').each(function () {
                        $(this).attr("data-toggle", "");
                        $(this).attr("aria-expanded", "true");
                    });

                    $("#experience_menu #experience_menu_title").attr("data-toggle", "");
                    $("#experience_menu #experience_menu_title").attr("data-target", "")

                    //TOOLS & PUBLICATIONS 
                    $(".tools_list .w-100").removeClass("collapse");
                    $(".tools_list .tool_category").each(function(){
                        $(this).attr("data-toggle", "");
                        $(this).attr("aria-expanded", "true");
                    });
                }
            });
        },

        //COOKEIS
        cookies:function(){
            $( ".btn_cookies" ).click(function() {
                $("#cookies_bar").css("display", "none")
                setCookie('acessibilidade_cookies', true, 7);
            });
            $( ".btn_no_cookies" ).click(function() {
                $("#cookies_bar").css("display", "none")
                setCookie('acessibilidade_cookies', false, 7);
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
                    $(".top-bar-right").css({"margin-right":"17px"});
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
                    $(".top-bar-right").css({"margin-right":"0px"});
                }
            });

            $("#experience_menu .btn_info").click(function(event){
                event.preventDefault();
                window.open('https://experiencia-digital.gov.pt', '_blank');
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


        //SHARE ICONS -> SWAP ICONS
        shareIcons:function(){
            //FACEBOOK
            $("#fb_icon").mouseover(function(){
                $(this).removeClass("icon-share-facebook");
                $(this).addClass("icon-share-facebook-over");
            });
            $("#fb_icon").mouseout(function(){
                $(this).removeClass("icon-share-facebook-over");
                $(this).addClass("icon-share-facebook");
            });
            //TWITTER
            $("#tw_icon").mouseover(function(){
                $(this).removeClass("icon-share-twitter");
                $(this).addClass("icon-share-twitter-over");
            });
            $("#tw_icon").mouseout(function(){
                $(this).removeClass("icon-share-twitter-over");
                $(this).addClass("icon-share-twitter");
            });
            //LINKEDIN
            $("#ln_icon").mouseover(function(){
                $(this).removeClass("icon-share-linkedin");
                $(this).addClass("icon-share-linkedin-over");
            });
            $("#ln_icon").mouseout(function(){
                $(this).removeClass("icon-share-linkedin-over");
                $(this).addClass("icon-share-linkedin");
            });
        },


        //SEARCH -> OPEN/CLOSE FILTER
        searchFilterMenu:function(){
            $(".top-filter").click(function(){
                $("#menu-filters").toggle();
                if($("#menu-filters").is(":visible")){
                    $("#icon_menu_search").removeClass("icon-content-menu-down");
                    $("#icon_menu_search").addClass("icon-content-menu-up");
                }
                else{
                    $("#icon_menu_search").removeClass("icon-content-menu-up");
                    $("#icon_menu_search").addClass("icon-content-menu-down");
                }
            })
        },

        //TUTORIAL -> OPEN/CLOSE INDEX
        tutorialIndex:function(){
            //LARGE
            var w = window.innerWidth;
            if(w < 992){
                $("#btn_index").attr("aria-expanded", "false");
            }

            $(window).resize(function() {
                var w = window.innerWidth;
                if(w < 992){
                    $("#btn_index").attr("aria-expanded", "false");
                }
                else{
                    $("#btn_index").attr("aria-expanded", "true");
                }
            });

            $("#btn_index").click(function(){
                var w = window.innerWidth;
                var flag = $(this).attr("aria-expanded");
                if(flag == "true"){
                    if(w > 991){
                        $("#index_sticky nav").attr("aria-hidden", "true");
                        $(this).attr("aria-expanded", "false");
                        $(this).children("h2").addClass("sr-only");
                        $("#icon_menu_index").removeClass("icon-content-menu-left");
                        $("#icon_menu_index").addClass("icon-content-menu-right");
                        //$("#index_pages").css({'display': 'none !important'});
                        $("#index_pages").removeClass('d-lg-block');
                        $("#index_pages").addClass('d-none');
                        if($('#index_tutorial').length ){
                            $("#index_tutorial").removeClass("index");
                            $("#index_tutorial").addClass("index-closed");
                        }
                        if($('#index_tutorial_full').length ){
                            $("#index_tutorial_full").removeClass("index");
                            $("#index_tutorial_full").addClass("index-closed");
                        }
                        $("#index_sticky").removeClass("sticky-top");
                        $(this).css({"padding": "0 !important", "justify-content": "center"});
                        $(".index_title").addClass("d-none");
                    }
                    else{
                        $(this).attr("aria-expanded", "false");
                        $("#index_sticky nav").attr("aria-hidden", "true");
                        $("#btn_index_small").removeClass("icon-content-menu-up");
                        $("#btn_index_small").addClass("icon-content-menu-down");
                        $("#index_pages").hide();
                    }
                   
                }
                else{
                    if(w > 991){
                        $("#index_sticky nav").attr("aria-hidden", "false");
                        $(this).attr("aria-expanded", "true");
                        $(this).children("h2").removeClass("sr-only");
                        $("#icon_menu_index").removeClass("icon-content-menu-right");
                        $("#icon_menu_index").addClass("icon-content-menu-left");
                        //$("#index_pages").css({'display': 'none !important'});
                        $("#index_pages").removeClass('d-none');
                        $("#index_pages").addClass('d-lg-block');
                        if($('#index_tutorial').length ){
                            $("#index_tutorial").removeClass("index-closed");
                            $("#index_tutorial").addClass("index");
                        }
                        if($('#index_tutorial_full').length ){
                            $("#index_tutorial_full").removeClass("index-closed");
                            $("#index_tutorial_full").addClass("index");
                        }
                        $("#index_sticky").addClass("sticky-top");
                        
                        $(this).css({"padding": "0px 20px 0px 25px !important", "justify-content": "space-between"});
                        
                        $(".index_title").removeClass("d-none");
                    }
                    else{
                        $(this).attr("aria-expanded", "true");
                        $("#index_sticky nav").attr("aria-hidden", "false");
                        $("#btn_index_small").removeClass("icon-content-menu-down");
                        $("#btn_index_small").addClass("icon-content-menu-up");
                        $("#index_pages").show();
                    }
                    
                }
            });
        },


        //TUTORAIL PAGES - OPEN/CLOSE TOPICS
        tutorialPages:function(){
            $(".page .top .page-title").click(function(){
                $(this).closest('.page').find(".topics").toggle();
                if( $(this).closest('.page').find(".topics").is(":visible") ){
                    $(this).closest('.page').find(".top .page-title .icon-arrow-drop").css({'transform' : 'rotate('+ 180 +'deg)'});
                    $(this).closest('.page').find(".border-pages").hide();
                    $(this).attr("aria-expanded", "true");
                }
                else{
                    $(this).closest('.page').find(".top .page-title .icon-arrow-drop").css({'transform' : 'rotate('+ 360 +'deg)'});
                    $(this).closest('.page').find(".border-pages").show();
                    $(this).attr("aria-expanded", "false");
                }
            });
        },

        //CHANGE ACTIVE PAGE -> FULL TUTORIAL
        changeActivePage:function(){
            var stopScroll = false;
            //CLICK
            $(".topic").on('click', 'a[href^="#"]', function (event){
                event.preventDefault();
                stopScroll = true;
                var current_page = $("#current_page").val();
                var full = $("#full").val();
                var href = $(this).attr('href');
                if(full == 0 && href.indexOf("page"+current_page) == -1){
                    var go_page = $(this).attr('data-page');
                    var url = window.location.href.split('?')[0];
                    //window.location.replace(url + "?pagina="+go_page);
                    window.location.href = url + "?pagina="+go_page;
                }
                else{
                    $('html, body').animate({
                        scrollTop: $($.attr(this, 'href')).offset().top
                    }, 500);

                    $(".topic-active").attr("aria-current","false");
                    $(".topic-active").removeClass("topic-active");
                    $(this).closest("li").addClass("topic-active");
                    $(this).closest("li").attr("aria-current","true");
                    setTimeout(function(){
                        stopScroll = false;
                    }, 501);                    
                }
            });

            //SCROLL
            // Get all topics
            var lastId,
            pageTopics = $("#index_pages"),
            pageTopicsHeight = pageTopics.outerHeight(),
            // List with all topics
            menuItems = pageTopics.find("a"),
            scrollItems = menuItems.map(function(){
                var item = $($(this).attr("href"));
                if (item.length) { return item; }
            });

            $(window).scroll(function(){

                if(stopScroll){
                    return;
                }

                if($(this).scrollTop()>=$('#tutorial').position().top){
                    // Get container scroll position
                    var fromTop = $(this).scrollTop()+pageTopicsHeight;
                    // Get id of current scroll item
                    var cur = scrollItems.map(function(){
                    if ($(this).offset().top < fromTop)
                        return this;
                    });
                    // Get the id of the current element
                    cur = cur[cur.length-1];
                    var id = cur && cur.length ? cur[0].id : "";

                    if (lastId !== id) {
                        lastId = id;
                        // ADD/REMOVE CLASSES
                        if(id != ''){
                            menuItems
                                .closest('li').removeClass("topic-active")
                            $("[href='#"+id+"']")
                                .closest('li').addClass("topic-active");
                            if($("[href='#"+id+"']").closest(".topics").parent().attr("class") == "page"){
                                $(".page.page-active").attr("aria-current","false");
                                $(".page.page-active").removeClass("page-active");
                                $("[href='#"+id+"']").closest(".topics").parent().addClass("page-active");
                                $("[href='#"+id+"']").closest(".topics").parent().attr("aria-current","true");
                                $("[href='#"+id+"']").closest(".topics").show();
                            }
                        }
                            
                    }                   
                }
            });

        },

        //SLICK - NEWS
        initSlick:function(){
            if ( $( ".slider" ).length ) {
              $slick_slider = $('.slider');
              settings_slider = {
                dots: true,
                arrows: false
                // more settings
              }
              slick_on_mobile( $slick_slider, settings_slider);
              // slick on mobile
                function slick_on_mobile(slider, settings){
                 //First
                 if ($(window).width() > 992) {
                    if (slider.hasClass('slick-initialized')) {
                      slider.slick('unslick');
                    }
                    return
                  }
                  if (!slider.hasClass('slick-initialized')) {
                    setTimeout(function(){
                      var maxHeight = 0;
                          $(".content-box").each(function(){
                          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
                          });
                          
                          $(".content-box").height(maxHeight);

                      }, 10);
                    return slider.slick(settings);
                  }
                }
              };
        },

        //SLICK - RESIZE
        initSlickResize:function(){
            if ( $( ".slider" ).length ) {
                $slick_slider = $('.slider');
                settings_slider = {
                  dots: true,
                  arrows: false
                  // more settings
                }
                slick_on_mobile( $slick_slider, settings_slider);
                // slick on mobile
                  function slick_on_mobile(slider, settings){
                    $(window).on('load resize', function() {
                      if ($(window).width() > 992) {
                        if (slider.hasClass('slick-initialized')) {
                          slider.slick('unslick');
                        }
                        return
                      }
                      if (!slider.hasClass('slick-initialized')) {
                        return slider.slick(settings);
                      }
                    });
                };
            }
        },


         //SLICK - INFOS
         initSlickInfos:function(){
            if ( $( ".slider-infos" ).length ) {
              $slick_slider = $('.slider-infos');
              settings_slider = {
                dots: true,
                arrows: false,
                
                // more settings
              }
              slick_on_mobile( $slick_slider, settings_slider);
                // slick
                function slick_on_mobile(slider, settings){
                    setTimeout(function(){
                      var maxHeight = 0;
                          $(".content-box").each(function(){
                          if ($(this).height() > maxHeight) { maxHeight = $(this).height(); }
                          });
                          
                          $(".content-box").height(maxHeight);
                      }, 10);
                    return slider.slick(settings);
              };
          }
  
        },

        getArticleDate:function(){
            var date = $("#article_date").val();
            $(".post_date").append(date);
        },

        //CONTACT FORM SUBMIT
        contactSubmit:function(){
            //REMOVE BORDER RED AND HIDE ERROR MESSAGE on FOCUS
            $("#form form").attr("id", "contact_form");
            //CHECK EMPTY FIELDS on FOCUS OUT
            $("#form_email").focusout(function() {
                if($("#form_email").val().length == 0){
                    $("#form_email").attr('style', 'border: 2px solid #d10000 !important');
                    $("#email_required").css("visibility", "visible");
                    $("#email_required").text("Campo de preenchimento obrigatório.");
                 }
                 else{
                    var email = $("#form_email").val();
                    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if(!email.match(re)){
                        $("#email_required").text("Formato de email inválido.");
                        $("#form_email").attr('style', 'border: 2px solid #d10000 !important');
                        $("#email_required").css("visibility", "visible");
                    }
                    else{
                         if($("#email_required").is(":visible")){
                            $("#form_email").attr('style', 'border: 2px solid #333399 !important');
                            $("#email_required").css("visibility", "hidden");
                            $("#email_required").text("");
                        }
                    }
                   
                 }
            });
            $("#form_message").focusout(function() {
                if($("#form_message").val().length == 0){
                   $("#form_message").attr('style', 'border: 2px solid #d10000 !important');
                   $("#message_required").css("visibility", "visible");
                   $("#message_required").text("Campo de preenchimento obrigatório.")
                } 
                else{
                    if($("#message_required").is(":visible")){
                        $("#form_message").attr('style', 'border: 2px solid #333399 !important'); 
                        $("#message_required").css("visibility", "hidden");
                        $("#message_required").text("")
                     } 
                }
            });
            $("#form_name").focusout(function(){
                if($("#form_name").val().length == 0){
                    $("#form_name").attr('style', 'border: 2px solid #d10000 !important');
                    $("#name_required").css("visibility", "visible");
                    $("#name_required").text("Campo de preenchimento obrigatório.");
                }
                else{
                    if($("#name_required").is(":visible")){
                        $("#form_name").attr('style', 'border: 2px solid #333399 !important');
                        $("#name_required").css("visibility", "hidden");
                        $("#name_required").text("");
                    } 
                }
            });

            $(".captcha input").focusout(function(){
                if($(this).val().length == 0){
                    $(this).attr('style', 'border: 2px solid #d10000 !important');
                    $("#captcha_required").css("visibility", "visible");
                    $("#captcha_required").text("Campo de preenchimento obrigatório.");
                }
                else{
                    $(this).attr('style', 'border: 2px solid #333399 !important');
                    if($(".captcha .wpcf7-not-valid-tip").length){
                        $(".captcha .wpcf7-not-valid-tip").hide();
                    } 
                    if($("#captcha_required").is(":visible")){
                        $("#captcha_required").css("visibility", "hidden");
                        $("#captcha_required").text("");
                    }
                }
            });

            $("input[name ='terms-conditions']").change(function(){
                if($(this).is(":checked")){
                    $(".checkmark span").addClass("checked");
                    $(this).attr('style', 'border: 2px solid #333399 !important');
                    $(".checkmark").attr('style', 'background-color: white');
                    $("#terms_required").css("visibility", "hidden");
                    $("#terms_required").text("");
                }
                else{
                    $(".checkmark span").removeClass("checked");
                    $(".checkmark").attr('style', 'background-color: #eaeaea');
                }
            });

            //SUBMIT FORM
            $(document).on("submit", "#contact_form", function(event){
                event.preventDefault();
                var email = $("#form_email").val();
                var name = $("#form_name").val();
                var message = $("#form_message").val();
                
                $("#captcha_required").css("visibility", "hidden");
                $("#captcha_required").text("");

                //CHECK EMPTY FIELDS
                if(name.length == 0){
                    $("#name_required").css("visibility", "visible");
                    $("#name_required").text("Campo de preenchimento obrigatório.");
                    $("#form_name").attr('style', 'border: 2px solid #d10000 !important');
                }

                if(email.length == 0){
                    $("#email_required").css("visibility", "visible");
                    $("#email_required").text("Campo de preenchimento obrigatório.");
                    $("#form_email").attr('style', 'border: 2px solid #d10000 !important');
                }
                if(message.length == 0){
                    $("#message_required").css("visibility", "visible");
                    $("#message_required").text("Campo de preenchimento obrigatório.")
                    $("#form_message").attr('style', 'border: 2px solid #d10000 !important');
                }

                if(!$("input[name ='terms-conditions']").is(":checked")){
                    $("#terms_required").css("visibility", "visible");
                    $("#terms_required").text("Para continuar, deverá aceitar os termos e condições.")
                    $(".checkmark").attr('style', 'border: 2px solid #d10000 !important');
                }

                setTimeout(function(){ 
                    if($(".captcha .wpcf7-not-valid-tip").length){
                        $(".captcha input").attr('style', 'border: 2px solid #d10000 !important');
                    }
                }, 200);
                

                /*if(flag == 0){
                    $("#email").val("");
                    $("#name").val("");
                    $("#message").val("");
                    //SHOW MESSAGE
                    window.scrollTo({top: 0, behavior: 'smooth'});
                    if(message == "Erro"){
                        $("#error_message").show();
                        setTimeout(function(){ 
                            if($("#error_message").is(":visible")){
                                $("#error_message").hide();
                            }
                        }, 5000);
                    }
                    else{
                        $("#success_message").show();
                        setTimeout(function(){ 
                            if($("#success_message").is(":visible")){
                                $("#success_message").hide();
                            }
                        }, 5000);
                    }
                }*/

                /*$(".close").click(function(){
                    if($("#error_message").is(":visible")){
                        $("#error_message").hide();
                    }
                    else{
                        $("#success_message").hide();
                    }
                })*/
            })

        },

       //SEARCH SUBMIT
        searchSubmit:function(){
            var origin = window.location.origin;
            $(document).on("submit", "#search_form", function(event){
                event.preventDefault();
                var search = $("#search").val();
                search = search.replace(/[\\#_+;!@£§()$~'":*?<>{}]/g, "");
                //search = search.replace(/ /g, '%20');
                if(search.length != 0){
                   window.location.href = origin + "/resultados-de-pesquisa?pesquisa="+search;
                }
            });

            $(document).on("submit", "#search_form_small", function(event){
                event.preventDefault();
                var search = $("#search_small").val();
                search = search.replace(/[\\#_+;!@£§()$~'":*?<>{}]/g, "");
                if(search.length != 0){
                    window.location.href = origin + "/resultados-de-pesquisa?pesquisa="+search;
                }
            });

            $(document).on("submit", "#search_form_page", function(event){
                event.preventDefault();
                var search = $("#search_input_page").val();
                search = search.replace(/[\\#_+;!@£§()$~'":*?<>{}]/g, "");
                if(search.length != 0){
                    window.location.href = origin + "/resultados-de-pesquisa?pesquisa="+search;
                }
            });

        },

        //CHANGE BETWEEN "FULL" AND "PER PAGE" => TUTORIAL
        changeTutorialView:function(){
            $(".btn_tutorial").click(function(){
                var url = window.location.href.split('?')[0];
                var tutorial_id = $(this).attr("id");
                var action = $(this).attr("data-action");
                if(action == "full"){
                    //window.location.replace(url + "?view=complete");
                    window.location.href = url + "?view=complete";
                }
                else{
                    //window.location.replace(url);
                    window.location.href = url;
                }
            });

            $(".view_per_page").click(function(){
                var url = window.location.href.split('?')[0];
                var page = $(this).attr("data-page");
                if(page == 1){
                    //window.location.replace(url);
                    window.location.href = url;
                }
                else{
                   // window.location.replace(url + "?pagina="+page);
                    window.location.href = url + "?pagina="+page;
                }
            });
        },

        //BACK TO HOMEPAGE => 404
        backHomePage:function(){
            var origin   = window.location.origin;
            $("#back_home").click(function(){
                //window.location.replace(origin + "/");
                window.location.href = origin + "/";
            })
        },


        //ACCESS MONITOR SUBMIT
        accessMonitorSend: function(){
            $('#uri').on('input',function(e){
                var x = $("#uri").val();
                if(isUrlValid(x)){
                    $(".access_error").addClass("d-none");
                    $("#uri").closest(".input-group").first().css("border", "2px solid #333399");
                }
                else{
                    if($(".access_error").hasClass("d-none")){
                        $(".access_error").removeClass("d-none");
                    }
                    $("#uri").closest(".input-group").first().css("border", "2px solid #d10000");
                }
            });

            $(document).on("submit", "#access_monitor_form", function(event){
                event.preventDefault();
                var url = $("#url").val();
                if(url != '' && url.indexOf("www.") >= 0){
                     //url = url.replace("www.", "");
                     window.open('http://accessmonitor.acessibilidade.gov.pt/amp/results/' + url, '_blank');
                }
            });
        },

        //SHARING ON SOCIAL MEDIA
        socialSharing:function(){
            //FACEBOOK
            $("#fb_icon").click(function(e){
                e.preventDefault();
                var local = window.location.href;
                var url = "https://www.facebook.com/sharer/sharer.php?u="+local;
                window.open(url, '_blank');
            });
            //TWITTER
            $("#tw_icon").click(function(e){
                e.preventDefault();
                var local = window.location.href;
                var url = "https://twitter.com/intent/tweet?url="+local;
                window.open(url, '_blank');
            });
            //LINKEDIN
            $("#ln_icon").click(function(e){
                e.preventDefault();
                var local = window.location.href;
                var url = "https://www.linkedin.com/shareArticle?mini=true&url="+local;
                window.open(url, '_blank');
            });
        },



        bloguePagination:function(ajax_url){
            $(".arrow-left").css({'transform' : 'rotate('+ 90 +'deg)'});
            var total_pages = $("#total_pages").val();
            var total_articles = $("#total_acticles").val();
            var page = $("#current_page").val();
            page = parseInt(page);
            if(page == 1){
                $("#circle_one button").attr("aria-current","true");
                if(total_pages > 1){
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");
                }

                if(total_pages == 1){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-"+total_articles+" de "+total_articles+" artigos");
                    $("#circle_two").addClass("d-none");
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages == 2){
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages > 3){
                    $("#circle_next").removeClass('d-none');
                }

                $("#prev_page").removeClass("d-flex");
                $("#prev_page").addClass("d-none");


                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        page: page,
                        action: 'get_articles',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            }
            else{
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }
                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        page: page,
                        action: 'get_articles',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            }
            

            //PAGINATION DOTS
            $('.circle-links').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                $('.circle-links').each(function(){
                    $(this).attr("aria-current","false");
                });
                //$(this).attr("aria-current","true");
                var current_page = $("#current_page").val();
                current_page = parseInt(current_page);
                page = $(this).val();
                if(page == 'previous'){
                    page = current_page-1;
                }
                if(page == 'next'){
                    page = current_page+1;
                }
                page = parseInt(page);


                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        page: page,
                        action: 'get_articles',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });

            // NEXT/PREVIOUS PAGE
            $('#next_prev a').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                var current_page = parseInt($("#current_page").val());
                if($(this).parent().attr('id') == "prev_page"){
                    page = current_page-1;
                }
                else{
                    page = current_page+1;
                }
                
                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $('.circle-links').each(function(){
                    if($(this).val() == page){
                       $(this).attr("aria-current","true");
                    }
                    else{
                       $(this).attr("aria-current","false"); 
                   }
                });

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        page: page,
                        action: 'get_articles',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });
        },


        blogueCategoryPagination:function(ajax_url){
            $(".arrow-left").css({'transform' : 'rotate('+ 90 +'deg)'});
            var total_pages = $("#total_pages").val();
            var total_articles = $("#total_acticles").val();
            var category_id = $("#category_id").val();
            var page = $("#current_page").val();
            page = parseInt(page);
            if(page == 1){
                $("#circle_one button").attr("aria-current","true");
                if(total_pages > 1){
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");
                }

                if(total_pages == 1){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-"+total_articles+" de "+total_articles+" artigos");
                    $("#circle_two").addClass("d-none");
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages == 2){
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages > 3){
                    $("#circle_next").removeClass('d-none');
                }

                $("#prev_page").removeClass("d-flex");
                $("#prev_page").addClass("d-none");

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        category_id: category_id,
                        action: 'get_articles_category',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                }); 
            }
            else{
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        category_id: category_id,
                        action: 'get_articles_category',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                }); 
            }
            

            //PAGINATION DOTS
            $('.circle-links').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                $('.circle-links').each(function(){
                    $(this).attr("aria-current","false");
                });
                //$(this).attr("aria-current","true");
                var current_page = $("#current_page").val();
                current_page = parseInt(current_page);
                page = $(this).val();
                if(page == 'previous'){
                    page = current_page-1;
                }
                if(page == 'next'){
                    page = current_page+1;
                }
                page = parseInt(page);


                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        category_id: category_id,
                        action: 'get_articles_category',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });

            // NEXT/PREVIOUS PAGE
            $('#next_prev a').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                var current_page = parseInt($("#current_page").val());
                if($(this).parent().attr('id') == "prev_page"){
                    page = current_page-1;
                }
                else{
                    page = current_page+1;
                }
                
                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $('.circle-links').each(function(){
                    if($(this).val() == page){
                       $(this).attr("aria-current","true");
                    }
                    else{
                       $(this).attr("aria-current","false"); 
                   }
                });

                var offset = (parseInt(page)-1)*7;

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        category_id: category_id,
                        action: 'get_articles_category',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });       
        },

        blogueTagPagination:function(ajax_url){
            $(".arrow-left").css({'transform' : 'rotate('+ 90 +'deg)'});
            var total_pages = $("#total_pages").val();
            var total_articles = $("#total_acticles").val();
            var tag_id = $("#tag_id").val();
            var page = $("#current_page").val();
            page = parseInt(page);
            if(page == 1){
                $("#circle_one button").attr("aria-current","true");
                if(total_pages > 1){
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");
                }

                if(total_pages == 1){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-"+total_articles+" de "+total_articles+" artigos");
                    $("#circle_two").addClass("d-none");
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages == 2){
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages > 3){
                    $("#circle_next").removeClass('d-none');
                }

                $("#prev_page").removeClass("d-flex");
                $("#prev_page").addClass("d-none");

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        tag_id: tag_id,
                        action: 'get_articles_tag',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                }); 
            }
            else{
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        tag_id: tag_id,
                        action: 'get_articles_tag',
                    },
                    success:function(data){
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                }); 
            }
            

            //PAGINATION DOTS
            $('.circle-links').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                $('.circle-links').each(function(){
                    $(this).attr("aria-current","false");
                });
                //$(this).attr("aria-current","true");
                var current_page = $("#current_page").val();
                current_page = parseInt(current_page);
                page = $(this).val();
                if(page == 'previous'){
                    page = current_page-1;
                }
                if(page == 'next'){
                    page = current_page+1;
                }
                page = parseInt(page);


                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                    
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                var offset = (parseInt(page)-1)*7;
                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        tag_id: tag_id,
                        action: 'get_articles_tag',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });

            // NEXT/PREVIOUS PAGE
            $('#next_prev a').click(function(){
                $('html, body').animate({
                    scrollTop: $("#articles_list").offset().top
                }, 500);
                var current_page = parseInt($("#current_page").val());
                if($(this).parent().attr('id') == "prev_page"){
                    page = current_page-1;
                }
                else{
                    page = current_page+1;
                }
                
                $("input[name=current_page]").val(page);
                if(page > 1){
                    var first_element = 7*(page-1)+1;
                    var last_element = first_element+7;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-7 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $('.circle-links').each(function(){
                    if($(this).val() == page){
                       $(this).attr("aria-current","true");
                    }
                    else{
                       $(this).attr("aria-current","false"); 
                   }
                });

                var offset = (parseInt(page)-1)*7;

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset+3,
                        tag_id: tag_id,
                        action: 'get_articles_tag',
                    },
                    success:function(data){
                        $("#articles_list").empty();
                        $("#articles_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });       
        },

        pageNavigation:function(){
            $("#page_navigation a").click(function(){
                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top
                }, 500);
            });
        },

        homepage_highlights:function(){
            $(".carousel-item .btn_info").click(function(){
                var link = $(".active .info_title a").attr("href");
                //window.location.replace(link);
                window.location.href = link;
            });
        },

        items_card_highlights:function(){
            $("#items_cards .container .card-deck .card").click(function(){
                var link = $(this).find(".card-body .col-12 .card-title a").attr("href");
                var target = $(this).find(".card-body .col-12 .card-title a").attr("target");
                if(target == '_blank'){
                    window.open(link);
                }
                else{
                    window.location.href = link;
                }
            });
        },

        navigationIds:function(){
            $(".about_section h3").each(function(){
                var text = $(this).text();
                var text_id = text.replace(/ /g,"_");
                $(this).attr("id", text_id);
            });
            $(".about_section h4").each(function(){
                var text = $(this).text();
                var text_id = text.replace(/ /g,"_");
                $(this).attr("id", text_id);
            });

            $(".about_section ul").each(function(){
                var text = $(this).html();
                text = text.toString();
                if(text.substring(3, 9) == "<li><a"){
                    $(this).hide();
                    var aux = '<ul>';
                    $(this).find("li").each(function(){
                        var li_text = $(this).text();
                        var li_link = $(this).children("a").attr("href");
                        aux += '<li class="list-group-item border-0 d-flex">';
                        aux +=     '<div class="icon-arrow-bullets list_arrow_link" aria-hidden="true"></div>';
                        aux +=     '<div class="list_link">';
                        aux +=           '<a class="d-block" href="'+li_link+'">'+li_text+'</a>';
                        aux +=     '</div>';
                        aux += '</li>';
                    });
                    aux += '</ul>';
                    $(aux).insertAfter(this);
                }
            });
        },


        tableTutorial:function(){
            $(".tutorial-text table").each(function(){
                $(this).addClass("d-none d-sm-table");
                var head = $(this).find("thead").find("tr");
                var x = 0;
                var headers = [];
                head.children("td").each(function(){
                    if(x == 0){
                        head = $(this).text();
                    }
                    else{
                        headers.push($(this).text());
                    }
                    x++;
                });
                var rows = [[]];
                var x = 0;
                $(this).find("tbody").children("tr").each(function(){
                    $(this).children("td").each(function(){
                        rows.push(x, [$(this).text()]);
                    });
                    x++;
                });

                var rows_length = rows.length;
                var rows_num = rows[rows_length-2]+1;
                var columns_num = ((rows.length-1)/2)/rows_num;
                var table = '';
                table += '<table class="d-sm-none d-table">';
                table +=    '<thead class="thead-dark">';
                table +=        '<tr>';
                table +=            '<th scope="col" colspan="2">'+head+'</th>';
                table +=        '</tr>';
                table +=    '</thead>';
                table +=    '<tbody>';
                for(var y=0; y<rows_num; y++){
                    if(y==0){
                        var position = 2;
                    }
                    else{
                        var position = y*columns_num+(y*4)+2;
                    }
                    table += '<tr class="table-topic">';
                    table +=     '<td  colspan="2">'+rows[position]+'</td>';
                    table += '</tr>';
                    var position2 = 0;
                    for(var k=0; k<headers.length; k++){
                        if(k==0){
                            position2 = (8*y)+4;
                        }
                        else{
                            position2 = position2+2;
                        }
                        table += '<tr>';
                        table +=    '<td>'+headers[k]+'</td>';
                        table +=    '<td class="d-flex align-items-center justify-content-center">'+rows[position2]+'</td>';
                        table += '</tr>';
                    }
                }
                table +=    '</tbody>';
                table += '</table>'
                $(table).insertAfter(this);
            });
        },

        getCategoryHighlight:function(ajax_url){
            var category_id = $("#category_id").val();
            $.ajax({
                url: ajax_url,
                method: "POST",
                dataType: "json",
                data: {
                    id: category_id,
                    action: 'get_category_highlight',
                },
                success:function(data){
                   $("#blogue .slider").append(data);
                   $(".card-block").click(function(e){
                        e.preventDefault();
                        var href = $(this).find('.content-box .news-title a').attr('href');
                        window.location.href = href;
                    });
                },
                error: function(xhr, status, error)
                {
                  console.log(error);
                }
            });
        },


        getTagHighlight:function(ajax_url){
            var tag_id = $("#tag_id").val();
            $.ajax({
                url: ajax_url,
                method: "POST",
                dataType: "json",
                data: {
                    id: tag_id,
                    action: 'get_tag_highlight',
                },
                success:function(data){
                   $("#blogue .slider").append(data);
                   $(".card-block").click(function(e){
                        e.preventDefault();
                        var href = $(this).find('.content-box .news-title a').attr('href');
                        window.location.href = href;
                    });
                },
                error: function(xhr, status, error)
                {
                  console.log(error);
                }
            });
        },

        articlesHighlightClick:function(){
            $(".card-block").click(function(e){
                e.preventDefault();
                var href = $(this).find('.content-box .news-title a').attr('href');
                window.location.href = href;
            });
        },


        breadcrumbsMobile:function(){
            var width = window.innerWidth;
            var title = $("#post_title").text();
            $("#post_title").text('');
            var title_length = title.length;
            if(width > 480){
                if(title_length > 60){
                    title = title.substring(0, 57);
                    title = title+'...';
                }
            }
            if(width < 479 && width > 400){
                if(title_length > 45){
                    title = title.substring(0, 43);
                    title = title+'...';
                }
            }
            if(width < 399 && width > 350){
                if(title_length > 37){
                    title = title.substring(0, 34);
                    title = title+'...';
                }
            }
            if(width < 349){
                if(title_length > 30){
                    title = title.substring(0, 27);
                    title = title+'...';
                }
            }

            $("#post_title").text(title);
            $("#post_title2").text(title);

            $(window).on("resize", function(){
                var width = window.innerWidth;
                var title = $("#post_title").text();
                $("#post_title").text('');
                var title_length = title.length;
                if(width > 480){
                    if(title_length > 60){
                        title = title.substring(0, 57);
                        title = title+'...';
                    }
                }
                if(width < 479 && width > 400){
                    if(title_length > 45){
                        title = title.substring(0, 43);
                        title = title+'...';
                    }
                }
                if(width < 399 && width > 350){
                    if(title_length > 37){
                        title = title.substring(0, 34);
                        title = title+'...';
                    }
                }
                if(width < 349){
                    if(title_length > 30){
                        title = title.substring(0, 27);
                        title = title+'...';
                    }
                }

                $("#post_title").text(title);
                $("#post_title2").text(title);
            });

        },


        getSearchResults:function(ajax_url){
            var origin = window.location.origin;
            var search = $("#search_text").val();
            //search = search.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
            var category = $("#category").val();
            var relevance = $("#relevance").val();
            var area = $("#area").val();

            $(".arrow-left").css({'transform' : 'rotate('+ 90 +'deg)'})
            $("#category_text").text("Todas as Categorias"); 
            $("#area_text").text("Todas as Áreas");
            $("#relevance_text").text("Relevância"); 

            $("#filter_relevance li").each(function(){
                var relevance_text = '';
                if($(this).attr('data-value') == relevance){
                    $(this).attr('aria-selected', 'true');
                    relevance_text = $(this).text();
                    $("#relevance_text").text(relevance_text);
                }
            });

            $("#filter_categories li").each(function(){
                var category_text = '';
                if($(this).attr('data-value') == category){
                    $(this).attr('aria-selected', 'true');
                    category_text = $(this).text();
                    $("#category_text").text(category_text);
                }
            });

            $("#filter_area li").each(function(){
                var area_text = '';
                if($(this).attr('data-value') == area){
                    $(this).attr('aria-selected', 'true');
                    area_text = $(this).text();
                    $("#area_text").text(area_text);
                }
            });
            
            var total_pages = $("#total_pages").val();
            var total_articles = $("#total_acticles").val();
            var page = $("#current_page").val();
            var offset = (parseInt(page)-1)*10;
            total_pages = parseInt(total_pages);
            page = parseInt(page);

            if(page == 1){
                $("#circle_one button").attr("aria-current","true");
                if(total_pages > 1){
                    $("#pagination .n_articles_of").text("1-10 de "+total_articles+" artigos");
                }

                if(total_pages == 1){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-"+total_articles+" de "+total_articles+" artigos");
                    $("#circle_two").addClass("d-none");
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages == 2){
                    $("#circle_three").addClass("d-none");
                }

                if(total_pages > 3){
                    $("#circle_next").removeClass('d-none');
                }

                $("#prev_page").removeClass("d-flex");
                $("#prev_page").addClass("d-none");

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset,
                        search: search,
                        area: area,
                        category: category,
                        relevance: relevance,
                        action: 'get_search',
                    },
                    success:function(data){
                        if(data.length == 0){
                            $(".blogue_list #results_list").text("Não foram encontrados resultados para este pesquisa.");
                            $("#pagination").removeClass("d-block");
                            $("#pagination").addClass("d-none");
                            //window.location.replace(origin + "/404/");
                        }
                        else{
                            $(".blogue_list #results_list").append(data);
                        }
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            }
            else{
                if(page > 1){
                    var first_element = 10*(page-1)+1;
                    var last_element = first_element+10;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-10 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset,
                        search: search,
                        area: area,
                        category: category,
                        relevance: relevance,
                        action: 'get_search',
                    },
                    success:function(data){
                        if(data.length == 0){
                            $(".blogue_list #results_list").text("Não foram encontrados resultados para este pesquisa.");
                            $("#pagination").removeClass("d-block");
                            $("#pagination").addClass("d-none");
                            //window.location.replace(origin + "/404/");
                        }
                        else{
                            $(".blogue_list #results_list").append(data);
                        }
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            }
            


            $('.circle-links').click(function(){
                $('html, body').animate({
                    scrollTop: $("#results_list").offset().top
                }, 500);
                $('.circle-links').each(function(){
                    $(this).attr("aria-current","false");
                });
                //$(this).attr("aria-current","true");
                var current_page = $("#current_page").val();
                current_page = parseInt(current_page);
                page = $(this).val();
                if(page == 'previous'){
                    page = current_page-1;
                }
                if(page == 'next'){
                    page = current_page+1;
                }
                page = parseInt(page);


                $("input[name=current_page]").val(page);
                var offset = (parseInt(page)-1)*10;
                if(page > 1){
                    var first_element = 10*(page-1)+1;
                    var last_element = first_element+10;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                    
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-10 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                
                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset,
                        search: search,
                        area: area,
                        category: category,
                        relevance: relevance,
                        action: 'get_search',
                    },
                    success:function(data){
                        $("#results_list").empty();
                        $("#results_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });

            // NEXT/PREVIOUS PAGE
            $('#next_prev a').click(function(){
                $('html, body').animate({
                    scrollTop: $("#results_list").offset().top
                }, 500);
                var current_page = parseInt($("#current_page").val());
                if($(this).parent().attr('id') == "prev_page"){
                    page = current_page-1;
                }
                else{
                    page = current_page+1;
                }
                
                $("input[name=current_page]").val(page);
                var offset = (parseInt(page)-1)*10;
                if(page > 1){
                    var first_element = 10*(page-1)+1;
                    var last_element = first_element+10;
                    $("#prev_page").removeClass("d-none");
                    $("#prev_page").addClass("d-flex");
                    $("#pagination .n_articles_of").text(first_element+"-"+last_element+" de "+total_articles+" artigos");

                    $("#circle_three button").val(page+1);
                    $("#circle_three button").text(page+1);
                    $("#circle_two button").val(page);
                    $("#circle_two button").text(page);
                    $("#circle_two button").attr("aria-current","true");
                    $("#circle_one button").val(page-1);
                    $("#circle_one button").html(page-1);
                }
                else{
                    $("#prev_page").removeClass("d-flex");
                    $("#prev_page").addClass("d-none");
                    $("#pagination .n_articles_of").text("1-10 de "+total_articles+" artigos");

                    $("#circle_three button").val(3);
                    $("#circle_three button").text('3');
                    $("#circle_two button").val(2);
                    $("#circle_two button").text('2');
                    $("#circle_one button").val(1);
                    $("#circle_one button").text('1');
                    $("#circle_one button").attr("aria-current","true");
                }
                if(page == total_pages){
                    $("#next_page").removeClass("d-flex");
                    $("#next_page").addClass("d-none");
                    $("#pagination .n_articles_of").text(first_element+"-"+total_articles+" de "+total_articles+" artigos");

                    if(total_pages == 2){
                        $("#circle_two button").attr("aria-current","true");
                        $("#circle_two button").val(total_pages);
                        $("#circle_two button").text(''+total_pages+'');
                        $("#circle_one button").val(total_pages-1);
                        $("#circle_one button").text(''+total_pages-1+''); 
                    }
                    else{
                        $("#circle_three button").val(total_pages);
                        $("#circle_three button").text(''+total_pages+'');
                        $("#circle_three button").attr("aria-current","true");
                        $("#circle_two button").attr("aria-current","false");
                        $("#circle_two button").val(total_pages-1);
                        $("#circle_two button").text(''+total_pages-1+'');
                        $("#circle_one button").val(total_pages-2);
                        $("#circle_one button").text(''+total_pages-2+''); 
                    }
                }
                else{
                    $("#next_page").removeClass("d-none");
                    $("#next_page").addClass("d-flex"); 
                }

                if(total_pages > 3){
                    if(page > 2){
                        $("#circle_prev").removeClass('d-none');
                    }
                    else{
                       $("#circle_prev").addClass('d-none'); 
                    }                    
                    if((total_pages-2) < page){
                         $("#circle_next").addClass('d-none'); 
                    }
                    else{
                        $("#circle_next").removeClass('d-none');
                    }
                }

                $('.circle-links').each(function(){
                    if($(this).val() == page){
                       $(this).attr("aria-current","true");
                    }
                    else{
                       $(this).attr("aria-current","false"); 
                   }
                });

                $.ajax({
                    url: ajax_url,
                    method: "POST",
                    dataType:"json",
                    data: {
                        offset: offset,
                        search: search,
                        area: area,
                        category: category,
                        relevance: relevance,
                        action: 'get_search',
                    },
                    success:function(data){
                        $("#results_list").empty();
                        $("#results_list").append(data);
                        var url = window.location.href.split("#")[0];
                        url = url+"#pagina="+page;
                        document.location = url;
                    },
                    error: function(xhr, status, error)
                    {
                      console.log(error);
                    }
                });
            });

            
            $("#filter_area li").click(function(){
                var search = $("#search_text").val();
                var category = $("#category").val();
                var relevance = $("#relevance").val();

                var uri = '';
                uri += 'pesquisa='+search;

                var area = $(this).attr("data-value");
                uri += "&area="+area;
                if(category != ''){
                    uri += "&categoria="+category;
                }
                if(relevance != ''){
                    uri += "&relevancia="+relevance;
                }
                //window.location.replace(origin + "/resultados-de-pesquisa/?"+uri);
                window.location.href = origin + "/resultados-de-pesquisa/?"+uri;
            });

            $("#filter_categories li").click(function(){
                var search = $("#search_text").val();
                var area = $("#area").val();
                var relevance = $("#relevance").val();

                var uri = '';
                uri += 'pesquisa='+search;

                var category = $(this).attr("data-value");
                uri += "&categoria="+category;
                if(area != ''){
                    uri += "&area="+area;
                }
                if(relevance != ''){
                    uri += "&relevancia="+relevance;
                }
                //window.location.replace(origin + "/resultados-de-pesquisa/?"+uri);
                window.location.href = origin + "/resultados-de-pesquisa/?"+uri;
            });

            $("#filter_relevance li").click(function(){
                var search = $("#search_text").val();
                var area = $("#area").val();
                var category = $("#category").val();
                var uri = '';
                uri += 'pesquisa='+search;

                var relevance = $(this).attr("data-value");
                uri += "&relevancia="+relevance;
                if(area != ''){
                    uri += "&area="+area;
                }
                if(category != ''){
                    uri += "&categoria="+category;
                }
                //window.location.replace(origin + "/resultados-de-pesquisa/?"+uri);
                window.location.href = origin + "/resultados-de-pesquisa/?"+uri;
            });

        }

    }
});


function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function isUrlValid(url) {
    return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url);
}