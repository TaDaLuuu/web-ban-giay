/**
 * Created by muhammadkh4n on 5/9/15.
 */

$(document).ready(function(){

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    //                            Back to Top
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    /**
     * This implements "Back to Top" button.
     */
    function backToTop(){
        var $toTop = $("footer .back-to-top"); // DOM Cache for back to top selector.

        /**
         * This Function sets the initial horizontal position of "back-top-top" button according to width of the client's
         * window.
         */
        function toTopPosition(){

            var winWidth = $(window).width(); // Gets window width.
            var containerWidth = 1200; // Max Container Width defined in stylesheet.

            // Calculates the position so "back-to-top" button always stays 10px next to container.
            var pos = (containerWidth + ((winWidth - containerWidth) / 2)) + 10;

            // To accommodate larger screens so button stays near container because container can't go wider than 1200px.
            if (winWidth > 1280) {
                $toTop.css({'left': '' + pos + 'px'});
            }
            // when screen is smaller than 1280px in width, container width is dynamic so button always stays fixed at 96% from left.
            else {
                $toTop.css({left: '96%'});
            }

        }
        toTopPosition();

        // Window resize event, so that the button can adjust it's position accordingly (executes the function above).
        $(window).resize(toTopPosition).scroll(function(){ // Window scroll event. Controls visibility of the button according to scroll bar position.
            var scrollPos = $(this).scrollTop();
            if (scrollPos > 180) { // Comes in view.
                $toTop.css({top: '83%'});
            }
            else { // Hides from view.
                $toTop.css({top: '110%'});
            }
        });

        // Click event on back-to-top button. Scrolls the page back to top position.
        $toTop.click(function(){
            $("html, body").animate({scrollTop: '0'});
        });
    }
    backToTop();

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    //                         Rating System
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    /**
     * This function implements the rating and review modal in product rating and review Tab.
     */
    function rating() {
        var $productPage = $("#product"); // Product Page.
        var $overlay = $productPage.find(".overlay"); // Modal overlay.
        var $ratingForm = $productPage.find("#write-rating-form"); // The modal.
        var $revBtn = $productPage.find(".item-page .details .write-rating .write button"); // Write review button in review tab.
        var $close = $ratingForm.find(".close"); // Close button on modal.

        var $userStars = $ratingForm.find(".user-rating .user-stars ul"); // Rating stars ul.
        var $stars = $userStars.find(".star"); // Individual Star li inside stars list.

        // Click event on write review button. fades in the modal and it's overlay.
        $revBtn.click(function(){
            $overlay.add($ratingForm).fadeIn();

            var pos = ($(window).width() / 2) - 300; // Gets center position according to window size.
            $ratingForm.offset({left: pos}); // Sets modal position to center of window.
        });

        // Click event on close button of the modal. Fades out the modal to close it.
        $overlay.add($close).click(function(){
            $overlay.add($ratingForm).fadeOut();
        });

        var clicked; // Boolean to check if rating was selected(clicked).
        var clickPos; // Position of star(rating) that was clicked.

        // Mouse Enter event on star rating.
        $stars.mouseenter(function(){

            var curr = $(this).index(); // Current hovered star.

            $stars.removeClass("filled");

            // Makes all the stars golden (current hovered and all of the stars before it).
            for (var i = 0; i <= curr; i++) {
                $($stars[i]).addClass("filled");
            }

            // Click event on stars.
            $(this).click(function(){
                clicked = true; // Sets the clicked boolean to true.
                clickPos = curr; // Sets the clicked position to current clicked star.
            });

        }).mouseleave(function(){ // Mouse Leave event on star rating.

            // removes all golden stars if star rating was not clicked ever.
            if (!clicked) {
                $stars.removeClass("filled");
            }

            // else If it was clicked, it makes all stars golden till clicked position.
            else {
                $stars.removeClass("filled");
                for (var x = 0; x <= clickPos; x++) {
                    $($stars[x]).addClass("filled");
                }
            }
        });

    }
    rating(); // Runs the Rating and Review modal function.

    //---------------------------------------------------------------------
    //---------------------------------------------------------------------
    //           Collapsing Navigation in Search page aside
    //---------------------------------------------------------------------
    //---------------------------------------------------------------------

    function collNav(){
        var $nav = $("#search .sidebar .nav");
        var $navItem = $nav.find(".nav-item");
        var $subNavItem = $nav.find("ul");

        $navItem.click(function(){
            $(this).find("ul").toggle();
        });
    }
    collNav();
});