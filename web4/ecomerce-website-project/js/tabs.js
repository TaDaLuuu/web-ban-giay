/**
 * Created by muhammadkh4n on 3/9/15.
 */

$(function(){

    //Front page today's deal Tabs DOM Cache.
    var $today = $(".today-deals");
    var $todayTab = $today.find(".tabs .tab");
    var $phone = $today.find(".today-items .phone-items");
    var $computer = $today.find(".today-items .computer-items");
    // End Front page Tabs

    //Product page Detail Data Tabs DOM Cache.
    var $itemDetail = $(".item-page .details .tabs");
    var $detailTab = $itemDetail.find(".header li");

    var $detailData = $itemDetail.find(".detail-data");
    var $overview = $itemDetail.find(".tab .overview");
    var $specs = $itemDetail.find(".tab .specs");
    var $review = $itemDetail.find(".tab .review");
    //End Product page Tabs.

    // Click Event Function for "Today's Deals" and "Product Page" Tabs.
    $todayTab.add($detailTab).click(function(e){

        e.preventDefault();

        //Get parent and child id attribute for logical operations.
        var section = $(this).parent().attr("id");
        var clicked = $(this).attr("id");

        //Set Active tab effect on tab button.
        $todayTab.add($detailTab).removeClass("active");
        $(this).addClass("active");

        // For Front page "Today Tabs".
        if (section == 'today-tabs') {
            if (clicked == 'phone-tab') {
                    $phone.addClass("active");
                    $computer.removeClass("active");
            }
            else {
                    $computer.addClass("active");
                    $phone.removeClass("active");
            }
        }
        // For Product page "Detail Tabs".
        else {
            if (clicked == 'overview-tab') {
                $detailData.removeClass("active");
                $overview.addClass("active");
            }
            else if (clicked == 'specs-tab') {
                $detailData.removeClass("active");
                $specs.addClass("active");
            }
            else {
                $detailData.removeClass("active");
                $review.addClass("active");
            }
        }

    });

});