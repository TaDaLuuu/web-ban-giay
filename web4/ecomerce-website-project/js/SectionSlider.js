/**
 * Created by muhammadkh4n on 3/9/15.
 */

$(function(){

    var height = 670; // Height of slide.
    var interval_speed = 3000;
    var animation_speed = 700;

    //Phone Section Slider DOM Cache for Selectors
    var $phoneSlider = $(".phone-slider");
    var $phoneSlides = $phoneSlider.find(".slides");
    var $phoneSlide = $phoneSlides.find(".slide");
    var $phoneSlideChange = $phoneSlider.find(".slide-change");
    var $phoneNavDots = $phoneSlider.find(".nav-dots li");

    //Computer Section Slider DOM Cache for Selectors
    var $computerSlider = $(".computer-slider");
    var $computerSlides = $computerSlider.find(".slides");
    var $computerSlide = $computerSlides.find(".slide");
    var $computerSlideChange = $computerSlider.find(".slide-change");
    var $computerNavDots = $computerSlider.find(".nav-dots li");

    /**
     * This Function creates a Slider object with slider navigation and
     * auto slide next animation interval. This is for creating multiple sliders, each with their own
     * selectors and running instances.
     * @param slider The slider selector, to specify which slider it will initiate.
     * @param slides Slides ul selector inside that slider.
     * @param slide Individual slide selector inside Slides ul, for keeping track of current slide in that specified slider.
     * @param slideChange Arrow navigation selector for specified slider
     * @param navDots Dot Navigation selector for specified slider.
     */
    function slider(slider, slides, slide, slideChange, navDots) {

        var interval;
        var currSlide = 0;

        /**
         * This function shifts the current position of Dot Navigation according to current slide.
         * @param i position to shift to 0 for current slide, 1 for next to current slide.
         */
        function navPos(i){
            navDots.removeClass("current");
            $(navDots[currSlide + i]).addClass("current");
        }

        /**
         * This Function starts the auto slides animation interval.
         */
        function startSlider() {
            interval = setInterval(function () {

                navPos(1);
                if (currSlide >= slide.length - 2) {
                    $(navDots[0]).addClass("current");
                }

                // Animation Properties.
                slides.animate({'margin-top': '-=' + height + 'px'}, animation_speed, function () {
                    currSlide++;
                    if (currSlide === slide.length - 1) {
                        currSlide = 0;
                        $(this).css('margin-top', 0);
                    }
                });
            }, interval_speed);
        }

        startSlider(); // Executes Slides interval function.

        slider.mouseenter(function () {
            clearInterval(interval); // Stops slides auto animation interval on mouse enter in slider area.
        }).mouseleave(function () {
            startSlider(); // Starts slides auto animation interval on mouse leave from slider area.
        });

        // Implements click event on Arrow Navigation.
        slideChange.click(function(e){
            e.preventDefault();
            var clicked = $(this).attr("id"); // Gets id attr. of clicked arrow.
            // When previous arrow is clicked, slide is changed to previous one with animation and Dot Navigation changes position.
            if (clicked == 'prev') {
                if (currSlide <= 0) {
                    currSlide = slide.length - 2;
                    slides.animate({'margin-top': '-' + height * (slide.length - 2) + 'px'});
                    navPos(0);
                }
                else {
                    currSlide--;
                    slides.animate({'margin-top': '+=' + height + 'px'});
                    navPos(0);
                }
            }
            // When Next arrow is clicked. slide is changed to next one. with dot nav shifting accordingly as well.
            else {
                if (currSlide >= slide.length - 2) {
                    currSlide = 0;
                    slides.animate({'margin-top': '0'});
                    navPos(0);
                }
                else {
                    currSlide++;
                    slides.animate({'margin-top': '-=' + height + 'px'});
                    navPos(0);
                }
            }
        });

        // This implements click event on Dot Navigation.
        navDots.click(function(){
            currSlide = $(this).index(); // Gets index of clicked dot and assign its value to current slide.

            navPos(0);

            slides.animate({'margin-top': '-' + (height * currSlide) + 'px'}); // Slide shift according to dot clicked.
        });
    }

    // Two Slider objects are created for each section slider (Phones and Computers), with their own specific selectors.
    slider($phoneSlider, $phoneSlides, $phoneSlide, $phoneSlideChange, $phoneNavDots); // Phone Slider Initialization.
    slider($computerSlider, $computerSlides, $computerSlide, $computerSlideChange, $computerNavDots); // Computer Slider Initialization.

});