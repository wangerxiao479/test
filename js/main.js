/*页面等比例*/
var htmlFontSize;
(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            htmlFontSize = 12 * (clientWidth / 320);
            docEl.style.fontSize = htmlFontSize + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

$(function() {
    /*底部导航*/
    $('.footer li a').each(function() {
        if ($($(this))[0].href == String(window.location))
            $(this).parent().addClass('on');
    });
    /*已启用、已禁用*/
    $(".switch-qy").click(function() {
        $(this).toggleClass("onswitch-qy");
    });
    /*分享*/
    $(".share").click(function(event) {
        event.stopPropagation();
        $(".share_panel").addClass("s_show");
        $(".mask").show();
    });
    $(".mask").click(function(event) {
        $(".share_panel").removeClass("s_show");
        $(".mask").hide();
    });
    /*返回顶部滚动*/
    $(window).scroll(function() {
        var $this = $(this);
        var targetTop = $(this).scrollTop();
        var height = $(window).height();
        if (targetTop >= 50) {
            $(".backtop").show();
        } else {
            $(".backtop").hide();
        }
    });
		$(".floatButton").on({
				touchStart:function(){

				},
				touchMove:function(){

				},
				touchEnd:function(){

				}
		});


});
