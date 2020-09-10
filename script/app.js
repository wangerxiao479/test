var head_color = "#03a9f4";
var dbStatus = false;
var aesKey, aesIv;
var _apiready;
var _close;
var jscroller;

Date.prototype.Format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //hour
        "H+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
String.prototype.CheckRegexp = function(regexp) {
    var re = new RegExp(regexp);
    if (re.test(this)) {
        return true;
    } else {
        return false;
    }
}

var RootBackPress = false;
apiready = function() {

    aesKey = api.loadSecureValue({
        sync: true,
        key: 'aesKey'
    });
    aesIv = api.loadSecureValue({
        sync: true,
        key: 'aesIv'
    });
    if ($api.dom(".back") != null) {
        $api.addEvt($api.dom(".back"), 'click', function(e) {
            if (_close)
                _close();
            api.closeWin();
        });
    }
    // if (api.systemType == "ios" && compare(api.systemVersion, "7.0.0")) {
    //     if ($api.dom(".header") != null) {
    //         $api.css($api.dom(".header"), 'padding-top:1rem;');
    //     }
    //     if ($api.dom("#searchbox") != null) {
    //         $api.css($api.dom("#searchbox"), 'padding-top:1rem;background-color: #fa5c36;');
    //     }
    //     if ($api.dom(".ui-container") != null) {
    //         $api.css($api.dom(".ui-container"), 'padding-top:1rem;');
    //     }
    // }

    api.addEventListener({
        name: 'keyback'
    }, function(ret, err) {
        var name = api.winName;
        if (name != "root") {
            api.closeWin();
        } else {
            if (RootBackPress == false) // 如果没有按过
            {
                RootBackPress = true;
                showToast("再按一次关闭程序", function() {
                    RootBackPress = false;
                });
            } else {
                api.closeWidget({
                    id: api.appId,
                    retData: {
                        name: 'closeWidget'
                    },
                    silent: true
                });
            }
        }
    });
    api.addEventListener({
        name: 'smartupdatefinish'
    }, function(ret, err) {
        if (api.systemType == "ios") {
            api.rebootApp();
        } else {
            showToast("更新成功,即将重启APP...", function() {
                api.rebootApp();
            });
        }

    });
    if (_apiready)
        _apiready();
    //ToTop
    if (jscroller) {
        jscroller.on("scroll", function() {
            if (this.y < -200) {
                showToTop(jscroller);
            } else {
                hideToTop();
            }
        });
    }
};

/*
 * 版本号比较方法
 * 传入两个字符串，当前版本号：curV；比较版本号：reqV
 * 调用方法举例：compare("1.1","1.2")，将返回false
 */
function compare(curV, reqV) {
    if (curV && reqV) {
        //将两个版本号拆成数字
        var arr1 = curV.split('.'),
            arr2 = reqV.split('.');
        var minLength = Math.min(arr1.length, arr2.length),
            position = 0,
            diff = 0;
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        //若curV大于reqV，则返回true
        return diff > 0;
    } else {
        //输入为空
        console.log("版本号不能为空");
        return false;
    }
}

var showLoading = function(msg) {
    msg = msg || "加载中";
    api.showProgress({
        style: 'default',
        animationType: 'fade',
        title: '',
        text: msg,
        modal: true
    });

};
var closeLoading = function() {
    api.hideProgress();
};

/**
 * 发一个自动隐藏的消息
 * @param  {[type]} msg 消息
 * @param  {[type]} end 结束回调
 * @param  {[type]} t   时间-ms
 * @return {[type]}
 */
var showToast = function(msg, end, t) {
    var times = t || 2000;
    api.toast({
        msg: msg,
        duration: times,
        location: 'middle'
    });
    if (end) {
        setTimeout(function() {
            end();
        }, times);
    }
};

function saveUserInfo(userInfo) {
    var data = $api.jsonToStr(userInfo);
    data = Comment.Str.Encrypt(data); //加密
    $api.setStorage('$userInfo', data);
};

/**
 * 获取用户信息
 * @return {userInfo}
 */
function getUserInfo() {
    var _data = $api.getStorage('$userInfo');
    if (_data) {
        _data = Comment.Str.Decrypt(_data); //解密
        return $api.strToJson(_data);
    }
    return null;
}


function saveUserAccess(access_token) {
    var _atk = Comment.Str.Encrypt(access_token);
    $api.setStorage('$accessToken', _atk);
    return true;
}

function getUserAccess() {
    try {
        var accessToken = $api.getStorage('$accessToken');
        if (accessToken) {
            accessToken = Comment.Str.Decrypt(accessToken);
            return accessToken;
        }
    } catch (e) {

    }
    return null;
}
/**
 * 清除登录状态
 */
function clearLoginStatus() {
    $api.rmStorage('$accessToken');
    $api.rmStorage('$userInfo');
}

function checkLogin(end) {
    if (getUserAccess()) {
        end();
    } else {
        api.sendEvent({
            name: 'goLogin'
        });
    }
}

/**
 * 显示ToTop
 */
function showToTop(jscroller) {
    var totophtml = "<div id=\"goTop\" class=\"minirefresh-totop minirefresh-theme-default minirefresh-fade-in\"></div>";
    if ($("#goTop").length == 0) {
        includeCss("../script/minirefresh/minirefresh.min.css");
        $("body").append(totophtml);
    } else {
        if (!$("#goTop").hasClass("minirefresh-fade-in")) {
            $("#goTop").removeClass("minirefresh-fade-out");
            $("#goTop").addClass("minirefresh-fade-in");
        }
    }
    $("#goTop").one("click", function() {
        if (jscroller) {
            jscroller.scrollTo(0, 0, 200);
        } else {
            window.scrollTo(0);
        }
        hideToTop();
    });
}
/**
 *隐藏ToTop
 */
function hideToTop() {
    $("#goTop").removeClass("minirefresh-fade-in");
    $("#goTop").addClass("minirefresh-fade-out");
}

//加载 css 文件
function includeCss(filename) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = filename;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link)
}

//加载 js 文件
function includeJs(filename) {
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = filename;
    script.type = 'text/javascript';
    head.appendChild(script)
}
