//交易方向
var EntrustDirection = {
    Buy: 1,
    Sell: 2
};
//交易模式
var TradeType = {
    MustTrade: 0,//即时成交
    HandTrade: 1,//手动平仓
    ExpiredTrade: 2,//过期平仓
    RiskTrade: 3//强制平仓
};

//策略类型
var StrategyType = {
    FrimTrade :0, //实盘
    SimulationTrade:1 //模拟盘
};

var TradeMode = {
    T1:0,
    TN:1
}
