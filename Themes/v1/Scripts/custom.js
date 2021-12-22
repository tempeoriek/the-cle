
//function checkWidth() {
//    if (window.matchMedia("(min-width: 768px)").matches) {
//        $('.fadingIn').waypoint(function () {
//            $(this).removeClass('transparent');
//            $(this).addClass('visible');
//            return false;
//        }, { offset: '95%' });
//    } else {
//        $('.fadingIn').hover(function () {
//            $(this).removeClass('transparent');
//            return false;
//        });
//    }
//}
//checkWidth();
//$(window).resize(checkWidth);



$(function () {
    $(".load").click(function () {
        var $btn = $(this);
        $btn.button('loading').delay(1200).queue(function () {
            setTimeout(function () {
                $btn.button('reset');
            }, 1000);

        });
    });
});

(function ($) {
    $.fn.buttonLoader = function (action) {
        var self = $(this);
        if (action == 'start') {
            if ($(self).attr("disabled") == "disabled") {
                e.preventDefault();
            }
            //disable buttons when loading state
            $('.has-spinner').attr("disabled", "disabled");
            $(self).attr('data-btn-text', $(self).text());
            //$(self).html('<span class="spinner"><i class="fa fa-circle-o-notch fa-spin"></i></span>....');
            $(self).html('<i class="fa fa-circle-o-notch fa-spin"></i>');

            $(self).addClass('active');
        }
        //stop loading animation
        if (action == 'stop') {
            $(self).html($(self).attr('data-btn-text'));
            $(self).removeClass('active');
            //enable buttons after finish loading
            $('.has-spinner').removeAttr("disabled");
        }
    }
})(jQuery);

$(function () {
    $('.btn-add2cart').click(function () {
        var btn = $(this);
        $(btn).buttonLoader('start');
        setTimeout(function () {
            $(btn).buttonLoader('stop');
        }, 2500);
    });
});

function displayAdd2CartNotification(message, messagetype, timeout) {
    //types: success, error
    var container = $('#add2cart-notification');


    var htmlcode = '';
    if ((typeof message) == 'string') {
        htmlcode = message;
    } else {
        //we do not show the last error msgs: "Allowed quantities for this product: 1, 2, 3"
        for (var i = 0; i < message.length; i++) {
            htmlcode = htmlcode + '<p class=\"red\">' + message[i] + '</p>';
        }
    }

    container.html(htmlcode);
    container.css({
        display: 'block'
    });

    if (messagetype != 'success') {

    }
    else
    {
        // flyout cart
        var theNav = $("#top-nav");
        if (theNav.hasClass("open")) { }
        else {
            $("#top-nav").toggleClass("open");
        };

        $('#tabs a[href="#bag"]').tab('show');
        var totalHeight = ($('#bag').css('height'));
        totalHeight = ($('#flyout-cart').outerHeight(true));
        totalHeight = parseInt(totalHeight) + 70;
        $('.tab-container').height(totalHeight);
    }


    // fadeout
    if (timeout > 0) {
        barNotificationTimeout = setTimeout(function () {
            if (messagetype == 'success') {
                $("#top-nav").removeClass("open");
                $("li.tab-toggle").each(function () {
                    if ($(this).hasClass('active')) {
                        var tabpane = $(this).children().attr('href');
                        tabpane = tabpane.substring(1);
                        $(this).removeClass('active');
                        $('#' + tabpane).toggleClass('active');
                    }
                });
            }
            container.fadeOut('slow');
        }, timeout);

    }
    //

}


$(function () {
    if (window.matchMedia("(max-width: 1079px)").matches) {

        $('#followlink').css('display', 'none');
        $('#lienssmo').css('display', 'inline-block');
        //$('#nieuwsbrief').css('display', 'inline-block');

        $('#nieuwsbrieflink-mobile').click(function (event) {
            $('#nieuwsbrief-mobile').slideToggle();
            $('#nieuwsbrieflink-mobile').hide();
        });
    }
    else {

        $('#nieuwsbrieflink').click(function (event) {
            $('#nieuwsbrief').slideToggle();
            $('#nieuwsbrieflink').hide();
        });

       
    }
});


$(function () {
    $('#followlink').click(function (event) {
       // $('#followlink').css('display', 'none');
        $('#lienssmo').slideToggle();
       
    });

    $('#followlink-m').click(function (event) {
        $('#lienssmo-m').slideToggle();

    });
});



/* image hover*/
var sourceSwap = function () {
    var $this = $(this);
    var newSource = $this.data('alt-src');
    $this.data('alt-src', $this.attr('src'));
    $this.attr('src', newSource);
}

$(function () {
    $('img.swapImg').hover(sourceSwap, sourceSwap);
    //$('img[data-alt-src]').each(function () {
    //    new Image().src = $(this).data('alt-src');
    //}).hover(sourceSwap, sourceSwap);
});


