function Sticks(el, param) {
    var $cur = el,
        curH = $cur.height(),
        curW = $cur.width(),
        offsetTop = $cur.offset().top,
        offsetLeft = $cur.offset().left,
        isFixed = false;
    var ts = this;
    param = param || {};
    param.top = param.top || 0;
    param.isOverride = (param.isOverride == undefined || param.isOverride == null) ? false : param.isOverride;
    param.transform = (param.transform == undefined || param.transform == null) ? false : param.transform;

        //  克隆元素，用于占位
        var $curClone = $cur.clone()
            .css({
                visibility: "hidden",
                display: "none",
                height: $cur.height(),
                width: $cur.width(),
            })
            .insertBefore($cur);
        $curClone.html("&nbsp;");

    if (param.isOverride) {
        //  设置监听函数
        $(window).on("scroll", function() {
            ts.setScroll($(this).scrollTop());
        });
    }
    this.setScroll = function(value) {
        var winScroll = value + param.top;
        if (offsetTop < winScroll) {
            if (!isFixed) {
                ts.setFixed();
                if (param.OnFixed && typeof(param.OnFixed) == "function") {
                    param.OnFixed(ts);
                }
            }
            return true;
        } else {
            if (isFixed) {
                ts.unsetFixed();
                if (param.OnUnFixed && typeof(param.OnUnFixed) == "function") {
                    param.OnUnFixed(ts);
                }
            }
            return false;
        }
    }

    // 设置添加和删除stick函数
    this.setFixed = function() {
        if (param.transform) {
            var $curClones = $cur.clone();
            $curClones.css({
                "position": "fixed",
                "top": param.top,
                "left": offsetLeft,
                "width": curW,
                "z-index": 100,
                "margin": 0
            });
            $cur.html("");
            $curClones.attr("data-tag","transform");
            $("body").append($curClones);
        } else {
            $cur.css({
                "position": "fixed",
                "top": param.top,
                "left": offsetLeft,
                "width": curW,
                "z-index": 100,
                "margin": 0
            });
            $curClone.show();
        }
        isFixed = true;
    };

    this.unsetFixed = function() {

        if (param.transform) {
          var $ele = $("body").find("[data-tag=transform]");
          $cur.html($ele.html());
          $ele.remove();
        } else {
            $cur.removeAttr("style");
            $curClone.hide();
        }
        isFixed = false;
    };

    this.isFixed = function() {
        return isFixed;
    }

    this.getOffsetTop = function(){
        return offsetTop;
    }
};
