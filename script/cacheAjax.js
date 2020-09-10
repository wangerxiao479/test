//这里到时候配置到key.xml文件内去
// var ServicesUrl = "http://10.211.55.3:52581/";
var ServicesUrl = "http://27.50.50.27:8887/";
//这里配置所有系统的所用到的地址，在以后修改的时候方便使用
var ServicesConifg = {
    Account: {
        QueryPreLogin: ServicesUrl + "api/Account/QueryPreLogin",
        QueryLogin: ServicesUrl + "api/Account/QueryLogin",
        QueryUserInfo: ServicesUrl + "api/Account/QueryUserInfo",
        QueryValidateCode: ServicesUrl + "api/Account/QueryValidateCode",
        QuerySMSCode: ServicesUrl + "api/Account/QuerySMSCode",
        RegUser: ServicesUrl + "api/Account/RegUser",
        AccessLogin: ServicesUrl + "api/Account/AccessLogin",
        UploadPortrait: ServicesUrl + "api/Account/UploadPortrait",
        QueryAdvertising: ServicesUrl + "api/Account/QueryAdvertising",
        QueryPact: ServicesUrl + "api/Account/QueryPact",
        Feedback: ServicesUrl + "api/Account/Feedback",
        QueryTicket: ServicesUrl + "api/Account/QueryTicket",
        UpdateNickName: ServicesUrl + "api/Account/UpdateNickName",
        UpdateIsOpen: ServicesUrl + "api/Account/UpdateIsOpen",
        Recharge: ServicesUrl + "api/Account/Recharge",
        KuaijieUnionPay: ServicesUrl + "api/Account/KuaijieUnionPay",
        Withdraw: ServicesUrl + "api/Account/Withdraw",
        Authentication: ServicesUrl + "api/Account/Authentication",
        QueryFundsRecord: ServicesUrl + "api/Account/QueryFundsRecord",
        QueryMoneyRecord: ServicesUrl + "api/Account/QueryMoneyRecord",
        UpdatePassword: ServicesUrl + "api/Account/UpdatePassword",
        UpdatePayPassword: ServicesUrl + "api/Account/UpdatePayPassword",
        QueryPromotionList: ServicesUrl + "api/Account/QueryPromotionList",
        QueryPromotionInfo: ServicesUrl + "api/Account/QueryPromotionInfo",
        Hotline: ServicesUrl + "api/Account/Hotline",
        AboutUs: ServicesUrl + "api/Account/AboutUs",
        QueryTicketActivity: ServicesUrl + "api/Account/QueryTicketActivity",
        RegistPact: ServicesUrl + "api/Account/RegistPact",
        SubscribePact: ServicesUrl + "api/Account/SubscribePact",
        RechargeStatus: ServicesUrl + "api/Account/RechargeStatus",
        CommonProblem: ServicesUrl + "api/Account/CommonProblem",
        QueryUnShareTicketActivity: ServicesUrl + "api/Account/QueryUnShareTicketActivity",
        ShareTicketActivity: ServicesUrl + "api/Account/ShareTicketActivity",
        ResetVirtualMoney: ServicesUrl + "api/Account/ResetVirtualMoney",
        RiskPact: ServicesUrl + "api/Account/RiskPact"
    },
    Position: {
        QueryList: ServicesUrl + "api/Position/QueryList",
        QueryDetials: ServicesUrl + "api/Position/QueryDetails",
        QueryPosition: ServicesUrl + "api/Position/QueryPosition",
        QuerySimPosition: ServicesUrl + "api/Position/QuerySimPosition",
        QueryAllPosition: ServicesUrl + "api/Position/QueryAllPosition",
        QueryHistoryList: ServicesUrl + "api/Position/QueryHistoryList",
        QuerySimHistoryList: ServicesUrl + "api/Position/QuerySimHistoryList",
        QueryAllHistoryList: ServicesUrl + "api/Position/QueryAllHistoryList",
        QueryRealTimePosition: ServicesUrl + "api/Position/QueryRealTimePosition",
        QueryDetails: ServicesUrl + "api/Position/QueryDetails",
        UpdateIsDelay: ServicesUrl + "api/Position/UpdateIsDelay",
        UpdateGainLoPrice: ServicesUrl + "api/Position/UpdateGainLoPrice",
        QueryPositionMoney: ServicesUrl + "api/Position/QueryPositionMoney",
        QueryOptimalPosition: ServicesUrl + "api/Position/QueryOptimalPosition"
    },
    SysConfig: {
        QuerySysConfig: ServicesUrl + "/api/SysConfig/QuerySysConfig",
        QueryRiskStockVersion: ServicesUrl + "/api/SysConfig/QueryRiskStockVersion",
        QueryRiskStockPool: ServicesUrl + "/api/SysConfig/QueryRiskStockPool",
        QueryRechargeMessage: ServicesUrl + "/api/SysConfig/QueryRechargeMessage",
        QueryExtractMessage: ServicesUrl + "/api/SysConfig/QueryExtractMessage"
    },
    Quotation: {
        StocksInfo: ServicesUrl + "/api/Quotation/StocksInfo",
        QueryMarket: ServicesUrl + "/api/Quotation/QueryMarket"
    },
    Trader: {
        SendEntrust: ServicesUrl + "api/Trader/SendEntrust"
    },
    Ranking: {
        DayRanking: ServicesUrl + "api/Ranking/DayRanking",
        WeekRanking: ServicesUrl + "api/Ranking/WeekRanking",
        MonthRanking: ServicesUrl + "api/Ranking/MonthRanking",
        GainRanking: ServicesUrl + "api/Ranking/GainRanking",
        RecommendRanking: ServicesUrl + "api/Ranking/RecommendRanking",
        UserGains: ServicesUrl + "api/Ranking/UserGains",
        QuarterRanking: ServicesUrl + "api/Ranking/QuarterRanking"
    },
    Message: {
        QueryNotification: ServicesUrl + "api/Message/QueryNotification",
        QuerySubscribeMessage: ServicesUrl + "api/Message/QuerySubscribeMessage",
        HaveRead: ServicesUrl + "api/Message/HaveRead",
        QuerySysMessages: ServicesUrl + "api/Message/QuerySysMessages",
        QuerySubMessagesCount: ServicesUrl + "api/Message/QuerySubMessagesCount",
        QuerySysMessagesCount: ServicesUrl + "api/Message/QuerySysMessagesCount",
        QueryLastMessage: ServicesUrl + "api/Message/QueryLastMessage",
        QueryUnreadNotification: ServicesUrl + "api/Message/QueryUnreadNotification",
        QuerySysUnreadMessages: ServicesUrl + "api/Message/QuerySysUnreadMessages"
    },
    Subscribe: {
        QuerySubscribe: ServicesUrl + "api/Subscribe/QuerySubscribe",
        AddSubscribe: ServicesUrl + "api/Subscribe/AddSubscribe",
        CancelSubscribe: ServicesUrl + "api/Subscribe/CancelSubscribe"
    },
    News: {
        QueryHomeNewsList: ServicesUrl + "api/News/QueryHomeNewsList",
        QueryChannel: ServicesUrl + "api/News/QueryChannel",
        QueryNewsList: ServicesUrl + "api/News/QueryNewsList",
        QueryNews: ServicesUrl + "api/News/QueryNews",
        QueryNewsId: ServicesUrl + "api/News/QueryNewsId"
    },
    SelfStocking: {
        QuerySelfStocks: ServicesUrl + "api/SelfStocking/QuerySelfStocks",
        AddSelfStock: ServicesUrl + "api/SelfStocking/AddSelfStock",
        DeleteSelfStock: ServicesUrl + "api/SelfStocking/DeleteSelfStock",
        SortSelfStock: ServicesUrl + "api/SelfStocking/SortSelfStock"
    },
    SelectStocks: {
        getIntelliPickStockExV2: ServicesUrl + "api/SelectStocks/getIntelliPickStockExV2",
        CategoryDetail: ServicesUrl + "api/SelectStocks/CategoryDetail",
        getInterface: ServicesUrl + "api/SelectStocks/getInterface",
        getSearchES: ServicesUrl + "api/SelectStocks/getSearchES",
        getIntelliStock: ServicesUrl + "api/SelectStocks/getIntelliStock",
        IntelliSecPool: ServicesUrl + "api/SelectStocks/IntelliSecPool",
        getRealTimeHotStock: ServicesUrl + "api/SelectStocks/getRealTimeHotStock",
        searchIntelliPickStockList: ServicesUrl + "api/SelectStocks/searchIntelliPickStockList"
    },
    StockSchool: {
        QueryStockSchoolChannel: ServicesUrl + "api/StockSchool/QueryStockSchoolChannel",
        QueryStockSchoolList: ServicesUrl + "api/StockSchool/QueryStockSchoolList",
        QueryDetail: ServicesUrl + "api/StockSchool/QueryDetail"
    }
};