/* */
/* Menu mobile effect*/
//jQuery(document).ready(function ($) {
//    var isLateralNavAnimating = false;

//    //open/close lateral navigation
//    $('.cd-nav-trigger').on('click', function (event) {
//        event.preventDefault();
//        //stop if nav animation is running 
//        if (!isLateralNavAnimating) {
//            if ($(this).parents('.csstransitions').length > 0) isLateralNavAnimating = true;

//            $('body').toggleClass('navigation-is-open');
//            $('.cd-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
//                //animation is over
//                isLateralNavAnimating = false;
//            });
//        }
//    });
//});


/* */
/* detect touch */
if ("ontouchstart" in window) {
    document.documentElement.className = document.documentElement.className + " touch";
}
if (!$("html").hasClass("touch")) {
    /* background fix */
    $(".parallax").css("background-attachment", "fixed");
}

/* fix vertical when not overflow
call fullscreenFix() if .fullscreen content changes */
function fullscreenFix() {
    var h = $('body').height();
    // set .fullscreen height
    $(".content-b").each(function (i) {
        if ($(this).innerHeight() <= h) {
            $(this).closest(".fullscreen").addClass("not-overflow");
        }
    });
}
$(window).resize(fullscreenFix);
fullscreenFix();

/* resize background images */
function backgroundResize() {
    var windowH = $(window).height();
    $(".background").each(function (i) {
        var path = $(this);
        // variables
        var contW = path.width();
        var contH = path.height();
        var imgW = path.attr("data-img-width");
        var imgH = path.attr("data-img-height");
        var ratio = imgW / imgH;
        // overflowing difference
        var diff = parseFloat(path.attr("data-diff"));
        diff = diff ? diff : 0;
        // remaining height to have fullscreen image only on parallax
        var remainingH = 0;
        if (path.hasClass("parallax") && !$("html").hasClass("touch")) {
            var maxH = contH > windowH ? contH : windowH;
            remainingH = windowH - contH;
        }
        // set img values depending on cont
        imgH = contH + remainingH + diff;
        imgW = imgH * ratio;
        // fix when too large
        if (contW > imgW) {
            imgW = contW;
            imgH = imgW / ratio;
        }
        //
        path.data("resized-imgW", imgW);
        path.data("resized-imgH", imgH);
        path.css("background-size", imgW + "px " + imgH + "px");
    });
}
$(window).resize(backgroundResize);
$(window).focus(backgroundResize);
backgroundResize();

/* set parallax background-position */
function parallaxPosition(e) {
    var heightWindow = $(window).height();
    var topWindow = $(window).scrollTop();
    var bottomWindow = topWindow + heightWindow;
    var currentWindow = (topWindow + bottomWindow) / 2;
    $(".parallax").each(function (i) {
        var path = $(this);
        var height = path.height();
        var top = path.offset().top;
        var bottom = top + height;
        // only when in range
        if (bottomWindow > top && topWindow < bottom) {
            var imgW = path.data("resized-imgW");
            var imgH = path.data("resized-imgH");
            // min when image touch top of window
            var min = 0;
            // max when image touch bottom of window
            var max = -imgH + heightWindow;
            // overflow changes parallax
            var overflowH = height < heightWindow ? imgH - height : imgH - heightWindow; // fix height on overflow
            top = top - overflowH;
            bottom = bottom + overflowH;
            // value with linear interpolation
            var value = min + (max - min) * (currentWindow - top) / (bottom - top);
            // set background-position
            var orizontalPosition = path.attr("data-oriz-pos");
            orizontalPosition = orizontalPosition ? orizontalPosition : "50%";
            $(this).css("background-position", orizontalPosition + " " + value + "px");
        }
    });
}
if (!$("html").hasClass("touch")) {
    $(window).resize(parallaxPosition);
    //$(window).focus(parallaxPosition);
    $(window).scroll(parallaxPosition);
    parallaxPosition();
}



//top Menu 
$(function () {
    var hoverTimeout;
    $('.tab-container').hover(function () {
        clearTimeout(hoverTimeout);
           }, function () {
               hoverTimeout = setTimeout(function () {
                   $("#top-nav").removeClass("open");
                   $("li.tab-toggle").each(function () {
                       if ($(this).hasClass('active')) {
                           var tabpane = $(this).children().attr('href');
                           tabpane = tabpane.substring(1);
                           $(this).removeClass('active');
                           $('#' + tabpane).toggleClass('active');
                       }
                   });
               }, 1200);
           });
       });

        
$(function () {

    $('.tab-menu').hover(function (e) {
            
        var idactief = $(this).children().attr('href');
        if (idactief == "#myaccount") {

            var theNav = $("#top-nav");
                if (theNav.hasClass("open")) {}
                else {
                    $("#top-nav").toggleClass("open");
                };

                e.preventDefault();

                $('#tabs a[href="' + idactief + '"]').tab('show');

                var totalHeight = ($(idactief).css('height'));
                //if (idactief == "#bag") {
                //    totalHeight = ($('#flyout-cart').outerHeight(true));
                //    totalHeight = parseInt(totalHeight) + 70;
                //}

                $('.tab-container').height(totalHeight);
            }
          

    });
});



