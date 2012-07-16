function isTouchDevice() {
    return 'ontouchstart' in window;
}

$(function () {
    var nav = $('nav.navigation');
    var top = nav.offset().top - parseFloat(nav.css('marginTop').replace(/auto/, 0));

    $(window).scroll(function (e) {
        if (!isTouchDevice()) {
            // Only do this stuff when there is a sidebar in this layout
            // TODO If or when the site is responsive change the greater than value here. 
            if ($(window).width() > 920) {
                var y = $(this).scrollTop();
                if (y >= top) {
                    nav.addClass('fixed');
                } else {
                    nav.removeClass('fixed');
                }
            }
        }
    });

    $('a.expand').click(function(e) {
        if (!$(this).hasClass('expanded')) {
            $('.expanded').removeClass('expanded');
            var expandedMenu = $(this).parent().next('ul');
            $(this, expandedMenu).addClass('expanded');
        }
        return false;
    });
});
