/**
 * 行情插件，调用和讯数据接口
 * 使用Highchart组件
 */
;
(function($) {
    'use strict';

    function compile(text, root) {
        var t = text
        var s = "'use strict';\nvar __t='';__t+='"
        var i = 0
        var r = /\{\{=([^{]+)\}\}|\{\{(each [\w$._]+ as [\w$_]+ [\w$_]+)\}\}|\{\{if ([^{]+)\}\}|\{\{(else)\}\}|\{\{else if ([^{]+)\}\}|(\{\{\/each\}\}|\{\{\/if\}\})|\{\{([^{]+)\}\}/g
            // 预处理，去除多余空格、回车、转换单引号
        t = t.replace(/(\n|\r)|(\{\{\s+)|(\s+\}\})|(\s{2,})|(')/g, function(match, enter, left, right, space, quote) {
                var temp
                if (enter) {
                    temp = ''
                } else if (left) {
                    temp = '{{'
                } else if (right) {
                    temp = '}}'
                } else if (space) {
                    temp = ' '
                } else if (quote) {
                    temp = "\\'"
                }
                return temp
            })
            // 替换字符串
        t.replace(r, function(match, _value, _each, _if, _else, _elseif, _close, _other, offset) {
            s += t.slice(i, offset)
            i = offset + match.length

            if (_value) {
                s += "'+(" + _value.replace(/\\'/g, "'") + ")+'"
            } else if (_each) {
                var p = _each.split(' ')
                s += "';\nfor(var " + p[4] + '=0,' + p[3] + ';' + p[4] + '<' + p[1] + '.length;' + p[4] + '++){\n' + p[3] + '=' + p[1] + '[' + p[4] + "];\n__t+='"
            } else if (_if) {
                s += "';\nif(" + _if.replace(/\\'/g, "'") + "){\n__t+='"
            } else if (_else) {
                s += "';\n}else{\n__t+='"
            } else if (_elseif) {
                s += "';\n}else if(" + _elseif.replace(/\\'/g, "'") + "){\n__t+='"
            } else if (_close) {
                s += "';\n};\n__t+='"
            } else if (_other) {
                s += "';\n" + _other.replace(/\\'/g, "'") + ";\n__t+='"
            }
            return match
        })
        s += t.slice(i) + "';return __t;"

        /* eslint-disable */
        return new Function(root, s)
            /* eslint-enable */
    }

    var Quotation = function(element, options) {
        var self = this;
        var infoCompiled, stallCompiled;
        this.defaults = {
            is_debug: false,
            stock_code: "",
            info_box_css: "stock_info_box",
            compile: compile,
            info_templete: "",
            stall_templete: "",
            root: "_obj",
            interval: 5000,
            loadData: function(_quotation) {},
            loadMinute:function(){},
            onComplete: function(data) {},
            onLoadStockComplete: function(data) {},
            onError: function(err) {}
        };
        this.options = $.extend({}, this.defaults, options); //属性扩展
        this.element = $(element);
        this.output = function(msg) {
            if (is_debug) {
                window.console && console.log(msg);
            }
        };
        infoCompiled = this.options.compile(this.options.info_templete, this.options.root); //编译方法
        stallCompiled = this.options.compile(this.options.stall_templete, this.options.root); //编译方法

        var qInfoBox = document.createElement("div");
        qInfoBox.className = this.options.info_box_css;
        this.element.append(qInfoBox);
        this.infoElement = $(qInfoBox);
        this.setData = function(data) {
            self.options.onLoadStockComplete(data);
            var html = infoCompiled(data);
            self.infoElement.html(html);
        };
        this.onError = function(msg) {
            if (typeof(msg) == "string") {
                self.options.onError(msg);
            } else {
                self.options.onError(JSON.stringify(msg));
            }
        };

        this.initChart = function(){
          function initChart() {
              Highcharts.setOptions({useUTC: true});
              loadMinute(function(sucData, yMax, yMin, plotValue) {
                  $("#hqInfo").highcharts("StockChart", {
                      chart: {
                          events: {
                              load: function() {
                                  var series = this.series[0];
                                  var yAxis = this.yAxis[0];
                                  setInterval(function() {
                                      loadMinute(function(_sucData, _yMax, _yMin, _plotValue) {
                                          series.setData(_sucData);
                                          yAxis.setExtremes(_yMin, _yMax);

                                      });
                                  }, 6000);
                              }
                          }
                      },
                      credits: {
                          enabled: false
                      },
                      exporting: {
                          enabled: false
                      },
                      series: [{
                          name: '价格',
                          data: sucData,
                          lineWidth: 1,
                          color: "#89BAE3"
                      }],
                      xAxis: {
                          ordinal: false,
                          breaks: [{
                              from: translateTime("000000001130"),
                              to: translateTime("000000001300")
                          }],
                          min: translateTime("000000000930"),
                          max: translateTime("000000001500"),
                          plotLines: [{
                              value: translateTime("000000001300"),
                              color: '#D8D8D8',
                              width: 1,
                              dashStyle: "ShortDash"
                          }],
                      },
                      tooltip: {
                          useHTML: true,
                          headerFormat: "",
                          valueDecimals: 2
                      },
                      yAxis: {
                          ordinal: false,
                          max: yMax,
                          min: yMin,
                          startOnTick: false,
                          endOnTick: false,
                          gridLineColor: null,
                          plotLines: [{
                              value: plotValue,
                              color: '#D8D8D8',
                              dashStyle: "ShortDash",
                              width: 1,
                              label: {
                                  text: plotValue
                              }
                          }, {
                              value: yMax,
                              label: {
                                  text: yMax.toFixed(2),
                                  verticalAlign: "middle"
                              }
                          }, {
                              value: yMin,
                              label: {
                                  text: yMin.toFixed(2),
                                  verticalAlign: "top"
                              }
                          }],
                          labels: {
                              enabled: false
                          }
                      },
                      rangeSelector: false,
                      scrollbar: false,
                      navigator: false
                  });
              });
          }
        }

        this.loadMinute = function(end) {
            var startTime = new Date().Format("yyyyMMdd092900");
            var hk = (stockCode.indexOf("6") == 0 ? "sse" : "szse") + stockCode;
            var url = "http://webstock.quote.hermes.hexun.com/a/minute?code=" + hk + "&start=" + startTime + "&number=1000";
            api.ajax({
                url: url,
                method: 'get',
                dataType: "text"
            }, function(ret, err) {
                if (ret) {
                    var json = $api.strToJson(ret.substring(1, ret.length - 2));
                    var _data = json.Data[0];
                    var data = [];
                    for (var i in _data) {
                        data.push([
                            translateTime(_data[i][0]),
                            _data[i][1] / 100
                        ]);
                    }

                    var yMax = json.Data[2] / 100;
                    var yMin = json.Data[3] / 100;
                    var plotValue = json.Data[1] / 100;
                    var XP = Math.abs(yMax - plotValue);
                    var NP = Math.abs(yMin - plotValue);
                    var chazhi = XP;
                    if (NP > XP) {
                        chazhi = NP;
                    }
                    yMax = plotValue + chazhi;
                    yMin = plotValue - chazhi;
                    end(data, yMax, yMin, plotValue);
                } else {}
            });
        }
    };
    //绑定初始化代码
    Quotation.prototype.init = function() {
        var self = this;
        self.options.loadData(self); //执行数据加载
        if (self.options.is_auto_refresh) {
            setInterval(function() {
                self.options.loadData(self);
            }, self.options.interval);
        }
    };
    $.fn.extend({
        quotation: function(opts) {
            var _quotation = new Quotation(this, opts);
            _quotation.init();
            return _quotation;
        }
    });
})(jQuery);
