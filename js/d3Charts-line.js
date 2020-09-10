Array.prototype.max = function () {
    return Math.max.apply({}, this)
};
Array.prototype.min = function () {
    return Math.min.apply({}, this)
};
var d3Charts = {
    formatData: function (e) {
        e.vIncomeResult = [];
        for (var t = 0; t < e.vtAvgIncrease.length; t++)
            e.vtAvgIncrease[t] = 100 * e.vtAvgIncrease[t],
            e.vtSuccPercent[t] = 100 * e.vtSuccPercent[t],
            e.vtYearEarning[t] = 100 * e.vtYearEarning[t],
            e.vIncomeResult.push({
                yearEarning: e.vtYearEarning[t],
                fAvgIncrease: e.vtAvgIncrease[t],
                fSuccPercent: e.vtSuccPercent[t],
                iDay: t + 1
            });
        return e.iHoldingPeriod = e.vtYearEarning.indexOf(e.vtYearEarning.max()) + 1,
            e.bestSuccHold = e.vtSuccPercent.indexOf(e.vtSuccPercent.max()) + 1,
            e.fAvgIncrease = e.vtAvgIncrease[e.iHoldingPeriod - 1],
            e.vtYearEarning = e.vtYearEarning[e.iHoldingPeriod - 1],
            e.bestHoldSuccPercent = e.vtSuccPercent[e.iHoldingPeriod - 1],
            e.fSuccPercent = e.vtSuccPercent.max(),
            e
    },
    drawLine: function (t, aa) {
        a = this.formatData(aa).vIncomeResult;
        a[0].iHoldingPeriod = aa.iHoldingPeriod;
        a[0].vtYearEarning = aa.vtYearEarning;
        a[0].bestSuccHold = aa.bestSuccHold;
        a[0].mSuccPercent = aa.fSuccPercent;
        var r = {
                top: 30,
                right: 45,
                bottom: 24,
                left: 15
            },
            n = document.documentElement.clientWidth - r.left - r.right,
            e = .7 * document.documentElement.clientWidth - r.top - r.bottom,
            i = (d3.time.format("%Y%m%d").parse, d3.time.format.iso, a),
            c = (i.length, a[0].iDay, a[a.length - 1].iDay, d3.scale.linear().range([0, n])),
            d = d3.scale.linear().range([e / 2 - 10, 0]).nice(),
            m = d3.svg.axis().scale(c).tickSize(-3).ticks(9).tickFormat(function (t) {
                return t + "天"
            }).tickPadding(10),
            o = d3.svg.axis().scale(d).tickSize(-n).ticks(6).orient("left").tickFormat(function (t) {
                return t.toFixed(2) + "%"
            }).tickPadding(-(n + r.right - 6)),
            l = d3.scale.linear().range([e, e / 2 + 25]).nice(),
            s = d3.svg.axis().scale(l).tickSize(-n).ticks(6).orient("left").tickFormat(function (t) {
                return t.toFixed(2) + "%"
            }).tickPadding(-(n + r.right - 6)),
            x = d3.svg.line().interpolate("monotone").x(function (t) {
                return c(t.iDay)
            }).y(function (t) {
                return d(t.yearEarning)
            }),
            u = d3.svg.line().interpolate("monotone").x(function (t) {
                return c(t.iDay)
            }).y(function (t) {
                return l(t.fSuccPercent)
            }),
            p = d3.svg.area().interpolate("monotone").x(function (t) {
                return c(t.iDay)
            }).y0(e / 2).y1(function (t) {
                return d(t.yearEarning)
            });
        xminNum = d3.min(i, function (t) {
            return +t.iDay
        }), xmaxNum = d3.max(i, function (t) {
            return +t.iDay
        }), yminNum = d3.min(i, function (t) {
            return +t.yearEarning
        }), ymaxNum = d3.max(i, function (t) {
            return +t.yearEarning
        }), yminNum2 = d3.min(i, function (t) {
            return +t.fSuccPercent
        }), ymaxNum2 = d3.max(i, function (t) {
            return +t.fSuccPercent
        }), c.domain([xminNum, xmaxNum]), d.domain([yminNum, ymaxNum]), l.domain([yminNum2, ymaxNum2]);
        var f = d3.select(t).append("svg").attr("width", n + r.left + r.right).attr("height", e + r.top + r.bottom).append("g").attr("css", "g_holder").attr("transform", "translate(" + r.left + "," + r.top + ")");
        f.append("rect").attr("class", "xline").attr("width", n).attr("height", 1).attr("transform", "translate(0," + e + ")"), f.append("rect").attr("class", "xline xmiddleLine").attr("width", n + r.right).attr("height", 1).attr("transform", "translate(0," + e / 2 + ")"), f.append("g").attr("class", "x axis").attr("transform", "translate(0," + e + ")").call(m), f.append("g").attr("class", "y axis").call(o),
        f.append("path").attr("class", "line").attr("d", x(i)),
        f.append("path").attr("class", "lineChart--area").attr("d", p(i)),
        f.append("path").attr("class", "line line2").attr("d", u(i)),
        f.append("g").attr("class", "y axis").call(s);
        var y = c(a[0].iHoldingPeriod),
            g = c(a[0].bestSuccHold),
            h = f.append("g").attr("class", "text_mark1");
        h.append("circle").attr("cx", y).attr("cy", function (t) {
            return d(ymaxNum)
        }).attr("r", "3").attr("class", "dot"),
        h.append("text").attr("x", y).attr("y", function (t) {
            return d(ymaxNum)
        }).attr("class", "max_text max_text1").attr("dy", "-9px").text("持股" + a[0].iHoldingPeriod + "天,最高年化收益" + a[0].vtYearEarning.toFixed(2) + "%"),
        h.append("line").attr("x1", y).attr("x2", y).attr("y1", function () {
            return d(ymaxNum) + 3
        }).attr("y2", e).attr("class", "dot_line");
        var N = $(".max_text").width();
        N / 2 + y > n && d3.select(".max_text1").attr("transform", "translate(" + (n - N / 2 - y) + ",0)"), y - N / 2 < 0 && d3.select(".max_text1").attr("transform", "translate(" + (0 - y + N / 2) + ",0)");
        var v = f.append("g").attr("class", "text_mark2");
        v.append("circle").attr("cx", g).attr("cy", function (t) {
            return l(ymaxNum2)
        }).attr("r", "3").attr("class", "dot dot2"), v.append("text").attr("x", g).attr("y", function (t) {
            return l(ymaxNum2)
        }).attr("class", "max_text2").attr("dy", "-9px").text("持股" + a[0].bestSuccHold + "天,最大胜率" + a[0].mSuccPercent.toFixed(2) + "%"), v.append("line").attr("x1", g).attr("x2", g).attr("y1", function () {
            return l(ymaxNum2) + 3
        }).attr("y2", e).attr("class", "dot_line dot_line2");
        var _ = $(".max_text2").width();
        _ / 2 + g > n && d3.select(".max_text2").attr("transform", "translate(" + (n - _ / 2 - g) + ",0)"), g - _ / 2 < 0 && d3.select(".max_text2").attr("transform", "translate(" + (0 - g + _ / 2) + ",0)")
    }
};
