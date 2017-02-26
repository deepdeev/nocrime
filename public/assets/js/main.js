//Landing page JS
$(document).ready(function() {

    var curPage = 1;
    var numOfPages = $(".skw-page").length;
    var animTime = 1000;
    var scrolling = false;
    var pgPrefix = ".skw-page-";

    function pagination() {
        scrolling = true;

        $(pgPrefix + curPage).removeClass("inactive").addClass("active");
        $(pgPrefix + (curPage - 1)).addClass("inactive");
        $(pgPrefix + (curPage + 1)).removeClass("active");

        setTimeout(function() {
            scrolling = false;
        }, animTime);
    };

    function navigateLeft() {
        if (curPage === 1) return;
        curPage--;
        pagination();
    };

    function navigateRight() {
        if (curPage === numOfPages) return;
        curPage++;
        pagination();
    };

    // $(document).on("mousewheel DOMMouseScroll", function(e) {
    //     if (scrolling) return;
    //     if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
    //         navigateLeft();
    //     } else {
    //         navigateRight();
    //     }
    // });

    $(document).on("keydown", function(e) {
        if (scrolling) return;
        if (e.which === 37) {
            navigateLeft();
        } else if (e.which === 39) {
            navigateRight();
        }
    });

});