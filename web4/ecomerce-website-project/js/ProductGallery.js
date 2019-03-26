/**
 * Created by muhammadkh4n on 11/9/15.
 */

$(document).ready(function(){

    var $itemPage = $("#product .gallery"); // Product page selector.

    var $imgView = $itemPage.find(".img-view"); // Image view box selector.
    var $img = $imgView.find(".img"); // individual image selector.

    var $imgList = $itemPage.find(".img-list"); // Image Thumbnails list.
    var $thumb = $imgList.find(".thumb"); // Individual image thumbnail.

    // Mouse Hover event function on thumb in the thumbnail list.
    $thumb.mouseover(function(){

        var index = $(this).index(); // Gets index of current hovered thumbnail.

        // Sets current class on hovered thumbnail.
        $thumb.removeClass("current");
        $(this).addClass("current");

        // Displays current hovered thumbnail image on full view.
        $img.css("display", "none");
        $($img[index]).css("display", "block");

    });

});