(function ($) {

    "use strict";
    $(document).ready(function () {

        /* ---------------------------------------------- /*
		 * Initialization general scripts for all pages
		/* ---------------------------------------------- */

        var overlayMenu = $('#overlay-menu'),
			navbar = $('.navbar-custom'),
			windowWidth = Math.max($(window).width(), window.innerWidth),
			navbatTrans,
			mobileTest;


        navbarCheck(navbar);
      
        //$(window).scroll(function () {
        //    navbarAnimation(navbar);
        //}).scroll();

        /* ---------------------------------------------- /*
		 * Mobile detect
		/* ---------------------------------------------- */

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            mobileTest = true;
        } else {
            mobileTest = false;
        }
       
      

        /* ---------------------------------------------- /*
		 * Transparent navbar animation
		/* ---------------------------------------------- */
        function navbarCheck() {
            if (navbar.length > 0 && navbar.hasClass('navbar-transparent')) {
                navbatTrans = true;
            } else {
                navbatTrans = false;
            }
        }

        function navbarAnimation(navbar) {
            var topScroll = $(window).scrollTop();
            if (navbar.length > 0 && navbatTrans !== false) {
                
                if (topScroll >= 5) {
                    navbar.removeClass('navbar-transparent');
                } else {
                    navbar.addClass('navbar-transparent');
                }
            }
            
         
        }

        /* mobile */
        function handleHeaderState() {

            if (window.matchMedia("(max-width: 991px)").matches) {
                var $win = $(this);
                //$('.navbar').toggleClass('back', $win.scrollTop() > 60 && $win.width() > 639);
                var topScroll = $win.scrollTop();
                if (navbar.length > 0 && navbatTrans !== false) {
                    if (topScroll >= 5) {
                        navbar.removeClass('navbar-transparent');
                    } else {
                        navbar.addClass('navbar-transparent');
                    }
                }
            }
        }

        $("#body-content").on({
            scroll: handleHeaderState,
            resize: handleHeaderState
        });


        handleHeaderState(); // on load
        /*end mobile */


        /* ---------------------------------------------- /*
		 * Show/Hide overlay menu
		/* ---------------------------------------------- */

        $('#toggle-menu').on('click', function () {
            showMenu();
            $('body').addClass('aux-navigation-active');
            return false;
        });

        $('#overlay-menu-hide').on('click', function () {
            hideMenu();
            $('body').removeClass('aux-navigation-active');
            return false;
        });

        $(window).keydown(function (e) {
            if (overlayMenu.hasClass('active')) {
                if (e.which === 27) {
                    hideMenu();
                }
            }
        });

        function showMenu() {
            navbar.animate({ 'opacity': 0, 'top': -80 }, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.addClass('active');
        }

        function hideMenu() {
            navbar.animate({ 'opacity': 1, 'top': 0 }, {
                duration: 150,
                easing: 'easeInOutQuart'
            });

            overlayMenu.removeClass('active');
        }

        /* ---------------------------------------------- /*
		 * Overlay dropdown menu
		/* ---------------------------------------------- */

        $('#nav > li.slidedown > a').on('click', function () {
            if ($(this).attr('class') != 'active') {
                $('#nav li ul').slideUp({ duration: 300, easing: 'easeInOutQuart' });
                $('#nav li a').removeClass('active');
                $(this).next().slideToggle({ duration: 300, easing: 'easeInOutQuart' }).addClass('open');
                $(this).addClass('active');
            } else {
                $('#nav li ul').slideUp({ duration: 300, easing: 'easeInOutQuart' }).removeClass('open');
                $(this).removeClass('active');
            }
            return false;
        });

    });

})(jQuery);


/*
  Slidemenu
*/
(function () {
    var $body = document.body
	, $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];

    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
            $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
        });
    }

}).call(this);
(function () {
    var $body = document.body
	, $menu_trigger = $body.getElementsByClassName('menu-trigger-close')[0];

    if (typeof $menu_trigger !== 'undefined') {
        $menu_trigger.addEventListener('click', function () {
            $body.className = ($body.className == 'menu-active') ? '' : 'menu-active';
        });
    }

}).call(this);


if (!("ontouchstart" in document.documentElement)) {
    document.documentElement.className += " no-touch";
}






/* */
//function checkWidth() {
//    if (window.matchMedia("(min-width: 768px)").matches) {
//        $('.fadingIn').waypoint(function () {
//            $(this).removeClass('transparent');
//            $(this).addClass('visible');
//            return false;
//        }, { offset: '95%' });
//    } else {
//        $('.fadingIn').hover(function () {
//            $(this).removeClass('transparent');
//            return false;
//        });
//    }
//}
//checkWidth();
//$(window).resize(checkWidth);