var sendAjax = function(url, opt, success, error) {
    var isDecode = opt.isDecode == undefined ? true : opt.isDecode;
    var isParamDecode = opt.isParamDecode == undefined ? true : opt.isParamDecode;
    var access_token = getUserAccess() || "";
    var method = opt.method || "get";

    var ajaxOpt = {
        url: url,
        method: method,
        timeout: 10
    };
    //如果是Post请求
    if (method == "post") {
        var paramStr = $api.jsonToStr(opt.param || {});
        if (isParamDecode) {
            paramStr = Comment.Str.EntityEncrypt(opt.param);
        }
        ajaxOpt.data = {
            values: {
                DataStr: paramStr
            }
        };
    }
    //如果有授权信息
    if (access_token != "") {
        ajaxOpt.headers = {
            "Authorization": "Basic " + access_token
        }
    }

    api.ajax(ajaxOpt, function(ret, err) {
        checkRequest(ret, err, success, error, isDecode);
    });
};

/**
 * 发送一个Post请求
 * @param  {ServicesConifg} url     请求地址
 * @param  {Object} param   参数，{a:"a",b:"b"}
 * @param  {Func} success 成功回调方法
 * @param  {Func} error   错误回调方法
 * @return {}         没有返回数据
 */
var sendPost = function(url, param, success, error, isDecode, isParamDecode) {
    sendAjax(url, {
        isDecode: isDecode,
        isParamDecode: isParamDecode,
        param: param,
        method: "post"
    }, success, error);
};



