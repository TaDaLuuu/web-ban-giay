/**
 * Created by muhammadkh4n on 31/8/15.
 */


$(function () {

    var slider = $(".featured .slider");
    var slides = slider.find(".slides");
    var slide = slides.find(".slide");
    var slider_nav = slider.find(".slider-nav li");
    var arrow_slide = slider.find(".slide-change");

    var currSlide = 0;
    var mainSlider;

    // Slider Properties
    var interval_speed = 3000;
    var animation_speed = 700;


    /**
     * This Function resets the z-index to stock which was changed when clicking the "dot navigation".
     */
    function resetIndex() {
        var zin = 1;
        for (var i = slide.length - 1; i >= 0; i--, zin++) {
            $(slide[i]).css({'z-index': '' + zin + ''});
        }
    }

    /**
     * This Function resets the opacity of slides according to current slide.
     */
    function resetOpacity() {

        $(slide).css({'opacity': '1'});

        for (var x = 0; x < currSlide; x++) {
            $(slide[x]).css({'opacity': '0'});
        }
    }

    /**
     * This Function changes the current position of the "dot navigation".
     * @param {number} i. Nav Position to shift to. 1 if ahead. 0 if current(clicked).
     */
    function navPos(i){
        $(slider_nav).removeClass("current");
        $(slider_nav[currSlide + i]).addClass("current");
    }

    /**
     * This Function sets an interval to automatically change image opacity
     * at a fixed time Interval.
     */
    function startInterval() {
        mainSlider = setInterval(function () {

            resetIndex();
            resetOpacity();
            navPos(1);

            if (currSlide >= slide.length - 2) {
                $(slider_nav[0]).addClass("current");
            }

            $(slide[currSlide]).animate({'opacity': '0'}, animation_speed, function(){

                if (currSlide >= slide.length - 1) {
                    currSlide = 0;
                    $(slide).css({'opacity': '1'});
                }

                $(slide[currSlide]).css({'z-index': '10'});

            });

            currSlide++;

        }, interval_speed);
    }
    startInterval(); // Interval gets initiated.

    // Start or Stop Slider Interval when mouse enters or leaves slider area.
    $(slider).mouseenter(function(){

        clearInterval(mainSlider); // Stop Interval.

    }).mouseleave(function(){

        startInterval(); // Start Interval.

    });

    // "Dots Navigation" and "Previous Next Arrow Navigation" functionality.
    $(slider_nav).add(arrow_slide).click(function(e){

        e.preventDefault(); // Prevents default behaviour of anchor element being clicked.

        var clicked = $(this).attr("id");

        // Checks if "Arrow Navigation" was clicked.
        if (clicked == 'prev' || clicked == 'next') {
            resetIndex();
            resetOpacity();

            // When Clicked on previous arrow navigation.
            if (clicked == 'prev') {
                $(slide[currSlide - 1]).css({'opacity': '1', 'z-index': '10'});
                currSlide--;

                if (currSlide < 0) {
                    currSlide = 5;
                    resetOpacity();
                    $(slide[currSlide]).css({'z-index': '10'});
                }

                navPos(0);
            }

            // when clicked on next arrow navigation.
            else {
                $(slide[currSlide]).css({'opacity': '0'});
                $(slide[currSlide + 1]).css({'opacity': '1', 'z-index': '10'});
                currSlide++;

                if (currSlide > slide.length - 2) {
                    currSlide = 0;
                    $(slide[currSlide]).css({'z-index': '10'});
                }

                navPos(0);
            }
        }

        // When "Dots Navigation" is clicked.
        else {
            currSlide = $(this).index();

            navPos(0);

            $(slide).css({'z-index': '0', 'opacity': '1'});
            $(slide[currSlide]).css({'z-index': '10'});
        }

    });

});