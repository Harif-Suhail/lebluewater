(function ($) {
    "use strict";


    /* ==========================================================================
      COUNTER UP 
 ========================================================================== */

    // $('.counter').counterUp({
    //     delay: 10,
    //     time: 1000
    // });



    $('.carousel').carousel({
      interval: 8000,
    })



    
    /* Closes the Responsive Menu on Menu Item Click*/
    $('.navbar-collapse .navbar-nav a').on('click', function () {
        $('.navbar-toggler:visible').click();
    });
    /*END MENU JS*/

    
    /* ----------------------------------------------------------- */
    /*  Fixed header
    /* ----------------------------------------------------------- */


    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 70) {
            $('.site-navigation,.trans-navigation').addClass('header-white');
        } else {
            $('.site-navigation,.trans-navigation').removeClass('header-white');
        }



    });
    /*
     * ----------------------------------------------------------------------------------------
     *  SMOTH SCROOL JS
     * ----------------------------------------------------------------------------------------
     */

    $('a.smoth-scroll').on("click", function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 50
        }, 1000);
        e.preventDefault();
    });
    


    new WOW().init();


    /* ==========================================================================
      SCROLL SPY
 ========================================================================== */

    $('body').scrollspy({
        target: '.navbar-collapse',
        offset: 195
    });
    
     
     $(document).ready(function() {
            $("#content-slider").lightSlider({
                loop:true,
                keyPress:true,
                adaptiveHeight:true,
                item:1,
                slideMargin:0,
                 auto:true,
                 pauseOnHover: true,
                 controls: false,
                 pager: false
            });
        });
    
 // testimonial-1
    $('.item-slider-one ').slick({
        vertical: true,
        verticalSwiping: true,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<div><button class="prevArrow arrowBtn"><i class="fa fa-angle-left"></i></button></div>',
        nextArrow: '<div><button class="nextArrow arrowBtn"><i class="fa fa-angle-right"></i></button></div>',

        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                vertical: false,
                verticalSwiping: false,

            }
        }]
    });

    

    // testimonial-2
    $('.testimonial-slide').slick({
        autoplay: false,
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        prevArrow: '<div><button class="prevArrow arrowBtn"><i class="fa fa-angle-left"></i></button></div>',
        nextArrow: '<div><button class="nextArrow arrowBtn"><i class="fa fa-angle-right"></i></button></div>',
        responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

    // testimonial-3
    $('.testimonial-slider2 ').slick({
        slidesToShow: 2,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
            }
        }]
    });
    
    
    $('.testimonial-block').slick({
      autoplay: true,
      autoplaySpeed: 4000,
      arrows: false,
      slidesToShow: 2,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
          }
        }
      ]
    });

		$(document).ready(function() {
    try {
        $('#banner').ripples({
            resolution: 512,
            dropRadius: 20, //px
            perturbance: 0.04,
        });
         
    }
    catch (e) {
        $('.error').show().text(e);
    }
});

})(window.jQuery);