/**
 * 发送一个Post请求
 * @param  {ServicesConifg} url     请求地址
 * @param  {Func} success 成功回调方法
 * @param  {Func} error   错误回调方法
 * @return {}         没有返回数据
 */
var sendGet = function(url, success, error, isDecode) {
    sendAjax(url, {
        isDecode: isDecode,
        isParamDecode: true,
        method: "get"
    }, success, error);
};




/**
 * 回调统一处理
 * @param  {[type]}  succ     [description]
 * @param  {[type]}  success  [description]
 * @param  {[type]}  error    [description]
 * @param  {Boolean} isDecode [description]
 * @return {[type]}           [description]
 */
var checkRequest = function(succ, err, success, error, isDecode) {
    isDecode = isDecode || false;
    if (succ) {
        if (succ.IsSuccess) {
            var _data = succ.SuccessData;
            if (_data) {
                if (isDecode) {
                    _data = Comment.Str.Decrypt(succ.SuccessData);
                }
                if (success) {
                    var jData = {};
                    try {
                        jData = JSON.parse(_data)
                    } catch (e) {
                        jData = _data;
                    }
                    success(jData);
                }
            } else {
                if (success) {
                    success();
                }
            }
        } else {
            if (error) {
                error(succ.ErrorMessage);
            }
        }
    } else {
        try {
            if (err.statusCode != 200) {
                if (err.statusCode == 401) {
                    api.sendEvent({
                        name: 'accessVerifyFail'
                    });
                    closeLoading();
                    if (error) {
                        error();
                    }
                } else {
                    if (error) {
                        error(err.msg);
                    }
                }
            }
        } catch (e) {
            if (error) {
                error("未知错误");
            }
        }
    }
}
