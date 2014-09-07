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



var windowheight = function(){ return $(window).height;}
$(window).scroll(function (event) {

    var scroll = $(window).scrollTop();

    $("#vis").css("top",scroll*0.69);
    $(".mouse").css("left",scroll*0.2);

});

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



$(document).ready(function() {
    startturning();
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


