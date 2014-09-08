// Closes the sidebar menu
$("#menu-close").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Opens the sidebar menu
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#sidebar-wrapper").toggleClass("active");
});

// Scrolls to the selected menu item on the page
$(function() {
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {         
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});

//opacity and parallaxing
var mousedropped = false;
var windowheight = window.innerHeight;
var windowwidth = window.innerWidth;
$(window).scroll(function (event) {

    var scroll = $(window).scrollTop();
    
    if (scroll < windowheight*3.5){
        //$("#top").css("opacity",1-1/(windowheight/scroll*1));
        $("#vis").css("opacity",visopacity(scroll));
        $("#vis").css("top",scroll*0.8);
        $("#bg").css("top",scroll*0.7);
    }
    if (scroll > windowheight*0.1 && !mousedropped){
        mousedrop.Initialize('mousedrop','img/mousefall.jpg');
        mousedropped = true;
        }
        /*
    if (scroll >= windowheight*2){
        //$("#histroy").css("opacity",1/1-(windowheight/(scroll/3)));
        $("#vis").css("opacity",1);
        $("#vis").css("top",-scroll*0.5);
     } */
});

function visopacity(scroll){
var op = 1-1/(windowheight/scroll*1);
if (op<0.1){op=0.1;}
return op;
}

//ever turning wheel
function startturning(){

$("svg").css("-webkit-animation","rotate 120s");
$("svg").css("-webkit-animation-iteration-count","infinite");
$("svg").css("-webkit-animation-timing-function","linear");

$("svg").css("-moz-animation","rotate 120s");  
$("svg").css("-moz-animation-iteration-count","infinite"); 
$("svg").css("-moz-animation-timing-function","linear"); 

$("svg").css("-ms-animation","rotate 120s");
$("svg").css("-ms-animation-iteration-count","infinite");
$("svg").css("-ms-animation-timing-function","linear");

$("svg").css("animation","rotate 120s");
$("svg").css("animation-iteration-count","infinite");
$("svg").css("animation-timing-function","linear");

}

//mobile browserwindows
function setmobile()
{
    if ($(window).width()<768)
    {
        $("#about").css("height","200%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","270%");
    }
    else if ($(window).width()>=768 && $(window).width()<992)
    {
        $("#about").css("height","200%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","300%");
    }
    else
    {
        $("#about").css("height","100%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","100%");
    }
}

window.onresize = function(event) {
if ($(window).width()<768)
    {
        $("#about").css("height","200%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","270%");
    }
    else if ($(window).width()>=768 && $(window).width()<992)
    {
        $("#about").css("height","200%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","300%");
    }
    else
    {
        $("#about").css("height","100%"); 
        $("#history").css("height","100%"); 
        $("#portfolio").css("height","100%");
    }
}

//timeline
$(document).ready(function() {
    startturning();
    setmobile();
    createStoryJS({
            type:       'timeline',
            width:      '100%',
            height:     '100%',
            start_at_end: false,
            start_at_slide:     '0',   
            start_zoom_adjust:  '0', 
            font:       'PTSerif-PTSans',
            source:     'https://docs.google.com/spreadsheet/pub?key=0Au9kzOr1lZvHdDgzb0s5SXRQZDV1OWF3NVhIcTlkeEE&output=html',
            embed_id:   'timeline'   
    });


});


