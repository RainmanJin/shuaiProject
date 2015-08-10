function loadMarketIndex() {
    MarketIndexChart.showQuotePricesChart($("#chart_type_btns li:eq(0)"))
}

function adjustSearchMenus() {
    "cn" == getSearchConditions().market_region ? $(".without_market_cn").hide() : $(".without_market_cn").show();
    var t = ["consideration_tg", "consideration_bg", "consideration_gg", "consideration_hg"];
    void 0 != getSearchConditions().opinion || t.indexOf(getSearchConditions().consideration) >= 0 ? marketCnMenu().addClass("disabled") : marketCnMenu().removeClass("disabled")
}

function marketCnMenu() {
    return $(".searchmenu dd[data-name=market_region] a[data-filter=cn]")
}

function setStockChart(t, e) {
    $(t).highcharts({
        global: {
            timezoneOffset: -480,
            useUTC: !0
        },
        chart: {
            marginBottom: 15,
            marginTop: 17,
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: "#4183c4",
            style: {
                fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"',
                fontSize: "12px"
            }
        },
        title: {
            text: null
        },
        labels: {
            items: [{
                html: "<span>" + e.symbol + "</span>",
                style: {
                    left: "10px",
                    top: "0px",
                    color: "rgba(95, 155, 212, .9)",
                    font: "font-weight: bold;font-size:14px;"
                }
            }]
        },
        xAxis: {
            categories: e.date,
            lineColor: "rgba(255, 255, 255, .2)",
            tickColor: "rgba(255, 255, 255, .4)",
            tickLength: 5,
            labels: {
                enabled: !1
            }
        },
        credits: {
            enabled: !1
        },
        yAxis: {
            gridLineWidth: 0
        },
        tooltip: {
            crosshairs: [{
                width: 1,
                color: "rgba(56, 58, 76, .5)"
            }, !1],
            backgroundColor: "rgba(255, 255, 255, 0)",
            borderWidth: 0,
            shadow: !1,
            style: {
                color: "#fff",
                fontSize: "12px",
                padding: "0px",
                margin: "0px"
            },
            formatter: function() {
                return e.unit + this.y
            }
        },
        legend: {
            enabled: !1
        },
        plotOptions: {
            series: {
                marker: {
                    radius: 2,
                    states: {
                        hover: {
                            radius: 4.5,
                            halo: !1,
                            lineWidth: 0,
                            lineWidthPlus: 0
                        }
                    }
                },
                states: {
                    hover: {
                        halo: !1,
                        lineWidth: 1,
                        lineWidthPlus: 0
                    }
                }
            }
        },
        series: [{
            data: e.datas,
            lineWidth: 1,
            color: "rgba(255, 255, 255, 0.85)"
        }]
    })
}

function getCurrentPage() {
    return parseInt($(".j_stocks_search").attr("current_page"))
}

function getSearchParamsFromUrl() {
    var t = window.location.href.split("#")[1] || "",
        e = {};
    return $.each(t.split("&"), function() {
        var t = this.split("=")[0],
            i = this.split("=")[1];
        "" != t && "" != i && (e[t] = i)
    }), e
}

function setSearchParamsToUrl(t, e) {
    var i = "/stocks?";
    $.each(t, function(e) {
        "" != e && "" != t[e] && (i += "search[" + e + "]=" + t[e] + "&")
    }), $.each(e, function(t) {
        "" != t && "" != e[t] && (i += "sort[" + t + "]=" + e[t] + "&")
    });
    var n = i.substring(0, i.length - 1);
    changeBrowserUrl(n, t, e)
}

function changeBrowserUrl(t, e, i) {
    window.history && window.history.pushState({
        search: e,
        sort: i
    }, document.title, t)
}

function setInitialStateWhenFirstLoad() {
    if (window.history) {
        var t = {};
        t.search = getSearchConditions(), t.sort = getSortConditions(), window.history.replaceState(t, document.title, window.location.href)
    }
}

function getSearchConditions() {
    var t = {};
    return $(".searchmenu").find("a.active").each(function() {
        t[$(this).parent().attr("data-name")] = $(this).attr("data-filter")
    }), t
}

function getSortConditions() {
    var t = "desc",
        e = "";
    return $(".j_filter_order .sortdown").length > 0 ? (e = $(".j_filter_order .sortdown").attr("data-name"), t = "desc") : $(".j_filter_order .sortup").length > 0 && (e = $(".j_filter_order .sortup").attr("data-name"), t = "asc"), {
        sort_by: e,
        direction: t
    }
}

function searchStocks(t, e, i, n) {
    removeMarketIndexDiv(), addBarloadingDiv(), $("div.addmore").hide();
    var s = getSearchConditions(),
        o = getSortConditions();
    n && setSearchParamsToUrl(s, o), $.post("/stocks/search", {
        search: s,
        sort: o,
        page: t,
        refresh: e,
        scroll: i
    }, function() {
        Translate.parseBody(document.getElementById("j_stockresult"))
    })
}

function removeMarketIndexDiv() {
    $(".stockIndex").remove(), $("#j_stockresult").show()
}

function addBarloadingDiv() {
    removeBarloadingDiv(), $(".j_stocks_search").append("<div class='barloading' style='min-height:200px;clear:both;'></div>")
}

function removeBarloadingDiv() {
    $(".j_stocks_search .barloading").remove()
}

function setSearchConditions(t) {
    var e = t.search,
        i = t.sort,
        n = ["market_region", "sector", "style", "opinion", "trend", "consideration", "capitalization"];
    if ($.each(n, function() {
            if (void 0 != e[this]) {
                var t = $("dd[data-name=" + this + "] a[data-filter=" + e[this] + "]");
                t.parent().parent().addClass("active").addClass("selected"), t.addClass("active").siblings().removeClass("active")
            } else $("dd[data-name=" + this + "] a").removeClass("active"), $("dd[data-name=" + this + "]").parent().removeClass("active").removeClass("selected")
        }), void 0 != e.score ? ($("#filterstar").addClass("active").addClass("selected"), $("#filterstar dd a").attr("data-filter", e.score).addClass("active"), $(".ratestar1 span").attr("style", "width: " + (20 * parseInt(e.score)).toString() + "%;")) : ($("#filterstar").removeClass("active").removeClass("selected"), $("#filterstar dd a").attr("data-filter", 0).removeClass("active")), void 0 != i.sort_by) {
        $(".j_filter_order span").removeClass("sortup").removeClass("sortdown");
        var s = "desc" == i.direction ? "sortdown" : "sortup";
        $(".j_filter_order span[data-name=" + i.sort_by + "]").addClass(s)
    }
    $(".searchmenu h2 del").toggle($(".searchmenu a.active").length > 0)
}
$(function() {
    HighStockExt.hackPointerRunPointActions(), HighStockExt.setChartOpions(), $(".stockIndex .stockStatus li").on("click", function() {
        $(this).parent().find("a").removeClass("active"), $(this).find("a").addClass("active"), $("#market_index_minute_chart").html(""), $("#market_index_kline_chart").html(""), loadMarketIndex(), OneDayMinute.loadByTab()
    }), setInterval("OneDayMinute.loadByTab();", 3e4)
});
var MarketIndexChart = {
        current_market_index_stock_id: null,
        end_trade_timestamp: null,
        previous_close: null,
        minutes_datas: {},
        kline_datas: {},
        update_stock_chart_datas: !0,
        show_minutes_time: !0,
        current_chart_datas_name: "1dm",
        showQuotePricesChart: function(t) {
            this.activeChartButton(t), $("#market_index_minute_chart").show(), $("#market_index_kline_chart").parent().hide(), this.getActiveMarketStockId(), this.setQuotePriceChart(this.current_market_index_stock_id)
        },
        showKlinesChart: function(t, e) {
            this.activeChartButton(e), $("#market_index_kline_chart").parent().show(), $("#market_index_minute_chart").hide(), this.getActiveMarketStockId(), this.setKlineChart(t, this.current_market_index_stock_id)
        },
        activeChartButton: function(t) {
            $(t).addClass("active").siblings().removeClass("active")
        },
        getActiveMarketStockId: function() {
            var t = $(".stockIndex .stockStatus a").filter(function() {
                return $(this).hasClass("active")
            }).first().parent();
            this.current_market_index_stock_id = t.attr("data-id"), this.end_trade_timestamp = parseInt(t.attr("data-end-timestamps")), this.previous_close = parseFloat(t.attr("data-previous-close")), HighStockExt.minute_chart_compare_value = this.previous_close
        },
        setQuotePriceChart: function(t) {
            var e = MarketIndexChart.minutes_datas[t];
            void 0 == e ? $.get("/ajax/stocks/" + t + "/quote_prices", {}, function(i) {
                e = e || {}, e.all = MarketIndexChart.adjustedDayDatas(i.prices), e.one_day = MarketIndexChart.adjustedOneDayMinuteDatas(i.one_day_minutes), MarketIndexChart.minutes_datas[t] = e, MarketIndexChart.drawQuotePriceChart(e.one_day.prices, e.one_day.volume, e.all.prices), HighStockExt.setMinuteChartYaxisMinMax(MarketIndexChart.getOneDayMinutesMaxMin(t)), HighStockExt.actionsAfterMinuteChartRedrawed(), e.week = MarketIndexChart.adjustedWeekMinutesDatas(i.week_minutes), e.six_months = MarketIndexChart.adjustedSixMonthsDatas(i.six_months), MarketIndexChart.minutes_datas[t] = e
            }) : (MarketIndexChart.drawQuotePriceChart(e.one_day.prices, e.one_day.volume, e.all.prices), HighStockExt.setMinuteChartYaxisMinMax(MarketIndexChart.getOneDayMinutesMaxMin(t)), HighStockExt.actionsAfterMinuteChartRedrawed())
        },
        updateChartSeriesData: function(t, e) {
            var i = MarketIndexChart.selectStockChartDatas(t + 10, e);
            if (1 == MarketIndexChart.update_stock_chart_datas) {
                var n = $("#market_index_minute_chart").highcharts();
                n.series[0].setData(i.prices, !1), n.series[1].setData(i.volume, !1), n.redraw()
            }
            HighStockExt.actionsAfterMinuteChartRedrawed()
        },
        selectStockChartDatas: function(t) {
            var e = {},
                i = MarketIndexChart.current_market_index_stock_id,
                n = MarketIndexChart.minutes_datas[i],
                s = {
                    min: null,
                    max: null
                };
            if (MarketIndexChart.update_stock_chart_datas = !0, MarketIndexChart.show_minutes_time = !1, t >= parseInt($("#time_period li:eq(0)").attr("data"))) e = n.one_day, MarketIndexChart.show_minutes_time = !0, MarketIndexChart.current_chart_datas_name = "1dm", s = MarketIndexChart.getOneDayMinutesMaxMin(i), HighStockExt.minute_chart_compare_value = MarketIndexChart.previous_close;
            else if (t >= n.week.prices[0].x) e = n.week, MarketIndexChart.show_minutes_time = !0, MarketIndexChart.current_chart_datas_name = "5dm", HighStockExt.minute_chart_compare_value = e.prices[0].y;
            else if (t >= n.six_months.prices[0].x) e = n.six_months, MarketIndexChart.update_stock_chart_datas = "day-6m" == MarketIndexChart.current_chart_datas_name ? !1 : !0, MarketIndexChart.current_chart_datas_name = "day-6m", HighStockExt.minute_chart_compare_value = MarketIndexChart.firstValueByStartTimestamp(e.prices, t);
            else {
                e = n.all, MarketIndexChart.update_stock_chart_datas = "day" == MarketIndexChart.current_chart_datas_name ? !1 : !0, MarketIndexChart.current_chart_datas_name = "day";
                var o = MarketIndexChart.firstValueByStartTimestamp(e.prices, t);
                null != o && (HighStockExt.minute_chart_compare_value = o)
            }
            return HighStockExt.setMinuteChartYaxisMinMax(s), e
        },
        firstValueByStartTimestamp: function(t, e) {
            for (index in t)
                if (t[index].x >= e - 10) return t[index].y
        },
        adjustedDayDatas: function(t) {
            var e = MarketIndexChart.getPricesAndVolumeDatas(t),
                i = [{
                    x: MarketIndexChart.end_trade_timestamp + 288e5,
                    y: null
                }];
            return {
                prices: e.prices.concat(i),
                volume: e.volume.concat(i)
            }
        },
        adjustedSixMonthsDatas: function(t) {
            return MarketIndexChart.getPricesAndVolumeDatas(t)
        },
        adjustedOneDayMinuteDatas: function(t) {
            var e = MarketIndexChart.getPricesAndVolumeDatas(t),
                i = e.prices.length > 0 ? e.prices.slice(-1)[0].x : MarketIndexChart.end_trade_timestamp,
                n = MarketIndexChart.minuteDatasAppendedPoints(i);
            return {
                prices: this.exceptDatasAfterEndTime(e.prices).concat(n),
                volume: this.exceptDatasAfterEndTime(e.volume).concat(n)
            }
        },
        exceptDatasAfterEndTime: function(t) {
            var e = [];
            return $.each(t, function(i) {
                t[i].x <= MarketIndexChart.end_trade_timestamp && e.push(t[i])
            }), e
        },
        minuteDatasAppendedPoints: function(t) {
            var e = Math.floor((MarketIndexChart.end_trade_timestamp - t) / 6e4),
                n = [];
            for (i = 0; e > i; i++) n.push({
                x: t + 6e4 * (i + 1),
                y: null
            });
            return n
        },
        getOneDayMinutesMaxMin: function(t) {
            var e, i, n = [MarketIndexChart.previous_close],
                n = [];
            return $.each(MarketIndexChart.minutes_datas[t].one_day.prices, function(e) {
                var i = MarketIndexChart.minutes_datas[t].one_day.prices[e].y;
                null != i && n.push(i)
            }), $.each(n, function(t) {
                (void 0 == e || e < n[t]) && (e = n[t]), (void 0 == i || i > n[t]) && (i = n[t])
            }), {
                min: i,
                max: e
            }
        },
        adjustedWeekMinutesDatas: function(t) {
            return MarketIndexChart.getPricesAndVolumeDatas(t)
        },
        getPricesAndVolumeDatas: function(t) {
            var e = [],
                n = [],
                s = t.length;
            for (i = 0; s > i; i++) e.push({
                x: t[i][0],
                y: t[i][1]
            }), n.push({
                x: t[i][0],
                y: t[i][2]
            });
            return {
                prices: e,
                volume: n
            }
        },
        drawQuotePriceChart: function(t, e, i) {
            $("#market_index_minute_chart").highcharts("StockChart", {
                chart: {
                    margin: 0,
                    marginTop: 10,
                    marginRight: 68,
                    marginLeft: 55,
                    spacingBottom: 10,
                    style: {
                        fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"',
                        fontSize: "12px"
                    },
                    animation: !1,
                    panning: !1
                },
                rangeSelector: {
                    enabled: !1,
                    inputEnabled: !0,
                    inputDateFormat: "%Y-%m-%d",
                    buttons: [],
                    inputStyle: {
                        color: "#1f1f1f",
                        fontWeight: "bold"
                    },
                    labelStyle: {
                        color: "#0b1318",
                        fontWeight: "bold"
                    }
                },
                plotOptions: {
                    line: {
                        turboThreshold: Number.MAX_VALUE,
                        dataGrouping: {
                            enabled: !1
                        },
                        connectNulls: !0,
                        color: "#4183c4",
                        threshold: null,
                        lineWidth: 1.2,
                        states: {
                            hover: {
                                lineWidth: 1.2
                            }
                        },
                        animation: !1
                    },
                    area: {
                        turboThreshold: Number.MAX_VALUE,
                        dataGrouping: {
                            enabled: !1
                        },
                        connectNulls: !0,
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                                [0, "rgba(135, 189, 238, 1)"],
                                [1, "rgba(135, 189, 238, 0)"]
                            ]
                        },
                        color: "#87bdee",
                        threshold: null
                    },
                    column: {
                        color: "#d0d0d0",
                        turboThreshold: Number.MAX_VALUE,
                        dataGrouping: {
                            enabled: !1
                        }
                    },
                    series: {
                        point: {
                            events: {
                                mouseOver: function() {
                                    HighStockExt.pointMouseOverAction(this)
                                },
                                mouseOut: function() {
                                    HighStockExt.pointMouseOutAction(this)
                                }
                            }
                        }
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    offset: -18,
                    gridLineWidth: 1,
                    gridLineColor: "#F0F0F0",
                    dateTimeLabelFormats: {
                        millisecond: "%H:%M",
                        second: "%H:%M",
                        minute: "%H:%M",
                        day: "%m.%d",
                        week: "%m.%d",
                        month: "%Y/%m",
                        year: "%Y\u5e74"
                    },
                    events: {
                        afterSetExtremes: function(t) {
                            MarketIndexChart.updateChartSeriesData(t.min, t.max), MarketIndexChart.setChartTickInterval(t.min, t.max)
                        },
                        setExtremes: function() {}
                    },
                    minRange: 216e5,
                    minTickInterval: 36e5,
                    showLastLabel: !0
                },
                yAxis: [{
                    opposite: !1,
                    offset: -10,
                    title: {
                        text: null
                    },
                    labels: {
                        align: "right",
                        formatter: function() {
                            return ""
                        }
                    },
                    height: 200,
                    gridLineColor: "#F0F0F0",
                    tickPixelInterval: 40,
                    tickPositioner: function() {
                        return null != this.dataMin && null != this.dataMax ? HighStockExt.calTickPositions(this.dataMin, this.dataMax) : void 0
                    }
                }, {
                    opposite: !1,
                    offset: -10,
                    title: {
                        text: null
                    },
                    labels: {
                        align: "right"
                    },
                    top: 220,
                    height: 60,
                    gridLineColor: "#F0F0F0",
                    tickPixelInterval: 30
                }],
                credits: {
                    enabled: !1
                },
                navigator: {
                    series: {
                        data: i
                    },
                    adaptToUpdatedData: !1,
                    height: 30
                },
                scrollbar: {
                    liveRedraw: !1
                },
                tooltip: {
                    crosshairs: [!1],
                    positioner: function() {
                        return {
                            x: 50,
                            y: 5
                        }
                    },
                    shared: !0,
                    useHTML: !0,
                    shadow: !1,
                    borderColor: "rgba(255, 255, 255, 0)",
                    backgroundColor: "rgba(255, 255, 255, 0)",
                    valueDecimals: 2,
                    style: {},
                    formatter: function() {
                        var t = "";
                        return $.each(this.points, function(e, i) {
                            if (0 == i.series.index) {
                                t += '<span style="margin-left:10px">\u5f53\u524d\u4ef7\uff1a' + i.y.round(HighStockExt.minute_round_digit);
                                var n = HighStockExt.valueChangePercent(i.y),
                                    s = 0 == n ? "gray" : n > 0 ? "red" : "#00A600";
                                t += "<span style='color:" + s + ";'>(", t += n > 0 ? "+" : "", t += n.toFixed(2) + "%)</span>"
                            } else t += '<span style="margin-left:10px">\u6210\u4ea4\u91cf\uff1a' + MarketIndexChart.humanizedVolume(i.y) + "</span>"
                        }), t += '<span style="margin-left:10px"></span>', t += MarketIndexChart.show_minutes_time ? "\u65f6\u95f4\uff1a" + Highcharts.dateFormat("%Y-%m-%d %H:%M", this.x) : "\u65f6\u95f4\uff1a" + Highcharts.dateFormat("%Y-%m-%d", this.x)
                    }
                },
                series: [{
                    type: "line",
                    name: "minutes",
                    enabledCrosshairs: !0,
                    data: t
                }, {
                    type: "column",
                    name: "Volume",
                    data: e,
                    yAxis: 1
                }]
            }, function() {
                setTimeout(function() {
                    $("#stock_chart .highcharts-button").hide()
                }, 0)
            })
        },
        setChartTickInterval: function(t, e) {
            var i, n = $("#market_index_minute_chart").highcharts(),
                s = e - t,
                o = !0;
            s > 15768e7 ? i = 23652e6 : s > 93312e6 ? i = 15552e6 : s > 31104e6 ? i = 7776e6 : s > 15552e6 ? i = 2592e6 : s > 7776e6 ? i = 18144e5 : s > 2592e6 ? i = 6048e5 : s > 864e6 ? i = 6048e5 : s > 864e5 ? (i = 864e5, o = !1) : i = 36e5, n.xAxis[0].update({
                minTickInterval: i,
                showLastLabel: o
            })
        },
        setKlineChart: function(t, e) {
            var i = "day" == t ? 6048e5 : null,
                n = MarketIndexChart.kline_datas[e],
                s = MarketIndexChart.getKlineButtonsByType(t);
            $("#market_index_kline_chart").html(""), void 0 == n || void 0 == n[t] ? $.get("/ajax/stocks/" + e + "/klines", {
                type: t
            }, function(o) {
                n = n || {}, n[t] = MarketIndexChart.getOhlcAndVolumeDatas(o), MarketIndexChart.kline_datas[e] = n, MarketIndexChart.drawKlineChart(n[t], s, i)
            }) : MarketIndexChart.drawKlineChart(n[t], s, i)
        },
        getOhlcAndVolumeDatas: function(t) {
            var e = [],
                n = [],
                s = [],
                o = [],
                r = [],
                a = [],
                l = t.length;
            for (i = 0; l > i; i++) {
                var h = 0 == i ? 0 : t[i].close - t[i - 1].close,
                    c = 0 == i ? 0 : 100 * h / t[i - 1].close,
                    d = MarketIndexChart.calKlineMaData(t, i, 5),
                    p = MarketIndexChart.calKlineMaData(t, i, 10),
                    u = MarketIndexChart.calKlineMaData(t, i, 20),
                    g = MarketIndexChart.calKlineMaData(t, i, 30);
                e.push({
                    x: t[i].date,
                    y: t[i].high,
                    open: t[i].open,
                    high: t[i].high,
                    low: t[i].low,
                    close: t[i].close,
                    change: h,
                    change_percent: c,
                    volume: t[i].volume,
                    ma5: d.toFixed(2),
                    ma10: p.toFixed(2),
                    ma20: u.toFixed(2),
                    ma30: g.toFixed(2),
                    kline: !0
                }), n.push({
                    x: t[i].date,
                    y: t[i].volume
                }), s.push([t[i].date, d]), o.push([t[i].date, p]), r.push([t[i].date, u]), a.push([t[i].date, g])
            }
            return {
                ohlc: e,
                volume: n,
                ma5: s,
                ma10: o,
                ma20: r,
                ma30: a
            }
        },
        calKlineMaData: function(t, e, i) {
            var n = i > e ? 0 : e - i + 1,
                s = 0;
            for (j = n; e >= j; j++) s += t[j].close;
            return s / i
        },
        drawKlineChart: function(t, e, i) {
            HighStockExt.setKlineVolumeColor(), $("#market_index_kline_chart").highcharts("StockChart", {
                chart: {
                    margin: 0,
                    marginRight: 68,
                    spacingBottom: 10,
                    spacingTop: 0,
                    style: {
                        fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"',
                        fontSize: "12px"
                    },
                    panning: !1
                },
                rangeSelector: {
                    enabled: !0,
                    buttons: e,
                    selected: 0,
                    inputEnabled: !1,
                    inputDateFormat: "%Y-%m-%d",
                    inputStyle: {
                        color: "#1f1f1f",
                        fontWeight: "bold"
                    },
                    labelStyle: {
                        color: "#0b1318",
                        fontWeight: "bold"
                    }
                },
                plotOptions: {
                    candlestick: {
                        color: "#4daf7b",
                        lineColor: "#4daf7b",
                        upLineColor: "#e4462e",
                        upColor: "#e4462e",
                        turboThreshold: Number.MAX_VALUE,
                        dataGrouping: {
                            enabled: !1,
                            groupPixelWidth: 10,
                            units: MarketIndexChart.klineGroupingUnits
                        },
                        tooltip: {
                            crosshairs: [!0, !0]
                        }
                    },
                    column: {
                        turboThreshold: Number.MAX_VALUE,
                        dataGrouping: {
                            enabled: !1,
                            groupPixelWidth: 10,
                            units: MarketIndexChart.klineGroupingUnits
                        }
                    },
                    line: {
                        lineWidth: 1,
                        enableMouseTracking: !1
                    }
                },
                title: {
                    text: null
                },
                xAxis: {
                    gridLineWidth: 1,
                    gridLineColor: "#F0F0F0",
                    dateTimeLabelFormats: {
                        millisecond: "%H:%M",
                        second: "%H:%M",
                        minute: "%H:%M",
                        day: "%m.%d",
                        week: "%m.%d",
                        month: "%Y/%m",
                        year: "%Y\u5e74"
                    },
                    events: {
                        afterSetExtremes: function() {}
                    },
                    labels: {
                        maxStaggerLines: 1
                    },
                    tickInterval: i,
                    top: 15
                },
                yAxis: [{
                    opposite: !0,
                    offset: 10,
                    title: {
                        text: null
                    },
                    labels: {
                        align: "right",
                        distance: 10,
                        x: 20
                    },
                    height: 200,
                    top: 10,
                    gridLineColor: "#F0F0F0",
                    tickPixelInterval: 40
                }, {
                    opposite: !0,
                    offset: 10,
                    title: {
                        text: null
                    },
                    labels: {
                        align: "right",
                        distance: 10,
                        x: 20
                    },
                    top: 220,
                    height: 60,
                    tickPixelInterval: 30,
                    gridLineColor: "#F0F0F0"
                }],
                navigator: {
                    height: 30
                },
                scrollbar: {
                    liveRedraw: !1
                },
                credits: {
                    enabled: !1
                },
                tooltip: {
                    crosshairs: [!0, !1],
                    followPointer: !0,
                    positioner: function(t, e, i) {
                        var n = this.chart;
                        return i.plotX + 2 * t >= n.plotWidth ? {
                            x: i.plotX - t - 30,
                            y: 50
                        } : {
                            x: i.plotX + 50,
                            y: 50
                        }
                    },
                    shared: !0,
                    useHTML: !0,
                    borderColor: "#dfdfdf",
                    backgroundColor: "rgba(255, 255, 255, 0.85)",
                    shadow: !1,
                    valueDecimals: 2,
                    style: {
                        padding: "12px"
                    },
                    formatter: function() {
                        var t = '<b style="line-height: 25px;">' + Highcharts.dateFormat("%Y-%m-%d %A", this.x) + "</b>";
                        return $.each(this.points, function(e, i) {
                            0 == i.series.index ? (t += '<br/><span style="line-height: 25px;">\u5f00\u76d8\u4ef7\uff1a' + i.point.open.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6700\u9ad8\u4ef7\uff1a' + i.point.high.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6700\u4f4e\u4ef7\uff1a' + i.point.low.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6536\u76d8\u4ef7\uff1a' + i.point.close.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6da8\u8dcc\u989d\uff1a' + MarketIndexChart.upOrDownStyle(i.point.change, !1) + "</span>", t += '<br/><span style="line-height: 25px;">\u6da8\u8dcc\u5e45\uff1a' + MarketIndexChart.upOrDownStyle(i.point.change_percent, !0) + "</span>", MarketIndexChart.setKlineInfo(Highcharts.dateFormat("%Y-%m-%d", this.x), i.point.open, i.point.high, i.point.low, i.point.close, MarketIndexChart.humanizedVolume(i.point.volume), i.point.change_percent.toFixed(2) + "%", i.point.ma5, i.point.ma10, i.point.ma20, i.point.ma30)) : t += '<br/><span style="line-height: 25px;">\u6210\u4ea4\u91cf\uff1a' + MarketIndexChart.humanizedVolume(i.y) + "</span>"
                        }), t
                    },
                    xDateFormat: "%Y-%m-%d"
                },
                series: [{
                    type: "candlestick",
                    name: "AAPL",
                    data: t.ohlc,
                    zIndex: 20
                }, {
                    type: "line",
                    name: "ma5",
                    data: t.ma5,
                    yAxis: 0,
                    color: "#D2691E"
                }, {
                    type: "line",
                    name: "ma10",
                    data: t.ma10,
                    yAxis: 0,
                    color: "#6A5ACD"
                }, {
                    type: "line",
                    name: "ma20",
                    data: t.ma20,
                    yAxis: 0,
                    color: "#4daf7b"
                }, {
                    type: "line",
                    name: "ma30",
                    data: t.ma30,
                    yAxis: 0,
                    color: "#D02090"
                }, {
                    type: "column",
                    name: "Volume",
                    data: t.volume,
                    yAxis: 1
                }]
            }, function() {
                setTimeout(function() {
                    $("#market_index_kline_chart .highcharts-button").hide()
                }, 0), MarketIndexChart.showKlineInfosDiv()
            });
            var n = t.ohlc[t.ohlc.length - 1];
            StockShow.setKlineInfo(Highcharts.dateFormat("%Y-%m-%d", n.x), n.open, n.high, n.low, n.close, StockShow.humanizedVolume(n.volume), n.change_percent.toFixed(2) + "%", n.ma5, n.ma10, n.ma20, n.ma30)
        },
        setKlineInfo: function(t, e, i, n, s, o, r, a, l, h, c) {
            $("#kline_info span:eq(0)").text(t), $("#kline_info span:eq(1)").text(e.toFixed(2)), $("#kline_info span:eq(2)").text(i.toFixed(2)), $("#kline_info span:eq(3)").text(n.toFixed(2)), $("#kline_info span:eq(4)").text(s.toFixed(2)), $("#kline_info span:eq(5)").text(o), $("#kline_info span:eq(6)").text(r), $("#kline_mainfo span:eq(0)").text(a), $("#kline_mainfo span:eq(1)").text(l), $("#kline_mainfo span:eq(2)").text(h), $("#kline_mainfo span:eq(3)").text(c)
        },
        showKlineInfosDiv: function() {
            $("#kline_info").show(), $("#kline_mainfo").show()
        },
        hideKlineInfosDiv: function() {
            $("#kline_info").hide(), $("#kline_mainfo").hide()
        },
        getKlineButtonsByType: function(t) {
            switch (t) {
                case "week":
                    return [{
                        type: "year",
                        count: 1,
                        text: "1\u5e74"
                    }];
                case "month":
                    return [{
                        type: "year",
                        count: 3,
                        text: "3\u5e74"
                    }];
                default:
                    return [{
                        type: "month",
                        count: 3,
                        text: "3\u6708"
                    }]
            }
        },
        upOrDownStyle: function(t, e) {
            var i = e ? "%" : "";
            return t >= 0 ? "<span style='color:red;'>" + calPrefix(t) + t.toFixed(2) + i + "</span>" : "<span style='color:#00A600;'>" + calPrefix(t) + t.toFixed(2) + i + "</span>"
        },
        humanizedVolume: function(t) {
            return t >= 1e8 ? (t / 1e8).toFixed(2) + "\u4ebf\u80a1" : t >= 1e4 ? (t / 1e4).toFixed(2) + "\u4e07\u80a1" : t.toFixed(2) + "\u80a1"
        }
    },
    OneDayMinute = {
        loadByTab: function() {
            var t = $(".stockStatus a").filter(function() {
                    return $(this).hasClass("active")
                }).first(),
                e = t.parent(),
                i = e.attr("data-id"),
                n = parseInt(e.attr("data-utc-end-ts"));
            i && this.AjaxUpdateMinutes(i, n)
        },
        AjaxUpdateMinutes: function(t, e) {
            var i = (new Date).getTime();
            e + 12e5 >= i && this.updateMinutesChart(t, e)
        },
        updateMinutesChart: function(t, e) {
            var i = MarketIndexChart.minutes_datas[t];
            return i ? void $.get("/ajax/stocks/" + t + "/minutes", {}, function(n) {
                i.one_day = MarketIndexChart.adjustedOneDayMinuteDatas(n.one_day_minutes), $("#market_index_minute_chart").highcharts().xAxis[0].min + 36e6 > e && $(".stockStatus a").filter(function() {
                    return $(this).hasClass("active")
                }).first().parent().attr("data-id") == t && $("#chart_type_btns li:eq(0)").hasClass("active") && MarketIndexChart.showQuotePricesChart($("#chart_type_btns li:eq(0)"))
            }) : !1
        }
    },
    HighStockExt = {
        previous_close_line: null,
        minute_chart: void 0,
        minute_chart_compare_value: null,
        minute_round_digit: 2,
        getMinuteChart: function() {
            return $("#market_index_minute_chart").highcharts()
        },
        setChartOpions: function() {
            Highcharts.setOptions({
                lang: {
                    rangeSelectorFrom: "",
                    rangeSelectorTo: "\u81f3",
                    rangeSelectorZoom: "",
                    shortMonths: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
                    weekdays: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"]
                }
            })
        },
        hackPointerRunPointActions: function() {
            Highcharts.Pointer.prototype.runPointActions = function(t) {
                var e, i, n, s, o, r, a = this,
                    l = a.chart,
                    h = l.series,
                    c = l.tooltip,
                    d = l.hoverPoint,
                    p = l.hoverSeries,
                    u = l.chartWidth,
                    g = a.getIndex(t);
                if (c && a.options.tooltip.shared && (!p || !p.noSharedTooltip)) {
                    for (n = [], s = h.length, o = 0; s > o; o++) h[o].visible && h[o].options.enableMouseTracking !== !1 && !h[o].noSharedTooltip && h[o].singularTooltips !== !0 && h[o].tooltipPoints.length && (i = h[o].tooltipPoints[g], i && i.series && (i._dist = Math.abs(g - i.clientX), u = Math.min(u, i._dist), n.push(i)));
                    for (s = n.length; s--;) n[s]._dist > u && n.splice(s, 1);
                    n.length && n[0].clientX !== a.hoverX && (c.refresh(n, t), a.hoverX = n[0].clientX)
                }
                e = p && p.tooltipOptions.followPointer, p && p.tracker && !e ? (i = p.tooltipPoints[g], i && i !== d && i.onMouseOver(t)) : c && e && !c.isHidden && (r = c.getAnchor([{}], t), c.updatePosition({
                    plotX: r[0],
                    plotY: r[1]
                })), c && !a._onDocumentMouseMove && (a._onDocumentMouseMove = function(t) {
                    Highcharts.charts[l.index] && Highcharts.charts[l.index].pointer.onDocumentMouseMove(t)
                }, Highcharts.addEvent(document, "mousemove", a._onDocumentMouseMove)), $.each(l.axes, function(e) {
                    l.axes[e].drawCrosshair(t, Highcharts.pick(i, d))
                }), n && n.length > 0 ? n[0].onMouseOver(t) : null
            }
        },
        actionsAfterMinuteChartRedrawed: function() {
            this.drawPreviousClosePriceLine(), this.drawMinuteChartPercentYaxis()
        },
        pointMouseOverAction: function(t) {
            var e = t.series.chart,
                i = e.renderer,
                n = e.plotLeft,
                s = e.plotTop,
                o = e.plotWidth,
                r = e.plotHeight,
                a = t.plotX,
                l = t.plotY;
            if (t.series.options.enabledCrosshairs) {
                var h = i.g("cross-hairs").attr({
                    zIndex: 7
                }).add();
                i.path(["M", n, s + l, "L", n + o, s + l]).attr({
                    "stroke-width": 1,
                    opacity: .5,
                    stroke: "black",
                    zIndex: 2
                }).add(h), i.path(["M", n + a, s, "L", n + a, s + r]).attr({
                    "stroke-width": 1,
                    opacity: .5,
                    stroke: "black",
                    zIndex: 2
                }).add(h), HighStockExt.addYvalueAndComparePercent(t, h, e)
            }
        },
        addYvalueAndComparePercent: function(t, e, i) {
            var n = i.renderer,
                s = i.plotLeft,
                o = i.plotTop,
                r = t.y,
                a = t.x,
                l = i.plotWidth,
                h = t.plotY,
                c = MarketIndexChart.show_minutes_time ? 40 : 70,
                d = r >= 1e4 ? Math.round(r) : r.round(HighStockExt.minute_round_digit),
                p = HighStockExt.valueChangePercent(r).toFixed(2) + "%",
                u = MarketIndexChart.show_minutes_time ? Highcharts.dateFormat("%H:%M", a) : Highcharts.dateFormat("%Y-%m-%d", a);
            n.rect(s - 50, o + h - 10, 50, 20, 0).attr({
                "stroke-width": 1,
                stroke: "#dedede",
                fill: "#f0f0f0",
                zIndex: 8
            }).add(e), n.rect(s + l, o + h - 10, 50, 20, 0).attr({
                "stroke-width": 1,
                stroke: "#dedede",
                fill: "#f0f0f0",
                zIndex: 8
            }).add(e), n.rect(s + t.plotX - c / 2, o + 275, c, 20, 0).attr({
                "stroke-width": 1,
                stroke: "#dedede",
                fill: "#f0f0f0",
                zIndex: 8
            }).add(e), n.text(d, s - 5, o + h + 5).attr({
                zIndex: 9,
                "text-anchor": "end"
            }).add(e), n.text(p, s + l + 5, o + h + 5).attr({
                zIndex: 9
            }).add(e), n.text(u, s + t.plotX, o + 290).attr({
                zIndex: 9,
                "text-anchor": "middle"
            }).add(e)
        },
        pointMouseOutAction: function() {
            $(".highcharts-cross-hairs").remove()
        },
        addLineByYValue: function(t, e) {
            var i = t.renderer,
                n = t.plotLeft,
                s = t.plotWidth,
                o = HighStockExt.calculateValueYPixelOfMinuteChart(t, e),
                r = i.path(["M", n, o, "L", n + s, o]).attr({
                    fill: "none",
                    "stroke-width": 1,
                    zIndex: 2,
                    opacity: .9,
                    stroke: "red",
                    dashstyle: "5 8 3 9"
                }).add();
            return r
        },
        drawPreviousClosePriceLine: function() {
            if (this.destroyPreviousClosePriceLine(), "1dm" == MarketIndexChart.current_chart_datas_name) {
                var t = this.getMinuteChart();
                this.previous_close_line = this.addLineByYValue(t, MarketIndexChart.previous_close)
            }
        },
        destroyPreviousClosePriceLine: function() {
            null !== this.previous_close_line && void 0 !== this.previous_close_line.d && this.previous_close_line.destroy()
        },
        setMinuteChartYaxisMinMax: function(t) {
            this.getMinuteChart().yAxis[0].update(t)
        },
        drawMinuteChartPercentYaxis: function() {
            $(".highcharts-percent-yaxis").remove();
            var t = this.getMinuteChart(),
                e = t.renderer,
                i = t.plotLeft,
                n = t.plotWidth,
                s = e.g("percent-yaxis").attr({
                    zIndex: 7
                }).add(),
                o = t.yAxis[0].tickPositions;
            $.each(o.slice(0, o.length - 1), function(r) {
                var a = HighStockExt.valueChangePercent(o[r]),
                    l = HighStockExt.calculateValueYPixelOfMinuteChart(t, o[r]),
                    h = 0 == a ? "gray" : a >= 0 ? "red" : "#00A600";
                e.text(o[r], 50, l).css({
                    color: h,
                    "text-anchor": "end"
                }).add(s), e.text(a.toFixed(2) + "%", i + n + 5, l).css({
                    color: h
                }).add(s)
            });
            var r = t.yAxis[1].labelGroup.element.children || [];
            $.each(r, function(t) {
                var o = r[t].attributes.y.value;
                e.text(r[t].innerHTML, i + n + 5, o).add(s)
            })
        },
        calculateValueYPixelOfMinuteChart: function(t, e) {
            var i = 200,
                n = t.yAxis[0],
                s = n.min,
                o = n.max,
                r = t.plotTop;
            return (o - e) * i / (o - s) + r
        },
        valueChangePercent: function(t) {
            t = HighStockExt.invertValueString(t).toFixed(HighStockExt.minute_round_digit);
            var e = this.minute_chart_compare_value;
            return 0 == e ? 0 : 100 * (t - e) / e
        },
        invertValueString: function(t) {
            var e = parseFloat(t);
            return /.*k$/.test(t) ? 1e3 * e : e
        },
        setKlineVolumeColor: function() {
            var t = Highcharts.seriesTypes.column.prototype.drawPoints;
            Highcharts.seriesTypes.column.prototype.drawPoints = function() {
                for (var e = Highcharts.merge, i = this, n = this.chart, s = i.points, o = s.length; o--;) {
                    var r = n.series[0].points[o];
                    if (void 0 != r && 1 == r.kline) {
                        var a = r.open < r.close ? "#e4462e" : "#4daf7b",
                            l = e(i.pointAttr);
                        l[""].fill = a, l.hover.fill = Highcharts.Color(a).brighten(.1).get(), l.select.fill = a, s[o].pointAttr = l
                    }
                }
                t.call(this)
            }
        },
        calTickPositions: function(t, e) {
            var i, n, s, o, r = [];
            i = Math.min(this.minute_chart_compare_value, t), n = Math.max(this.minute_chart_compare_value, e), o = this.adjustPositionIncrement(n, i), s = this.adjustMinuteCompareValue(o);
            for (var a = AccMath.sub(s, o); a + o > i; a = AccMath.sub(a, o)) r.push(a);
            for (var a = s; n >= a - o; a = AccMath.add(a, o)) r.push(a);
            return s == r.sort(function(t, e) {
                return t - e
            })[r.length - 1] && r.push(AccMath.add(s, o)), r.sort(function(t, e) {
                return t - e
            })
        },
        adjustPositionIncrement: function(t, e) {
            var i, n, s = [1, 2, 2.5, 5, 10],
                o = (t - e) / 4;
            if (o >= 1) i = o.toString().split(".")[0].length - 1, n = Math.pow(10, i);
            else {
                var r = o.toString().split(".")[1];
                i = r.length - parseInt(r).toString().length + 1, n = Math.pow(.1, i)
            }
            for (index in s) {
                var a = (s[index] * n).round(i + 1);
                if (a >= o) {
                    o = a;
                    break
                }
            }
            return o
        },
        adjustMinuteCompareValue: function(t) {
            var e = t >= .1 ? 2 : 3;
            return this.minute_round_digit = e, this.minute_chart_compare_value = this.minute_chart_compare_value.round(e), this.minute_chart_compare_value
        }
    };
! function() {
    function t(t, e) {
        var i;
        t || (t = {});
        for (i in e) t[i] = e[i];
        return t
    }

    function e() {
        var t, e, i = arguments,
            n = {},
            s = function(t, e) {
                var i, n;
                "object" != typeof t && (t = {});
                for (n in e) e.hasOwnProperty(n) && (i = e[n], t[n] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== n && "number" != typeof i.nodeType ? s(t[n] || {}, i) : e[n]);
                return t
            };
        for (i[0] === !0 && (n = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; e > t; t++) n = s(n, i[t]);
        return n
    }

    function i(t, e) {
        return parseInt(t, e || 10)
    }

    function n(t) {
        return "string" == typeof t
    }

    function s(t) {
        return t && "object" == typeof t
    }

    function o(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }

    function r(t) {
        return "number" == typeof t
    }

    function a(t) {
        return ce.log(t) / ce.LN10
    }

    function l(t) {
        return ce.pow(10, t)
    }

    function h(t, e) {
        for (var i = t.length; i--;)
            if (t[i] === e) {
                t.splice(i, 1);
                break
            }
    }

    function c(t) {
        return t !== E && null !== t
    }

    function d(t, e, i) {
        var o, r;
        if (n(e)) c(i) ? t.setAttribute(e, i) : t && t.getAttribute && (r = t.getAttribute(e));
        else if (c(e) && s(e))
            for (o in e) t.setAttribute(o, e[o]);
        return r
    }

    function p(t) {
        return o(t) ? t : [t]
    }

    function u() {
        var t, e, i = arguments,
            n = i.length;
        for (t = 0; n > t; t++)
            if (e = i[t], e !== E && null !== e) return e
    }

    function g(e, i) {
        Se && !Le && i && i.opacity !== E && (i.filter = "alpha(opacity=" + 100 * i.opacity + ")"), t(e.style, i)
    }

    function f(e, i, n, s, o) {
        return e = le.createElement(e), i && t(e, i), o && g(e, {
            padding: 0,
            border: Ee,
            margin: 0
        }), n && g(e, n), s && s.appendChild(e), e
    }

    function m(e, i) {
        var n = function() {
            return E
        };
        return n.prototype = new e, t(n.prototype, i), n
    }

    function x(t, e, n, s) {
        var o = Y.lang,
            t = +t || 0,
            r = -1 === e ? (t.toString().split(".")[1] || "").length : isNaN(e = me(e)) ? 2 : e,
            e = void 0 === n ? o.decimalPoint : n,
            s = void 0 === s ? o.thousandsSep : s,
            o = 0 > t ? "-" : "",
            n = String(i(t = me(t).toFixed(r))),
            a = n.length > 3 ? n.length % 3 : 0;
        return o + (a ? n.substr(0, a) + s : "") + n.substr(a).replace(/(\d{3})(?=\d)/g, "$1" + s) + (r ? e + me(t - n).toFixed(r).slice(2) : "")
    }

    function y(t, e) {
        return Array((e || 2) + 1 - String(t).length).join(0) + t
    }

    function v(t, e, i) {
        var n = t[e];
        t[e] = function() {
            var t = Array.prototype.slice.call(arguments);
            return t.unshift(n), i.apply(this, t)
        }
    }

    function b(t, e) {
        for (var i, n, s, o, r, a = "{", l = !1, h = []; - 1 !== (a = t.indexOf(a));) {
            if (i = t.slice(0, a), l) {
                for (n = i.split(":"), s = n.shift().split("."), r = s.length, i = e, o = 0; r > o; o++) i = i[s[o]];
                n.length && (n = n.join(":"), s = /\.([0-9])/, o = Y.lang, r = void 0, /f$/.test(n) ? (r = (r = n.match(s)) ? r[1] : -1, null !== i && (i = x(i, r, o.decimalPoint, n.indexOf(",") > -1 ? o.thousandsSep : ""))) : i = F(n, i))
            }
            h.push(i), t = t.slice(a + 1), a = (l = !l) ? "}" : "{"
        }
        return h.push(t), h.join("")
    }

    function k(t) {
        return ce.pow(10, pe(ce.log(t) / ce.LN10))
    }

    function w(t, e, i, n) {
        var s, i = u(i, 1);
        for (s = t / i, e || (e = [1, 2, 2.5, 5, 10], n && n.allowDecimals === !1 && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))), n = 0; n < e.length && (t = e[n], !(s <= (e[n] + (e[n + 1] || e[n])) / 2)); n++);
        return t *= i
    }

    function S(t, e) {
        var i, n, s = t.length;
        for (n = 0; s > n; n++) t[n].ss_i = n;
        for (t.sort(function(t, n) {
                return i = e(t, n), 0 === i ? t.ss_i - n.ss_i : i
            }), n = 0; s > n; n++) delete t[n].ss_i
    }

    function C(t) {
        for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
        return i
    }

    function A(t) {
        for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
        return i
    }

    function T(t, e) {
        for (var i in t) t[i] && t[i] !== e && t[i].destroy && t[i].destroy(), delete t[i]
    }

    function M(t) {
        G || (G = f(Re)), t && G.appendChild(t), G.innerHTML = ""
    }

    function P(t) {
        return parseFloat(t.toPrecision(14))
    }

    function L(t, e) {
        N = u(t, e.animation)
    }

    function I() {
        var t = Y.global.useUTC,
            e = t ? "getUTC" : "get",
            i = t ? "setUTC" : "set";
        Z = 6e4 * (t && Y.global.timezoneOffset || 0), U = t ? Date.UTC : function(t, e, i, n, s, o) {
            return new Date(t, e, u(i, 1), u(n, 0), u(s, 0), u(o, 0)).getTime()
        }, K = e + "Minutes", q = e + "Hours", J = e + "Day", Q = e + "Date", te = e + "Month", ee = e + "FullYear", ie = i + "Minutes", ne = i + "Hours", se = i + "Date", oe = i + "Month", re = i + "FullYear"
    }

    function D() {}

    function B(t, e, i, n) {
        this.axis = t, this.pos = e, this.type = i || "", this.isNew = !0, !i && !n && this.addLabel()
    }

    function O() {
        this.init.apply(this, arguments)
    }

    function z() {
        this.init.apply(this, arguments)
    }

    function H(t, e, i, n, s) {
        var o = t.chart.inverted;
        this.axis = t, this.isNegative = i, this.options = e, this.x = n, this.total = null, this.points = {}, this.stack = s, this.alignOptions = {
            align: e.align || (o ? i ? "left" : "right" : "center"),
            verticalAlign: e.verticalAlign || (o ? "middle" : i ? "bottom" : "top"),
            y: u(e.y, o ? 4 : i ? 14 : -6),
            x: u(e.x, o ? i ? -6 : 6 : 0)
        }, this.textAlign = e.textAlign || (o ? i ? "right" : "left" : "center")
    }

    function _(t) {
        var e = t.options,
            i = e.navigator,
            n = i.enabled,
            e = e.scrollbar,
            s = e.enabled,
            o = n ? i.height : 0,
            r = s ? e.height : 0;
        this.handles = [], this.scrollbarButtons = [], this.elementsToDestroy = [], this.chart = t, this.setBaseSeries(), this.height = o, this.scrollbarHeight = r, this.scrollbarEnabled = s, this.navigatorEnabled = n, this.navigatorOptions = i, this.scrollbarOptions = e, this.outlineHeight = o + r, this.init()
    }

    function R(t) {
        this.init(t)
    }
    var E, W, X, G, Y, F, N, V, j, $, U, Z, K, q, J, Q, te, ee, ie, ne, se, oe, re, ae, le = document,
        he = window,
        ce = Math,
        de = ce.round,
        pe = ce.floor,
        ue = ce.ceil,
        ge = ce.max,
        fe = ce.min,
        me = ce.abs,
        xe = ce.cos,
        ye = ce.sin,
        ve = ce.PI,
        be = 2 * ve / 360,
        ke = navigator.userAgent,
        we = he.opera,
        Se = /msie/i.test(ke) && !we,
        Ce = 8 === le.documentMode,
        Ae = /AppleWebKit/.test(ke),
        Te = /Firefox/.test(ke),
        Me = /(Mobile|Android|Windows Phone)/.test(ke),
        Pe = "http://www.w3.org/2000/svg",
        Le = !!le.createElementNS && !!le.createElementNS(Pe, "svg").createSVGRect,
        Ie = Te && parseInt(ke.split("Firefox/")[1], 10) < 4,
        De = !Le && !Se && !!le.createElement("canvas").getContext,
        Be = {},
        Oe = 0,
        ze = function() {
            return E
        },
        He = [],
        _e = 0,
        Re = "div",
        Ee = "none",
        We = /^[0-9]+$/,
        Xe = "stroke-width",
        Ge = {};
    he.Highcharts ? $(16, !0) : ae = he.Highcharts = {}, F = function(e, i, n) {
            if (!c(i) || isNaN(i)) return "Invalid date";
            var s, e = u(e, "%Y-%m-%d %H:%M:%S"),
                o = new Date(i - Z),
                r = o[q](),
                a = o[J](),
                l = o[Q](),
                h = o[te](),
                d = o[ee](),
                p = Y.lang,
                g = p.weekdays,
                o = t({
                    a: g[a].substr(0, 3),
                    A: g[a],
                    d: y(l),
                    e: l,
                    b: p.shortMonths[h],
                    B: p.months[h],
                    m: y(h + 1),
                    y: d.toString().substr(2, 2),
                    Y: d,
                    H: y(r),
                    I: y(r % 12 || 12),
                    l: r % 12 || 12,
                    M: y(o[K]()),
                    p: 12 > r ? "AM" : "PM",
                    P: 12 > r ? "am" : "pm",
                    S: y(o.getSeconds()),
                    L: y(de(i % 1e3), 3)
                }, ae.dateFormats);
            for (s in o)
                for (; - 1 !== e.indexOf("%" + s);) e = e.replace("%" + s, "function" == typeof o[s] ? o[s](i) : o[s]);
            return n ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
        }, $ = function(t, e) {
            var i = "Highcharts error #" + t + ": www.highcharts.com/errors/" + t;
            if (e) throw i;
            he.console && console.log(i)
        }, j = {
            millisecond: 1,
            second: 1e3,
            minute: 6e4,
            hour: 36e5,
            day: 864e5,
            week: 6048e5,
            month: 26784e5,
            year: 31556952e3
        }, V = {
            init: function(t, e, i) {
                var n, s, o, e = e || "",
                    r = t.shift,
                    a = e.indexOf("C") > -1,
                    l = a ? 7 : 3,
                    e = e.split(" "),
                    i = [].concat(i),
                    h = function(t) {
                        for (n = t.length; n--;) "M" === t[n] && t.splice(n + 1, 0, t[n + 1], t[n + 2], t[n + 1], t[n + 2])
                    };
                if (a && (h(e), h(i)), t.isArea && (s = e.splice(e.length - 6, 6), o = i.splice(i.length - 6, 6)), r <= i.length / l && e.length === i.length)
                    for (; r--;) i = [].concat(i).splice(0, l).concat(i);
                if (t.shift = 0, e.length)
                    for (t = i.length; e.length < t;) r = [].concat(e).splice(e.length - l, l), a && (r[l - 6] = r[l - 2], r[l - 5] = r[l - 1]), e = e.concat(r);
                return s && (e = e.concat(s), i = i.concat(o)), [e, i]
            },
            step: function(t, e, i, n) {
                var s = [],
                    o = t.length;
                if (1 === i) s = n;
                else if (o === e.length && 1 > i)
                    for (; o--;) n = parseFloat(t[o]), s[o] = isNaN(n) ? t[o] : i * parseFloat(e[o] - n) + n;
                else s = e;
                return s
            }
        },
        function(e) {
            he.HighchartsAdapter = he.HighchartsAdapter || e && {
                init: function(t) {
                    var i, s = e.fx,
                        o = s.step,
                        r = e.Tween,
                        a = r && r.propHooks;
                    i = e.cssHooks.opacity, e.extend(e.easing, {
                        easeOutQuad: function(t, e, i, n, s) {
                            return -n * (e /= s) * (e - 2) + i
                        }
                    }), e.each(["cur", "_default", "width", "height", "opacity"], function(t, e) {
                        var i, n = o;
                        "cur" === e ? n = s.prototype : "_default" === e && r && (n = a[e], e = "set"), (i = n[e]) && (n[e] = function(n) {
                            var s, n = t ? n : this;
                            return "align" !== n.prop ? (s = n.elem, s.attr ? s.attr(n.prop, "cur" === e ? E : n.now) : i.apply(this, arguments)) : void 0
                        })
                    }), v(i, "get", function(t, e, i) {
                        return e.attr ? e.opacity || 0 : t.call(this, e, i)
                    }), i = function(e) {
                        var i, n = e.elem;
                        e.started || (i = t.init(n, n.d, n.toD), e.start = i[0], e.end = i[1], e.started = !0), n.attr("d", t.step(e.start, e.end, e.pos, n.toD))
                    }, r ? a.d = {
                        set: i
                    } : o.d = i, this.each = Array.prototype.forEach ? function(t, e) {
                        return Array.prototype.forEach.call(t, e)
                    } : function(t, e) {
                        var i, n = t.length;
                        for (i = 0; n > i; i++)
                            if (e.call(t[i], t[i], i, t) === !1) return i
                    }, e.fn.highcharts = function() {
                        var t, e, i = "Chart",
                            s = arguments;
                        return this[0] && (n(s[0]) && (i = s[0], s = Array.prototype.slice.call(s, 1)), t = s[0], t !== E && (t.chart = t.chart || {}, t.chart.renderTo = this[0], new ae[i](t, s[1]), e = this), t === E && (e = He[d(this[0], "data-highcharts-chart")])), e
                    }
                },
                getScript: e.getScript,
                inArray: e.inArray,
                adapterRun: function(t, i) {
                    return e(t)[i]()
                },
                grep: e.grep,
                map: function(t, e) {
                    for (var i = [], n = 0, s = t.length; s > n; n++) i[n] = e.call(t[n], t[n], n, t);
                    return i
                },
                offset: function(t) {
                    return e(t).offset()
                },
                addEvent: function(t, i, n) {
                    e(t).bind(i, n)
                },
                removeEvent: function(t, i, n) {
                    var s = le.removeEventListener ? "removeEventListener" : "detachEvent";
                    le[s] && t && !t[s] && (t[s] = function() {}), e(t).unbind(i, n)
                },
                fireEvent: function(i, n, s, o) {
                    var r, a = e.Event(n),
                        l = "detached" + n;
                    !Se && s && (delete s.layerX, delete s.layerY, delete s.returnValue), t(a, s), i[n] && (i[l] = i[n], i[n] = null), e.each(["preventDefault", "stopPropagation"], function(t, e) {
                        var i = a[e];
                        a[e] = function() {
                            try {
                                i.call(a)
                            } catch (t) {
                                "preventDefault" === e && (r = !0)
                            }
                        }
                    }), e(i).trigger(a), i[l] && (i[n] = i[l], i[l] = null), o && !a.isDefaultPrevented() && !r && o(a)
                },
                washMouseEvent: function(t) {
                    var e = t.originalEvent || t;
                    return e.pageX === E && (e.pageX = t.pageX, e.pageY = t.pageY), e
                },
                animate: function(t, i, n) {
                    var s = e(t);
                    t.style || (t.style = {}), i.d && (t.toD = i.d, i.d = 1), s.stop(), i.opacity !== E && t.attr && (i.opacity += "px"), s.animate(i, n)
                },
                stop: function(t) {
                    e(t).stop()
                }
            }
        }(he.jQuery);
    var Ye = he.HighchartsAdapter,
        Fe = Ye || {};
    Ye && Ye.init.call(Ye, V);
    var Ne = Fe.adapterRun,
        Ve = Fe.getScript,
        je = Fe.inArray,
        $e = Fe.each,
        Ue = Fe.grep,
        Ze = Fe.offset,
        Ke = Fe.map,
        qe = Fe.addEvent,
        Je = Fe.removeEvent,
        Qe = Fe.fireEvent,
        ti = Fe.washMouseEvent,
        ei = Fe.animate,
        ii = Fe.stop,
        Fe = {
            enabled: !0,
            x: 0,
            y: 15,
            style: {
                color: "#606060",
                cursor: "default",
                fontSize: "11px"
            }
        };
    Y = {
        colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
        symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
        lang: {
            loading: "Loading...",
            months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
            shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
            weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
            decimalPoint: ".",
            numericSymbols: "k,M,G,T,P,E".split(","),
            resetZoom: "Reset zoom",
            resetZoomTitle: "Reset zoom level 1:1",
            thousandsSep: ","
        },
        global: {
            useUTC: !0,
            canvasToolsURL: "http://code.highcharts.com/stock/2.0.3/modules/canvas-tools.js",
            VMLRadialGradientURL: "http://code.highcharts.com/stock/2.0.3/gfx/vml-radial-gradient.png"
        },
        chart: {
            borderColor: "#4572A7",
            borderRadius: 0,
            defaultSeriesType: "line",
            ignoreHiddenSeries: !0,
            spacing: [10, 10, 15, 10],
            backgroundColor: "#FFFFFF",
            plotBorderColor: "#C0C0C0",
            resetZoomButton: {
                theme: {
                    zIndex: 20
                },
                position: {
                    align: "right",
                    x: -10,
                    y: 10
                }
            }
        },
        title: {
            text: "Chart title",
            align: "center",
            margin: 15,
            style: {
                color: "#333333",
                fontSize: "18px"
            }
        },
        subtitle: {
            text: "",
            align: "center",
            style: {
                color: "#555555"
            }
        },
        plotOptions: {
            line: {
                allowPointSelect: !1,
                showCheckbox: !1,
                animation: {
                    duration: 1e3
                },
                events: {},
                lineWidth: 2,
                marker: {
                    lineWidth: 0,
                    radius: 4,
                    lineColor: "#FFFFFF",
                    states: {
                        hover: {
                            enabled: !0,
                            lineWidthPlus: 1,
                            radiusPlus: 2
                        },
                        select: {
                            fillColor: "#FFFFFF",
                            lineColor: "#000000",
                            lineWidth: 2
                        }
                    }
                },
                point: {
                    events: {}
                },
                dataLabels: e(Fe, {
                    align: "center",
                    enabled: !1,
                    formatter: function() {
                        return null === this.y ? "" : x(this.y, -1)
                    },
                    verticalAlign: "bottom",
                    y: 0
                }),
                cropThreshold: 300,
                pointRange: 0,
                states: {
                    hover: {
                        lineWidthPlus: 1,
                        marker: {},
                        halo: {
                            size: 10,
                            opacity: .25
                        }
                    },
                    select: {
                        marker: {}
                    }
                },
                stickyTracking: !0,
                turboThreshold: 1e3
            }
        },
        labels: {
            style: {
                position: "absolute",
                color: "#3E576F"
            }
        },
        legend: {
            enabled: !0,
            align: "center",
            layout: "horizontal",
            labelFormatter: function() {
                return this.name
            },
            borderColor: "#909090",
            borderRadius: 0,
            navigation: {
                activeColor: "#274b6d",
                inactiveColor: "#CCC"
            },
            shadow: !1,
            itemStyle: {
                color: "#333333",
                fontSize: "12px",
                fontWeight: "bold"
            },
            itemHoverStyle: {
                color: "#000"
            },
            itemHiddenStyle: {
                color: "#CCC"
            },
            itemCheckboxStyle: {
                position: "absolute",
                width: "13px",
                height: "13px"
            },
            symbolPadding: 5,
            verticalAlign: "bottom",
            x: 0,
            y: 0,
            title: {
                style: {
                    fontWeight: "bold"
                }
            }
        },
        loading: {
            labelStyle: {
                fontWeight: "bold",
                position: "relative",
                top: "45%"
            },
            style: {
                position: "absolute",
                backgroundColor: "white",
                opacity: .5,
                textAlign: "center"
            }
        },
        tooltip: {
            enabled: !0,
            animation: Le,
            backgroundColor: "rgba(249, 249, 249, .85)",
            borderWidth: 1,
            borderRadius: 3,
            dateTimeLabelFormats: {
                millisecond: "%A, %b %e, %H:%M:%S.%L",
                second: "%A, %b %e, %H:%M:%S",
                minute: "%A, %b %e, %H:%M",
                hour: "%A, %b %e, %H:%M",
                day: "%A, %b %e, %Y",
                week: "Week from %A, %b %e, %Y",
                month: "%B %Y",
                year: "%Y"
            },
            headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
            pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
            shadow: !0,
            snap: Me ? 25 : 10,
            style: {
                color: "#333333",
                cursor: "default",
                fontSize: "12px",
                padding: "8px",
                whiteSpace: "nowrap"
            }
        },
        credits: {
            enabled: !0,
            text: "Highcharts.com",
            href: "http://www.highcharts.com",
            position: {
                align: "right",
                x: -10,
                verticalAlign: "bottom",
                y: -5
            },
            style: {
                cursor: "pointer",
                color: "#909090",
                fontSize: "9px"
            }
        }
    };
    var ni = Y.plotOptions,
        Ye = ni.line;
    I();
    var si = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
        oi = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
        ri = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
        ai = function(t) {
            var n, s, o = [];
            return function(t) {
                t && t.stops ? s = Ke(t.stops, function(t) {
                    return ai(t[1])
                }) : (n = si.exec(t)) ? o = [i(n[1]), i(n[2]), i(n[3]), parseFloat(n[4], 10)] : (n = oi.exec(t)) ? o = [i(n[1], 16), i(n[2], 16), i(n[3], 16), 1] : (n = ri.exec(t)) && (o = [i(n[1]), i(n[2]), i(n[3]), 1])
            }(t), {
                get: function(i) {
                    var n;
                    return s ? (n = e(t), n.stops = [].concat(n.stops), $e(s, function(t, e) {
                        n.stops[e] = [n.stops[e][0], t.get(i)]
                    })) : n = o && !isNaN(o[0]) ? "rgb" === i ? "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")" : "a" === i ? o[3] : "rgba(" + o.join(",") + ")" : t, n
                },
                brighten: function(t) {
                    if (s) $e(s, function(e) {
                        e.brighten(t)
                    });
                    else if (r(t) && 0 !== t) {
                        var e;
                        for (e = 0; 3 > e; e++) o[e] += i(255 * t), o[e] < 0 && (o[e] = 0), o[e] > 255 && (o[e] = 255)
                    }
                    return this
                },
                rgba: o,
                setOpacity: function(t) {
                    return o[3] = t, this
                }
            }
        };
    D.prototype = {
        opacity: 1,
        textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
        init: function(t, e) {
            this.element = "span" === e ? f(e) : le.createElementNS(Pe, e), this.renderer = t
        },
        animate: function(t, i, n) {
            return i = u(i, N, !0), ii(this), i ? (i = e(i, {}), n && (i.complete = n), ei(this, t, i)) : (this.attr(t), n && n()), this
        },
        colorGradient: function(t, i, n) {
            var s, r, a, l, h, d, p, u, g, f, m = this.renderer,
                x = [];
            if (t.linearGradient ? r = "linearGradient" : t.radialGradient && (r = "radialGradient"), r) {
                a = t[r], l = m.gradients, d = t.stops, g = n.radialReference, o(a) && (t[r] = a = {
                    x1: a[0],
                    y1: a[1],
                    x2: a[2],
                    y2: a[3],
                    gradientUnits: "userSpaceOnUse"
                }), "radialGradient" === r && g && !c(a.gradientUnits) && (a = e(a, {
                    cx: g[0] - g[2] / 2 + a.cx * g[2],
                    cy: g[1] - g[2] / 2 + a.cy * g[2],
                    r: a.r * g[2],
                    gradientUnits: "userSpaceOnUse"
                }));
                for (f in a) "id" !== f && x.push(f, a[f]);
                for (f in d) x.push(d[f]);
                x = x.join(","), l[x] ? t = l[x].attr("id") : (a.id = t = "highcharts-" + Oe++, l[x] = h = m.createElement(r).attr(a).add(m.defs), h.stops = [], $e(d, function(t) {
                    0 === t[1].indexOf("rgba") ? (s = ai(t[1]), p = s.get("rgb"), u = s.get("a")) : (p = t[1], u = 1), t = m.createElement("stop").attr({
                        offset: t[0],
                        "stop-color": p,
                        "stop-opacity": u
                    }).add(h), h.stops.push(t)
                })), n.setAttribute(i, "url(" + m.url + "#" + t + ")")
            }
        },
        attr: function(t, e) {
            var i, n, s, o, r = this.element,
                a = this;
            if ("string" == typeof t && e !== E && (i = t, t = {}, t[i] = e), "string" == typeof t) a = (this[t + "Getter"] || this._defaultGetter).call(this, t, r);
            else {
                for (i in t) n = t[i], o = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(i) && (s || (this.symbolAttr(t), s = !0), o = !0), !this.rotation || "x" !== i && "y" !== i || (this.doTransform = !0), o || (this[i + "Setter"] || this._defaultSetter).call(this, n, i, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(i) && this.updateShadows(i, n);
                this.doTransform && (this.updateTransform(), this.doTransform = !1)
            }
            return a
        },
        updateShadows: function(t, e) {
            for (var i = this.shadows, n = i.length; n--;) i[n].setAttribute(t, "height" === t ? ge(e - (i[n].cutHeight || 0), 0) : "d" === t ? this.d : e)
        },
        addClass: function(t) {
            var e = this.element,
                i = d(e, "class") || "";
            return -1 === i.indexOf(t) && d(e, "class", i + " " + t), this
        },
        symbolAttr: function(t) {
            var e = this;
            $e("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(i) {
                e[i] = u(t[i], e[i])
            }), e.attr({
                d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
            })
        },
        clip: function(t) {
            return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : Ee)
        },
        crisp: function(t) {
            var e, i, n = {},
                s = t.strokeWidth || this.strokeWidth || 0;
            i = de(s) % 2 / 2, t.x = pe(t.x || this.x || 0) + i, t.y = pe(t.y || this.y || 0) + i, t.width = pe((t.width || this.width || 0) - 2 * i), t.height = pe((t.height || this.height || 0) - 2 * i), t.strokeWidth = s;
            for (e in t) this[e] !== t[e] && (this[e] = n[e] = t[e]);
            return n
        },
        css: function(e) {
            var n, s, o = this.styles,
                r = {},
                a = this.element,
                l = "";
            if (n = !o, e && e.color && (e.fill = e.color), o)
                for (s in e) e[s] !== o[s] && (r[s] = e[s], n = !0);
            if (n) {
                if (n = this.textWidth = e && e.width && "text" === a.nodeName.toLowerCase() && i(e.width), o && (e = t(o, r)), this.styles = e, n && (De || !Le && this.renderer.forExport) && delete e.width, Se && !Le) g(this.element, e);
                else {
                    o = function(t, e) {
                        return "-" + e.toLowerCase()
                    };
                    for (s in e) l += s.replace(/([A-Z])/g, o) + ":" + e[s] + ";";
                    d(a, "style", l)
                }
                n && this.added && this.renderer.buildText(this)
            }
            return this
        },
        on: function(t, e) {
            var i = this,
                n = i.element;
            return X && "click" === t ? (n.ontouchstart = function(t) {
                i.touchEventFired = Date.now(), t.preventDefault(), e.call(n, t)
            }, n.onclick = function(t) {
                (-1 === ke.indexOf("Android") || Date.now() - (i.touchEventFired || 0) > 1100) && e.call(n, t)
            }) : n["on" + t] = e, this
        },
        setRadialReference: function(t) {
            return this.element.radialReference = t, this
        },
        translate: function(t, e) {
            return this.attr({
                translateX: t,
                translateY: e
            })
        },
        invert: function() {
            return this.inverted = !0, this.updateTransform(), this
        },
        updateTransform: function() {
            var t = this.translateX || 0,
                e = this.translateY || 0,
                i = this.scaleX,
                n = this.scaleY,
                s = this.inverted,
                o = this.rotation,
                r = this.element;
            s && (t += this.attr("width"), e += this.attr("height")), t = ["translate(" + t + "," + e + ")"], s ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"), (c(i) || c(n)) && t.push("scale(" + u(i, 1) + " " + u(n, 1) + ")"), t.length && r.setAttribute("transform", t.join(" "))
        },
        toFront: function() {
            var t = this.element;
            return t.parentNode.appendChild(t), this
        },
        align: function(t, e, i) {
            var s, o, r, a, l = {};
            return o = this.renderer, r = o.alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || n(i)) && (this.alignTo = s = i || "renderer", h(r, this), r.push(this), i = null)) : (t = this.alignOptions, e = this.alignByTranslate, s = this.alignTo), i = u(i, o[s], o), s = t.align, o = t.verticalAlign, r = (i.x || 0) + (t.x || 0), a = (i.y || 0) + (t.y || 0), ("right" === s || "center" === s) && (r += (i.width - (t.width || 0)) / {
                right: 1,
                center: 2
            }[s]), l[e ? "translateX" : "x"] = de(r), ("bottom" === o || "middle" === o) && (a += (i.height - (t.height || 0)) / ({
                bottom: 1,
                middle: 2
            }[o] || 1)), l[e ? "translateY" : "y"] = de(a), this[this.placed ? "animate" : "attr"](l), this.placed = !0, this.alignAttr = l, this
        },
        getBBox: function() {
            var e, i, n = this.bBox,
                s = this.renderer,
                o = this.rotation;
            e = this.element;
            var r = this.styles,
                a = o * be;
            i = this.textStr;
            var l;
            if (("" === i || We.test(i)) && (l = "num." + i.toString().length + (r ? "|" + r.fontSize + "|" + r.fontFamily : "")), l && (n = s.cache[l]), !n) {
                if (e.namespaceURI === Pe || s.forExport) {
                    try {
                        n = e.getBBox ? t({}, e.getBBox()) : {
                            width: e.offsetWidth,
                            height: e.offsetHeight
                        }
                    } catch (h) {}(!n || n.width < 0) && (n = {
                        width: 0,
                        height: 0
                    })
                } else n = this.htmlGetBBox();
                s.isSVG && (e = n.width, i = n.height, Se && r && "11px" === r.fontSize && "16.9" === i.toPrecision(3) && (n.height = i = 14), o && (n.width = me(i * ye(a)) + me(e * xe(a)), n.height = me(i * xe(a)) + me(e * ye(a)))), this.bBox = n, l && (s.cache[l] = n)
            }
            return n
        },
        show: function(t) {
            return t && this.element.namespaceURI === Pe ? (this.element.removeAttribute("visibility"), this) : this.attr({
                visibility: t ? "inherit" : "visible"
            })
        },
        hide: function() {
            return this.attr({
                visibility: "hidden"
            })
        },
        fadeOut: function(t) {
            var e = this;
            e.animate({
                opacity: 0
            }, {
                duration: t || 150,
                complete: function() {
                    e.hide()
                }
            })
        },
        add: function(t) {
            var e, n, s = this.renderer,
                o = t || s,
                r = o.element || s.box,
                a = this.element,
                l = this.zIndex;
            if (t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && s.buildText(this), l && (o.handleZ = !0, l = i(l)), o.handleZ)
                for (t = r.childNodes, e = 0; e < t.length; e++)
                    if (s = t[e], o = d(s, "zIndex"), s !== a && (i(o) > l || !c(l) && c(o))) {
                        r.insertBefore(a, s), n = !0;
                        break
                    }
            return n || r.appendChild(a), this.added = !0, this.onAdd && this.onAdd(), this
        },
        safeRemoveChild: function(t) {
            var e = t.parentNode;
            e && e.removeChild(t)
        },
        destroy: function() {
            var t, e, i = this,
                n = i.element || {},
                s = i.shadows,
                o = i.renderer.isSVG && "SPAN" === n.nodeName && i.parentGroup;
            if (n.onclick = n.onmouseout = n.onmouseover = n.onmousemove = n.point = null, ii(i), i.clipPath && (i.clipPath = i.clipPath.destroy()), i.stops) {
                for (e = 0; e < i.stops.length; e++) i.stops[e] = i.stops[e].destroy();
                i.stops = null
            }
            for (i.safeRemoveChild(n), s && $e(s, function(t) {
                    i.safeRemoveChild(t)
                }); o && o.div && 0 === o.div.childNodes.length;) n = o.parentGroup, i.safeRemoveChild(o.div), delete o.div, o = n;
            i.alignTo && h(i.renderer.alignedObjects, i);
            for (t in i) delete i[t];
            return null
        },
        shadow: function(t, e, i) {
            var n, s, o, r, a, l, h = [],
                c = this.element;
            if (t) {
                for (r = u(t.width, 3), a = (t.opacity || .15) / r, l = this.parentInverted ? "(-1,-1)" : "(" + u(t.offsetX, 1) + ", " + u(t.offsetY, 1) + ")", n = 1; r >= n; n++) s = c.cloneNode(0), o = 2 * r + 1 - 2 * n, d(s, {
                    isShadow: "true",
                    stroke: t.color || "black",
                    "stroke-opacity": a * n,
                    "stroke-width": o,
                    transform: "translate" + l,
                    fill: Ee
                }), i && (d(s, "height", ge(d(s, "height") - o, 0)), s.cutHeight = o), e ? e.element.appendChild(s) : c.parentNode.insertBefore(s, c), h.push(s);
                this.shadows = h
            }
            return this
        },
        xGetter: function(t) {
            return "circle" === this.element.nodeName && (t = {
                x: "cx",
                y: "cy"
            }[t] || t), this._defaultGetter(t)
        },
        _defaultGetter: function(t) {
            return t = u(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
        },
        dSetter: function(t, e, i) {
            t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), i.setAttribute(e, t), this[e] = t
        },
        dashstyleSetter: function(t) {
            var e;
            if (t = t && t.toLowerCase()) {
                for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").replace("solid", 1).split(","), e = t.length; e--;) t[e] = i(t[e]) * this["stroke-width"];
                t = t.join(","), this.element.setAttribute("stroke-dasharray", t)
            }
        },
        alignSetter: function(t) {
            this.element.setAttribute("text-anchor", {
                left: "start",
                center: "middle",
                right: "end"
            }[t])
        },
        opacitySetter: function(t, e, i) {
            this[e] = t, i.setAttribute(e, t)
        },
        titleSetter: function(t) {
            var e = this.element.getElementsByTagName("title")[0];
            e || (e = le.createElementNS(Pe, "title"), this.element.appendChild(e)), e.textContent = t
        },
        textSetter: function(t) {
            t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
        },
        fillSetter: function(t, e, i) {
            "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
        },
        zIndexSetter: function(t, e, i) {
            i.setAttribute(e, t), this[e] = t
        },
        _defaultSetter: function(t, e, i) {
            i.setAttribute(e, t)
        }
    }, D.prototype.yGetter = D.prototype.xGetter, D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = function(t, e) {
        this[e] = t, this.doTransform = !0
    }, D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function(t, e, i) {
        this[e] = t, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], D.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"), this.hasStroke = !1)
    };
    var li = function() {
        this.init.apply(this, arguments)
    };
    li.prototype = {
        Element: D,
        init: function(t, e, i, n, s) {
            var o, r = location,
                n = this.createElement("svg").attr({
                    version: "1.1"
                }).css(this.getStyle(n));
            o = n.element, t.appendChild(o), -1 === t.innerHTML.indexOf("xmlns") && d(o, "xmlns", Pe), this.isSVG = !0, this.box = o, this.boxWrapper = n, this.alignedObjects = [], this.url = (Te || Ae) && le.getElementsByTagName("base").length ? r.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(le.createTextNode("Created with Highstock 2.0.3")), this.defs = this.createElement("defs").add(), this.forExport = s, this.gradients = {}, this.cache = {}, this.setSize(e, i, !1);
            var a;
            Te && t.getBoundingClientRect && (this.subPixelFix = e = function() {
                g(t, {
                    left: 0,
                    top: 0
                }), a = t.getBoundingClientRect(), g(t, {
                    left: ue(a.left) - a.left + "px",
                    top: ue(a.top) - a.top + "px"
                })
            }, e(), qe(he, "resize", e))
        },
        getStyle: function(e) {
            return this.style = t({
                fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                fontSize: "12px"
            }, e)
        },
        isHidden: function() {
            return !this.boxWrapper.getBBox().width
        },
        destroy: function() {
            var t = this.defs;
            return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), T(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.subPixelFix && Je(he, "resize", this.subPixelFix), this.alignedObjects = null
        },
        createElement: function(t) {
            var e = new this.Element;
            return e.init(this, t), e
        },
        draw: function() {},
        buildText: function(t) {
            for (var e, n, s = t.element, o = this, r = o.forExport, a = u(t.textStr, "").toString(), l = -1 !== a.indexOf("<"), h = s.childNodes, c = d(s, "x"), p = t.styles, f = t.textWidth, m = p && p.lineHeight, x = p && p.HcTextStroke, y = h.length, v = function(t) {
                    return m ? i(m) : o.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : p && p.fontSize || o.style.fontSize || 12, t).h
                }; y--;) s.removeChild(h[y]);
            l || x || -1 !== a.indexOf(" ") ? (e = /<.*style="([^"]+)".*>/, n = /<.*href="(http[^"]+)".*>/, f && !t.added && this.box.appendChild(s), a = l ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a], "" === a[a.length - 1] && a.pop(), $e(a, function(i, a) {
                var l, h = 0,
                    i = i.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                l = i.split("|||"), $e(l, function(i) {
                    if ("" !== i || 1 === l.length) {
                        var u, m = {},
                            x = le.createElementNS(Pe, "tspan");
                        if (e.test(i) && (u = i.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), d(x, "style", u)), n.test(i) && !r && (d(x, "onclick", 'location.href="' + i.match(n)[1] + '"'), g(x, {
                                cursor: "pointer"
                            })), i = (i.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), " " !== i) {
                            if (x.appendChild(le.createTextNode(i)), h ? m.dx = 0 : a && null !== c && (m.x = c), d(x, m), s.appendChild(x), !h && a && (!Le && r && g(x, {
                                    display: "block"
                                }), d(x, "dy", v(x))), f)
                                for (var y, b, i = i.replace(/([^\^])-/g, "$1- ").split(" "), m = l.length > 1 || i.length > 1 && "nowrap" !== p.whiteSpace, k = p.HcHeight, w = [], S = v(x), C = 1; m && (i.length || w.length);) delete t.bBox, y = t.getBBox(), b = y.width, !Le && o.forExport && (b = o.measureSpanWidth(x.firstChild.data, t.styles)), y = b > f, y && 1 !== i.length ? (x.removeChild(x.firstChild), w.unshift(i.pop())) : (i = w, w = [], i.length && (C++, k && C * S > k ? (i = ["..."], t.attr("title", t.textStr)) : (x = le.createElementNS(Pe, "tspan"), d(x, {
                                    dy: S,
                                    x: c
                                }), u && d(x, "style", u), s.appendChild(x))), b > f && (f = b)), i.length && x.appendChild(le.createTextNode(i.join(" ").replace(/- /g, "-")));
                            h++
                        }
                    }
                })
            })) : s.appendChild(le.createTextNode(a))
        },
        button: function(i, n, s, o, r, a, l, h, c) {
            var d, p, u, g, f, m, x = this.label(i, n, s, c, null, null, null, null, "button"),
                y = 0,
                i = {
                    x1: 0,
                    y1: 0,
                    x2: 0,
                    y2: 1
                },
                r = e({
                    "stroke-width": 1,
                    stroke: "#CCCCCC",
                    fill: {
                        linearGradient: i,
                        stops: [
                            [0, "#FEFEFE"],
                            [1, "#F6F6F6"]
                        ]
                    },
                    r: 2,
                    padding: 5,
                    style: {
                        color: "black"
                    }
                }, r);
            return u = r.style, delete r.style, a = e(r, {
                stroke: "#68A",
                fill: {
                    linearGradient: i,
                    stops: [
                        [0, "#FFF"],
                        [1, "#ACF"]
                    ]
                }
            }, a), g = a.style, delete a.style, l = e(r, {
                stroke: "#68A",
                fill: {
                    linearGradient: i,
                    stops: [
                        [0, "#9BD"],
                        [1, "#CDF"]
                    ]
                }
            }, l), f = l.style, delete l.style, h = e(r, {
                style: {
                    color: "#CCC"
                }
            }, h), m = h.style, delete h.style, qe(x.element, Se ? "mouseover" : "mouseenter", function() {
                3 !== y && x.attr(a).css(g)
            }), qe(x.element, Se ? "mouseout" : "mouseleave", function() {
                3 !== y && (d = [r, a, l][y], p = [u, g, f][y], x.attr(d).css(p))
            }), x.setState = function(t) {
                (x.state = y = t) ? 2 === t ? x.attr(l).css(f) : 3 === t && x.attr(h).css(m): x.attr(r).css(u)
            }, x.on("click", function() {
                3 !== y && o.call(x)
            }).attr(r).css(t({
                cursor: "default"
            }, u))
        },
        crispLine: function(t, e) {
            return t[1] === t[4] && (t[1] = t[4] = de(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = de(t[2]) + e % 2 / 2), t
        },
        path: function(e) {
            var i = {
                fill: Ee
            };
            return o(e) ? i.d = e : s(e) && t(i, e), this.createElement("path").attr(i)
        },
        circle: function(t, e, i) {
            return t = s(t) ? t : {
                x: t,
                y: e,
                r: i
            }, e = this.createElement("circle"), e.xSetter = function(t) {
                this.element.setAttribute("cx", t)
            }, e.ySetter = function(t) {
                this.element.setAttribute("cy", t)
            }, e.attr(t)
        },
        arc: function(t, e, i, n, o, r) {
            return s(t) && (e = t.y, i = t.r, n = t.innerR, o = t.start, r = t.end, t = t.x), t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                innerR: n || 0,
                start: o || 0,
                end: r || 0
            }), t.r = i, t
        },
        rect: function(t, e, i, n, o, r) {
            var o = s(t) ? t.r : o,
                a = this.createElement("rect"),
                t = s(t) ? t : t === E ? {} : {
                    x: t,
                    y: e,
                    width: ge(i, 0),
                    height: ge(n, 0)
                };
            return r !== E && (t.strokeWidth = r, t = a.crisp(t)), o && (t.r = o), a.rSetter = function(t) {
                d(this.element, {
                    rx: t,
                    ry: t
                })
            }, a.attr(t)
        },
        setSize: function(t, e, i) {
            var n = this.alignedObjects,
                s = n.length;
            for (this.width = t, this.height = e, this.boxWrapper[u(i, !0) ? "animate" : "attr"]({
                    width: t,
                    height: e
                }); s--;) n[s].align()
        },
        g: function(t) {
            var e = this.createElement("g");
            return c(t) ? e.attr({
                "class": "highcharts-" + t
            }) : e
        },
        image: function(e, i, n, s, o) {
            var r = {
                preserveAspectRatio: Ee
            };
            return arguments.length > 1 && t(r, {
                x: i,
                y: n,
                width: s,
                height: o
            }), r = this.createElement("image").attr(r), r.element.setAttributeNS ? r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : r.element.setAttribute("hc-svg-href", e), r
        },
        symbol: function(e, i, n, s, o, r) {
            var a, l, h, c = this.symbols[e],
                c = c && c(de(i), de(n), s, o, r),
                d = /^url\((.*?)\)$/;
            return c ? (a = this.path(c), t(a, {
                symbolName: e,
                x: i,
                y: n,
                width: s,
                height: o
            }), r && t(a, r)) : d.test(e) && (h = function(t, e) {
                t.element && (t.attr({
                    width: e[0],
                    height: e[1]
                }), t.alignByTranslate || t.translate(de((s - e[0]) / 2), de((o - e[1]) / 2)))
            }, l = e.match(d)[1], e = Be[l], a = this.image(l).attr({
                x: i,
                y: n
            }), a.isImg = !0, e ? h(a, e) : (a.attr({
                width: 0,
                height: 0
            }), f("img", {
                onload: function() {
                    h(a, Be[l] = [this.width, this.height])
                },
                src: l
            }))), a
        },
        symbols: {
            circle: function(t, e, i, n) {
                var s = .166 * i;
                return ["M", t + i / 2, e, "C", t + i + s, e, t + i + s, e + n, t + i / 2, e + n, "C", t - s, e + n, t - s, e, t + i / 2, e, "Z"]
            },
            square: function(t, e, i, n) {
                return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
            },
            triangle: function(t, e, i, n) {
                return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
            },
            "triangle-down": function(t, e, i, n) {
                return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
            },
            diamond: function(t, e, i, n) {
                return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
            },
            arc: function(t, e, i, n, s) {
                var o = s.start,
                    i = s.r || i || n,
                    r = s.end - .001,
                    n = s.innerR,
                    a = s.open,
                    l = xe(o),
                    h = ye(o),
                    c = xe(r),
                    r = ye(r),
                    s = s.end - o < ve ? 0 : 1;
                return ["M", t + i * l, e + i * h, "A", i, i, 0, s, 1, t + i * c, e + i * r, a ? "M" : "L", t + n * c, e + n * r, "A", n, n, 0, s, 0, t + n * l, e + n * h, a ? "" : "Z"]
            },
            callout: function(t, e, i, n, s) {
                var o = fe(s && s.r || 0, i, n),
                    r = o + 6,
                    a = s && s.anchorX,
                    l = s && s.anchorY,
                    s = de(s.strokeWidth || 0) % 2 / 2;
                return t += s, e += s, s = ["M", t + o, e, "L", t + i - o, e, "C", t + i, e, t + i, e, t + i, e + o, "L", t + i, e + n - o, "C", t + i, e + n, t + i, e + n, t + i - o, e + n, "L", t + o, e + n, "C", t, e + n, t, e + n, t, e + n - o, "L", t, e + o, "C", t, e, t, e, t + o, e], a && a > i && l > e + r && e + n - r > l ? s.splice(13, 3, "L", t + i, l - 6, t + i + 6, l, t + i, l + 6, t + i, e + n - o) : a && 0 > a && l > e + r && e + n - r > l ? s.splice(33, 3, "L", t, l + 6, t - 6, l, t, l - 6, t, e + o) : l && l > n && a > t + r && t + i - r > a ? s.splice(23, 3, "L", a + 6, e + n, a, e + n + 6, a - 6, e + n, t + o, e + n) : l && 0 > l && a > t + r && t + i - r > a && s.splice(3, 3, "L", a - 6, e, a, e - 6, a + 6, e, i - o, e), s
            }
        },
        clipRect: function(t, e, i, n) {
            var s = "highcharts-" + Oe++,
                o = this.createElement("clipPath").attr({
                    id: s
                }).add(this.defs),
                t = this.rect(t, e, i, n, 0).add(o);
            return t.id = s, t.clipPath = o, t
        },
        text: function(t, e, i, n) {
            var s = De || !Le && this.forExport,
                o = {};
            return n && !this.forExport ? this.html(t, e, i) : (o.x = Math.round(e || 0), i && (o.y = Math.round(i)), (t || 0 === t) && (o.text = t), t = this.createElement("text").attr(o), s && t.css({
                position: "absolute"
            }), n || (t.xSetter = function(t, e, i) {
                var n, s, o = i.getElementsByTagName("tspan"),
                    r = i.getAttribute(e);
                for (s = 0; s < o.length; s++) n = o[s], n.getAttribute(e) === r && n.setAttribute(e, t);
                i.setAttribute(e, t)
            }), t)
        },
        fontMetrics: function(t, e) {
            t = t || this.style.fontSize, e && he.getComputedStyle && (e = e.element || e, t = he.getComputedStyle(e, "").fontSize);
            var t = /px/.test(t) ? i(t) : /em/.test(t) ? 12 * parseFloat(t) : 12,
                n = 24 > t ? t + 4 : de(1.2 * t),
                s = de(.8 * n);
            return {
                h: n,
                b: s,
                f: t
            }
        },
        label: function(i, n, s, o, r, a, l, h, d) {
            function p() {
                var e, i;
                e = A.element.style, m = (void 0 === x || void 0 === y || C.styles.textAlign) && A.textStr && A.getBBox(), C.width = (x || m.width || 0) + 2 * M + P, C.height = (y || m.height || 0) + 2 * M, k = M + S.fontMetrics(e && e.fontSize, A).b, w && (f || (e = de(-T * M), i = h ? -k : 0, C.box = f = o ? S.symbol(o, e, i, C.width, C.height, I) : S.rect(e, i, C.width, C.height, 0, I[Xe]), f.attr("fill", Ee).add(C)), f.isImg || f.attr(t({
                    width: de(C.width),
                    height: de(C.height)
                }, I)), I = null)
            }

            function u() {
                var t, e = C.styles,
                    e = e && e.textAlign,
                    i = P + M * (1 - T);
                t = h ? 0 : k, c(x) && m && ("center" === e || "right" === e) && (i += {
                    center: .5,
                    right: 1
                }[e] * (x - m.width)), (i !== A.x || t !== A.y) && (A.attr("x", i), t !== E && A.attr("y", t)), A.x = i, A.y = t
            }

            function g(t, e) {
                f ? f.attr(t, e) : I[t] = e
            }
            var f, m, x, y, v, b, k, w, S = this,
                C = S.g(d),
                A = S.text("", 0, 0, l).attr({
                    zIndex: 1
                }),
                T = 0,
                M = 3,
                P = 0,
                L = 0,
                I = {};
            C.onAdd = function() {
                A.add(C), C.attr({
                    text: i || "",
                    x: n,
                    y: s
                }), f && c(r) && C.attr({
                    anchorX: r,
                    anchorY: a
                })
            }, C.widthSetter = function(t) {
                x = t
            }, C.heightSetter = function(t) {
                y = t
            }, C.paddingSetter = function(t) {
                c(t) && t !== M && (M = t, u())
            }, C.paddingLeftSetter = function(t) {
                c(t) && t !== P && (P = t, u())
            }, C.alignSetter = function(t) {
                T = {
                    left: 0,
                    center: .5,
                    right: 1
                }[t]
            }, C.textSetter = function(t) {
                t !== E && A.textSetter(t), p(), u()
            }, C["stroke-widthSetter"] = function(t, e) {
                t && (w = !0), L = t % 2 / 2, g(e, t)
            }, C.strokeSetter = C.fillSetter = C.rSetter = function(t, e) {
                "fill" === e && t && (w = !0), g(e, t)
            }, C.anchorXSetter = function(t, e) {
                r = t, g(e, t + L - v)
            }, C.anchorYSetter = function(t, e) {
                a = t, g(e, t - b)
            }, C.xSetter = function(t) {
                C.x = t, T && (t -= T * ((x || m.width) + M)), v = de(t), C.attr("translateX", v)
            }, C.ySetter = function(t) {
                b = C.y = de(t), C.attr("translateY", b)
            };
            var B = C.css;
            return t(C, {
                css: function(t) {
                    if (t) {
                        var i = {},
                            t = e(t);
                        $e(C.textProps, function(e) {
                            t[e] !== E && (i[e] = t[e], delete t[e])
                        }), A.css(i)
                    }
                    return B.call(C, t)
                },
                getBBox: function() {
                    return {
                        width: m.width + 2 * M,
                        height: m.height + 2 * M,
                        x: m.x - M,
                        y: m.y - M
                    }
                },
                shadow: function(t) {
                    return f && f.shadow(t), C
                },
                destroy: function() {
                    Je(C.element, "mouseenter"), Je(C.element, "mouseleave"), A && (A = A.destroy()), f && (f = f.destroy()), D.prototype.destroy.call(C), C = S = p = u = g = null
                }
            })
        }
    }, W = li, t(D.prototype, {
        htmlCss: function(e) {
            var i = this.element;
            return (i = e && "SPAN" === i.tagName && e.width) && (delete e.width, this.textWidth = i, this.updateTransform()), this.styles = t(this.styles, e), g(this.element, e), this
        },
        htmlGetBBox: function() {
            var t = this.element,
                e = this.bBox;
            return e || ("text" === t.nodeName && (t.style.position = "absolute"), e = this.bBox = {
                x: t.offsetLeft,
                y: t.offsetTop,
                width: t.offsetWidth,
                height: t.offsetHeight
            }), e
        },
        htmlUpdateTransform: function() {
            if (this.added) {
                var t = this.renderer,
                    e = this.element,
                    n = this.translateX || 0,
                    s = this.translateY || 0,
                    o = this.x || 0,
                    r = this.y || 0,
                    a = this.textAlign || "left",
                    l = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[a],
                    h = this.shadows;
                if (g(e, {
                        marginLeft: n,
                        marginTop: s
                    }), h && $e(h, function(t) {
                        g(t, {
                            marginLeft: n + 1,
                            marginTop: s + 1
                        })
                    }), this.inverted && $e(e.childNodes, function(i) {
                        t.invertChild(i, e)
                    }), "SPAN" === e.tagName) {
                    var d, p = this.rotation,
                        f = i(this.textWidth),
                        m = [p, a, e.innerHTML, this.textWidth].join(",");
                    m !== this.cTT && (d = t.fontMetrics(e.style.fontSize).b, c(p) && this.setSpanRotation(p, l, d), h = u(this.elemWidth, e.offsetWidth), h > f && /[ \-]/.test(e.textContent || e.innerText) && (g(e, {
                        width: f + "px",
                        display: "block",
                        whiteSpace: "normal"
                    }), h = f), this.getSpanCorrection(h, d, l, p, a)), g(e, {
                        left: o + (this.xCorr || 0) + "px",
                        top: r + (this.yCorr || 0) + "px"
                    }), Ae && (d = e.offsetHeight), this.cTT = m
                }
            } else this.alignOnAdd = !0
        },
        setSpanRotation: function(t, e, i) {
            var n = {},
                s = Se ? "-ms-transform" : Ae ? "-webkit-transform" : Te ? "MozTransform" : we ? "-o-transform" : "";
            n[s] = n.transform = "rotate(" + t + "deg)", n[s + (Te ? "Origin" : "-origin")] = n.transformOrigin = 100 * e + "% " + i + "px", g(this.element, n)
        },
        getSpanCorrection: function(t, e, i) {
            this.xCorr = -t * i, this.yCorr = -e
        }
    }), t(li.prototype, {
        html: function(e, i, n) {
            var s = this.createElement("span"),
                o = s.element,
                r = s.renderer;
            return s.textSetter = function(t) {
                t !== o.innerHTML && delete this.bBox, o.innerHTML = this.textStr = t
            }, s.xSetter = s.ySetter = s.alignSetter = s.rotationSetter = function(t, e) {
                "align" === e && (e = "textAlign"), s[e] = t, s.htmlUpdateTransform()
            }, s.attr({
                text: e,
                x: de(i),
                y: de(n)
            }).css({
                position: "absolute",
                whiteSpace: "nowrap",
                fontFamily: this.style.fontFamily,
                fontSize: this.style.fontSize
            }), s.css = s.htmlCss, r.isSVG && (s.add = function(e) {
                var i, n = r.box.parentNode,
                    a = [];
                if (this.parentGroup = e) {
                    if (i = e.div, !i) {
                        for (; e;) a.push(e), e = e.parentGroup;
                        $e(a.reverse(), function(e) {
                            var s;
                            i = e.div = e.div || f(Re, {
                                className: d(e.element, "class")
                            }, {
                                position: "absolute",
                                left: (e.translateX || 0) + "px",
                                top: (e.translateY || 0) + "px"
                            }, i || n), s = i.style, t(e, {
                                translateXSetter: function(t, i) {
                                    s.left = t + "px", e[i] = t, e.doTransform = !0
                                },
                                translateYSetter: function(t, i) {
                                    s.top = t + "px", e[i] = t, e.doTransform = !0
                                },
                                visibilitySetter: function(t, e) {
                                    s[e] = t
                                }
                            })
                        })
                    }
                } else i = n;
                return i.appendChild(o), s.added = !0, s.alignOnAdd && s.htmlUpdateTransform(), s
            }), s
        }
    });
    var hi, ci;
    Le || De || (ci = {
        init: function(t, e) {
            var i = ["<", e, ' filled="f" stroked="f"'],
                n = ["position: ", "absolute", ";"],
                s = e === Re;
            ("shape" === e || s) && n.push("left:0;top:0;width:1px;height:1px;"), n.push("visibility: ", s ? "hidden" : "visible"), i.push(' style="', n.join(""), '"/>'), e && (i = s || "span" === e || "img" === e ? i.join("") : t.prepVML(i), this.element = f(i)), this.renderer = t
        },
        add: function(t) {
            var e = this.renderer,
                i = this.element,
                n = e.box,
                n = t ? t.element || t : n;
            return t && t.inverted && e.invertChild(i, n), n.appendChild(i), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
        },
        updateTransform: D.prototype.htmlUpdateTransform,
        setSpanRotation: function() {
            var t = this.rotation,
                e = xe(t * be),
                i = ye(t * be);
            g(this.element, {
                filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : Ee
            })
        },
        getSpanCorrection: function(t, e, i, n, s) {
            var o, r = n ? xe(n * be) : 1,
                a = n ? ye(n * be) : 0,
                l = u(this.elemHeight, this.element.offsetHeight);
            this.xCorr = 0 > r && -t, this.yCorr = 0 > a && -l, o = 0 > r * a, this.xCorr += a * e * (o ? 1 - i : i), this.yCorr -= r * e * (n ? o ? i : 1 - i : 1), s && "left" !== s && (this.xCorr -= t * i * (0 > r ? -1 : 1), n && (this.yCorr -= l * i * (0 > a ? -1 : 1)), g(this.element, {
                textAlign: s
            }))
        },
        pathToVML: function(t) {
            for (var e = t.length, i = []; e--;) r(t[e]) ? i[e] = de(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e], !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1), i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
            return i.join(" ") || "x"
        },
        clip: function(t) {
            var e, i = this;
            return t ? (e = t.members, h(e, i), e.push(i), i.destroyClip = function() {
                h(e, i)
            }, t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(), t = {
                clip: Ce ? "inherit" : "rect(auto)"
            }), i.css(t)
        },
        css: D.prototype.htmlCss,
        safeRemoveChild: function(t) {
            t.parentNode && M(t)
        },
        destroy: function() {
            return this.destroyClip && this.destroyClip(), D.prototype.destroy.apply(this)
        },
        on: function(t, e) {
            return this.element["on" + t] = function() {
                var t = he.event;
                t.target = t.srcElement, e(t)
            }, this
        },
        cutOffPath: function(t, e) {
            var n, t = t.split(/[ ,]/);
            return n = t.length, (9 === n || 11 === n) && (t[n - 4] = t[n - 2] = i(t[n - 2]) - 10 * e), t.join(" ")
        },
        shadow: function(t, e, n) {
            var s, o, r, a, l, h, c, d = [],
                p = this.element,
                g = this.renderer,
                m = p.style,
                x = p.path;
            if (x && "string" != typeof x.value && (x = "x"), l = x, t) {
                for (h = u(t.width, 3), c = (t.opacity || .15) / h, s = 1; 3 >= s; s++) a = 2 * h + 1 - 2 * s, n && (l = this.cutOffPath(x.value, a + .5)), r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', l, '" coordsize="10 10" style="', p.style.cssText, '" />'], o = f(g.prepVML(r), null, {
                    left: i(m.left) + u(t.offsetX, 1),
                    top: i(m.top) + u(t.offsetY, 1)
                }), n && (o.cutOff = a + 1), r = ['<stroke color="', t.color || "black", '" opacity="', c * s, '"/>'], f(g.prepVML(r), null, null, o), e ? e.element.appendChild(o) : p.parentNode.insertBefore(o, p), d.push(o);
                this.shadows = d
            }
            return this
        },
        updateShadows: ze,
        setAttr: function(t, e) {
            Ce ? this.element[t] = e : this.element.setAttribute(t, e)
        },
        classSetter: function(t) {
            this.element.className = t
        },
        dashstyleSetter: function(t, e, i) {
            (i.getElementsByTagName("stroke")[0] || f(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid", this[e] = t
        },
        dSetter: function(t, e, i) {
            var n = this.shadows,
                t = t || [];
            if (this.d = t.join && t.join(" "), i.path = t = this.pathToVML(t), n)
                for (i = n.length; i--;) n[i].path = n[i].cutOff ? this.cutOffPath(t, n[i].cutOff) : t;
            this.setAttr(e, t)
        },
        fillSetter: function(t, e, i) {
            var n = i.nodeName;
            "SPAN" === n ? i.style.color = t : "IMG" !== n && (i.filled = t !== Ee, this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
        },
        opacitySetter: ze,
        rotationSetter: function(t, e, i) {
            i = i.style, this[e] = i[e] = t, i.left = -de(ye(t * be) + 1) + "px", i.top = de(xe(t * be)) + "px"
        },
        strokeSetter: function(t, e, i) {
            this.setAttr("strokecolor", this.renderer.color(t, i, e))
        },
        "stroke-widthSetter": function(t, e, i) {
            i.stroked = !!t, this[e] = t, r(t) && (t += "px"), this.setAttr("strokeweight", t)
        },
        titleSetter: function(t, e) {
            this.setAttr(e, t)
        },
        visibilitySetter: function(t, e, i) {
            "inherit" === t && (t = "visible"), this.shadows && $e(this.shadows, function(i) {
                i.style[e] = t
            }), "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0, Ce || (i.style[e] = t ? "visible" : "hidden"), e = "top"), i.style[e] = t
        },
        xSetter: function(t, e, i) {
            this[e] = t, "x" === e ? e = "left" : "y" === e && (e = "top"), this.updateClipping ? (this[e] = t, this.updateClipping()) : i.style[e] = t
        },
        zIndexSetter: function(t, e, i) {
            i.style[e] = t
        }
    }, ae.VMLElement = ci = m(D, ci), ci.prototype.ySetter = ci.prototype.widthSetter = ci.prototype.heightSetter = ci.prototype.xSetter, ci = {
        Element: ci,
        isIE8: ke.indexOf("MSIE 8.0") > -1,
        init: function(e, i, n, s) {
            var o;
            if (this.alignedObjects = [], s = this.createElement(Re).css(t(this.getStyle(s), {
                    position: "relative"
                })), o = s.element, e.appendChild(s.element), this.isVML = !0, this.box = o, this.boxWrapper = s, this.cache = {}, this.setSize(i, n, !1), !le.namespaces.hcv) {
                le.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                try {
                    le.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                } catch (r) {
                    le.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                }
            }
        },
        isHidden: function() {
            return !this.box.offsetWidth
        },
        clipRect: function(e, i, n, o) {
            var r = this.createElement(),
                a = s(e);
            return t(r, {
                members: [],
                left: (a ? e.x : e) + 1,
                top: (a ? e.y : i) + 1,
                width: (a ? e.width : n) - 1,
                height: (a ? e.height : o) - 1,
                getCSS: function(e) {
                    var i = e.element,
                        n = i.nodeName,
                        e = e.inverted,
                        s = this.top - ("shape" === n ? i.offsetTop : 0),
                        o = this.left,
                        i = o + this.width,
                        r = s + this.height,
                        s = {
                            clip: "rect(" + de(e ? o : s) + "px," + de(e ? r : i) + "px," + de(e ? i : r) + "px," + de(e ? s : o) + "px)"
                        };
                    return !e && Ce && "DIV" === n && t(s, {
                        width: i + "px",
                        height: r + "px"
                    }), s
                },
                updateClipping: function() {
                    $e(r.members, function(t) {
                        t.element && t.css(r.getCSS(t))
                    })
                }
            })
        },
        color: function(t, e, i, n) {
            var s, o, r, a = this,
                l = /^rgba/,
                h = Ee;
            if (t && t.linearGradient ? r = "gradient" : t && t.radialGradient && (r = "pattern"), r) {
                var c, d, p, u, g, m, x, y, v = t.linearGradient || t.radialGradient,
                    b = "",
                    t = t.stops,
                    k = [],
                    w = function() {
                        o = ['<fill colors="' + k.join(",") + '" opacity="', g, '" o:opacity2="', u, '" type="', r, '" ', b, 'focus="100%" method="any" />'], f(a.prepVML(o), null, null, e)
                    };
                if (p = t[0], y = t[t.length - 1], p[0] > 0 && t.unshift([0, p[1]]), y[0] < 1 && t.push([1, y[1]]), $e(t, function(t, e) {
                        l.test(t[1]) ? (s = ai(t[1]), c = s.get("rgb"), d = s.get("a")) : (c = t[1], d = 1), k.push(100 * t[0] + "% " + c), e ? (g = d, m = c) : (u = d, x = c)
                    }), "fill" === i)
                    if ("gradient" === r) i = v.x1 || v[0] || 0, t = v.y1 || v[1] || 0, p = v.x2 || v[2] || 0, v = v.y2 || v[3] || 0, b = 'angle="' + (90 - 180 * ce.atan((v - t) / (p - i)) / ve) + '"', w();
                    else {
                        var S, h = v.r,
                            C = 2 * h,
                            A = 2 * h,
                            T = v.cx,
                            M = v.cy,
                            P = e.radialReference,
                            h = function() {
                                P && (S = n.getBBox(), T += (P[0] - S.x) / S.width - .5, M += (P[1] - S.y) / S.height - .5, C *= P[2] / S.width, A *= P[2] / S.height), b = 'src="' + Y.global.VMLRadialGradientURL + '" size="' + C + "," + A + '" origin="0.5,0.5" position="' + T + "," + M + '" color2="' + x + '" ', w()
                            };
                        n.added ? h() : n.onAdd = h, h = m
                    } else h = c
            } else l.test(t) && "IMG" !== e.tagName ? (s = ai(t), o = ["<", i, ' opacity="', s.get("a"), '"/>'], f(this.prepVML(o), null, null, e), h = s.get("rgb")) : (h = e.getElementsByTagName(i), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = t);
            return h
        },
        prepVML: function(t) {
            var e = this.isIE8,
                t = t.join("");
            return e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"), t
        },
        text: li.prototype.html,
        path: function(e) {
            var i = {
                coordsize: "10 10"
            };
            return o(e) ? i.d = e : s(e) && t(i, e), this.createElement("shape").attr(i)
        },
        circle: function(t, e, i) {
            var n = this.symbol("circle");
            return s(t) && (i = t.r, e = t.y, t = t.x), n.isCircle = !0, n.r = i, n.attr({
                x: t,
                y: e
            })
        },
        g: function(t) {
            var e;
            return t && (e = {
                className: "highcharts-" + t,
                "class": "highcharts-" + t
            }), this.createElement(Re).attr(e)
        },
        image: function(t, e, i, n, s) {
            var o = this.createElement("img").attr({
                src: t
            });
            return arguments.length > 1 && o.attr({
                x: e,
                y: i,
                width: n,
                height: s
            }), o
        },
        createElement: function(t) {
            return "rect" === t ? this.symbol(t) : li.prototype.createElement.call(this, t)
        },
        invertChild: function(t, e) {
            var n = this,
                s = e.style,
                o = "IMG" === t.tagName && t.style;
            g(t, {
                flip: "x",
                left: i(s.width) - (o ? i(o.top) : 1),
                top: i(s.height) - (o ? i(o.left) : 1),
                rotation: -90
            }), $e(t.childNodes, function(e) {
                n.invertChild(e, t)
            })
        },
        symbols: {
            arc: function(t, e, i, n, s) {
                var o = s.start,
                    r = s.end,
                    a = s.r || i || n,
                    i = s.innerR,
                    n = xe(o),
                    l = ye(o),
                    h = xe(r),
                    c = ye(r);
                return r - o === 0 ? ["x"] : (o = ["wa", t - a, e - a, t + a, e + a, t + a * n, e + a * l, t + a * h, e + a * c], s.open && !i && o.push("e", "M", t, e), o.push("at", t - i, e - i, t + i, e + i, t + i * h, e + i * c, t + i * n, e + i * l, "x", "e"), o.isArc = !0, o)
            },
            circle: function(t, e, i, n, s) {
                return s && (i = n = 2 * s.r), s && s.isCircle && (t -= i / 2, e -= n / 2), ["wa", t, e, t + i, e + n, t + i, e + n / 2, t + i, e + n / 2, "e"]
            },
            rect: function(t, e, i, n, s) {
                return li.prototype.symbols[c(s) && s.r ? "callout" : "square"].call(0, t, e, i, n, s)
            }
        }
    }, ae.VMLRenderer = hi = function() {
        this.init.apply(this, arguments)
    }, hi.prototype = e(li.prototype, ci), W = hi), li.prototype.measureSpanWidth = function(t, e) {
        var i, n = le.createElement("span");
        return i = le.createTextNode(t), n.appendChild(i), g(n, e), this.box.appendChild(n), i = n.offsetWidth, M(n), i
    };
    var di;
    De && (ae.CanVGRenderer = ci = function() {
        Pe = "http://www.w3.org/1999/xhtml"
    }, ci.prototype.symbols = {}, di = function() {
        function t() {
            var t, i = e.length;
            for (t = 0; i > t; t++) e[t]();
            e = []
        }
        var e = [];
        return {
            push: function(i, n) {
                0 === e.length && Ve(n, t), e.push(i)
            }
        }
    }(), W = ci), B.prototype = {
        addLabel: function() {
            var e, i = this.axis,
                n = i.options,
                s = i.chart,
                o = i.horiz,
                a = i.categories,
                h = i.names,
                d = this.pos,
                p = n.labels,
                g = p.rotation,
                f = i.tickPositions,
                o = o && a && !p.step && !p.staggerLines && !p.rotation && s.plotWidth / f.length || !o && (s.margin[3] || .33 * s.chartWidth),
                m = d === f[0],
                x = d === f[f.length - 1],
                h = a ? u(a[d], h[d], d) : d,
                a = this.label,
                y = f.info;
            i.isDatetimeAxis && y && (e = n.dateTimeLabelFormats[y.higherRanks[d] || y.unitName]), this.isFirst = m, this.isLast = x, n = i.labelFormatter.call({
                axis: i,
                chart: s,
                isFirst: m,
                isLast: x,
                dateTimeLabelFormat: e,
                value: i.isLog ? P(l(h)) : h
            }), d = o && {
                width: ge(1, de(o - 2 * (p.padding || 10))) + "px"
            }, d = t(d, p.style), c(a) ? a && a.attr({
                text: n
            }).css(d) : (e = {
                align: i.labelAlign
            }, r(g) && (e.rotation = g), o && p.ellipsis && (d.HcHeight = i.len / f.length), this.label = a = c(n) && p.enabled ? s.renderer.text(n, 0, 0, p.useHTML).attr(e).css(d).add(i.labelGroup) : null, i.tickBaseline = s.renderer.fontMetrics(p.style.fontSize, a).b, g && 2 === i.side && (i.tickBaseline *= xe(g * be))), this.yOffset = a ? u(p.y, i.tickBaseline + (2 === i.side ? 8 : -(a.getBBox().height / 2))) : 0
        },
        getLabelSize: function() {
            var t = this.label,
                e = this.axis;
            return t ? t.getBBox()[e.horiz ? "height" : "width"] : 0
        },
        getLabelSides: function() {
            var t = this.label.getBBox(),
                e = this.axis,
                i = e.horiz,
                n = e.options.labels,
                t = i ? t.width : t.height,
                e = i ? n.x - t * {
                    left: 0,
                    center: .5,
                    right: 1
                }[e.labelAlign] : 0;
            return [e, i ? t + e : t]
        },
        handleOverflow: function(t, e) {
            var i, n, s, o = !0,
                r = this.axis,
                a = this.isFirst,
                l = this.isLast,
                h = r.horiz ? e.x : e.y,
                c = r.reversed,
                d = r.tickPositions,
                p = this.getLabelSides(),
                u = p[0],
                p = p[1],
                g = this.label.line || 0;
            if (i = r.labelEdge, n = r.justifyLabels && (a || l), i[g] === E || h + u > i[g] ? i[g] = h + p : n || (o = !1), n) {
                i = (n = r.justifyToPlot) ? r.pos : 0, n = n ? i + r.len : r.chart.chartWidth;
                do t += a ? 1 : -1, s = r.ticks[d[t]]; while (d[t] && (!s || !s.label || s.label.line !== g));
                r = s && s.label.xy && s.label.xy.x + s.getLabelSides()[a ? 0 : 1], a && !c || l && c ? i > h + u && (h = i - u, s && h + p > r && (o = !1)) : h + p > n && (h = n - p, s && r > h + u && (o = !1)), e.x = h
            }
            return o
        },
        getPosition: function(t, e, i, n) {
            var s = this.axis,
                o = s.chart,
                r = n && o.oldChartHeight || o.chartHeight;
            return {
                x: t ? s.translate(e + i, null, null, n) + s.transB : s.left + s.offset + (s.opposite ? (n && o.oldChartWidth || o.chartWidth) - s.right - s.left : 0),
                y: t ? r - s.bottom + s.offset - (s.opposite ? s.height : 0) : r - s.translate(e + i, null, null, n) - s.transB
            }
        },
        getLabelPosition: function(t, e, i, n, s, o, r, a) {
            var l = this.axis,
                h = l.transA,
                c = l.reversed,
                d = l.staggerLines,
                t = t + s.x - (o && n ? o * h * (c ? -1 : 1) : 0),
                e = e + this.yOffset - (o && !n ? o * h * (c ? 1 : -1) : 0);
            return d && (i.line = r / (a || 1) % d, e += i.line * (l.labelOffset / d)), {
                x: t,
                y: e
            }
        },
        getMarkPath: function(t, e, i, n, s, o) {
            return o.crispLine(["M", t, e, "L", t + (s ? 0 : -i), e + (s ? i : 0)], n)
        },
        render: function(t, e, i) {
            var n = this.axis,
                s = n.options,
                o = n.chart.renderer,
                r = n.horiz,
                a = this.type,
                l = this.label,
                h = this.pos,
                c = s.labels,
                d = this.gridLine,
                p = a ? a + "Grid" : "grid",
                g = a ? a + "Tick" : "tick",
                f = s[p + "LineWidth"],
                m = s[p + "LineColor"],
                x = s[p + "LineDashStyle"],
                y = s[g + "Length"],
                p = s[g + "Width"] || 0,
                v = s[g + "Color"],
                b = s[g + "Position"],
                g = this.mark,
                k = c.step,
                w = !0,
                S = n.tickmarkOffset,
                C = this.getPosition(r, h, S, e),
                A = C.x,
                C = C.y,
                T = r && A === n.pos + n.len || !r && C === n.pos ? -1 : 1,
                i = u(i, 1);
            this.isActive = !0, f && (h = n.getPlotLinePath(h + S, f * T, e, !0), d === E && (d = {
                stroke: m,
                "stroke-width": f
            }, x && (d.dashstyle = x), a || (d.zIndex = 1), e && (d.opacity = 0), this.gridLine = d = f ? o.path(h).attr(d).add(n.gridGroup) : null), !e && d && h && d[this.isNew ? "attr" : "animate"]({
                d: h,
                opacity: i
            })), p && y && ("inside" === b && (y = -y), n.opposite && (y = -y), a = this.getMarkPath(A, C, y, p * T, r, o), g ? g.animate({
                d: a,
                opacity: i
            }) : this.mark = o.path(a).attr({
                stroke: v,
                "stroke-width": p,
                opacity: i
            }).add(n.axisGroup)), l && !isNaN(A) && (l.xy = C = this.getLabelPosition(A, C, l, r, c, S, t, k), this.isFirst && !this.isLast && !u(s.showFirstLabel, 1) || this.isLast && !this.isFirst && !u(s.showLastLabel, 1) ? w = !1 : !n.isRadial && !c.step && !c.rotation && !e && 0 !== i && (w = this.handleOverflow(t, C)), k && t % k && (w = !1), w && !isNaN(C.y) ? (C.opacity = i, l[this.isNew ? "attr" : "animate"](C), this.isNew = !1) : l.attr("y", -9999))
        },
        destroy: function() {
            T(this, this.axis)
        }
    }, ae.PlotLineOrBand = function(t, e) {
        this.axis = t, e && (this.options = e, this.id = e.id)
    }, ae.PlotLineOrBand.prototype = {
        render: function() {
            var t, i = this,
                n = i.axis,
                s = n.horiz,
                o = (n.pointRange || 0) / 2,
                r = i.options,
                l = r.label,
                h = i.label,
                d = r.width,
                p = r.to,
                u = r.from,
                g = c(u) && c(p),
                f = r.value,
                m = r.dashStyle,
                x = i.svgElem,
                y = [],
                v = r.color,
                b = r.zIndex,
                k = r.events,
                w = {},
                S = n.chart.renderer;
            if (n.isLog && (u = a(u), p = a(p), f = a(f)), d) y = n.getPlotLinePath(f, d), w = {
                stroke: v,
                "stroke-width": d
            }, m && (w.dashstyle = m);
            else {
                if (!g) return;
                u = ge(u, n.min - o), p = fe(p, n.max + o), y = n.getPlotBandPath(u, p, r), v && (w.fill = v), r.borderWidth && (w.stroke = r.borderColor, w["stroke-width"] = r.borderWidth)
            }
            if (c(b) && (w.zIndex = b), x) y ? x.animate({
                d: y
            }, null, x.onGetPath) : (x.hide(), x.onGetPath = function() {
                x.show()
            }, h && (i.label = h = h.destroy()));
            else if (y && y.length && (i.svgElem = x = S.path(y).attr(w).add(), k))
                for (t in o = function(t) {
                        x.on(t, function(e) {
                            k[t].apply(i, [e])
                        })
                    }, k) o(t);
            return l && c(l.text) && y && y.length && n.width > 0 && n.height > 0 ? (l = e({
                align: s && g && "center",
                x: s ? !g && 4 : 10,
                verticalAlign: !s && g && "middle",
                y: s ? g ? 16 : 10 : g ? 6 : -4,
                rotation: s && !g && 90
            }, l), h || (w = {
                align: l.textAlign || l.align,
                rotation: l.rotation
            }, c(b) && (w.zIndex = b), i.label = h = S.text(l.text, 0, 0, l.useHTML).attr(w).css(l.style).add()), n = [y[1], y[4], g ? y[6] : y[1]], g = [y[2], y[5], g ? y[7] : y[2]], y = C(n), s = C(g), h.align(l, !1, {
                x: y,
                y: s,
                width: A(n) - y,
                height: A(g) - s
            }), h.show()) : h && h.hide(), i
        },
        destroy: function() {
            h(this.axis.plotLinesAndBands, this), delete this.axis, T(this)
        }
    }, O.prototype = {
        defaultOptions: {
            dateTimeLabelFormats: {
                millisecond: "%H:%M:%S.%L",
                second: "%H:%M:%S",
                minute: "%H:%M",
                hour: "%H:%M",
                day: "%e. %b",
                week: "%e. %b",
                month: "%b '%y",
                year: "%Y"
            },
            endOnTick: !1,
            gridLineColor: "#C0C0C0",
            labels: Fe,
            lineColor: "#C0D0E0",
            lineWidth: 1,
            minPadding: .01,
            maxPadding: .01,
            minorGridLineColor: "#E0E0E0",
            minorGridLineWidth: 1,
            minorTickColor: "#A0A0A0",
            minorTickLength: 2,
            minorTickPosition: "outside",
            startOfWeek: 1,
            startOnTick: !1,
            tickColor: "#C0D0E0",
            tickLength: 10,
            tickmarkPlacement: "between",
            tickPixelInterval: 100,
            tickPosition: "outside",
            tickWidth: 1,
            title: {
                align: "middle",
                style: {
                    color: "#707070"
                }
            },
            type: "linear"
        },
        defaultYAxisOptions: {
            endOnTick: !0,
            gridLineWidth: 1,
            tickPixelInterval: 72,
            showLastLabel: !0,
            labels: {
                x: -8,
                y: 3
            },
            lineWidth: 0,
            maxPadding: .05,
            minPadding: .05,
            startOnTick: !0,
            tickWidth: 0,
            title: {
                rotation: 270,
                text: "Values"
            },
            stackLabels: {
                enabled: !1,
                formatter: function() {
                    return x(this.total, -1)
                },
                style: Fe.style
            }
        },
        defaultLeftAxisOptions: {
            labels: {
                x: -15,
                y: null
            },
            title: {
                rotation: 270
            }
        },
        defaultRightAxisOptions: {
            labels: {
                x: 15,
                y: null
            },
            title: {
                rotation: 90
            }
        },
        defaultBottomAxisOptions: {
            labels: {
                x: 0,
                y: null
            },
            title: {
                rotation: 0
            }
        },
        defaultTopAxisOptions: {
            labels: {
                x: 0,
                y: -15
            },
            title: {
                rotation: 0
            }
        },
        init: function(t, e) {
            var i = e.isX;
            this.horiz = t.inverted ? !i : i, this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis", this.opposite = e.opposite, this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e);
            var n = this.options,
                s = n.type;
            this.labelFormatter = n.labels.formatter || this.defaultLabelFormatter, this.userOptions = e, this.minPixelPadding = 0, this.chart = t, this.reversed = n.reversed, this.zoomEnabled = n.zoomEnabled !== !1, this.categories = n.categories || "category" === s, this.names = [], this.isLog = "logarithmic" === s, this.isDatetimeAxis = "datetime" === s, this.isLinked = c(n.linkedTo), this.tickmarkOffset = this.categories && "between" === n.tickmarkPlacement ? .5 : 0, this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = n.minRange || n.maxZoom, this.range = n.range, this.offset = n.offset || 0, this.stacks = {}, this.oldStacks = {}, this.min = this.max = null, this.crosshair = u(n.crosshair, p(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
            var o, n = this.options.events; - 1 === je(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this)), this.series = this.series || [], t.inverted && i && this.reversed === E && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
            for (o in n) qe(this, o, n[o]);
            this.isLog && (this.val2lin = a, this.lin2val = l)
        },
        setOptions: function(t) {
            this.options = e(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], e(Y[this.coll], t))
        },
        defaultLabelFormatter: function() {
            var t, e = this.axis,
                i = this.value,
                n = e.categories,
                s = this.dateTimeLabelFormat,
                o = Y.lang.numericSymbols,
                r = o && o.length,
                a = e.options.labels.format,
                e = e.isLog ? i : e.tickInterval;
            if (a) t = b(a, this);
            else if (n) t = i;
            else if (s) t = F(s, i);
            else if (r && e >= 1e3)
                for (; r-- && t === E;) n = Math.pow(1e3, r + 1), e >= n && null !== o[r] && (t = x(i / n, -1) + o[r]);
            return t === E && (t = me(i) >= 1e4 ? x(i, 0) : x(i, -1, E, "")), t
        },
        getSeriesExtremes: function() {
            var t = this,
                e = t.chart;
            t.hasVisibleSeries = !1, t.dataMin = t.dataMax = null, t.buildStacks && t.buildStacks(), $e(t.series, function(i) {
                if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                    var n;
                    n = i.options.threshold;
                    var s;
                    t.hasVisibleSeries = !0, t.isLog && 0 >= n && (n = null), t.isXAxis ? (n = i.xData, n.length && (t.dataMin = fe(u(t.dataMin, n[0]), C(n)), t.dataMax = ge(u(t.dataMax, n[0]), A(n)))) : (i.getExtremes(), s = i.dataMax, i = i.dataMin, c(i) && c(s) && (t.dataMin = fe(u(t.dataMin, i), i), t.dataMax = ge(u(t.dataMax, s), s)), c(n) && (t.dataMin >= n ? (t.dataMin = n, t.ignoreMinPadding = !0) : t.dataMax < n && (t.dataMax = n, t.ignoreMaxPadding = !0)))
                }
            })
        },
        translate: function(t, e, i, n, s, o) {
            var a = 1,
                l = 0,
                h = n ? this.oldTransA : this.transA,
                n = n ? this.oldMin : this.min,
                c = this.minPixelPadding,
                s = (this.options.ordinal || this.isLog && s) && this.lin2val;
            return h || (h = this.transA), i && (a *= -1, l = this.len), this.reversed && (a *= -1, l -= a * (this.sector || this.len)), e ? (t = t * a + l, t -= c, t = t / h + n, s && (t = this.lin2val(t))) : (s && (t = this.val2lin(t)), "between" === o && (o = .5), t = a * (t - n) * h + l + a * c + (r(o) ? h * o * this.pointRange : 0)), t
        },
        toPixels: function(t, e) {
            return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
        },
        toValue: function(t, e) {
            return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
        },
        getPlotLinePath: function(t, e, i, n, s) {
            var o, r, a, l = this.chart,
                h = this.left,
                c = this.top,
                d = i && l.oldChartHeight || l.chartHeight,
                p = i && l.oldChartWidth || l.chartWidth;
            return o = this.transB, s = u(s, this.translate(t, null, null, i)), t = i = de(s + o), o = r = de(d - s - o), isNaN(s) ? a = !0 : this.horiz ? (o = c, r = d - this.bottom, (h > t || t > h + this.width) && (a = !0)) : (t = h, i = p - this.right, (c > o || o > c + this.height) && (a = !0)), a && !n ? null : l.renderer.crispLine(["M", t, o, "L", i, r], e || 1)
        },
        getLinearTickPositions: function(t, e, i) {
            var n, s = P(pe(e / t) * t),
                o = P(ue(i / t) * t),
                a = [];
            if (e === i && r(e)) return [e];
            for (e = s; o >= e && (a.push(e), e = P(e + t), e !== n);) n = e;
            return a
        },
        getMinorTickPositions: function() {
            var t, e = this.options,
                i = this.tickPositions,
                n = this.minorTickInterval,
                s = [];
            if (this.isLog)
                for (t = i.length, e = 1; t > e; e++) s = s.concat(this.getLogTickPositions(n, i[e - 1], i[e], !0));
            else if (this.isDatetimeAxis && "auto" === e.minorTickInterval) s = s.concat(this.getTimeTicks(this.normalizeTimeTickInterval(n), this.min, this.max, e.startOfWeek)), s[0] < this.min && s.shift();
            else
                for (i = this.min + (i[0] - this.min) % n; i <= this.max; i += n) s.push(i);
            return s
        },
        adjustForMinRange: function() {
            var t, e, i, n, s, o, r = this.options,
                a = this.min,
                l = this.max,
                h = this.dataMax - this.dataMin >= this.minRange;
            if (this.isXAxis && this.minRange === E && !this.isLog && (c(r.min) || c(r.max) ? this.minRange = null : ($e(this.series, function(t) {
                    for (s = t.xData, i = o = t.xIncrement ? 1 : s.length - 1; i > 0; i--) n = s[i] - s[i - 1], (e === E || e > n) && (e = n)
                }), this.minRange = fe(5 * e, this.dataMax - this.dataMin))), l - a < this.minRange) {
                var d = this.minRange;
                t = (d - l + a) / 2, t = [a - t, u(r.min, a - t)], h && (t[2] = this.dataMin), a = A(t), l = [a + d, u(r.max, a + d)], h && (l[2] = this.dataMax), l = C(l), d > l - a && (t[0] = l - d, t[1] = u(r.min, l - d), a = A(t))
            }
            this.min = a, this.max = l
        },
        setAxisTranslation: function(t) {
            var e, i = this,
                s = i.max - i.min,
                o = i.axisPointRange || 0,
                r = 0,
                a = 0,
                l = i.linkedParent,
                h = !!i.categories,
                d = i.transA;
            (i.isXAxis || h || o) && (l ? (r = l.minPointOffset, a = l.pointRangePadding) : $e(i.series, function(t) {
                var l = h ? 1 : i.isXAxis ? t.pointRange : i.axisPointRange || 0,
                    d = t.options.pointPlacement,
                    p = t.closestPointRange;
                l > s && (l = 0), o = ge(o, l), r = ge(r, n(d) ? 0 : l / 2), a = ge(a, "on" === d ? 0 : l), !t.noSharedTooltip && c(p) && (e = c(e) ? fe(e, p) : p)
            }), l = i.ordinalSlope && e ? i.ordinalSlope / e : 1, i.minPointOffset = r *= l, i.pointRangePadding = a *= l, i.pointRange = fe(o, s), i.closestPointRange = e), t && (i.oldTransA = d), i.translationSlope = i.transA = d = i.len / (s + a || 1), i.transB = i.horiz ? i.left : i.bottom, i.minPixelPadding = d * r
        },
        setTickPositions: function(t) {
            var e, i = this,
                n = i.chart,
                s = i.options,
                o = s.startOnTick,
                l = s.endOnTick,
                h = i.isLog,
                d = i.isDatetimeAxis,
                p = i.isXAxis,
                g = i.isLinked,
                f = i.options.tickPositioner,
                m = s.maxPadding,
                x = s.minPadding,
                y = s.tickInterval,
                v = s.minTickInterval,
                b = s.tickPixelInterval,
                S = i.categories;
            g ? (i.linkedParent = n[i.coll][s.linkedTo], n = i.linkedParent.getExtremes(), i.min = u(n.min, n.dataMin), i.max = u(n.max, n.dataMax), s.type !== i.linkedParent.options.type && $(11, 1)) : (i.min = u(i.userMin, s.min, i.dataMin), i.max = u(i.userMax, s.max, i.dataMax)), h && (!t && fe(i.min, u(i.dataMin, i.min)) <= 0 && $(10, 1), i.min = P(a(i.min)), i.max = P(a(i.max))), i.range && c(i.max) && (i.userMin = i.min = ge(i.min, i.max - i.range), i.userMax = i.max, i.range = null), i.beforePadding && i.beforePadding(), i.adjustForMinRange(), S || i.axisPointRange || i.usePercentage || g || !c(i.min) || !c(i.max) || !(n = i.max - i.min) || (c(s.min) || c(i.userMin) || !x || !(i.dataMin < 0) && i.ignoreMinPadding || (i.min -= n * x), c(s.max) || c(i.userMax) || !m || !(i.dataMax > 0) && i.ignoreMaxPadding || (i.max += n * m)), r(s.floor) && (i.min = ge(i.min, s.floor)), r(s.ceiling) && (i.max = fe(i.max, s.ceiling)), i.min === i.max || void 0 === i.min || void 0 === i.max ? i.tickInterval = 1 : g && !y && b === i.linkedParent.options.tickPixelInterval ? i.tickInterval = i.linkedParent.tickInterval : (i.tickInterval = u(y, S ? 1 : (i.max - i.min) * b / ge(i.len, b)), !c(y) && i.len < b && !this.isRadial && !this.isLog && !S && o && l && (e = !0, i.tickInterval /= 4)), p && !t && $e(i.series, function(t) {
                t.processData(i.min !== i.oldMin || i.max !== i.oldMax)
            }), i.setAxisTranslation(!0), i.beforeSetTickPositions && i.beforeSetTickPositions(), i.postProcessTickInterval && (i.tickInterval = i.postProcessTickInterval(i.tickInterval)), i.pointRange && (i.tickInterval = ge(i.pointRange, i.tickInterval)), !y && i.tickInterval < v && (i.tickInterval = v), d || h || y || (i.tickInterval = w(i.tickInterval, null, k(i.tickInterval), s)), i.minorTickInterval = "auto" === s.minorTickInterval && i.tickInterval ? i.tickInterval / 5 : s.minorTickInterval, i.tickPositions = t = s.tickPositions ? [].concat(s.tickPositions) : f && f.apply(i, [i.min, i.max]), t || (!i.ordinalPositions && (i.max - i.min) / i.tickInterval > ge(2 * i.len, 200) && $(19, !0), t = d ? i.getTimeTicks(i.normalizeTimeTickInterval(i.tickInterval, s.units), i.min, i.max, s.startOfWeek, i.ordinalPositions, i.closestPointRange, !0) : h ? i.getLogTickPositions(i.tickInterval, i.min, i.max) : i.getLinearTickPositions(i.tickInterval, i.min, i.max), e && t.splice(1, t.length - 2), i.tickPositions = t), g || (s = t[0], h = t[t.length - 1], d = i.minPointOffset || 0, !o && !l && !S && 2 === t.length && t.splice(1, 0, (h + s) / 2), o ? i.min = s : i.min - d > s && t.shift(), l ? i.max = h : i.max + d < h && t.pop(), 1 === t.length && (o = me(i.max) > 1e13 ? 1 : .001, i.min -= o, i.max += o))
        },
        setMaxTicks: function() {
            var t = this.chart,
                e = t.maxTicks || {},
                i = this.tickPositions,
                n = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
            !this.isLinked && !this.isDatetimeAxis && i && i.length > (e[n] || 0) && this.options.alignTicks !== !1 && (e[n] = i.length), t.maxTicks = e
        },
        adjustTickAmount: function() {
            var t = this._maxTicksKey,
                e = this.tickPositions,
                i = this.chart.maxTicks;
            if (i && i[t] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== E) {
                var n = this.tickAmount,
                    s = e.length;
                if (this.tickAmount = t = i[t], t > s) {
                    for (; e.length < t;) e.push(P(e[e.length - 1] + this.tickInterval));
                    this.transA *= (s - 1) / (t - 1), this.max = e[e.length - 1]
                }
                c(n) && t !== n && (this.isDirty = !0)
            }
        },
        setScale: function() {
            var t, e, i, n, s = this.stacks;
            if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), n = this.len !== this.oldAxisLength, $e(this.series, function(t) {
                    (t.isDirtyData || t.isDirty || t.xAxis.isDirty) && (i = !0)
                }), n || i || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                if (!this.isXAxis)
                    for (t in s)
                        for (e in s[t]) s[t][e].total = null, s[t][e].cum = 0;
                this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = n || this.min !== this.oldMin || this.max !== this.oldMax)
            } else if (!this.isXAxis) {
                this.oldStacks && (s = this.stacks = this.oldStacks);
                for (t in s)
                    for (e in s[t]) s[t][e].cum = s[t][e].total
            }
            this.setMaxTicks()
        },
        setExtremes: function(e, i, n, s, o) {
            var r = this,
                a = r.chart,
                n = u(n, !0),
                o = t(o, {
                    min: e,
                    max: i
                });
            Qe(r, "setExtremes", o, function() {
                r.userMin = e, r.userMax = i, r.eventArgs = o, r.isDirtyExtremes = !0, n && a.redraw(s)
            })
        },
        zoom: function(t, e) {
            var i = this.dataMin,
                n = this.dataMax,
                s = this.options;
            return this.allowZoomOutside || (c(i) && t <= fe(i, u(s.min, i)) && (t = E), c(n) && e >= ge(n, u(s.max, n)) && (e = E)), this.displayBtn = t !== E || e !== E, this.setExtremes(t, e, !1, E, {
                trigger: "zoom"
            }), !0
        },
        setAxisSize: function() {
            var t = this.chart,
                e = this.options,
                i = e.offsetLeft || 0,
                n = this.horiz,
                s = u(e.width, t.plotWidth - i + (e.offsetRight || 0)),
                o = u(e.height, t.plotHeight),
                r = u(e.top, t.plotTop),
                e = u(e.left, t.plotLeft + i),
                i = /%$/;
            i.test(o) && (o = parseInt(o, 10) / 100 * t.plotHeight), i.test(r) && (r = parseInt(r, 10) / 100 * t.plotHeight + t.plotTop), this.left = e, this.top = r, this.width = s, this.height = o, this.bottom = t.chartHeight - o - r, this.right = t.chartWidth - s - e, this.len = ge(n ? s : o, 0), this.pos = n ? e : r
        },
        getExtremes: function() {
            var t = this.isLog;
            return {
                min: t ? P(l(this.min)) : this.min,
                max: t ? P(l(this.max)) : this.max,
                dataMin: this.dataMin,
                dataMax: this.dataMax,
                userMin: this.userMin,
                userMax: this.userMax
            }
        },
        getThreshold: function(t) {
            var e = this.isLog,
                i = e ? l(this.min) : this.min,
                e = e ? l(this.max) : this.max;
            return i > t || null === t ? t = i : t > e && (t = e), this.translate(t, 0, 1, 0, 1)
        },
        autoLabelAlign: function(t) {
            return t = (u(t, 0) - 90 * this.side + 720) % 360, t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
        },
        getOffset: function() {
            var t, e, i, n, s, o, r, a, l, h = this,
                d = h.chart,
                p = d.renderer,
                g = h.options,
                f = h.tickPositions,
                m = h.ticks,
                x = h.horiz,
                y = h.side,
                v = d.inverted ? [1, 0, 3, 2][y] : y,
                b = 0,
                k = 0,
                w = g.title,
                S = g.labels,
                C = 0,
                A = d.axisOffset,
                d = d.clipOffset,
                T = [-1, 1, 1, -1][y],
                M = 1,
                P = u(S.maxStaggerLines, 5);
            if (h.hasData = t = h.hasVisibleSeries || c(h.min) && c(h.max) && !!f, h.showAxis = e = t || u(g.showEmpty, !0), h.staggerLines = h.horiz && S.staggerLines, h.axisGroup || (h.gridGroup = p.g("grid").attr({
                    zIndex: g.gridZIndex || 1
                }).add(), h.axisGroup = p.g("axis").attr({
                    zIndex: g.zIndex || 2
                }).add(), h.labelGroup = p.g("axis-labels").attr({
                    zIndex: S.zIndex || 7
                }).addClass("highcharts-" + h.coll.toLowerCase() + "-labels").add()), t || h.isLinked) {
                if (h.labelAlign = u(S.align || h.autoLabelAlign(S.rotation)), $e(f, function(t) {
                        m[t] ? m[t].addLabel() : m[t] = new B(h, t)
                    }), h.horiz && !h.staggerLines && P && !S.rotation) {
                    for (t = h.reversed ? [].concat(f).reverse() : f; P > M;) {
                        for (s = [], o = !1, n = 0; n < t.length; n++) r = t[n], a = (a = m[r].label && m[r].label.getBBox()) ? a.width : 0, l = n % M, a && (r = h.translate(r), s[l] !== E && r < s[l] && (o = !0), s[l] = r + a);
                        if (!o) break;
                        M++
                    }
                    M > 1 && (h.staggerLines = M)
                }
                $e(f, function(t) {
                    (0 === y || 2 === y || {
                        1: "left",
                        3: "right"
                    }[y] === h.labelAlign) && (C = ge(m[t].getLabelSize(), C))
                }), h.staggerLines && (C *= h.staggerLines, h.labelOffset = C)
            } else
                for (n in m) m[n].destroy(), delete m[n];
            w && w.text && w.enabled !== !1 && (h.axisTitle || (h.axisTitle = p.text(w.text, 0, 0, w.useHTML).attr({
                zIndex: 7,
                rotation: w.rotation || 0,
                align: w.textAlign || {
                    low: "left",
                    middle: "center",
                    high: "right"
                }[w.align]
            }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(w.style).add(h.axisGroup), h.axisTitle.isNew = !0), e && (b = h.axisTitle.getBBox()[x ? "height" : "width"], i = w.offset, k = c(i) ? 0 : u(w.margin, x ? 5 : 10)), h.axisTitle[e ? "show" : "hide"]()), h.offset = T * u(g.offset, A[y]), p = 2 === y ? h.tickBaseline : 0, x = C + k + (C && T * (x ? u(S.y, h.tickBaseline + 8) : S.x) - p), h.axisTitleMargin = u(i, x), A[y] = ge(A[y], h.axisTitleMargin + b + T * h.offset, x), d[v] = ge(d[v], 2 * pe(g.lineWidth / 2))
        },
        getLinePath: function(t) {
            var e = this.chart,
                i = this.opposite,
                n = this.offset,
                s = this.horiz,
                o = this.left + (i ? this.width : 0) + n,
                n = e.chartHeight - this.bottom - (i ? this.height : 0) + n;
            return i && (t *= -1), e.renderer.crispLine(["M", s ? this.left : o, s ? n : this.top, "L", s ? e.chartWidth - this.right : o, s ? n : e.chartHeight - this.bottom], t)
        },
        getTitlePosition: function() {
            var t = this.horiz,
                e = this.left,
                n = this.top,
                s = this.len,
                o = this.options.title,
                r = t ? e : n,
                a = this.opposite,
                l = this.offset,
                h = i(o.style.fontSize || 12),
                s = {
                    low: r + (t ? 0 : s),
                    middle: r + s / 2,
                    high: r + (t ? s : 0)
                }[o.align],
                e = (t ? n + this.height : e) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? h : 0);
            return {
                x: t ? s : e + (a ? this.width : 0) + l + (o.x || 0),
                y: t ? e - (a ? this.height : 0) + l : s + (o.y || 0)
            }
        },
        render: function() {
            var t, e, i, n = this,
                s = n.horiz,
                o = n.reversed,
                r = n.chart,
                a = r.renderer,
                h = n.options,
                d = n.isLog,
                p = n.isLinked,
                u = n.tickPositions,
                g = n.axisTitle,
                f = n.ticks,
                m = n.minorTicks,
                x = n.alternateBands,
                y = h.stackLabels,
                v = h.alternateGridColor,
                b = n.tickmarkOffset,
                k = h.lineWidth,
                w = r.hasRendered && c(n.oldMin) && !isNaN(n.oldMin),
                S = n.hasData,
                C = n.showAxis,
                A = h.labels.overflow,
                T = n.justifyLabels = s && A !== !1;
            n.labelEdge.length = 0, n.justifyToPlot = "justify" === A, $e([f, m, x], function(t) {
                for (var e in t) t[e].isActive = !1
            }), (S || p) && (n.minorTickInterval && !n.categories && $e(n.getMinorTickPositions(), function(t) {
                m[t] || (m[t] = new B(n, t, "minor")), w && m[t].isNew && m[t].render(null, !0), m[t].render(null, !1, 1)
            }), u.length && (t = u.slice(), (s && o || !s && !o) && t.reverse(), T && (t = t.slice(1).concat([t[0]])), $e(t, function(e, i) {
                T && (i = i === t.length - 1 ? 0 : i + 1), (!p || e >= n.min && e <= n.max) && (f[e] || (f[e] = new B(n, e)), w && f[e].isNew && f[e].render(i, !0, .1), f[e].render(i))
            }), b && 0 === n.min && (f[-1] || (f[-1] = new B(n, -1, null, !0)), f[-1].render(-1))), v && $e(u, function(t, s) {
                s % 2 === 0 && t < n.max && (x[t] || (x[t] = new ae.PlotLineOrBand(n)), e = t + b, i = u[s + 1] !== E ? u[s + 1] + b : n.max, x[t].options = {
                    from: d ? l(e) : e,
                    to: d ? l(i) : i,
                    color: v
                }, x[t].render(), x[t].isActive = !0)
            }), n._addedPlotLB || ($e((h.plotLines || []).concat(h.plotBands || []), function(t) {
                n.addPlotBandOrLine(t)
            }), n._addedPlotLB = !0)), $e([f, m, x], function(t) {
                var e, i, n = [],
                    s = N ? N.duration || 500 : 0,
                    o = function() {
                        for (i = n.length; i--;) t[n[i]] && !t[n[i]].isActive && (t[n[i]].destroy(), delete t[n[i]])
                    };
                for (e in t) t[e].isActive || (t[e].render(e, !1, 0), t[e].isActive = !1, n.push(e));
                t !== x && r.hasRendered && s ? s && setTimeout(o, s) : o()
            }), k && (s = n.getLinePath(k), n.axisLine ? n.axisLine.animate({
                d: s
            }) : n.axisLine = a.path(s).attr({
                stroke: h.lineColor,
                "stroke-width": k,
                zIndex: 7
            }).add(n.axisGroup), n.axisLine[C ? "show" : "hide"]()), g && C && (g[g.isNew ? "attr" : "animate"](n.getTitlePosition()), g.isNew = !1), y && y.enabled && n.renderStackTotals(), n.isDirty = !1
        },
        redraw: function() {
            this.render(), $e(this.plotLinesAndBands, function(t) {
                t.render()
            }), $e(this.series, function(t) {
                t.isDirty = !0
            })
        },
        destroy: function(t) {
            var e, i = this,
                n = i.stacks,
                s = i.plotLinesAndBands;
            t || Je(i);
            for (e in n) T(n[e]), n[e] = null;
            for ($e([i.ticks, i.minorTicks, i.alternateBands], function(t) {
                    T(t)
                }), t = s.length; t--;) s[t].destroy();
            $e("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(t) {
                i[t] && (i[t] = i[t].destroy())
            }), this.cross && this.cross.destroy()
        },
        drawCrosshair: function(t, e) {
            if (this.crosshair)
                if ((c(e) || !u(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                else {
                    var i, n = this.crosshair,
                        s = n.animation;
                    u(n.snap, !0) ? c(e) && (i = this.chart.inverted != this.horiz ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos, i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : u(e.stackY, e.y)) : this.getPlotLinePath(null, null, null, null, i), null === i ? this.hideCrosshair() : this.cross ? this.cross.attr({
                        visibility: "visible"
                    })[s ? "animate" : "attr"]({
                        d: i
                    }, s) : (s = {
                        "stroke-width": n.width || 1,
                        stroke: n.color || "#C0C0C0",
                        zIndex: n.zIndex || 2
                    }, n.dashStyle && (s.dashstyle = n.dashStyle), this.cross = this.chart.renderer.path(i).attr(s).add())
                }
        },
        hideCrosshair: function() {
            this.cross && this.cross.hide()
        }
    }, t(O.prototype, {
        getPlotBandPath: function(t, e) {
            var i = this.getPlotLinePath(e),
                n = this.getPlotLinePath(t);
            return n && i ? n.push(i[4], i[5], i[1], i[2]) : n = null, n
        },
        addPlotBand: function(t) {
            return this.addPlotBandOrLine(t, "plotBands")
        },
        addPlotLine: function(t) {
            return this.addPlotBandOrLine(t, "plotLines")
        },
        addPlotBandOrLine: function(t, e) {
            var i = new ae.PlotLineOrBand(this, t).render(),
                n = this.userOptions;
            return i && (e && (n[e] = n[e] || [], n[e].push(t)), this.plotLinesAndBands.push(i)), i
        },
        removePlotBandOrLine: function(t) {
            for (var e = this.plotLinesAndBands, i = this.options, n = this.userOptions, s = e.length; s--;) e[s].id === t && e[s].destroy();
            $e([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], function(e) {
                for (s = e.length; s--;) e[s].id === t && h(e, e[s])
            })
        }
    }), O.prototype.getTimeTicks = function(e, i, n, s) {
        var o, r = [],
            a = {},
            l = Y.global.useUTC,
            h = new Date(i - Z),
            d = e.unitRange,
            p = e.count;
        if (c(i)) {
            d >= j.second && (h.setMilliseconds(0), h.setSeconds(d >= j.minute ? 0 : p * pe(h.getSeconds() / p))), d >= j.minute && h[ie](d >= j.hour ? 0 : p * pe(h[K]() / p)), d >= j.hour && h[ne](d >= j.day ? 0 : p * pe(h[q]() / p)), d >= j.day && h[se](d >= j.month ? 1 : p * pe(h[Q]() / p)), d >= j.month && (h[oe](d >= j.year ? 0 : p * pe(h[te]() / p)), o = h[ee]()), d >= j.year && (o -= o % p, h[re](o)), d === j.week && h[se](h[Q]() - h[J]() + u(s, 1)), i = 1, Z && (h = new Date(h.getTime() + Z)), o = h[ee]();
            for (var s = h.getTime(), g = h[te](), f = h[Q](), m = l ? Z : (864e5 + 6e4 * h.getTimezoneOffset()) % 864e5; n > s;) r.push(s), d === j.year ? s = U(o + i * p, 0) : d === j.month ? s = U(o, g + i * p) : l || d !== j.day && d !== j.week ? s += d * p : s = U(o, g, f + i * p * (d === j.day ? 1 : 7)), i++;
            r.push(s), $e(Ue(r, function(t) {
                return d <= j.hour && t % j.day === m
            }), function(t) {
                a[t] = "day"
            })
        }
        return r.info = t(e, {
            higherRanks: a,
            totalRange: d * p
        }), r
    }, O.prototype.normalizeTimeTickInterval = function(t, e) {
        var i, n = e || [
                ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                ["second", [1, 2, 5, 10, 15, 30]],
                ["minute", [1, 2, 5, 10, 15, 30]],
                ["hour", [1, 2, 3, 4, 6, 8, 12]],
                ["day", [1, 2]],
                ["week", [1, 2]],
                ["month", [1, 2, 3, 4, 6]],
                ["year", null]
            ],
            s = n[n.length - 1],
            o = j[s[0]],
            r = s[1];
        for (i = 0; i < n.length && (s = n[i], o = j[s[0]], r = s[1], !(n[i + 1] && t <= (o * r[r.length - 1] + j[n[i + 1][0]]) / 2)); i++);
        return o === j.year && 5 * o > t && (r = [1, 2, 5]), n = w(t / o, r, "year" === s[0] ? ge(k(t / o), 1) : 1), {
            unitRange: o,
            count: n,
            unitName: s[0]
        }
    }, O.prototype.getLogTickPositions = function(t, e, i, n) {
        var s = this.options,
            o = this.len,
            r = [];
        if (n || (this._minorAutoInterval = null), t >= .5) t = de(t), r = this.getLinearTickPositions(t, e, i);
        else if (t >= .08)
            for (var h, c, d, p, g, o = pe(e), s = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; i + 1 > o && !g; o++)
                for (c = s.length, h = 0; c > h && !g; h++) d = a(l(o) * s[h]), d > e && (!n || i >= p) && p !== E && r.push(p), p > i && (g = !0), p = d;
        else e = l(e), i = l(i), t = s[n ? "minorTickInterval" : "tickInterval"], t = u("auto" === t ? null : t, this._minorAutoInterval, (i - e) * (s.tickPixelInterval / (n ? 5 : 1)) / ((n ? o / this.tickPositions.length : o) || 1)), t = w(t, null, k(t)), r = Ke(this.getLinearTickPositions(t, e, i), a), n || (this._minorAutoInterval = t / 5);
        return n || (this.tickInterval = t), r
    };
    var pi = ae.Tooltip = function() {
        this.init.apply(this, arguments)
    };
    pi.prototype = {
        init: function(t, e) {
            var n = e.borderWidth,
                s = e.style,
                o = i(s.padding);
            this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                x: 0,
                y: 0
            }, this.isHidden = !0, this.label = t.renderer.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                padding: o,
                fill: e.backgroundColor,
                "stroke-width": n,
                r: e.borderRadius,
                zIndex: 8
            }).css(s).css({
                padding: 0
            }).add().attr({
                y: -9999
            }), De || this.label.shadow(e.shadow), this.shared = e.shared
        },
        destroy: function() {
            this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
        },
        move: function(e, i, n, s) {
            var o = this,
                r = o.now,
                a = o.options.animation !== !1 && !o.isHidden && (me(e - r.x) > 1 || me(i - r.y) > 1),
                l = o.followPointer || o.len > 1;
            t(r, {
                x: a ? (2 * r.x + e) / 3 : e,
                y: a ? (r.y + i) / 2 : i,
                anchorX: l ? E : a ? (2 * r.anchorX + n) / 3 : n,
                anchorY: l ? E : a ? (r.anchorY + s) / 2 : s
            }), o.label.attr(r), a && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                o && o.move(e, i, n, s)
            }, 32))
        },
        hide: function() {
            var t, e = this;
            clearTimeout(this.hideTimer), this.isHidden || (t = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                e.label.fadeOut(), e.isHidden = !0
            }, u(this.options.hideDelay, 500)), t && $e(t, function(t) {
                t.setState()
            }), this.chart.hoverPoints = null)
        },
        getAnchor: function(t, e) {
            var i, n, s = this.chart,
                o = s.inverted,
                r = s.plotTop,
                a = 0,
                l = 0,
                t = p(t);
            return i = t[0].tooltipPos, this.followPointer && e && (e.chartX === E && (e = s.pointer.normalize(e)), i = [e.chartX - s.plotLeft, e.chartY - r]), i || ($e(t, function(t) {
                n = t.series.yAxis, a += t.plotX, l += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!o && n ? n.top - r : 0)
            }), a /= t.length, l /= t.length, i = [o ? s.plotWidth - l : a, this.shared && !o && t.length > 1 && e ? e.chartY - r : o ? s.plotHeight - a : l]), Ke(i, de)
        },
        getPosition: function(t, e, i) {
            var n, s = this.chart,
                o = this.distance,
                r = {},
                a = ["y", s.chartHeight, e, i.plotY + s.plotTop],
                l = ["x", s.chartWidth, t, i.plotX + s.plotLeft],
                h = i.ttBelow || s.inverted && !i.negative || !s.inverted && i.negative,
                c = function(t, e, i, n) {
                    var s = n - o > i,
                        e = e > n + o + i,
                        i = n - o - i;
                    if (n += o, h && e) r[t] = n;
                    else if (!h && s) r[t] = i;
                    else if (s) r[t] = i;
                    else {
                        if (!e) return !1;
                        r[t] = n
                    }
                },
                d = function(t, e, i, n) {
                    return o > n || n > e - o ? !1 : void(r[t] = i / 2 > n ? 1 : n > e - i / 2 ? e - i - 2 : n - i / 2)
                },
                p = function(t) {
                    var e = a;
                    a = l, l = e, n = t
                },
                u = function() {
                    c.apply(0, a) !== !1 ? d.apply(0, l) === !1 && !n && (p(!0), u()) : n ? r.x = r.y = 0 : (p(!0), u())
                };
            return (s.inverted || this.len > 1) && p(), u(), r
        },
        defaultFormatter: function(t) {
            var e, i = this.points || p(this),
                n = i[0].series;
            return e = [t.tooltipHeaderFormatter(i[0])], $e(i, function(t) {
                n = t.series, e.push(n.tooltipFormatter && n.tooltipFormatter(t) || t.point.tooltipFormatter(n.tooltipOptions.pointFormat))
            }), e.push(t.options.footerFormat || ""), e.join("")
        },
        refresh: function(t, e) {
            var i, n, s, o = this.chart,
                r = this.label,
                a = this.options,
                l = {},
                h = [];
            s = a.formatter || this.defaultFormatter;
            var c, l = o.hoverPoints,
                d = this.shared;
            clearTimeout(this.hideTimer), this.followPointer = p(t)[0].series.tooltipOptions.followPointer, n = this.getAnchor(t, e), i = n[0], n = n[1], !d || t.series && t.series.noSharedTooltip ? l = t.getLabelConfig() : (o.hoverPoints = t, l && $e(l, function(t) {
                t.setState()
            }), $e(t, function(t) {
                t.setState("hover"), h.push(t.getLabelConfig())
            }), l = {
                x: t[0].category,
                y: t[0].y
            }, l.points = h, this.len = h.length, t = t[0]), s = s.call(l, this), l = t.series, this.distance = u(l.tooltipOptions.distance, 16), s === !1 ? this.hide() : (this.isHidden && (ii(r), r.attr("opacity", 1).show()), r.attr({
                text: s
            }), c = a.borderColor || t.color || l.color || "#606060", r.attr({
                stroke: c
            }), this.updatePosition({
                plotX: i,
                plotY: n,
                negative: t.negative,
                ttBelow: t.ttBelow
            }), this.isHidden = !1), Qe(o, "tooltipRefresh", {
                text: s,
                x: i + o.plotLeft,
                y: n + o.plotTop,
                borderColor: c
            })
        },
        updatePosition: function(t) {
            var e = this.chart,
                i = this.label,
                i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
            this.move(de(i.x), de(i.y), t.plotX + e.plotLeft, t.plotY + e.plotTop)
        },
        tooltipHeaderFormatter: function(t) {
            var e, i = t.series,
                n = i.tooltipOptions,
                s = n.dateTimeLabelFormats,
                o = n.xDateFormat,
                a = i.xAxis,
                l = a && "datetime" === a.options.type && r(t.key),
                n = n.headerFormat,
                a = a && a.closestPointRange;
            if (l && !o) {
                if (a) {
                    for (e in j)
                        if (j[e] >= a || j[e] <= j.day && t.key % j[e] > 0) {
                            o = s[e];
                            break
                        }
                } else o = s.day;
                o = o || s.year
            }
            return l && o && (n = n.replace("{point.key}", "{point.key:" + o + "}")), b(n, {
                point: t,
                series: i
            })
        }
    };
    var ui;
    X = le.documentElement.ontouchstart !== E;
    var gi = ae.Pointer = function(t, e) {
        this.init(t, e)
    };
    if (gi.prototype = {
            init: function(t, e) {
                var i, n = e.chart,
                    s = n.events,
                    o = De ? "" : n.zoomType,
                    n = t.inverted;
                this.options = e, this.chart = t, this.zoomX = i = /x/.test(o), this.zoomY = o = /y/.test(o), this.zoomHor = i && !n || o && n, this.zoomVert = o && !n || i && n, this.hasZoom = i || o, this.runChartClick = s && !!s.click, this.pinchDown = [], this.lastValidTouch = {}, ae.Tooltip && e.tooltip.enabled && (t.tooltip = new pi(t, e.tooltip), this.followTouchMove = e.tooltip.followTouchMove), this.setDOMEvents()
            },
            normalize: function(e, i) {
                var n, s, e = e || window.event,
                    e = ti(e);
                return e.target || (e.target = e.srcElement), s = e.touches ? e.touches.length ? e.touches.item(0) : e.changedTouches[0] : e, i || (this.chartPosition = i = Ze(this.chart.container)), s.pageX === E ? (n = ge(e.x, e.clientX - i.left), s = e.y) : (n = s.pageX - i.left, s = s.pageY - i.top), t(e, {
                    chartX: de(n),
                    chartY: de(s)
                })
            },
            getCoordinates: function(t) {
                var e = {
                    xAxis: [],
                    yAxis: []
                };
                return $e(this.chart.axes, function(i) {
                    e[i.isXAxis ? "xAxis" : "yAxis"].push({
                        axis: i,
                        value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                    })
                }), e
            },
            getIndex: function(t) {
                var e = this.chart;
                return e.inverted ? e.plotHeight + e.plotTop - t.chartY : t.chartX - e.plotLeft
            },
            runPointActions: function(t) {
                var e, i, n, s, o = this.chart,
                    r = o.series,
                    a = o.tooltip,
                    l = o.hoverPoint,
                    h = o.hoverSeries,
                    c = o.chartWidth,
                    d = this.getIndex(t);
                if (a && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                    for (i = [], n = r.length, s = 0; n > s; s++) r[s].visible && r[s].options.enableMouseTracking !== !1 && !r[s].noSharedTooltip && r[s].singularTooltips !== !0 && r[s].tooltipPoints.length && (e = r[s].tooltipPoints[d]) && e.series && (e._dist = me(d - e.clientX), c = fe(c, e._dist), i.push(e));
                    for (n = i.length; n--;) i[n]._dist > c && i.splice(n, 1);
                    i.length && i[0].clientX !== this.hoverX && (a.refresh(i, t), this.hoverX = i[0].clientX)
                }
                r = h && h.tooltipOptions.followPointer, h && h.tracker && !r ? (e = h.tooltipPoints[d]) && e !== l && e.onMouseOver(t) : a && r && !a.isHidden && (h = a.getAnchor([{}], t), a.updatePosition({
                    plotX: h[0],
                    plotY: h[1]
                })), a && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(t) {
                    He[ui] && He[ui].pointer.onDocumentMouseMove(t)
                }, qe(le, "mousemove", this._onDocumentMouseMove)), $e(o.axes, function(i) {
                    i.drawCrosshair(t, u(e, l))
                })
            },
            reset: function(t) {
                var e = this.chart,
                    i = e.hoverSeries,
                    n = e.hoverPoint,
                    s = e.tooltip,
                    o = s && s.shared ? e.hoverPoints : n;
                (t = t && s && o) && p(o)[0].plotX === E && (t = !1), t ? (s.refresh(o), n && n.setState(n.state, !0)) : (n && n.onMouseOut(), i && i.onMouseOut(), s && s.hide(), this._onDocumentMouseMove && (Je(le, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), $e(e.axes, function(t) {
                    t.hideCrosshair()
                }), this.hoverX = null)
            },
            scaleGroups: function(t, e) {
                var i, n = this.chart;
                $e(n.series, function(s) {
                    i = t || s.getPlotBox(), s.xAxis && s.xAxis.zoomEnabled && (s.group.attr(i), s.markerGroup && (s.markerGroup.attr(i), s.markerGroup.clip(e ? n.clipRect : null)), s.dataLabelsGroup && s.dataLabelsGroup.attr(i))
                }), n.clipRect.attr(e || n.clipBox)
            },
            dragStart: function(t) {
                var e = this.chart;
                e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
            },
            drag: function(t) {
                var e, i = this.chart,
                    n = i.options.chart,
                    s = t.chartX,
                    o = t.chartY,
                    r = this.zoomHor,
                    a = this.zoomVert,
                    l = i.plotLeft,
                    h = i.plotTop,
                    c = i.plotWidth,
                    d = i.plotHeight,
                    p = this.mouseDownX,
                    u = this.mouseDownY,
                    g = n.panKey && t[n.panKey + "Key"];
                l > s ? s = l : s > l + c && (s = l + c), h > o ? o = h : o > h + d && (o = h + d), this.hasDragged = Math.sqrt(Math.pow(p - s, 2) + Math.pow(u - o, 2)), this.hasDragged > 10 && (e = i.isInsidePlot(p - l, u - h), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !g && !this.selectionMarker && (this.selectionMarker = i.renderer.rect(l, h, r ? 1 : c, a ? 1 : d, 0).attr({
                    fill: n.selectionMarkerFill || "rgba(69,114,167,0.25)",
                    zIndex: 7
                }).add()), this.selectionMarker && r && (s -= p, this.selectionMarker.attr({
                    width: me(s),
                    x: (s > 0 ? 0 : s) + p
                })), this.selectionMarker && a && (s = o - u, this.selectionMarker.attr({
                    height: me(s),
                    y: (s > 0 ? 0 : s) + u
                })), e && !this.selectionMarker && n.panning && i.pan(t, n.panning))
            },
            drop: function(e) {
                var i = this.chart,
                    n = this.hasPinched;
                if (this.selectionMarker) {
                    var s, o = {
                            xAxis: [],
                            yAxis: [],
                            originalEvent: e.originalEvent || e
                        },
                        r = this.selectionMarker,
                        a = r.attr ? r.attr("x") : r.x,
                        l = r.attr ? r.attr("y") : r.y,
                        h = r.attr ? r.attr("width") : r.width,
                        c = r.attr ? r.attr("height") : r.height;
                    (this.hasDragged || n) && ($e(i.axes, function(t) {
                        if (t.zoomEnabled) {
                            var i = t.horiz,
                                n = "touchend" === e.type ? t.minPixelPadding : 0,
                                r = t.toValue((i ? a : l) + n),
                                i = t.toValue((i ? a + h : l + c) - n);
                            !isNaN(r) && !isNaN(i) && (o[t.coll].push({
                                axis: t,
                                min: fe(r, i),
                                max: ge(r, i)
                            }), s = !0)
                        }
                    }), s && Qe(i, "selection", o, function(e) {
                        i.zoom(t(e, n ? {
                            animation: !1
                        } : null))
                    })), this.selectionMarker = this.selectionMarker.destroy(), n && this.scaleGroups()
                }
                i && (g(i.container, {
                    cursor: i._cursor
                }), i.cancelClick = this.hasDragged > 10, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
            },
            onContainerMouseDown: function(t) {
                t = this.normalize(t), t.preventDefault && t.preventDefault(), this.dragStart(t)
            },
            onDocumentMouseUp: function(t) {
                He[ui] && He[ui].pointer.drop(t)
            },
            onDocumentMouseMove: function(t) {
                var e = this.chart,
                    i = this.chartPosition,
                    n = e.hoverSeries,
                    t = this.normalize(t, i);
                i && n && !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && this.reset()
            },
            onContainerMouseLeave: function() {
                var t = He[ui];
                t && (t.pointer.reset(), t.pointer.chartPosition = null)
            },
            onContainerMouseMove: function(t) {
                var e = this.chart;
                ui = e.index, t = this.normalize(t), t.returnValue = !1, "mousedown" === e.mouseIsDown && this.drag(t), (this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop)) && !e.openMenu && this.runPointActions(t)
            },
            inClass: function(t, e) {
                for (var i; t;) {
                    if (i = d(t, "class")) {
                        if (-1 !== i.indexOf(e)) return !0;
                        if (-1 !== i.indexOf("highcharts-container")) return !1
                    }
                    t = t.parentNode
                }
            },
            onTrackerMouseOut: function(t) {
                var e = this.chart.hoverSeries,
                    i = (t = t.relatedTarget || t.toElement) && t.point && t.point.series;
                !e || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || i === e || e.onMouseOut()
            },
            onContainerClick: function(e) {
                var i = this.chart,
                    n = i.hoverPoint,
                    s = i.plotLeft,
                    o = i.plotTop,
                    e = this.normalize(e);
                e.cancelBubble = !0, i.cancelClick || (n && this.inClass(e.target, "highcharts-tracker") ? (Qe(n.series, "click", t(e, {
                    point: n
                })), i.hoverPoint && n.firePointEvent("click", e)) : (t(e, this.getCoordinates(e)), i.isInsidePlot(e.chartX - s, e.chartY - o) && Qe(i, "click", e)))
            },
            setDOMEvents: function() {
                var t = this,
                    e = t.chart.container;
                e.onmousedown = function(e) {
                    t.onContainerMouseDown(e)
                }, e.onmousemove = function(e) {
                    t.onContainerMouseMove(e)
                }, e.onclick = function(e) {
                    t.onContainerClick(e)
                }, qe(e, "mouseleave", t.onContainerMouseLeave), 1 === _e && qe(le, "mouseup", t.onDocumentMouseUp), X && (e.ontouchstart = function(e) {
                    t.onContainerTouchStart(e)
                }, e.ontouchmove = function(e) {
                    t.onContainerTouchMove(e)
                }, 1 === _e && qe(le, "touchend", t.onDocumentTouchEnd))
            },
            destroy: function() {
                var t;
                Je(this.chart.container, "mouseleave", this.onContainerMouseLeave), _e || (Je(le, "mouseup", this.onDocumentMouseUp), Je(le, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                for (t in this) this[t] = null
            }
        }, t(ae.Pointer.prototype, {
            pinchTranslate: function(t, e, i, n, s, o) {
                (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, t, e, i, n, s, o), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, t, e, i, n, s, o)
            },
            pinchTranslateDirection: function(t, e, i, n, s, o, r, a) {
                var l, h, c, d = this.chart,
                    p = t ? "x" : "y",
                    u = t ? "X" : "Y",
                    g = "chart" + u,
                    f = t ? "width" : "height",
                    m = d["plot" + (t ? "Left" : "Top")],
                    x = a || 1,
                    y = d.inverted,
                    v = d.bounds[t ? "h" : "v"],
                    b = 1 === e.length,
                    k = e[0][g],
                    w = i[0][g],
                    S = !b && e[1][g],
                    C = !b && i[1][g],
                    i = function() {
                        !b && me(k - S) > 20 && (x = a || me(w - C) / me(k - S)), h = (m - w) / x + k, l = d["plot" + (t ? "Width" : "Height")] / x
                    };
                i(), e = h, e < v.min ? (e = v.min, c = !0) : e + l > v.max && (e = v.max - l, c = !0), c ? (w -= .8 * (w - r[p][0]), b || (C -= .8 * (C - r[p][1])), i()) : r[p] = [w, C], y || (o[p] = h - m, o[f] = l), o = y ? 1 / x : x, s[f] = l, s[p] = e, n[y ? t ? "scaleY" : "scaleX" : "scale" + u] = x, n["translate" + u] = o * m + (w - o * k)
            },
            pinch: function(e) {
                var i = this,
                    n = i.chart,
                    s = i.pinchDown,
                    o = i.followTouchMove,
                    r = e.touches,
                    a = r.length,
                    l = i.lastValidTouch,
                    h = i.hasZoom,
                    c = i.selectionMarker,
                    d = {},
                    p = 1 === a && (i.inClass(e.target, "highcharts-tracker") && n.runTrackerClick || n.runChartClick),
                    g = {};
                (h || o) && !p && e.preventDefault(), Ke(r, function(t) {
                    return i.normalize(t)
                }), "touchstart" === e.type ? ($e(r, function(t, e) {
                    s[e] = {
                        chartX: t.chartX,
                        chartY: t.chartY
                    }
                }), l.x = [s[0].chartX, s[1] && s[1].chartX], l.y = [s[0].chartY, s[1] && s[1].chartY], $e(n.axes, function(t) {
                    if (t.zoomEnabled) {
                        var e = n.bounds[t.horiz ? "h" : "v"],
                            i = t.minPixelPadding,
                            s = t.toPixels(u(t.options.min, t.dataMin)),
                            o = t.toPixels(u(t.options.max, t.dataMax)),
                            r = fe(s, o),
                            s = ge(s, o);
                        e.min = fe(t.pos, r - i), e.max = ge(t.pos + t.len, s + i)
                    }
                })) : s.length && (c || (i.selectionMarker = c = t({
                    destroy: ze
                }, n.plotBox)), i.pinchTranslate(s, r, d, c, g, l), i.hasPinched = h, i.scaleGroups(d, g), !h && o && 1 === a && this.runPointActions(i.normalize(e)))
            },
            onContainerTouchStart: function(t) {
                var e = this.chart;
                ui = e.index, 1 === t.touches.length ? (t = this.normalize(t), e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) ? (this.runPointActions(t), this.pinch(t)) : this.reset()) : 2 === t.touches.length && this.pinch(t)
            },
            onContainerTouchMove: function(t) {
                (1 === t.touches.length || 2 === t.touches.length) && this.pinch(t)
            },
            onDocumentTouchEnd: function(t) {
                He[ui] && He[ui].pointer.drop(t)
            }
        }), he.PointerEvent || he.MSPointerEvent) {
        var fi = {},
            mi = !!he.PointerEvent,
            xi = function() {
                var t, e = [];
                e.item = function(t) {
                    return this[t]
                };
                for (t in fi) fi.hasOwnProperty(t) && e.push({
                    pageX: fi[t].pageX,
                    pageY: fi[t].pageY,
                    target: fi[t].target
                });
                return e
            },
            yi = function(t, e, i, n) {
                t = t.originalEvent || t, "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !He[ui] || (n(t), n = He[ui].pointer, n[e]({
                    type: i,
                    target: t.currentTarget,
                    preventDefault: ze,
                    touches: xi()
                }))
            };
        t(gi.prototype, {
            onContainerPointerDown: function(t) {
                yi(t, "onContainerTouchStart", "touchstart", function(t) {
                    fi[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY,
                        target: t.currentTarget
                    }
                })
            },
            onContainerPointerMove: function(t) {
                yi(t, "onContainerTouchMove", "touchmove", function(t) {
                    fi[t.pointerId] = {
                        pageX: t.pageX,
                        pageY: t.pageY
                    }, fi[t.pointerId].target || (fi[t.pointerId].target = t.currentTarget)
                })
            },
            onDocumentPointerUp: function(t) {
                yi(t, "onContainerTouchEnd", "touchend", function(t) {
                    delete fi[t.pointerId]
                })
            },
            batchMSEvents: function(t) {
                t(this.chart.container, mi ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, mi ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(le, mi ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
            }
        }), v(gi.prototype, "init", function(t, e, i) {
            t.call(this, e, i), (this.hasZoom || this.followTouchMove) && g(e.container, {
                "-ms-touch-action": Ee,
                "touch-action": Ee
            })
        }), v(gi.prototype, "setDOMEvents", function(t) {
            t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(qe)
        }), v(gi.prototype, "destroy", function(t) {
            this.batchMSEvents(Je), t.call(this)
        })
    }
    var vi = ae.Legend = function(t, e) {
        this.init(t, e)
    };
    vi.prototype = {
        init: function(t, i) {
            var n = this,
                s = i.itemStyle,
                o = u(i.padding, 8),
                r = i.itemMarginTop || 0;
            this.options = i, i.enabled && (n.itemStyle = s, n.itemHiddenStyle = e(s, i.itemHiddenStyle), n.itemMarginTop = r, n.padding = o, n.initialItemX = o, n.initialItemY = o - 5, n.maxItemWidth = 0, n.chart = t, n.itemHeight = 0, n.lastLineHeight = 0, n.symbolWidth = u(i.symbolWidth, 16), n.pages = [], n.render(), qe(n.chart, "endResize", function() {
                n.positionCheckboxes()
            }))
        },
        colorizeItem: function(t, e) {
            var i, n = this.options,
                s = t.legendItem,
                o = t.legendLine,
                r = t.legendSymbol,
                a = this.itemHiddenStyle.color,
                n = e ? n.itemStyle.color : a,
                l = e ? t.legendColor || t.color || "#CCC" : a,
                a = t.options && t.options.marker,
                h = {
                    fill: l
                };
            if (s && s.css({
                    fill: n,
                    color: n
                }), o && o.attr({
                    stroke: l
                }), r) {
                if (a && r.isMarker)
                    for (i in h.stroke = l, a = t.convertAttribs(a)) s = a[i], s !== E && (h[i] = s);
                r.attr(h)
            }
        },
        positionItem: function(t) {
            var e = this.options,
                i = e.symbolPadding,
                e = !e.rtl,
                n = t._legendItemPos,
                s = n[0],
                n = n[1],
                o = t.checkbox;
            t.legendGroup && t.legendGroup.translate(e ? s : this.legendWidth - s - 2 * i - 4, n), o && (o.x = s, o.y = n)
        },
        destroyItem: function(t) {
            var e = t.checkbox;
            $e(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(e) {
                t[e] && (t[e] = t[e].destroy())
            }), e && M(t.checkbox)
        },
        destroy: function() {
            var t = this.group,
                e = this.box;
            e && (this.box = e.destroy()), t && (this.group = t.destroy())
        },
        positionCheckboxes: function(t) {
            var e, i = this.group.alignAttr,
                n = this.clipHeight || this.legendHeight;
            i && (e = i.translateY, $e(this.allItems, function(s) {
                var o, r = s.checkbox;
                r && (o = e + r.y + (t || 0) + 3, g(r, {
                    left: i.translateX + s.checkboxOffset + r.x - 20 + "px",
                    top: o + "px",
                    display: o > e - 6 && e + n - 6 > o ? "" : Ee
                }))
            }))
        },
        renderTitle: function() {
            var t = this.padding,
                e = this.options.title,
                i = 0;
            e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                zIndex: 1
            }).css(e.style).add(this.group)), t = this.title.getBBox(), i = t.height, this.offsetWidth = t.width, this.contentGroup.attr({
                translateY: i
            })), this.titleHeight = i
        },
        renderItem: function(t) {
            var i = this.chart,
                n = i.renderer,
                s = this.options,
                o = "horizontal" === s.layout,
                r = this.symbolWidth,
                a = s.symbolPadding,
                l = this.itemStyle,
                h = this.itemHiddenStyle,
                c = this.padding,
                d = o ? u(s.itemDistance, 20) : 0,
                p = !s.rtl,
                g = s.width,
                f = s.itemMarginBottom || 0,
                m = this.itemMarginTop,
                x = this.initialItemX,
                y = t.legendItem,
                v = t.series && t.series.drawLegendSymbol ? t.series : t,
                k = v.options,
                k = this.createCheckboxForItem && k && k.showCheckbox,
                w = s.useHTML;
            y || (t.legendGroup = n.g("legend-item").attr({
                zIndex: 1
            }).add(this.scrollGroup), t.legendItem = y = n.text(s.labelFormat ? b(s.labelFormat, t) : s.labelFormatter.call(t), p ? r + a : -a, this.baseline || 0, w).css(e(t.visible ? l : h)).attr({
                align: p ? "left" : "right",
                zIndex: 2
            }).add(t.legendGroup), this.baseline || (this.baseline = n.fontMetrics(l.fontSize, y).f + 3 + m, y.attr("y", this.baseline)), v.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, y, w, l, h), this.colorizeItem(t, t.visible), k && this.createCheckboxForItem(t)), n = y.getBBox(), r = t.checkboxOffset = s.itemWidth || t.legendItemWidth || r + a + n.width + d + (k ? 20 : 0), this.itemHeight = a = de(t.legendItemHeight || n.height), o && this.itemX - x + r > (g || i.chartWidth - 2 * c - x - s.x) && (this.itemX = x, this.itemY += m + this.lastLineHeight + f, this.lastLineHeight = 0), this.maxItemWidth = ge(this.maxItemWidth, r), this.lastItemY = m + this.itemY + f, this.lastLineHeight = ge(a, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], o ? this.itemX += r : (this.itemY += m + a + f, this.lastLineHeight = a), this.offsetWidth = g || ge((o ? this.itemX - x - d : r) + c, this.offsetWidth)
        },
        getAllItems: function() {
            var t = [];
            return $e(this.chart.series, function(e) {
                var i = e.options;
                u(i.showInLegend, c(i.linkedTo) ? !1 : E, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
            }), t
        },
        render: function() {
            var e, i, n, s, o = this,
                r = o.chart,
                a = r.renderer,
                l = o.group,
                h = o.box,
                c = o.options,
                d = o.padding,
                p = c.borderWidth,
                u = c.backgroundColor;
            o.itemX = o.initialItemX, o.itemY = o.initialItemY, o.offsetWidth = 0, o.lastItemY = 0, l || (o.group = l = a.g("legend").attr({
                zIndex: 7
            }).add(), o.contentGroup = a.g().attr({
                zIndex: 1
            }).add(l), o.scrollGroup = a.g().add(o.contentGroup)), o.renderTitle(), e = o.getAllItems(), S(e, function(t, e) {
                return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
            }), c.reversed && e.reverse(), o.allItems = e, o.display = i = !!e.length, $e(e, function(t) {
                o.renderItem(t)
            }), n = c.width || o.offsetWidth, s = o.lastItemY + o.lastLineHeight + o.titleHeight, s = o.handleOverflow(s), (p || u) && (n += d, s += d, h ? n > 0 && s > 0 && (h[h.isNew ? "attr" : "animate"](h.crisp({
                width: n,
                height: s
            })), h.isNew = !1) : (o.box = h = a.rect(0, 0, n, s, c.borderRadius, p || 0).attr({
                stroke: c.borderColor,
                "stroke-width": p || 0,
                fill: u || Ee
            }).add(l).shadow(c.shadow), h.isNew = !0), h[i ? "show" : "hide"]()), o.legendWidth = n, o.legendHeight = s, $e(e, function(t) {
                o.positionItem(t)
            }), i && l.align(t({
                width: n,
                height: s
            }, c), !0, "spacingBox"), r.isResizing || this.positionCheckboxes()
        },
        handleOverflow: function(t) {
            var e, i, n = this,
                s = this.chart,
                o = s.renderer,
                r = this.options,
                a = r.y,
                a = s.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - this.padding,
                l = r.maxHeight,
                h = this.clipRect,
                c = r.navigation,
                d = u(c.animation, !0),
                p = c.arrowSize || 12,
                g = this.nav,
                f = this.pages,
                m = this.allItems;
            return "horizontal" === r.layout && (a /= 2), l && (a = fe(a, l)), f.length = 0, t > a && !r.useHTML ? (this.clipHeight = e = ge(a - 20 - this.titleHeight - this.padding, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = t, $e(m, function(t, n) {
                var s = t._legendItemPos[1],
                    o = de(t.legendItem.getBBox().height),
                    r = f.length;
                (!r || s - f[r - 1] > e && (i || s) !== f[r - 1]) && (f.push(i || s), r++), n === m.length - 1 && s + o - f[r - 1] > e && f.push(s), s !== i && (i = s)
            }), h || (h = n.clipRect = o.clipRect(0, this.padding, 9999, 0), n.contentGroup.clip(h)), h.attr({
                height: e
            }), g || (this.nav = g = o.g().attr({
                zIndex: 1
            }).add(this.group), this.up = o.symbol("triangle", 0, 0, p, p).on("click", function() {
                n.scroll(-1, d)
            }).add(g), this.pager = o.text("", 15, 10).css(c.style).add(g), this.down = o.symbol("triangle-down", 0, 0, p, p).on("click", function() {
                n.scroll(1, d)
            }).add(g)), n.scroll(0), t = a) : g && (h.attr({
                height: s.chartHeight
            }), g.hide(), this.scrollGroup.attr({
                translateY: 1
            }), this.clipHeight = 0), t
        },
        scroll: function(t, e) {
            var i = this.pages,
                n = i.length,
                s = this.currentPage + t,
                o = this.clipHeight,
                r = this.options.navigation,
                a = r.activeColor,
                r = r.inactiveColor,
                l = this.pager,
                h = this.padding;
            s > n && (s = n), s > 0 && (e !== E && L(e, this.chart), this.nav.attr({
                translateX: h,
                translateY: o + this.padding + 7 + this.titleHeight,
                visibility: "visible"
            }), this.up.attr({
                fill: 1 === s ? r : a
            }).css({
                cursor: 1 === s ? "default" : "pointer"
            }), l.attr({
                text: s + "/" + n
            }), this.down.attr({
                x: 18 + this.pager.getBBox().width,
                fill: s === n ? r : a
            }).css({
                cursor: s === n ? "default" : "pointer"
            }), i = -i[s - 1] + this.initialItemY, this.scrollGroup.animate({
                translateY: i
            }), this.currentPage = s, this.positionCheckboxes(i))
        }
    }, Fe = ae.LegendSymbolMixin = {
        drawRectangle: function(t, e) {
            var i = t.options.symbolHeight || 12;
            e.legendSymbol = this.chart.renderer.rect(0, t.baseline - 5 - i / 2, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                zIndex: 3
            }).add(e.legendGroup)
        },
        drawLineMarker: function(t) {
            var e, i = this.options,
                n = i.marker;
            e = t.symbolWidth;
            var s, o = this.chart.renderer,
                r = this.legendGroup,
                t = t.baseline - de(.3 * o.fontMetrics(t.options.itemStyle.fontSize, this.legendItem).b);
            i.lineWidth && (s = {
                "stroke-width": i.lineWidth
            }, i.dashStyle && (s.dashstyle = i.dashStyle), this.legendLine = o.path(["M", 0, t, "L", e, t]).attr(s).add(r)), n && n.enabled !== !1 && (i = n.radius, this.legendSymbol = e = o.symbol(this.symbol, e / 2 - i, t - i, 2 * i, 2 * i).add(r), e.isMarker = !0)
        }
    }, (/Trident\/7\.0/.test(ke) || Te) && v(vi.prototype, "positionItem", function(t, e) {
        var i = this,
            n = function() {
                e._legendItemPos && t.call(i, e)
            };
        n(), setTimeout(n)
    }), z.prototype = {
        init: function(t, i) {
            var n, s = t.series;
            t.series = null, n = e(Y, t), n.series = t.series = s, this.userOptions = t, s = n.chart, this.margin = this.splashArray("margin", s), this.spacing = this.splashArray("spacing", s);
            var o = s.events;
            this.bounds = {
                h: {},
                v: {}
            }, this.callback = i, this.isResizing = 0, this.options = n, this.axes = [], this.series = [], this.hasCartesianSeries = s.showAxes;
            var r, a = this;
            if (a.index = He.length, He.push(a), _e++, s.reflow !== !1 && qe(a, "load", function() {
                    a.initReflow()
                }), o)
                for (r in o) qe(a, r, o[r]);
            a.xAxis = [], a.yAxis = [], a.animation = De ? !1 : u(s.animation, !0), a.pointCount = a.colorCounter = a.symbolCounter = 0, a.firstRender()
        },
        initSeries: function(t) {
            var e = this.options.chart;
            return (e = Ge[t.type || e.type || e.defaultSeriesType]) || $(17, !0), e = new e, e.init(this, t), e
        },
        isInsidePlot: function(t, e, i) {
            var n = i ? e : t,
                t = i ? t : e;
            return n >= 0 && n <= this.plotWidth && t >= 0 && t <= this.plotHeight
        },
        adjustTickAmounts: function() {
            this.options.chart.alignTicks !== !1 && $e(this.axes, function(t) {
                t.adjustTickAmount()
            }), this.maxTicks = null
        },
        redraw: function(e) {
            var i, n, s = this.axes,
                o = this.series,
                r = this.pointer,
                a = this.legend,
                l = this.isDirtyLegend,
                h = this.hasCartesianSeries,
                c = this.isDirtyBox,
                d = o.length,
                p = d,
                u = this.renderer,
                g = u.isHidden(),
                f = [];
            for (L(e, this), g && this.cloneRenderTo(), this.layOutTitles(); p--;)
                if (e = o[p], e.options.stacking && (i = !0, e.isDirty)) {
                    n = !0;
                    break
                }
            if (n)
                for (p = d; p--;) e = o[p], e.options.stacking && (e.isDirty = !0);
            $e(o, function(t) {
                t.isDirty && "point" === t.options.legendType && (l = !0)
            }), l && a.options.enabled && (a.render(), this.isDirtyLegend = !1), i && this.getStacks(), h && (this.isResizing || (this.maxTicks = null, $e(s, function(t) {
                t.setScale()
            })), this.adjustTickAmounts()), this.getMargins(), h && ($e(s, function(t) {
                t.isDirty && (c = !0)
            }), $e(s, function(e) {
                e.isDirtyExtremes && (e.isDirtyExtremes = !1, f.push(function() {
                    Qe(e, "afterSetExtremes", t(e.eventArgs, e.getExtremes())), delete e.eventArgs
                })), (c || i) && e.redraw()
            })), c && this.drawChartBox(), $e(o, function(t) {
                t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
            }), r && r.reset(!0), u.draw(), Qe(this, "redraw"), g && this.cloneRenderTo(!0), $e(f, function(t) {
                t.call()
            })
        },
        get: function(t) {
            var e, i, n = this.axes,
                s = this.series;
            for (e = 0; e < n.length; e++)
                if (n[e].options.id === t) return n[e];
            for (e = 0; e < s.length; e++)
                if (s[e].options.id === t) return s[e];
            for (e = 0; e < s.length; e++)
                for (i = s[e].points || [], n = 0; n < i.length; n++)
                    if (i[n].id === t) return i[n];
            return null
        },
        getAxes: function() {
            var t = this,
                e = this.options,
                i = e.xAxis = p(e.xAxis || {}),
                e = e.yAxis = p(e.yAxis || {});
            $e(i, function(t, e) {
                t.index = e, t.isX = !0
            }), $e(e, function(t, e) {
                t.index = e
            }), i = i.concat(e), $e(i, function(e) {
                new O(t, e)
            }), t.adjustTickAmounts()
        },
        getSelectedPoints: function() {
            var t = [];
            return $e(this.series, function(e) {
                t = t.concat(Ue(e.points || [], function(t) {
                    return t.selected
                }))
            }), t
        },
        getSelectedSeries: function() {
            return Ue(this.series, function(t) {
                return t.selected
            })
        },
        getStacks: function() {
            var t = this;
            $e(t.yAxis, function(t) {
                t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
            }), $e(t.series, function(e) {
                !e.options.stacking || e.visible !== !0 && t.options.chart.ignoreHiddenSeries !== !1 || (e.stackKey = e.type + u(e.options.stack, ""))
            })
        },
        setTitle: function(t, i, n) {
            var s, o, r = this,
                a = r.options;
            o = a.title = e(a.title, t), s = a.subtitle = e(a.subtitle, i), a = s, $e([
                ["title", t, o],
                ["subtitle", i, a]
            ], function(t) {
                var e = t[0],
                    i = r[e],
                    n = t[1],
                    t = t[2];
                i && n && (r[e] = i = i.destroy()), t && t.text && !i && (r[e] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                    align: t.align,
                    "class": "highcharts-" + e,
                    zIndex: t.zIndex || 4
                }).css(t.style).add())
            }), r.layOutTitles(n)
        },
        layOutTitles: function(e) {
            var i = 0,
                n = this.title,
                s = this.subtitle,
                o = this.options,
                r = o.title,
                o = o.subtitle,
                a = this.renderer,
                l = this.spacingBox.width - 44;
            !n || (n.css({
                width: (r.width || l) + "px"
            }).align(t({
                y: a.fontMetrics(r.style.fontSize, n).b - 3
            }, r), !1, "spacingBox"), r.floating || r.verticalAlign) || (i = n.getBBox().height), s && (s.css({
                width: (o.width || l) + "px"
            }).align(t({
                y: i + (r.margin - 13) + a.fontMetrics(r.style.fontSize, s).b
            }, o), !1, "spacingBox"), !o.floating && !o.verticalAlign && (i = ue(i + s.getBBox().height))), n = this.titleOffset !== i, this.titleOffset = i, !this.isDirtyBox && n && (this.isDirtyBox = n, this.hasRendered && u(e, !0) && this.isDirtyBox && this.redraw())
        },
        getChartSize: function() {
            var t = this.options.chart,
                e = t.width,
                t = t.height,
                i = this.renderToClone || this.renderTo;
            c(e) || (this.containerWidth = Ne(i, "width")), c(t) || (this.containerHeight = Ne(i, "height")), this.chartWidth = ge(0, e || this.containerWidth || 600), this.chartHeight = ge(0, u(t, this.containerHeight > 19 ? this.containerHeight : 400))
        },
        cloneRenderTo: function(t) {
            var e = this.renderToClone,
                i = this.container;
            t ? e && (this.renderTo.appendChild(i), M(e), delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = e = this.renderTo.cloneNode(0), g(e, {
                position: "absolute",
                top: "-9999px",
                display: "block"
            }), e.style.setProperty && e.style.setProperty("display", "block", "important"), le.body.appendChild(e), i && e.appendChild(i))
        },
        getContainer: function() {
            var e, s, o, r, a = this.options.chart;
            this.renderTo = e = a.renderTo, r = "highcharts-" + Oe++, n(e) && (this.renderTo = e = le.getElementById(e)), e || $(13, !0), s = i(d(e, "data-highcharts-chart")), !isNaN(s) && He[s] && He[s].hasRendered && He[s].destroy(), d(e, "data-highcharts-chart", this.index), e.innerHTML = "", !a.skipClone && !e.offsetWidth && this.cloneRenderTo(), this.getChartSize(), s = this.chartWidth, o = this.chartHeight, this.container = e = f(Re, {
                className: "highcharts-container" + (a.className ? " " + a.className : ""),
                id: r
            }, t({
                position: "relative",
                overflow: "hidden",
                width: s + "px",
                height: o + "px",
                textAlign: "left",
                lineHeight: "normal",
                zIndex: 0,
                "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
            }, a.style), this.renderToClone || e), this._cursor = e.style.cursor, this.renderer = a.forExport ? new li(e, s, o, a.style, !0) : new W(e, s, o, a.style), De && this.renderer.create(this, e, s, o)
        },
        getMargins: function() {
            var t, e = this.spacing,
                i = this.legend,
                n = this.margin,
                s = this.options.legend,
                o = u(s.margin, 20),
                r = s.x,
                a = s.y,
                l = s.align,
                h = s.verticalAlign,
                d = this.titleOffset;
            this.resetMargins(), t = this.axisOffset, d && !c(n[0]) && (this.plotTop = ge(this.plotTop, d + this.options.title.margin + e[0])), i.display && !s.floating && ("right" === l ? c(n[1]) || (this.marginRight = ge(this.marginRight, i.legendWidth - r + o + e[1])) : "left" === l ? c(n[3]) || (this.plotLeft = ge(this.plotLeft, i.legendWidth + r + o + e[3])) : "top" === h ? c(n[0]) || (this.plotTop = ge(this.plotTop, i.legendHeight + a + o + e[0])) : "bottom" !== h || c(n[2]) || (this.marginBottom = ge(this.marginBottom, i.legendHeight - a + o + e[2]))), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), this.hasCartesianSeries && $e(this.axes, function(t) {
                t.getOffset()
            }), c(n[3]) || (this.plotLeft += t[3]), c(n[0]) || (this.plotTop += t[0]), c(n[2]) || (this.marginBottom += t[2]), c(n[1]) || (this.marginRight += t[1]), this.setChartSize()
        },
        reflow: function(t) {
            var e = this,
                i = e.options.chart,
                n = e.renderTo,
                s = i.width || Ne(n, "width"),
                o = i.height || Ne(n, "height"),
                i = t ? t.target : he,
                n = function() {
                    e.container && (e.setSize(s, o, !1), e.hasUserSize = null)
                };
            e.hasUserSize || !s || !o || i !== he && i !== le || ((s !== e.containerWidth || o !== e.containerHeight) && (clearTimeout(e.reflowTimeout), t ? e.reflowTimeout = setTimeout(n, 100) : n()), e.containerWidth = s, e.containerHeight = o)
        },
        initReflow: function() {
            var t = this,
                e = function(e) {
                    t.reflow(e)
                };
            qe(he, "resize", e), qe(t, "destroy", function() {
                Je(he, "resize", e)
            })
        },
        setSize: function(t, e, i) {
            var n, s, o, r = this;
            r.isResizing += 1, o = function() {
                r && Qe(r, "endResize", null, function() {
                    r.isResizing -= 1
                })
            }, L(i, r), r.oldChartHeight = r.chartHeight, r.oldChartWidth = r.chartWidth, c(t) && (r.chartWidth = n = ge(0, de(t)), r.hasUserSize = !!n), c(e) && (r.chartHeight = s = ge(0, de(e))), (N ? ei : g)(r.container, {
                width: n + "px",
                height: s + "px"
            }, N), r.setChartSize(!0), r.renderer.setSize(n, s, i), r.maxTicks = null, $e(r.axes, function(t) {
                t.isDirty = !0, t.setScale()
            }), $e(r.series, function(t) {
                t.isDirty = !0
            }), r.isDirtyLegend = !0, r.isDirtyBox = !0, r.layOutTitles(), r.getMargins(), r.redraw(i), r.oldChartHeight = null, Qe(r, "resize"), N === !1 ? o() : setTimeout(o, N && N.duration || 500)
        },
        setChartSize: function(t) {
            var e, i, n, s, o = this.inverted,
                r = this.renderer,
                a = this.chartWidth,
                l = this.chartHeight,
                h = this.options.chart,
                c = this.spacing,
                d = this.clipOffset;
            this.plotLeft = e = de(this.plotLeft), this.plotTop = i = de(this.plotTop), this.plotWidth = n = ge(0, de(a - e - this.marginRight)), this.plotHeight = s = ge(0, de(l - i - this.marginBottom)), this.plotSizeX = o ? s : n, this.plotSizeY = o ? n : s, this.plotBorderWidth = h.plotBorderWidth || 0, this.spacingBox = r.spacingBox = {
                x: c[3],
                y: c[0],
                width: a - c[3] - c[1],
                height: l - c[0] - c[2]
            }, this.plotBox = r.plotBox = {
                x: e,
                y: i,
                width: n,
                height: s
            }, a = 2 * pe(this.plotBorderWidth / 2), o = ue(ge(a, d[3]) / 2), r = ue(ge(a, d[0]) / 2), this.clipBox = {
                x: o,
                y: r,
                width: pe(this.plotSizeX - ge(a, d[1]) / 2 - o),
                height: ge(0, pe(this.plotSizeY - ge(a, d[2]) / 2 - r))
            }, t || $e(this.axes, function(t) {
                t.setAxisSize(), t.setAxisTranslation()
            })
        },
        resetMargins: function() {
            var t = this.spacing,
                e = this.margin;
            this.plotTop = u(e[0], t[0]), this.marginRight = u(e[1], t[1]), this.marginBottom = u(e[2], t[2]), this.plotLeft = u(e[3], t[3]), this.axisOffset = [0, 0, 0, 0], this.clipOffset = [0, 0, 0, 0]
        },
        drawChartBox: function() {
            var t, e = this.options.chart,
                i = this.renderer,
                n = this.chartWidth,
                s = this.chartHeight,
                o = this.chartBackground,
                r = this.plotBackground,
                a = this.plotBorder,
                l = this.plotBGImage,
                h = e.borderWidth || 0,
                c = e.backgroundColor,
                d = e.plotBackgroundColor,
                p = e.plotBackgroundImage,
                u = e.plotBorderWidth || 0,
                g = this.plotLeft,
                f = this.plotTop,
                m = this.plotWidth,
                x = this.plotHeight,
                y = this.plotBox,
                v = this.clipRect,
                b = this.clipBox;
            t = h + (e.shadow ? 8 : 0), (h || c) && (o ? o.animate(o.crisp({
                width: n - t,
                height: s - t
            })) : (o = {
                fill: c || Ee
            }, h && (o.stroke = e.borderColor, o["stroke-width"] = h), this.chartBackground = i.rect(t / 2, t / 2, n - t, s - t, e.borderRadius, h).attr(o).addClass("highcharts-background").add().shadow(e.shadow))), d && (r ? r.animate(y) : this.plotBackground = i.rect(g, f, m, x, 0).attr({
                fill: d
            }).add().shadow(e.plotShadow)), p && (l ? l.animate(y) : this.plotBGImage = i.image(p, g, f, m, x).add()), v ? v.animate({
                width: b.width,
                height: b.height
            }) : this.clipRect = i.clipRect(b), u && (a ? a.animate(a.crisp({
                x: g,
                y: f,
                width: m,
                height: x
            })) : this.plotBorder = i.rect(g, f, m, x, 0, -u).attr({
                stroke: e.plotBorderColor,
                "stroke-width": u,
                fill: Ee,
                zIndex: 1
            }).add()), this.isDirtyBox = !1
        },
        propFromSeries: function() {
            var t, e, i, n = this,
                s = n.options.chart,
                o = n.options.series;
            $e(["inverted", "angular", "polar"], function(r) {
                for (t = Ge[s.type || s.defaultSeriesType], i = n[r] || s[r] || t && t.prototype[r], e = o && o.length; !i && e--;)(t = Ge[o[e].type]) && t.prototype[r] && (i = !0);
                n[r] = i
            })
        },
        linkSeries: function() {
            var t = this,
                e = t.series;
            $e(e, function(t) {
                t.linkedSeries.length = 0
            }), $e(e, function(e) {
                var i = e.options.linkedTo;
                n(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && (i.linkedSeries.push(e), e.linkedParent = i)
            })
        },
        renderSeries: function() {
            $e(this.series, function(t) {
                t.translate(), t.setTooltipPoints && t.setTooltipPoints(), t.render()
            })
        },
        renderLabels: function() {
            var e = this,
                n = e.options.labels;
            n.items && $e(n.items, function(s) {
                var o = t(n.style, s.style),
                    r = i(o.left) + e.plotLeft,
                    a = i(o.top) + e.plotTop + 12;
                delete o.left, delete o.top, e.renderer.text(s.html, r, a).attr({
                    zIndex: 2
                }).css(o).add()
            })
        },
        render: function() {
            var t = this.axes,
                e = this.renderer,
                i = this.options;
            this.setTitle(), this.legend = new vi(this, i.legend), this.getStacks(), $e(t, function(t) {
                t.setScale()
            }), this.getMargins(), this.maxTicks = null, $e(t, function(t) {
                t.setTickPositions(!0), t.setMaxTicks()
            }), this.adjustTickAmounts(), this.getMargins(), this.drawChartBox(), this.hasCartesianSeries && $e(t, function(t) {
                t.render()
            }), this.seriesGroup || (this.seriesGroup = e.g("series-group").attr({
                zIndex: 3
            }).add()), this.renderSeries(), this.renderLabels(), this.showCredits(i.credits), this.hasRendered = !0
        },
        showCredits: function(t) {
            t.enabled && !this.credits && (this.credits = this.renderer.text(t.text, 0, 0).on("click", function() {
                t.href && (location.href = t.href)
            }).attr({
                align: t.position.align,
                zIndex: 8
            }).css(t.style).add().align(t.position))
        },
        destroy: function() {
            var t, e = this,
                i = e.axes,
                n = e.series,
                s = e.container,
                o = s && s.parentNode;
            for (Qe(e, "destroy"), He[e.index] = E, _e--, e.renderTo.removeAttribute("data-highcharts-chart"), Je(e), t = i.length; t--;) i[t] = i[t].destroy();
            for (t = n.length; t--;) n[t] = n[t].destroy();
            $e("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(t) {
                var i = e[t];
                i && i.destroy && (e[t] = i.destroy())
            }), s && (s.innerHTML = "", Je(s), o && M(s));
            for (t in e) delete e[t]
        },
        isReadyToRender: function() {
            var t = this;
            return !Le && he == he.top && "complete" !== le.readyState || De && !he.canvg ? (De ? di.push(function() {
                t.firstRender()
            }, t.options.global.canvasToolsURL) : le.attachEvent("onreadystatechange", function() {
                le.detachEvent("onreadystatechange", t.firstRender), "complete" === le.readyState && t.firstRender()
            }), !1) : !0
        },
        firstRender: function() {
            var t = this,
                e = t.options,
                i = t.callback;
            t.isReadyToRender() && (t.getContainer(), Qe(t, "init"), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes(), $e(e.series || [], function(e) {
                t.initSeries(e)
            }), t.linkSeries(), Qe(t, "beforeRender"), ae.Pointer && (t.pointer = new gi(t, e)), t.render(), t.renderer.draw(), i && i.apply(t, [t]), $e(t.callbacks, function(e) {
                e.apply(t, [t])
            }), t.cloneRenderTo(!0), Qe(t, "load"))
        },
        splashArray: function(t, e) {
            var i = e[t],
                i = s(i) ? i : [i, i, i, i];
            return [u(e[t + "Top"], i[0]), u(e[t + "Right"], i[1]), u(e[t + "Bottom"], i[2]), u(e[t + "Left"], i[3])]
        }
    }, z.prototype.callbacks = [], ci = ae.CenteredSeriesMixin = {
        getCenter: function() {
            var t, e, n = this.options,
                s = this.chart,
                o = 2 * (n.slicedOffset || 0),
                r = s.plotWidth - 2 * o,
                a = s.plotHeight - 2 * o,
                s = n.center,
                n = [u(s[0], "50%"), u(s[1], "50%"), n.size || "100%", n.innerSize || 0],
                l = fe(r, a);
            return Ke(n, function(n, s) {
                return e = /%$/.test(n), t = 2 > s || 2 === s && e, (e ? [r, a, l, l][s] * i(n) / 100 : n) + (t ? o : 0)
            })
        }
    };
    var bi = function() {};
    bi.prototype = {
        init: function(t, e, i) {
            return this.series = t, this.applyOptions(e, i), this.pointAttr = {}, t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter++], t.colorCounter === e.length) && (t.colorCounter = 0), t.chart.pointCount++, this
        },
        applyOptions: function(e, i) {
            var n = this.series,
                s = n.options.pointValKey || n.pointValKey,
                e = bi.prototype.optionsToObject.call(this, e);
            return t(this, e), this.options = this.options ? t(this.options, e) : e, s && (this.y = this[s]), this.x === E && n && (this.x = i === E ? n.autoIncrement() : i), this
        },
        optionsToObject: function(t) {
            var e = {},
                i = this.series,
                n = i.pointArrayMap || ["y"],
                s = n.length,
                r = 0,
                a = 0;
            if ("number" == typeof t || null === t) e[n[0]] = t;
            else if (o(t))
                for (t.length > s && (i = typeof t[0], "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]), r++); s > a;) e[n[a++]] = t[r++];
            else "object" == typeof t && (e = t, t.dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
            return e
        },
        destroy: function() {
            var t, e = this.series.chart,
                i = e.hoverPoints;
            e.pointCount--, i && (this.setState(), h(i, this), !i.length) && (e.hoverPoints = null), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Je(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this);
            for (t in this) this[t] = null
        },
        destroyElements: function() {
            for (var t, e = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), i = 6; i--;) t = e[i], this[t] && (this[t] = this[t].destroy())
        },
        getLabelConfig: function() {
            return {
                x: this.category,
                y: this.y,
                key: this.name || this.category,
                series: this.series,
                point: this,
                percentage: this.percentage,
                total: this.total || this.stackTotal
            }
        },
        tooltipFormatter: function(t) {
            var e = this.series,
                i = e.tooltipOptions,
                n = u(i.valueDecimals, ""),
                s = i.valuePrefix || "",
                o = i.valueSuffix || "";
            return $e(e.pointArrayMap || ["y"], function(e) {
                e = "{point." + e, (s || o) && (t = t.replace(e + "}", s + e + "}" + o)), t = t.replace(e + "}", e + ":,." + n + "f}")
            }), b(t, {
                point: this,
                series: this.series
            })
        },
        firePointEvent: function(t, e, i) {
            var n = this,
                s = this.series.options;
            (s.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(), "click" === t && s.allowPointSelect && (i = function(t) {
                n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
            }), Qe(this, t, e, i)
        }
    };
    var ki = function() {};
    ki.prototype = {
        isCartesian: !0,
        type: "line",
        pointClass: bi,
        sorted: !0,
        requireSorting: !0,
        pointAttrToOptions: {
            stroke: "lineColor",
            "stroke-width": "lineWidth",
            fill: "fillColor",
            r: "radius"
        },
        axisTypes: ["xAxis", "yAxis"],
        colorCounter: 0,
        parallelArrays: ["x", "y"],
        init: function(e, i) {
            var n, s, o = this,
                r = e.series,
                a = function(t, e) {
                    return u(t.options.index, t._i) - u(e.options.index, e._i)
                };
            o.chart = e, o.options = i = o.setOptions(i), o.linkedSeries = [], o.bindAxes(), t(o, {
                name: i.name,
                state: "",
                pointAttr: {},
                visible: i.visible !== !1,
                selected: i.selected === !0
            }), De && (i.animation = !1), s = i.events;
            for (n in s) qe(o, n, s[n]);
            (s && s.click || i.point && i.point.events && i.point.events.click || i.allowPointSelect) && (e.runTrackerClick = !0), o.getColor(), o.getSymbol(), $e(o.parallelArrays, function(t) {
                o[t + "Data"] = []
            }), o.setData(i.data, !1), o.isCartesian && (e.hasCartesianSeries = !0), r.push(o), o._i = r.length - 1, S(r, a), this.yAxis && S(this.yAxis.series, a), $e(r, function(t, e) {
                t.index = e, t.name = t.name || "Series " + (e + 1)
            })
        },
        bindAxes: function() {
            var t, e = this,
                i = e.options,
                n = e.chart;
            $e(e.axisTypes || [], function(s) {
                $e(n[s], function(n) {
                    t = n.options, (i[s] === t.index || i[s] !== E && i[s] === t.id || i[s] === E && 0 === t.index) && (n.series.push(e), e[s] = n, n.isDirty = !0)
                }), !e[s] && e.optionalAxis !== s && $(18, !0)
            })
        },
        updateParallelArrays: function(t, e) {
            var i = t.series,
                n = arguments;
            $e(i.parallelArrays, "number" == typeof e ? function(n) {
                var s = "y" === n && i.toYData ? i.toYData(t) : t[n];
                i[n + "Data"][e] = s
            } : function(t) {
                Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(n, 2))
            })
        },
        autoIncrement: function() {
            var t = this.options,
                e = this.xIncrement,
                e = u(e, t.pointStart, 0);
            return this.pointInterval = u(this.pointInterval, t.pointInterval, 1), this.xIncrement = e + this.pointInterval, e
        },
        getSegments: function() {
            var t, e = -1,
                i = [],
                n = this.points,
                s = n.length;
            if (s)
                if (this.options.connectNulls) {
                    for (t = s; t--;) null === n[t].y && n.splice(t, 1);
                    n.length && (i = [n])
                } else $e(n, function(t, o) {
                    null === t.y ? (o > e + 1 && i.push(n.slice(e + 1, o)), e = o) : o === s - 1 && i.push(n.slice(e + 1, o + 1))
                });
            this.segments = i
        },
        setOptions: function(t) {
            var i = this.chart,
                n = i.options.plotOptions,
                i = i.userOptions || {},
                s = i.plotOptions || {},
                o = n[this.type];
            return this.userOptions = t, n = e(o, n.series, t), this.tooltipOptions = e(Y.tooltip, Y.plotOptions[this.type].tooltip, i.tooltip, s.series && s.series.tooltip, s[this.type] && s[this.type].tooltip, t.tooltip), null === o.marker && delete n.marker, n
        },
        getCyclic: function(t, e, i) {
            var n = this.userOptions,
                s = "_" + t + "Index",
                o = t + "Counter";
            e || (c(n[s]) ? e = n[s] : (n[s] = e = this.chart[o] % i.length, this.chart[o] += 1), e = i[e]), this[t] = e
        },
        getColor: function() {
            this.options.colorByPoint || this.getCyclic("color", this.options.color || ni[this.type].color, this.chart.options.colors)
        },
        getSymbol: function() {
            var t = this.options.marker;
            this.getCyclic("symbol", t.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (t.radius = 0)
        },
        drawLegendSymbol: Fe.drawLineMarker,
        setData: function(t, e, i, s) {
            var a, l = this,
                h = l.points,
                c = h && h.length || 0,
                d = l.options,
                p = l.chart,
                g = null,
                f = l.xAxis,
                m = f && !!f.categories,
                x = l.tooltipPoints,
                y = d.turboThreshold,
                v = this.xData,
                b = this.yData,
                k = (a = l.pointArrayMap) && a.length,
                t = t || [];
            if (a = t.length, e = u(e, !0), s === !1 || !a || c !== a || l.cropped || l.hasGroupedData) {
                if (l.xIncrement = null, l.pointRange = m ? 1 : d.pointRange, l.colorCounter = 0, $e(this.parallelArrays, function(t) {
                        l[t + "Data"].length = 0
                    }), y && a > y) {
                    for (i = 0; null === g && a > i;) g = t[i], i++;
                    if (r(g)) {
                        for (m = u(d.pointStart, 0), d = u(d.pointInterval, 1), i = 0; a > i; i++) v[i] = m, b[i] = t[i], m += d;
                        l.xIncrement = m
                    } else if (o(g))
                        if (k)
                            for (i = 0; a > i; i++) d = t[i], v[i] = d[0], b[i] = d.slice(1, k + 1);
                        else
                            for (i = 0; a > i; i++) d = t[i], v[i] = d[0], b[i] = d[1];
                    else $(12)
                } else
                    for (i = 0; a > i; i++) t[i] !== E && (d = {
                        series: l
                    }, l.pointClass.prototype.applyOptions.apply(d, [t[i]]), l.updateParallelArrays(d, i), m && d.name) && (f.names[d.x] = d.name);
                for (n(b[0]) && $(14, !0), l.data = [], l.options.data = t, i = c; i--;) h[i] && h[i].destroy && h[i].destroy();
                x && (x.length = 0), f && (f.minRange = f.userMinRange), l.isDirty = l.isDirtyData = p.isDirtyBox = !0, i = !1
            } else $e(t, function(t, e) {
                h[e].update(t, !1)
            });
            e && p.redraw(i)
        },
        processData: function(t) {
            var e, i = this.xData,
                n = this.yData,
                s = i.length;
            e = 0;
            var o, r, a, l, h = this.xAxis,
                c = this.options,
                d = c.cropThreshold,
                p = 0,
                u = this.isCartesian;
            if (u && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !t) return !1;
            for (u && this.sorted && (!d || s > d || this.forceCrop) && (a = h.getExtremes(), l = a.min, a = a.max, i[s - 1] < l || i[0] > a ? (i = [], n = []) : (i[0] < l || i[s - 1] > a) && (e = this.cropData(this.xData, this.yData, l, a), i = e.xData, n = e.yData, e = e.start, o = !0, p = i.length)), t = i.length - 1; t >= 0; t--) s = i[t] - i[t - 1], !o && i[t] > l && i[t] < a && p++, s > 0 && (r === E || r > s) ? r = s : 0 > s && this.requireSorting && $(15);
            this.cropped = o, this.cropStart = e, this.processedXData = i, this.processedYData = n, this.activePointCount = p, null === c.pointRange && (this.pointRange = r || 1), this.closestPointRange = r
        },
        cropData: function(t, e, i, n) {
            var s, o = t.length,
                r = 0,
                a = o,
                l = u(this.cropShoulder, 1);
            for (s = 0; o > s; s++)
                if (t[s] >= i) {
                    r = ge(0, s - l);
                    break
                }
            for (; o > s; s++)
                if (t[s] > n) {
                    a = s + l;
                    break
                }
            return {
                xData: t.slice(r, a),
                yData: e.slice(r, a),
                start: r,
                end: a
            }
        },
        generatePoints: function() {
            var t, e, i, n, s = this.options.data,
                o = this.data,
                r = this.processedXData,
                a = this.processedYData,
                l = this.pointClass,
                h = r.length,
                c = this.cropStart || 0,
                d = this.hasGroupedData,
                u = [];
            for (o || d || (o = [], o.length = s.length, o = this.data = o), n = 0; h > n; n++) e = c + n, d ? u[n] = (new l).init(this, [r[n]].concat(p(a[n]))) : (o[e] ? i = o[e] : s[e] !== E && (o[e] = i = (new l).init(this, s[e], r[n])), u[n] = i);
            if (o && (h !== (t = o.length) || d))
                for (n = 0; t > n; n++) n === c && !d && (n += h), o[n] && (o[n].destroyElements(), o[n].plotX = E);
            this.data = o, this.points = u
        },
        getExtremes: function(t) {
            var e, i = this.yAxis,
                n = this.processedXData,
                s = [],
                o = 0;
            e = this.xAxis.getExtremes();
            var r, a, l, h, c = e.min,
                d = e.max,
                t = t || this.stackedYData || this.processedYData;
            for (e = t.length, h = 0; e > h; h++)
                if (a = n[h], l = t[h], r = null !== l && l !== E && (!i.isLog || l.length || l > 0), a = this.getExtremesFromAll || this.cropped || (n[h + 1] || a) >= c && (n[h - 1] || a) <= d, r && a)
                    if (r = l.length)
                        for (; r--;) null !== l[r] && (s[o++] = l[r]);
                    else s[o++] = l;
            this.dataMin = u(void 0, C(s)), this.dataMax = u(void 0, A(s))
        },
        translate: function() {
            this.processedXData || this.processData(), this.generatePoints();
            for (var t = this.options, e = t.stacking, i = this.xAxis, n = i.categories, s = this.yAxis, o = this.points, a = o.length, l = !!this.modifyValue, h = t.pointPlacement, d = "between" === h || r(h), p = t.threshold, t = 0; a > t; t++) {
                var g = o[t],
                    f = g.x,
                    m = g.y,
                    x = g.low,
                    y = e && s.stacks[(this.negStacks && p > m ? "-" : "") + this.stackKey];
                s.isLog && 0 >= m && (g.y = m = null), g.plotX = i.translate(f, 0, 0, 0, 1, h, "flags" === this.type), e && this.visible && y && y[f] && (y = y[f], m = y.points[this.index + "," + t], x = m[0], m = m[1], 0 === x && (x = u(p, s.min)), s.isLog && 0 >= x && (x = null), g.total = g.stackTotal = y.total, g.percentage = y.total && g.y / y.total * 100, g.stackY = m, y.setOffset(this.pointXOffset || 0, this.barW || 0)), g.yBottom = c(x) ? s.translate(x, 0, 1, 0, 1) : null, l && (m = this.modifyValue(m, g)), g.plotY = "number" == typeof m && 1 / 0 !== m ? s.translate(m, 0, 1, 0, 1) : E, g.clientX = d ? i.translate(f, 0, 0, 0, 1) : g.plotX, g.negative = g.y < (p || 0), g.category = n && n[g.x] !== E ? n[g.x] : g.x
            }
            this.getSegments()
        },
        animate: function(e) {
            var i, n = this.chart,
                o = n.renderer;
            i = this.options.animation;
            var r, a = this.clipBox || n.clipBox,
                l = n.inverted;
            i && !s(i) && (i = ni[this.type].animation), r = ["_sharedClip", i.duration, i.easing, a.height].join(","), e ? (e = n[r], i = n[r + "m"], e || (n[r] = e = o.clipRect(t(a, {
                width: 0
            })), n[r + "m"] = i = o.clipRect(-99, l ? -n.plotLeft : -n.plotTop, 99, l ? n.chartWidth : n.chartHeight)), this.group.clip(e), this.markerGroup.clip(i), this.sharedClipKey = r) : ((e = n[r]) && e.animate({
                width: n.plotSizeX
            }, i), n[r + "m"] && n[r + "m"].animate({
                width: n.plotSizeX + 99
            }, i), this.animate = null)
        },
        afterAnimate: function() {
            var t = this.chart,
                e = this.sharedClipKey,
                i = this.group,
                n = this.clipBox;
            i && this.options.clip !== !1 && (e && n || i.clip(n ? t.renderer.clipRect(n) : t.clipRect), this.markerGroup.clip()), Qe(this, "afterAnimate"), setTimeout(function() {
                e && t[e] && (n || (t[e] = t[e].destroy()), t[e + "m"] && (t[e + "m"] = t[e + "m"].destroy()))
            }, 100)
        },
        drawPoints: function() {
            var e, i, n, s, o, r, a, l, h, c = this.points,
                d = this.chart;
            i = this.options.marker;
            var p, g = this.pointAttr[""],
                f = this.markerGroup,
                m = u(i.enabled, this.activePointCount < .5 * this.xAxis.len / i.radius);
            if (i.enabled !== !1 || this._hasPointMarkers)
                for (s = c.length; s--;) o = c[s], i = pe(o.plotX), n = o.plotY, h = o.graphic, a = o.marker || {}, e = m && a.enabled === E || a.enabled, p = d.isInsidePlot(de(i), n, d.inverted), e && n !== E && !isNaN(n) && null !== o.y ? (e = o.pointAttr[o.selected ? "select" : ""] || g, r = e.r, a = u(a.symbol, this.symbol), l = 0 === a.indexOf("url"), h ? h[p ? "show" : "hide"](!0).animate(t({
                    x: i - r,
                    y: n - r
                }, h.symbolName ? {
                    width: 2 * r,
                    height: 2 * r
                } : {})) : p && (r > 0 || l) && (o.graphic = d.renderer.symbol(a, i - r, n - r, 2 * r, 2 * r).attr(e).add(f))) : h && (o.graphic = h.destroy())
        },
        convertAttribs: function(t, e, i, n) {
            var s, o, r = this.pointAttrToOptions,
                a = {},
                t = t || {},
                e = e || {},
                i = i || {},
                n = n || {};
            for (s in r) o = r[s], a[s] = u(t[o], e[s], i[s], n[s]);
            return a
        },
        getAttribs: function() {
            var e, i = this,
                n = i.options,
                s = ni[i.type].marker ? n.marker : n,
                o = s.states,
                r = o.hover,
                a = i.color;
            e = {
                stroke: a,
                fill: a
            };
            var l, h, d = i.points || [],
                p = [],
                u = i.pointAttrToOptions;
            h = i.hasPointSpecificOptions;
            var g = n.negativeColor,
                f = s.lineColor,
                m = s.fillColor;
            l = n.turboThreshold;
            var x;
            if (n.marker ? (r.radius = r.radius || s.radius + r.radiusPlus, r.lineWidth = r.lineWidth || s.lineWidth + r.lineWidthPlus) : r.color = r.color || ai(r.color || a).brighten(r.brightness).get(), p[""] = i.convertAttribs(s, e), $e(["hover", "select"], function(t) {
                    p[t] = i.convertAttribs(o[t], p[""])
                }), i.pointAttr = p, a = d.length, !l || l > a || h)
                for (; a--;) {
                    if (l = d[a], (s = l.options && l.options.marker || l.options) && s.enabled === !1 && (s.radius = 0), l.negative && g && (l.color = l.fillColor = g), h = n.colorByPoint || l.color, l.options)
                        for (x in u) c(s[u[x]]) && (h = !0);
                    h ? (s = s || {}, h = [], o = s.states || {}, e = o.hover = o.hover || {}, n.marker || (e.color = e.color || !l.options.color && r.color || ai(l.color).brighten(e.brightness || r.brightness).get()), e = {
                        color: l.color
                    }, m || (e.fillColor = l.color), f || (e.lineColor = l.color), h[""] = i.convertAttribs(t(e, s), p[""]), h.hover = i.convertAttribs(o.hover, p.hover, h[""]), h.select = i.convertAttribs(o.select, p.select, h[""])) : h = p, l.pointAttr = h
                }
        },
        destroy: function() {
            var t, e, i, n, s, o = this,
                r = o.chart,
                a = /AppleWebKit\/533/.test(ke),
                l = o.data || [];
            for (Qe(o, "destroy"), Je(o), $e(o.axisTypes || [], function(t) {
                    (s = o[t]) && (h(s.series, o), s.isDirty = s.forceRedraw = !0)
                }), o.legendItem && o.chart.legend.destroyItem(o), e = l.length; e--;)(i = l[e]) && i.destroy && i.destroy();
            o.points = null, clearTimeout(o.animationTimeout), $e("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(e) {
                o[e] && (t = a && "group" === e ? "hide" : "destroy", o[e][t]())
            }), r.hoverSeries === o && (r.hoverSeries = null), h(r.series, o);
            for (n in o) delete o[n]
        },
        getSegmentPath: function(t) {
            var e = this,
                i = [],
                n = e.options.step;
            return $e(t, function(s, o) {
                var r, a = s.plotX,
                    l = s.plotY;
                e.getPointSpline ? i.push.apply(i, e.getPointSpline(t, s, o)) : (i.push(o ? "L" : "M"), n && o && (r = t[o - 1], "right" === n ? i.push(r.plotX, l) : "center" === n ? i.push((r.plotX + a) / 2, r.plotY, (r.plotX + a) / 2, l) : i.push(a, r.plotY)), i.push(s.plotX, s.plotY))
            }), i
        },
        getGraphPath: function() {
            var t, e = this,
                i = [],
                n = [];
            return $e(e.segments, function(s) {
                t = e.getSegmentPath(s), s.length > 1 ? i = i.concat(t) : n.push(s[0])
            }), e.singlePoints = n, e.graphPath = i
        },
        drawGraph: function() {
            var t = this,
                e = this.options,
                i = [
                    ["graph", e.lineColor || this.color]
                ],
                n = e.lineWidth,
                s = e.dashStyle,
                o = "square" !== e.linecap,
                r = this.getGraphPath(),
                a = e.negativeColor;
            a && i.push(["graphNeg", a]), $e(i, function(i, a) {
                var l = i[0],
                    h = t[l];
                h ? (ii(h), h.animate({
                    d: r
                })) : n && r.length && (h = {
                    stroke: i[1],
                    "stroke-width": n,
                    fill: Ee,
                    zIndex: 1
                }, s ? h.dashstyle = s : o && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), t[l] = t.chart.renderer.path(r).attr(h).add(t.group).shadow(!a && e.shadow))
            })
        },
        clipNeg: function() {
            var t, e = this.options,
                i = this.chart,
                n = i.renderer,
                s = e.negativeColor || e.negativeFillColor,
                o = this.graph,
                r = this.area,
                a = this.posClip,
                l = this.negClip;
            t = i.chartWidth;
            var h = i.chartHeight,
                c = ge(t, h),
                d = this.yAxis;
            s && (o || r) && (s = de(d.toPixels(e.threshold || 0, !0)), 0 > s && (c -= s), e = {
                x: 0,
                y: 0,
                width: c,
                height: s
            }, c = {
                x: 0,
                y: s,
                width: c,
                height: c
            }, i.inverted && (e.height = c.y = i.plotWidth - s, n.isVML && (e = {
                x: i.plotWidth - s - i.plotLeft,
                y: 0,
                width: t,
                height: h
            }, c = {
                x: s + i.plotLeft - t,
                y: 0,
                width: i.plotLeft + s,
                height: t
            })), d.reversed ? (i = c, t = e) : (i = e, t = c), a ? (a.animate(i), l.animate(t)) : (this.posClip = a = n.clipRect(i), this.negClip = l = n.clipRect(t), o && this.graphNeg && (o.clip(a), this.graphNeg.clip(l)), r && (r.clip(a), this.areaNeg.clip(l))))
        },
        invertGroups: function() {
            function t() {
                var t = {
                    width: e.yAxis.len,
                    height: e.xAxis.len
                };
                $e(["group", "markerGroup"], function(i) {
                    e[i] && e[i].attr(t).invert()
                })
            }
            var e = this,
                i = e.chart;
            e.xAxis && (qe(i, "resize", t), qe(e, "destroy", function() {
                Je(i, "resize", t)
            }), t(), e.invertGroups = t)
        },
        plotGroup: function(t, e, i, n, s) {
            var o = this[t],
                r = !o;
            return r && (this[t] = o = this.chart.renderer.g(e).attr({
                visibility: i,
                zIndex: n || .1
            }).add(s)), o[r ? "attr" : "animate"](this.getPlotBox()), o
        },
        getPlotBox: function() {
            var t = this.chart,
                e = this.xAxis,
                i = this.yAxis;
            return t.inverted && (e = i, i = this.xAxis), {
                translateX: e ? e.left : t.plotLeft,
                translateY: i ? i.top : t.plotTop,
                scaleX: 1,
                scaleY: 1
            }
        },
        render: function() {
            var t, e = this,
                i = e.chart,
                n = e.options,
                s = (t = n.animation) && !!e.animate && i.renderer.isSVG && u(t.duration, 500) || 0,
                o = e.visible ? "visible" : "hidden",
                r = n.zIndex,
                a = e.hasRendered,
                l = i.seriesGroup;
            t = e.plotGroup("group", "series", o, r, l), e.markerGroup = e.plotGroup("markerGroup", "markers", o, r, l), s && e.animate(!0), e.getAttribs(), t.inverted = e.isCartesian ? i.inverted : !1, e.drawGraph && (e.drawGraph(), e.clipNeg()), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && e.options.enableMouseTracking !== !1 && e.drawTracker(), i.inverted && e.invertGroups(), n.clip !== !1 && !e.sharedClipKey && !a && t.clip(i.clipRect), s && e.animate(), a || (s ? e.animationTimeout = setTimeout(function() {
                e.afterAnimate()
            }, s) : e.afterAnimate()), e.isDirty = e.isDirtyData = !1, e.hasRendered = !0
        },
        redraw: function() {
            var t = this.chart,
                e = this.isDirtyData,
                i = this.group,
                n = this.xAxis,
                s = this.yAxis;
            i && (t.inverted && i.attr({
                width: t.plotWidth,
                height: t.plotHeight
            }), i.animate({
                translateX: u(n && n.left, t.plotLeft),
                translateY: u(s && s.top, t.plotTop)
            })), this.translate(), this.setTooltipPoints && this.setTooltipPoints(!0), this.render(), e && Qe(this, "updatedData")
        }
    }, H.prototype = {
        destroy: function() {
            T(this, this.axis)
        },
        render: function(t) {
            var e = this.options,
                i = e.format,
                i = i ? b(i, this) : e.formatter.call(this);
            this.label ? this.label.attr({
                text: i,
                visibility: "hidden"
            }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                align: this.textAlign,
                rotation: e.rotation,
                visibility: "hidden"
            }).add(t)
        },
        setOffset: function(t, e) {
            var i = this.axis,
                n = i.chart,
                s = n.inverted,
                o = this.isNegative,
                r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                i = i.translate(0),
                i = me(r - i),
                a = n.xAxis[0].translate(this.x) + t,
                l = n.plotHeight,
                o = {
                    x: s ? o ? r : r - i : a,
                    y: s ? l - a - e : o ? l - r - i : l - r,
                    width: s ? i : e,
                    height: s ? e : i
                };
            (s = this.label) && (s.align(this.alignOptions, null, o), o = s.alignAttr, s[this.options.crop === !1 || n.isInsidePlot(o.x, o.y) ? "show" : "hide"](!0))
        }
    }, O.prototype.buildStacks = function() {
        var t = this.series,
            e = u(this.options.reversedStacks, !0),
            i = t.length;
        if (!this.isXAxis) {
            for (this.usePercentage = !1; i--;) t[e ? i : t.length - i - 1].setStackedPoints();
            if (this.usePercentage)
                for (i = 0; i < t.length; i++) t[i].setPercentStacks()
        }
    }, O.prototype.renderStackTotals = function() {
        var t, e, i = this.chart,
            n = i.renderer,
            s = this.stacks,
            o = this.stackTotalGroup;
        o || (this.stackTotalGroup = o = n.g("stack-labels").attr({
            visibility: "visible",
            zIndex: 6
        }).add()), o.translate(i.plotLeft, i.plotTop);
        for (t in s)
            for (e in i = s[t]) i[e].render(o)
    }, ki.prototype.setStackedPoints = function() {
        if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
            var t, e, i, n, s, o, r = this.processedXData,
                a = this.processedYData,
                l = [],
                h = a.length,
                c = this.options,
                d = c.threshold,
                p = c.stack,
                c = c.stacking,
                u = this.stackKey,
                g = "-" + u,
                f = this.negStacks,
                m = this.yAxis,
                x = m.stacks,
                y = m.oldStacks;
            for (n = 0; h > n; n++) s = r[n], o = a[n], i = this.index + "," + n, e = (t = f && d > o) ? g : u, x[e] || (x[e] = {}), x[e][s] || (y[e] && y[e][s] ? (x[e][s] = y[e][s], x[e][s].total = null) : x[e][s] = new H(m, m.options.stackLabels, t, s, p)), e = x[e][s], e.points[i] = [e.cum || 0], "percent" === c ? (t = t ? u : g, f && x[t] && x[t][s] ? (t = x[t][s], e.total = t.total = ge(t.total, e.total) + me(o) || 0) : e.total = P(e.total + (me(o) || 0))) : e.total = P(e.total + (o || 0)), e.cum = (e.cum || 0) + (o || 0), e.points[i].push(e.cum), l[n] = e.cum;
            "percent" === c && (m.usePercentage = !0), this.stackedYData = l, m.oldStacks = {}
        }
    }, ki.prototype.setPercentStacks = function() {
        var t = this,
            e = t.stackKey,
            i = t.yAxis.stacks,
            n = t.processedXData;
        $e([e, "-" + e], function(e) {
            for (var s, o, r, a = n.length; a--;) o = n[a], s = (r = i[e] && i[e][o]) && r.points[t.index + "," + a], (o = s) && (r = r.total ? 100 / r.total : 0, o[0] = P(o[0] * r), o[1] = P(o[1] * r), t.stackedYData[a] = o[1])
        })
    }, t(z.prototype, {
        addSeries: function(t, e, i) {
            var n, s = this;
            return t && (e = u(e, !0), Qe(s, "addSeries", {
                options: t
            }, function() {
                n = s.initSeries(t), s.isDirtyLegend = !0, s.linkSeries(), e && s.redraw(i)
            })), n
        },
        addAxis: function(t, i, n, s) {
            var o = i ? "xAxis" : "yAxis",
                r = this.options;
            new O(this, e(t, {
                index: this[o].length,
                isX: i
            })), r[o] = p(r[o] || {}), r[o].push(t), u(n, !0) && this.redraw(s)
        },
        showLoading: function(e) {
            var i = this,
                n = i.options,
                s = i.loadingDiv,
                o = n.loading,
                r = function() {
                    s && g(s, {
                        left: i.plotLeft + "px",
                        top: i.plotTop + "px",
                        width: i.plotWidth + "px",
                        height: i.plotHeight + "px"
                    })
                };
            s || (i.loadingDiv = s = f(Re, {
                className: "highcharts-loading"
            }, t(o.style, {
                zIndex: 10,
                display: Ee
            }), i.container), i.loadingSpan = f("span", null, o.labelStyle, s), qe(i, "redraw", r)), i.loadingSpan.innerHTML = e || n.lang.loading, i.loadingShown || (g(s, {
                opacity: 0,
                display: ""
            }), ei(s, {
                opacity: o.style.opacity
            }, {
                duration: o.showDuration || 0
            }), i.loadingShown = !0), r()
        },
        hideLoading: function() {
            var t = this.options,
                e = this.loadingDiv;
            e && ei(e, {
                opacity: 0
            }, {
                duration: t.loading.hideDuration || 100,
                complete: function() {
                    g(e, {
                        display: Ee
                    })
                }
            }), this.loadingShown = !1
        }
    }), t(bi.prototype, {
        update: function(t, e, i) {
            var n, o = this,
                r = o.series,
                a = o.graphic,
                l = r.data,
                h = r.chart,
                c = r.options,
                e = u(e, !0);
            o.firePointEvent("update", {
                options: t
            }, function() {
                o.applyOptions(t), s(t) && (r.getAttribs(), a && (t && t.marker && t.marker.symbol ? o.graphic = a.destroy() : a.attr(o.pointAttr[o.state || ""])), t && t.dataLabels && o.dataLabel && (o.dataLabel = o.dataLabel.destroy())), n = je(o, l), r.updateParallelArrays(o, n), c.data[n] = o.options, r.isDirty = r.isDirtyData = !0, !r.fixedBox && r.hasCartesianSeries && (h.isDirtyBox = !0), "point" === c.legendType && h.legend.destroyItem(o), e && h.redraw(i)
            })
        },
        remove: function(t, e) {
            var i, n = this,
                s = n.series,
                o = s.points,
                r = s.chart,
                a = s.data;
            L(e, r), t = u(t, !0), n.firePointEvent("remove", null, function() {
                i = je(n, a), a.length === o.length && o.splice(i, 1), a.splice(i, 1), s.options.data.splice(i, 1), s.updateParallelArrays(n, "splice", i, 1), n.destroy(), s.isDirty = !0, s.isDirtyData = !0, t && r.redraw()
            })
        }
    }), t(ki.prototype, {
        addPoint: function(t, e, i, n) {
            var s, o = this.options,
                r = this.data,
                a = this.graph,
                l = this.area,
                h = this.chart,
                c = this.xAxis && this.xAxis.names,
                d = a && a.shift || 0,
                p = o.data,
                g = this.xData;
            if (L(n, h), i && $e([a, l, this.graphNeg, this.areaNeg], function(t) {
                    t && (t.shift = d + 1)
                }), l && (l.isArea = !0), e = u(e, !0), n = {
                    series: this
                }, this.pointClass.prototype.applyOptions.apply(n, [t]), a = n.x, l = g.length, this.requireSorting && a < g[l - 1])
                for (s = !0; l && g[l - 1] > a;) l--;
            this.updateParallelArrays(n, "splice", l, 0, 0), this.updateParallelArrays(n, l), c && (c[a] = n.name), p.splice(l, 0, t), s && (this.data.splice(l, 0, null), this.processData()), "point" === o.legendType && this.generatePoints(), i && (r[0] && r[0].remove ? r[0].remove(!1) : (r.shift(), this.updateParallelArrays(n, "shift"), p.shift())), this.isDirtyData = this.isDirty = !0, e && (this.getAttribs(), h.redraw())
        },
        remove: function(t, e) {
            var i = this,
                n = i.chart,
                t = u(t, !0);
            i.isRemoving || (i.isRemoving = !0, Qe(i, "remove", null, function() {
                i.destroy(), n.isDirtyLegend = n.isDirtyBox = !0, n.linkSeries(), t && n.redraw(e)
            })), i.isRemoving = !1
        },
        update: function(i, n) {
            var s, o = this,
                r = this.chart,
                a = this.userOptions,
                l = this.type,
                h = Ge[l].prototype,
                c = ["group", "markerGroup", "dataLabelsGroup"];
            $e(c, function(t) {
                c[t] = o[t], delete o[t]
            }), i = e(a, {
                animation: !1,
                index: this.index,
                pointStart: this.xData[0]
            }, {
                data: this.options.data
            }, i), this.remove(!1);
            for (s in h) h.hasOwnProperty(s) && (this[s] = E);
            t(this, Ge[i.type || l].prototype), $e(c, function(t) {
                o[t] = c[t]
            }), this.init(r, i), r.linkSeries(), u(n, !0) && r.redraw(!1)
        }
    }), t(O.prototype, {
        update: function(i, n) {
            var s = this.chart,
                i = s.options[this.coll][this.options.index] = e(this.userOptions, i);
            this.destroy(!0), this._addedPlotLB = E, this.init(s, t(i, {
                events: E
            })), s.isDirtyBox = !0, u(n, !0) && s.redraw()
        },
        remove: function(t) {
            for (var e = this.chart, i = this.coll, n = this.series, s = n.length; s--;) n[s] && n[s].remove(!1);
            h(e.axes, this), h(e[i], this), e.options[i].splice(this.options.index, 1), $e(e[i], function(t, e) {
                t.options.index = e
            }), this.destroy(), e.isDirtyBox = !0, u(t, !0) && e.redraw()
        },
        setTitle: function(t, e) {
            this.update({
                title: t
            }, e)
        },
        setCategories: function(t, e) {
            this.update({
                categories: t
            }, e)
        }
    });
    var wi = m(ki);
    Ge.line = wi, ni.area = e(Ye, {
        threshold: 0
    });
    var Si = m(ki, {
        type: "area",
        getSegments: function() {
            var t, e, i, n, s = this,
                o = [],
                r = [],
                a = [],
                l = this.xAxis,
                h = this.yAxis,
                c = h.stacks[this.stackKey],
                d = {},
                p = this.points,
                u = this.options.connectNulls;
            if (this.options.stacking && !this.cropped) {
                for (i = 0; i < p.length; i++) d[p[i].x] = p[i];
                for (n in c) null !== c[n].total && a.push(+n);
                a.sort(function(t, e) {
                    return t - e
                }), $e(a, function(n) {
                    var o, a = 0;
                    if (!u || d[n] && null !== d[n].y)
                        if (d[n]) r.push(d[n]);
                        else {
                            for (i = s.index; i <= h.series.length; i++)
                                if (o = c[n].points[i + "," + n]) {
                                    a = o[1];
                                    break
                                }
                            t = l.translate(n), e = h.toPixels(a, !0), r.push({
                                y: null,
                                plotX: t,
                                clientX: t,
                                plotY: e,
                                yBottom: e,
                                onMouseOver: ze
                            })
                        }
                }), r.length && o.push(r)
            } else ki.prototype.getSegments.call(this), o = this.segments;
            this.segments = o
        },
        getSegmentPath: function(t) {
            var e, i = ki.prototype.getSegmentPath.call(this, t),
                n = [].concat(i),
                s = this.options;
            e = i.length;
            var o, r = this.yAxis.getThreshold(s.threshold);
            if (3 === e && n.push("L", i[1], i[2]), s.stacking && !this.closedStacks)
                for (e = t.length - 1; e >= 0; e--) o = u(t[e].yBottom, r), e < t.length - 1 && s.step && n.push(t[e + 1].plotX, o), n.push(t[e].plotX, o);
            else this.closeSegment(n, t, r);
            return this.areaPath = this.areaPath.concat(n), i
        },
        closeSegment: function(t, e, i) {
            t.push("L", e[e.length - 1].plotX, i, "L", e[0].plotX, i)
        },
        drawGraph: function() {
            this.areaPath = [], ki.prototype.drawGraph.apply(this);
            var t = this,
                e = this.areaPath,
                i = this.options,
                n = i.negativeColor,
                s = i.negativeFillColor,
                o = [
                    ["area", this.color, i.fillColor]
                ];
            (n || s) && o.push(["areaNeg", n, s]), $e(o, function(n) {
                var s = n[0],
                    o = t[s];
                o ? o.animate({
                    d: e
                }) : t[s] = t.chart.renderer.path(e).attr({
                    fill: u(n[2], ai(n[1]).setOpacity(u(i.fillOpacity, .75)).get()),
                    zIndex: 0
                }).add(t.group)
            })
        },
        drawLegendSymbol: Fe.drawRectangle
    });
    Ge.area = Si, ni.spline = e(Ye), wi = m(ki, {
        type: "spline",
        getPointSpline: function(t, e, i) {
            var n, s, o, r, a = e.plotX,
                l = e.plotY,
                h = t[i - 1],
                c = t[i + 1];
            if (h && c) {
                t = h.plotY, o = c.plotX;
                var d, c = c.plotY;
                n = (1.5 * a + h.plotX) / 2.5, s = (1.5 * l + t) / 2.5, o = (1.5 * a + o) / 2.5, r = (1.5 * l + c) / 2.5, d = (r - s) * (o - a) / (o - n) + l - r, s += d, r += d, s > t && s > l ? (s = ge(t, l), r = 2 * l - s) : t > s && l > s && (s = fe(t, l), r = 2 * l - s), r > c && r > l ? (r = ge(c, l), s = 2 * l - r) : c > r && l > r && (r = fe(c, l), s = 2 * l - r), e.rightContX = o, e.rightContY = r
            }
            return i ? (e = ["C", h.rightContX || h.plotX, h.rightContY || h.plotY, n || a, s || l, a, l], h.rightContX = h.rightContY = null) : e = ["M", a, l], e
        }
    }), Ge.spline = wi, ni.areaspline = e(ni.area), Si = Si.prototype, wi = m(wi, {
        type: "areaspline",
        closedStacks: !0,
        getSegmentPath: Si.getSegmentPath,
        closeSegment: Si.closeSegment,
        drawGraph: Si.drawGraph,
        drawLegendSymbol: Fe.drawRectangle
    }), Ge.areaspline = wi, ni.column = e(Ye, {
        borderColor: "#FFFFFF",
        borderRadius: 0,
        groupPadding: .2,
        marker: null,
        pointPadding: .1,
        minPointLength: 0,
        cropThreshold: 50,
        pointRange: null,
        states: {
            hover: {
                brightness: .1,
                shadow: !1,
                halo: !1
            },
            select: {
                color: "#C0C0C0",
                borderColor: "#000000",
                shadow: !1
            }
        },
        dataLabels: {
            align: null,
            verticalAlign: null,
            y: null
        },
        stickyTracking: !1,
        tooltip: {
            distance: 6
        },
        threshold: 0
    }), wi = m(ki, {
        type: "column",
        pointAttrToOptions: {
            stroke: "borderColor",
            fill: "color",
            r: "borderRadius"
        },
        cropShoulder: 0,
        trackerGroups: ["group", "dataLabelsGroup"],
        negStacks: !0,
        init: function() {
            ki.prototype.init.apply(this, arguments);
            var t = this,
                e = t.chart;
            e.hasRendered && $e(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            })
        },
        getColumnMetrics: function() {
            var t, e, i = this,
                n = i.options,
                s = i.xAxis,
                o = i.yAxis,
                r = s.reversed,
                a = {},
                l = 0;
            n.grouping === !1 ? l = 1 : $e(i.chart.series, function(n) {
                var s = n.options,
                    r = n.yAxis;
                n.type === i.type && n.visible && o.len === r.len && o.pos === r.pos && (s.stacking ? (t = n.stackKey, a[t] === E && (a[t] = l++), e = a[t]) : s.grouping !== !1 && (e = l++), n.columnIndex = e)
            });
            var s = fe(me(s.transA) * (s.ordinalSlope || n.pointRange || s.closestPointRange || s.tickInterval || 1), s.len),
                h = s * n.groupPadding,
                d = (s - 2 * h) / l,
                p = n.pointWidth,
                n = c(p) ? (d - p) / 2 : d * n.pointPadding,
                p = u(p, d - 2 * n);
            return i.columnMetrics = {
                width: p,
                offset: n + (h + ((r ? l - (i.columnIndex || 0) : i.columnIndex) || 0) * d - s / 2) * (r ? -1 : 1)
            }
        },
        translate: function() {
            var t = this,
                e = t.chart,
                i = t.options,
                n = t.borderWidth = u(i.borderWidth, t.activePointCount > .5 * t.xAxis.len ? 0 : 1),
                s = t.yAxis,
                o = t.translatedThreshold = s.getThreshold(i.threshold),
                r = u(i.minPointLength, 5),
                a = t.getColumnMetrics(),
                l = a.width,
                h = t.barW = ge(l, 1 + 2 * n),
                c = t.pointXOffset = a.offset,
                d = -(n % 2 ? .5 : 0),
                p = n % 2 ? .5 : 1;
            e.renderer.isVML && e.inverted && (p += 1), i.pointPadding && (h = ue(h)), ki.prototype.translate.apply(t), $e(t.points, function(i) {
                var n, a = u(i.yBottom, o),
                    g = fe(ge(-999 - a, i.plotY), s.len + 999 + a),
                    f = i.plotX + c,
                    m = h,
                    x = fe(g, a);
                n = ge(g, a) - x, me(n) < r && r && (n = r, x = de(me(x - o) > r ? a - r : o - (s.translate(i.y, 0, 1, 0, 1) <= o ? r : 0))), i.barX = f, i.pointWidth = l, i.tooltipPos = e.inverted ? [s.len - g, t.xAxis.len - f - m / 2] : [f + m / 2, g], m = de(f + m) + d, f = de(f) + d, m -= f, a = me(x) < .5, n = de(x + n) + p, x = de(x) + p, n -= x, a && (x -= 1, n += 1), i.shapeType = "rect", i.shapeArgs = {
                    x: f,
                    y: x,
                    width: m,
                    height: n
                }
            })
        },
        getSymbol: ze,
        drawLegendSymbol: Fe.drawRectangle,
        drawGraph: ze,
        drawPoints: function() {
            var t, i, n = this,
                s = this.chart,
                o = n.options,
                r = s.renderer,
                a = o.animationLimit || 250;
            $e(n.points, function(l) {
                var h = l.plotY,
                    d = l.graphic;
                h === E || isNaN(h) || null === l.y ? d && (l.graphic = d.destroy()) : (t = l.shapeArgs, h = c(n.borderWidth) ? {
                    "stroke-width": n.borderWidth
                } : {}, i = l.pointAttr[l.selected ? "select" : ""] || n.pointAttr[""], d ? (ii(d), d.attr(h)[s.pointCount < a ? "animate" : "attr"](e(t))) : l.graphic = r[l.shapeType](t).attr(i).attr(h).add(n.group).shadow(o.shadow, null, o.stacking && !o.borderRadius))
            })
        },
        animate: function(t) {
            var e = this.yAxis,
                i = this.options,
                n = this.chart.inverted,
                s = {};
            Le && (t ? (s.scaleY = .001, t = fe(e.pos + e.len, ge(e.pos, e.toPixels(i.threshold))), n ? s.translateX = t - e.len : s.translateY = t, this.group.attr(s)) : (s.scaleY = 1, s[n ? "translateX" : "translateY"] = e.pos, this.group.animate(s, this.options.animation), this.animate = null))
        },
        remove: function() {
            var t = this,
                e = t.chart;
            e.hasRendered && $e(e.series, function(e) {
                e.type === t.type && (e.isDirty = !0)
            }), ki.prototype.remove.apply(t, arguments)
        }
    }), Ge.column = wi, ni.bar = e(ni.column), Si = m(wi, {
        type: "bar",
        inverted: !0
    }), Ge.bar = Si, ni.scatter = e(Ye, {
        lineWidth: 0,
        tooltip: {
            headerFormat: '<span style="color:{series.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
            pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
        },
        stickyTracking: !1
    }), Si = m(ki, {
        type: "scatter",
        sorted: !1,
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["markerGroup", "dataLabelsGroup"],
        takeOrdinalPosition: !1,
        singularTooltips: !0,
        drawGraph: function() {
            this.options.lineWidth && ki.prototype.drawGraph.call(this)
        }
    }), Ge.scatter = Si, ni.pie = e(Ye, {
        borderColor: "#FFFFFF",
        borderWidth: 1,
        center: [null, null],
        clip: !1,
        colorByPoint: !0,
        dataLabels: {
            distance: 30,
            enabled: !0,
            formatter: function() {
                return this.point.name
            }
        },
        ignoreHiddenPoint: !0,
        legendType: "point",
        marker: null,
        size: null,
        showInLegend: !1,
        slicedOffset: 10,
        states: {
            hover: {
                brightness: .1,
                shadow: !1
            }
        },
        stickyTracking: !1,
        tooltip: {
            followPointer: !0
        }
    }), Ye = {
        type: "pie",
        isCartesian: !1,
        pointClass: m(bi, {
            init: function() {
                bi.prototype.init.apply(this, arguments);
                var e, i = this;
                return i.y < 0 && (i.y = null), t(i, {
                    visible: i.visible !== !1,
                    name: u(i.name, "Slice")
                }), e = function(t) {
                    i.slice("select" === t.type)
                }, qe(i, "select", e), qe(i, "unselect", e), i
            },
            setVisible: function(t) {
                var e = this,
                    i = e.series,
                    n = i.chart;
                e.visible = e.options.visible = t = t === E ? !e.visible : t, i.options.data[je(e, i.data)] = e.options, $e(["graphic", "dataLabel", "connector", "shadowGroup"], function(i) {
                    e[i] && e[i][t ? "show" : "hide"](!0)
                }), e.legendItem && n.legend.colorizeItem(e, t), !i.isDirty && i.options.ignoreHiddenPoint && (i.isDirty = !0, n.redraw())
            },
            slice: function(t, e, i) {
                var n = this.series;
                L(i, n.chart), u(e, !0), this.sliced = this.options.sliced = t = c(t) ? t : !this.sliced, n.options.data[je(this, n.data)] = this.options, t = t ? this.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, this.graphic.animate(t), this.shadowGroup && this.shadowGroup.animate(t)
            },
            haloPath: function(t) {
                var e = this.shapeArgs,
                    i = this.series.chart;
                return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(i.plotLeft + e.x, i.plotTop + e.y, e.r + t, e.r + t, {
                    innerR: this.shapeArgs.r,
                    start: e.start,
                    end: e.end
                })
            }
        }),
        requireSorting: !1,
        noSharedTooltip: !0,
        trackerGroups: ["group", "dataLabelsGroup"],
        axisTypes: [],
        pointAttrToOptions: {
            stroke: "borderColor",
            "stroke-width": "borderWidth",
            fill: "color"
        },
        singularTooltips: !0,
        getColor: ze,
        animate: function(t) {
            var e = this,
                i = e.points,
                n = e.startAngleRad;
            t || ($e(i, function(t) {
                var i = t.graphic,
                    t = t.shapeArgs;
                i && (i.attr({
                    r: e.center[3] / 2,
                    start: n,
                    end: n
                }), i.animate({
                    r: t.r,
                    start: t.start,
                    end: t.end
                }, e.options.animation))
            }), e.animate = null)
        },
        setData: function(t, e, i, n) {
            ki.prototype.setData.call(this, t, !1, i, n), this.processData(), this.generatePoints(), u(e, !0) && this.chart.redraw(i)
        },
        generatePoints: function() {
            var t, e, i, n, s = 0,
                o = this.options.ignoreHiddenPoint;
            for (ki.prototype.generatePoints.call(this), e = this.points, i = e.length, t = 0; i > t; t++) n = e[t], s += o && !n.visible ? 0 : n.y;
            for (this.total = s, t = 0; i > t; t++) n = e[t], n.percentage = s > 0 ? n.y / s * 100 : 0, n.total = s
        },
        translate: function(t) {
            this.generatePoints();
            var e, i, n, s, o, r = 0,
                a = this.options,
                l = a.slicedOffset,
                h = l + a.borderWidth,
                c = a.startAngle || 0,
                d = this.startAngleRad = ve / 180 * (c - 90),
                c = (this.endAngleRad = ve / 180 * (u(a.endAngle, c + 360) - 90)) - d,
                p = this.points,
                g = a.dataLabels.distance,
                a = a.ignoreHiddenPoint,
                f = p.length;
            for (t || (this.center = t = this.getCenter()), this.getX = function(e, i) {
                    return n = ce.asin(fe((e - t[1]) / (t[2] / 2 + g), 1)), t[0] + (i ? -1 : 1) * xe(n) * (t[2] / 2 + g)
                }, s = 0; f > s; s++) o = p[s], e = d + r * c, (!a || o.visible) && (r += o.percentage / 100), i = d + r * c, o.shapeType = "arc", o.shapeArgs = {
                x: t[0],
                y: t[1],
                r: t[2] / 2,
                innerR: t[3] / 2,
                start: de(1e3 * e) / 1e3,
                end: de(1e3 * i) / 1e3
            }, n = (i + e) / 2, n > 1.5 * ve ? n -= 2 * ve : -ve / 2 > n && (n += 2 * ve), o.slicedTranslation = {
                translateX: de(xe(n) * l),
                translateY: de(ye(n) * l)
            }, e = xe(n) * t[2] / 2, i = ye(n) * t[2] / 2, o.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i], o.half = -ve / 2 > n || n > ve / 2 ? 1 : 0, o.angle = n, h = fe(h, g / 2), o.labelPos = [t[0] + e + xe(n) * g, t[1] + i + ye(n) * g, t[0] + e + xe(n) * h, t[1] + i + ye(n) * h, t[0] + e, t[1] + i, 0 > g ? "center" : o.half ? "right" : "left", n]
        },
        drawGraph: null,
        drawPoints: function() {
            var e, i, n, s, o = this,
                r = o.chart.renderer,
                a = o.options.shadow;
            a && !o.shadowGroup && (o.shadowGroup = r.g("shadow").add(o.group)), $e(o.points, function(l) {
                i = l.graphic, s = l.shapeArgs, n = l.shadowGroup, a && !n && (n = l.shadowGroup = r.g("shadow").add(o.shadowGroup)), e = l.sliced ? l.slicedTranslation : {
                    translateX: 0,
                    translateY: 0
                }, n && n.attr(e), i ? i.animate(t(s, e)) : l.graphic = i = r[l.shapeType](s).setRadialReference(o.center).attr(l.pointAttr[l.selected ? "select" : ""]).attr({
                    "stroke-linejoin": "round"
                }).attr(e).add(o.group).shadow(a, n), void 0 !== l.visible && l.setVisible(l.visible)
            })
        },
        sortByAngle: function(t, e) {
            t.sort(function(t, i) {
                return void 0 !== t.angle && (i.angle - t.angle) * e
            })
        },
        drawLegendSymbol: Fe.drawRectangle,
        getCenter: ci.getCenter,
        getSymbol: ze
    }, Ye = m(ki, Ye), Ge.pie = Ye, ki.prototype.drawDataLabels = function() {
        var i, n, s, o, r = this,
            a = r.options,
            l = a.cursor,
            h = a.dataLabels,
            d = r.points;
        (h.enabled || r._hasPointLabels) && (r.dlProcessOptions && r.dlProcessOptions(h), o = r.plotGroup("dataLabelsGroup", "data-labels", h.defer ? "hidden" : "visible", h.zIndex || 6), !r.hasRendered && u(h.defer, !0) && (o.attr({
            opacity: 0
        }), qe(r, "afterAnimate", function() {
            r.visible && o.show(), o[a.animation ? "animate" : "attr"]({
                opacity: 1
            }, {
                duration: 200
            })
        })), n = h, $e(d, function(a) {
            var d, p, g, f = a.dataLabel,
                m = a.connector,
                x = !0;
            if (i = a.options && a.options.dataLabels, d = u(i && i.enabled, n.enabled), f && !d) a.dataLabel = f.destroy();
            else if (d) {
                if (h = e(n, i), d = h.rotation, p = a.getLabelConfig(), s = h.format ? b(h.format, p) : h.formatter.call(p, h), h.style.color = u(h.color, h.style.color, r.color, "black"), f) c(s) ? (f.attr({
                    text: s
                }), x = !1) : (a.dataLabel = f = f.destroy(), m && (a.connector = m.destroy()));
                else if (c(s)) {
                    f = {
                        fill: h.backgroundColor,
                        stroke: h.borderColor,
                        "stroke-width": h.borderWidth,
                        r: h.borderRadius || 0,
                        rotation: d,
                        padding: h.padding,
                        zIndex: 1
                    };
                    for (g in f) f[g] === E && delete f[g];
                    f = a.dataLabel = r.chart.renderer[d ? "text" : "label"](s, 0, -999, null, null, null, h.useHTML).attr(f).css(t(h.style, l && {
                        cursor: l
                    })).add(o).shadow(h.shadow)
                }
                f && r.alignDataLabel(a, f, h, null, x)
            }
        }))
    }, ki.prototype.alignDataLabel = function(e, i, n, s, o) {
        var r = this.chart,
            a = r.inverted,
            l = u(e.plotX, -999),
            h = u(e.plotY, -999),
            c = i.getBBox();
        (e = this.visible && (e.series.forceDL || r.isInsidePlot(l, de(h), a) || s && r.isInsidePlot(l, a ? s.x + 1 : s.y + s.height - 1, a))) && (s = t({
            x: a ? r.plotWidth - h : l,
            y: de(a ? r.plotHeight - l : h),
            width: 0,
            height: 0
        }, s), t(n, {
            width: c.width,
            height: c.height
        }), n.rotation ? i[o ? "attr" : "animate"]({
            x: s.x + n.x + s.width / 2,
            y: s.y + n.y + s.height / 2
        }).attr({
            align: n.align
        }) : (i.align(n, null, s), a = i.alignAttr, "justify" === u(n.overflow, "justify") ? this.justifyDataLabel(i, n, a, c, s, o) : u(n.crop, !0) && (e = r.isInsidePlot(a.x, a.y) && r.isInsidePlot(a.x + c.width, a.y + c.height)))), e || (i.attr({
            y: -999
        }), i.placed = !1)
    }, ki.prototype.justifyDataLabel = function(t, e, i, n, s, o) {
        var r, a, l = this.chart,
            h = e.align,
            c = e.verticalAlign;
        r = i.x, 0 > r && ("right" === h ? e.align = "left" : e.x = -r, a = !0), r = i.x + n.width, r > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - r, a = !0), r = i.y, 0 > r && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r, a = !0), r = i.y + n.height, r > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r, a = !0), a && (t.placed = !o, t.align(e, null, s))
    }, Ge.pie && (Ge.pie.prototype.drawDataLabels = function() {
        var t, e, i, n, s, o, r, a, l, h, c, d = this,
            p = d.data,
            g = d.chart,
            f = d.options.dataLabels,
            m = u(f.connectorPadding, 10),
            x = u(f.connectorWidth, 1),
            y = g.plotWidth,
            v = g.plotHeight,
            b = u(f.softConnector, !0),
            k = f.distance,
            w = d.center,
            S = w[2] / 2,
            C = w[1],
            T = k > 0,
            M = [
                [],
                []
            ],
            P = [0, 0, 0, 0],
            L = function(t, e) {
                return e.y - t.y
            };
        if (d.visible && (f.enabled || d._hasPointLabels)) {
            for (ki.prototype.drawDataLabels.apply(d), $e(p, function(t) {
                    t.dataLabel && t.visible && M[t.half].push(t)
                }), h = 2; h--;) {
                var I, D = [],
                    B = [],
                    O = M[h],
                    z = O.length;
                if (z) {
                    for (d.sortByAngle(O, h - .5), c = p = 0; !p && O[c];) p = O[c] && O[c].dataLabel && (O[c].dataLabel.getBBox().height || 21), c++;
                    if (k > 0) {
                        for (s = fe(C + S + k, g.plotHeight), c = ge(0, C - S - k); s >= c; c += p) D.push(c);
                        if (s = D.length, z > s) {
                            for (t = [].concat(O), t.sort(L), c = z; c--;) t[c].rank = c;
                            for (c = z; c--;) O[c].rank >= s && O.splice(c, 1);
                            z = O.length
                        }
                        for (c = 0; z > c; c++) {
                            t = O[c], o = t.labelPos, t = 9999;
                            var H, _;
                            for (_ = 0; s > _; _++) H = me(D[_] - o[1]), t > H && (t = H, I = _);
                            if (c > I && null !== D[c]) I = c;
                            else
                                for (z - c + I > s && null !== D[c] && (I = s - z + c); null === D[I];) I++;
                            B.push({
                                i: I,
                                y: D[I]
                            }), D[I] = null
                        }
                        B.sort(L)
                    }
                    for (c = 0; z > c; c++) t = O[c], o = t.labelPos, n = t.dataLabel, l = t.visible === !1 ? "hidden" : "visible", t = o[1], k > 0 ? (s = B.pop(), I = s.i, a = s.y, (t > a && null !== D[I + 1] || a > t && null !== D[I - 1]) && (a = fe(ge(0, t), g.plotHeight))) : a = t, r = f.justify ? w[0] + (h ? -1 : 1) * (S + k) : d.getX(a === C - S - k || a === C + S + k ? t : a, h), n._attr = {
                        visibility: l,
                        align: o[6]
                    }, n._pos = {
                        x: r + f.x + ({
                            left: m,
                            right: -m
                        }[o[6]] || 0),
                        y: a + f.y - 10
                    }, n.connX = r, n.connY = a, null === this.options.size && (s = n.width, m > r - s ? P[3] = ge(de(s - r + m), P[3]) : r + s > y - m && (P[1] = ge(de(r + s - y + m), P[1])), 0 > a - p / 2 ? P[0] = ge(de(-a + p / 2), P[0]) : a + p / 2 > v && (P[2] = ge(de(a + p / 2 - v), P[2])))
                }
            }(0 === A(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), T && x && $e(this.points, function(t) {
                e = t.connector, o = t.labelPos, (n = t.dataLabel) && n._pos ? (l = n._attr.visibility, r = n.connX, a = n.connY, i = b ? ["M", r + ("left" === o[6] ? 5 : -5), a, "C", r, a, 2 * o[2] - o[4], 2 * o[3] - o[5], o[2], o[3], "L", o[4], o[5]] : ["M", r + ("left" === o[6] ? 5 : -5), a, "L", o[2], o[3], "L", o[4], o[5]], e ? (e.animate({
                    d: i
                }), e.attr("visibility", l)) : t.connector = e = d.chart.renderer.path(i).attr({
                    "stroke-width": x,
                    stroke: f.connectorColor || t.color || "#606060",
                    visibility: l
                }).add(d.dataLabelsGroup)) : e && (t.connector = e.destroy())
            }))
        }
    }, Ge.pie.prototype.placeDataLabels = function() {
        $e(this.points, function(t) {
            var e, t = t.dataLabel;
            t && ((e = t._pos) ? (t.attr(t._attr), t[t.moved ? "animate" : "attr"](e), t.moved = !0) : t && t.attr({
                y: -999
            }))
        })
    }, Ge.pie.prototype.alignDataLabel = ze, Ge.pie.prototype.verifyDataLabelOverflow = function(t) {
        var e, i = this.center,
            n = this.options,
            s = n.center,
            o = n = n.minSize || 80;
        return null !== s[0] ? o = ge(i[2] - ge(t[1], t[3]), n) : (o = ge(i[2] - t[1] - t[3], n), i[0] += (t[3] - t[1]) / 2), null !== s[1] ? o = ge(fe(o, i[2] - ge(t[0], t[2])), n) : (o = ge(fe(o, i[2] - t[0] - t[2]), n), i[1] += (t[0] - t[2]) / 2), o < i[2] ? (i[2] = o, this.translate(i), $e(this.points, function(t) {
            t.dataLabel && (t.dataLabel._pos = null)
        }), this.drawDataLabels && this.drawDataLabels()) : e = !0, e
    }), Ge.column && (Ge.column.prototype.alignDataLabel = function(t, i, n, s, o) {
        var r = this.chart,
            a = r.inverted,
            l = t.dlBox || t.shapeArgs,
            h = t.below || t.plotY > u(this.translatedThreshold, r.plotSizeY),
            c = u(n.inside, !!this.options.stacking);
        l && (s = e(l), a && (s = {
            x: r.plotWidth - s.y - s.height,
            y: r.plotHeight - s.x - s.width,
            width: s.height,
            height: s.width
        }), !c) && (a ? (s.x += h ? 0 : s.width, s.width = 0) : (s.y += h ? s.height : 0, s.height = 0)), n.align = u(n.align, !a || c ? "center" : h ? "right" : "left"), n.verticalAlign = u(n.verticalAlign, a || c ? "middle" : h ? "top" : "bottom"), ki.prototype.alignDataLabel.call(this, t, i, n, s, o)
    });
    var Ci = ae.TrackerMixin = {
        drawTrackerPoint: function() {
            var t = this,
                e = t.chart,
                i = e.pointer,
                n = t.options.cursor,
                s = n && {
                    cursor: n
                },
                o = function(i) {
                    var n, s = i.target;
                    for (e.hoverSeries !== t && t.onMouseOver(); s && !n;) n = s.point, s = s.parentNode;
                    n !== E && n !== e.hoverPoint && n.onMouseOver(i)
                };
            $e(t.points, function(t) {
                t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.element.point = t)
            }), t._hasTracking || ($e(t.trackerGroups, function(e) {
                t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(t) {
                    i.onTrackerMouseOut(t)
                }).css(s), X) && t[e].on("touchstart", o)
            }), t._hasTracking = !0)
        },
        drawTrackerGraph: function() {
            var t, e = this,
                i = e.options,
                n = i.trackByArea,
                s = [].concat(n ? e.areaPath : e.graphPath),
                o = s.length,
                r = e.chart,
                a = r.pointer,
                l = r.renderer,
                h = r.options.tooltip.snap,
                c = e.tracker,
                d = i.cursor,
                p = d && {
                    cursor: d
                },
                d = e.singlePoints,
                u = function() {
                    r.hoverSeries !== e && e.onMouseOver()
                },
                g = "rgba(192,192,192," + (Le ? 1e-4 : .002) + ")";
            if (o && !n)
                for (t = o + 1; t--;) "M" === s[t] && s.splice(t + 1, 0, s[t + 1] - h, s[t + 2], "L"), (t && "M" === s[t] || t === o) && s.splice(t, 0, "L", s[t - 2] + h, s[t - 1]);
            for (t = 0; t < d.length; t++) o = d[t], s.push("M", o.plotX - h, o.plotY, "L", o.plotX + h, o.plotY);
            c ? c.attr({
                d: s
            }) : (e.tracker = l.path(s).attr({
                "stroke-linejoin": "round",
                visibility: e.visible ? "visible" : "hidden",
                stroke: g,
                fill: n ? g : Ee,
                "stroke-width": i.lineWidth + (n ? 0 : 2 * h),
                zIndex: 2
            }).add(e.group), $e([e.tracker, e.markerGroup], function(t) {
                t.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(t) {
                    a.onTrackerMouseOut(t)
                }).css(p), X && t.on("touchstart", u)
            }))
        }
    };
    Ge.column && (wi.prototype.drawTracker = Ci.drawTrackerPoint), Ge.pie && (Ge.pie.prototype.drawTracker = Ci.drawTrackerPoint), Ge.scatter && (Si.prototype.drawTracker = Ci.drawTrackerPoint), t(vi.prototype, {
        setItemEvents: function(t, e, i, n, s) {
            var o = this;
            (i ? e : t.legendGroup).on("mouseover", function() {
                t.setState("hover"), e.css(o.options.itemHoverStyle)
            }).on("mouseout", function() {
                e.css(t.visible ? n : s), t.setState()
            }).on("click", function(e) {
                var i = function() {
                        t.setVisible()
                    },
                    e = {
                        browserEvent: e
                    };
                t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : Qe(t, "legendItemClick", e, i)
            })
        },
        createCheckboxForItem: function(t) {
            t.checkbox = f("input", {
                type: "checkbox",
                checked: t.selected,
                defaultChecked: t.selected
            }, this.options.itemCheckboxStyle, this.chart.container), qe(t.checkbox, "click", function(e) {
                Qe(t, "checkboxClick", {
                    checked: e.target.checked
                }, function() {
                    t.select()
                })
            })
        }
    }), Y.legend.itemStyle.cursor = "pointer", t(z.prototype, {
        showResetZoom: function() {
            var t = this,
                e = Y.lang,
                i = t.options.chart.resetZoomButton,
                n = i.theme,
                s = n.states,
                o = "chart" === i.relativeTo ? null : "plotBox";
            this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function() {
                t.zoomOut()
            }, n, s && s.hover).attr({
                align: i.position.align,
                title: e.resetZoomTitle
            }).add().align(i.position, !1, o)
        },
        zoomOut: function() {
            var t = this;
            Qe(t, "selection", {
                resetSelection: !0
            }, function() {
                t.zoom()
            })
        },
        zoom: function(t) {
            var e, i, n = this.pointer,
                o = !1;
            !t || t.resetSelection ? $e(this.axes, function(t) {
                e = t.zoom()
            }) : $e(t.xAxis.concat(t.yAxis), function(t) {
                var i = t.axis,
                    s = i.isXAxis;
                (n[s ? "zoomX" : "zoomY"] || n[s ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max), i.displayBtn && (o = !0))
            }), i = this.resetZoomButton, o && !i ? this.showResetZoom() : !o && s(i) && (this.resetZoomButton = i.destroy()), e && this.redraw(u(this.options.chart.animation, t && t.animation, this.pointCount < 100))
        },
        pan: function(t, e) {
            var i, n = this,
                s = n.hoverPoints;
            s && $e(s, function(t) {
                t.setState()
            }), $e("xy" === e ? [1, 0] : [1], function(e) {
                var s = t[e ? "chartX" : "chartY"],
                    o = n[e ? "xAxis" : "yAxis"][0],
                    r = n[e ? "mouseDownX" : "mouseDownY"],
                    a = (o.pointRange || 0) / 2,
                    l = o.getExtremes(),
                    h = o.toValue(r - s, !0) + a,
                    r = o.toValue(r + n[e ? "plotWidth" : "plotHeight"] - s, !0) - a;
                o.series.length && h > fe(l.dataMin, l.min) && r < ge(l.dataMax, l.max) && (o.setExtremes(h, r, !1, !1, {
                    trigger: "pan"
                }), i = !0), n[e ? "mouseDownX" : "mouseDownY"] = s
            }), i && n.redraw(!1), g(n.container, {
                cursor: "move"
            })
        }
    }), t(bi.prototype, {
        select: function(t, e) {
            var i = this,
                n = i.series,
                s = n.chart,
                t = u(t, !i.selected);
            i.firePointEvent(t ? "select" : "unselect", {
                accumulate: e
            }, function() {
                i.selected = i.options.selected = t, n.options.data[je(i, n.data)] = i.options, i.setState(t && "select"), e || $e(s.getSelectedPoints(), function(t) {
                    t.selected && t !== i && (t.selected = t.options.selected = !1, n.options.data[je(t, n.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                })
            })
        },
        onMouseOver: function(t) {
            var e = this.series,
                i = e.chart,
                n = i.tooltip,
                s = i.hoverPoint;
            s && s !== this && s.onMouseOut(), this.firePointEvent("mouseOver"), n && (!n.shared || e.noSharedTooltip) && n.refresh(this, t), this.setState("hover"), i.hoverPoint = this
        },
        onMouseOut: function() {
            var t = this.series.chart,
                e = t.hoverPoints;
            this.firePointEvent("mouseOut"), e && -1 !== je(this, e) || (this.setState(), t.hoverPoint = null)
        },
        importEvents: function() {
            if (!this.hasImportedEvents) {
                var t, i = e(this.series.options.point, this.options).events;
                this.events = i;
                for (t in i) qe(this, t, i[t]);
                this.hasImportedEvents = !0
            }
        },
        setState: function(i, n) {
            var s, o = this.plotX,
                r = this.plotY,
                a = this.series,
                l = a.options.states,
                h = ni[a.type].marker && a.options.marker,
                c = h && !h.enabled,
                d = h && h.states[i],
                p = d && d.enabled === !1,
                u = a.stateMarkerGraphic,
                g = this.marker || {},
                f = a.chart,
                m = a.halo,
                i = i || "";
            s = this.pointAttr[i] || a.pointAttr[i], i === this.state && !n || this.selected && "select" !== i || l[i] && l[i].enabled === !1 || i && (p || c && d.enabled === !1) || i && g.states && g.states[i] && g.states[i].enabled === !1 || (this.graphic ? (h = h && this.graphic.symbolName && s.r, this.graphic.attr(e(s, h ? {
                x: o - h,
                y: r - h,
                width: 2 * h,
                height: 2 * h
            } : {})), u && u.hide()) : (i && d && (h = d.radius, g = g.symbol || a.symbol, u && u.currentSymbol !== g && (u = u.destroy()), u ? u[n ? "animate" : "attr"]({
                x: o - h,
                y: r - h
            }) : g && (a.stateMarkerGraphic = u = f.renderer.symbol(g, o - h, r - h, 2 * h, 2 * h).attr(s).add(a.markerGroup), u.currentSymbol = g)), u && u[i && f.isInsidePlot(o, r, f.inverted) ? "show" : "hide"]()), (o = l[i] && l[i].halo) && o.size ? (m || (a.halo = m = f.renderer.path().add(a.seriesGroup)), m.attr(t({
                fill: ai(this.color || a.color).setOpacity(o.opacity).get()
            }, o.attributes))[n ? "animate" : "attr"]({
                d: this.haloPath(o.size)
            })) : m && m.attr({
                d: []
            }), this.state = i)
        },
        haloPath: function(t) {
            var e = this.series,
                i = e.chart,
                n = e.getPlotBox(),
                s = i.inverted;
            return i.renderer.symbols.circle(n.translateX + (s ? e.yAxis.len - this.plotY : this.plotX) - t, n.translateY + (s ? e.xAxis.len - this.plotX : this.plotY) - t, 2 * t, 2 * t)
        }
    }), t(ki.prototype, {
        onMouseOver: function() {
            var t = this.chart,
                e = t.hoverSeries;
            e && e !== this && e.onMouseOut(), this.options.events.mouseOver && Qe(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
        },
        onMouseOut: function() {
            var t = this.options,
                e = this.chart,
                i = e.tooltip,
                n = e.hoverPoint;
            n && n.onMouseOut(), this && t.events.mouseOut && Qe(this, "mouseOut"), i && !t.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), this.setState(), e.hoverSeries = null
        },
        setState: function(t) {
            var e = this.options,
                i = this.graph,
                n = this.graphNeg,
                s = e.states,
                e = e.lineWidth,
                t = t || "";
            this.state !== t && (this.state = t, s[t] && s[t].enabled === !1 || (t && (e = s[t].lineWidth || e + (s[t].lineWidthPlus || 0)), i && !i.dashstyle && (t = {
                "stroke-width": e
            }, i.attr(t), n && n.attr(t))))
        },
        setVisible: function(t, e) {
            var i, n = this,
                s = n.chart,
                o = n.legendItem,
                r = s.options.chart.ignoreHiddenSeries,
                a = n.visible;
            i = (n.visible = t = n.userOptions.visible = t === E ? !a : t) ? "show" : "hide", $e(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(t) {
                n[t] && n[t][i]()
            }), s.hoverSeries === n && n.onMouseOut(), o && s.legend.colorizeItem(n, t), n.isDirty = !0, n.options.stacking && $e(s.series, function(t) {
                t.options.stacking && t.visible && (t.isDirty = !0)
            }), $e(n.linkedSeries, function(e) {
                e.setVisible(t, !1)
            }), r && (s.isDirtyBox = !0), e !== !1 && s.redraw(), Qe(n, i)
        },
        setTooltipPoints: function(t) {
            var e, i, n, s, o = [],
                r = this.xAxis,
                a = r && r.getExtremes(),
                l = r ? r.tooltipLen || r.len : this.chart.plotSizeX,
                h = [];
            if (this.options.enableMouseTracking !== !1 && !this.singularTooltips) {
                for (t && (this.tooltipPoints = null), $e(this.segments || this.points, function(t) {
                        o = o.concat(t)
                    }), r && r.reversed && (o = o.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(o), t = o.length, s = 0; t > s; s++)
                    if (r = o[s], e = r.x, e >= a.min && e <= a.max)
                        for (n = o[s + 1], e = i === E ? 0 : i + 1, i = o[s + 1] ? fe(ge(0, pe((r.clientX + (n ? n.wrappedClientX || n.clientX : l)) / 2)), l) : l; e >= 0 && i >= e;) h[e++] = r;
                this.tooltipPoints = h
            }
        },
        show: function() {
            this.setVisible(!0)
        },
        hide: function() {
            this.setVisible(!1)
        },
        select: function(t) {
            this.selected = t = t === E ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), Qe(this, t ? "select" : "unselect")
        },
        drawTracker: Ci.drawTrackerGraph
    }), v(ki.prototype, "init", function(t) {
        var e;
        t.apply(this, Array.prototype.slice.call(arguments, 1)), (e = this.xAxis) && e.options.ordinal && qe(this, "updatedData", function() {
            delete e.ordinalIndex
        })
    }), v(O.prototype, "getTimeTicks", function(t, e, i, n, s, o, r, a) {
        var l, h, d, p, u = 0,
            g = 0,
            f = {},
            m = [],
            x = -Number.MAX_VALUE,
            y = this.options.tickPixelInterval;
        if (!this.options.ordinal || !o || o.length < 3 || i === E) return t.call(this, e, i, n, s);
        for (d = o.length; d > g; g++) {
            if (p = g && o[g - 1] > n, o[g] < i && (u = g), g === d - 1 || o[g + 1] - o[g] > 5 * r || p) {
                if (o[g] > x) {
                    for (l = t.call(this, e, o[u], o[g], s); l.length && l[0] <= x;) l.shift();
                    l.length && (x = l[l.length - 1]), m = m.concat(l)
                }
                u = g + 1
            }
            if (p) break
        }
        if (t = l.info, a && t.unitRange <= j.hour) {
            for (g = m.length - 1, u = 1; g > u; u++) new Date(m[u] - Z)[Q]() !== new Date(m[u - 1] - Z)[Q]() && (f[m[u]] = "day", h = !0);
            h && (f[m[0]] = "day"), t.higherRanks = f
        }
        if (m.info = t, a && c(y)) {
            var v, a = t = m.length,
                g = [];
            for (h = []; a--;) u = this.translate(m[a]), v && (h[a] = v - u), g[a] = v = u;
            for (h.sort(), h = h[pe(h.length / 2)], .6 * y > h && (h = null), a = m[t - 1] > n ? t - 1 : t, v = void 0; a--;) u = g[a], n = v - u, v && .8 * y > n && (null === h || .8 * h > n) ? (f[m[a]] && !f[m[a + 1]] ? (n = a + 1, v = u) : n = a, m.splice(n, 1)) : v = u
        }
        return m
    }), t(O.prototype, {
        beforeSetTickPositions: function() {
            var t, e, i, n = [],
                s = !1,
                o = this.getExtremes(),
                r = o.min,
                o = o.max;
            if (this.options.ordinal) {
                if ($e(this.series, function(e, i) {
                        if (e.visible !== !1 && e.takeOrdinalPosition !== !1 && (n = n.concat(e.processedXData), t = n.length, n.sort(function(t, e) {
                                return t - e
                            }), t))
                            for (i = t - 1; i--;) n[i] === n[i + 1] && n.splice(i, 1)
                    }), t = n.length, t > 2) {
                    for (e = n[1] - n[0], i = t - 1; i-- && !s;) n[i + 1] - n[i] !== e && (s = !0);
                    !this.options.keepOrdinalPadding && (n[0] - r > e || o - n[n.length - 1] > e) && (s = !0)
                }
                s ? (this.ordinalPositions = n, s = this.val2lin(ge(r, n[0]), !0), e = this.val2lin(fe(o, n[n.length - 1]), !0), this.ordinalSlope = o = (o - r) / (e - s), this.ordinalOffset = r - s * o) : this.ordinalPositions = this.ordinalSlope = this.ordinalOffset = E
            }
            this.groupIntervalFactor = null
        },
        val2lin: function(t, e) {
            var i = this.ordinalPositions;
            if (i) {
                var n, s, o = i.length;
                for (n = o; n--;)
                    if (i[n] === t) {
                        s = n;
                        break
                    }
                for (n = o - 1; n--;)
                    if (t > i[n] || 0 === n) {
                        i = (t - i[n]) / (i[n + 1] - i[n]), s = n + i;
                        break
                    }
                return e ? s : this.ordinalSlope * (s || 0) + this.ordinalOffset
            }
            return t
        },
        lin2val: function(t, e) {
            var i = this.ordinalPositions;
            if (i) {
                var n, s, o = this.ordinalSlope,
                    r = this.ordinalOffset,
                    a = i.length - 1;
                if (e) 0 > t ? t = i[0] : t > a ? t = i[a] : (a = pe(t), s = t - a);
                else
                    for (; a--;)
                        if (n = o * a + r, t >= n) {
                            o = o * (a + 1) + r, s = (t - n) / (o - n);
                            break
                        } return s !== E && i[a] !== E ? i[a] + (s ? s * (i[a + 1] - i[a]) : 0) : t
            }
            return t
        },
        getExtendedPositions: function() {
            var t, e, i = this.chart,
                n = this.series[0].currentDataGrouping,
                s = this.ordinalIndex,
                o = n ? n.count + n.unitName : "raw",
                r = this.getExtremes();
            return s || (s = this.ordinalIndex = {}), s[o] || (t = {
                series: [],
                getExtremes: function() {
                    return {
                        min: r.dataMin,
                        max: r.dataMax
                    }
                },
                options: {
                    ordinal: !0
                },
                val2lin: O.prototype.val2lin
            }, $e(this.series, function(s) {
                e = {
                    xAxis: t,
                    xData: s.xData,
                    chart: i,
                    destroyGroupedData: ze
                }, e.options = {
                    dataGrouping: n ? {
                        enabled: !0,
                        forced: !0,
                        approximation: "open",
                        units: [
                            [n.unitName, [n.count]]
                        ]
                    } : {
                        enabled: !1
                    }
                }, s.processData.apply(e), t.series.push(e)
            }), this.beforeSetTickPositions.apply(t), s[o] = t.ordinalPositions), s[o]
        },
        getGroupIntervalFactor: function(t, e, i) {
            var n = 0,
                i = i.processedXData,
                s = i.length,
                o = [],
                r = this.groupIntervalFactor;
            if (!r) {
                for (; s - 1 > n; n++) o[n] = i[n + 1] - i[n];
                o.sort(function(t, e) {
                    return t - e
                }), n = o[pe(s / 2)], t = ge(t, i[0]), e = fe(e, i[s - 1]), this.groupIntervalFactor = r = s * n / (e - t)
            }
            return r
        },
        postProcessTickInterval: function(t) {
            var e = this.ordinalSlope;
            return e ? t / (e / this.closestPointRange) : t
        }
    }), v(z.prototype, "pan", function(t, e) {
        var i = this.xAxis[0],
            n = e.chartX,
            s = !1;
        if (i.options.ordinal && i.series.length) {
            var o, r = this.mouseDownX,
                a = i.getExtremes(),
                l = a.dataMax,
                h = a.min,
                c = a.max,
                d = this.hoverPoints,
                p = i.closestPointRange,
                r = (r - n) / (i.translationSlope * (i.ordinalSlope || p)),
                u = {
                    ordinalPositions: i.getExtendedPositions()
                },
                p = i.lin2val,
                f = i.val2lin;
            u.ordinalPositions ? me(r) > 1 && (d && $e(d, function(t) {
                t.setState()
            }), 0 > r ? (d = u, o = i.ordinalPositions ? i : u) : (d = i.ordinalPositions ? i : u, o = u), u = o.ordinalPositions, l > u[u.length - 1] && u.push(l), this.fixedRange = c - h, r = i.toFixedRange(null, null, p.apply(d, [f.apply(d, [h, !0]) + r, !0]), p.apply(o, [f.apply(o, [c, !0]) + r, !0])), r.min >= fe(a.dataMin, h) && r.max <= ge(l, c) && i.setExtremes(r.min, r.max, !0, !1, {
                trigger: "pan"
            }), this.mouseDownX = n, g(this.container, {
                cursor: "move"
            })) : s = !0
        } else s = !0;
        s && t.apply(this, Array.prototype.slice.call(arguments, 1))
    }), v(ki.prototype, "getSegments", function(t) {
        var e, i = this.options.gapSize,
            n = this.xAxis;
        t.apply(this, Array.prototype.slice.call(arguments, 1)), i && (e = this.segments, $e(e, function(t, s) {
            for (var o = t.length - 1; o--;) t[o + 1].x - t[o].x > n.closestPointRange * i && e.splice(s + 1, 0, t.splice(o + 1, t.length - o))
        }))
    });
    var Ai = ki.prototype,
        Ye = pi.prototype,
        Ti = Ai.processData,
        Mi = Ai.generatePoints,
        Pi = Ai.destroy,
        Li = Ye.tooltipHeaderFormatter,
        Ii = {
            approximation: "average",
            groupPixelWidth: 2,
            dateTimeLabelFormats: {
                millisecond: ["%A, %b %e, %H:%M:%S.%L", "%A, %b %e, %H:%M:%S.%L", "-%H:%M:%S.%L"],
                second: ["%A, %b %e, %H:%M:%S", "%A, %b %e, %H:%M:%S", "-%H:%M:%S"],
                minute: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                hour: ["%A, %b %e, %H:%M", "%A, %b %e, %H:%M", "-%H:%M"],
                day: ["%A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                week: ["Week from %A, %b %e, %Y", "%A, %b %e", "-%A, %b %e, %Y"],
                month: ["%B %Y", "%B", "-%B %Y"],
                year: ["%Y", "%Y", "-%Y"]
            }
        },
        Di = {
            line: {},
            spline: {},
            area: {},
            areaspline: {},
            column: {
                approximation: "sum",
                groupPixelWidth: 10
            },
            arearange: {
                approximation: "range"
            },
            areasplinerange: {
                approximation: "range"
            },
            columnrange: {
                approximation: "range",
                groupPixelWidth: 10
            },
            candlestick: {
                approximation: "ohlc",
                groupPixelWidth: 10
            },
            ohlc: {
                approximation: "ohlc",
                groupPixelWidth: 5
            }
        },
        Bi = [
            ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
            ["second", [1, 2, 5, 10, 15, 30]],
            ["minute", [1, 2, 5, 10, 15, 30]],
            ["hour", [1, 2, 3, 4, 6, 8, 12]],
            ["day", [1]],
            ["week", [1]],
            ["month", [1, 3, 6]],
            ["year", null]
        ],
        Oi = {
            sum: function(t) {
                var e, i = t.length;
                if (!i && t.hasNulls) e = null;
                else if (i)
                    for (e = 0; i--;) e += t[i];
                return e
            },
            average: function(t) {
                var e = t.length,
                    t = Oi.sum(t);
                return "number" == typeof t && e && (t /= e), t
            },
            open: function(t) {
                return t.length ? t[0] : t.hasNulls ? null : E
            },
            high: function(t) {
                return t.length ? A(t) : t.hasNulls ? null : E
            },
            low: function(t) {
                return t.length ? C(t) : t.hasNulls ? null : E
            },
            close: function(t) {
                return t.length ? t[t.length - 1] : t.hasNulls ? null : E
            },
            ohlc: function(t, e, i, n) {
                return t = Oi.open(t), e = Oi.high(e), i = Oi.low(i), n = Oi.close(n), "number" == typeof t || "number" == typeof e || "number" == typeof i || "number" == typeof n ? [t, e, i, n] : void 0
            },
            range: function(t, e) {
                return t = Oi.low(t), e = Oi.high(e), "number" == typeof t || "number" == typeof e ? [t, e] : void 0
            }
        };
    Ai.groupData = function(t, e, i, n) {
        var s, o, r, a = this.data,
            l = this.options.data,
            h = [],
            c = [],
            d = t.length,
            p = !!e,
            u = [
                [],
                [],
                [],
                []
            ],
            n = "function" == typeof n ? n : Oi[n],
            g = this.pointArrayMap,
            f = g && g.length;
        for (r = 0; d >= r && !(t[r] >= i[0]); r++);
        for (; d >= r; r++) {
            for (;
                (i[1] !== E && t[r] >= i[1] || r === d) && (s = i.shift(), o = n.apply(0, u), o !== E && (h.push(s), c.push(o)), u[0] = [], u[1] = [], u[2] = [], u[3] = [], r !== d););
            if (r === d) break;
            if (g) {
                s = this.cropStart + r, s = a && a[s] || this.pointClass.prototype.applyOptions.apply({
                    series: this
                }, [l[s]]);
                var m;
                for (o = 0; f > o; o++) m = s[g[o]], "number" == typeof m ? u[o].push(m) : null === m && (u[o].hasNulls = !0)
            } else s = p ? e[r] : null, "number" == typeof s ? u[0].push(s) : null === s && (u[0].hasNulls = !0)
        }
        return [h, c]
    }, Ai.processData = function() {
        var t, e = this.chart,
            i = this.options,
            n = i.dataGrouping,
            s = this.allowDG !== !1 && n && u(n.enabled, e.options._stock);
        if (this.forceCrop = s, this.groupPixelWidth = null, this.hasProcessed = !0, Ti.apply(this, arguments) !== !1 && s) {
            this.destroyGroupedData();
            var o = this.processedXData,
                r = this.processedYData,
                a = e.plotSizeX,
                e = this.xAxis,
                l = e.options.ordinal,
                h = this.groupPixelWidth = e.getGroupPixelWidth && e.getGroupPixelWidth(),
                s = this.pointRange;
            if (h) {
                t = !0, this.points = null;
                var d = e.getExtremes(),
                    s = d.min,
                    d = d.max,
                    l = l && e.getGroupIntervalFactor(s, d, this) || 1,
                    a = h * (d - s) / a * l,
                    h = e.getTimeTicks(e.normalizeTimeTickInterval(a, n.units || Bi), s, d, null, o, this.closestPointRange),
                    r = Ai.groupData.apply(this, [o, r, h, n.approximation]),
                    o = r[0],
                    r = r[1];
                if (n.smoothed) {
                    for (n = o.length - 1, o[n] = d; n-- && n > 0;) o[n] += a / 2;
                    o[0] = s
                }
                this.currentDataGrouping = h.info, null === i.pointRange && (this.pointRange = h.info.totalRange), this.closestPointRange = h.info.totalRange, c(o[0]) && o[0] < e.dataMin && (e.dataMin = o[0]), this.processedXData = o, this.processedYData = r
            } else this.currentDataGrouping = null, this.pointRange = s;
            this.hasGroupedData = t
        }
    }, Ai.destroyGroupedData = function() {
        var t = this.groupedData;
        $e(t || [], function(e, i) {
            e && (t[i] = e.destroy ? e.destroy() : null)
        }), this.groupedData = null
    }, Ai.generatePoints = function() {
        Mi.apply(this), this.destroyGroupedData(), this.groupedData = this.hasGroupedData ? this.points : null
    }, Ye.tooltipHeaderFormatter = function(t) {
        var e, i, n = t.series,
            s = n.tooltipOptions,
            o = n.options.dataGrouping,
            a = s.xDateFormat,
            l = n.xAxis;
        if (l && "datetime" === l.options.type && o && r(t.key)) {
            if (n = n.currentDataGrouping, o = o.dateTimeLabelFormats, n) l = o[n.unitName], 1 === n.count ? a = l[0] : (a = l[1], e = l[2]);
            else if (!a && o)
                for (i in j)
                    if (j[i] >= l.closestPointRange || j[i] <= j.day && t.key % j[i] > 0) {
                        a = o[i][0];
                        break
                    }
            a = F(a, t.key), e && (a += F(e, t.key + n.totalRange - 1)), t = s.headerFormat.replace("{point.key}", a)
        } else t = Li.call(this, t);
        return t
    }, Ai.destroy = function() {
        for (var t = this.groupedData || [], e = t.length; e--;) t[e] && t[e].destroy();
        Pi.apply(this)
    }, v(Ai, "setOptions", function(t, i) {
        var n = t.call(this, i),
            s = this.type,
            o = this.chart.options.plotOptions,
            r = ni[s].dataGrouping;
        return Di[s] && (r || (r = e(Ii, Di[s])), n.dataGrouping = e(r, o.series && o.series.dataGrouping, o[s].dataGrouping, i.dataGrouping)), this.chart.options._stock && (this.requireSorting = !0), n
    }), v(O.prototype, "setScale", function(t) {
        t.call(this), $e(this.series, function(t) {
            t.hasProcessed = !1
        })
    }), O.prototype.getGroupPixelWidth = function() {
        var t, e, i = this.series,
            n = i.length,
            s = 0,
            o = !1;
        for (t = n; t--;)(e = i[t].options.dataGrouping) && (s = ge(s, e.groupPixelWidth));
        for (t = n; t--;)(e = i[t].options.dataGrouping) && i[t].hasProcessed && (n = (i[t].processedXData || i[t].data).length, (i[t].groupPixelWidth || n > this.chart.plotSizeX / s || n && e.forced) && (o = !0));
        return o ? s : 0
    }, ni.ohlc = e(ni.column, {
        lineWidth: 1,
        tooltip: {
            pointFormat: '<span style="color:{series.color}">\u25cf</span> <b> {series.name}</b><br/>Open: {point.open}<br/>High: {point.high}<br/>Low: {point.low}<br/>Close: {point.close}<br/>'
        },
        states: {
            hover: {
                lineWidth: 3
            }
        },
        threshold: null
    }), Ye = m(Ge.column, {
        type: "ohlc",
        pointArrayMap: ["open", "high", "low", "close"],
        toYData: function(t) {
            return [t.open, t.high, t.low, t.close]
        },
        pointValKey: "high",
        pointAttrToOptions: {
            stroke: "color",
            "stroke-width": "lineWidth"
        },
        upColorProp: "stroke",
        getAttribs: function() {
            Ge.column.prototype.getAttribs.apply(this, arguments);
            var t = this.options,
                i = t.states,
                t = t.upColor || this.color,
                n = e(this.pointAttr),
                s = this.upColorProp;
            n[""][s] = t, n.hover[s] = i.hover.upColor || t, n.select[s] = i.select.upColor || t, $e(this.points, function(t) {
                t.open < t.close && (t.pointAttr = n)
            })
        },
        translate: function() {
            var t = this.yAxis;
            Ge.column.prototype.translate.apply(this), $e(this.points, function(e) {
                null !== e.open && (e.plotOpen = t.translate(e.open, 0, 1, 0, 1)), null !== e.close && (e.plotClose = t.translate(e.close, 0, 1, 0, 1))
            })
        },
        drawPoints: function() {
            var t, e, i, n, s, o, r, a, l = this,
                h = l.chart;
            $e(l.points, function(c) {
                c.plotY !== E && (r = c.graphic, t = c.pointAttr[c.selected ? "selected" : ""] || l.pointAttr[""], n = t["stroke-width"] % 2 / 2, a = de(c.plotX) - n, s = de(c.shapeArgs.width / 2), o = ["M", a, de(c.yBottom), "L", a, de(c.plotY)], null !== c.open && (e = de(c.plotOpen) + n, o.push("M", a, e, "L", a - s, e)), null !== c.close && (i = de(c.plotClose) + n, o.push("M", a, i, "L", a + s, i)), r ? r.animate({
                    d: o
                }) : c.graphic = h.renderer.path(o).attr(t).add(l.group))
            })
        },
        animate: null
    }), Ge.ohlc = Ye, ni.candlestick = e(ni.column, {
        lineColor: "black",
        lineWidth: 1,
        states: {
            hover: {
                lineWidth: 2
            }
        },
        tooltip: ni.ohlc.tooltip,
        threshold: null,
        upColor: "white"
    }), Ye = m(Ye, {
        type: "candlestick",
        pointAttrToOptions: {
            fill: "color",
            stroke: "lineColor",
            "stroke-width": "lineWidth"
        },
        upColorProp: "fill",
        getAttribs: function() {
            Ge.ohlc.prototype.getAttribs.apply(this, arguments);
            var t = this.options,
                e = t.states,
                i = t.upLineColor || t.lineColor,
                n = e.hover.upLineColor || i,
                s = e.select.upLineColor || i;
            $e(this.points, function(t) {
                t.open < t.close && (t.pointAttr[""].stroke = i, t.pointAttr.hover.stroke = n, t.pointAttr.select.stroke = s)
            })
        },
        drawPoints: function() {
            var t, e, i, n, s, o, r, a, l, h, c, d, p = this,
                u = p.chart,
                g = p.pointAttr[""];
            $e(p.points, function(f) {
                h = f.graphic, f.plotY !== E && (t = f.pointAttr[f.selected ? "selected" : ""] || g, a = t["stroke-width"] % 2 / 2, l = de(f.plotX) - a, e = f.plotOpen, i = f.plotClose, n = ce.min(e, i), s = ce.max(e, i), d = de(f.shapeArgs.width / 2), o = de(n) !== de(f.plotY), r = s !== f.yBottom, n = de(n) + a, s = de(s) + a, c = ["M", l - d, s, "L", l - d, n, "L", l + d, n, "L", l + d, s, "Z", "M", l, n, "L", l, o ? de(f.plotY) : n, "M", l, s, "L", l, r ? de(f.yBottom) : s], h ? h.animate({
                    d: c
                }) : f.graphic = u.renderer.path(c).attr(t).add(p.group).shadow(p.options.shadow))
            })
        }
    }), Ge.candlestick = Ye;
    var zi = li.prototype.symbols;
    ni.flags = e(ni.column, {
        fillColor: "white",
        lineWidth: 1,
        pointRange: 0,
        shape: "flag",
        stackDistance: 12,
        states: {
            hover: {
                lineColor: "black",
                fillColor: "#FCFFC5"
            }
        },
        style: {
            fontSize: "11px",
            fontWeight: "bold",
            textAlign: "center"
        },
        tooltip: {
            pointFormat: "{point.text}<br/>"
        },
        threshold: null,
        y: -30
    }), Ge.flags = m(Ge.column, {
        type: "flags",
        sorted: !1,
        noSharedTooltip: !0,
        allowDG: !1,
        takeOrdinalPosition: !1,
        trackerGroups: ["markerGroup"],
        forceCrop: !0,
        init: ki.prototype.init,
        pointAttrToOptions: {
            fill: "fillColor",
            stroke: "color",
            "stroke-width": "lineWidth",
            r: "radius"
        },
        translate: function() {
            Ge.column.prototype.translate.apply(this);
            var t, e, i, n, s, o = this.chart,
                r = this.points,
                a = r.length - 1,
                l = this.options.onSeries,
                l = (t = l && o.get(l)) && t.options.step,
                h = t && t.points,
                c = h && h.length,
                d = this.xAxis,
                p = d.getExtremes();
            if (t && t.visible && c)
                for (t = t.currentDataGrouping, n = h[c - 1].x + (t ? t.totalRange : 0), r.sort(function(t, e) {
                        return t.x - e.x
                    }); c-- && r[a] && (t = r[a], i = h[c], !(i.x <= t.x && i.plotY !== E && (t.x <= n && (t.plotY = i.plotY, i.x < t.x && !l && (s = h[c + 1]) && s.plotY !== E && (t.plotY += (t.x - i.x) / (s.x - i.x) * (s.plotY - i.plotY))), a--, c++, 0 > a))););
            $e(r, function(t, i) {
                t.plotY === E && (t.x >= p.min && t.x <= p.max ? t.plotY = o.chartHeight - d.bottom - (d.opposite ? d.height : 0) + d.offset - o.plotTop : t.shapeArgs = {}), (e = r[i - 1]) && e.plotX === t.plotX && (e.stackIndex === E && (e.stackIndex = 0), t.stackIndex = e.stackIndex + 1)
            })
        },
        drawPoints: function() {
            var t, i, n, s, o, r, a, l, h, c = this.pointAttr[""],
                d = this.points,
                p = this.chart.renderer,
                u = this.options,
                g = u.y,
                f = u.lineWidth % 2 / 2;
            for (o = d.length; o--;) r = d[o], t = r.plotX > this.xAxis.len, i = r.plotX + (t ? f : -f), a = r.stackIndex, s = r.options.shape || u.shape, n = r.plotY, n !== E && (n = r.plotY + g + f - (a !== E && a * u.stackDistance)), l = a ? E : r.plotX + f, h = a ? E : r.plotY, a = r.graphic, n !== E && i >= 0 && !t ? (t = r.pointAttr[r.selected ? "select" : ""] || c, a ? a.attr({
                x: i,
                y: n,
                r: t.r,
                anchorX: l,
                anchorY: h
            }) : r.graphic = p.label(r.options.title || u.title || "A", i, n, s, l, h, u.useHTML).css(e(u.style, r.style)).attr(t).attr({
                align: "flag" === s ? "left" : "center",
                width: u.width,
                height: u.height
            }).add(this.markerGroup).shadow(u.shadow), r.tooltipPos = [i, n]) : a && (r.graphic = a.destroy())
        },
        drawTracker: function() {
            var t = this.points;
            Ci.drawTrackerPoint.apply(this), $e(t, function(e) {
                var i = e.graphic;
                i && qe(i.element, "mouseover", function() {
                    e.stackIndex > 0 && !e.raised && (e._y = i.y, i.attr({
                        y: e._y - 8
                    }), e.raised = !0), $e(t, function(t) {
                        t !== e && t.raised && t.graphic && (t.graphic.attr({
                            y: t._y
                        }), t.raised = !1)
                    })
                })
            })
        },
        animate: ze
    }), zi.flag = function(t, e, i, n, s) {
        var o = s && s.anchorX || t,
            s = s && s.anchorY || e;
        return ["M", o, s, "L", t, e + n, t, e, t + i, e, t + i, e + n, t, e + n, "M", o, s, "Z"]
    }, $e(["circle", "square"], function(t) {
        zi[t + "pin"] = function(e, i, n, s, o) {
            var r = o && o.anchorX,
                o = o && o.anchorY,
                e = zi[t](e, i, n, s);
            return r && o && e.push("M", r, i > o ? i : i + s, "L", r, o), e
        }
    }), W === ae.VMLRenderer && $e(["flag", "circlepin", "squarepin"], function(t) {
        hi.prototype.symbols[t] = zi[t]
    });
    var Ye = [].concat(Bi),
        Hi = function(t) {
            return Math[t].apply(0, Ue(arguments, function(t) {
                return "number" == typeof t
            }))
        };
    Ye[4] = ["day", [1, 2, 3, 4]], Ye[5] = ["week", [1, 2, 3]], t(Y, {
        navigator: {
            handles: {
                backgroundColor: "#ebe7e8",
                borderColor: "#b2b1b6"
            },
            height: 40,
            margin: 25,
            maskFill: "rgba(128,179,236,0.3)",
            maskInside: !0,
            outlineColor: "#b2b1b6",
            outlineWidth: 1,
            series: {
                type: Ge.areaspline === E ? "line" : "areaspline",
                color: "#4572A7",
                compare: null,
                fillOpacity: .05,
                dataGrouping: {
                    approximation: "average",
                    enabled: !0,
                    groupPixelWidth: 2,
                    smoothed: !0,
                    units: Ye
                },
                dataLabels: {
                    enabled: !1,
                    zIndex: 2
                },
                id: "highcharts-navigator-series",
                lineColor: "#4572A7",
                lineWidth: 1,
                marker: {
                    enabled: !1
                },
                pointRange: 0,
                shadow: !1,
                threshold: null
            },
            xAxis: {
                tickWidth: 0,
                lineWidth: 0,
                gridLineColor: "#EEE",
                gridLineWidth: 1,
                tickPixelInterval: 200,
                labels: {
                    align: "left",
                    style: {
                        color: "#888"
                    },
                    x: 3,
                    y: -4
                },
                crosshair: !1
            },
            yAxis: {
                gridLineWidth: 0,
                startOnTick: !1,
                endOnTick: !1,
                minPadding: .1,
                maxPadding: .1,
                labels: {
                    enabled: !1
                },
                crosshair: !1,
                title: {
                    text: null
                },
                tickWidth: 0
            }
        },
        scrollbar: {
            height: Me ? 20 : 14,
            barBackgroundColor: "#bfc8d1",
            barBorderRadius: 0,
            barBorderWidth: 1,
            barBorderColor: "#bfc8d1",
            buttonArrowColor: "#666",
            buttonBackgroundColor: "#ebe7e8",
            buttonBorderColor: "#bbb",
            buttonBorderRadius: 0,
            buttonBorderWidth: 1,
            minWidth: 6,
            rifleColor: "#666",
            trackBackgroundColor: "#eeeeee",
            trackBorderColor: "#eeeeee",
            trackBorderWidth: 1,
            liveRedraw: Le && !Me
        }
    }), _.prototype = {
        drawHandle: function(t, e) {
            var i, n = this.chart,
                s = n.renderer,
                o = this.elementsToDestroy,
                r = this.handles,
                a = this.navigatorOptions.handles,
                a = {
                    fill: a.backgroundColor,
                    stroke: a.borderColor,
                    "stroke-width": 1
                };
            this.rendered || (r[e] = s.g("navigator-handle-" + ["left", "right"][e]).css({
                cursor: "e-resize"
            }).attr({
                zIndex: 4 - e
            }).add(), i = s.rect(-4.5, 0, 9, 16, 0, 1).attr(a).add(r[e]), o.push(i), i = s.path(["M", -1.5, 4, "L", -1.5, 12, "M", .5, 4, "L", .5, 12]).attr(a).add(r[e]), o.push(i)), r[e][n.isResizing ? "animate" : "attr"]({
                translateX: this.scrollerLeft + this.scrollbarHeight + parseInt(t, 10),
                translateY: this.top + this.height / 2 - 8
            })
        },
        drawScrollbarButton: function(t) {
            var e, i = this.chart.renderer,
                n = this.elementsToDestroy,
                s = this.scrollbarButtons,
                o = this.scrollbarHeight,
                r = this.scrollbarOptions;
            this.rendered || (s[t] = i.g().add(this.scrollbarGroup), e = i.rect(-.5, -.5, o + 1, o + 1, r.buttonBorderRadius, r.buttonBorderWidth).attr({
                stroke: r.buttonBorderColor,
                "stroke-width": r.buttonBorderWidth,
                fill: r.buttonBackgroundColor
            }).add(s[t]), n.push(e), e = i.path(["M", o / 2 + (t ? -1 : 1), o / 2 - 3, "L", o / 2 + (t ? -1 : 1), o / 2 + 3, o / 2 + (t ? 2 : -2), o / 2]).attr({
                fill: r.buttonArrowColor
            }).add(s[t]), n.push(e)), t && s[t].attr({
                translateX: this.scrollerWidth - o
            })
        },
        render: function(t, e, i, n) {
            var s, o, r, a, l, h = this.chart,
                c = h.renderer,
                d = this.scrollbarGroup,
                p = this.navigatorGroup,
                g = this.scrollbar,
                p = this.xAxis,
                f = this.scrollbarTrack,
                m = this.scrollbarHeight,
                x = this.scrollbarEnabled,
                y = this.navigatorOptions,
                v = this.scrollbarOptions,
                b = v.minWidth,
                k = this.height,
                w = this.top,
                S = this.navigatorEnabled,
                C = y.outlineWidth,
                A = C / 2,
                T = 0,
                M = this.outlineHeight,
                P = v.barBorderRadius,
                L = v.barBorderWidth,
                I = w + A;
            isNaN(t) || (this.navigatorLeft = s = u(p.left, h.plotLeft + m), this.navigatorWidth = o = u(p.len, h.plotWidth - 2 * m), this.scrollerLeft = r = s - m, this.scrollerWidth = a = a = o + 2 * m, p.getExtremes && (l = this.getUnionExtremes(!0)) && (l.dataMin !== p.min || l.dataMax !== p.max) && p.setExtremes(l.dataMin, l.dataMax, !0, !1), i = u(i, p.translate(t)), n = u(n, p.translate(e)), (isNaN(i) || 1 / 0 === me(i)) && (i = 0, n = a), p.translate(n, !0) - p.translate(i, !0) < h.xAxis[0].minRange || (this.zoomedMax = fe(ge(i, n), o), this.zoomedMin = ge(this.fixedWidth ? this.zoomedMax - this.fixedWidth : fe(i, n), 0), this.range = this.zoomedMax - this.zoomedMin, i = de(this.zoomedMax), e = de(this.zoomedMin), t = i - e, this.rendered || (S && (this.navigatorGroup = p = c.g("navigator").attr({
                zIndex: 3
            }).add(), this.leftShade = c.rect().attr({
                fill: y.maskFill
            }).add(p), y.maskInside || (this.rightShade = c.rect().attr({
                fill: y.maskFill
            }).add(p)), this.outline = c.path().attr({
                "stroke-width": C,
                stroke: y.outlineColor
            }).add(p)), x && (this.scrollbarGroup = d = c.g("scrollbar").add(), g = v.trackBorderWidth, this.scrollbarTrack = f = c.rect().attr({
                x: 0,
                y: -g % 2 / 2,
                fill: v.trackBackgroundColor,
                stroke: v.trackBorderColor,
                "stroke-width": g,
                r: v.trackBorderRadius || 0,
                height: m
            }).add(d), this.scrollbar = g = c.rect().attr({
                y: -L % 2 / 2,
                height: m,
                fill: v.barBackgroundColor,
                stroke: v.barBorderColor,
                "stroke-width": L,
                r: P
            }).add(d), this.scrollbarRifles = c.path().attr({
                stroke: v.rifleColor,
                "stroke-width": 1
            }).add(d))), h = h.isResizing ? "animate" : "attr", S && (this.leftShade[h](y.maskInside ? {
                x: s + e,
                y: w,
                width: i - e,
                height: k
            } : {
                x: s,
                y: w,
                width: e,
                height: k
            }), this.rightShade && this.rightShade[h]({
                x: s + i,
                y: w,
                width: o - i,
                height: k
            }), this.outline[h]({
                d: ["M", r, I, "L", s + e + A, I, s + e + A, I + M, "L", s + i - A, I + M, "L", s + i - A, I, r + a, I].concat(y.maskInside ? ["M", s + e + A, I, "L", s + i - A, I] : [])
            }), this.drawHandle(e + A, 0), this.drawHandle(i + A, 1)), x && d && (this.drawScrollbarButton(0), this.drawScrollbarButton(1), d[h]({
                translateX: r,
                translateY: de(I + k)
            }), f[h]({
                width: a
            }), s = m + e, o = t - L, b > o && (T = (b - o) / 2, o = b, s -= T), this.scrollbarPad = T, g[h]({
                x: pe(s) + L % 2 / 2,
                width: o
            }), b = m + e + t / 2 - .5, this.scrollbarRifles.attr({
                visibility: t > 12 ? "visible" : "hidden"
            })[h]({
                d: ["M", b - 3, m / 4, "L", b - 3, 2 * m / 3, "M", b, m / 4, "L", b, 2 * m / 3, "M", b + 3, m / 4, "L", b + 3, 2 * m / 3]
            })), this.scrollbarPad = T, this.rendered = !0))
        },
        addEvents: function() {
            var t, e = this.chart.container,
                i = this.mouseDownHandler,
                n = this.mouseMoveHandler,
                s = this.mouseUpHandler;
            t = [
                [e, "mousedown", i],
                [e, "mousemove", n],
                [document, "mouseup", s]
            ], X && t.push([e, "touchstart", i], [e, "touchmove", n], [document, "touchend", s]), $e(t, function(t) {
                qe.apply(null, t)
            }), this._events = t
        },
        removeEvents: function() {
            $e(this._events, function(t) {
                Je.apply(null, t)
            }), this._events = E, this.navigatorEnabled && this.baseSeries && Je(this.baseSeries, "updatedData", this.updatedDataHandler)
        },
        init: function() {
            var t, i, n, s, o, r = this,
                a = r.chart,
                l = r.scrollbarHeight,
                h = r.navigatorOptions,
                c = r.height,
                d = r.top,
                p = document.body.style,
                g = r.baseSeries;
            r.mouseDownHandler = function(e) {
                var i, e = a.pointer.normalize(e),
                    s = r.zoomedMin,
                    l = r.zoomedMax,
                    h = r.top,
                    d = r.scrollbarHeight,
                    u = r.scrollerLeft,
                    g = r.scrollerWidth,
                    f = r.navigatorLeft,
                    m = r.navigatorWidth,
                    x = r.scrollbarPad,
                    y = r.range,
                    v = e.chartX,
                    b = e.chartY,
                    e = a.xAxis[0],
                    k = Me ? 10 : 7;
                b > h && h + c + d > b && ((h = !r.scrollbarEnabled || h + c > b) && ce.abs(v - s - f) < k ? (r.grabbedLeft = !0, r.otherHandlePos = l, r.fixedExtreme = e.max, a.fixedRange = null) : h && ce.abs(v - l - f) < k ? (r.grabbedRight = !0, r.otherHandlePos = s, r.fixedExtreme = e.min, a.fixedRange = null) : v > f + s - x && f + l + x > v ? (r.grabbedCenter = v, r.fixedWidth = y, a.renderer.isSVG && (o = p.cursor, p.cursor = "ew-resize"), n = v - s) : v > u && u + g > v && (l = h ? v - f - y / 2 : f > v ? s - .2 * y : v > u + g - d ? s + .2 * y : f + s > v ? s - y : l, 0 > l ? l = 0 : l + y >= m && (l = m - y, i = t.dataMax), l !== s && (r.fixedWidth = y, s = t.toFixedRange(l, l + y, null, i), e.setExtremes(s.min, s.max, !0, !1, {
                    trigger: "navigator"
                }))))
            }, r.mouseMoveHandler = function(t) {
                var e, i = r.scrollbarHeight,
                    o = r.navigatorLeft,
                    l = r.navigatorWidth,
                    h = r.scrollerLeft,
                    c = r.scrollerWidth,
                    d = r.range;
                0 !== t.pageX && (t = a.pointer.normalize(t), e = t.chartX, o > e ? e = o : e > h + c - i && (e = h + c - i), r.grabbedLeft ? (s = !0, r.render(0, 0, e - o, r.otherHandlePos)) : r.grabbedRight ? (s = !0, r.render(0, 0, r.otherHandlePos, e - o)) : r.grabbedCenter && (s = !0, n > e ? e = n : e > l + n - d && (e = l + n - d), r.render(0, 0, e - n, e - n + d)), s && r.scrollbarOptions.liveRedraw && setTimeout(function() {
                    r.mouseUpHandler(t)
                }, 0))
            }, r.mouseUpHandler = function(e) {
                var i, l;
                s && (r.zoomedMin === r.otherHandlePos ? i = r.fixedExtreme : r.zoomedMax === r.otherHandlePos && (l = r.fixedExtreme), i = t.toFixedRange(r.zoomedMin, r.zoomedMax, i, l), a.xAxis[0].setExtremes(i.min, i.max, !0, !1, {
                    trigger: "navigator",
                    triggerOp: "navigator-drag",
                    DOMEvent: e
                })), "mousemove" !== e.type && (r.grabbedLeft = r.grabbedRight = r.grabbedCenter = r.fixedWidth = r.fixedExtreme = r.otherHandlePos = s = n = null, p.cursor = o || "")
            };
            var f = a.xAxis.length,
                m = a.yAxis.length;
            a.extraBottomMargin = r.outlineHeight + h.margin, r.navigatorEnabled ? (r.xAxis = t = new O(a, e({
                ordinal: g && g.xAxis.options.ordinal
            }, h.xAxis, {
                id: "navigator-x-axis",
                isX: !0,
                type: "datetime",
                index: f,
                height: c,
                offset: 0,
                offsetLeft: l,
                offsetRight: -l,
                keepOrdinalPadding: !0,
                startOnTick: !1,
                endOnTick: !1,
                minPadding: 0,
                maxPadding: 0,
                zoomEnabled: !1
            })), r.yAxis = i = new O(a, e(h.yAxis, {
                id: "navigator-y-axis",
                alignTicks: !1,
                height: c,
                offset: 0,
                index: m,
                zoomEnabled: !1
            })), g || h.series.data ? r.addBaseSeries() : 0 === a.series.length && v(a, "redraw", function(t, e) {
                a.series.length > 0 && !r.series && (r.setBaseSeries(), a.redraw = t), t.call(a, e)
            })) : r.xAxis = t = {
                translate: function(t, e) {
                    var i = a.xAxis[0],
                        n = i.getExtremes(),
                        s = a.plotWidth - 2 * l,
                        o = Hi("min", i.options.min, n.dataMin),
                        i = Hi("max", i.options.max, n.dataMax) - o;
                    return e ? t * i / s + o : s * (t - o) / i
                },
                toFixedRange: O.prototype.toFixedRange
            }, v(a, "getMargins", function(e) {
                var n = this.legend,
                    s = n.options;
                e.call(this), r.top = d = r.navigatorOptions.top || this.chartHeight - r.height - r.scrollbarHeight - this.spacing[2] - ("bottom" === s.verticalAlign && s.enabled && !s.floating ? n.legendHeight + u(s.margin, 10) : 0), t && i && (t.options.top = i.options.top = d, t.setAxisSize(), i.setAxisSize())
            }), r.addEvents()
        },
        getUnionExtremes: function(t) {
            var e = this.chart.xAxis[0],
                i = this.xAxis,
                n = i.options,
                s = e.options;
            return t && null === e.dataMin ? void 0 : {
                dataMin: Hi("min", n && n.min, s.min, e.dataMin, i.dataMin),
                dataMax: Hi("max", n && n.max, s.max, e.dataMax, i.dataMax)
            }
        },
        setBaseSeries: function(t) {
            var e = this.chart,
                t = t || e.options.navigator.baseSeries;
            this.series && this.series.remove(), this.baseSeries = e.series[t] || "string" == typeof t && e.get(t) || e.series[0], this.xAxis && this.addBaseSeries()
        },
        addBaseSeries: function() {
            var i, n = this.baseSeries,
                s = n ? n.options : {},
                o = s.data,
                r = this.navigatorOptions.series;
            i = r.data, this.hasNavigatorData = !!i, s = e(s, r, {
                enableMouseTracking: !1,
                group: "nav",
                padXAxis: !1,
                xAxis: "navigator-x-axis",
                yAxis: "navigator-y-axis",
                name: "Navigator",
                showInLegend: !1,
                isInternal: !0,
                visible: !0
            }), s.data = i || o, this.series = this.chart.initSeries(s), n && this.navigatorOptions.adaptToUpdatedData !== !1 && (qe(n, "updatedData", this.updatedDataHandler), n.userOptions.events = t(n.userOptions.event, {
                updatedData: this.updatedDataHandler
            }))
        },
        updatedDataHandler: function() {
            var t, e, i, n, s, o = this.chart.scroller,
                r = o.baseSeries,
                a = r.xAxis,
                l = a.getExtremes(),
                h = l.min,
                c = l.max,
                d = l.dataMin,
                l = l.dataMax,
                p = c - h,
                u = o.series;
            t = u.xData;
            var g = !!a.setExtremes;
            e = c >= t[t.length - 1] - (this.closestPointRange || 0), t = d >= h, o.hasNavigatorData || (u.options.pointStart = r.xData[0], u.setData(r.options.data, !1), s = !0), t && (n = d, i = n + p), e && (i = l, t || (n = ge(i - p, u.xData[0]))), g && (t || e) ? isNaN(n) || a.setExtremes(n, i, !0, !1, {
                trigger: "updatedData"
            }) : (s && this.chart.redraw(!1), o.render(ge(h, d), fe(c, l)))
        },
        destroy: function() {
            this.removeEvents(), $e([this.xAxis, this.yAxis, this.leftShade, this.rightShade, this.outline, this.scrollbarTrack, this.scrollbarRifles, this.scrollbarGroup, this.scrollbar], function(t) {
                t && t.destroy && t.destroy()
            }), this.xAxis = this.yAxis = this.leftShade = this.rightShade = this.outline = this.scrollbarTrack = this.scrollbarRifles = this.scrollbarGroup = this.scrollbar = null, $e([this.scrollbarButtons, this.handles, this.elementsToDestroy], function(t) {
                T(t)
            })
        }
    }, ae.Scroller = _, v(O.prototype, "zoom", function(t, e, i) {
        var n, s = this.chart,
            o = s.options,
            r = o.chart.zoomType,
            a = o.navigator,
            o = o.rangeSelector;
        return this.isXAxis && (a && a.enabled || o && o.enabled) && ("x" === r ? s.resetZoomButton = "blocked" : "y" === r ? n = !1 : "xy" === r && (s = this.previousZoom, c(e) ? this.previousZoom = [this.min, this.max] : s && (e = s[0], i = s[1], delete this.previousZoom))), n !== E ? n : t.call(this, e, i)
    }), v(z.prototype, "init", function(t, e, i) {
        qe(this, "beforeRender", function() {
            var t = this.options;
            (t.navigator.enabled || t.scrollbar.enabled) && (this.scroller = new _(this))
        }), t.call(this, e, i)
    }), v(ki.prototype, "addPoint", function(t, e, i, n, r) {
        var a = this.options.turboThreshold;
        a && this.xData.length > a && s(e) && !o(e) && this.chart.scroller && $(20, !0), t.call(this, e, i, n, r)
    }), t(Y, {
        rangeSelector: {
            buttonTheme: {
                width: 28,
                height: 18,
                fill: "#f7f7f7",
                padding: 2,
                r: 0,
                "stroke-width": 0,
                style: {
                    color: "#444",
                    cursor: "pointer",
                    fontWeight: "normal"
                },
                zIndex: 7,
                states: {
                    hover: {
                        fill: "#e7e7e7"
                    },
                    select: {
                        fill: "#e7f0f9",
                        style: {
                            color: "black",
                            fontWeight: "bold"
                        }
                    }
                }
            },
            inputPosition: {
                align: "right"
            },
            labelStyle: {
                color: "#666"
            }
        }
    }), Y.lang = e(Y.lang, {
        rangeSelectorZoom: "Zoom",
        rangeSelectorFrom: "From",
        rangeSelectorTo: "To"
    }), R.prototype = {
        clickButton: function(t, i) {
            var n, s, o = this,
                r = o.selected,
                a = o.chart,
                l = o.buttons,
                h = o.buttonOptions[t],
                c = a.xAxis[0],
                d = a.scroller && a.scroller.getUnionExtremes() || c || {},
                p = d.dataMin,
                g = d.dataMax,
                f = c && de(fe(c.max, u(g, c.max))),
                m = new Date(f),
                x = h.type,
                y = h.count,
                d = h._range;
            if (null !== p && null !== g && t !== o.selected) {
                if ("month" === x || "year" === x) n = {
                    month: "Month",
                    year: "FullYear"
                }[x], m["set" + n](m["get" + n]() - y), n = m.getTime(), p = u(p, Number.MIN_VALUE), isNaN(n) || p > n ? (n = p, f = fe(n + d, g)) : d = f - n;
                else if (d) n = ge(f - d, p), f = fe(n + d, g);
                else if ("ytd" === x) {
                    if (!c) return void qe(a, "beforeRender", function() {
                        o.clickButton(t)
                    });
                    g === E && (p = Number.MAX_VALUE, g = Number.MIN_VALUE, $e(a.series, function(t) {
                        t = t.xData, p = fe(t[0], p), g = ge(t[t.length - 1], g)
                    }), i = !1), f = new Date(g), s = f.getFullYear(), n = s = ge(p || 0, Date.UTC(s, 0, 1)), f = f.getTime(), f = fe(g || f, f)
                } else "all" === x && c && (n = p, f = g);
                l[r] && l[r].setState(0), l[t] && l[t].setState(2), a.fixedRange = d, c ? c.setExtremes(n, f, u(i, 1), 0, {
                    trigger: "rangeSelectorButton",
                    rangeSelectorButton: h
                }) : (r = a.options.xAxis, r[0] = e(r[0], {
                    range: d,
                    min: s
                })), o.setSelected(t)
            }
        },
        setSelected: function(t) {
            this.selected = this.options.selected = t
        },
        defaultButtons: [{
            type: "month",
            count: 1,
            text: "1m"
        }, {
            type: "month",
            count: 3,
            text: "3m"
        }, {
            type: "month",
            count: 6,
            text: "6m"
        }, {
            type: "ytd",
            text: "YTD"
        }, {
            type: "year",
            count: 1,
            text: "1y"
        }, {
            type: "all",
            text: "All"
        }],
        init: function(t) {
            var e = this,
                i = t.options.rangeSelector,
                n = i.buttons || [].concat(e.defaultButtons),
                s = i.selected,
                o = e.blurInputs = function() {
                    var t = e.minInput,
                        i = e.maxInput;
                    t && t.blur(), i && i.blur()
                };
            e.chart = t, e.options = i, e.buttons = [], t.extraTopMargin = 35, e.buttonOptions = n, qe(t.container, "mousedown", o), qe(t, "resize", o), $e(n, e.computeButtonRange), s !== E && n[s] && this.clickButton(s, !1), qe(t, "load", function() {
                qe(t.xAxis[0], "afterSetExtremes", function() {
                    e.updateButtonStates(!0)
                })
            })
        },
        updateButtonStates: function(t) {
            var e = this,
                i = this.chart,
                n = i.xAxis[0],
                s = i.scroller && i.scroller.getUnionExtremes() || n,
                o = s.dataMin,
                r = s.dataMax,
                a = e.selected,
                l = e.options.allButtonsEnabled,
                h = e.buttons;
            t && i.fixedRange !== de(n.max - n.min) && (h[a] && h[a].setState(0), e.setSelected(null)), $e(e.buttonOptions, function(t, i) {
                var s = t._range,
                    c = s > r - o,
                    d = s < n.minRange,
                    p = "all" === t.type && n.max - n.min >= r - o && 2 !== h[i].state,
                    u = "ytd" === t.type && F("%Y", o) === F("%Y", r);
                s === de(n.max - n.min) && i !== a ? (e.setSelected(i), h[i].setState(2)) : !l && (c || d || p || u) ? h[i].setState(3) : 3 === h[i].state && h[i].setState(0)
            })
        },
        computeButtonRange: function(t) {
            var e = t.type,
                i = t.count || 1,
                n = {
                    millisecond: 1,
                    second: 1e3,
                    minute: 6e4,
                    hour: 36e5,
                    day: 864e5,
                    week: 6048e5
                };
            n[e] ? t._range = n[e] * i : ("month" === e || "year" === e) && (t._range = 864e5 * {
                month: 30,
                year: 365
            }[e] * i)
        },
        setInputValue: function(t, e) {
            var i = this.chart.options.rangeSelector;
            c(e) && (this[t + "Input"].HCTime = e), this[t + "Input"].value = F(i.inputEditDateFormat || "%Y-%m-%d", this[t + "Input"].HCTime), this[t + "DateBox"].attr({
                text: F(i.inputDateFormat || "%b %e, %Y", this[t + "Input"].HCTime)
            })
        },
        drawInput: function(n) {
            var s, o, r, a = this,
                l = a.chart,
                h = l.renderer.style,
                c = l.renderer,
                d = l.options.rangeSelector,
                p = a.div,
                u = "min" === n,
                m = this.inputGroup;
            this[n + "Label"] = o = c.label(Y.lang[u ? "rangeSelectorFrom" : "rangeSelectorTo"], this.inputGroup.offset).attr({
                padding: 2
            }).css(e(h, d.labelStyle)).add(m), m.offset += o.width + 5, this[n + "DateBox"] = r = c.label("", m.offset).attr({
                padding: 2,
                width: d.inputBoxWidth || 90,
                height: d.inputBoxHeight || 17,
                stroke: d.inputBoxBorderColor || "silver",
                "stroke-width": 1
            }).css(e({
                textAlign: "center",
                color: "#444"
            }, h, d.inputStyle)).on("click", function() {
                a[n + "Input"].focus()
            }).add(m), m.offset += r.width + (u ? 10 : 0), this[n + "Input"] = s = f("input", {
                name: n,
                className: "highcharts-range-selector",
                type: "text"
            }, t({
                position: "absolute",
                border: 0,
                width: "1px",
                height: "1px",
                padding: 0,
                textAlign: "center",
                fontSize: h.fontSize,
                fontFamily: h.fontFamily,
                top: l.plotTop + "px"
            }, d.inputStyle), p), s.onfocus = function() {
                g(this, {
                    left: m.translateX + r.x + "px",
                    top: m.translateY + "px",
                    width: r.width - 2 + "px",
                    height: r.height - 2 + "px",
                    border: "2px solid silver"
                })
            }, s.onblur = function() {
                g(this, {
                    border: 0,
                    width: "1px",
                    height: "1px"
                }), a.setInputValue(n)
            }, s.onchange = function() {
                var t = s.value,
                    e = (d.inputDateParser || Date.parse)(t),
                    n = l.xAxis[0],
                    o = n.dataMin,
                    r = n.dataMax;
                isNaN(e) && (e = t.split("-"), e = Date.UTC(i(e[0]), i(e[1]) - 1, i(e[2]))), isNaN(e) || (Y.global.useUTC || (e += 6e4 * (new Date).getTimezoneOffset()), u ? e > a.maxInput.HCTime ? e = E : o > e && (e = o) : e < a.minInput.HCTime ? e = E : e > r && (e = r), e !== E && l.xAxis[0].setExtremes(u ? e : n.min, u ? n.max : e, E, E, {
                    trigger: "rangeSelectorInput"
                }))
            }
        },
        render: function(e, i) {
            var n, s = this,
                o = s.chart,
                r = o.renderer,
                a = o.container,
                l = o.options,
                h = l.exporting && l.navigation && l.navigation.buttonOptions,
                c = l.rangeSelector,
                d = s.buttons,
                l = Y.lang,
                p = s.div,
                p = s.inputGroup,
                g = c.buttonTheme,
                m = c.inputEnabled !== !1,
                x = g && g.states,
                y = o.plotLeft;
            !s.rendered && (s.zoomText = r.text(l.rangeSelectorZoom, y, o.plotTop - 20).css(c.labelStyle).add(), n = y + s.zoomText.getBBox().width + 5, $e(s.buttonOptions, function(t, e) {
                d[e] = r.button(t.text, n, o.plotTop - 35, function() {
                    s.clickButton(e), s.isActive = !0
                }, g, x && x.hover, x && x.select).css({
                    textAlign: "center"
                }).add(), n += d[e].width + u(c.buttonSpacing, 5), s.selected === e && d[e].setState(2)
            }), s.updateButtonStates(), m) && (s.div = p = f("div", null, {
                position: "relative",
                height: 0,
                zIndex: 1
            }), a.parentNode.insertBefore(p, a), s.inputGroup = p = r.g("input-group").add(), p.offset = 0, s.drawInput("min"), s.drawInput("max")), m && (a = o.plotTop - 45, p.align(t({
                y: a,
                width: p.offset,
                x: h && a < (h.y || 0) + h.height - o.spacing[0] ? -40 : 0
            }, c.inputPosition), !0, o.spacingBox), s.setInputValue("min", e), s.setInputValue("max", i)), s.rendered = !0
        },
        destroy: function() {
            var t, e = this.minInput,
                i = this.maxInput,
                n = this.chart,
                s = this.blurInputs;
            Je(n.container, "mousedown", s), Je(n, "resize", s), T(this.buttons), e && (e.onfocus = e.onblur = e.onchange = null), i && (i.onfocus = i.onblur = i.onchange = null);
            for (t in this) this[t] && "chart" !== t && (this[t].destroy ? this[t].destroy() : this[t].nodeType && M(this[t])), this[t] = null
        }
    }, O.prototype.toFixedRange = function(t, e, i, n) {
        var s = this.chart && this.chart.fixedRange,
            t = u(i, this.translate(t, !0)),
            e = u(n, this.translate(e, !0)),
            i = s && (e - t) / s;
        return i > .7 && 1.3 > i && (n ? t = e - s : e = t + s), {
            min: t,
            max: e
        }
    }, v(z.prototype, "init", function(t, e, i) {
        qe(this, "init", function() {
            this.options.rangeSelector.enabled && (this.rangeSelector = new R(this))
        }), t.call(this, e, i)
    }), ae.RangeSelector = R, z.prototype.callbacks.push(function(t) {
        function e() {
            o = t.xAxis[0].getExtremes(), r.render(o.min, o.max)
        }

        function i() {
            o = t.xAxis[0].getExtremes(), isNaN(o.min) || a.render(o.min, o.max)
        }

        function n(t) {
            "navigator-drag" !== t.triggerOp && r.render(t.min, t.max)
        }

        function s(t) {
            a.render(t.min, t.max)
        }
        var o, r = t.scroller,
            a = t.rangeSelector;
        r && (qe(t.xAxis[0], "afterSetExtremes", n), v(t, "drawChartBox", function(t) {
            var i = this.isDirtyBox;
            t.call(this), i && e()
        }), e()), a && (qe(t.xAxis[0], "afterSetExtremes", s), qe(t, "resize", i), i()), qe(t, "destroy", function() {
            r && Je(t.xAxis[0], "afterSetExtremes", n), a && (Je(t, "resize", i), Je(t.xAxis[0], "afterSetExtremes", s))
        })
    }), ae.StockChart = function(t, i) {
        var n, s = t.series,
            o = u(t.navigator && t.navigator.enabled, !0) ? {
                startOnTick: !1,
                endOnTick: !1
            } : null,
            r = {
                marker: {
                    enabled: !1,
                    radius: 2
                },
                states: {
                    hover: {
                        lineWidth: 2
                    }
                }
            },
            a = {
                shadow: !1,
                borderWidth: 0
            };
        return t.xAxis = Ke(p(t.xAxis || {}), function(t) {
            return e({
                minPadding: 0,
                maxPadding: 0,
                ordinal: !0,
                title: {
                    text: null
                },
                labels: {
                    overflow: "justify"
                },
                showLastLabel: !0
            }, t, {
                type: "datetime",
                categories: null
            }, o)
        }), t.yAxis = Ke(p(t.yAxis || {}), function(t) {
            return n = u(t.opposite, !0), e({
                labels: {
                    y: -2
                },
                opposite: n,
                showLastLabel: !1,
                title: {
                    text: null
                }
            }, t)
        }), t.series = null, t = e({
            chart: {
                panning: !0,
                pinchType: "x"
            },
            navigator: {
                enabled: !0
            },
            scrollbar: {
                enabled: !0
            },
            rangeSelector: {
                enabled: !0
            },
            title: {
                text: null,
                style: {
                    fontSize: "16px"
                }
            },
            tooltip: {
                shared: !0,
                crosshairs: !0
            },
            legend: {
                enabled: !1
            },
            plotOptions: {
                line: r,
                spline: r,
                area: r,
                areaspline: r,
                arearange: r,
                areasplinerange: r,
                column: a,
                columnrange: a,
                candlestick: a,
                ohlc: a
            }
        }, t, {
            _stock: !0,
            chart: {
                inverted: !1
            }
        }), t.series = s, new z(t, i)
    }, v(gi.prototype, "init", function(t, e, i) {
        var n = i.chart.pinchType || "";
        t.call(this, e, i), this.pinchX = this.pinchHor = -1 !== n.indexOf("x"), this.pinchY = this.pinchVert = -1 !== n.indexOf("y"), this.hasZoom = this.hasZoom || this.pinchHor || this.pinchVert
    }), v(O.prototype, "autoLabelAlign", function(t) {
        return this.chart.options._stock && "yAxis" === this.coll && 0 === je(this, this.chart.yAxis) ? (15 === this.options.labels.x && (this.options.labels.x = 0), "right") : t.call(this, [].slice.call(arguments, 1))
    }), O.prototype.getPlotLinePath = function(t, e, i, n, s) {
        var o, r, a, l, h, d, p = this,
            g = this.isLinked && !this.series ? this.linkedParent.series : this.series,
            f = p.chart,
            m = f.renderer,
            x = p.left,
            y = p.top,
            v = [];
        return h = p.isXAxis ? c(p.options.yAxis) ? [f.yAxis[p.options.yAxis]] : Ke(g, function(t) {
            return t.yAxis
        }) : c(p.options.xAxis) ? [f.xAxis[p.options.xAxis]] : Ke(g, function(t) {
            return t.xAxis
        }), $e(p.isXAxis ? f.yAxis : f.xAxis, function(t) {
            if (c(t.options.id) ? -1 === t.options.id.indexOf("navigator") : 1) {
                var e = t.isXAxis ? "yAxis" : "xAxis",
                    e = c(t.options[e]) ? f[e][t.options[e]] : f[e][0];
                p === e && h.push(t)
            }
        }), d = h.length ? [] : [p], $e(h, function(t) {
            -1 === je(t, d) && d.push(t)
        }), s = u(s, p.translate(t, null, null, i)), isNaN(s) || (p.horiz ? $e(d, function(t) {
            r = t.top, l = r + t.len, o = a = de(s + p.transB), (o >= x && o <= x + p.width || n) && v.push("M", o, r, "L", a, l)
        }) : $e(d, function(t) {
            o = t.left, a = o + t.width, r = l = de(y + p.height - s), (r >= y && r <= y + p.height || n) && v.push("M", o, r, "L", a, l)
        })), v.length > 0 ? m.crispPolyLine(v, e || 1) : void 0
    }, O.prototype.getPlotBandPath = function(t, e) {
        var i, n = this.getPlotLinePath(e),
            s = this.getPlotLinePath(t),
            o = [];
        if (s && n)
            for (i = 0; i < s.length; i += 6) o.push("M", s[i + 1], s[i + 2], "L", s[i + 4], s[i + 5], n[i + 4], n[i + 5], n[i + 1], n[i + 2]);
        else o = null;
        return o
    }, li.prototype.crispPolyLine = function(t, e) {
        var i;
        for (i = 0; i < t.length; i += 6) t[i + 1] === t[i + 4] && (t[i + 1] = t[i + 4] = de(t[i + 1]) - e % 2 / 2), t[i + 2] === t[i + 5] && (t[i + 2] = t[i + 5] = de(t[i + 2]) + e % 2 / 2);
        return t
    }, W === ae.VMLRenderer && (hi.prototype.crispPolyLine = li.prototype.crispPolyLine), v(O.prototype, "hideCrosshair", function(t, e) {
        t.call(this, e), c(this.crossLabelArray) && (c(e) ? this.crossLabelArray[e] && this.crossLabelArray[e].hide() : $e(this.crossLabelArray, function(t) {
            t.hide()
        }))
    }), v(O.prototype, "drawCrosshair", function(e, i, n) {
        var s, o;
        if (e.call(this, i, n), c(this.crosshair.label) && this.crosshair.label.enabled && c(n)) {
            var r, a, e = this.chart,
                l = this.options.crosshair.label,
                h = this.isXAxis ? "x" : "y",
                i = this.horiz,
                d = this.opposite,
                p = this.left,
                g = this.top,
                f = this.crossLabel,
                m = l.format,
                x = "";
            f || (f = this.crossLabel = e.renderer.label().attr({
                align: l.align || (i ? "center" : d ? "right" === this.labelAlign ? "right" : "left" : "left" === this.labelAlign ? "left" : "center"),
                zIndex: 12,
                height: i ? 16 : E,
                fill: l.backgroundColor || this.series[0] && this.series[0].color || "gray",
                padding: u(l.padding, 2),
                stroke: l.borderColor || null,
                "stroke-width": l.borderWidth || 0
            }).css(t({
                color: "white",
                fontWeight: "normal",
                fontSize: "11px",
                textAlign: "center"
            }, l.style)).add()), i ? (r = n.plotX + p, a = g + (d ? 0 : this.height)) : (r = d ? this.width + p : 0, a = n.plotY + g), g > a || a > g + this.height ? this.hideCrosshair() : (!m && !l.formatter && (this.isDatetimeAxis && (x = "%b %d, %Y"), m = "{value" + (x ? ":" + x : "") + "}"), f.attr({
                text: m ? b(m, {
                    value: n[h]
                }) : l.formatter.call(this, n[h]),
                x: r,
                y: a,
                visibility: "visible"
            }), n = f.getBBox(), i ? ("inside" === this.options.tickPosition && !d || "inside" !== this.options.tickPosition && d) && (a = f.y - n.height) : a = f.y - n.height / 2, i ? (s = p - n.x, o = p + this.width - n.x) : (s = "left" === this.labelAlign ? p : 0, o = "right" === this.labelAlign ? p + this.width : e.chartWidth), f.translateX < s && (r += s - f.translateX), f.translateX + n.width >= o && (r -= f.translateX + n.width - o), f.attr({
                x: r,
                y: a,
                visibility: "visible"
            }))
        }
    });
    var _i = Ai.init,
        Ri = Ai.processData,
        Ei = bi.prototype.tooltipFormatter;
    Ai.init = function() {
        _i.apply(this, arguments), this.setCompare(this.options.compare)
    }, Ai.setCompare = function(t) {
        this.modifyValue = "value" === t || "percent" === t ? function(e, i) {
            var n = this.compareValue;
            return e !== E && (e = "value" === t ? e - n : e = 100 * (e / n) - 100, i) && (i.change = e), e
        } : null, this.chart.hasRendered && (this.isDirty = !0)
    }, Ai.processData = function() {
        var t, e, i, n = 0;
        if (Ri.apply(this, arguments), this.xAxis && this.processedYData)
            for (t = this.processedXData, e = this.processedYData, i = e.length; i > n; n++)
                if ("number" == typeof e[n] && t[n] >= this.xAxis.min) {
                    this.compareValue = e[n];
                    break
                }
    }, v(Ai, "getExtremes", function(t) {
        t.apply(this, [].slice.call(arguments, 1)), this.modifyValue && (this.dataMax = this.modifyValue(this.dataMax), this.dataMin = this.modifyValue(this.dataMin))
    }), O.prototype.setCompare = function(t, e) {
        this.isXAxis || ($e(this.series, function(e) {
            e.setCompare(t)
        }), u(e, !0) && this.chart.redraw())
    }, bi.prototype.tooltipFormatter = function(t) {
        return t = t.replace("{point.change}", (this.change > 0 ? "+" : "") + x(this.change, u(this.series.tooltipOptions.changeDecimals, 2))), Ei.apply(this, [t])
    }, v(ki.prototype, "render", function(t) {
        this.chart.options._stock && (!this.clipBox && this.animate && -1 !== this.animate.toString().indexOf("sharedClip") ? (this.clipBox = e(this.chart.clipBox), this.clipBox.width = this.xAxis.len, this.clipBox.height = this.yAxis.len) : this.chart[this.sharedClipKey] && this.chart[this.sharedClipKey].attr({
            width: this.xAxis.len,
            height: this.yAxis.len
        })), t.call(this)
    }), t(ae, {
        Axis: O,
        Chart: z,
        Color: ai,
        Point: bi,
        Tick: B,
        Renderer: W,
        Series: ki,
        SVGElement: D,
        SVGRenderer: li,
        arrayMin: C,
        arrayMax: A,
        charts: He,
        dateFormat: F,
        format: b,
        pathAnim: V,
        getOptions: function() {
            return Y
        },
        hasBidiBug: Ie,
        isTouchDevice: Me,
        numberFormat: x,
        seriesTypes: Ge,
        setOptions: function(t) {
            return Y = e(!0, Y, t), I(), Y
        },
        addEvent: qe,
        removeEvent: Je,
        createElement: f,
        discardElement: M,
        css: g,
        each: $e,
        extend: t,
        map: Ke,
        merge: e,
        pick: u,
        splat: p,
        extendClass: m,
        pInt: i,
        wrap: v,
        svg: Le,
        canvas: De,
        vml: !Le && !De,
        product: "Highstock",
        version: "2.0.3"
    })
}(), $(function() {
        $(".j_stocks_addmore").click(function() {
            var t = getCurrentPage() + 1;
            searchStocks(t, !1, !1, !1)
        }), $(document).on("mouseenter", ".j_stocks_search a", function() {
            if ("true" != $(this).find(".stockchart").attr("request-already")) {
                var t = $(this).attr("stock-id"),
                    e = $(this).find(".stockchart");
                $.get("/ajax/stocks/" + t + "/chart", function(t) {
                    setStockChart(e, t), e.attr("request-already", "true")
                })
            }
        }), window.onpopstate = function(t) {
            t.state && t.state.search && (setSearchConditions(t.state), searchStocks(1, !0, !1, !1))
        }, $(".searchmenu dt").click(function() {
            $(this).parent().hasClass("selected") || ($(this).parent().toggleClass("active").siblings("dl").not(".selected").removeClass("active"), caishuo.adjustFooter())
        }), $(".searchmenu a").click(function() {
            return $(this).hasClass("disabled") ? !1 : ($(this).addClass("active").siblings().removeClass("active"), $(this).closest("dl").addClass("selected").siblings("dl").not(".selected").removeClass("active"), $(".searchmenu h2 del").show(), $(".j_stocks_search").empty(), adjustSearchMenus(), searchStocks(1, !0, !1, !0), !1)
        }), $(".j_filter_order .sortcolumn").click(function() {
            $(this).siblings().removeClass("sortup").removeClass("sortdown"), $(this).hasClass("sortup") ? $(this).removeClass("sortup").addClass("sortdown") : $(this).hasClass("sortdown") ? $(this).removeClass("sortdown").addClass("sortup") : $(this).addClass("sortdown"), $(".j_stocks_search").empty(), searchStocks(1, !0, !1, !0)
        }), $(".searchmenu h2 del").click(function() {
            $(".searchmenu a").removeClass("active"), $(".searchmenu dl").removeClass("active").removeClass("selected"), $("#filterstar .ratestar1 span").width(0), $("#filterstar a").attr("data-filter", 0), $(this).hide(), $(".j_stocks_search").empty(), adjustSearchMenus(), searchStocks(1, !0, !1, !0)
        }), $(".searchmenu dl del").click(function() {
            if ($(this).closest("dl").removeClass("active").removeClass("selected").find("a").removeClass("active"), "filterstar" == $(this).closest("dl").attr("id")) {
                var t = $(this).closest("dl").find(".ratestar1");
                t.find("span").width(0), t.closest("a").attr("data-filter", 0)
            }
            return $(".searchmenu h2 del").toggle($(".searchmenu a.active").length > 0), $(".j_stocks_search").empty(), adjustSearchMenus(), searchStocks(1, !0, !1, !0), !1
        }), $("#filterstar .ratestar1").mousemove(function(t) {
            var e = t.originalEvent.layerX + 21,
                i = Math.floor(e / $(this).width() * 5);
            $(this).find("span").width(20 * i + "%")
        }).mouseout(function() {
            var t = $(this).closest("a").attr("data-filter");
            $(this).find("span").width(20 * t + "%")
        }).click(function(t) {
            var e = t.originalEvent.layerX + 21,
                i = Math.floor(e / $(this).width() * 5);
            $(this).closest("a").attr("data-filter", i)
        }), $.isEmptyObject(_pre_search_params.search) ? ($(".exchange_market dt").trigger("click"), $(".stockIndex").show(), loadMarketIndex()) : (setSearchConditions(_pre_search_params), adjustSearchMenus(), $("#j_stockresult").show()), setInitialStateWhenFirstLoad()
    }),

    function() {
        function t(t, e) {
            var i;
            t || (t = {});
            for (i in e) t[i] = e[i];
            return t
        }

        function e() {
            var t, e, i = arguments,
                n = {},
                s = function(t, e) {
                    var i, n;
                    "object" != typeof t && (t = {});
                    for (n in e) e.hasOwnProperty(n) && (i = e[n], t[n] = i && "object" == typeof i && "[object Array]" !== Object.prototype.toString.call(i) && "renderTo" !== n && "number" != typeof i.nodeType ? s(t[n] || {}, i) : e[n]);
                    return t
                };
            for (i[0] === !0 && (n = i[1], i = Array.prototype.slice.call(i, 2)), e = i.length, t = 0; e > t; t++) n = s(n, i[t]);
            return n
        }

        function i(t, e) {
            return parseInt(t, e || 10)
        }

        function n(t) {
            return "string" == typeof t
        }

        function s(t) {
            return t && "object" == typeof t
        }

        function o(t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        }

        function r(t) {
            return "number" == typeof t
        }

        function a(t) {
            return le.log(t) / le.LN10
        }

        function l(t) {
            return le.pow(10, t)
        }

        function h(t, e) {
            for (var i = t.length; i--;)
                if (t[i] === e) {
                    t.splice(i, 1);
                    break
                }
        }

        function c(t) {
            return t !== _ && null !== t
        }

        function d(t, e, i) {
            var o, r;
            if (n(e)) c(i) ? t.setAttribute(e, i) : t && t.getAttribute && (r = t.getAttribute(e));
            else if (c(e) && s(e))
                for (o in e) t.setAttribute(o, e[o]);
            return r
        }

        function p(t) {
            return o(t) ? t : [t]
        }

        function u() {
            var t, e, i = arguments,
                n = i.length;
            for (t = 0; n > t; t++)
                if (e = i[t], e !== _ && null !== e) return e
        }

        function g(e, i) {
            ke && !Me && i && i.opacity !== _ && (i.filter = "alpha(opacity=" + 100 * i.opacity + ")"), t(e.style, i)
        }

        function f(e, i, n, s, o) {
            return e = re.createElement(e), i && t(e, i), o && g(e, {
                padding: 0,
                border: _e,
                margin: 0
            }), n && g(e, n), s && s.appendChild(e), e
        }

        function m(e, i) {
            var n = function() {
                return _
            };
            return n.prototype = new e, t(n.prototype, i), n
        }

        function x(t, e, n, s) {
            var o = X.lang,
                t = +t || 0,
                r = -1 === e ? (t.toString().split(".")[1] || "").length : isNaN(e = ge(e)) ? 2 : e,
                e = void 0 === n ? o.decimalPoint : n,
                s = void 0 === s ? o.thousandsSep : s,
                o = 0 > t ? "-" : "",
                n = String(i(t = ge(t).toFixed(r))),
                a = n.length > 3 ? n.length % 3 : 0;
            return o + (a ? n.substr(0, a) + s : "") + n.substr(a).replace(/(\d{3})(?=\d)/g, "$1" + s) + (r ? e + ge(t - n).toFixed(r).slice(2) : "")
        }

        function y(t, e) {
            return Array((e || 2) + 1 - String(t).length).join(0) + t
        }

        function v(t, e, i) {
            var n = t[e];
            t[e] = function() {
                var t = Array.prototype.slice.call(arguments);
                return t.unshift(n), i.apply(this, t)
            }
        }

        function b(t, e) {
            for (var i, n, s, o, r, a = "{", l = !1, h = []; - 1 !== (a = t.indexOf(a));) {
                if (i = t.slice(0, a), l) {
                    for (n = i.split(":"), s = n.shift().split("."), r = s.length, i = e, o = 0; r > o; o++) i = i[s[o]];
                    n.length && (n = n.join(":"), s = /\.([0-9])/, o = X.lang, r = void 0, /f$/.test(n) ? (r = (r = n.match(s)) ? r[1] : -1, null !== i && (i = x(i, r, o.decimalPoint, n.indexOf(",") > -1 ? o.thousandsSep : ""))) : i = G(n, i))
                }
                h.push(i), t = t.slice(a + 1), a = (l = !l) ? "}" : "{"
            }
            return h.push(t), h.join("")
        }

        function k(t) {
            return le.pow(10, ce(le.log(t) / le.LN10))
        }

        function w(t, e, i, n) {
            var s, i = u(i, 1);
            for (s = t / i, e || (e = [1, 2, 2.5, 5, 10], n && n.allowDecimals === !1 && (1 === i ? e = [1, 2, 5, 10] : .1 >= i && (e = [1 / i]))), n = 0; n < e.length && (t = e[n], !(s <= (e[n] + (e[n + 1] || e[n])) / 2)); n++);
            return t *= i
        }

        function S(t, e) {
            var i, n, s = t.length;
            for (n = 0; s > n; n++) t[n].ss_i = n;
            for (t.sort(function(t, n) {
                    return i = e(t, n), 0 === i ? t.ss_i - n.ss_i : i
                }), n = 0; s > n; n++) delete t[n].ss_i
        }

        function C(t) {
            for (var e = t.length, i = t[0]; e--;) t[e] < i && (i = t[e]);
            return i
        }

        function A(t) {
            for (var e = t.length, i = t[0]; e--;) t[e] > i && (i = t[e]);
            return i
        }

        function T(t, e) {
            for (var i in t) t[i] && t[i] !== e && t[i].destroy && t[i].destroy(), delete t[i]
        }

        function M(t) {
            W || (W = f(He)), t && W.appendChild(t), W.innerHTML = ""
        }

        function P(t) {
            return parseFloat(t.toPrecision(14))
        }

        function L(t, e) {
            Y = u(t, e.animation)
        }

        function I() {
            var t = X.global.useUTC,
                e = t ? "getUTC" : "get",
                i = t ? "setUTC" : "set";
            $ = 6e4 * (t && X.global.timezoneOffset || 0), j = t ? Date.UTC : function(t, e, i, n, s, o) {
                return new Date(t, e, u(i, 1), u(n, 0), u(s, 0), u(o, 0)).getTime()
            }, U = e + "Minutes", Z = e + "Hours", K = e + "Day", q = e + "Date", J = e + "Month", Q = e + "FullYear", te = i + "Minutes", ee = i + "Hours", ie = i + "Date", ne = i + "Month", se = i + "FullYear"
        }

        function D() {}

        function B(t, e, i, n) {
            this.axis = t, this.pos = e, this.type = i || "", this.isNew = !0, !i && !n && this.addLabel()
        }

        function O() {
            this.init.apply(this, arguments)
        }

        function z() {
            this.init.apply(this, arguments)
        }

        function H(t, e, i, n, s) {
            var o = t.chart.inverted;
            this.axis = t, this.isNegative = i, this.options = e, this.x = n, this.total = null, this.points = {}, this.stack = s, this.alignOptions = {
                align: e.align || (o ? i ? "left" : "right" : "center"),
                verticalAlign: e.verticalAlign || (o ? "middle" : i ? "bottom" : "top"),
                y: u(e.y, o ? 4 : i ? 14 : -6),
                x: u(e.x, o ? i ? -6 : 6 : 0)
            }, this.textAlign = e.textAlign || (o ? i ? "right" : "left" : "center")
        }
        var _, R, E, W, X, G, Y, F, N, V, j, $, U, Z, K, q, J, Q, te, ee, ie, ne, se, oe, re = document,
            ae = window,
            le = Math,
            he = le.round,
            ce = le.floor,
            de = le.ceil,
            pe = le.max,
            ue = le.min,
            ge = le.abs,
            fe = le.cos,
            me = le.sin,
            xe = le.PI,
            ye = 2 * xe / 360,
            ve = navigator.userAgent,
            be = ae.opera,
            ke = /msie/i.test(ve) && !be,
            we = 8 === re.documentMode,
            Se = /AppleWebKit/.test(ve),
            Ce = /Firefox/.test(ve),
            Ae = /(Mobile|Android|Windows Phone)/.test(ve),
            Te = "http://www.w3.org/2000/svg",
            Me = !!re.createElementNS && !!re.createElementNS(Te, "svg").createSVGRect,
            Pe = Ce && parseInt(ve.split("Firefox/")[1], 10) < 4,
            Le = !Me && !ke && !!re.createElement("canvas").getContext,
            Ie = {},
            De = 0,
            Be = function() {
                return _
            },
            Oe = [],
            ze = 0,
            He = "div",
            _e = "none",
            Re = /^[0-9]+$/,
            Ee = "stroke-width",
            We = {};
        ae.Highcharts ? V(16, !0) : oe = ae.Highcharts = {}, G = function(e, i, n) {
                if (!c(i) || isNaN(i)) return "Invalid date";
                var s, e = u(e, "%Y-%m-%d %H:%M:%S"),
                    o = new Date(i - $),
                    r = o[Z](),
                    a = o[K](),
                    l = o[q](),
                    h = o[J](),
                    d = o[Q](),
                    p = X.lang,
                    g = p.weekdays,
                    o = t({
                        a: g[a].substr(0, 3),
                        A: g[a],
                        d: y(l),
                        e: l,
                        b: p.shortMonths[h],
                        B: p.months[h],
                        m: y(h + 1),
                        y: d.toString().substr(2, 2),
                        Y: d,
                        H: y(r),
                        I: y(r % 12 || 12),
                        l: r % 12 || 12,
                        M: y(o[U]()),
                        p: 12 > r ? "AM" : "PM",
                        P: 12 > r ? "am" : "pm",
                        S: y(o.getSeconds()),
                        L: y(he(i % 1e3), 3)
                    }, oe.dateFormats);
                for (s in o)
                    for (; - 1 !== e.indexOf("%" + s);) e = e.replace("%" + s, "function" == typeof o[s] ? o[s](i) : o[s]);
                return n ? e.substr(0, 1).toUpperCase() + e.substr(1) : e
            }, V = function(t, e) {
                var i = "Highcharts error #" + t + ": www.highcharts.com/errors/" + t;
                if (e) throw i;
                ae.console && console.log(i)
            }, N = {
                millisecond: 1,
                second: 1e3,
                minute: 6e4,
                hour: 36e5,
                day: 864e5,
                week: 6048e5,
                month: 26784e5,
                year: 31556952e3
            }, F = {
                init: function(t, e, i) {
                    var n, s, o, e = e || "",
                        r = t.shift,
                        a = e.indexOf("C") > -1,
                        l = a ? 7 : 3,
                        e = e.split(" "),
                        i = [].concat(i),
                        h = function(t) {
                            for (n = t.length; n--;) "M" === t[n] && t.splice(n + 1, 0, t[n + 1], t[n + 2], t[n + 1], t[n + 2])
                        };
                    if (a && (h(e), h(i)), t.isArea && (s = e.splice(e.length - 6, 6), o = i.splice(i.length - 6, 6)), r <= i.length / l && e.length === i.length)
                        for (; r--;) i = [].concat(i).splice(0, l).concat(i);
                    if (t.shift = 0, e.length)
                        for (t = i.length; e.length < t;) r = [].concat(e).splice(e.length - l, l), a && (r[l - 6] = r[l - 2], r[l - 5] = r[l - 1]), e = e.concat(r);
                    return s && (e = e.concat(s), i = i.concat(o)), [e, i]
                },
                step: function(t, e, i, n) {
                    var s = [],
                        o = t.length;
                    if (1 === i) s = n;
                    else if (o === e.length && 1 > i)
                        for (; o--;) n = parseFloat(t[o]), s[o] = isNaN(n) ? t[o] : i * parseFloat(e[o] - n) + n;
                    else s = e;
                    return s
                }
            },
            function(e) {
                ae.HighchartsAdapter = ae.HighchartsAdapter || e && {
                    init: function(t) {
                        var i, s = e.fx,
                            o = s.step,
                            r = e.Tween,
                            a = r && r.propHooks;
                        i = e.cssHooks.opacity, e.extend(e.easing, {
                            easeOutQuad: function(t, e, i, n, s) {
                                return -n * (e /= s) * (e - 2) + i
                            }
                        }), e.each(["cur", "_default", "width", "height", "opacity"], function(t, e) {
                            var i, n = o;
                            "cur" === e ? n = s.prototype : "_default" === e && r && (n = a[e], e = "set"), (i = n[e]) && (n[e] = function(n) {
                                var s, n = t ? n : this;
                                return "align" !== n.prop ? (s = n.elem, s.attr ? s.attr(n.prop, "cur" === e ? _ : n.now) : i.apply(this, arguments)) : void 0
                            })
                        }), v(i, "get", function(t, e, i) {
                            return e.attr ? e.opacity || 0 : t.call(this, e, i)
                        }), i = function(e) {
                            var i, n = e.elem;
                            e.started || (i = t.init(n, n.d, n.toD), e.start = i[0], e.end = i[1], e.started = !0), n.attr("d", t.step(e.start, e.end, e.pos, n.toD))
                        }, r ? a.d = {
                            set: i
                        } : o.d = i, this.each = Array.prototype.forEach ? function(t, e) {
                            return Array.prototype.forEach.call(t, e)
                        } : function(t, e) {
                            var i, n = t.length;
                            for (i = 0; n > i; i++)
                                if (e.call(t[i], t[i], i, t) === !1) return i
                        }, e.fn.highcharts = function() {
                            var t, e, i = "Chart",
                                s = arguments;
                            return this[0] && (n(s[0]) && (i = s[0], s = Array.prototype.slice.call(s, 1)), t = s[0], t !== _ && (t.chart = t.chart || {}, t.chart.renderTo = this[0], new oe[i](t, s[1]), e = this), t === _ && (e = Oe[d(this[0], "data-highcharts-chart")])), e
                        }
                    },
                    getScript: e.getScript,
                    inArray: e.inArray,
                    adapterRun: function(t, i) {
                        return e(t)[i]()
                    },
                    grep: e.grep,
                    map: function(t, e) {
                        for (var i = [], n = 0, s = t.length; s > n; n++) i[n] = e.call(t[n], t[n], n, t);
                        return i
                    },
                    offset: function(t) {
                        return e(t).offset()
                    },
                    addEvent: function(t, i, n) {
                        e(t).bind(i, n)
                    },
                    removeEvent: function(t, i, n) {
                        var s = re.removeEventListener ? "removeEventListener" : "detachEvent";
                        re[s] && t && !t[s] && (t[s] = function() {}), e(t).unbind(i, n)
                    },
                    fireEvent: function(i, n, s, o) {
                        var r, a = e.Event(n),
                            l = "detached" + n;
                        !ke && s && (delete s.layerX, delete s.layerY, delete s.returnValue), t(a, s), i[n] && (i[l] = i[n], i[n] = null), e.each(["preventDefault", "stopPropagation"], function(t, e) {
                            var i = a[e];
                            a[e] = function() {
                                try {
                                    i.call(a)
                                } catch (t) {
                                    "preventDefault" === e && (r = !0)
                                }
                            }
                        }), e(i).trigger(a), i[l] && (i[n] = i[l], i[l] = null), o && !a.isDefaultPrevented() && !r && o(a)
                    },
                    washMouseEvent: function(t) {
                        var e = t.originalEvent || t;
                        return e.pageX === _ && (e.pageX = t.pageX, e.pageY = t.pageY), e
                    },
                    animate: function(t, i, n) {
                        var s = e(t);
                        t.style || (t.style = {}), i.d && (t.toD = i.d, i.d = 1), s.stop(), i.opacity !== _ && t.attr && (i.opacity += "px"), s.animate(i, n)
                    },
                    stop: function(t) {
                        e(t).stop()
                    }
                }
            }(ae.jQuery);
        var Xe = ae.HighchartsAdapter,
            Ge = Xe || {};
        Xe && Xe.init.call(Xe, F);
        var Ye = Ge.adapterRun,
            Fe = Ge.getScript,
            Ne = Ge.inArray,
            Ve = Ge.each,
            je = Ge.grep,
            $e = Ge.offset,
            Ue = Ge.map,
            Ze = Ge.addEvent,
            Ke = Ge.removeEvent,
            qe = Ge.fireEvent,
            Je = Ge.washMouseEvent,
            Qe = Ge.animate,
            ti = Ge.stop,
            Ge = {
                enabled: !0,
                x: 0,
                y: 15,
                style: {
                    color: "#606060",
                    cursor: "default",
                    fontSize: "11px"
                }
            };
        X = {
            colors: "#7cb5ec,#434348,#90ed7d,#f7a35c,#8085e9,#f15c80,#e4d354,#8085e8,#8d4653,#91e8e1".split(","),
            symbols: ["circle", "diamond", "square", "triangle", "triangle-down"],
            lang: {
                loading: "Loading...",
                months: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                shortMonths: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                weekdays: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                decimalPoint: ".",
                numericSymbols: "k,M,G,T,P,E".split(","),
                resetZoom: "Reset zoom",
                resetZoomTitle: "Reset zoom level 1:1",
                thousandsSep: ","
            },
            global: {
                useUTC: !0,
                canvasToolsURL: "http://code.highcharts.com/4.0.3/modules/canvas-tools.js",
                VMLRadialGradientURL: "http://code.highcharts.com/4.0.3/gfx/vml-radial-gradient.png"
            },
            chart: {
                borderColor: "#4572A7",
                borderRadius: 0,
                defaultSeriesType: "line",
                ignoreHiddenSeries: !0,
                spacing: [10, 10, 15, 10],
                backgroundColor: "#FFFFFF",
                plotBorderColor: "#C0C0C0",
                resetZoomButton: {
                    theme: {
                        zIndex: 20
                    },
                    position: {
                        align: "right",
                        x: -10,
                        y: 10
                    }
                }
            },
            title: {
                text: "Chart title",
                align: "center",
                margin: 15,
                style: {
                    color: "#333333",
                    fontSize: "18px"
                }
            },
            subtitle: {
                text: "",
                align: "center",
                style: {
                    color: "#555555"
                }
            },
            plotOptions: {
                line: {
                    allowPointSelect: !1,
                    showCheckbox: !1,
                    animation: {
                        duration: 1e3
                    },
                    events: {},
                    lineWidth: 2,
                    marker: {
                        lineWidth: 0,
                        radius: 4,
                        lineColor: "#FFFFFF",
                        states: {
                            hover: {
                                enabled: !0,
                                lineWidthPlus: 1,
                                radiusPlus: 2
                            },
                            select: {
                                fillColor: "#FFFFFF",
                                lineColor: "#000000",
                                lineWidth: 2
                            }
                        }
                    },
                    point: {
                        events: {}
                    },
                    dataLabels: e(Ge, {
                        align: "center",
                        enabled: !1,
                        formatter: function() {
                            return null === this.y ? "" : x(this.y, -1)
                        },
                        verticalAlign: "bottom",
                        y: 0
                    }),
                    cropThreshold: 300,
                    pointRange: 0,
                    states: {
                        hover: {
                            lineWidthPlus: 1,
                            marker: {},
                            halo: {
                                size: 10,
                                opacity: .25
                            }
                        },
                        select: {
                            marker: {}
                        }
                    },
                    stickyTracking: !0,
                    turboThreshold: 1e3
                }
            },
            labels: {
                style: {
                    position: "absolute",
                    color: "#3E576F"
                }
            },
            legend: {
                enabled: !0,
                align: "center",
                layout: "horizontal",
                labelFormatter: function() {
                    return this.name
                },
                borderColor: "#909090",
                borderRadius: 0,
                navigation: {
                    activeColor: "#274b6d",
                    inactiveColor: "#CCC"
                },
                shadow: !1,
                itemStyle: {
                    color: "#333333",
                    fontSize: "12px",
                    fontWeight: "bold"
                },
                itemHoverStyle: {
                    color: "#000"
                },
                itemHiddenStyle: {
                    color: "#CCC"
                },
                itemCheckboxStyle: {
                    position: "absolute",
                    width: "13px",
                    height: "13px"
                },
                symbolPadding: 5,
                verticalAlign: "bottom",
                x: 0,
                y: 0,
                title: {
                    style: {
                        fontWeight: "bold"
                    }
                }
            },
            loading: {
                labelStyle: {
                    fontWeight: "bold",
                    position: "relative",
                    top: "45%"
                },
                style: {
                    position: "absolute",
                    backgroundColor: "white",
                    opacity: .5,
                    textAlign: "center"
                }
            },
            tooltip: {
                enabled: !0,
                animation: Me,
                backgroundColor: "rgba(249, 249, 249, .85)",
                borderWidth: 1,
                borderRadius: 3,
                dateTimeLabelFormats: {
                    millisecond: "%A, %b %e, %H:%M:%S.%L",
                    second: "%A, %b %e, %H:%M:%S",
                    minute: "%A, %b %e, %H:%M",
                    hour: "%A, %b %e, %H:%M",
                    day: "%A, %b %e, %Y",
                    week: "Week from %A, %b %e, %Y",
                    month: "%B %Y",
                    year: "%Y"
                },
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>',
                shadow: !0,
                snap: Ae ? 25 : 10,
                style: {
                    color: "#333333",
                    cursor: "default",
                    fontSize: "12px",
                    padding: "8px",
                    whiteSpace: "nowrap"
                }
            },
            credits: {
                enabled: !0,
                text: "Highcharts.com",
                href: "http://www.highcharts.com",
                position: {
                    align: "right",
                    x: -10,
                    verticalAlign: "bottom",
                    y: -5
                },
                style: {
                    cursor: "pointer",
                    color: "#909090",
                    fontSize: "9px"
                }
            }
        };
        var ei = X.plotOptions,
            Xe = ei.line;
        I();
        var ii = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,
            ni = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
            si = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
            oi = function(t) {
                var n, s, o = [];
                return function(t) {
                    t && t.stops ? s = Ue(t.stops, function(t) {
                        return oi(t[1])
                    }) : (n = ii.exec(t)) ? o = [i(n[1]), i(n[2]), i(n[3]), parseFloat(n[4], 10)] : (n = ni.exec(t)) ? o = [i(n[1], 16), i(n[2], 16), i(n[3], 16), 1] : (n = si.exec(t)) && (o = [i(n[1]), i(n[2]), i(n[3]), 1])
                }(t), {
                    get: function(i) {
                        var n;
                        return s ? (n = e(t), n.stops = [].concat(n.stops), Ve(s, function(t, e) {
                            n.stops[e] = [n.stops[e][0], t.get(i)]
                        })) : n = o && !isNaN(o[0]) ? "rgb" === i ? "rgb(" + o[0] + "," + o[1] + "," + o[2] + ")" : "a" === i ? o[3] : "rgba(" + o.join(",") + ")" : t, n
                    },
                    brighten: function(t) {
                        if (s) Ve(s, function(e) {
                            e.brighten(t)
                        });
                        else if (r(t) && 0 !== t) {
                            var e;
                            for (e = 0; 3 > e; e++) o[e] += i(255 * t), o[e] < 0 && (o[e] = 0), o[e] > 255 && (o[e] = 255)
                        }
                        return this
                    },
                    rgba: o,
                    setOpacity: function(t) {
                        return o[3] = t, this
                    }
                }
            };
        D.prototype = {
            opacity: 1,
            textProps: "fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration,textShadow,HcTextStroke".split(","),
            init: function(t, e) {
                this.element = "span" === e ? f(e) : re.createElementNS(Te, e), this.renderer = t
            },
            animate: function(t, i, n) {
                return i = u(i, Y, !0), ti(this), i ? (i = e(i, {}), n && (i.complete = n), Qe(this, t, i)) : (this.attr(t), n && n()), this
            },
            colorGradient: function(t, i, n) {
                var s, r, a, l, h, d, p, u, g, f, m = this.renderer,
                    x = [];
                if (t.linearGradient ? r = "linearGradient" : t.radialGradient && (r = "radialGradient"), r) {
                    a = t[r], l = m.gradients, d = t.stops, g = n.radialReference, o(a) && (t[r] = a = {
                        x1: a[0],
                        y1: a[1],
                        x2: a[2],
                        y2: a[3],
                        gradientUnits: "userSpaceOnUse"
                    }), "radialGradient" === r && g && !c(a.gradientUnits) && (a = e(a, {
                        cx: g[0] - g[2] / 2 + a.cx * g[2],
                        cy: g[1] - g[2] / 2 + a.cy * g[2],
                        r: a.r * g[2],
                        gradientUnits: "userSpaceOnUse"
                    }));
                    for (f in a) "id" !== f && x.push(f, a[f]);
                    for (f in d) x.push(d[f]);
                    x = x.join(","), l[x] ? t = l[x].attr("id") : (a.id = t = "highcharts-" + De++, l[x] = h = m.createElement(r).attr(a).add(m.defs), h.stops = [], Ve(d, function(t) {
                        0 === t[1].indexOf("rgba") ? (s = oi(t[1]), p = s.get("rgb"), u = s.get("a")) : (p = t[1], u = 1), t = m.createElement("stop").attr({
                            offset: t[0],
                            "stop-color": p,
                            "stop-opacity": u
                        }).add(h), h.stops.push(t)
                    })), n.setAttribute(i, "url(" + m.url + "#" + t + ")")
                }
            },
            attr: function(t, e) {
                var i, n, s, o, r = this.element,
                    a = this;
                if ("string" == typeof t && e !== _ && (i = t, t = {}, t[i] = e), "string" == typeof t) a = (this[t + "Getter"] || this._defaultGetter).call(this, t, r);
                else {
                    for (i in t) n = t[i], o = !1, this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(i) && (s || (this.symbolAttr(t), s = !0), o = !0), !this.rotation || "x" !== i && "y" !== i || (this.doTransform = !0), o || (this[i + "Setter"] || this._defaultSetter).call(this, n, i, r), this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(i) && this.updateShadows(i, n);
                    this.doTransform && (this.updateTransform(), this.doTransform = !1)
                }
                return a
            },
            updateShadows: function(t, e) {
                for (var i = this.shadows, n = i.length; n--;) i[n].setAttribute(t, "height" === t ? pe(e - (i[n].cutHeight || 0), 0) : "d" === t ? this.d : e)
            },
            addClass: function(t) {
                var e = this.element,
                    i = d(e, "class") || "";
                return -1 === i.indexOf(t) && d(e, "class", i + " " + t), this
            },
            symbolAttr: function(t) {
                var e = this;
                Ve("x,y,r,start,end,width,height,innerR,anchorX,anchorY".split(","), function(i) {
                    e[i] = u(t[i], e[i])
                }), e.attr({
                    d: e.renderer.symbols[e.symbolName](e.x, e.y, e.width, e.height, e)
                })
            },
            clip: function(t) {
                return this.attr("clip-path", t ? "url(" + this.renderer.url + "#" + t.id + ")" : _e)
            },
            crisp: function(t) {
                var e, i, n = {},
                    s = t.strokeWidth || this.strokeWidth || 0;
                i = he(s) % 2 / 2, t.x = ce(t.x || this.x || 0) + i, t.y = ce(t.y || this.y || 0) + i, t.width = ce((t.width || this.width || 0) - 2 * i), t.height = ce((t.height || this.height || 0) - 2 * i), t.strokeWidth = s;
                for (e in t) this[e] !== t[e] && (this[e] = n[e] = t[e]);
                return n
            },
            css: function(e) {
                var n, s, o = this.styles,
                    r = {},
                    a = this.element,
                    l = "";
                if (n = !o, e && e.color && (e.fill = e.color), o)
                    for (s in e) e[s] !== o[s] && (r[s] = e[s], n = !0);
                if (n) {
                    if (n = this.textWidth = e && e.width && "text" === a.nodeName.toLowerCase() && i(e.width), o && (e = t(o, r)), this.styles = e, n && (Le || !Me && this.renderer.forExport) && delete e.width, ke && !Me) g(this.element, e);
                    else {
                        o = function(t, e) {
                            return "-" + e.toLowerCase()
                        };
                        for (s in e) l += s.replace(/([A-Z])/g, o) + ":" + e[s] + ";";
                        d(a, "style", l)
                    }
                    n && this.added && this.renderer.buildText(this)
                }
                return this
            },
            on: function(t, e) {
                var i = this,
                    n = i.element;
                return E && "click" === t ? (n.ontouchstart = function(t) {
                    i.touchEventFired = Date.now(), t.preventDefault(), e.call(n, t)
                }, n.onclick = function(t) {
                    (-1 === ve.indexOf("Android") || Date.now() - (i.touchEventFired || 0) > 1100) && e.call(n, t)
                }) : n["on" + t] = e, this
            },
            setRadialReference: function(t) {
                return this.element.radialReference = t, this
            },
            translate: function(t, e) {
                return this.attr({
                    translateX: t,
                    translateY: e
                })
            },
            invert: function() {
                return this.inverted = !0, this.updateTransform(), this
            },
            updateTransform: function() {
                var t = this.translateX || 0,
                    e = this.translateY || 0,
                    i = this.scaleX,
                    n = this.scaleY,
                    s = this.inverted,
                    o = this.rotation,
                    r = this.element;
                s && (t += this.attr("width"), e += this.attr("height")), t = ["translate(" + t + "," + e + ")"], s ? t.push("rotate(90) scale(-1,1)") : o && t.push("rotate(" + o + " " + (r.getAttribute("x") || 0) + " " + (r.getAttribute("y") || 0) + ")"), (c(i) || c(n)) && t.push("scale(" + u(i, 1) + " " + u(n, 1) + ")"), t.length && r.setAttribute("transform", t.join(" "))
            },
            toFront: function() {
                var t = this.element;
                return t.parentNode.appendChild(t), this
            },
            align: function(t, e, i) {
                var s, o, r, a, l = {};
                return o = this.renderer, r = o.alignedObjects, t ? (this.alignOptions = t, this.alignByTranslate = e, (!i || n(i)) && (this.alignTo = s = i || "renderer", h(r, this), r.push(this), i = null)) : (t = this.alignOptions, e = this.alignByTranslate, s = this.alignTo), i = u(i, o[s], o), s = t.align, o = t.verticalAlign, r = (i.x || 0) + (t.x || 0), a = (i.y || 0) + (t.y || 0), ("right" === s || "center" === s) && (r += (i.width - (t.width || 0)) / {
                    right: 1,
                    center: 2
                }[s]), l[e ? "translateX" : "x"] = he(r), ("bottom" === o || "middle" === o) && (a += (i.height - (t.height || 0)) / ({
                    bottom: 1,
                    middle: 2
                }[o] || 1)), l[e ? "translateY" : "y"] = he(a), this[this.placed ? "animate" : "attr"](l), this.placed = !0, this.alignAttr = l, this
            },
            getBBox: function() {
                var e, i, n = this.bBox,
                    s = this.renderer,
                    o = this.rotation;
                e = this.element;
                var r = this.styles,
                    a = o * ye;
                i = this.textStr;
                var l;
                if (("" === i || Re.test(i)) && (l = "num." + i.toString().length + (r ? "|" + r.fontSize + "|" + r.fontFamily : "")), l && (n = s.cache[l]), !n) {
                    if (e.namespaceURI === Te || s.forExport) {
                        try {
                            n = e.getBBox ? t({}, e.getBBox()) : {
                                width: e.offsetWidth,
                                height: e.offsetHeight
                            }
                        } catch (h) {}(!n || n.width < 0) && (n = {
                            width: 0,
                            height: 0
                        })
                    } else n = this.htmlGetBBox();
                    s.isSVG && (e = n.width, i = n.height, ke && r && "11px" === r.fontSize && "16.9" === i.toPrecision(3) && (n.height = i = 14), o && (n.width = ge(i * me(a)) + ge(e * fe(a)), n.height = ge(i * fe(a)) + ge(e * me(a)))), this.bBox = n, l && (s.cache[l] = n)
                }
                return n
            },
            show: function(t) {
                return t && this.element.namespaceURI === Te ? (this.element.removeAttribute("visibility"), this) : this.attr({
                    visibility: t ? "inherit" : "visible"
                })
            },
            hide: function() {
                return this.attr({
                    visibility: "hidden"
                })
            },
            fadeOut: function(t) {
                var e = this;
                e.animate({
                    opacity: 0
                }, {
                    duration: t || 150,
                    complete: function() {
                        e.hide()
                    }
                })
            },
            add: function(t) {
                var e, n, s = this.renderer,
                    o = t || s,
                    r = o.element || s.box,
                    a = this.element,
                    l = this.zIndex;
                if (t && (this.parentGroup = t), this.parentInverted = t && t.inverted, void 0 !== this.textStr && s.buildText(this), l && (o.handleZ = !0, l = i(l)), o.handleZ)
                    for (t = r.childNodes, e = 0; e < t.length; e++)
                        if (s = t[e], o = d(s, "zIndex"), s !== a && (i(o) > l || !c(l) && c(o))) {
                            r.insertBefore(a, s), n = !0;
                            break
                        }
                return n || r.appendChild(a), this.added = !0, this.onAdd && this.onAdd(), this
            },
            safeRemoveChild: function(t) {
                var e = t.parentNode;
                e && e.removeChild(t)
            },
            destroy: function() {
                var t, e, i = this,
                    n = i.element || {},
                    s = i.shadows,
                    o = i.renderer.isSVG && "SPAN" === n.nodeName && i.parentGroup;
                if (n.onclick = n.onmouseout = n.onmouseover = n.onmousemove = n.point = null, ti(i), i.clipPath && (i.clipPath = i.clipPath.destroy()), i.stops) {
                    for (e = 0; e < i.stops.length; e++) i.stops[e] = i.stops[e].destroy();
                    i.stops = null
                }
                for (i.safeRemoveChild(n), s && Ve(s, function(t) {
                        i.safeRemoveChild(t)
                    }); o && o.div && 0 === o.div.childNodes.length;) n = o.parentGroup, i.safeRemoveChild(o.div), delete o.div, o = n;
                i.alignTo && h(i.renderer.alignedObjects, i);
                for (t in i) delete i[t];
                return null
            },
            shadow: function(t, e, i) {
                var n, s, o, r, a, l, h = [],
                    c = this.element;
                if (t) {
                    for (r = u(t.width, 3), a = (t.opacity || .15) / r, l = this.parentInverted ? "(-1,-1)" : "(" + u(t.offsetX, 1) + ", " + u(t.offsetY, 1) + ")", n = 1; r >= n; n++) s = c.cloneNode(0), o = 2 * r + 1 - 2 * n, d(s, {
                        isShadow: "true",
                        stroke: t.color || "black",
                        "stroke-opacity": a * n,
                        "stroke-width": o,
                        transform: "translate" + l,
                        fill: _e
                    }), i && (d(s, "height", pe(d(s, "height") - o, 0)), s.cutHeight = o), e ? e.element.appendChild(s) : c.parentNode.insertBefore(s, c), h.push(s);
                    this.shadows = h
                }
                return this
            },
            xGetter: function(t) {
                return "circle" === this.element.nodeName && (t = {
                    x: "cx",
                    y: "cy"
                }[t] || t), this._defaultGetter(t)
            },
            _defaultGetter: function(t) {
                return t = u(this[t], this.element ? this.element.getAttribute(t) : null, 0), /^[\-0-9\.]+$/.test(t) && (t = parseFloat(t)), t
            },
            dSetter: function(t, e, i) {
                t && t.join && (t = t.join(" ")), /(NaN| {2}|^$)/.test(t) && (t = "M 0 0"), i.setAttribute(e, t), this[e] = t
            },
            dashstyleSetter: function(t) {
                var e;
                if (t = t && t.toLowerCase()) {
                    for (t = t.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g, "1,3,").replace("dash", "4,3,").replace(/,$/, "").replace("solid", 1).split(","), e = t.length; e--;) t[e] = i(t[e]) * this["stroke-width"];
                    t = t.join(","), this.element.setAttribute("stroke-dasharray", t)
                }
            },
            alignSetter: function(t) {
                this.element.setAttribute("text-anchor", {
                    left: "start",
                    center: "middle",
                    right: "end"
                }[t])
            },
            opacitySetter: function(t, e, i) {
                this[e] = t, i.setAttribute(e, t)
            },
            titleSetter: function(t) {
                var e = this.element.getElementsByTagName("title")[0];
                e || (e = re.createElementNS(Te, "title"), this.element.appendChild(e)), e.textContent = t
            },
            textSetter: function(t) {
                t !== this.textStr && (delete this.bBox, this.textStr = t, this.added && this.renderer.buildText(this))
            },
            fillSetter: function(t, e, i) {
                "string" == typeof t ? i.setAttribute(e, t) : t && this.colorGradient(t, e, i)
            },
            zIndexSetter: function(t, e, i) {
                i.setAttribute(e, t), this[e] = t
            },
            _defaultSetter: function(t, e, i) {
                i.setAttribute(e, t)
            }
        }, D.prototype.yGetter = D.prototype.xGetter, D.prototype.translateXSetter = D.prototype.translateYSetter = D.prototype.rotationSetter = D.prototype.verticalAlignSetter = D.prototype.scaleXSetter = D.prototype.scaleYSetter = function(t, e) {
            this[e] = t, this.doTransform = !0
        }, D.prototype["stroke-widthSetter"] = D.prototype.strokeSetter = function(t, e, i) {
            this[e] = t, this.stroke && this["stroke-width"] ? (this.strokeWidth = this["stroke-width"], D.prototype.fillSetter.call(this, this.stroke, "stroke", i), i.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === e && 0 === t && this.hasStroke && (i.removeAttribute("stroke"), this.hasStroke = !1)
        };
        var ri = function() {
            this.init.apply(this, arguments)
        };
        ri.prototype = {
            Element: D,
            init: function(t, e, i, n, s) {
                var o, r = location,
                    n = this.createElement("svg").attr({
                        version: "1.1"
                    }).css(this.getStyle(n));
                o = n.element, t.appendChild(o), -1 === t.innerHTML.indexOf("xmlns") && d(o, "xmlns", Te), this.isSVG = !0, this.box = o, this.boxWrapper = n, this.alignedObjects = [], this.url = (Ce || Se) && re.getElementsByTagName("base").length ? r.href.replace(/#.*?$/, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : "", this.createElement("desc").add().element.appendChild(re.createTextNode("Created with Highcharts 4.0.3")), this.defs = this.createElement("defs").add(), this.forExport = s, this.gradients = {}, this.cache = {}, this.setSize(e, i, !1);
                var a;
                Ce && t.getBoundingClientRect && (this.subPixelFix = e = function() {
                    g(t, {
                        left: 0,
                        top: 0
                    }), a = t.getBoundingClientRect(), g(t, {
                        left: de(a.left) - a.left + "px",
                        top: de(a.top) - a.top + "px"
                    })
                }, e(), Ze(ae, "resize", e))
            },
            getStyle: function(e) {
                return this.style = t({
                    fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
                    fontSize: "12px"
                }, e)
            },
            isHidden: function() {
                return !this.boxWrapper.getBBox().width
            },
            destroy: function() {
                var t = this.defs;
                return this.box = null, this.boxWrapper = this.boxWrapper.destroy(), T(this.gradients || {}), this.gradients = null, t && (this.defs = t.destroy()), this.subPixelFix && Ke(ae, "resize", this.subPixelFix), this.alignedObjects = null
            },
            createElement: function(t) {
                var e = new this.Element;
                return e.init(this, t), e
            },
            draw: function() {},
            buildText: function(t) {
                for (var e, n, s = t.element, o = this, r = o.forExport, a = u(t.textStr, "").toString(), l = -1 !== a.indexOf("<"), h = s.childNodes, c = d(s, "x"), p = t.styles, f = t.textWidth, m = p && p.lineHeight, x = p && p.HcTextStroke, y = h.length, v = function(t) {
                        return m ? i(m) : o.fontMetrics(/(px|em)$/.test(t && t.style.fontSize) ? t.style.fontSize : p && p.fontSize || o.style.fontSize || 12, t).h
                    }; y--;) s.removeChild(h[y]);
                l || x || -1 !== a.indexOf(" ") ? (e = /<.*style="([^"]+)".*>/, n = /<.*href="(http[^"]+)".*>/, f && !t.added && this.box.appendChild(s), a = l ? a.replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(/<br.*?>/g) : [a], "" === a[a.length - 1] && a.pop(), Ve(a, function(i, a) {
                    var l, h = 0,
                        i = i.replace(/<span/g, "|||<span").replace(/<\/span>/g, "</span>|||");
                    l = i.split("|||"), Ve(l, function(i) {
                        if ("" !== i || 1 === l.length) {
                            var u, m = {},
                                x = re.createElementNS(Te, "tspan");
                            if (e.test(i) && (u = i.match(e)[1].replace(/(;| |^)color([ :])/, "$1fill$2"), d(x, "style", u)), n.test(i) && !r && (d(x, "onclick", 'location.href="' + i.match(n)[1] + '"'), g(x, {
                                    cursor: "pointer"
                                })), i = (i.replace(/<(.|\n)*?>/g, "") || " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">"), " " !== i) {
                                if (x.appendChild(re.createTextNode(i)), h ? m.dx = 0 : a && null !== c && (m.x = c), d(x, m), s.appendChild(x), !h && a && (!Me && r && g(x, {
                                        display: "block"
                                    }), d(x, "dy", v(x))), f)
                                    for (var y, b, i = i.replace(/([^\^])-/g, "$1- ").split(" "), m = l.length > 1 || i.length > 1 && "nowrap" !== p.whiteSpace, k = p.HcHeight, w = [], S = v(x), C = 1; m && (i.length || w.length);) delete t.bBox, y = t.getBBox(), b = y.width, !Me && o.forExport && (b = o.measureSpanWidth(x.firstChild.data, t.styles)), y = b > f, y && 1 !== i.length ? (x.removeChild(x.firstChild), w.unshift(i.pop())) : (i = w, w = [], i.length && (C++, k && C * S > k ? (i = ["..."], t.attr("title", t.textStr)) : (x = re.createElementNS(Te, "tspan"), d(x, {
                                        dy: S,
                                        x: c
                                    }), u && d(x, "style", u), s.appendChild(x))), b > f && (f = b)), i.length && x.appendChild(re.createTextNode(i.join(" ").replace(/- /g, "-")));
                                h++
                            }
                        }
                    })
                })) : s.appendChild(re.createTextNode(a))
            },
            button: function(i, n, s, o, r, a, l, h, c) {
                var d, p, u, g, f, m, x = this.label(i, n, s, c, null, null, null, null, "button"),
                    y = 0,
                    i = {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    r = e({
                        "stroke-width": 1,
                        stroke: "#CCCCCC",
                        fill: {
                            linearGradient: i,
                            stops: [
                                [0, "#FEFEFE"],
                                [1, "#F6F6F6"]
                            ]
                        },
                        r: 2,
                        padding: 5,
                        style: {
                            color: "black"
                        }
                    }, r);
                return u = r.style, delete r.style, a = e(r, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: i,
                        stops: [
                            [0, "#FFF"],
                            [1, "#ACF"]
                        ]
                    }
                }, a), g = a.style, delete a.style, l = e(r, {
                    stroke: "#68A",
                    fill: {
                        linearGradient: i,
                        stops: [
                            [0, "#9BD"],
                            [1, "#CDF"]
                        ]
                    }
                }, l), f = l.style, delete l.style, h = e(r, {
                    style: {
                        color: "#CCC"
                    }
                }, h), m = h.style, delete h.style, Ze(x.element, ke ? "mouseover" : "mouseenter", function() {
                    3 !== y && x.attr(a).css(g)
                }), Ze(x.element, ke ? "mouseout" : "mouseleave", function() {
                    3 !== y && (d = [r, a, l][y], p = [u, g, f][y], x.attr(d).css(p))
                }), x.setState = function(t) {
                    (x.state = y = t) ? 2 === t ? x.attr(l).css(f) : 3 === t && x.attr(h).css(m): x.attr(r).css(u)
                }, x.on("click", function() {
                    3 !== y && o.call(x)
                }).attr(r).css(t({
                    cursor: "default"
                }, u))
            },
            crispLine: function(t, e) {
                return t[1] === t[4] && (t[1] = t[4] = he(t[1]) - e % 2 / 2), t[2] === t[5] && (t[2] = t[5] = he(t[2]) + e % 2 / 2), t
            },
            path: function(e) {
                var i = {
                    fill: _e
                };
                return o(e) ? i.d = e : s(e) && t(i, e), this.createElement("path").attr(i)
            },
            circle: function(t, e, i) {
                return t = s(t) ? t : {
                    x: t,
                    y: e,
                    r: i
                }, e = this.createElement("circle"), e.xSetter = function(t) {
                    this.element.setAttribute("cx", t)
                }, e.ySetter = function(t) {
                    this.element.setAttribute("cy", t)
                }, e.attr(t)
            },
            arc: function(t, e, i, n, o, r) {
                return s(t) && (e = t.y, i = t.r, n = t.innerR, o = t.start, r = t.end, t = t.x), t = this.symbol("arc", t || 0, e || 0, i || 0, i || 0, {
                    innerR: n || 0,
                    start: o || 0,
                    end: r || 0
                }), t.r = i, t
            },
            rect: function(t, e, i, n, o, r) {
                var o = s(t) ? t.r : o,
                    a = this.createElement("rect"),
                    t = s(t) ? t : t === _ ? {} : {
                        x: t,
                        y: e,
                        width: pe(i, 0),
                        height: pe(n, 0)
                    };
                return r !== _ && (t.strokeWidth = r, t = a.crisp(t)), o && (t.r = o), a.rSetter = function(t) {
                    d(this.element, {
                        rx: t,
                        ry: t
                    })
                }, a.attr(t)
            },
            setSize: function(t, e, i) {
                var n = this.alignedObjects,
                    s = n.length;
                for (this.width = t, this.height = e, this.boxWrapper[u(i, !0) ? "animate" : "attr"]({
                        width: t,
                        height: e
                    }); s--;) n[s].align()
            },
            g: function(t) {
                var e = this.createElement("g");
                return c(t) ? e.attr({
                    "class": "highcharts-" + t
                }) : e
            },
            image: function(e, i, n, s, o) {
                var r = {
                    preserveAspectRatio: _e
                };
                return arguments.length > 1 && t(r, {
                    x: i,
                    y: n,
                    width: s,
                    height: o
                }), r = this.createElement("image").attr(r), r.element.setAttributeNS ? r.element.setAttributeNS("http://www.w3.org/1999/xlink", "href", e) : r.element.setAttribute("hc-svg-href", e), r
            },
            symbol: function(e, i, n, s, o, r) {
                var a, l, h, c = this.symbols[e],
                    c = c && c(he(i), he(n), s, o, r),
                    d = /^url\((.*?)\)$/;
                return c ? (a = this.path(c), t(a, {
                    symbolName: e,
                    x: i,
                    y: n,
                    width: s,
                    height: o
                }), r && t(a, r)) : d.test(e) && (h = function(t, e) {
                    t.element && (t.attr({
                        width: e[0],
                        height: e[1]
                    }), t.alignByTranslate || t.translate(he((s - e[0]) / 2), he((o - e[1]) / 2)))
                }, l = e.match(d)[1], e = Ie[l], a = this.image(l).attr({
                    x: i,
                    y: n
                }), a.isImg = !0, e ? h(a, e) : (a.attr({
                    width: 0,
                    height: 0
                }), f("img", {
                    onload: function() {
                        h(a, Ie[l] = [this.width, this.height])
                    },
                    src: l
                }))), a
            },
            symbols: {
                circle: function(t, e, i, n) {
                    var s = .166 * i;
                    return ["M", t + i / 2, e, "C", t + i + s, e, t + i + s, e + n, t + i / 2, e + n, "C", t - s, e + n, t - s, e, t + i / 2, e, "Z"]
                },
                square: function(t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i, e + n, t, e + n, "Z"]
                },
                triangle: function(t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n, t, e + n, "Z"]
                },
                "triangle-down": function(t, e, i, n) {
                    return ["M", t, e, "L", t + i, e, t + i / 2, e + n, "Z"]
                },
                diamond: function(t, e, i, n) {
                    return ["M", t + i / 2, e, "L", t + i, e + n / 2, t + i / 2, e + n, t, e + n / 2, "Z"]
                },
                arc: function(t, e, i, n, s) {
                    var o = s.start,
                        i = s.r || i || n,
                        r = s.end - .001,
                        n = s.innerR,
                        a = s.open,
                        l = fe(o),
                        h = me(o),
                        c = fe(r),
                        r = me(r),
                        s = s.end - o < xe ? 0 : 1;
                    return ["M", t + i * l, e + i * h, "A", i, i, 0, s, 1, t + i * c, e + i * r, a ? "M" : "L", t + n * c, e + n * r, "A", n, n, 0, s, 0, t + n * l, e + n * h, a ? "" : "Z"]
                },
                callout: function(t, e, i, n, s) {
                    var o = ue(s && s.r || 0, i, n),
                        r = o + 6,
                        a = s && s.anchorX,
                        l = s && s.anchorY,
                        s = he(s.strokeWidth || 0) % 2 / 2;
                    return t += s, e += s, s = ["M", t + o, e, "L", t + i - o, e, "C", t + i, e, t + i, e, t + i, e + o, "L", t + i, e + n - o, "C", t + i, e + n, t + i, e + n, t + i - o, e + n, "L", t + o, e + n, "C", t, e + n, t, e + n, t, e + n - o, "L", t, e + o, "C", t, e, t, e, t + o, e], a && a > i && l > e + r && e + n - r > l ? s.splice(13, 3, "L", t + i, l - 6, t + i + 6, l, t + i, l + 6, t + i, e + n - o) : a && 0 > a && l > e + r && e + n - r > l ? s.splice(33, 3, "L", t, l + 6, t - 6, l, t, l - 6, t, e + o) : l && l > n && a > t + r && t + i - r > a ? s.splice(23, 3, "L", a + 6, e + n, a, e + n + 6, a - 6, e + n, t + o, e + n) : l && 0 > l && a > t + r && t + i - r > a && s.splice(3, 3, "L", a - 6, e, a, e - 6, a + 6, e, i - o, e), s
                }
            },
            clipRect: function(t, e, i, n) {
                var s = "highcharts-" + De++,
                    o = this.createElement("clipPath").attr({
                        id: s
                    }).add(this.defs),
                    t = this.rect(t, e, i, n, 0).add(o);
                return t.id = s, t.clipPath = o, t
            },
            text: function(t, e, i, n) {
                var s = Le || !Me && this.forExport,
                    o = {};
                return n && !this.forExport ? this.html(t, e, i) : (o.x = Math.round(e || 0), i && (o.y = Math.round(i)), (t || 0 === t) && (o.text = t), t = this.createElement("text").attr(o), s && t.css({
                    position: "absolute"
                }), n || (t.xSetter = function(t, e, i) {
                    var n, s, o = i.getElementsByTagName("tspan"),
                        r = i.getAttribute(e);
                    for (s = 0; s < o.length; s++) n = o[s], n.getAttribute(e) === r && n.setAttribute(e, t);
                    i.setAttribute(e, t)
                }), t)
            },
            fontMetrics: function(t, e) {
                t = t || this.style.fontSize, e && ae.getComputedStyle && (e = e.element || e, t = ae.getComputedStyle(e, "").fontSize);
                var t = /px/.test(t) ? i(t) : /em/.test(t) ? 12 * parseFloat(t) : 12,
                    n = 24 > t ? t + 4 : he(1.2 * t),
                    s = he(.8 * n);
                return {
                    h: n,
                    b: s,
                    f: t
                }
            },
            label: function(i, n, s, o, r, a, l, h, d) {
                function p() {
                    var e, i;
                    e = A.element.style, m = (void 0 === x || void 0 === y || C.styles.textAlign) && A.textStr && A.getBBox(), C.width = (x || m.width || 0) + 2 * M + P, C.height = (y || m.height || 0) + 2 * M, k = M + S.fontMetrics(e && e.fontSize, A).b, w && (f || (e = he(-T * M), i = h ? -k : 0, C.box = f = o ? S.symbol(o, e, i, C.width, C.height, I) : S.rect(e, i, C.width, C.height, 0, I[Ee]), f.attr("fill", _e).add(C)), f.isImg || f.attr(t({
                        width: he(C.width),
                        height: he(C.height)
                    }, I)), I = null)
                }

                function u() {
                    var t, e = C.styles,
                        e = e && e.textAlign,
                        i = P + M * (1 - T);
                    t = h ? 0 : k, c(x) && m && ("center" === e || "right" === e) && (i += {
                        center: .5,
                        right: 1
                    }[e] * (x - m.width)), (i !== A.x || t !== A.y) && (A.attr("x", i), t !== _ && A.attr("y", t)), A.x = i, A.y = t
                }

                function g(t, e) {
                    f ? f.attr(t, e) : I[t] = e
                }
                var f, m, x, y, v, b, k, w, S = this,
                    C = S.g(d),
                    A = S.text("", 0, 0, l).attr({
                        zIndex: 1
                    }),
                    T = 0,
                    M = 3,
                    P = 0,
                    L = 0,
                    I = {};
                C.onAdd = function() {
                    A.add(C), C.attr({
                        text: i || "",
                        x: n,
                        y: s
                    }), f && c(r) && C.attr({
                        anchorX: r,
                        anchorY: a
                    })
                }, C.widthSetter = function(t) {
                    x = t
                }, C.heightSetter = function(t) {
                    y = t
                }, C.paddingSetter = function(t) {
                    c(t) && t !== M && (M = t, u())
                }, C.paddingLeftSetter = function(t) {
                    c(t) && t !== P && (P = t, u())
                }, C.alignSetter = function(t) {
                    T = {
                        left: 0,
                        center: .5,
                        right: 1
                    }[t]
                }, C.textSetter = function(t) {
                    t !== _ && A.textSetter(t), p(), u()
                }, C["stroke-widthSetter"] = function(t, e) {
                    t && (w = !0), L = t % 2 / 2, g(e, t)
                }, C.strokeSetter = C.fillSetter = C.rSetter = function(t, e) {
                    "fill" === e && t && (w = !0), g(e, t)
                }, C.anchorXSetter = function(t, e) {
                    r = t, g(e, t + L - v)
                }, C.anchorYSetter = function(t, e) {
                    a = t, g(e, t - b)
                }, C.xSetter = function(t) {
                    C.x = t, T && (t -= T * ((x || m.width) + M)), v = he(t), C.attr("translateX", v)
                }, C.ySetter = function(t) {
                    b = C.y = he(t), C.attr("translateY", b)
                };
                var B = C.css;
                return t(C, {
                    css: function(t) {
                        if (t) {
                            var i = {},
                                t = e(t);
                            Ve(C.textProps, function(e) {
                                t[e] !== _ && (i[e] = t[e], delete t[e])
                            }), A.css(i)
                        }
                        return B.call(C, t)
                    },
                    getBBox: function() {
                        return {
                            width: m.width + 2 * M,
                            height: m.height + 2 * M,
                            x: m.x - M,
                            y: m.y - M
                        }
                    },
                    shadow: function(t) {
                        return f && f.shadow(t), C
                    },
                    destroy: function() {
                        Ke(C.element, "mouseenter"), Ke(C.element, "mouseleave"), A && (A = A.destroy()), f && (f = f.destroy()), D.prototype.destroy.call(C), C = S = p = u = g = null
                    }
                })
            }
        }, R = ri, t(D.prototype, {
            htmlCss: function(e) {
                var i = this.element;
                return (i = e && "SPAN" === i.tagName && e.width) && (delete e.width, this.textWidth = i, this.updateTransform()), this.styles = t(this.styles, e), g(this.element, e), this
            },
            htmlGetBBox: function() {
                var t = this.element,
                    e = this.bBox;
                return e || ("text" === t.nodeName && (t.style.position = "absolute"), e = this.bBox = {
                    x: t.offsetLeft,
                    y: t.offsetTop,
                    width: t.offsetWidth,
                    height: t.offsetHeight
                }), e
            },
            htmlUpdateTransform: function() {
                if (this.added) {
                    var t = this.renderer,
                        e = this.element,
                        n = this.translateX || 0,
                        s = this.translateY || 0,
                        o = this.x || 0,
                        r = this.y || 0,
                        a = this.textAlign || "left",
                        l = {
                            left: 0,
                            center: .5,
                            right: 1
                        }[a],
                        h = this.shadows;
                    if (g(e, {
                            marginLeft: n,
                            marginTop: s
                        }), h && Ve(h, function(t) {
                            g(t, {
                                marginLeft: n + 1,
                                marginTop: s + 1
                            })
                        }), this.inverted && Ve(e.childNodes, function(i) {
                            t.invertChild(i, e)
                        }), "SPAN" === e.tagName) {
                        var d, p = this.rotation,
                            f = i(this.textWidth),
                            m = [p, a, e.innerHTML, this.textWidth].join(",");
                        m !== this.cTT && (d = t.fontMetrics(e.style.fontSize).b, c(p) && this.setSpanRotation(p, l, d), h = u(this.elemWidth, e.offsetWidth), h > f && /[ \-]/.test(e.textContent || e.innerText) && (g(e, {
                            width: f + "px",
                            display: "block",
                            whiteSpace: "normal"
                        }), h = f), this.getSpanCorrection(h, d, l, p, a)), g(e, {
                            left: o + (this.xCorr || 0) + "px",
                            top: r + (this.yCorr || 0) + "px"
                        }), Se && (d = e.offsetHeight), this.cTT = m
                    }
                } else this.alignOnAdd = !0
            },
            setSpanRotation: function(t, e, i) {
                var n = {},
                    s = ke ? "-ms-transform" : Se ? "-webkit-transform" : Ce ? "MozTransform" : be ? "-o-transform" : "";
                n[s] = n.transform = "rotate(" + t + "deg)", n[s + (Ce ? "Origin" : "-origin")] = n.transformOrigin = 100 * e + "% " + i + "px", g(this.element, n)
            },
            getSpanCorrection: function(t, e, i) {
                this.xCorr = -t * i, this.yCorr = -e
            }
        }), t(ri.prototype, {
            html: function(e, i, n) {
                var s = this.createElement("span"),
                    o = s.element,
                    r = s.renderer;
                return s.textSetter = function(t) {
                    t !== o.innerHTML && delete this.bBox, o.innerHTML = this.textStr = t
                }, s.xSetter = s.ySetter = s.alignSetter = s.rotationSetter = function(t, e) {
                    "align" === e && (e = "textAlign"), s[e] = t, s.htmlUpdateTransform()
                }, s.attr({
                    text: e,
                    x: he(i),
                    y: he(n)
                }).css({
                    position: "absolute",
                    whiteSpace: "nowrap",
                    fontFamily: this.style.fontFamily,
                    fontSize: this.style.fontSize
                }), s.css = s.htmlCss, r.isSVG && (s.add = function(e) {
                    var i, n = r.box.parentNode,
                        a = [];
                    if (this.parentGroup = e) {
                        if (i = e.div, !i) {
                            for (; e;) a.push(e), e = e.parentGroup;
                            Ve(a.reverse(), function(e) {
                                var s;
                                i = e.div = e.div || f(He, {
                                    className: d(e.element, "class")
                                }, {
                                    position: "absolute",
                                    left: (e.translateX || 0) + "px",
                                    top: (e.translateY || 0) + "px"
                                }, i || n), s = i.style, t(e, {
                                    translateXSetter: function(t, i) {
                                        s.left = t + "px", e[i] = t, e.doTransform = !0
                                    },
                                    translateYSetter: function(t, i) {
                                        s.top = t + "px", e[i] = t, e.doTransform = !0
                                    },
                                    visibilitySetter: function(t, e) {
                                        s[e] = t
                                    }
                                })
                            })
                        }
                    } else i = n;
                    return i.appendChild(o), s.added = !0, s.alignOnAdd && s.htmlUpdateTransform(), s
                }), s
            }
        });
        var ai;
        if (!Me && !Le) {
            ai = {
                init: function(t, e) {
                    var i = ["<", e, ' filled="f" stroked="f"'],
                        n = ["position: ", "absolute", ";"],
                        s = e === He;
                    ("shape" === e || s) && n.push("left:0;top:0;width:1px;height:1px;"), n.push("visibility: ", s ? "hidden" : "visible"), i.push(' style="', n.join(""), '"/>'), e && (i = s || "span" === e || "img" === e ? i.join("") : t.prepVML(i), this.element = f(i)), this.renderer = t
                },
                add: function(t) {
                    var e = this.renderer,
                        i = this.element,
                        n = e.box,
                        n = t ? t.element || t : n;
                    return t && t.inverted && e.invertChild(i, n), n.appendChild(i), this.added = !0, this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform(), this.onAdd && this.onAdd(), this
                },
                updateTransform: D.prototype.htmlUpdateTransform,
                setSpanRotation: function() {
                    var t = this.rotation,
                        e = fe(t * ye),
                        i = me(t * ye);
                    g(this.element, {
                        filter: t ? ["progid:DXImageTransform.Microsoft.Matrix(M11=", e, ", M12=", -i, ", M21=", i, ", M22=", e, ", sizingMethod='auto expand')"].join("") : _e
                    })
                },
                getSpanCorrection: function(t, e, i, n, s) {
                    var o, r = n ? fe(n * ye) : 1,
                        a = n ? me(n * ye) : 0,
                        l = u(this.elemHeight, this.element.offsetHeight);
                    this.xCorr = 0 > r && -t, this.yCorr = 0 > a && -l, o = 0 > r * a, this.xCorr += a * e * (o ? 1 - i : i), this.yCorr -= r * e * (n ? o ? i : 1 - i : 1), s && "left" !== s && (this.xCorr -= t * i * (0 > r ? -1 : 1), n && (this.yCorr -= l * i * (0 > a ? -1 : 1)), g(this.element, {
                        textAlign: s
                    }))
                },
                pathToVML: function(t) {
                    for (var e = t.length, i = []; e--;) r(t[e]) ? i[e] = he(10 * t[e]) - 5 : "Z" === t[e] ? i[e] = "x" : (i[e] = t[e], !t.isArc || "wa" !== t[e] && "at" !== t[e] || (i[e + 5] === i[e + 7] && (i[e + 7] += t[e + 7] > t[e + 5] ? 1 : -1), i[e + 6] === i[e + 8] && (i[e + 8] += t[e + 8] > t[e + 6] ? 1 : -1)));
                    return i.join(" ") || "x"
                },
                clip: function(t) {
                    var e, i = this;
                    return t ? (e = t.members, h(e, i), e.push(i), i.destroyClip = function() {
                        h(e, i)
                    }, t = t.getCSS(i)) : (i.destroyClip && i.destroyClip(), t = {
                        clip: we ? "inherit" : "rect(auto)"
                    }), i.css(t)
                },
                css: D.prototype.htmlCss,
                safeRemoveChild: function(t) {
                    t.parentNode && M(t)
                },
                destroy: function() {
                    return this.destroyClip && this.destroyClip(), D.prototype.destroy.apply(this)
                },
                on: function(t, e) {
                    return this.element["on" + t] = function() {
                        var t = ae.event;
                        t.target = t.srcElement, e(t)
                    }, this
                },
                cutOffPath: function(t, e) {
                    var n, t = t.split(/[ ,]/);
                    return n = t.length, (9 === n || 11 === n) && (t[n - 4] = t[n - 2] = i(t[n - 2]) - 10 * e), t.join(" ")
                },
                shadow: function(t, e, n) {
                    var s, o, r, a, l, h, c, d = [],
                        p = this.element,
                        g = this.renderer,
                        m = p.style,
                        x = p.path;
                    if (x && "string" != typeof x.value && (x = "x"), l = x, t) {
                        for (h = u(t.width, 3), c = (t.opacity || .15) / h, s = 1; 3 >= s; s++) a = 2 * h + 1 - 2 * s, n && (l = this.cutOffPath(x.value, a + .5)), r = ['<shape isShadow="true" strokeweight="', a, '" filled="false" path="', l, '" coordsize="10 10" style="', p.style.cssText, '" />'], o = f(g.prepVML(r), null, {
                            left: i(m.left) + u(t.offsetX, 1),
                            top: i(m.top) + u(t.offsetY, 1)
                        }), n && (o.cutOff = a + 1), r = ['<stroke color="', t.color || "black", '" opacity="', c * s, '"/>'], f(g.prepVML(r), null, null, o), e ? e.element.appendChild(o) : p.parentNode.insertBefore(o, p), d.push(o);
                        this.shadows = d
                    }
                    return this
                },
                updateShadows: Be,
                setAttr: function(t, e) {
                    we ? this.element[t] = e : this.element.setAttribute(t, e)
                },
                classSetter: function(t) {
                    this.element.className = t
                },
                dashstyleSetter: function(t, e, i) {
                    (i.getElementsByTagName("stroke")[0] || f(this.renderer.prepVML(["<stroke/>"]), null, null, i))[e] = t || "solid", this[e] = t
                },
                dSetter: function(t, e, i) {
                    var n = this.shadows,
                        t = t || [];
                    if (this.d = t.join && t.join(" "), i.path = t = this.pathToVML(t), n)
                        for (i = n.length; i--;) n[i].path = n[i].cutOff ? this.cutOffPath(t, n[i].cutOff) : t;
                    this.setAttr(e, t)
                },
                fillSetter: function(t, e, i) {
                    var n = i.nodeName;
                    "SPAN" === n ? i.style.color = t : "IMG" !== n && (i.filled = t !== _e, this.setAttr("fillcolor", this.renderer.color(t, i, e, this)))
                },
                opacitySetter: Be,
                rotationSetter: function(t, e, i) {
                    i = i.style, this[e] = i[e] = t, i.left = -he(me(t * ye) + 1) + "px", i.top = he(fe(t * ye)) + "px"
                },
                strokeSetter: function(t, e, i) {
                    this.setAttr("strokecolor", this.renderer.color(t, i, e))
                },
                "stroke-widthSetter": function(t, e, i) {
                    i.stroked = !!t, this[e] = t, r(t) && (t += "px"), this.setAttr("strokeweight", t)
                },
                titleSetter: function(t, e) {
                    this.setAttr(e, t)
                },
                visibilitySetter: function(t, e, i) {
                    "inherit" === t && (t = "visible"), this.shadows && Ve(this.shadows, function(i) {
                        i.style[e] = t
                    }), "DIV" === i.nodeName && (t = "hidden" === t ? "-999em" : 0, we || (i.style[e] = t ? "visible" : "hidden"), e = "top"), i.style[e] = t
                },
                xSetter: function(t, e, i) {
                    this[e] = t, "x" === e ? e = "left" : "y" === e && (e = "top"), this.updateClipping ? (this[e] = t, this.updateClipping()) : i.style[e] = t
                },
                zIndexSetter: function(t, e, i) {
                    i.style[e] = t
                }
            }, oe.VMLElement = ai = m(D, ai), ai.prototype.ySetter = ai.prototype.widthSetter = ai.prototype.heightSetter = ai.prototype.xSetter;
            var li = {
                Element: ai,
                isIE8: ve.indexOf("MSIE 8.0") > -1,
                init: function(e, i, n, s) {
                    var o;
                    if (this.alignedObjects = [], s = this.createElement(He).css(t(this.getStyle(s), {
                            position: "relative"
                        })), o = s.element, e.appendChild(s.element), this.isVML = !0, this.box = o, this.boxWrapper = s, this.cache = {}, this.setSize(i, n, !1), !re.namespaces.hcv) {
                        re.namespaces.add("hcv", "urn:schemas-microsoft-com:vml");
                        try {
                            re.createStyleSheet().cssText = "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        } catch (r) {
                            re.styleSheets[0].cssText += "hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } "
                        }
                    }
                },
                isHidden: function() {
                    return !this.box.offsetWidth
                },
                clipRect: function(e, i, n, o) {
                    var r = this.createElement(),
                        a = s(e);
                    return t(r, {
                        members: [],
                        left: (a ? e.x : e) + 1,
                        top: (a ? e.y : i) + 1,
                        width: (a ? e.width : n) - 1,
                        height: (a ? e.height : o) - 1,
                        getCSS: function(e) {
                            var i = e.element,
                                n = i.nodeName,
                                e = e.inverted,
                                s = this.top - ("shape" === n ? i.offsetTop : 0),
                                o = this.left,
                                i = o + this.width,
                                r = s + this.height,
                                s = {
                                    clip: "rect(" + he(e ? o : s) + "px," + he(e ? r : i) + "px," + he(e ? i : r) + "px," + he(e ? s : o) + "px)"
                                };
                            return !e && we && "DIV" === n && t(s, {
                                width: i + "px",
                                height: r + "px"
                            }), s
                        },
                        updateClipping: function() {
                            Ve(r.members, function(t) {
                                t.element && t.css(r.getCSS(t))
                            })
                        }
                    })
                },
                color: function(t, e, i, n) {
                    var s, o, r, a = this,
                        l = /^rgba/,
                        h = _e;
                    if (t && t.linearGradient ? r = "gradient" : t && t.radialGradient && (r = "pattern"), r) {
                        var c, d, p, u, g, m, x, y, v = t.linearGradient || t.radialGradient,
                            b = "",
                            t = t.stops,
                            k = [],
                            w = function() {
                                o = ['<fill colors="' + k.join(",") + '" opacity="', g, '" o:opacity2="', u, '" type="', r, '" ', b, 'focus="100%" method="any" />'], f(a.prepVML(o), null, null, e)
                            };
                        if (p = t[0], y = t[t.length - 1], p[0] > 0 && t.unshift([0, p[1]]), y[0] < 1 && t.push([1, y[1]]), Ve(t, function(t, e) {
                                l.test(t[1]) ? (s = oi(t[1]), c = s.get("rgb"), d = s.get("a")) : (c = t[1], d = 1), k.push(100 * t[0] + "% " + c), e ? (g = d, m = c) : (u = d, x = c)
                            }), "fill" === i)
                            if ("gradient" === r) i = v.x1 || v[0] || 0, t = v.y1 || v[1] || 0, p = v.x2 || v[2] || 0, v = v.y2 || v[3] || 0, b = 'angle="' + (90 - 180 * le.atan((v - t) / (p - i)) / xe) + '"', w();
                            else {
                                var S, h = v.r,
                                    C = 2 * h,
                                    A = 2 * h,
                                    T = v.cx,
                                    M = v.cy,
                                    P = e.radialReference,
                                    h = function() {
                                        P && (S = n.getBBox(), T += (P[0] - S.x) / S.width - .5, M += (P[1] - S.y) / S.height - .5, C *= P[2] / S.width, A *= P[2] / S.height), b = 'src="' + X.global.VMLRadialGradientURL + '" size="' + C + "," + A + '" origin="0.5,0.5" position="' + T + "," + M + '" color2="' + x + '" ', w()
                                    };
                                n.added ? h() : n.onAdd = h, h = m
                            } else h = c
                    } else l.test(t) && "IMG" !== e.tagName ? (s = oi(t), o = ["<", i, ' opacity="', s.get("a"), '"/>'], f(this.prepVML(o), null, null, e), h = s.get("rgb")) : (h = e.getElementsByTagName(i), h.length && (h[0].opacity = 1, h[0].type = "solid"), h = t);
                    return h
                },
                prepVML: function(t) {
                    var e = this.isIE8,
                        t = t.join("");
                    return e ? (t = t.replace("/>", ' xmlns="urn:schemas-microsoft-com:vml" />'), t = -1 === t.indexOf('style="') ? t.replace("/>", ' style="display:inline-block;behavior:url(#default#VML);" />') : t.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : t = t.replace("<", "<hcv:"), t
                },
                text: ri.prototype.html,
                path: function(e) {
                    var i = {
                        coordsize: "10 10"
                    };
                    return o(e) ? i.d = e : s(e) && t(i, e), this.createElement("shape").attr(i)
                },
                circle: function(t, e, i) {
                    var n = this.symbol("circle");
                    return s(t) && (i = t.r, e = t.y, t = t.x), n.isCircle = !0, n.r = i, n.attr({
                        x: t,
                        y: e
                    })
                },
                g: function(t) {
                    var e;
                    return t && (e = {
                        className: "highcharts-" + t,
                        "class": "highcharts-" + t
                    }), this.createElement(He).attr(e)
                },
                image: function(t, e, i, n, s) {
                    var o = this.createElement("img").attr({
                        src: t
                    });
                    return arguments.length > 1 && o.attr({
                        x: e,
                        y: i,
                        width: n,
                        height: s
                    }), o
                },
                createElement: function(t) {
                    return "rect" === t ? this.symbol(t) : ri.prototype.createElement.call(this, t)
                },
                invertChild: function(t, e) {
                    var n = this,
                        s = e.style,
                        o = "IMG" === t.tagName && t.style;
                    g(t, {
                        flip: "x",
                        left: i(s.width) - (o ? i(o.top) : 1),
                        top: i(s.height) - (o ? i(o.left) : 1),
                        rotation: -90
                    }), Ve(t.childNodes, function(e) {
                        n.invertChild(e, t)
                    })
                },
                symbols: {
                    arc: function(t, e, i, n, s) {
                        var o = s.start,
                            r = s.end,
                            a = s.r || i || n,
                            i = s.innerR,
                            n = fe(o),
                            l = me(o),
                            h = fe(r),
                            c = me(r);
                        return r - o === 0 ? ["x"] : (o = ["wa", t - a, e - a, t + a, e + a, t + a * n, e + a * l, t + a * h, e + a * c], s.open && !i && o.push("e", "M", t, e), o.push("at", t - i, e - i, t + i, e + i, t + i * h, e + i * c, t + i * n, e + i * l, "x", "e"), o.isArc = !0, o)
                    },
                    circle: function(t, e, i, n, s) {
                        return s && (i = n = 2 * s.r), s && s.isCircle && (t -= i / 2, e -= n / 2), ["wa", t, e, t + i, e + n, t + i, e + n / 2, t + i, e + n / 2, "e"]
                    },
                    rect: function(t, e, i, n, s) {
                        return ri.prototype.symbols[c(s) && s.r ? "callout" : "square"].call(0, t, e, i, n, s)
                    }
                }
            };
            oe.VMLRenderer = ai = function() {
                this.init.apply(this, arguments)
            }, ai.prototype = e(ri.prototype, li), R = ai
        }
        ri.prototype.measureSpanWidth = function(t, e) {
            var i, n = re.createElement("span");
            return i = re.createTextNode(t), n.appendChild(i), g(n, e), this.box.appendChild(n), i = n.offsetWidth, M(n), i
        };
        var hi;
        Le && (oe.CanVGRenderer = ai = function() {
            Te = "http://www.w3.org/1999/xhtml"
        }, ai.prototype.symbols = {}, hi = function() {
            function t() {
                var t, i = e.length;
                for (t = 0; i > t; t++) e[t]();
                e = []
            }
            var e = [];
            return {
                push: function(i, n) {
                    0 === e.length && Fe(n, t), e.push(i)
                }
            }
        }(), R = ai), B.prototype = {
            addLabel: function() {
                var e, i = this.axis,
                    n = i.options,
                    s = i.chart,
                    o = i.horiz,
                    a = i.categories,
                    h = i.names,
                    d = this.pos,
                    p = n.labels,
                    g = p.rotation,
                    f = i.tickPositions,
                    o = o && a && !p.step && !p.staggerLines && !p.rotation && s.plotWidth / f.length || !o && (s.margin[3] || .33 * s.chartWidth),
                    m = d === f[0],
                    x = d === f[f.length - 1],
                    h = a ? u(a[d], h[d], d) : d,
                    a = this.label,
                    y = f.info;
                i.isDatetimeAxis && y && (e = n.dateTimeLabelFormats[y.higherRanks[d] || y.unitName]), this.isFirst = m, this.isLast = x, n = i.labelFormatter.call({
                    axis: i,
                    chart: s,
                    isFirst: m,
                    isLast: x,
                    dateTimeLabelFormat: e,
                    value: i.isLog ? P(l(h)) : h
                }), d = o && {
                    width: pe(1, he(o - 2 * (p.padding || 10))) + "px"
                }, d = t(d, p.style), c(a) ? a && a.attr({
                    text: n
                }).css(d) : (e = {
                    align: i.labelAlign
                }, r(g) && (e.rotation = g), o && p.ellipsis && (d.HcHeight = i.len / f.length), this.label = a = c(n) && p.enabled ? s.renderer.text(n, 0, 0, p.useHTML).attr(e).css(d).add(i.labelGroup) : null, i.tickBaseline = s.renderer.fontMetrics(p.style.fontSize, a).b, g && 2 === i.side && (i.tickBaseline *= fe(g * ye))), this.yOffset = a ? u(p.y, i.tickBaseline + (2 === i.side ? 8 : -(a.getBBox().height / 2))) : 0
            },
            getLabelSize: function() {
                var t = this.label,
                    e = this.axis;
                return t ? t.getBBox()[e.horiz ? "height" : "width"] : 0
            },
            getLabelSides: function() {
                var t = this.label.getBBox(),
                    e = this.axis,
                    i = e.horiz,
                    n = e.options.labels,
                    t = i ? t.width : t.height,
                    e = i ? n.x - t * {
                        left: 0,
                        center: .5,
                        right: 1
                    }[e.labelAlign] : 0;
                return [e, i ? t + e : t]
            },
            handleOverflow: function(t, e) {
                var i, n, s, o = !0,
                    r = this.axis,
                    a = this.isFirst,
                    l = this.isLast,
                    h = r.horiz ? e.x : e.y,
                    c = r.reversed,
                    d = r.tickPositions,
                    p = this.getLabelSides(),
                    u = p[0],
                    p = p[1],
                    g = this.label.line || 0;
                if (i = r.labelEdge, n = r.justifyLabels && (a || l), i[g] === _ || h + u > i[g] ? i[g] = h + p : n || (o = !1), n) {
                    i = (n = r.justifyToPlot) ? r.pos : 0, n = n ? i + r.len : r.chart.chartWidth;
                    do t += a ? 1 : -1, s = r.ticks[d[t]]; while (d[t] && (!s || !s.label || s.label.line !== g));
                    r = s && s.label.xy && s.label.xy.x + s.getLabelSides()[a ? 0 : 1], a && !c || l && c ? i > h + u && (h = i - u, s && h + p > r && (o = !1)) : h + p > n && (h = n - p, s && r > h + u && (o = !1)), e.x = h
                }
                return o
            },
            getPosition: function(t, e, i, n) {
                var s = this.axis,
                    o = s.chart,
                    r = n && o.oldChartHeight || o.chartHeight;
                return {
                    x: t ? s.translate(e + i, null, null, n) + s.transB : s.left + s.offset + (s.opposite ? (n && o.oldChartWidth || o.chartWidth) - s.right - s.left : 0),
                    y: t ? r - s.bottom + s.offset - (s.opposite ? s.height : 0) : r - s.translate(e + i, null, null, n) - s.transB
                }
            },
            getLabelPosition: function(t, e, i, n, s, o, r, a) {
                var l = this.axis,
                    h = l.transA,
                    c = l.reversed,
                    d = l.staggerLines,
                    t = t + s.x - (o && n ? o * h * (c ? -1 : 1) : 0),
                    e = e + this.yOffset - (o && !n ? o * h * (c ? 1 : -1) : 0);
                return d && (i.line = r / (a || 1) % d, e += i.line * (l.labelOffset / d)), {
                    x: t,
                    y: e
                }
            },
            getMarkPath: function(t, e, i, n, s, o) {
                return o.crispLine(["M", t, e, "L", t + (s ? 0 : -i), e + (s ? i : 0)], n)
            },
            render: function(t, e, i) {
                var n = this.axis,
                    s = n.options,
                    o = n.chart.renderer,
                    r = n.horiz,
                    a = this.type,
                    l = this.label,
                    h = this.pos,
                    c = s.labels,
                    d = this.gridLine,
                    p = a ? a + "Grid" : "grid",
                    g = a ? a + "Tick" : "tick",
                    f = s[p + "LineWidth"],
                    m = s[p + "LineColor"],
                    x = s[p + "LineDashStyle"],
                    y = s[g + "Length"],
                    p = s[g + "Width"] || 0,
                    v = s[g + "Color"],
                    b = s[g + "Position"],
                    g = this.mark,
                    k = c.step,
                    w = !0,
                    S = n.tickmarkOffset,
                    C = this.getPosition(r, h, S, e),
                    A = C.x,
                    C = C.y,
                    T = r && A === n.pos + n.len || !r && C === n.pos ? -1 : 1,
                    i = u(i, 1);
                this.isActive = !0, f && (h = n.getPlotLinePath(h + S, f * T, e, !0), d === _ && (d = {
                    stroke: m,
                    "stroke-width": f
                }, x && (d.dashstyle = x), a || (d.zIndex = 1), e && (d.opacity = 0), this.gridLine = d = f ? o.path(h).attr(d).add(n.gridGroup) : null), !e && d && h && d[this.isNew ? "attr" : "animate"]({
                    d: h,
                    opacity: i
                })), p && y && ("inside" === b && (y = -y), n.opposite && (y = -y), a = this.getMarkPath(A, C, y, p * T, r, o), g ? g.animate({
                    d: a,
                    opacity: i
                }) : this.mark = o.path(a).attr({
                    stroke: v,
                    "stroke-width": p,
                    opacity: i
                }).add(n.axisGroup)), l && !isNaN(A) && (l.xy = C = this.getLabelPosition(A, C, l, r, c, S, t, k), this.isFirst && !this.isLast && !u(s.showFirstLabel, 1) || this.isLast && !this.isFirst && !u(s.showLastLabel, 1) ? w = !1 : !n.isRadial && !c.step && !c.rotation && !e && 0 !== i && (w = this.handleOverflow(t, C)), k && t % k && (w = !1), w && !isNaN(C.y) ? (C.opacity = i, l[this.isNew ? "attr" : "animate"](C), this.isNew = !1) : l.attr("y", -9999))
            },
            destroy: function() {
                T(this, this.axis)
            }
        }, oe.PlotLineOrBand = function(t, e) {
            this.axis = t, e && (this.options = e, this.id = e.id)
        }, oe.PlotLineOrBand.prototype = {
            render: function() {
                var t, i = this,
                    n = i.axis,
                    s = n.horiz,
                    o = (n.pointRange || 0) / 2,
                    r = i.options,
                    l = r.label,
                    h = i.label,
                    d = r.width,
                    p = r.to,
                    u = r.from,
                    g = c(u) && c(p),
                    f = r.value,
                    m = r.dashStyle,
                    x = i.svgElem,
                    y = [],
                    v = r.color,
                    b = r.zIndex,
                    k = r.events,
                    w = {},
                    S = n.chart.renderer;
                if (n.isLog && (u = a(u), p = a(p), f = a(f)), d) y = n.getPlotLinePath(f, d), w = {
                    stroke: v,
                    "stroke-width": d
                }, m && (w.dashstyle = m);
                else {
                    if (!g) return;
                    u = pe(u, n.min - o), p = ue(p, n.max + o), y = n.getPlotBandPath(u, p, r), v && (w.fill = v), r.borderWidth && (w.stroke = r.borderColor, w["stroke-width"] = r.borderWidth)
                }
                if (c(b) && (w.zIndex = b), x) y ? x.animate({
                    d: y
                }, null, x.onGetPath) : (x.hide(), x.onGetPath = function() {
                    x.show()
                }, h && (i.label = h = h.destroy()));
                else if (y && y.length && (i.svgElem = x = S.path(y).attr(w).add(), k))
                    for (t in o = function(t) {
                            x.on(t, function(e) {
                                k[t].apply(i, [e])
                            })
                        }, k) o(t);
                return l && c(l.text) && y && y.length && n.width > 0 && n.height > 0 ? (l = e({
                    align: s && g && "center",
                    x: s ? !g && 4 : 10,
                    verticalAlign: !s && g && "middle",
                    y: s ? g ? 16 : 10 : g ? 6 : -4,
                    rotation: s && !g && 90
                }, l), h || (w = {
                    align: l.textAlign || l.align,
                    rotation: l.rotation
                }, c(b) && (w.zIndex = b), i.label = h = S.text(l.text, 0, 0, l.useHTML).attr(w).css(l.style).add()), n = [y[1], y[4], g ? y[6] : y[1]], g = [y[2], y[5], g ? y[7] : y[2]], y = C(n), s = C(g), h.align(l, !1, {
                    x: y,
                    y: s,
                    width: A(n) - y,
                    height: A(g) - s
                }), h.show()) : h && h.hide(), i
            },
            destroy: function() {
                h(this.axis.plotLinesAndBands, this), delete this.axis, T(this)
            }
        }, O.prototype = {
            defaultOptions: {
                dateTimeLabelFormats: {
                    millisecond: "%H:%M:%S.%L",
                    second: "%H:%M:%S",
                    minute: "%H:%M",
                    hour: "%H:%M",
                    day: "%e. %b",
                    week: "%e. %b",
                    month: "%b '%y",
                    year: "%Y"
                },
                endOnTick: !1,
                gridLineColor: "#C0C0C0",
                labels: Ge,
                lineColor: "#C0D0E0",
                lineWidth: 1,
                minPadding: .01,
                maxPadding: .01,
                minorGridLineColor: "#E0E0E0",
                minorGridLineWidth: 1,
                minorTickColor: "#A0A0A0",
                minorTickLength: 2,
                minorTickPosition: "outside",
                startOfWeek: 1,
                startOnTick: !1,
                tickColor: "#C0D0E0",
                tickLength: 10,
                tickmarkPlacement: "between",
                tickPixelInterval: 100,
                tickPosition: "outside",
                tickWidth: 1,
                title: {
                    align: "middle",
                    style: {
                        color: "#707070"
                    }
                },
                type: "linear"
            },
            defaultYAxisOptions: {
                endOnTick: !0,
                gridLineWidth: 1,
                tickPixelInterval: 72,
                showLastLabel: !0,
                labels: {
                    x: -8,
                    y: 3
                },
                lineWidth: 0,
                maxPadding: .05,
                minPadding: .05,
                startOnTick: !0,
                tickWidth: 0,
                title: {
                    rotation: 270,
                    text: "Values"
                },
                stackLabels: {
                    enabled: !1,
                    formatter: function() {
                        return x(this.total, -1)
                    },
                    style: Ge.style
                }
            },
            defaultLeftAxisOptions: {
                labels: {
                    x: -15,
                    y: null
                },
                title: {
                    rotation: 270
                }
            },
            defaultRightAxisOptions: {
                labels: {
                    x: 15,
                    y: null
                },
                title: {
                    rotation: 90
                }
            },
            defaultBottomAxisOptions: {
                labels: {
                    x: 0,
                    y: null
                },
                title: {
                    rotation: 0
                }
            },
            defaultTopAxisOptions: {
                labels: {
                    x: 0,
                    y: -15
                },
                title: {
                    rotation: 0
                }
            },
            init: function(t, e) {
                var i = e.isX;
                this.horiz = t.inverted ? !i : i, this.coll = (this.isXAxis = i) ? "xAxis" : "yAxis", this.opposite = e.opposite, this.side = e.side || (this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3), this.setOptions(e);
                var n = this.options,
                    s = n.type;
                this.labelFormatter = n.labels.formatter || this.defaultLabelFormatter, this.userOptions = e, this.minPixelPadding = 0, this.chart = t, this.reversed = n.reversed, this.zoomEnabled = n.zoomEnabled !== !1, this.categories = n.categories || "category" === s, this.names = [], this.isLog = "logarithmic" === s, this.isDatetimeAxis = "datetime" === s, this.isLinked = c(n.linkedTo), this.tickmarkOffset = this.categories && "between" === n.tickmarkPlacement ? .5 : 0, this.ticks = {}, this.labelEdge = [], this.minorTicks = {}, this.plotLinesAndBands = [], this.alternateBands = {}, this.len = 0, this.minRange = this.userMinRange = n.minRange || n.maxZoom, this.range = n.range, this.offset = n.offset || 0, this.stacks = {}, this.oldStacks = {}, this.min = this.max = null, this.crosshair = u(n.crosshair, p(t.options.tooltip.crosshairs)[i ? 0 : 1], !1);
                var o, n = this.options.events; - 1 === Ne(this, t.axes) && (i && !this.isColorAxis ? t.axes.splice(t.xAxis.length, 0, this) : t.axes.push(this), t[this.coll].push(this)), this.series = this.series || [], t.inverted && i && this.reversed === _ && (this.reversed = !0), this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
                for (o in n) Ze(this, o, n[o]);
                this.isLog && (this.val2lin = a, this.lin2val = l)
            },
            setOptions: function(t) {
                this.options = e(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], e(X[this.coll], t))
            },
            defaultLabelFormatter: function() {
                var t, e = this.axis,
                    i = this.value,
                    n = e.categories,
                    s = this.dateTimeLabelFormat,
                    o = X.lang.numericSymbols,
                    r = o && o.length,
                    a = e.options.labels.format,
                    e = e.isLog ? i : e.tickInterval;
                if (a) t = b(a, this);
                else if (n) t = i;
                else if (s) t = G(s, i);
                else if (r && e >= 1e3)
                    for (; r-- && t === _;) n = Math.pow(1e3, r + 1), e >= n && null !== o[r] && (t = x(i / n, -1) + o[r]);
                return t === _ && (t = ge(i) >= 1e4 ? x(i, 0) : x(i, -1, _, "")), t
            },
            getSeriesExtremes: function() {
                var t = this,
                    e = t.chart;
                t.hasVisibleSeries = !1, t.dataMin = t.dataMax = null, t.buildStacks && t.buildStacks(), Ve(t.series, function(i) {
                    if (i.visible || !e.options.chart.ignoreHiddenSeries) {
                        var n;
                        n = i.options.threshold;
                        var s;
                        t.hasVisibleSeries = !0, t.isLog && 0 >= n && (n = null), t.isXAxis ? (n = i.xData, n.length && (t.dataMin = ue(u(t.dataMin, n[0]), C(n)), t.dataMax = pe(u(t.dataMax, n[0]), A(n)))) : (i.getExtremes(), s = i.dataMax, i = i.dataMin, c(i) && c(s) && (t.dataMin = ue(u(t.dataMin, i), i), t.dataMax = pe(u(t.dataMax, s), s)), c(n) && (t.dataMin >= n ? (t.dataMin = n, t.ignoreMinPadding = !0) : t.dataMax < n && (t.dataMax = n, t.ignoreMaxPadding = !0)))
                    }
                })
            },
            translate: function(t, e, i, n, s, o) {
                var a = 1,
                    l = 0,
                    h = n ? this.oldTransA : this.transA,
                    n = n ? this.oldMin : this.min,
                    c = this.minPixelPadding,
                    s = (this.options.ordinal || this.isLog && s) && this.lin2val;
                return h || (h = this.transA), i && (a *= -1, l = this.len), this.reversed && (a *= -1, l -= a * (this.sector || this.len)), e ? (t = t * a + l, t -= c, t = t / h + n, s && (t = this.lin2val(t))) : (s && (t = this.val2lin(t)), "between" === o && (o = .5), t = a * (t - n) * h + l + a * c + (r(o) ? h * o * this.pointRange : 0)), t
            },
            toPixels: function(t, e) {
                return this.translate(t, !1, !this.horiz, null, !0) + (e ? 0 : this.pos)
            },
            toValue: function(t, e) {
                return this.translate(t - (e ? 0 : this.pos), !0, !this.horiz, null, !0)
            },
            getPlotLinePath: function(t, e, i, n, s) {
                var o, r, a, l = this.chart,
                    h = this.left,
                    c = this.top,
                    d = i && l.oldChartHeight || l.chartHeight,
                    p = i && l.oldChartWidth || l.chartWidth;
                return o = this.transB, s = u(s, this.translate(t, null, null, i)), t = i = he(s + o), o = r = he(d - s - o), isNaN(s) ? a = !0 : this.horiz ? (o = c, r = d - this.bottom, (h > t || t > h + this.width) && (a = !0)) : (t = h, i = p - this.right, (c > o || o > c + this.height) && (a = !0)), a && !n ? null : l.renderer.crispLine(["M", t, o, "L", i, r], e || 1)
            },
            getLinearTickPositions: function(t, e, i) {
                var n, s = P(ce(e / t) * t),
                    o = P(de(i / t) * t),
                    a = [];
                if (e === i && r(e)) return [e];
                for (e = s; o >= e && (a.push(e), e = P(e + t), e !== n);) n = e;
                return a
            },
            getMinorTickPositions: function() {
                var t, e = this.options,
                    i = this.tickPositions,
                    n = this.minorTickInterval,
                    s = [];
                if (this.isLog)
                    for (t = i.length, e = 1; t > e; e++) s = s.concat(this.getLogTickPositions(n, i[e - 1], i[e], !0));
                else if (this.isDatetimeAxis && "auto" === e.minorTickInterval) s = s.concat(this.getTimeTicks(this.normalizeTimeTickInterval(n), this.min, this.max, e.startOfWeek)), s[0] < this.min && s.shift();
                else
                    for (i = this.min + (i[0] - this.min) % n; i <= this.max; i += n) s.push(i);
                return s
            },
            adjustForMinRange: function() {
                var t, e, i, n, s, o, r = this.options,
                    a = this.min,
                    l = this.max,
                    h = this.dataMax - this.dataMin >= this.minRange;
                if (this.isXAxis && this.minRange === _ && !this.isLog && (c(r.min) || c(r.max) ? this.minRange = null : (Ve(this.series, function(t) {
                        for (s = t.xData, i = o = t.xIncrement ? 1 : s.length - 1; i > 0; i--) n = s[i] - s[i - 1], (e === _ || e > n) && (e = n)
                    }), this.minRange = ue(5 * e, this.dataMax - this.dataMin))), l - a < this.minRange) {
                    var d = this.minRange;
                    t = (d - l + a) / 2, t = [a - t, u(r.min, a - t)], h && (t[2] = this.dataMin), a = A(t), l = [a + d, u(r.max, a + d)], h && (l[2] = this.dataMax), l = C(l), d > l - a && (t[0] = l - d, t[1] = u(r.min, l - d), a = A(t))
                }
                this.min = a, this.max = l
            },
            setAxisTranslation: function(t) {
                var e, i = this,
                    s = i.max - i.min,
                    o = i.axisPointRange || 0,
                    r = 0,
                    a = 0,
                    l = i.linkedParent,
                    h = !!i.categories,
                    d = i.transA;
                (i.isXAxis || h || o) && (l ? (r = l.minPointOffset, a = l.pointRangePadding) : Ve(i.series, function(t) {
                    var l = h ? 1 : i.isXAxis ? t.pointRange : i.axisPointRange || 0,
                        d = t.options.pointPlacement,
                        p = t.closestPointRange;
                    l > s && (l = 0), o = pe(o, l), r = pe(r, n(d) ? 0 : l / 2), a = pe(a, "on" === d ? 0 : l), !t.noSharedTooltip && c(p) && (e = c(e) ? ue(e, p) : p)
                }), l = i.ordinalSlope && e ? i.ordinalSlope / e : 1, i.minPointOffset = r *= l, i.pointRangePadding = a *= l, i.pointRange = ue(o, s), i.closestPointRange = e), t && (i.oldTransA = d), i.translationSlope = i.transA = d = i.len / (s + a || 1), i.transB = i.horiz ? i.left : i.bottom, i.minPixelPadding = d * r
            },
            setTickPositions: function(t) {
                var e, i = this,
                    n = i.chart,
                    s = i.options,
                    o = s.startOnTick,
                    l = s.endOnTick,
                    h = i.isLog,
                    d = i.isDatetimeAxis,
                    p = i.isXAxis,
                    g = i.isLinked,
                    f = i.options.tickPositioner,
                    m = s.maxPadding,
                    x = s.minPadding,
                    y = s.tickInterval,
                    v = s.minTickInterval,
                    b = s.tickPixelInterval,
                    S = i.categories;
                g ? (i.linkedParent = n[i.coll][s.linkedTo], n = i.linkedParent.getExtremes(), i.min = u(n.min, n.dataMin), i.max = u(n.max, n.dataMax), s.type !== i.linkedParent.options.type && V(11, 1)) : (i.min = u(i.userMin, s.min, i.dataMin), i.max = u(i.userMax, s.max, i.dataMax)), h && (!t && ue(i.min, u(i.dataMin, i.min)) <= 0 && V(10, 1), i.min = P(a(i.min)), i.max = P(a(i.max))), i.range && c(i.max) && (i.userMin = i.min = pe(i.min, i.max - i.range), i.userMax = i.max, i.range = null), i.beforePadding && i.beforePadding(), i.adjustForMinRange(), S || i.axisPointRange || i.usePercentage || g || !c(i.min) || !c(i.max) || !(n = i.max - i.min) || (c(s.min) || c(i.userMin) || !x || !(i.dataMin < 0) && i.ignoreMinPadding || (i.min -= n * x), c(s.max) || c(i.userMax) || !m || !(i.dataMax > 0) && i.ignoreMaxPadding || (i.max += n * m)), r(s.floor) && (i.min = pe(i.min, s.floor)), r(s.ceiling) && (i.max = ue(i.max, s.ceiling)), i.min === i.max || void 0 === i.min || void 0 === i.max ? i.tickInterval = 1 : g && !y && b === i.linkedParent.options.tickPixelInterval ? i.tickInterval = i.linkedParent.tickInterval : (i.tickInterval = u(y, S ? 1 : (i.max - i.min) * b / pe(i.len, b)), !c(y) && i.len < b && !this.isRadial && !this.isLog && !S && o && l && (e = !0, i.tickInterval /= 4)), p && !t && Ve(i.series, function(t) {
                    t.processData(i.min !== i.oldMin || i.max !== i.oldMax)
                }), i.setAxisTranslation(!0), i.beforeSetTickPositions && i.beforeSetTickPositions(), i.postProcessTickInterval && (i.tickInterval = i.postProcessTickInterval(i.tickInterval)), i.pointRange && (i.tickInterval = pe(i.pointRange, i.tickInterval)), !y && i.tickInterval < v && (i.tickInterval = v), d || h || y || (i.tickInterval = w(i.tickInterval, null, k(i.tickInterval), s)), i.minorTickInterval = "auto" === s.minorTickInterval && i.tickInterval ? i.tickInterval / 5 : s.minorTickInterval, i.tickPositions = t = s.tickPositions ? [].concat(s.tickPositions) : f && f.apply(i, [i.min, i.max]), t || (!i.ordinalPositions && (i.max - i.min) / i.tickInterval > pe(2 * i.len, 200) && V(19, !0), t = d ? i.getTimeTicks(i.normalizeTimeTickInterval(i.tickInterval, s.units), i.min, i.max, s.startOfWeek, i.ordinalPositions, i.closestPointRange, !0) : h ? i.getLogTickPositions(i.tickInterval, i.min, i.max) : i.getLinearTickPositions(i.tickInterval, i.min, i.max), e && t.splice(1, t.length - 2), i.tickPositions = t), g || (s = t[0], h = t[t.length - 1], d = i.minPointOffset || 0, !o && !l && !S && 2 === t.length && t.splice(1, 0, (h + s) / 2), o ? i.min = s : i.min - d > s && t.shift(), l ? i.max = h : i.max + d < h && t.pop(), 1 === t.length && (o = ge(i.max) > 1e13 ? 1 : .001, i.min -= o, i.max += o))
            },
            setMaxTicks: function() {
                var t = this.chart,
                    e = t.maxTicks || {},
                    i = this.tickPositions,
                    n = this._maxTicksKey = [this.coll, this.pos, this.len].join("-");
                !this.isLinked && !this.isDatetimeAxis && i && i.length > (e[n] || 0) && this.options.alignTicks !== !1 && (e[n] = i.length), t.maxTicks = e
            },
            adjustTickAmount: function() {
                var t = this._maxTicksKey,
                    e = this.tickPositions,
                    i = this.chart.maxTicks;
                if (i && i[t] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1 && this.min !== _) {
                    var n = this.tickAmount,
                        s = e.length;
                    if (this.tickAmount = t = i[t], t > s) {
                        for (; e.length < t;) e.push(P(e[e.length - 1] + this.tickInterval));
                        this.transA *= (s - 1) / (t - 1), this.max = e[e.length - 1]
                    }
                    c(n) && t !== n && (this.isDirty = !0)
                }
            },
            setScale: function() {
                var t, e, i, n, s = this.stacks;
                if (this.oldMin = this.min, this.oldMax = this.max, this.oldAxisLength = this.len, this.setAxisSize(), n = this.len !== this.oldAxisLength, Ve(this.series, function(t) {
                        (t.isDirtyData || t.isDirty || t.xAxis.isDirty) && (i = !0)
                    }), n || i || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax) {
                    if (!this.isXAxis)
                        for (t in s)
                            for (e in s[t]) s[t][e].total = null, s[t][e].cum = 0;
                    this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = n || this.min !== this.oldMin || this.max !== this.oldMax)
                } else if (!this.isXAxis) {
                    this.oldStacks && (s = this.stacks = this.oldStacks);
                    for (t in s)
                        for (e in s[t]) s[t][e].cum = s[t][e].total
                }
                this.setMaxTicks()
            },
            setExtremes: function(e, i, n, s, o) {
                var r = this,
                    a = r.chart,
                    n = u(n, !0),
                    o = t(o, {
                        min: e,
                        max: i
                    });
                qe(r, "setExtremes", o, function() {
                    r.userMin = e, r.userMax = i, r.eventArgs = o, r.isDirtyExtremes = !0, n && a.redraw(s)
                })
            },
            zoom: function(t, e) {
                var i = this.dataMin,
                    n = this.dataMax,
                    s = this.options;
                return this.allowZoomOutside || (c(i) && t <= ue(i, u(s.min, i)) && (t = _), c(n) && e >= pe(n, u(s.max, n)) && (e = _)), this.displayBtn = t !== _ || e !== _, this.setExtremes(t, e, !1, _, {
                    trigger: "zoom"
                }), !0
            },
            setAxisSize: function() {
                var t = this.chart,
                    e = this.options,
                    i = e.offsetLeft || 0,
                    n = this.horiz,
                    s = u(e.width, t.plotWidth - i + (e.offsetRight || 0)),
                    o = u(e.height, t.plotHeight),
                    r = u(e.top, t.plotTop),
                    e = u(e.left, t.plotLeft + i),
                    i = /%$/;
                i.test(o) && (o = parseInt(o, 10) / 100 * t.plotHeight), i.test(r) && (r = parseInt(r, 10) / 100 * t.plotHeight + t.plotTop), this.left = e, this.top = r, this.width = s, this.height = o, this.bottom = t.chartHeight - o - r, this.right = t.chartWidth - s - e, this.len = pe(n ? s : o, 0), this.pos = n ? e : r
            },
            getExtremes: function() {
                var t = this.isLog;
                return {
                    min: t ? P(l(this.min)) : this.min,
                    max: t ? P(l(this.max)) : this.max,
                    dataMin: this.dataMin,
                    dataMax: this.dataMax,
                    userMin: this.userMin,
                    userMax: this.userMax
                }
            },
            getThreshold: function(t) {
                var e = this.isLog,
                    i = e ? l(this.min) : this.min,
                    e = e ? l(this.max) : this.max;
                return i > t || null === t ? t = i : t > e && (t = e), this.translate(t, 0, 1, 0, 1)
            },
            autoLabelAlign: function(t) {
                return t = (u(t, 0) - 90 * this.side + 720) % 360, t > 15 && 165 > t ? "right" : t > 195 && 345 > t ? "left" : "center"
            },
            getOffset: function() {
                var t, e, i, n, s, o, r, a, l, h = this,
                    d = h.chart,
                    p = d.renderer,
                    g = h.options,
                    f = h.tickPositions,
                    m = h.ticks,
                    x = h.horiz,
                    y = h.side,
                    v = d.inverted ? [1, 0, 3, 2][y] : y,
                    b = 0,
                    k = 0,
                    w = g.title,
                    S = g.labels,
                    C = 0,
                    A = d.axisOffset,
                    d = d.clipOffset,
                    T = [-1, 1, 1, -1][y],
                    M = 1,
                    P = u(S.maxStaggerLines, 5);
                if (h.hasData = t = h.hasVisibleSeries || c(h.min) && c(h.max) && !!f, h.showAxis = e = t || u(g.showEmpty, !0), h.staggerLines = h.horiz && S.staggerLines, h.axisGroup || (h.gridGroup = p.g("grid").attr({
                        zIndex: g.gridZIndex || 1
                    }).add(), h.axisGroup = p.g("axis").attr({
                        zIndex: g.zIndex || 2
                    }).add(), h.labelGroup = p.g("axis-labels").attr({
                        zIndex: S.zIndex || 7
                    }).addClass("highcharts-" + h.coll.toLowerCase() + "-labels").add()), t || h.isLinked) {
                    if (h.labelAlign = u(S.align || h.autoLabelAlign(S.rotation)), Ve(f, function(t) {
                            m[t] ? m[t].addLabel() : m[t] = new B(h, t)
                        }), h.horiz && !h.staggerLines && P && !S.rotation) {
                        for (t = h.reversed ? [].concat(f).reverse() : f; P > M;) {
                            for (s = [], o = !1, n = 0; n < t.length; n++) r = t[n], a = (a = m[r].label && m[r].label.getBBox()) ? a.width : 0, l = n % M, a && (r = h.translate(r), s[l] !== _ && r < s[l] && (o = !0), s[l] = r + a);
                            if (!o) break;
                            M++
                        }
                        M > 1 && (h.staggerLines = M)
                    }
                    Ve(f, function(t) {
                        (0 === y || 2 === y || {
                            1: "left",
                            3: "right"
                        }[y] === h.labelAlign) && (C = pe(m[t].getLabelSize(), C))
                    }), h.staggerLines && (C *= h.staggerLines, h.labelOffset = C)
                } else
                    for (n in m) m[n].destroy(), delete m[n];
                w && w.text && w.enabled !== !1 && (h.axisTitle || (h.axisTitle = p.text(w.text, 0, 0, w.useHTML).attr({
                    zIndex: 7,
                    rotation: w.rotation || 0,
                    align: w.textAlign || {
                        low: "left",
                        middle: "center",
                        high: "right"
                    }[w.align]
                }).addClass("highcharts-" + this.coll.toLowerCase() + "-title").css(w.style).add(h.axisGroup), h.axisTitle.isNew = !0), e && (b = h.axisTitle.getBBox()[x ? "height" : "width"], i = w.offset, k = c(i) ? 0 : u(w.margin, x ? 5 : 10)), h.axisTitle[e ? "show" : "hide"]()), h.offset = T * u(g.offset, A[y]), p = 2 === y ? h.tickBaseline : 0, x = C + k + (C && T * (x ? u(S.y, h.tickBaseline + 8) : S.x) - p), h.axisTitleMargin = u(i, x), A[y] = pe(A[y], h.axisTitleMargin + b + T * h.offset, x), d[v] = pe(d[v], 2 * ce(g.lineWidth / 2))
            },
            getLinePath: function(t) {
                var e = this.chart,
                    i = this.opposite,
                    n = this.offset,
                    s = this.horiz,
                    o = this.left + (i ? this.width : 0) + n,
                    n = e.chartHeight - this.bottom - (i ? this.height : 0) + n;
                return i && (t *= -1), e.renderer.crispLine(["M", s ? this.left : o, s ? n : this.top, "L", s ? e.chartWidth - this.right : o, s ? n : e.chartHeight - this.bottom], t)
            },
            getTitlePosition: function() {
                var t = this.horiz,
                    e = this.left,
                    n = this.top,
                    s = this.len,
                    o = this.options.title,
                    r = t ? e : n,
                    a = this.opposite,
                    l = this.offset,
                    h = i(o.style.fontSize || 12),
                    s = {
                        low: r + (t ? 0 : s),
                        middle: r + s / 2,
                        high: r + (t ? s : 0)
                    }[o.align],
                    e = (t ? n + this.height : e) + (t ? 1 : -1) * (a ? -1 : 1) * this.axisTitleMargin + (2 === this.side ? h : 0);
                return {
                    x: t ? s : e + (a ? this.width : 0) + l + (o.x || 0),
                    y: t ? e - (a ? this.height : 0) + l : s + (o.y || 0)
                }
            },
            render: function() {
                var t, e, i, n = this,
                    s = n.horiz,
                    o = n.reversed,
                    r = n.chart,
                    a = r.renderer,
                    h = n.options,
                    d = n.isLog,
                    p = n.isLinked,
                    u = n.tickPositions,
                    g = n.axisTitle,
                    f = n.ticks,
                    m = n.minorTicks,
                    x = n.alternateBands,
                    y = h.stackLabels,
                    v = h.alternateGridColor,
                    b = n.tickmarkOffset,
                    k = h.lineWidth,
                    w = r.hasRendered && c(n.oldMin) && !isNaN(n.oldMin),
                    S = n.hasData,
                    C = n.showAxis,
                    A = h.labels.overflow,
                    T = n.justifyLabels = s && A !== !1;
                n.labelEdge.length = 0, n.justifyToPlot = "justify" === A, Ve([f, m, x], function(t) {
                    for (var e in t) t[e].isActive = !1
                }), (S || p) && (n.minorTickInterval && !n.categories && Ve(n.getMinorTickPositions(), function(t) {
                    m[t] || (m[t] = new B(n, t, "minor")), w && m[t].isNew && m[t].render(null, !0), m[t].render(null, !1, 1)
                }), u.length && (t = u.slice(), (s && o || !s && !o) && t.reverse(), T && (t = t.slice(1).concat([t[0]])), Ve(t, function(e, i) {
                    T && (i = i === t.length - 1 ? 0 : i + 1), (!p || e >= n.min && e <= n.max) && (f[e] || (f[e] = new B(n, e)), w && f[e].isNew && f[e].render(i, !0, .1), f[e].render(i))
                }), b && 0 === n.min && (f[-1] || (f[-1] = new B(n, -1, null, !0)), f[-1].render(-1))), v && Ve(u, function(t, s) {
                    s % 2 === 0 && t < n.max && (x[t] || (x[t] = new oe.PlotLineOrBand(n)), e = t + b, i = u[s + 1] !== _ ? u[s + 1] + b : n.max, x[t].options = {
                        from: d ? l(e) : e,
                        to: d ? l(i) : i,
                        color: v
                    }, x[t].render(), x[t].isActive = !0)
                }), n._addedPlotLB || (Ve((h.plotLines || []).concat(h.plotBands || []), function(t) {
                    n.addPlotBandOrLine(t)
                }), n._addedPlotLB = !0)), Ve([f, m, x], function(t) {
                    var e, i, n = [],
                        s = Y ? Y.duration || 500 : 0,
                        o = function() {
                            for (i = n.length; i--;) t[n[i]] && !t[n[i]].isActive && (t[n[i]].destroy(), delete t[n[i]])
                        };
                    for (e in t) t[e].isActive || (t[e].render(e, !1, 0), t[e].isActive = !1, n.push(e));
                    t !== x && r.hasRendered && s ? s && setTimeout(o, s) : o()
                }), k && (s = n.getLinePath(k), n.axisLine ? n.axisLine.animate({
                    d: s
                }) : n.axisLine = a.path(s).attr({
                    stroke: h.lineColor,
                    "stroke-width": k,
                    zIndex: 7
                }).add(n.axisGroup), n.axisLine[C ? "show" : "hide"]()), g && C && (g[g.isNew ? "attr" : "animate"](n.getTitlePosition()), g.isNew = !1), y && y.enabled && n.renderStackTotals(), n.isDirty = !1
            },
            redraw: function() {
                this.render(), Ve(this.plotLinesAndBands, function(t) {
                    t.render()
                }), Ve(this.series, function(t) {
                    t.isDirty = !0
                })
            },
            destroy: function(t) {
                var e, i = this,
                    n = i.stacks,
                    s = i.plotLinesAndBands;
                t || Ke(i);
                for (e in n) T(n[e]), n[e] = null;
                for (Ve([i.ticks, i.minorTicks, i.alternateBands], function(t) {
                        T(t)
                    }), t = s.length; t--;) s[t].destroy();
                Ve("stackTotalGroup,axisLine,axisTitle,axisGroup,cross,gridGroup,labelGroup".split(","), function(t) {
                    i[t] && (i[t] = i[t].destroy())
                }), this.cross && this.cross.destroy()
            },
            drawCrosshair: function(t, e) {
                if (this.crosshair)
                    if ((c(e) || !u(this.crosshair.snap, !0)) === !1) this.hideCrosshair();
                    else {
                        var i, n = this.crosshair,
                            s = n.animation;
                        u(n.snap, !0) ? c(e) && (i = this.chart.inverted != this.horiz ? e.plotX : this.len - e.plotY) : i = this.horiz ? t.chartX - this.pos : this.len - t.chartY + this.pos, i = this.isRadial ? this.getPlotLinePath(this.isXAxis ? e.x : u(e.stackY, e.y)) : this.getPlotLinePath(null, null, null, null, i), null === i ? this.hideCrosshair() : this.cross ? this.cross.attr({
                            visibility: "visible"
                        })[s ? "animate" : "attr"]({
                            d: i
                        }, s) : (s = {
                            "stroke-width": n.width || 1,
                            stroke: n.color || "#C0C0C0",
                            zIndex: n.zIndex || 2
                        }, n.dashStyle && (s.dashstyle = n.dashStyle), this.cross = this.chart.renderer.path(i).attr(s).add())
                    }
            },
            hideCrosshair: function() {
                this.cross && this.cross.hide()
            }
        }, t(O.prototype, {
            getPlotBandPath: function(t, e) {
                var i = this.getPlotLinePath(e),
                    n = this.getPlotLinePath(t);
                return n && i ? n.push(i[4], i[5], i[1], i[2]) : n = null, n
            },
            addPlotBand: function(t) {
                return this.addPlotBandOrLine(t, "plotBands")
            },
            addPlotLine: function(t) {
                return this.addPlotBandOrLine(t, "plotLines")
            },
            addPlotBandOrLine: function(t, e) {
                var i = new oe.PlotLineOrBand(this, t).render(),
                    n = this.userOptions;
                return i && (e && (n[e] = n[e] || [], n[e].push(t)), this.plotLinesAndBands.push(i)), i
            },
            removePlotBandOrLine: function(t) {
                for (var e = this.plotLinesAndBands, i = this.options, n = this.userOptions, s = e.length; s--;) e[s].id === t && e[s].destroy();
                Ve([i.plotLines || [], n.plotLines || [], i.plotBands || [], n.plotBands || []], function(e) {
                    for (s = e.length; s--;) e[s].id === t && h(e, e[s])
                })
            }
        }), O.prototype.getTimeTicks = function(e, i, n, s) {
            var o, r = [],
                a = {},
                l = X.global.useUTC,
                h = new Date(i - $),
                d = e.unitRange,
                p = e.count;
            if (c(i)) {
                d >= N.second && (h.setMilliseconds(0), h.setSeconds(d >= N.minute ? 0 : p * ce(h.getSeconds() / p))), d >= N.minute && h[te](d >= N.hour ? 0 : p * ce(h[U]() / p)), d >= N.hour && h[ee](d >= N.day ? 0 : p * ce(h[Z]() / p)), d >= N.day && h[ie](d >= N.month ? 1 : p * ce(h[q]() / p)), d >= N.month && (h[ne](d >= N.year ? 0 : p * ce(h[J]() / p)), o = h[Q]()), d >= N.year && (o -= o % p, h[se](o)), d === N.week && h[ie](h[q]() - h[K]() + u(s, 1)), i = 1, $ && (h = new Date(h.getTime() + $)), o = h[Q]();
                for (var s = h.getTime(), g = h[J](), f = h[q](), m = l ? $ : (864e5 + 6e4 * h.getTimezoneOffset()) % 864e5; n > s;) r.push(s), d === N.year ? s = j(o + i * p, 0) : d === N.month ? s = j(o, g + i * p) : l || d !== N.day && d !== N.week ? s += d * p : s = j(o, g, f + i * p * (d === N.day ? 1 : 7)), i++;
                r.push(s), Ve(je(r, function(t) {
                    return d <= N.hour && t % N.day === m
                }), function(t) {
                    a[t] = "day"
                })
            }
            return r.info = t(e, {
                higherRanks: a,
                totalRange: d * p
            }), r
        }, O.prototype.normalizeTimeTickInterval = function(t, e) {
            var i, n = e || [
                    ["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                    ["second", [1, 2, 5, 10, 15, 30]],
                    ["minute", [1, 2, 5, 10, 15, 30]],
                    ["hour", [1, 2, 3, 4, 6, 8, 12]],
                    ["day", [1, 2]],
                    ["week", [1, 2]],
                    ["month", [1, 2, 3, 4, 6]],
                    ["year", null]
                ],
                s = n[n.length - 1],
                o = N[s[0]],
                r = s[1];
            for (i = 0; i < n.length && (s = n[i], o = N[s[0]], r = s[1], !(n[i + 1] && t <= (o * r[r.length - 1] + N[n[i + 1][0]]) / 2)); i++);
            return o === N.year && 5 * o > t && (r = [1, 2, 5]), n = w(t / o, r, "year" === s[0] ? pe(k(t / o), 1) : 1), {
                unitRange: o,
                count: n,
                unitName: s[0]
            }
        }, O.prototype.getLogTickPositions = function(t, e, i, n) {
            var s = this.options,
                o = this.len,
                r = [];
            if (n || (this._minorAutoInterval = null), t >= .5) t = he(t), r = this.getLinearTickPositions(t, e, i);
            else if (t >= .08)
                for (var h, c, d, p, g, o = ce(e), s = t > .3 ? [1, 2, 4] : t > .15 ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; i + 1 > o && !g; o++)
                    for (c = s.length, h = 0; c > h && !g; h++) d = a(l(o) * s[h]), d > e && (!n || i >= p) && p !== _ && r.push(p), p > i && (g = !0), p = d;
            else e = l(e), i = l(i), t = s[n ? "minorTickInterval" : "tickInterval"], t = u("auto" === t ? null : t, this._minorAutoInterval, (i - e) * (s.tickPixelInterval / (n ? 5 : 1)) / ((n ? o / this.tickPositions.length : o) || 1)), t = w(t, null, k(t)), r = Ue(this.getLinearTickPositions(t, e, i), a), n || (this._minorAutoInterval = t / 5);
            return n || (this.tickInterval = t), r
        };
        var ci = oe.Tooltip = function() {
            this.init.apply(this, arguments)
        };
        ci.prototype = {
            init: function(t, e) {
                var n = e.borderWidth,
                    s = e.style,
                    o = i(s.padding);
                this.chart = t, this.options = e, this.crosshairs = [], this.now = {
                    x: 0,
                    y: 0
                }, this.isHidden = !0, this.label = t.renderer.label("", 0, 0, e.shape || "callout", null, null, e.useHTML, null, "tooltip").attr({
                    padding: o,
                    fill: e.backgroundColor,
                    "stroke-width": n,
                    r: e.borderRadius,
                    zIndex: 8
                }).css(s).css({
                    padding: 0
                }).add().attr({
                    y: -9999
                }), Le || this.label.shadow(e.shadow), this.shared = e.shared
            },
            destroy: function() {
                this.label && (this.label = this.label.destroy()), clearTimeout(this.hideTimer), clearTimeout(this.tooltipTimeout)
            },
            move: function(e, i, n, s) {
                var o = this,
                    r = o.now,
                    a = o.options.animation !== !1 && !o.isHidden && (ge(e - r.x) > 1 || ge(i - r.y) > 1),
                    l = o.followPointer || o.len > 1;
                t(r, {
                    x: a ? (2 * r.x + e) / 3 : e,
                    y: a ? (r.y + i) / 2 : i,
                    anchorX: l ? _ : a ? (2 * r.anchorX + n) / 3 : n,
                    anchorY: l ? _ : a ? (r.anchorY + s) / 2 : s
                }), o.label.attr(r), a && (clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function() {
                    o && o.move(e, i, n, s)
                }, 32))
            },
            hide: function() {
                var t, e = this;
                clearTimeout(this.hideTimer), this.isHidden || (t = this.chart.hoverPoints, this.hideTimer = setTimeout(function() {
                    e.label.fadeOut(), e.isHidden = !0
                }, u(this.options.hideDelay, 500)), t && Ve(t, function(t) {
                    t.setState()
                }), this.chart.hoverPoints = null)
            },
            getAnchor: function(t, e) {
                var i, n, s = this.chart,
                    o = s.inverted,
                    r = s.plotTop,
                    a = 0,
                    l = 0,
                    t = p(t);
                return i = t[0].tooltipPos, this.followPointer && e && (e.chartX === _ && (e = s.pointer.normalize(e)), i = [e.chartX - s.plotLeft, e.chartY - r]), i || (Ve(t, function(t) {
                    n = t.series.yAxis, a += t.plotX, l += (t.plotLow ? (t.plotLow + t.plotHigh) / 2 : t.plotY) + (!o && n ? n.top - r : 0)
                }), a /= t.length, l /= t.length, i = [o ? s.plotWidth - l : a, this.shared && !o && t.length > 1 && e ? e.chartY - r : o ? s.plotHeight - a : l]), Ue(i, he)
            },
            getPosition: function(t, e, i) {
                var n, s = this.chart,
                    o = this.distance,
                    r = {},
                    a = ["y", s.chartHeight, e, i.plotY + s.plotTop],
                    l = ["x", s.chartWidth, t, i.plotX + s.plotLeft],
                    h = i.ttBelow || s.inverted && !i.negative || !s.inverted && i.negative,
                    c = function(t, e, i, n) {
                        var s = n - o > i,
                            e = e > n + o + i,
                            i = n - o - i;
                        if (n += o, h && e) r[t] = n;
                        else if (!h && s) r[t] = i;
                        else if (s) r[t] = i;
                        else {
                            if (!e) return !1;
                            r[t] = n
                        }
                    },
                    d = function(t, e, i, n) {
                        return o > n || n > e - o ? !1 : void(r[t] = i / 2 > n ? 1 : n > e - i / 2 ? e - i - 2 : n - i / 2)
                    },
                    p = function(t) {
                        var e = a;
                        a = l, l = e, n = t
                    },
                    u = function() {
                        c.apply(0, a) !== !1 ? d.apply(0, l) === !1 && !n && (p(!0), u()) : n ? r.x = r.y = 0 : (p(!0), u())
                    };
                return (s.inverted || this.len > 1) && p(), u(), r
            },
            defaultFormatter: function(t) {
                var e, i = this.points || p(this),
                    n = i[0].series;
                return e = [t.tooltipHeaderFormatter(i[0])], Ve(i, function(t) {
                    n = t.series, e.push(n.tooltipFormatter && n.tooltipFormatter(t) || t.point.tooltipFormatter(n.tooltipOptions.pointFormat))
                }), e.push(t.options.footerFormat || ""), e.join("")
            },
            refresh: function(t, e) {
                var i, n, s, o = this.chart,
                    r = this.label,
                    a = this.options,
                    l = {},
                    h = [];
                s = a.formatter || this.defaultFormatter;
                var c, l = o.hoverPoints,
                    d = this.shared;
                clearTimeout(this.hideTimer), this.followPointer = p(t)[0].series.tooltipOptions.followPointer, n = this.getAnchor(t, e), i = n[0], n = n[1], !d || t.series && t.series.noSharedTooltip ? l = t.getLabelConfig() : (o.hoverPoints = t, l && Ve(l, function(t) {
                    t.setState()
                }), Ve(t, function(t) {
                    t.setState("hover"), h.push(t.getLabelConfig())
                }), l = {
                    x: t[0].category,
                    y: t[0].y
                }, l.points = h, this.len = h.length, t = t[0]), s = s.call(l, this), l = t.series, this.distance = u(l.tooltipOptions.distance, 16), s === !1 ? this.hide() : (this.isHidden && (ti(r), r.attr("opacity", 1).show()), r.attr({
                    text: s
                }), c = a.borderColor || t.color || l.color || "#606060", r.attr({
                    stroke: c
                }), this.updatePosition({
                    plotX: i,
                    plotY: n,
                    negative: t.negative,
                    ttBelow: t.ttBelow
                }), this.isHidden = !1), qe(o, "tooltipRefresh", {
                    text: s,
                    x: i + o.plotLeft,
                    y: n + o.plotTop,
                    borderColor: c
                })
            },
            updatePosition: function(t) {
                var e = this.chart,
                    i = this.label,
                    i = (this.options.positioner || this.getPosition).call(this, i.width, i.height, t);
                this.move(he(i.x), he(i.y), t.plotX + e.plotLeft, t.plotY + e.plotTop)
            },
            tooltipHeaderFormatter: function(t) {
                var e, i = t.series,
                    n = i.tooltipOptions,
                    s = n.dateTimeLabelFormats,
                    o = n.xDateFormat,
                    a = i.xAxis,
                    l = a && "datetime" === a.options.type && r(t.key),
                    n = n.headerFormat,
                    a = a && a.closestPointRange;
                if (l && !o) {
                    if (a) {
                        for (e in N)
                            if (N[e] >= a || N[e] <= N.day && t.key % N[e] > 0) {
                                o = s[e];
                                break
                            }
                    } else o = s.day;
                    o = o || s.year
                }
                return l && o && (n = n.replace("{point.key}", "{point.key:" + o + "}")), b(n, {
                    point: t,
                    series: i
                })
            }
        };
        var di;
        E = re.documentElement.ontouchstart !== _;
        var pi = oe.Pointer = function(t, e) {
            this.init(t, e)
        };
        if (pi.prototype = {
                init: function(t, e) {
                    var i, n = e.chart,
                        s = n.events,
                        o = Le ? "" : n.zoomType,
                        n = t.inverted;
                    this.options = e, this.chart = t, this.zoomX = i = /x/.test(o), this.zoomY = o = /y/.test(o), this.zoomHor = i && !n || o && n, this.zoomVert = o && !n || i && n, this.hasZoom = i || o, this.runChartClick = s && !!s.click, this.pinchDown = [], this.lastValidTouch = {}, oe.Tooltip && e.tooltip.enabled && (t.tooltip = new ci(t, e.tooltip), this.followTouchMove = e.tooltip.followTouchMove), this.setDOMEvents()
                },
                normalize: function(e, i) {
                    var n, s, e = e || window.event,
                        e = Je(e);
                    return e.target || (e.target = e.srcElement), s = e.touches ? e.touches.length ? e.touches.item(0) : e.changedTouches[0] : e, i || (this.chartPosition = i = $e(this.chart.container)), s.pageX === _ ? (n = pe(e.x, e.clientX - i.left), s = e.y) : (n = s.pageX - i.left, s = s.pageY - i.top), t(e, {
                        chartX: he(n),
                        chartY: he(s)
                    })
                },
                getCoordinates: function(t) {
                    var e = {
                        xAxis: [],
                        yAxis: []
                    };
                    return Ve(this.chart.axes, function(i) {
                        e[i.isXAxis ? "xAxis" : "yAxis"].push({
                            axis: i,
                            value: i.toValue(t[i.horiz ? "chartX" : "chartY"])
                        })
                    }), e
                },
                getIndex: function(t) {
                    var e = this.chart;
                    return e.inverted ? e.plotHeight + e.plotTop - t.chartY : t.chartX - e.plotLeft
                },
                runPointActions: function(t) {
                    var e, i, n, s, o = this.chart,
                        r = o.series,
                        a = o.tooltip,
                        l = o.hoverPoint,
                        h = o.hoverSeries,
                        c = o.chartWidth,
                        d = this.getIndex(t);
                    if (a && this.options.tooltip.shared && (!h || !h.noSharedTooltip)) {
                        for (i = [], n = r.length, s = 0; n > s; s++) r[s].visible && r[s].options.enableMouseTracking !== !1 && !r[s].noSharedTooltip && r[s].singularTooltips !== !0 && r[s].tooltipPoints.length && (e = r[s].tooltipPoints[d]) && e.series && (e._dist = ge(d - e.clientX), c = ue(c, e._dist), i.push(e));
                        for (n = i.length; n--;) i[n]._dist > c && i.splice(n, 1);
                        i.length && i[0].clientX !== this.hoverX && (a.refresh(i, t), this.hoverX = i[0].clientX)
                    }
                    r = h && h.tooltipOptions.followPointer, h && h.tracker && !r ? (e = h.tooltipPoints[d]) && e !== l && e.onMouseOver(t) : a && r && !a.isHidden && (h = a.getAnchor([{}], t), a.updatePosition({
                        plotX: h[0],
                        plotY: h[1]
                    })), a && !this._onDocumentMouseMove && (this._onDocumentMouseMove = function(t) {
                        Oe[di] && Oe[di].pointer.onDocumentMouseMove(t)
                    }, Ze(re, "mousemove", this._onDocumentMouseMove)), Ve(o.axes, function(i) {
                        i.drawCrosshair(t, u(e, l))
                    })
                },
                reset: function(t) {
                    var e = this.chart,
                        i = e.hoverSeries,
                        n = e.hoverPoint,
                        s = e.tooltip,
                        o = s && s.shared ? e.hoverPoints : n;
                    (t = t && s && o) && p(o)[0].plotX === _ && (t = !1), t ? (s.refresh(o), n && n.setState(n.state, !0)) : (n && n.onMouseOut(), i && i.onMouseOut(), s && s.hide(), this._onDocumentMouseMove && (Ke(re, "mousemove", this._onDocumentMouseMove), this._onDocumentMouseMove = null), Ve(e.axes, function(t) {
                        t.hideCrosshair()
                    }), this.hoverX = null)
                },
                scaleGroups: function(t, e) {
                    var i, n = this.chart;
                    Ve(n.series, function(s) {
                        i = t || s.getPlotBox(), s.xAxis && s.xAxis.zoomEnabled && (s.group.attr(i), s.markerGroup && (s.markerGroup.attr(i), s.markerGroup.clip(e ? n.clipRect : null)), s.dataLabelsGroup && s.dataLabelsGroup.attr(i))
                    }), n.clipRect.attr(e || n.clipBox)
                },
                dragStart: function(t) {
                    var e = this.chart;
                    e.mouseIsDown = t.type, e.cancelClick = !1, e.mouseDownX = this.mouseDownX = t.chartX, e.mouseDownY = this.mouseDownY = t.chartY
                },
                drag: function(t) {
                    var e, i = this.chart,
                        n = i.options.chart,
                        s = t.chartX,
                        o = t.chartY,
                        r = this.zoomHor,
                        a = this.zoomVert,
                        l = i.plotLeft,
                        h = i.plotTop,
                        c = i.plotWidth,
                        d = i.plotHeight,
                        p = this.mouseDownX,
                        u = this.mouseDownY,
                        g = n.panKey && t[n.panKey + "Key"];
                    l > s ? s = l : s > l + c && (s = l + c), h > o ? o = h : o > h + d && (o = h + d), this.hasDragged = Math.sqrt(Math.pow(p - s, 2) + Math.pow(u - o, 2)), this.hasDragged > 10 && (e = i.isInsidePlot(p - l, u - h), i.hasCartesianSeries && (this.zoomX || this.zoomY) && e && !g && !this.selectionMarker && (this.selectionMarker = i.renderer.rect(l, h, r ? 1 : c, a ? 1 : d, 0).attr({
                        fill: n.selectionMarkerFill || "rgba(69,114,167,0.25)",
                        zIndex: 7
                    }).add()), this.selectionMarker && r && (s -= p, this.selectionMarker.attr({
                        width: ge(s),
                        x: (s > 0 ? 0 : s) + p
                    })), this.selectionMarker && a && (s = o - u, this.selectionMarker.attr({
                        height: ge(s),
                        y: (s > 0 ? 0 : s) + u
                    })), e && !this.selectionMarker && n.panning && i.pan(t, n.panning))
                },
                drop: function(e) {
                    var i = this.chart,
                        n = this.hasPinched;
                    if (this.selectionMarker) {
                        var s, o = {
                                xAxis: [],
                                yAxis: [],
                                originalEvent: e.originalEvent || e
                            },
                            r = this.selectionMarker,
                            a = r.attr ? r.attr("x") : r.x,
                            l = r.attr ? r.attr("y") : r.y,
                            h = r.attr ? r.attr("width") : r.width,
                            c = r.attr ? r.attr("height") : r.height;
                        (this.hasDragged || n) && (Ve(i.axes, function(t) {
                            if (t.zoomEnabled) {
                                var i = t.horiz,
                                    n = "touchend" === e.type ? t.minPixelPadding : 0,
                                    r = t.toValue((i ? a : l) + n),
                                    i = t.toValue((i ? a + h : l + c) - n);
                                !isNaN(r) && !isNaN(i) && (o[t.coll].push({
                                    axis: t,
                                    min: ue(r, i),
                                    max: pe(r, i)
                                }), s = !0)
                            }
                        }), s && qe(i, "selection", o, function(e) {
                            i.zoom(t(e, n ? {
                                animation: !1
                            } : null))
                        })), this.selectionMarker = this.selectionMarker.destroy(), n && this.scaleGroups()
                    }
                    i && (g(i.container, {
                        cursor: i._cursor
                    }), i.cancelClick = this.hasDragged > 10, i.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                },
                onContainerMouseDown: function(t) {
                    t = this.normalize(t), t.preventDefault && t.preventDefault(), this.dragStart(t)
                },
                onDocumentMouseUp: function(t) {
                    Oe[di] && Oe[di].pointer.drop(t)
                },
                onDocumentMouseMove: function(t) {
                    var e = this.chart,
                        i = this.chartPosition,
                        n = e.hoverSeries,
                        t = this.normalize(t, i);
                    i && n && !this.inClass(t.target, "highcharts-tracker") && !e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) && this.reset()
                },
                onContainerMouseLeave: function() {
                    var t = Oe[di];
                    t && (t.pointer.reset(), t.pointer.chartPosition = null)
                },
                onContainerMouseMove: function(t) {
                    var e = this.chart;
                    di = e.index, t = this.normalize(t), t.returnValue = !1, "mousedown" === e.mouseIsDown && this.drag(t), (this.inClass(t.target, "highcharts-tracker") || e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop)) && !e.openMenu && this.runPointActions(t)
                },
                inClass: function(t, e) {
                    for (var i; t;) {
                        if (i = d(t, "class")) {
                            if (-1 !== i.indexOf(e)) return !0;
                            if (-1 !== i.indexOf("highcharts-container")) return !1
                        }
                        t = t.parentNode
                    }
                },
                onTrackerMouseOut: function(t) {
                    var e = this.chart.hoverSeries,
                        i = (t = t.relatedTarget || t.toElement) && t.point && t.point.series;
                    !e || e.options.stickyTracking || this.inClass(t, "highcharts-tooltip") || i === e || e.onMouseOut()
                },
                onContainerClick: function(e) {
                    var i = this.chart,
                        n = i.hoverPoint,
                        s = i.plotLeft,
                        o = i.plotTop,
                        e = this.normalize(e);
                    e.cancelBubble = !0, i.cancelClick || (n && this.inClass(e.target, "highcharts-tracker") ? (qe(n.series, "click", t(e, {
                        point: n
                    })), i.hoverPoint && n.firePointEvent("click", e)) : (t(e, this.getCoordinates(e)), i.isInsidePlot(e.chartX - s, e.chartY - o) && qe(i, "click", e)))
                },
                setDOMEvents: function() {
                    var t = this,
                        e = t.chart.container;
                    e.onmousedown = function(e) {
                        t.onContainerMouseDown(e)
                    }, e.onmousemove = function(e) {
                        t.onContainerMouseMove(e)
                    }, e.onclick = function(e) {
                        t.onContainerClick(e)
                    }, Ze(e, "mouseleave", t.onContainerMouseLeave), 1 === ze && Ze(re, "mouseup", t.onDocumentMouseUp), E && (e.ontouchstart = function(e) {
                        t.onContainerTouchStart(e)
                    }, e.ontouchmove = function(e) {
                        t.onContainerTouchMove(e)
                    }, 1 === ze && Ze(re, "touchend", t.onDocumentTouchEnd))
                },
                destroy: function() {
                    var t;
                    Ke(this.chart.container, "mouseleave", this.onContainerMouseLeave), ze || (Ke(re, "mouseup", this.onDocumentMouseUp), Ke(re, "touchend", this.onDocumentTouchEnd)), clearInterval(this.tooltipTimeout);
                    for (t in this) this[t] = null
                }
            }, t(oe.Pointer.prototype, {
                pinchTranslate: function(t, e, i, n, s, o) {
                    (this.zoomHor || this.pinchHor) && this.pinchTranslateDirection(!0, t, e, i, n, s, o), (this.zoomVert || this.pinchVert) && this.pinchTranslateDirection(!1, t, e, i, n, s, o)
                },
                pinchTranslateDirection: function(t, e, i, n, s, o, r, a) {
                    var l, h, c, d = this.chart,
                        p = t ? "x" : "y",
                        u = t ? "X" : "Y",
                        g = "chart" + u,
                        f = t ? "width" : "height",
                        m = d["plot" + (t ? "Left" : "Top")],
                        x = a || 1,
                        y = d.inverted,
                        v = d.bounds[t ? "h" : "v"],
                        b = 1 === e.length,
                        k = e[0][g],
                        w = i[0][g],
                        S = !b && e[1][g],
                        C = !b && i[1][g],
                        i = function() {
                            !b && ge(k - S) > 20 && (x = a || ge(w - C) / ge(k - S)), h = (m - w) / x + k, l = d["plot" + (t ? "Width" : "Height")] / x
                        };
                    i(), e = h, e < v.min ? (e = v.min, c = !0) : e + l > v.max && (e = v.max - l, c = !0), c ? (w -= .8 * (w - r[p][0]), b || (C -= .8 * (C - r[p][1])), i()) : r[p] = [w, C], y || (o[p] = h - m, o[f] = l), o = y ? 1 / x : x, s[f] = l, s[p] = e, n[y ? t ? "scaleY" : "scaleX" : "scale" + u] = x, n["translate" + u] = o * m + (w - o * k)
                },
                pinch: function(e) {
                    var i = this,
                        n = i.chart,
                        s = i.pinchDown,
                        o = i.followTouchMove,
                        r = e.touches,
                        a = r.length,
                        l = i.lastValidTouch,
                        h = i.hasZoom,
                        c = i.selectionMarker,
                        d = {},
                        p = 1 === a && (i.inClass(e.target, "highcharts-tracker") && n.runTrackerClick || n.runChartClick),
                        g = {};
                    (h || o) && !p && e.preventDefault(), Ue(r, function(t) {
                        return i.normalize(t)
                    }), "touchstart" === e.type ? (Ve(r, function(t, e) {
                        s[e] = {
                            chartX: t.chartX,
                            chartY: t.chartY
                        }
                    }), l.x = [s[0].chartX, s[1] && s[1].chartX], l.y = [s[0].chartY, s[1] && s[1].chartY], Ve(n.axes, function(t) {
                        if (t.zoomEnabled) {
                            var e = n.bounds[t.horiz ? "h" : "v"],
                                i = t.minPixelPadding,
                                s = t.toPixels(u(t.options.min, t.dataMin)),
                                o = t.toPixels(u(t.options.max, t.dataMax)),
                                r = ue(s, o),
                                s = pe(s, o);
                            e.min = ue(t.pos, r - i), e.max = pe(t.pos + t.len, s + i)
                        }
                    })) : s.length && (c || (i.selectionMarker = c = t({
                        destroy: Be
                    }, n.plotBox)), i.pinchTranslate(s, r, d, c, g, l), i.hasPinched = h, i.scaleGroups(d, g), !h && o && 1 === a && this.runPointActions(i.normalize(e)))
                },
                onContainerTouchStart: function(t) {
                    var e = this.chart;
                    di = e.index, 1 === t.touches.length ? (t = this.normalize(t), e.isInsidePlot(t.chartX - e.plotLeft, t.chartY - e.plotTop) ? (this.runPointActions(t), this.pinch(t)) : this.reset()) : 2 === t.touches.length && this.pinch(t)
                },
                onContainerTouchMove: function(t) {
                    (1 === t.touches.length || 2 === t.touches.length) && this.pinch(t)
                },
                onDocumentTouchEnd: function(t) {
                    Oe[di] && Oe[di].pointer.drop(t)
                }
            }), ae.PointerEvent || ae.MSPointerEvent) {
            var ui = {},
                gi = !!ae.PointerEvent,
                fi = function() {
                    var t, e = [];
                    e.item = function(t) {
                        return this[t]
                    };
                    for (t in ui) ui.hasOwnProperty(t) && e.push({
                        pageX: ui[t].pageX,
                        pageY: ui[t].pageY,
                        target: ui[t].target
                    });
                    return e
                },
                mi = function(t, e, i, n) {
                    t = t.originalEvent || t, "touch" !== t.pointerType && t.pointerType !== t.MSPOINTER_TYPE_TOUCH || !Oe[di] || (n(t), n = Oe[di].pointer, n[e]({
                        type: i,
                        target: t.currentTarget,
                        preventDefault: Be,
                        touches: fi()
                    }))
                };
            t(pi.prototype, {
                onContainerPointerDown: function(t) {
                    mi(t, "onContainerTouchStart", "touchstart", function(t) {
                        ui[t.pointerId] = {
                            pageX: t.pageX,
                            pageY: t.pageY,
                            target: t.currentTarget
                        }
                    })
                },
                onContainerPointerMove: function(t) {
                    mi(t, "onContainerTouchMove", "touchmove", function(t) {
                        ui[t.pointerId] = {
                            pageX: t.pageX,
                            pageY: t.pageY
                        }, ui[t.pointerId].target || (ui[t.pointerId].target = t.currentTarget)
                    })
                },
                onDocumentPointerUp: function(t) {
                    mi(t, "onContainerTouchEnd", "touchend", function(t) {
                        delete ui[t.pointerId]
                    })
                },
                batchMSEvents: function(t) {
                    t(this.chart.container, gi ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown), t(this.chart.container, gi ? "pointermove" : "MSPointerMove", this.onContainerPointerMove), t(re, gi ? "pointerup" : "MSPointerUp", this.onDocumentPointerUp)
                }
            }), v(pi.prototype, "init", function(t, e, i) {
                t.call(this, e, i), (this.hasZoom || this.followTouchMove) && g(e.container, {
                    "-ms-touch-action": _e,
                    "touch-action": _e
                })
            }), v(pi.prototype, "setDOMEvents", function(t) {
                t.apply(this), (this.hasZoom || this.followTouchMove) && this.batchMSEvents(Ze)
            }), v(pi.prototype, "destroy", function(t) {
                this.batchMSEvents(Ke), t.call(this)
            })
        }
        var xi = oe.Legend = function(t, e) {
            this.init(t, e)
        };
        xi.prototype = {
            init: function(t, i) {
                var n = this,
                    s = i.itemStyle,
                    o = u(i.padding, 8),
                    r = i.itemMarginTop || 0;
                this.options = i, i.enabled && (n.itemStyle = s, n.itemHiddenStyle = e(s, i.itemHiddenStyle), n.itemMarginTop = r, n.padding = o, n.initialItemX = o, n.initialItemY = o - 5, n.maxItemWidth = 0, n.chart = t, n.itemHeight = 0, n.lastLineHeight = 0, n.symbolWidth = u(i.symbolWidth, 16), n.pages = [], n.render(), Ze(n.chart, "endResize", function() {
                    n.positionCheckboxes()
                }))
            },
            colorizeItem: function(t, e) {
                var i, n = this.options,
                    s = t.legendItem,
                    o = t.legendLine,
                    r = t.legendSymbol,
                    a = this.itemHiddenStyle.color,
                    n = e ? n.itemStyle.color : a,
                    l = e ? t.legendColor || t.color || "#CCC" : a,
                    a = t.options && t.options.marker,
                    h = {
                        fill: l
                    };
                if (s && s.css({
                        fill: n,
                        color: n
                    }), o && o.attr({
                        stroke: l
                    }), r) {
                    if (a && r.isMarker)
                        for (i in h.stroke = l, a = t.convertAttribs(a)) s = a[i], s !== _ && (h[i] = s);
                    r.attr(h)
                }
            },
            positionItem: function(t) {
                var e = this.options,
                    i = e.symbolPadding,
                    e = !e.rtl,
                    n = t._legendItemPos,
                    s = n[0],
                    n = n[1],
                    o = t.checkbox;
                t.legendGroup && t.legendGroup.translate(e ? s : this.legendWidth - s - 2 * i - 4, n), o && (o.x = s, o.y = n)
            },
            destroyItem: function(t) {
                var e = t.checkbox;
                Ve(["legendItem", "legendLine", "legendSymbol", "legendGroup"], function(e) {
                    t[e] && (t[e] = t[e].destroy())
                }), e && M(t.checkbox)
            },
            destroy: function() {
                var t = this.group,
                    e = this.box;
                e && (this.box = e.destroy()), t && (this.group = t.destroy())
            },
            positionCheckboxes: function(t) {
                var e, i = this.group.alignAttr,
                    n = this.clipHeight || this.legendHeight;
                i && (e = i.translateY, Ve(this.allItems, function(s) {
                    var o, r = s.checkbox;
                    r && (o = e + r.y + (t || 0) + 3, g(r, {
                        left: i.translateX + s.checkboxOffset + r.x - 20 + "px",
                        top: o + "px",
                        display: o > e - 6 && e + n - 6 > o ? "" : _e
                    }))
                }))
            },
            renderTitle: function() {
                var t = this.padding,
                    e = this.options.title,
                    i = 0;
                e.text && (this.title || (this.title = this.chart.renderer.label(e.text, t - 3, t - 4, null, null, null, null, null, "legend-title").attr({
                    zIndex: 1
                }).css(e.style).add(this.group)), t = this.title.getBBox(), i = t.height, this.offsetWidth = t.width, this.contentGroup.attr({
                    translateY: i
                })), this.titleHeight = i
            },
            renderItem: function(t) {
                var i = this.chart,
                    n = i.renderer,
                    s = this.options,
                    o = "horizontal" === s.layout,
                    r = this.symbolWidth,
                    a = s.symbolPadding,
                    l = this.itemStyle,
                    h = this.itemHiddenStyle,
                    c = this.padding,
                    d = o ? u(s.itemDistance, 20) : 0,
                    p = !s.rtl,
                    g = s.width,
                    f = s.itemMarginBottom || 0,
                    m = this.itemMarginTop,
                    x = this.initialItemX,
                    y = t.legendItem,
                    v = t.series && t.series.drawLegendSymbol ? t.series : t,
                    k = v.options,
                    k = this.createCheckboxForItem && k && k.showCheckbox,
                    w = s.useHTML;
                y || (t.legendGroup = n.g("legend-item").attr({
                    zIndex: 1
                }).add(this.scrollGroup), t.legendItem = y = n.text(s.labelFormat ? b(s.labelFormat, t) : s.labelFormatter.call(t), p ? r + a : -a, this.baseline || 0, w).css(e(t.visible ? l : h)).attr({
                    align: p ? "left" : "right",
                    zIndex: 2
                }).add(t.legendGroup), this.baseline || (this.baseline = n.fontMetrics(l.fontSize, y).f + 3 + m, y.attr("y", this.baseline)), v.drawLegendSymbol(this, t), this.setItemEvents && this.setItemEvents(t, y, w, l, h), this.colorizeItem(t, t.visible), k && this.createCheckboxForItem(t)), n = y.getBBox(), r = t.checkboxOffset = s.itemWidth || t.legendItemWidth || r + a + n.width + d + (k ? 20 : 0), this.itemHeight = a = he(t.legendItemHeight || n.height), o && this.itemX - x + r > (g || i.chartWidth - 2 * c - x - s.x) && (this.itemX = x, this.itemY += m + this.lastLineHeight + f, this.lastLineHeight = 0), this.maxItemWidth = pe(this.maxItemWidth, r), this.lastItemY = m + this.itemY + f, this.lastLineHeight = pe(a, this.lastLineHeight), t._legendItemPos = [this.itemX, this.itemY], o ? this.itemX += r : (this.itemY += m + a + f, this.lastLineHeight = a), this.offsetWidth = g || pe((o ? this.itemX - x - d : r) + c, this.offsetWidth)
            },
            getAllItems: function() {
                var t = [];
                return Ve(this.chart.series, function(e) {
                    var i = e.options;
                    u(i.showInLegend, c(i.linkedTo) ? !1 : _, !0) && (t = t.concat(e.legendItems || ("point" === i.legendType ? e.data : e)))
                }), t
            },
            render: function() {
                var e, i, n, s, o = this,
                    r = o.chart,
                    a = r.renderer,
                    l = o.group,
                    h = o.box,
                    c = o.options,
                    d = o.padding,
                    p = c.borderWidth,
                    u = c.backgroundColor;
                o.itemX = o.initialItemX, o.itemY = o.initialItemY, o.offsetWidth = 0, o.lastItemY = 0, l || (o.group = l = a.g("legend").attr({
                    zIndex: 7
                }).add(), o.contentGroup = a.g().attr({
                    zIndex: 1
                }).add(l), o.scrollGroup = a.g().add(o.contentGroup)), o.renderTitle(), e = o.getAllItems(), S(e, function(t, e) {
                    return (t.options && t.options.legendIndex || 0) - (e.options && e.options.legendIndex || 0)
                }), c.reversed && e.reverse(), o.allItems = e, o.display = i = !!e.length, Ve(e, function(t) {
                    o.renderItem(t)
                }), n = c.width || o.offsetWidth, s = o.lastItemY + o.lastLineHeight + o.titleHeight, s = o.handleOverflow(s), (p || u) && (n += d, s += d, h ? n > 0 && s > 0 && (h[h.isNew ? "attr" : "animate"](h.crisp({
                    width: n,
                    height: s
                })), h.isNew = !1) : (o.box = h = a.rect(0, 0, n, s, c.borderRadius, p || 0).attr({
                    stroke: c.borderColor,
                    "stroke-width": p || 0,
                    fill: u || _e
                }).add(l).shadow(c.shadow), h.isNew = !0), h[i ? "show" : "hide"]()), o.legendWidth = n, o.legendHeight = s, Ve(e, function(t) {
                    o.positionItem(t)
                }), i && l.align(t({
                    width: n,
                    height: s
                }, c), !0, "spacingBox"), r.isResizing || this.positionCheckboxes()
            },
            handleOverflow: function(t) {
                var e, i, n = this,
                    s = this.chart,
                    o = s.renderer,
                    r = this.options,
                    a = r.y,
                    a = s.spacingBox.height + ("top" === r.verticalAlign ? -a : a) - this.padding,
                    l = r.maxHeight,
                    h = this.clipRect,
                    c = r.navigation,
                    d = u(c.animation, !0),
                    p = c.arrowSize || 12,
                    g = this.nav,
                    f = this.pages,
                    m = this.allItems;
                return "horizontal" === r.layout && (a /= 2), l && (a = ue(a, l)), f.length = 0, t > a && !r.useHTML ? (this.clipHeight = e = pe(a - 20 - this.titleHeight - this.padding, 0), this.currentPage = u(this.currentPage, 1), this.fullHeight = t, Ve(m, function(t, n) {
                    var s = t._legendItemPos[1],
                        o = he(t.legendItem.getBBox().height),
                        r = f.length;
                    (!r || s - f[r - 1] > e && (i || s) !== f[r - 1]) && (f.push(i || s), r++), n === m.length - 1 && s + o - f[r - 1] > e && f.push(s), s !== i && (i = s)
                }), h || (h = n.clipRect = o.clipRect(0, this.padding, 9999, 0), n.contentGroup.clip(h)), h.attr({
                    height: e
                }), g || (this.nav = g = o.g().attr({
                    zIndex: 1
                }).add(this.group), this.up = o.symbol("triangle", 0, 0, p, p).on("click", function() {
                    n.scroll(-1, d)
                }).add(g), this.pager = o.text("", 15, 10).css(c.style).add(g), this.down = o.symbol("triangle-down", 0, 0, p, p).on("click", function() {
                    n.scroll(1, d)
                }).add(g)), n.scroll(0), t = a) : g && (h.attr({
                    height: s.chartHeight
                }), g.hide(), this.scrollGroup.attr({
                    translateY: 1
                }), this.clipHeight = 0), t
            },
            scroll: function(t, e) {
                var i = this.pages,
                    n = i.length,
                    s = this.currentPage + t,
                    o = this.clipHeight,
                    r = this.options.navigation,
                    a = r.activeColor,
                    r = r.inactiveColor,
                    l = this.pager,
                    h = this.padding;
                s > n && (s = n), s > 0 && (e !== _ && L(e, this.chart), this.nav.attr({
                    translateX: h,
                    translateY: o + this.padding + 7 + this.titleHeight,
                    visibility: "visible"
                }), this.up.attr({
                    fill: 1 === s ? r : a
                }).css({
                    cursor: 1 === s ? "default" : "pointer"
                }), l.attr({
                    text: s + "/" + n
                }), this.down.attr({
                    x: 18 + this.pager.getBBox().width,
                    fill: s === n ? r : a
                }).css({
                    cursor: s === n ? "default" : "pointer"
                }), i = -i[s - 1] + this.initialItemY, this.scrollGroup.animate({
                    translateY: i
                }), this.currentPage = s, this.positionCheckboxes(i))
            }
        }, Ge = oe.LegendSymbolMixin = {
            drawRectangle: function(t, e) {
                var i = t.options.symbolHeight || 12;
                e.legendSymbol = this.chart.renderer.rect(0, t.baseline - 5 - i / 2, t.symbolWidth, i, t.options.symbolRadius || 0).attr({
                    zIndex: 3
                }).add(e.legendGroup)
            },
            drawLineMarker: function(t) {
                var e, i = this.options,
                    n = i.marker;
                e = t.symbolWidth;
                var s, o = this.chart.renderer,
                    r = this.legendGroup,
                    t = t.baseline - he(.3 * o.fontMetrics(t.options.itemStyle.fontSize, this.legendItem).b);
                i.lineWidth && (s = {
                    "stroke-width": i.lineWidth
                }, i.dashStyle && (s.dashstyle = i.dashStyle), this.legendLine = o.path(["M", 0, t, "L", e, t]).attr(s).add(r)), n && n.enabled !== !1 && (i = n.radius, this.legendSymbol = e = o.symbol(this.symbol, e / 2 - i, t - i, 2 * i, 2 * i).add(r), e.isMarker = !0)
            }
        }, (/Trident\/7\.0/.test(ve) || Ce) && v(xi.prototype, "positionItem", function(t, e) {
            var i = this,
                n = function() {
                    e._legendItemPos && t.call(i, e)
                };
            n(), setTimeout(n)
        }), z.prototype = {
            init: function(t, i) {
                var n, s = t.series;
                t.series = null, n = e(X, t), n.series = t.series = s, this.userOptions = t, s = n.chart, this.margin = this.splashArray("margin", s), this.spacing = this.splashArray("spacing", s);
                var o = s.events;
                this.bounds = {
                    h: {},
                    v: {}
                }, this.callback = i, this.isResizing = 0, this.options = n, this.axes = [], this.series = [], this.hasCartesianSeries = s.showAxes;
                var r, a = this;
                if (a.index = Oe.length, Oe.push(a), ze++, s.reflow !== !1 && Ze(a, "load", function() {
                        a.initReflow()
                    }), o)
                    for (r in o) Ze(a, r, o[r]);
                a.xAxis = [], a.yAxis = [], a.animation = Le ? !1 : u(s.animation, !0), a.pointCount = a.colorCounter = a.symbolCounter = 0, a.firstRender()
            },
            initSeries: function(t) {
                var e = this.options.chart;
                return (e = We[t.type || e.type || e.defaultSeriesType]) || V(17, !0), e = new e, e.init(this, t), e
            },
            isInsidePlot: function(t, e, i) {
                var n = i ? e : t,
                    t = i ? t : e;
                return n >= 0 && n <= this.plotWidth && t >= 0 && t <= this.plotHeight
            },
            adjustTickAmounts: function() {
                this.options.chart.alignTicks !== !1 && Ve(this.axes, function(t) {
                    t.adjustTickAmount()
                }), this.maxTicks = null
            },
            redraw: function(e) {
                var i, n, s = this.axes,
                    o = this.series,
                    r = this.pointer,
                    a = this.legend,
                    l = this.isDirtyLegend,
                    h = this.hasCartesianSeries,
                    c = this.isDirtyBox,
                    d = o.length,
                    p = d,
                    u = this.renderer,
                    g = u.isHidden(),
                    f = [];
                for (L(e, this), g && this.cloneRenderTo(), this.layOutTitles(); p--;)
                    if (e = o[p], e.options.stacking && (i = !0, e.isDirty)) {
                        n = !0;
                        break
                    }
                if (n)
                    for (p = d; p--;) e = o[p], e.options.stacking && (e.isDirty = !0);
                Ve(o, function(t) {
                    t.isDirty && "point" === t.options.legendType && (l = !0)
                }), l && a.options.enabled && (a.render(), this.isDirtyLegend = !1), i && this.getStacks(), h && (this.isResizing || (this.maxTicks = null, Ve(s, function(t) {
                    t.setScale()
                })), this.adjustTickAmounts()), this.getMargins(), h && (Ve(s, function(t) {
                    t.isDirty && (c = !0)
                }), Ve(s, function(e) {
                    e.isDirtyExtremes && (e.isDirtyExtremes = !1, f.push(function() {
                        qe(e, "afterSetExtremes", t(e.eventArgs, e.getExtremes())), delete e.eventArgs
                    })), (c || i) && e.redraw()
                })), c && this.drawChartBox(), Ve(o, function(t) {
                    t.isDirty && t.visible && (!t.isCartesian || t.xAxis) && t.redraw()
                }), r && r.reset(!0), u.draw(), qe(this, "redraw"), g && this.cloneRenderTo(!0), Ve(f, function(t) {
                    t.call()
                })
            },
            get: function(t) {
                var e, i, n = this.axes,
                    s = this.series;
                for (e = 0; e < n.length; e++)
                    if (n[e].options.id === t) return n[e];
                for (e = 0; e < s.length; e++)
                    if (s[e].options.id === t) return s[e];
                for (e = 0; e < s.length; e++)
                    for (i = s[e].points || [], n = 0; n < i.length; n++)
                        if (i[n].id === t) return i[n];
                return null
            },
            getAxes: function() {
                var t = this,
                    e = this.options,
                    i = e.xAxis = p(e.xAxis || {}),
                    e = e.yAxis = p(e.yAxis || {});
                Ve(i, function(t, e) {
                    t.index = e, t.isX = !0
                }), Ve(e, function(t, e) {
                    t.index = e
                }), i = i.concat(e), Ve(i, function(e) {
                    new O(t, e)
                }), t.adjustTickAmounts()
            },
            getSelectedPoints: function() {
                var t = [];
                return Ve(this.series, function(e) {
                    t = t.concat(je(e.points || [], function(t) {
                        return t.selected
                    }))
                }), t
            },
            getSelectedSeries: function() {
                return je(this.series, function(t) {
                    return t.selected
                })
            },
            getStacks: function() {
                var t = this;
                Ve(t.yAxis, function(t) {
                    t.stacks && t.hasVisibleSeries && (t.oldStacks = t.stacks)
                }), Ve(t.series, function(e) {
                    !e.options.stacking || e.visible !== !0 && t.options.chart.ignoreHiddenSeries !== !1 || (e.stackKey = e.type + u(e.options.stack, ""))
                })
            },
            setTitle: function(t, i, n) {
                var s, o, r = this,
                    a = r.options;
                o = a.title = e(a.title, t), s = a.subtitle = e(a.subtitle, i), a = s, Ve([
                    ["title", t, o],
                    ["subtitle", i, a]
                ], function(t) {
                    var e = t[0],
                        i = r[e],
                        n = t[1],
                        t = t[2];
                    i && n && (r[e] = i = i.destroy()), t && t.text && !i && (r[e] = r.renderer.text(t.text, 0, 0, t.useHTML).attr({
                        align: t.align,
                        "class": "highcharts-" + e,
                        zIndex: t.zIndex || 4
                    }).css(t.style).add())
                }), r.layOutTitles(n)
            },
            layOutTitles: function(e) {
                var i = 0,
                    n = this.title,
                    s = this.subtitle,
                    o = this.options,
                    r = o.title,
                    o = o.subtitle,
                    a = this.renderer,
                    l = this.spacingBox.width - 44;
                !n || (n.css({
                    width: (r.width || l) + "px"
                }).align(t({
                    y: a.fontMetrics(r.style.fontSize, n).b - 3
                }, r), !1, "spacingBox"), r.floating || r.verticalAlign) || (i = n.getBBox().height), s && (s.css({
                    width: (o.width || l) + "px"
                }).align(t({
                    y: i + (r.margin - 13) + a.fontMetrics(r.style.fontSize, s).b
                }, o), !1, "spacingBox"), !o.floating && !o.verticalAlign && (i = de(i + s.getBBox().height))), n = this.titleOffset !== i, this.titleOffset = i, !this.isDirtyBox && n && (this.isDirtyBox = n, this.hasRendered && u(e, !0) && this.isDirtyBox && this.redraw())
            },
            getChartSize: function() {
                var t = this.options.chart,
                    e = t.width,
                    t = t.height,
                    i = this.renderToClone || this.renderTo;
                c(e) || (this.containerWidth = Ye(i, "width")), c(t) || (this.containerHeight = Ye(i, "height")), this.chartWidth = pe(0, e || this.containerWidth || 600), this.chartHeight = pe(0, u(t, this.containerHeight > 19 ? this.containerHeight : 400))
            },
            cloneRenderTo: function(t) {
                var e = this.renderToClone,
                    i = this.container;
                t ? e && (this.renderTo.appendChild(i), M(e), delete this.renderToClone) : (i && i.parentNode === this.renderTo && this.renderTo.removeChild(i), this.renderToClone = e = this.renderTo.cloneNode(0), g(e, {
                    position: "absolute",
                    top: "-9999px",
                    display: "block"
                }), e.style.setProperty && e.style.setProperty("display", "block", "important"), re.body.appendChild(e), i && e.appendChild(i))
            },
            getContainer: function() {
                var e, s, o, r, a = this.options.chart;
                this.renderTo = e = a.renderTo, r = "highcharts-" + De++, n(e) && (this.renderTo = e = re.getElementById(e)), e || V(13, !0), s = i(d(e, "data-highcharts-chart")), !isNaN(s) && Oe[s] && Oe[s].hasRendered && Oe[s].destroy(), d(e, "data-highcharts-chart", this.index), e.innerHTML = "", !a.skipClone && !e.offsetWidth && this.cloneRenderTo(), this.getChartSize(), s = this.chartWidth, o = this.chartHeight, this.container = e = f(He, {
                    className: "highcharts-container" + (a.className ? " " + a.className : ""),
                    id: r
                }, t({
                    position: "relative",
                    overflow: "hidden",
                    width: s + "px",
                    height: o + "px",
                    textAlign: "left",
                    lineHeight: "normal",
                    zIndex: 0,
                    "-webkit-tap-highlight-color": "rgba(0,0,0,0)"
                }, a.style), this.renderToClone || e), this._cursor = e.style.cursor, this.renderer = a.forExport ? new ri(e, s, o, a.style, !0) : new R(e, s, o, a.style), Le && this.renderer.create(this, e, s, o)
            },
            getMargins: function() {
                var t, e = this.spacing,
                    i = this.legend,
                    n = this.margin,
                    s = this.options.legend,
                    o = u(s.margin, 20),
                    r = s.x,
                    a = s.y,
                    l = s.align,
                    h = s.verticalAlign,
                    d = this.titleOffset;
                this.resetMargins(), t = this.axisOffset, d && !c(n[0]) && (this.plotTop = pe(this.plotTop, d + this.options.title.margin + e[0])), i.display && !s.floating && ("right" === l ? c(n[1]) || (this.marginRight = pe(this.marginRight, i.legendWidth - r + o + e[1])) : "left" === l ? c(n[3]) || (this.plotLeft = pe(this.plotLeft, i.legendWidth + r + o + e[3])) : "top" === h ? c(n[0]) || (this.plotTop = pe(this.plotTop, i.legendHeight + a + o + e[0])) : "bottom" !== h || c(n[2]) || (this.marginBottom = pe(this.marginBottom, i.legendHeight - a + o + e[2]))), this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin), this.extraTopMargin && (this.plotTop += this.extraTopMargin), this.hasCartesianSeries && Ve(this.axes, function(t) {
                    t.getOffset()
                }), c(n[3]) || (this.plotLeft += t[3]), c(n[0]) || (this.plotTop += t[0]), c(n[2]) || (this.marginBottom += t[2]), c(n[1]) || (this.marginRight += t[1]), this.setChartSize()
            },
            reflow: function(t) {
                var e = this,
                    i = e.options.chart,
                    n = e.renderTo,
                    s = i.width || Ye(n, "width"),
                    o = i.height || Ye(n, "height"),
                    i = t ? t.target : ae,
                    n = function() {
                        e.container && (e.setSize(s, o, !1), e.hasUserSize = null)
                    };
                e.hasUserSize || !s || !o || i !== ae && i !== re || ((s !== e.containerWidth || o !== e.containerHeight) && (clearTimeout(e.reflowTimeout), t ? e.reflowTimeout = setTimeout(n, 100) : n()), e.containerWidth = s, e.containerHeight = o)
            },
            initReflow: function() {
                var t = this,
                    e = function(e) {
                        t.reflow(e)
                    };
                Ze(ae, "resize", e), Ze(t, "destroy", function() {
                    Ke(ae, "resize", e)
                })
            },
            setSize: function(t, e, i) {
                var n, s, o, r = this;
                r.isResizing += 1, o = function() {
                    r && qe(r, "endResize", null, function() {
                        r.isResizing -= 1
                    })
                }, L(i, r), r.oldChartHeight = r.chartHeight, r.oldChartWidth = r.chartWidth, c(t) && (r.chartWidth = n = pe(0, he(t)), r.hasUserSize = !!n), c(e) && (r.chartHeight = s = pe(0, he(e))), (Y ? Qe : g)(r.container, {
                    width: n + "px",
                    height: s + "px"
                }, Y), r.setChartSize(!0), r.renderer.setSize(n, s, i), r.maxTicks = null, Ve(r.axes, function(t) {
                    t.isDirty = !0, t.setScale()
                }), Ve(r.series, function(t) {
                    t.isDirty = !0
                }), r.isDirtyLegend = !0, r.isDirtyBox = !0, r.layOutTitles(), r.getMargins(), r.redraw(i), r.oldChartHeight = null, qe(r, "resize"), Y === !1 ? o() : setTimeout(o, Y && Y.duration || 500)
            },
            setChartSize: function(t) {
                var e, i, n, s, o = this.inverted,
                    r = this.renderer,
                    a = this.chartWidth,
                    l = this.chartHeight,
                    h = this.options.chart,
                    c = this.spacing,
                    d = this.clipOffset;
                this.plotLeft = e = he(this.plotLeft), this.plotTop = i = he(this.plotTop), this.plotWidth = n = pe(0, he(a - e - this.marginRight)), this.plotHeight = s = pe(0, he(l - i - this.marginBottom)), this.plotSizeX = o ? s : n, this.plotSizeY = o ? n : s, this.plotBorderWidth = h.plotBorderWidth || 0, this.spacingBox = r.spacingBox = {
                    x: c[3],
                    y: c[0],
                    width: a - c[3] - c[1],
                    height: l - c[0] - c[2]
                }, this.plotBox = r.plotBox = {
                    x: e,
                    y: i,
                    width: n,
                    height: s
                }, a = 2 * ce(this.plotBorderWidth / 2), o = de(pe(a, d[3]) / 2), r = de(pe(a, d[0]) / 2), this.clipBox = {
                    x: o,
                    y: r,
                    width: ce(this.plotSizeX - pe(a, d[1]) / 2 - o),
                    height: pe(0, ce(this.plotSizeY - pe(a, d[2]) / 2 - r))
                }, t || Ve(this.axes, function(t) {
                    t.setAxisSize(), t.setAxisTranslation()
                })
            },
            resetMargins: function() {
                var t = this.spacing,
                    e = this.margin;
                this.plotTop = u(e[0], t[0]), this.marginRight = u(e[1], t[1]), this.marginBottom = u(e[2], t[2]), this.plotLeft = u(e[3], t[3]), this.axisOffset = [0, 0, 0, 0], this.clipOffset = [0, 0, 0, 0]
            },
            drawChartBox: function() {
                var t, e = this.options.chart,
                    i = this.renderer,
                    n = this.chartWidth,
                    s = this.chartHeight,
                    o = this.chartBackground,
                    r = this.plotBackground,
                    a = this.plotBorder,
                    l = this.plotBGImage,
                    h = e.borderWidth || 0,
                    c = e.backgroundColor,
                    d = e.plotBackgroundColor,
                    p = e.plotBackgroundImage,
                    u = e.plotBorderWidth || 0,
                    g = this.plotLeft,
                    f = this.plotTop,
                    m = this.plotWidth,
                    x = this.plotHeight,
                    y = this.plotBox,
                    v = this.clipRect,
                    b = this.clipBox;
                t = h + (e.shadow ? 8 : 0), (h || c) && (o ? o.animate(o.crisp({
                    width: n - t,
                    height: s - t
                })) : (o = {
                    fill: c || _e
                }, h && (o.stroke = e.borderColor, o["stroke-width"] = h), this.chartBackground = i.rect(t / 2, t / 2, n - t, s - t, e.borderRadius, h).attr(o).addClass("highcharts-background").add().shadow(e.shadow))), d && (r ? r.animate(y) : this.plotBackground = i.rect(g, f, m, x, 0).attr({
                    fill: d
                }).add().shadow(e.plotShadow)), p && (l ? l.animate(y) : this.plotBGImage = i.image(p, g, f, m, x).add()), v ? v.animate({
                    width: b.width,
                    height: b.height
                }) : this.clipRect = i.clipRect(b), u && (a ? a.animate(a.crisp({
                    x: g,
                    y: f,
                    width: m,
                    height: x
                })) : this.plotBorder = i.rect(g, f, m, x, 0, -u).attr({
                    stroke: e.plotBorderColor,
                    "stroke-width": u,
                    fill: _e,
                    zIndex: 1
                }).add()), this.isDirtyBox = !1
            },
            propFromSeries: function() {
                var t, e, i, n = this,
                    s = n.options.chart,
                    o = n.options.series;
                Ve(["inverted", "angular", "polar"], function(r) {
                    for (t = We[s.type || s.defaultSeriesType], i = n[r] || s[r] || t && t.prototype[r], e = o && o.length; !i && e--;)(t = We[o[e].type]) && t.prototype[r] && (i = !0);
                    n[r] = i
                })
            },
            linkSeries: function() {
                var t = this,
                    e = t.series;
                Ve(e, function(t) {
                    t.linkedSeries.length = 0
                }), Ve(e, function(e) {
                    var i = e.options.linkedTo;
                    n(i) && (i = ":previous" === i ? t.series[e.index - 1] : t.get(i)) && (i.linkedSeries.push(e), e.linkedParent = i)
                })
            },
            renderSeries: function() {
                Ve(this.series, function(t) {
                    t.translate(), t.setTooltipPoints && t.setTooltipPoints(), t.render()
                })
            },
            renderLabels: function() {
                var e = this,
                    n = e.options.labels;
                n.items && Ve(n.items, function(s) {
                    var o = t(n.style, s.style),
                        r = i(o.left) + e.plotLeft,
                        a = i(o.top) + e.plotTop + 12;
                    delete o.left, delete o.top, e.renderer.text(s.html, r, a).attr({
                        zIndex: 2
                    }).css(o).add()
                })
            },
            render: function() {
                var t = this.axes,
                    e = this.renderer,
                    i = this.options;
                this.setTitle(), this.legend = new xi(this, i.legend), this.getStacks(), Ve(t, function(t) {
                    t.setScale()
                }), this.getMargins(), this.maxTicks = null, Ve(t, function(t) {
                    t.setTickPositions(!0), t.setMaxTicks()
                }), this.adjustTickAmounts(), this.getMargins(), this.drawChartBox(), this.hasCartesianSeries && Ve(t, function(t) {
                    t.render()
                }), this.seriesGroup || (this.seriesGroup = e.g("series-group").attr({
                    zIndex: 3
                }).add()), this.renderSeries(), this.renderLabels(), this.showCredits(i.credits), this.hasRendered = !0
            },
            showCredits: function(t) {
                t.enabled && !this.credits && (this.credits = this.renderer.text(t.text, 0, 0).on("click", function() {
                    t.href && (location.href = t.href)
                }).attr({
                    align: t.position.align,
                    zIndex: 8
                }).css(t.style).add().align(t.position))
            },
            destroy: function() {
                var t, e = this,
                    i = e.axes,
                    n = e.series,
                    s = e.container,
                    o = s && s.parentNode;
                for (qe(e, "destroy"), Oe[e.index] = _, ze--, e.renderTo.removeAttribute("data-highcharts-chart"), Ke(e), t = i.length; t--;) i[t] = i[t].destroy();
                for (t = n.length; t--;) n[t] = n[t].destroy();
                Ve("title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer".split(","), function(t) {
                    var i = e[t];
                    i && i.destroy && (e[t] = i.destroy())
                }), s && (s.innerHTML = "", Ke(s), o && M(s));
                for (t in e) delete e[t]
            },
            isReadyToRender: function() {
                var t = this;
                return !Me && ae == ae.top && "complete" !== re.readyState || Le && !ae.canvg ? (Le ? hi.push(function() {
                    t.firstRender()
                }, t.options.global.canvasToolsURL) : re.attachEvent("onreadystatechange", function() {
                    re.detachEvent("onreadystatechange", t.firstRender), "complete" === re.readyState && t.firstRender()
                }), !1) : !0
            },
            firstRender: function() {
                var t = this,
                    e = t.options,
                    i = t.callback;
                t.isReadyToRender() && (t.getContainer(), qe(t, "init"), t.resetMargins(), t.setChartSize(), t.propFromSeries(), t.getAxes(), Ve(e.series || [], function(e) {
                    t.initSeries(e)
                }), t.linkSeries(), qe(t, "beforeRender"), oe.Pointer && (t.pointer = new pi(t, e)), t.render(), t.renderer.draw(), i && i.apply(t, [t]), Ve(t.callbacks, function(e) {
                    e.apply(t, [t])
                }), t.cloneRenderTo(!0), qe(t, "load"))
            },
            splashArray: function(t, e) {
                var i = e[t],
                    i = s(i) ? i : [i, i, i, i];
                return [u(e[t + "Top"], i[0]), u(e[t + "Right"], i[1]), u(e[t + "Bottom"], i[2]), u(e[t + "Left"], i[3])]
            }
        }, z.prototype.callbacks = [], ai = oe.CenteredSeriesMixin = {
            getCenter: function() {
                var t, e, n = this.options,
                    s = this.chart,
                    o = 2 * (n.slicedOffset || 0),
                    r = s.plotWidth - 2 * o,
                    a = s.plotHeight - 2 * o,
                    s = n.center,
                    n = [u(s[0], "50%"), u(s[1], "50%"), n.size || "100%", n.innerSize || 0],
                    l = ue(r, a);
                return Ue(n, function(n, s) {
                    return e = /%$/.test(n), t = 2 > s || 2 === s && e, (e ? [r, a, l, l][s] * i(n) / 100 : n) + (t ? o : 0)
                })
            }
        };
        var yi = function() {};
        yi.prototype = {
            init: function(t, e, i) {
                return this.series = t, this.applyOptions(e, i), this.pointAttr = {}, t.options.colorByPoint && (e = t.options.colors || t.chart.options.colors, this.color = this.color || e[t.colorCounter++], t.colorCounter === e.length) && (t.colorCounter = 0), t.chart.pointCount++, this
            },
            applyOptions: function(e, i) {
                var n = this.series,
                    s = n.options.pointValKey || n.pointValKey,
                    e = yi.prototype.optionsToObject.call(this, e);
                return t(this, e), this.options = this.options ? t(this.options, e) : e, s && (this.y = this[s]), this.x === _ && n && (this.x = i === _ ? n.autoIncrement() : i), this
            },
            optionsToObject: function(t) {
                var e = {},
                    i = this.series,
                    n = i.pointArrayMap || ["y"],
                    s = n.length,
                    r = 0,
                    a = 0;
                if ("number" == typeof t || null === t) e[n[0]] = t;
                else if (o(t))
                    for (t.length > s && (i = typeof t[0], "string" === i ? e.name = t[0] : "number" === i && (e.x = t[0]), r++); s > a;) e[n[a++]] = t[r++];
                else "object" == typeof t && (e = t, t.dataLabels && (i._hasPointLabels = !0), t.marker && (i._hasPointMarkers = !0));
                return e
            },
            destroy: function() {
                var t, e = this.series.chart,
                    i = e.hoverPoints;
                e.pointCount--, i && (this.setState(), h(i, this), !i.length) && (e.hoverPoints = null), this === e.hoverPoint && this.onMouseOut(), (this.graphic || this.dataLabel) && (Ke(this), this.destroyElements()), this.legendItem && e.legend.destroyItem(this);
                for (t in this) this[t] = null
            },
            destroyElements: function() {
                for (var t, e = "graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup".split(","), i = 6; i--;) t = e[i], this[t] && (this[t] = this[t].destroy())
            },
            getLabelConfig: function() {
                return {
                    x: this.category,
                    y: this.y,
                    key: this.name || this.category,
                    series: this.series,
                    point: this,
                    percentage: this.percentage,
                    total: this.total || this.stackTotal
                }
            },
            tooltipFormatter: function(t) {
                var e = this.series,
                    i = e.tooltipOptions,
                    n = u(i.valueDecimals, ""),
                    s = i.valuePrefix || "",
                    o = i.valueSuffix || "";
                return Ve(e.pointArrayMap || ["y"], function(e) {
                    e = "{point." + e, (s || o) && (t = t.replace(e + "}", s + e + "}" + o)), t = t.replace(e + "}", e + ":,." + n + "f}")
                }), b(t, {
                    point: this,
                    series: this.series
                })
            },
            firePointEvent: function(t, e, i) {
                var n = this,
                    s = this.series.options;
                (s.point.events[t] || n.options && n.options.events && n.options.events[t]) && this.importEvents(), "click" === t && s.allowPointSelect && (i = function(t) {
                    n.select(null, t.ctrlKey || t.metaKey || t.shiftKey)
                }), qe(this, t, e, i)
            }
        };
        var vi = function() {};
        vi.prototype = {
            isCartesian: !0,
            type: "line",
            pointClass: yi,
            sorted: !0,
            requireSorting: !0,
            pointAttrToOptions: {
                stroke: "lineColor",
                "stroke-width": "lineWidth",
                fill: "fillColor",
                r: "radius"
            },
            axisTypes: ["xAxis", "yAxis"],
            colorCounter: 0,
            parallelArrays: ["x", "y"],
            init: function(e, i) {
                var n, s, o = this,
                    r = e.series,
                    a = function(t, e) {
                        return u(t.options.index, t._i) - u(e.options.index, e._i)
                    };
                o.chart = e, o.options = i = o.setOptions(i), o.linkedSeries = [], o.bindAxes(), t(o, {
                    name: i.name,
                    state: "",
                    pointAttr: {},
                    visible: i.visible !== !1,
                    selected: i.selected === !0
                }), Le && (i.animation = !1), s = i.events;
                for (n in s) Ze(o, n, s[n]);
                (s && s.click || i.point && i.point.events && i.point.events.click || i.allowPointSelect) && (e.runTrackerClick = !0), o.getColor(), o.getSymbol(), Ve(o.parallelArrays, function(t) {
                    o[t + "Data"] = []
                }), o.setData(i.data, !1), o.isCartesian && (e.hasCartesianSeries = !0), r.push(o), o._i = r.length - 1, S(r, a), this.yAxis && S(this.yAxis.series, a), Ve(r, function(t, e) {
                    t.index = e, t.name = t.name || "Series " + (e + 1)
                })
            },
            bindAxes: function() {
                var t, e = this,
                    i = e.options,
                    n = e.chart;
                Ve(e.axisTypes || [], function(s) {
                    Ve(n[s], function(n) {
                        t = n.options, (i[s] === t.index || i[s] !== _ && i[s] === t.id || i[s] === _ && 0 === t.index) && (n.series.push(e), e[s] = n, n.isDirty = !0)
                    }), !e[s] && e.optionalAxis !== s && V(18, !0)
                })
            },
            updateParallelArrays: function(t, e) {
                var i = t.series,
                    n = arguments;
                Ve(i.parallelArrays, "number" == typeof e ? function(n) {
                    var s = "y" === n && i.toYData ? i.toYData(t) : t[n];
                    i[n + "Data"][e] = s
                } : function(t) {
                    Array.prototype[e].apply(i[t + "Data"], Array.prototype.slice.call(n, 2))
                })
            },
            autoIncrement: function() {
                var t = this.options,
                    e = this.xIncrement,
                    e = u(e, t.pointStart, 0);
                return this.pointInterval = u(this.pointInterval, t.pointInterval, 1), this.xIncrement = e + this.pointInterval, e
            },
            getSegments: function() {
                var t, e = -1,
                    i = [],
                    n = this.points,
                    s = n.length;
                if (s)
                    if (this.options.connectNulls) {
                        for (t = s; t--;) null === n[t].y && n.splice(t, 1);
                        n.length && (i = [n])
                    } else Ve(n, function(t, o) {
                        null === t.y ? (o > e + 1 && i.push(n.slice(e + 1, o)), e = o) : o === s - 1 && i.push(n.slice(e + 1, o + 1))
                    });
                this.segments = i
            },
            setOptions: function(t) {
                var i = this.chart,
                    n = i.options.plotOptions,
                    i = i.userOptions || {},
                    s = i.plotOptions || {},
                    o = n[this.type];
                return this.userOptions = t, n = e(o, n.series, t), this.tooltipOptions = e(X.tooltip, X.plotOptions[this.type].tooltip, i.tooltip, s.series && s.series.tooltip, s[this.type] && s[this.type].tooltip, t.tooltip), null === o.marker && delete n.marker, n
            },
            getCyclic: function(t, e, i) {
                var n = this.userOptions,
                    s = "_" + t + "Index",
                    o = t + "Counter";
                e || (c(n[s]) ? e = n[s] : (n[s] = e = this.chart[o] % i.length, this.chart[o] += 1), e = i[e]), this[t] = e
            },
            getColor: function() {
                this.options.colorByPoint || this.getCyclic("color", this.options.color || ei[this.type].color, this.chart.options.colors)
            },
            getSymbol: function() {
                var t = this.options.marker;
                this.getCyclic("symbol", t.symbol, this.chart.options.symbols), /^url/.test(this.symbol) && (t.radius = 0)
            },
            drawLegendSymbol: Ge.drawLineMarker,
            setData: function(t, e, i, s) {
                var a, l = this,
                    h = l.points,
                    c = h && h.length || 0,
                    d = l.options,
                    p = l.chart,
                    g = null,
                    f = l.xAxis,
                    m = f && !!f.categories,
                    x = l.tooltipPoints,
                    y = d.turboThreshold,
                    v = this.xData,
                    b = this.yData,
                    k = (a = l.pointArrayMap) && a.length,
                    t = t || [];
                if (a = t.length, e = u(e, !0), s === !1 || !a || c !== a || l.cropped || l.hasGroupedData) {
                    if (l.xIncrement = null, l.pointRange = m ? 1 : d.pointRange, l.colorCounter = 0, Ve(this.parallelArrays, function(t) {
                            l[t + "Data"].length = 0
                        }), y && a > y) {
                        for (i = 0; null === g && a > i;) g = t[i], i++;
                        if (r(g)) {
                            for (m = u(d.pointStart, 0), d = u(d.pointInterval, 1), i = 0; a > i; i++) v[i] = m, b[i] = t[i], m += d;
                            l.xIncrement = m
                        } else if (o(g))
                            if (k)
                                for (i = 0; a > i; i++) d = t[i], v[i] = d[0], b[i] = d.slice(1, k + 1);
                            else
                                for (i = 0; a > i; i++) d = t[i], v[i] = d[0], b[i] = d[1];
                        else V(12)
                    } else
                        for (i = 0; a > i; i++) t[i] !== _ && (d = {
                            series: l
                        }, l.pointClass.prototype.applyOptions.apply(d, [t[i]]), l.updateParallelArrays(d, i), m && d.name) && (f.names[d.x] = d.name);
                    for (n(b[0]) && V(14, !0), l.data = [], l.options.data = t, i = c; i--;) h[i] && h[i].destroy && h[i].destroy();
                    x && (x.length = 0), f && (f.minRange = f.userMinRange), l.isDirty = l.isDirtyData = p.isDirtyBox = !0, i = !1
                } else Ve(t, function(t, e) {
                    h[e].update(t, !1)
                });
                e && p.redraw(i)
            },
            processData: function(t) {
                var e, i = this.xData,
                    n = this.yData,
                    s = i.length;
                e = 0;
                var o, r, a, l, h = this.xAxis,
                    c = this.options,
                    d = c.cropThreshold,
                    p = 0,
                    u = this.isCartesian;
                if (u && !this.isDirty && !h.isDirty && !this.yAxis.isDirty && !t) return !1;
                for (u && this.sorted && (!d || s > d || this.forceCrop) && (a = h.getExtremes(), l = a.min, a = a.max, i[s - 1] < l || i[0] > a ? (i = [], n = []) : (i[0] < l || i[s - 1] > a) && (e = this.cropData(this.xData, this.yData, l, a), i = e.xData, n = e.yData, e = e.start, o = !0, p = i.length)), t = i.length - 1; t >= 0; t--) s = i[t] - i[t - 1], !o && i[t] > l && i[t] < a && p++, s > 0 && (r === _ || r > s) ? r = s : 0 > s && this.requireSorting && V(15);
                this.cropped = o, this.cropStart = e, this.processedXData = i, this.processedYData = n, this.activePointCount = p, null === c.pointRange && (this.pointRange = r || 1), this.closestPointRange = r
            },
            cropData: function(t, e, i, n) {
                var s, o = t.length,
                    r = 0,
                    a = o,
                    l = u(this.cropShoulder, 1);
                for (s = 0; o > s; s++)
                    if (t[s] >= i) {
                        r = pe(0, s - l);
                        break
                    }
                for (; o > s; s++)
                    if (t[s] > n) {
                        a = s + l;
                        break
                    }
                return {
                    xData: t.slice(r, a),
                    yData: e.slice(r, a),
                    start: r,
                    end: a
                }
            },
            generatePoints: function() {
                var t, e, i, n, s = this.options.data,
                    o = this.data,
                    r = this.processedXData,
                    a = this.processedYData,
                    l = this.pointClass,
                    h = r.length,
                    c = this.cropStart || 0,
                    d = this.hasGroupedData,
                    u = [];
                for (o || d || (o = [], o.length = s.length, o = this.data = o), n = 0; h > n; n++) e = c + n, d ? u[n] = (new l).init(this, [r[n]].concat(p(a[n]))) : (o[e] ? i = o[e] : s[e] !== _ && (o[e] = i = (new l).init(this, s[e], r[n])), u[n] = i);
                if (o && (h !== (t = o.length) || d))
                    for (n = 0; t > n; n++) n === c && !d && (n += h), o[n] && (o[n].destroyElements(), o[n].plotX = _);
                this.data = o, this.points = u
            },
            getExtremes: function(t) {
                var e, i = this.yAxis,
                    n = this.processedXData,
                    s = [],
                    o = 0;
                e = this.xAxis.getExtremes();
                var r, a, l, h, c = e.min,
                    d = e.max,
                    t = t || this.stackedYData || this.processedYData;
                for (e = t.length, h = 0; e > h; h++)
                    if (a = n[h], l = t[h], r = null !== l && l !== _ && (!i.isLog || l.length || l > 0), a = this.getExtremesFromAll || this.cropped || (n[h + 1] || a) >= c && (n[h - 1] || a) <= d, r && a)
                        if (r = l.length)
                            for (; r--;) null !== l[r] && (s[o++] = l[r]);
                        else s[o++] = l;
                this.dataMin = u(void 0, C(s)), this.dataMax = u(void 0, A(s))
            },
            translate: function() {
                this.processedXData || this.processData(), this.generatePoints();
                for (var t = this.options, e = t.stacking, i = this.xAxis, n = i.categories, s = this.yAxis, o = this.points, a = o.length, l = !!this.modifyValue, h = t.pointPlacement, d = "between" === h || r(h), p = t.threshold, t = 0; a > t; t++) {
                    var g = o[t],
                        f = g.x,
                        m = g.y,
                        x = g.low,
                        y = e && s.stacks[(this.negStacks && p > m ? "-" : "") + this.stackKey];
                    s.isLog && 0 >= m && (g.y = m = null), g.plotX = i.translate(f, 0, 0, 0, 1, h, "flags" === this.type), e && this.visible && y && y[f] && (y = y[f], m = y.points[this.index + "," + t], x = m[0], m = m[1], 0 === x && (x = u(p, s.min)), s.isLog && 0 >= x && (x = null), g.total = g.stackTotal = y.total, g.percentage = y.total && g.y / y.total * 100, g.stackY = m, y.setOffset(this.pointXOffset || 0, this.barW || 0)), g.yBottom = c(x) ? s.translate(x, 0, 1, 0, 1) : null, l && (m = this.modifyValue(m, g)), g.plotY = "number" == typeof m && 1 / 0 !== m ? s.translate(m, 0, 1, 0, 1) : _, g.clientX = d ? i.translate(f, 0, 0, 0, 1) : g.plotX, g.negative = g.y < (p || 0), g.category = n && n[g.x] !== _ ? n[g.x] : g.x
                }
                this.getSegments()
            },
            animate: function(e) {
                var i, n = this.chart,
                    o = n.renderer;
                i = this.options.animation;
                var r, a = this.clipBox || n.clipBox,
                    l = n.inverted;
                i && !s(i) && (i = ei[this.type].animation), r = ["_sharedClip", i.duration, i.easing, a.height].join(","), e ? (e = n[r], i = n[r + "m"], e || (n[r] = e = o.clipRect(t(a, {
                    width: 0
                })), n[r + "m"] = i = o.clipRect(-99, l ? -n.plotLeft : -n.plotTop, 99, l ? n.chartWidth : n.chartHeight)), this.group.clip(e), this.markerGroup.clip(i), this.sharedClipKey = r) : ((e = n[r]) && e.animate({
                    width: n.plotSizeX
                }, i), n[r + "m"] && n[r + "m"].animate({
                    width: n.plotSizeX + 99
                }, i), this.animate = null)
            },
            afterAnimate: function() {
                var t = this.chart,
                    e = this.sharedClipKey,
                    i = this.group,
                    n = this.clipBox;
                i && this.options.clip !== !1 && (e && n || i.clip(n ? t.renderer.clipRect(n) : t.clipRect), this.markerGroup.clip()), qe(this, "afterAnimate"), setTimeout(function() {
                    e && t[e] && (n || (t[e] = t[e].destroy()), t[e + "m"] && (t[e + "m"] = t[e + "m"].destroy()))
                }, 100)
            },
            drawPoints: function() {
                var e, i, n, s, o, r, a, l, h, c = this.points,
                    d = this.chart;
                i = this.options.marker;
                var p, g = this.pointAttr[""],
                    f = this.markerGroup,
                    m = u(i.enabled, this.activePointCount < .5 * this.xAxis.len / i.radius);
                if (i.enabled !== !1 || this._hasPointMarkers)
                    for (s = c.length; s--;) o = c[s], i = ce(o.plotX), n = o.plotY, h = o.graphic, a = o.marker || {}, e = m && a.enabled === _ || a.enabled, p = d.isInsidePlot(he(i), n, d.inverted), e && n !== _ && !isNaN(n) && null !== o.y ? (e = o.pointAttr[o.selected ? "select" : ""] || g, r = e.r, a = u(a.symbol, this.symbol), l = 0 === a.indexOf("url"), h ? h[p ? "show" : "hide"](!0).animate(t({
                        x: i - r,
                        y: n - r
                    }, h.symbolName ? {
                        width: 2 * r,
                        height: 2 * r
                    } : {})) : p && (r > 0 || l) && (o.graphic = d.renderer.symbol(a, i - r, n - r, 2 * r, 2 * r).attr(e).add(f))) : h && (o.graphic = h.destroy())
            },
            convertAttribs: function(t, e, i, n) {
                var s, o, r = this.pointAttrToOptions,
                    a = {},
                    t = t || {},
                    e = e || {},
                    i = i || {},
                    n = n || {};
                for (s in r) o = r[s], a[s] = u(t[o], e[s], i[s], n[s]);
                return a
            },
            getAttribs: function() {
                var e, i = this,
                    n = i.options,
                    s = ei[i.type].marker ? n.marker : n,
                    o = s.states,
                    r = o.hover,
                    a = i.color;
                e = {
                    stroke: a,
                    fill: a
                };
                var l, h, d = i.points || [],
                    p = [],
                    u = i.pointAttrToOptions;
                h = i.hasPointSpecificOptions;
                var g = n.negativeColor,
                    f = s.lineColor,
                    m = s.fillColor;
                l = n.turboThreshold;
                var x;
                if (n.marker ? (r.radius = r.radius || s.radius + r.radiusPlus, r.lineWidth = r.lineWidth || s.lineWidth + r.lineWidthPlus) : r.color = r.color || oi(r.color || a).brighten(r.brightness).get(), p[""] = i.convertAttribs(s, e), Ve(["hover", "select"], function(t) {
                        p[t] = i.convertAttribs(o[t], p[""])
                    }), i.pointAttr = p, a = d.length, !l || l > a || h)
                    for (; a--;) {
                        if (l = d[a], (s = l.options && l.options.marker || l.options) && s.enabled === !1 && (s.radius = 0), l.negative && g && (l.color = l.fillColor = g), h = n.colorByPoint || l.color, l.options)
                            for (x in u) c(s[u[x]]) && (h = !0);
                        h ? (s = s || {}, h = [], o = s.states || {}, e = o.hover = o.hover || {}, n.marker || (e.color = e.color || !l.options.color && r.color || oi(l.color).brighten(e.brightness || r.brightness).get()), e = {
                            color: l.color
                        }, m || (e.fillColor = l.color), f || (e.lineColor = l.color), h[""] = i.convertAttribs(t(e, s), p[""]), h.hover = i.convertAttribs(o.hover, p.hover, h[""]), h.select = i.convertAttribs(o.select, p.select, h[""])) : h = p, l.pointAttr = h
                    }
            },
            destroy: function() {
                var t, e, i, n, s, o = this,
                    r = o.chart,
                    a = /AppleWebKit\/533/.test(ve),
                    l = o.data || [];
                for (qe(o, "destroy"), Ke(o), Ve(o.axisTypes || [], function(t) {
                        (s = o[t]) && (h(s.series, o), s.isDirty = s.forceRedraw = !0)
                    }), o.legendItem && o.chart.legend.destroyItem(o), e = l.length; e--;)(i = l[e]) && i.destroy && i.destroy();
                o.points = null, clearTimeout(o.animationTimeout), Ve("area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip".split(","), function(e) {
                    o[e] && (t = a && "group" === e ? "hide" : "destroy", o[e][t]())
                }), r.hoverSeries === o && (r.hoverSeries = null), h(r.series, o);
                for (n in o) delete o[n]
            },
            getSegmentPath: function(t) {
                var e = this,
                    i = [],
                    n = e.options.step;
                return Ve(t, function(s, o) {
                    var r, a = s.plotX,
                        l = s.plotY;
                    e.getPointSpline ? i.push.apply(i, e.getPointSpline(t, s, o)) : (i.push(o ? "L" : "M"), n && o && (r = t[o - 1], "right" === n ? i.push(r.plotX, l) : "center" === n ? i.push((r.plotX + a) / 2, r.plotY, (r.plotX + a) / 2, l) : i.push(a, r.plotY)), i.push(s.plotX, s.plotY))
                }), i
            },
            getGraphPath: function() {
                var t, e = this,
                    i = [],
                    n = [];
                return Ve(e.segments, function(s) {
                    t = e.getSegmentPath(s), s.length > 1 ? i = i.concat(t) : n.push(s[0])
                }), e.singlePoints = n, e.graphPath = i
            },
            drawGraph: function() {
                var t = this,
                    e = this.options,
                    i = [
                        ["graph", e.lineColor || this.color]
                    ],
                    n = e.lineWidth,
                    s = e.dashStyle,
                    o = "square" !== e.linecap,
                    r = this.getGraphPath(),
                    a = e.negativeColor;
                a && i.push(["graphNeg", a]), Ve(i, function(i, a) {
                    var l = i[0],
                        h = t[l];
                    h ? (ti(h), h.animate({
                        d: r
                    })) : n && r.length && (h = {
                        stroke: i[1],
                        "stroke-width": n,
                        fill: _e,
                        zIndex: 1
                    }, s ? h.dashstyle = s : o && (h["stroke-linecap"] = h["stroke-linejoin"] = "round"), t[l] = t.chart.renderer.path(r).attr(h).add(t.group).shadow(!a && e.shadow))
                })
            },
            clipNeg: function() {
                var t, e = this.options,
                    i = this.chart,
                    n = i.renderer,
                    s = e.negativeColor || e.negativeFillColor,
                    o = this.graph,
                    r = this.area,
                    a = this.posClip,
                    l = this.negClip;
                t = i.chartWidth;
                var h = i.chartHeight,
                    c = pe(t, h),
                    d = this.yAxis;
                s && (o || r) && (s = he(d.toPixels(e.threshold || 0, !0)), 0 > s && (c -= s), e = {
                    x: 0,
                    y: 0,
                    width: c,
                    height: s
                }, c = {
                    x: 0,
                    y: s,
                    width: c,
                    height: c
                }, i.inverted && (e.height = c.y = i.plotWidth - s, n.isVML && (e = {
                    x: i.plotWidth - s - i.plotLeft,
                    y: 0,
                    width: t,
                    height: h
                }, c = {
                    x: s + i.plotLeft - t,
                    y: 0,
                    width: i.plotLeft + s,
                    height: t
                })), d.reversed ? (i = c, t = e) : (i = e, t = c), a ? (a.animate(i), l.animate(t)) : (this.posClip = a = n.clipRect(i), this.negClip = l = n.clipRect(t), o && this.graphNeg && (o.clip(a), this.graphNeg.clip(l)), r && (r.clip(a), this.areaNeg.clip(l))))
            },
            invertGroups: function() {
                function t() {
                    var t = {
                        width: e.yAxis.len,
                        height: e.xAxis.len
                    };
                    Ve(["group", "markerGroup"], function(i) {
                        e[i] && e[i].attr(t).invert()
                    })
                }
                var e = this,
                    i = e.chart;
                e.xAxis && (Ze(i, "resize", t), Ze(e, "destroy", function() {
                    Ke(i, "resize", t)
                }), t(), e.invertGroups = t)
            },
            plotGroup: function(t, e, i, n, s) {
                var o = this[t],
                    r = !o;
                return r && (this[t] = o = this.chart.renderer.g(e).attr({
                    visibility: i,
                    zIndex: n || .1
                }).add(s)), o[r ? "attr" : "animate"](this.getPlotBox()), o
            },
            getPlotBox: function() {
                var t = this.chart,
                    e = this.xAxis,
                    i = this.yAxis;
                return t.inverted && (e = i, i = this.xAxis), {
                    translateX: e ? e.left : t.plotLeft,
                    translateY: i ? i.top : t.plotTop,
                    scaleX: 1,
                    scaleY: 1
                }
            },
            render: function() {
                var t, e = this,
                    i = e.chart,
                    n = e.options,
                    s = (t = n.animation) && !!e.animate && i.renderer.isSVG && u(t.duration, 500) || 0,
                    o = e.visible ? "visible" : "hidden",
                    r = n.zIndex,
                    a = e.hasRendered,
                    l = i.seriesGroup;
                t = e.plotGroup("group", "series", o, r, l), e.markerGroup = e.plotGroup("markerGroup", "markers", o, r, l), s && e.animate(!0), e.getAttribs(), t.inverted = e.isCartesian ? i.inverted : !1, e.drawGraph && (e.drawGraph(), e.clipNeg()), e.drawDataLabels && e.drawDataLabels(), e.visible && e.drawPoints(), e.drawTracker && e.options.enableMouseTracking !== !1 && e.drawTracker(), i.inverted && e.invertGroups(), n.clip !== !1 && !e.sharedClipKey && !a && t.clip(i.clipRect), s && e.animate(), a || (s ? e.animationTimeout = setTimeout(function() {
                    e.afterAnimate()
                }, s) : e.afterAnimate()), e.isDirty = e.isDirtyData = !1, e.hasRendered = !0
            },
            redraw: function() {
                var t = this.chart,
                    e = this.isDirtyData,
                    i = this.group,
                    n = this.xAxis,
                    s = this.yAxis;
                i && (t.inverted && i.attr({
                    width: t.plotWidth,
                    height: t.plotHeight
                }), i.animate({
                    translateX: u(n && n.left, t.plotLeft),
                    translateY: u(s && s.top, t.plotTop)
                })), this.translate(), this.setTooltipPoints && this.setTooltipPoints(!0), this.render(), e && qe(this, "updatedData")
            }
        }, H.prototype = {
            destroy: function() {
                T(this, this.axis)
            },
            render: function(t) {
                var e = this.options,
                    i = e.format,
                    i = i ? b(i, this) : e.formatter.call(this);
                this.label ? this.label.attr({
                    text: i,
                    visibility: "hidden"
                }) : this.label = this.axis.chart.renderer.text(i, null, null, e.useHTML).css(e.style).attr({
                    align: this.textAlign,
                    rotation: e.rotation,
                    visibility: "hidden"
                }).add(t)
            },
            setOffset: function(t, e) {
                var i = this.axis,
                    n = i.chart,
                    s = n.inverted,
                    o = this.isNegative,
                    r = i.translate(i.usePercentage ? 100 : this.total, 0, 0, 0, 1),
                    i = i.translate(0),
                    i = ge(r - i),
                    a = n.xAxis[0].translate(this.x) + t,
                    l = n.plotHeight,
                    o = {
                        x: s ? o ? r : r - i : a,
                        y: s ? l - a - e : o ? l - r - i : l - r,
                        width: s ? i : e,
                        height: s ? e : i
                    };
                (s = this.label) && (s.align(this.alignOptions, null, o), o = s.alignAttr, s[this.options.crop === !1 || n.isInsidePlot(o.x, o.y) ? "show" : "hide"](!0))
            }
        }, O.prototype.buildStacks = function() {
            var t = this.series,
                e = u(this.options.reversedStacks, !0),
                i = t.length;
            if (!this.isXAxis) {
                for (this.usePercentage = !1; i--;) t[e ? i : t.length - i - 1].setStackedPoints();
                if (this.usePercentage)
                    for (i = 0; i < t.length; i++) t[i].setPercentStacks()
            }
        }, O.prototype.renderStackTotals = function() {
            var t, e, i = this.chart,
                n = i.renderer,
                s = this.stacks,
                o = this.stackTotalGroup;
            o || (this.stackTotalGroup = o = n.g("stack-labels").attr({
                visibility: "visible",
                zIndex: 6
            }).add()), o.translate(i.plotLeft, i.plotTop);
            for (t in s)
                for (e in i = s[t]) i[e].render(o)
        }, vi.prototype.setStackedPoints = function() {
            if (this.options.stacking && (this.visible === !0 || this.chart.options.chart.ignoreHiddenSeries === !1)) {
                var t, e, i, n, s, o, r = this.processedXData,
                    a = this.processedYData,
                    l = [],
                    h = a.length,
                    c = this.options,
                    d = c.threshold,
                    p = c.stack,
                    c = c.stacking,
                    u = this.stackKey,
                    g = "-" + u,
                    f = this.negStacks,
                    m = this.yAxis,
                    x = m.stacks,
                    y = m.oldStacks;
                for (n = 0; h > n; n++) s = r[n], o = a[n], i = this.index + "," + n, e = (t = f && d > o) ? g : u, x[e] || (x[e] = {}), x[e][s] || (y[e] && y[e][s] ? (x[e][s] = y[e][s], x[e][s].total = null) : x[e][s] = new H(m, m.options.stackLabels, t, s, p)), e = x[e][s], e.points[i] = [e.cum || 0], "percent" === c ? (t = t ? u : g, f && x[t] && x[t][s] ? (t = x[t][s], e.total = t.total = pe(t.total, e.total) + ge(o) || 0) : e.total = P(e.total + (ge(o) || 0))) : e.total = P(e.total + (o || 0)), e.cum = (e.cum || 0) + (o || 0), e.points[i].push(e.cum), l[n] = e.cum;
                "percent" === c && (m.usePercentage = !0), this.stackedYData = l, m.oldStacks = {}
            }
        }, vi.prototype.setPercentStacks = function() {
            var t = this,
                e = t.stackKey,
                i = t.yAxis.stacks,
                n = t.processedXData;
            Ve([e, "-" + e], function(e) {
                for (var s, o, r, a = n.length; a--;) o = n[a], s = (r = i[e] && i[e][o]) && r.points[t.index + "," + a], (o = s) && (r = r.total ? 100 / r.total : 0, o[0] = P(o[0] * r), o[1] = P(o[1] * r), t.stackedYData[a] = o[1])
            })
        }, t(z.prototype, {
            addSeries: function(t, e, i) {
                var n, s = this;
                return t && (e = u(e, !0), qe(s, "addSeries", {
                    options: t
                }, function() {
                    n = s.initSeries(t), s.isDirtyLegend = !0, s.linkSeries(), e && s.redraw(i)
                })), n
            },
            addAxis: function(t, i, n, s) {
                var o = i ? "xAxis" : "yAxis",
                    r = this.options;
                new O(this, e(t, {
                    index: this[o].length,
                    isX: i
                })), r[o] = p(r[o] || {}), r[o].push(t), u(n, !0) && this.redraw(s)
            },
            showLoading: function(e) {
                var i = this,
                    n = i.options,
                    s = i.loadingDiv,
                    o = n.loading,
                    r = function() {
                        s && g(s, {
                            left: i.plotLeft + "px",
                            top: i.plotTop + "px",
                            width: i.plotWidth + "px",
                            height: i.plotHeight + "px"
                        })
                    };
                s || (i.loadingDiv = s = f(He, {
                    className: "highcharts-loading"
                }, t(o.style, {
                    zIndex: 10,
                    display: _e
                }), i.container), i.loadingSpan = f("span", null, o.labelStyle, s), Ze(i, "redraw", r)), i.loadingSpan.innerHTML = e || n.lang.loading, i.loadingShown || (g(s, {
                    opacity: 0,
                    display: ""
                }), Qe(s, {
                    opacity: o.style.opacity
                }, {
                    duration: o.showDuration || 0
                }), i.loadingShown = !0), r()
            },
            hideLoading: function() {
                var t = this.options,
                    e = this.loadingDiv;
                e && Qe(e, {
                    opacity: 0
                }, {
                    duration: t.loading.hideDuration || 100,
                    complete: function() {
                        g(e, {
                            display: _e
                        })
                    }
                }), this.loadingShown = !1
            }
        }), t(yi.prototype, {
            update: function(t, e, i) {
                var n, o = this,
                    r = o.series,
                    a = o.graphic,
                    l = r.data,
                    h = r.chart,
                    c = r.options,
                    e = u(e, !0);
                o.firePointEvent("update", {
                    options: t
                }, function() {
                    o.applyOptions(t), s(t) && (r.getAttribs(), a && (t && t.marker && t.marker.symbol ? o.graphic = a.destroy() : a.attr(o.pointAttr[o.state || ""])), t && t.dataLabels && o.dataLabel && (o.dataLabel = o.dataLabel.destroy())), n = Ne(o, l), r.updateParallelArrays(o, n), c.data[n] = o.options, r.isDirty = r.isDirtyData = !0, !r.fixedBox && r.hasCartesianSeries && (h.isDirtyBox = !0), "point" === c.legendType && h.legend.destroyItem(o), e && h.redraw(i)
                })
            },
            remove: function(t, e) {
                var i, n = this,
                    s = n.series,
                    o = s.points,
                    r = s.chart,
                    a = s.data;
                L(e, r), t = u(t, !0), n.firePointEvent("remove", null, function() {
                    i = Ne(n, a), a.length === o.length && o.splice(i, 1), a.splice(i, 1), s.options.data.splice(i, 1), s.updateParallelArrays(n, "splice", i, 1), n.destroy(), s.isDirty = !0, s.isDirtyData = !0, t && r.redraw()
                })
            }
        }), t(vi.prototype, {
            addPoint: function(t, e, i, n) {
                var s, o = this.options,
                    r = this.data,
                    a = this.graph,
                    l = this.area,
                    h = this.chart,
                    c = this.xAxis && this.xAxis.names,
                    d = a && a.shift || 0,
                    p = o.data,
                    g = this.xData;
                if (L(n, h), i && Ve([a, l, this.graphNeg, this.areaNeg], function(t) {
                        t && (t.shift = d + 1)
                    }), l && (l.isArea = !0), e = u(e, !0), n = {
                        series: this
                    }, this.pointClass.prototype.applyOptions.apply(n, [t]), a = n.x, l = g.length, this.requireSorting && a < g[l - 1])
                    for (s = !0; l && g[l - 1] > a;) l--;
                this.updateParallelArrays(n, "splice", l, 0, 0), this.updateParallelArrays(n, l), c && (c[a] = n.name), p.splice(l, 0, t), s && (this.data.splice(l, 0, null), this.processData()), "point" === o.legendType && this.generatePoints(), i && (r[0] && r[0].remove ? r[0].remove(!1) : (r.shift(), this.updateParallelArrays(n, "shift"), p.shift())), this.isDirtyData = this.isDirty = !0, e && (this.getAttribs(), h.redraw())
            },
            remove: function(t, e) {
                var i = this,
                    n = i.chart,
                    t = u(t, !0);
                i.isRemoving || (i.isRemoving = !0, qe(i, "remove", null, function() {
                    i.destroy(), n.isDirtyLegend = n.isDirtyBox = !0, n.linkSeries(), t && n.redraw(e)
                })), i.isRemoving = !1
            },
            update: function(i, n) {
                var s, o = this,
                    r = this.chart,
                    a = this.userOptions,
                    l = this.type,
                    h = We[l].prototype,
                    c = ["group", "markerGroup", "dataLabelsGroup"];
                Ve(c, function(t) {
                    c[t] = o[t], delete o[t]
                }), i = e(a, {
                    animation: !1,
                    index: this.index,
                    pointStart: this.xData[0]
                }, {
                    data: this.options.data
                }, i), this.remove(!1);
                for (s in h) h.hasOwnProperty(s) && (this[s] = _);
                t(this, We[i.type || l].prototype), Ve(c, function(t) {
                    o[t] = c[t]
                }), this.init(r, i), r.linkSeries(), u(n, !0) && r.redraw(!1)
            }
        }), t(O.prototype, {
            update: function(i, n) {
                var s = this.chart,
                    i = s.options[this.coll][this.options.index] = e(this.userOptions, i);
                this.destroy(!0), this._addedPlotLB = _, this.init(s, t(i, {
                    events: _
                })), s.isDirtyBox = !0, u(n, !0) && s.redraw()
            },
            remove: function(t) {
                for (var e = this.chart, i = this.coll, n = this.series, s = n.length; s--;) n[s] && n[s].remove(!1);
                h(e.axes, this), h(e[i], this), e.options[i].splice(this.options.index, 1), Ve(e[i], function(t, e) {
                    t.options.index = e
                }), this.destroy(), e.isDirtyBox = !0, u(t, !0) && e.redraw()
            },
            setTitle: function(t, e) {
                this.update({
                    title: t
                }, e)
            },
            setCategories: function(t, e) {
                this.update({
                    categories: t
                }, e)
            }
        }), li = m(vi), We.line = li, ei.area = e(Xe, {
            threshold: 0
        });
        var bi = m(vi, {
            type: "area",
            getSegments: function() {
                var t, e, i, n, s = this,
                    o = [],
                    r = [],
                    a = [],
                    l = this.xAxis,
                    h = this.yAxis,
                    c = h.stacks[this.stackKey],
                    d = {},
                    p = this.points,
                    u = this.options.connectNulls;
                if (this.options.stacking && !this.cropped) {
                    for (i = 0; i < p.length; i++) d[p[i].x] = p[i];
                    for (n in c) null !== c[n].total && a.push(+n);
                    a.sort(function(t, e) {
                        return t - e
                    }), Ve(a, function(n) {
                        var o, a = 0;
                        if (!u || d[n] && null !== d[n].y)
                            if (d[n]) r.push(d[n]);
                            else {
                                for (i = s.index; i <= h.series.length; i++)
                                    if (o = c[n].points[i + "," + n]) {
                                        a = o[1];
                                        break
                                    }
                                t = l.translate(n), e = h.toPixels(a, !0), r.push({
                                    y: null,
                                    plotX: t,
                                    clientX: t,
                                    plotY: e,
                                    yBottom: e,
                                    onMouseOver: Be
                                })
                            }
                    }), r.length && o.push(r)
                } else vi.prototype.getSegments.call(this), o = this.segments;
                this.segments = o
            },
            getSegmentPath: function(t) {
                var e, i = vi.prototype.getSegmentPath.call(this, t),
                    n = [].concat(i),
                    s = this.options;
                e = i.length;
                var o, r = this.yAxis.getThreshold(s.threshold);
                if (3 === e && n.push("L", i[1], i[2]), s.stacking && !this.closedStacks)
                    for (e = t.length - 1; e >= 0; e--) o = u(t[e].yBottom, r), e < t.length - 1 && s.step && n.push(t[e + 1].plotX, o), n.push(t[e].plotX, o);
                else this.closeSegment(n, t, r);
                return this.areaPath = this.areaPath.concat(n), i
            },
            closeSegment: function(t, e, i) {
                t.push("L", e[e.length - 1].plotX, i, "L", e[0].plotX, i)
            },
            drawGraph: function() {
                this.areaPath = [], vi.prototype.drawGraph.apply(this);
                var t = this,
                    e = this.areaPath,
                    i = this.options,
                    n = i.negativeColor,
                    s = i.negativeFillColor,
                    o = [
                        ["area", this.color, i.fillColor]
                    ];
                (n || s) && o.push(["areaNeg", n, s]), Ve(o, function(n) {
                    var s = n[0],
                        o = t[s];
                    o ? o.animate({
                        d: e
                    }) : t[s] = t.chart.renderer.path(e).attr({
                        fill: u(n[2], oi(n[1]).setOpacity(u(i.fillOpacity, .75)).get()),
                        zIndex: 0
                    }).add(t.group)
                })
            },
            drawLegendSymbol: Ge.drawRectangle
        });
        We.area = bi, ei.spline = e(Xe), li = m(vi, {
            type: "spline",
            getPointSpline: function(t, e, i) {
                var n, s, o, r, a = e.plotX,
                    l = e.plotY,
                    h = t[i - 1],
                    c = t[i + 1];
                if (h && c) {
                    t = h.plotY, o = c.plotX;
                    var d, c = c.plotY;
                    n = (1.5 * a + h.plotX) / 2.5, s = (1.5 * l + t) / 2.5, o = (1.5 * a + o) / 2.5, r = (1.5 * l + c) / 2.5, d = (r - s) * (o - a) / (o - n) + l - r, s += d, r += d, s > t && s > l ? (s = pe(t, l), r = 2 * l - s) : t > s && l > s && (s = ue(t, l), r = 2 * l - s), r > c && r > l ? (r = pe(c, l), s = 2 * l - r) : c > r && l > r && (r = ue(c, l), s = 2 * l - r), e.rightContX = o, e.rightContY = r
                }
                return i ? (e = ["C", h.rightContX || h.plotX, h.rightContY || h.plotY, n || a, s || l, a, l], h.rightContX = h.rightContY = null) : e = ["M", a, l], e
            }
        }), We.spline = li, ei.areaspline = e(ei.area), bi = bi.prototype, li = m(li, {
            type: "areaspline",
            closedStacks: !0,
            getSegmentPath: bi.getSegmentPath,
            closeSegment: bi.closeSegment,
            drawGraph: bi.drawGraph,
            drawLegendSymbol: Ge.drawRectangle
        }), We.areaspline = li, ei.column = e(Xe, {
            borderColor: "#FFFFFF",
            borderRadius: 0,
            groupPadding: .2,
            marker: null,
            pointPadding: .1,
            minPointLength: 0,
            cropThreshold: 50,
            pointRange: null,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1,
                    halo: !1
                },
                select: {
                    color: "#C0C0C0",
                    borderColor: "#000000",
                    shadow: !1
                }
            },
            dataLabels: {
                align: null,
                verticalAlign: null,
                y: null
            },
            stickyTracking: !1,
            tooltip: {
                distance: 6
            },
            threshold: 0
        }), li = m(vi, {
            type: "column",
            pointAttrToOptions: {
                stroke: "borderColor",
                fill: "color",
                r: "borderRadius"
            },
            cropShoulder: 0,
            trackerGroups: ["group", "dataLabelsGroup"],
            negStacks: !0,
            init: function() {
                vi.prototype.init.apply(this, arguments);
                var t = this,
                    e = t.chart;
                e.hasRendered && Ve(e.series, function(e) {
                    e.type === t.type && (e.isDirty = !0)
                })
            },
            getColumnMetrics: function() {
                var t, e, i = this,
                    n = i.options,
                    s = i.xAxis,
                    o = i.yAxis,
                    r = s.reversed,
                    a = {},
                    l = 0;
                n.grouping === !1 ? l = 1 : Ve(i.chart.series, function(n) {
                    var s = n.options,
                        r = n.yAxis;
                    n.type === i.type && n.visible && o.len === r.len && o.pos === r.pos && (s.stacking ? (t = n.stackKey, a[t] === _ && (a[t] = l++), e = a[t]) : s.grouping !== !1 && (e = l++), n.columnIndex = e)
                });
                var s = ue(ge(s.transA) * (s.ordinalSlope || n.pointRange || s.closestPointRange || s.tickInterval || 1), s.len),
                    h = s * n.groupPadding,
                    d = (s - 2 * h) / l,
                    p = n.pointWidth,
                    n = c(p) ? (d - p) / 2 : d * n.pointPadding,
                    p = u(p, d - 2 * n);
                return i.columnMetrics = {
                    width: p,
                    offset: n + (h + ((r ? l - (i.columnIndex || 0) : i.columnIndex) || 0) * d - s / 2) * (r ? -1 : 1)
                }
            },
            translate: function() {
                var t = this,
                    e = t.chart,
                    i = t.options,
                    n = t.borderWidth = u(i.borderWidth, t.activePointCount > .5 * t.xAxis.len ? 0 : 1),
                    s = t.yAxis,
                    o = t.translatedThreshold = s.getThreshold(i.threshold),
                    r = u(i.minPointLength, 5),
                    a = t.getColumnMetrics(),
                    l = a.width,
                    h = t.barW = pe(l, 1 + 2 * n),
                    c = t.pointXOffset = a.offset,
                    d = -(n % 2 ? .5 : 0),
                    p = n % 2 ? .5 : 1;
                e.renderer.isVML && e.inverted && (p += 1), i.pointPadding && (h = de(h)), vi.prototype.translate.apply(t), Ve(t.points, function(i) {
                    var n, a = u(i.yBottom, o),
                        g = ue(pe(-999 - a, i.plotY), s.len + 999 + a),
                        f = i.plotX + c,
                        m = h,
                        x = ue(g, a);
                    n = pe(g, a) - x, ge(n) < r && r && (n = r, x = he(ge(x - o) > r ? a - r : o - (s.translate(i.y, 0, 1, 0, 1) <= o ? r : 0))), i.barX = f, i.pointWidth = l, i.tooltipPos = e.inverted ? [s.len - g, t.xAxis.len - f - m / 2] : [f + m / 2, g], m = he(f + m) + d, f = he(f) + d, m -= f, a = ge(x) < .5, n = he(x + n) + p, x = he(x) + p, n -= x, a && (x -= 1, n += 1), i.shapeType = "rect", i.shapeArgs = {
                        x: f,
                        y: x,
                        width: m,
                        height: n
                    }
                })
            },
            getSymbol: Be,
            drawLegendSymbol: Ge.drawRectangle,
            drawGraph: Be,
            drawPoints: function() {
                var t, i, n = this,
                    s = this.chart,
                    o = n.options,
                    r = s.renderer,
                    a = o.animationLimit || 250;
                Ve(n.points, function(l) {
                    var h = l.plotY,
                        d = l.graphic;
                    h === _ || isNaN(h) || null === l.y ? d && (l.graphic = d.destroy()) : (t = l.shapeArgs, h = c(n.borderWidth) ? {
                        "stroke-width": n.borderWidth
                    } : {}, i = l.pointAttr[l.selected ? "select" : ""] || n.pointAttr[""], d ? (ti(d), d.attr(h)[s.pointCount < a ? "animate" : "attr"](e(t))) : l.graphic = r[l.shapeType](t).attr(i).attr(h).add(n.group).shadow(o.shadow, null, o.stacking && !o.borderRadius))
                })
            },
            animate: function(t) {
                var e = this.yAxis,
                    i = this.options,
                    n = this.chart.inverted,
                    s = {};
                Me && (t ? (s.scaleY = .001, t = ue(e.pos + e.len, pe(e.pos, e.toPixels(i.threshold))), n ? s.translateX = t - e.len : s.translateY = t, this.group.attr(s)) : (s.scaleY = 1, s[n ? "translateX" : "translateY"] = e.pos, this.group.animate(s, this.options.animation), this.animate = null))
            },
            remove: function() {
                var t = this,
                    e = t.chart;
                e.hasRendered && Ve(e.series, function(e) {
                    e.type === t.type && (e.isDirty = !0)
                }), vi.prototype.remove.apply(t, arguments)
            }
        }), We.column = li, ei.bar = e(ei.column), bi = m(li, {
            type: "bar",
            inverted: !0
        }), We.bar = bi, ei.scatter = e(Xe, {
            lineWidth: 0,
            tooltip: {
                headerFormat: '<span style="color:{series.color}">\u25cf</span> <span style="font-size: 10px;"> {series.name}</span><br/>',
                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
            },
            stickyTracking: !1
        }), bi = m(vi, {
            type: "scatter",
            sorted: !1,
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["markerGroup", "dataLabelsGroup"],
            takeOrdinalPosition: !1,
            singularTooltips: !0,
            drawGraph: function() {
                this.options.lineWidth && vi.prototype.drawGraph.call(this)
            }
        }), We.scatter = bi, ei.pie = e(Xe, {
            borderColor: "#FFFFFF",
            borderWidth: 1,
            center: [null, null],
            clip: !1,
            colorByPoint: !0,
            dataLabels: {
                distance: 30,
                enabled: !0,
                formatter: function() {
                    return this.point.name
                }
            },
            ignoreHiddenPoint: !0,
            legendType: "point",
            marker: null,
            size: null,
            showInLegend: !1,
            slicedOffset: 10,
            states: {
                hover: {
                    brightness: .1,
                    shadow: !1
                }
            },
            stickyTracking: !1,
            tooltip: {
                followPointer: !0
            }
        }), Xe = {
            type: "pie",
            isCartesian: !1,
            pointClass: m(yi, {
                init: function() {
                    yi.prototype.init.apply(this, arguments);
                    var e, i = this;
                    return i.y < 0 && (i.y = null), t(i, {
                        visible: i.visible !== !1,
                        name: u(i.name, "Slice")
                    }), e = function(t) {
                        i.slice("select" === t.type)
                    }, Ze(i, "select", e), Ze(i, "unselect", e), i
                },
                setVisible: function(t) {
                    var e = this,
                        i = e.series,
                        n = i.chart;
                    e.visible = e.options.visible = t = t === _ ? !e.visible : t, i.options.data[Ne(e, i.data)] = e.options, Ve(["graphic", "dataLabel", "connector", "shadowGroup"], function(i) {
                        e[i] && e[i][t ? "show" : "hide"](!0)
                    }), e.legendItem && n.legend.colorizeItem(e, t), !i.isDirty && i.options.ignoreHiddenPoint && (i.isDirty = !0, n.redraw())
                },
                slice: function(t, e, i) {
                    var n = this.series;
                    L(i, n.chart), u(e, !0), this.sliced = this.options.sliced = t = c(t) ? t : !this.sliced, n.options.data[Ne(this, n.data)] = this.options, t = t ? this.slicedTranslation : {
                        translateX: 0,
                        translateY: 0
                    }, this.graphic.animate(t), this.shadowGroup && this.shadowGroup.animate(t)
                },
                haloPath: function(t) {
                    var e = this.shapeArgs,
                        i = this.series.chart;
                    return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(i.plotLeft + e.x, i.plotTop + e.y, e.r + t, e.r + t, {
                        innerR: this.shapeArgs.r,
                        start: e.start,
                        end: e.end
                    })
                }
            }),
            requireSorting: !1,
            noSharedTooltip: !0,
            trackerGroups: ["group", "dataLabelsGroup"],
            axisTypes: [],
            pointAttrToOptions: {
                stroke: "borderColor",
                "stroke-width": "borderWidth",
                fill: "color"
            },
            singularTooltips: !0,
            getColor: Be,
            animate: function(t) {
                var e = this,
                    i = e.points,
                    n = e.startAngleRad;
                t || (Ve(i, function(t) {
                    var i = t.graphic,
                        t = t.shapeArgs;
                    i && (i.attr({
                        r: e.center[3] / 2,
                        start: n,
                        end: n
                    }), i.animate({
                        r: t.r,
                        start: t.start,
                        end: t.end
                    }, e.options.animation))
                }), e.animate = null)
            },
            setData: function(t, e, i, n) {
                vi.prototype.setData.call(this, t, !1, i, n), this.processData(), this.generatePoints(), u(e, !0) && this.chart.redraw(i)
            },
            generatePoints: function() {
                var t, e, i, n, s = 0,
                    o = this.options.ignoreHiddenPoint;
                for (vi.prototype.generatePoints.call(this), e = this.points, i = e.length, t = 0; i > t; t++) n = e[t], s += o && !n.visible ? 0 : n.y;
                for (this.total = s, t = 0; i > t; t++) n = e[t], n.percentage = s > 0 ? n.y / s * 100 : 0, n.total = s
            },
            translate: function(t) {
                this.generatePoints();
                var e, i, n, s, o, r = 0,
                    a = this.options,
                    l = a.slicedOffset,
                    h = l + a.borderWidth,
                    c = a.startAngle || 0,
                    d = this.startAngleRad = xe / 180 * (c - 90),
                    c = (this.endAngleRad = xe / 180 * (u(a.endAngle, c + 360) - 90)) - d,
                    p = this.points,
                    g = a.dataLabels.distance,
                    a = a.ignoreHiddenPoint,
                    f = p.length;
                for (t || (this.center = t = this.getCenter()), this.getX = function(e, i) {
                        return n = le.asin(ue((e - t[1]) / (t[2] / 2 + g), 1)), t[0] + (i ? -1 : 1) * fe(n) * (t[2] / 2 + g)
                    }, s = 0; f > s; s++) o = p[s], e = d + r * c, (!a || o.visible) && (r += o.percentage / 100), i = d + r * c, o.shapeType = "arc", o.shapeArgs = {
                    x: t[0],
                    y: t[1],
                    r: t[2] / 2,
                    innerR: t[3] / 2,
                    start: he(1e3 * e) / 1e3,
                    end: he(1e3 * i) / 1e3
                }, n = (i + e) / 2, n > 1.5 * xe ? n -= 2 * xe : -xe / 2 > n && (n += 2 * xe), o.slicedTranslation = {
                    translateX: he(fe(n) * l),
                    translateY: he(me(n) * l)
                }, e = fe(n) * t[2] / 2, i = me(n) * t[2] / 2, o.tooltipPos = [t[0] + .7 * e, t[1] + .7 * i], o.half = -xe / 2 > n || n > xe / 2 ? 1 : 0, o.angle = n, h = ue(h, g / 2), o.labelPos = [t[0] + e + fe(n) * g, t[1] + i + me(n) * g, t[0] + e + fe(n) * h, t[1] + i + me(n) * h, t[0] + e, t[1] + i, 0 > g ? "center" : o.half ? "right" : "left", n]
            },
            drawGraph: null,
            drawPoints: function() {
                var e, i, n, s, o = this,
                    r = o.chart.renderer,
                    a = o.options.shadow;
                a && !o.shadowGroup && (o.shadowGroup = r.g("shadow").add(o.group)), Ve(o.points, function(l) {
                    i = l.graphic, s = l.shapeArgs, n = l.shadowGroup, a && !n && (n = l.shadowGroup = r.g("shadow").add(o.shadowGroup)), e = l.sliced ? l.slicedTranslation : {
                        translateX: 0,
                        translateY: 0
                    }, n && n.attr(e), i ? i.animate(t(s, e)) : l.graphic = i = r[l.shapeType](s).setRadialReference(o.center).attr(l.pointAttr[l.selected ? "select" : ""]).attr({
                        "stroke-linejoin": "round"
                    }).attr(e).add(o.group).shadow(a, n), void 0 !== l.visible && l.setVisible(l.visible)
                })
            },
            sortByAngle: function(t, e) {
                t.sort(function(t, i) {
                    return void 0 !== t.angle && (i.angle - t.angle) * e
                })
            },
            drawLegendSymbol: Ge.drawRectangle,
            getCenter: ai.getCenter,
            getSymbol: Be
        }, Xe = m(vi, Xe), We.pie = Xe, vi.prototype.drawDataLabels = function() {
            var i, n, s, o, r = this,
                a = r.options,
                l = a.cursor,
                h = a.dataLabels,
                d = r.points;
            (h.enabled || r._hasPointLabels) && (r.dlProcessOptions && r.dlProcessOptions(h), o = r.plotGroup("dataLabelsGroup", "data-labels", h.defer ? "hidden" : "visible", h.zIndex || 6), !r.hasRendered && u(h.defer, !0) && (o.attr({
                opacity: 0
            }), Ze(r, "afterAnimate", function() {
                r.visible && o.show(), o[a.animation ? "animate" : "attr"]({
                    opacity: 1
                }, {
                    duration: 200
                })
            })), n = h, Ve(d, function(a) {
                var d, p, g, f = a.dataLabel,
                    m = a.connector,
                    x = !0;
                if (i = a.options && a.options.dataLabels, d = u(i && i.enabled, n.enabled), f && !d) a.dataLabel = f.destroy();
                else if (d) {
                    if (h = e(n, i), d = h.rotation, p = a.getLabelConfig(), s = h.format ? b(h.format, p) : h.formatter.call(p, h), h.style.color = u(h.color, h.style.color, r.color, "black"), f) c(s) ? (f.attr({
                        text: s
                    }), x = !1) : (a.dataLabel = f = f.destroy(), m && (a.connector = m.destroy()));
                    else if (c(s)) {
                        f = {
                            fill: h.backgroundColor,
                            stroke: h.borderColor,
                            "stroke-width": h.borderWidth,
                            r: h.borderRadius || 0,
                            rotation: d,
                            padding: h.padding,
                            zIndex: 1
                        };
                        for (g in f) f[g] === _ && delete f[g];
                        f = a.dataLabel = r.chart.renderer[d ? "text" : "label"](s, 0, -999, null, null, null, h.useHTML).attr(f).css(t(h.style, l && {
                            cursor: l
                        })).add(o).shadow(h.shadow)
                    }
                    f && r.alignDataLabel(a, f, h, null, x)
                }
            }))
        }, vi.prototype.alignDataLabel = function(e, i, n, s, o) {
            var r = this.chart,
                a = r.inverted,
                l = u(e.plotX, -999),
                h = u(e.plotY, -999),
                c = i.getBBox();
            (e = this.visible && (e.series.forceDL || r.isInsidePlot(l, he(h), a) || s && r.isInsidePlot(l, a ? s.x + 1 : s.y + s.height - 1, a))) && (s = t({
                x: a ? r.plotWidth - h : l,
                y: he(a ? r.plotHeight - l : h),
                width: 0,
                height: 0
            }, s), t(n, {
                width: c.width,
                height: c.height
            }), n.rotation ? i[o ? "attr" : "animate"]({
                x: s.x + n.x + s.width / 2,
                y: s.y + n.y + s.height / 2
            }).attr({
                align: n.align
            }) : (i.align(n, null, s), a = i.alignAttr, "justify" === u(n.overflow, "justify") ? this.justifyDataLabel(i, n, a, c, s, o) : u(n.crop, !0) && (e = r.isInsidePlot(a.x, a.y) && r.isInsidePlot(a.x + c.width, a.y + c.height)))), e || (i.attr({
                y: -999
            }), i.placed = !1)
        }, vi.prototype.justifyDataLabel = function(t, e, i, n, s, o) {
            var r, a, l = this.chart,
                h = e.align,
                c = e.verticalAlign;
            r = i.x, 0 > r && ("right" === h ? e.align = "left" : e.x = -r, a = !0), r = i.x + n.width, r > l.plotWidth && ("left" === h ? e.align = "right" : e.x = l.plotWidth - r, a = !0), r = i.y, 0 > r && ("bottom" === c ? e.verticalAlign = "top" : e.y = -r, a = !0), r = i.y + n.height, r > l.plotHeight && ("top" === c ? e.verticalAlign = "bottom" : e.y = l.plotHeight - r, a = !0), a && (t.placed = !o, t.align(e, null, s))
        }, We.pie && (We.pie.prototype.drawDataLabels = function() {
            var t, e, i, n, s, o, r, a, l, h, c, d = this,
                p = d.data,
                g = d.chart,
                f = d.options.dataLabels,
                m = u(f.connectorPadding, 10),
                x = u(f.connectorWidth, 1),
                y = g.plotWidth,
                v = g.plotHeight,
                b = u(f.softConnector, !0),
                k = f.distance,
                w = d.center,
                S = w[2] / 2,
                C = w[1],
                T = k > 0,
                M = [
                    [],
                    []
                ],
                P = [0, 0, 0, 0],
                L = function(t, e) {
                    return e.y - t.y
                };
            if (d.visible && (f.enabled || d._hasPointLabels)) {
                for (vi.prototype.drawDataLabels.apply(d), Ve(p, function(t) {
                        t.dataLabel && t.visible && M[t.half].push(t)
                    }), h = 2; h--;) {
                    var I, D = [],
                        B = [],
                        O = M[h],
                        z = O.length;
                    if (z) {
                        for (d.sortByAngle(O, h - .5), c = p = 0; !p && O[c];) p = O[c] && O[c].dataLabel && (O[c].dataLabel.getBBox().height || 21), c++;
                        if (k > 0) {
                            for (s = ue(C + S + k, g.plotHeight), c = pe(0, C - S - k); s >= c; c += p) D.push(c);
                            if (s = D.length, z > s) {
                                for (t = [].concat(O), t.sort(L), c = z; c--;) t[c].rank = c;
                                for (c = z; c--;) O[c].rank >= s && O.splice(c, 1);
                                z = O.length
                            }
                            for (c = 0; z > c; c++) {
                                t = O[c], o = t.labelPos, t = 9999;
                                var H, _;
                                for (_ = 0; s > _; _++) H = ge(D[_] - o[1]), t > H && (t = H, I = _);
                                if (c > I && null !== D[c]) I = c;
                                else
                                    for (z - c + I > s && null !== D[c] && (I = s - z + c); null === D[I];) I++;
                                B.push({
                                    i: I,
                                    y: D[I]
                                }), D[I] = null
                            }
                            B.sort(L)
                        }
                        for (c = 0; z > c; c++) t = O[c], o = t.labelPos, n = t.dataLabel, l = t.visible === !1 ? "hidden" : "visible", t = o[1], k > 0 ? (s = B.pop(), I = s.i, a = s.y, (t > a && null !== D[I + 1] || a > t && null !== D[I - 1]) && (a = ue(pe(0, t), g.plotHeight))) : a = t, r = f.justify ? w[0] + (h ? -1 : 1) * (S + k) : d.getX(a === C - S - k || a === C + S + k ? t : a, h), n._attr = {
                            visibility: l,
                            align: o[6]
                        }, n._pos = {
                            x: r + f.x + ({
                                left: m,
                                right: -m
                            }[o[6]] || 0),
                            y: a + f.y - 10
                        }, n.connX = r, n.connY = a, null === this.options.size && (s = n.width, m > r - s ? P[3] = pe(he(s - r + m), P[3]) : r + s > y - m && (P[1] = pe(he(r + s - y + m), P[1])), 0 > a - p / 2 ? P[0] = pe(he(-a + p / 2), P[0]) : a + p / 2 > v && (P[2] = pe(he(a + p / 2 - v), P[2])))
                    }
                }(0 === A(P) || this.verifyDataLabelOverflow(P)) && (this.placeDataLabels(), T && x && Ve(this.points, function(t) {
                    e = t.connector, o = t.labelPos, (n = t.dataLabel) && n._pos ? (l = n._attr.visibility, r = n.connX, a = n.connY, i = b ? ["M", r + ("left" === o[6] ? 5 : -5), a, "C", r, a, 2 * o[2] - o[4], 2 * o[3] - o[5], o[2], o[3], "L", o[4], o[5]] : ["M", r + ("left" === o[6] ? 5 : -5), a, "L", o[2], o[3], "L", o[4], o[5]], e ? (e.animate({
                        d: i
                    }), e.attr("visibility", l)) : t.connector = e = d.chart.renderer.path(i).attr({
                        "stroke-width": x,
                        stroke: f.connectorColor || t.color || "#606060",
                        visibility: l
                    }).add(d.dataLabelsGroup)) : e && (t.connector = e.destroy())
                }))
            }
        }, We.pie.prototype.placeDataLabels = function() {
            Ve(this.points, function(t) {
                var e, t = t.dataLabel;
                t && ((e = t._pos) ? (t.attr(t._attr), t[t.moved ? "animate" : "attr"](e), t.moved = !0) : t && t.attr({
                    y: -999
                }))
            })
        }, We.pie.prototype.alignDataLabel = Be, We.pie.prototype.verifyDataLabelOverflow = function(t) {
            var e, i = this.center,
                n = this.options,
                s = n.center,
                o = n = n.minSize || 80;
            return null !== s[0] ? o = pe(i[2] - pe(t[1], t[3]), n) : (o = pe(i[2] - t[1] - t[3], n), i[0] += (t[3] - t[1]) / 2), null !== s[1] ? o = pe(ue(o, i[2] - pe(t[0], t[2])), n) : (o = pe(ue(o, i[2] - t[0] - t[2]), n), i[1] += (t[0] - t[2]) / 2), o < i[2] ? (i[2] = o, this.translate(i), Ve(this.points, function(t) {
                t.dataLabel && (t.dataLabel._pos = null)
            }), this.drawDataLabels && this.drawDataLabels()) : e = !0, e
        }), We.column && (We.column.prototype.alignDataLabel = function(t, i, n, s, o) {
            var r = this.chart,
                a = r.inverted,
                l = t.dlBox || t.shapeArgs,
                h = t.below || t.plotY > u(this.translatedThreshold, r.plotSizeY),
                c = u(n.inside, !!this.options.stacking);
            l && (s = e(l), a && (s = {
                x: r.plotWidth - s.y - s.height,
                y: r.plotHeight - s.x - s.width,
                width: s.height,
                height: s.width
            }), !c) && (a ? (s.x += h ? 0 : s.width, s.width = 0) : (s.y += h ? s.height : 0, s.height = 0)), n.align = u(n.align, !a || c ? "center" : h ? "right" : "left"), n.verticalAlign = u(n.verticalAlign, a || c ? "middle" : h ? "top" : "bottom"), vi.prototype.alignDataLabel.call(this, t, i, n, s, o)
        }), Xe = oe.TrackerMixin = {
            drawTrackerPoint: function() {
                var t = this,
                    e = t.chart,
                    i = e.pointer,
                    n = t.options.cursor,
                    s = n && {
                        cursor: n
                    },
                    o = function(i) {
                        var n, s = i.target;
                        for (e.hoverSeries !== t && t.onMouseOver(); s && !n;) n = s.point, s = s.parentNode;
                        n !== _ && n !== e.hoverPoint && n.onMouseOver(i)
                    };
                Ve(t.points, function(t) {
                    t.graphic && (t.graphic.element.point = t), t.dataLabel && (t.dataLabel.element.point = t)
                }), t._hasTracking || (Ve(t.trackerGroups, function(e) {
                    t[e] && (t[e].addClass("highcharts-tracker").on("mouseover", o).on("mouseout", function(t) {
                        i.onTrackerMouseOut(t)
                    }).css(s), E) && t[e].on("touchstart", o)
                }), t._hasTracking = !0)
            },
            drawTrackerGraph: function() {
                var t, e = this,
                    i = e.options,
                    n = i.trackByArea,
                    s = [].concat(n ? e.areaPath : e.graphPath),
                    o = s.length,
                    r = e.chart,
                    a = r.pointer,
                    l = r.renderer,
                    h = r.options.tooltip.snap,
                    c = e.tracker,
                    d = i.cursor,
                    p = d && {
                        cursor: d
                    },
                    d = e.singlePoints,
                    u = function() {
                        r.hoverSeries !== e && e.onMouseOver()
                    },
                    g = "rgba(192,192,192," + (Me ? 1e-4 : .002) + ")";
                if (o && !n)
                    for (t = o + 1; t--;) "M" === s[t] && s.splice(t + 1, 0, s[t + 1] - h, s[t + 2], "L"), (t && "M" === s[t] || t === o) && s.splice(t, 0, "L", s[t - 2] + h, s[t - 1]);
                for (t = 0; t < d.length; t++) o = d[t], s.push("M", o.plotX - h, o.plotY, "L", o.plotX + h, o.plotY);
                c ? c.attr({
                    d: s
                }) : (e.tracker = l.path(s).attr({
                    "stroke-linejoin": "round",
                    visibility: e.visible ? "visible" : "hidden",
                    stroke: g,
                    fill: n ? g : _e,
                    "stroke-width": i.lineWidth + (n ? 0 : 2 * h),
                    zIndex: 2
                }).add(e.group), Ve([e.tracker, e.markerGroup], function(t) {
                    t.addClass("highcharts-tracker").on("mouseover", u).on("mouseout", function(t) {
                        a.onTrackerMouseOut(t)
                    }).css(p), E && t.on("touchstart", u)
                }))
            }
        }, We.column && (li.prototype.drawTracker = Xe.drawTrackerPoint), We.pie && (We.pie.prototype.drawTracker = Xe.drawTrackerPoint), We.scatter && (bi.prototype.drawTracker = Xe.drawTrackerPoint), t(xi.prototype, {
            setItemEvents: function(t, e, i, n, s) {
                var o = this;
                (i ? e : t.legendGroup).on("mouseover", function() {
                    t.setState("hover"), e.css(o.options.itemHoverStyle)
                }).on("mouseout", function() {
                    e.css(t.visible ? n : s), t.setState()
                }).on("click", function(e) {
                    var i = function() {
                            t.setVisible()
                        },
                        e = {
                            browserEvent: e
                        };
                    t.firePointEvent ? t.firePointEvent("legendItemClick", e, i) : qe(t, "legendItemClick", e, i)
                })
            },
            createCheckboxForItem: function(t) {
                t.checkbox = f("input", {
                    type: "checkbox",
                    checked: t.selected,
                    defaultChecked: t.selected
                }, this.options.itemCheckboxStyle, this.chart.container), Ze(t.checkbox, "click", function(e) {
                    qe(t, "checkboxClick", {
                        checked: e.target.checked
                    }, function() {
                        t.select()
                    })
                })
            }
        }), X.legend.itemStyle.cursor = "pointer", t(z.prototype, {
            showResetZoom: function() {
                var t = this,
                    e = X.lang,
                    i = t.options.chart.resetZoomButton,
                    n = i.theme,
                    s = n.states,
                    o = "chart" === i.relativeTo ? null : "plotBox";
                this.resetZoomButton = t.renderer.button(e.resetZoom, null, null, function() {
                    t.zoomOut()
                }, n, s && s.hover).attr({
                    align: i.position.align,
                    title: e.resetZoomTitle
                }).add().align(i.position, !1, o)
            },
            zoomOut: function() {
                var t = this;
                qe(t, "selection", {
                    resetSelection: !0
                }, function() {
                    t.zoom()
                })
            },
            zoom: function(t) {
                var e, i, n = this.pointer,
                    o = !1;
                !t || t.resetSelection ? Ve(this.axes, function(t) {
                    e = t.zoom()
                }) : Ve(t.xAxis.concat(t.yAxis), function(t) {
                    var i = t.axis,
                        s = i.isXAxis;
                    (n[s ? "zoomX" : "zoomY"] || n[s ? "pinchX" : "pinchY"]) && (e = i.zoom(t.min, t.max), i.displayBtn && (o = !0))
                }), i = this.resetZoomButton, o && !i ? this.showResetZoom() : !o && s(i) && (this.resetZoomButton = i.destroy()), e && this.redraw(u(this.options.chart.animation, t && t.animation, this.pointCount < 100))
            },
            pan: function(t, e) {
                var i, n = this,
                    s = n.hoverPoints;
                s && Ve(s, function(t) {
                    t.setState()
                }), Ve("xy" === e ? [1, 0] : [1], function(e) {
                    var s = t[e ? "chartX" : "chartY"],
                        o = n[e ? "xAxis" : "yAxis"][0],
                        r = n[e ? "mouseDownX" : "mouseDownY"],
                        a = (o.pointRange || 0) / 2,
                        l = o.getExtremes(),
                        h = o.toValue(r - s, !0) + a,
                        r = o.toValue(r + n[e ? "plotWidth" : "plotHeight"] - s, !0) - a;
                    o.series.length && h > ue(l.dataMin, l.min) && r < pe(l.dataMax, l.max) && (o.setExtremes(h, r, !1, !1, {
                        trigger: "pan"
                    }), i = !0), n[e ? "mouseDownX" : "mouseDownY"] = s
                }), i && n.redraw(!1), g(n.container, {
                    cursor: "move"
                })
            }
        }), t(yi.prototype, {
            select: function(t, e) {
                var i = this,
                    n = i.series,
                    s = n.chart,
                    t = u(t, !i.selected);
                i.firePointEvent(t ? "select" : "unselect", {
                    accumulate: e
                }, function() {
                    i.selected = i.options.selected = t, n.options.data[Ne(i, n.data)] = i.options, i.setState(t && "select"), e || Ve(s.getSelectedPoints(), function(t) {
                        t.selected && t !== i && (t.selected = t.options.selected = !1, n.options.data[Ne(t, n.data)] = t.options, t.setState(""), t.firePointEvent("unselect"))
                    })
                })
            },
            onMouseOver: function(t) {
                var e = this.series,
                    i = e.chart,
                    n = i.tooltip,
                    s = i.hoverPoint;
                s && s !== this && s.onMouseOut(), this.firePointEvent("mouseOver"), n && (!n.shared || e.noSharedTooltip) && n.refresh(this, t), this.setState("hover"), i.hoverPoint = this
            },
            onMouseOut: function() {
                var t = this.series.chart,
                    e = t.hoverPoints;
                this.firePointEvent("mouseOut"), e && -1 !== Ne(this, e) || (this.setState(), t.hoverPoint = null)
            },
            importEvents: function() {
                if (!this.hasImportedEvents) {
                    var t, i = e(this.series.options.point, this.options).events;
                    this.events = i;
                    for (t in i) Ze(this, t, i[t]);
                    this.hasImportedEvents = !0
                }
            },
            setState: function(i, n) {
                var s, o = this.plotX,
                    r = this.plotY,
                    a = this.series,
                    l = a.options.states,
                    h = ei[a.type].marker && a.options.marker,
                    c = h && !h.enabled,
                    d = h && h.states[i],
                    p = d && d.enabled === !1,
                    u = a.stateMarkerGraphic,
                    g = this.marker || {},
                    f = a.chart,
                    m = a.halo,
                    i = i || "";
                s = this.pointAttr[i] || a.pointAttr[i], i === this.state && !n || this.selected && "select" !== i || l[i] && l[i].enabled === !1 || i && (p || c && d.enabled === !1) || i && g.states && g.states[i] && g.states[i].enabled === !1 || (this.graphic ? (h = h && this.graphic.symbolName && s.r, this.graphic.attr(e(s, h ? {
                    x: o - h,
                    y: r - h,
                    width: 2 * h,
                    height: 2 * h
                } : {})), u && u.hide()) : (i && d && (h = d.radius, g = g.symbol || a.symbol, u && u.currentSymbol !== g && (u = u.destroy()), u ? u[n ? "animate" : "attr"]({
                    x: o - h,
                    y: r - h
                }) : g && (a.stateMarkerGraphic = u = f.renderer.symbol(g, o - h, r - h, 2 * h, 2 * h).attr(s).add(a.markerGroup), u.currentSymbol = g)), u && u[i && f.isInsidePlot(o, r, f.inverted) ? "show" : "hide"]()), (o = l[i] && l[i].halo) && o.size ? (m || (a.halo = m = f.renderer.path().add(a.seriesGroup)), m.attr(t({
                    fill: oi(this.color || a.color).setOpacity(o.opacity).get()
                }, o.attributes))[n ? "animate" : "attr"]({
                    d: this.haloPath(o.size)
                })) : m && m.attr({
                    d: []
                }), this.state = i)
            },
            haloPath: function(t) {
                var e = this.series,
                    i = e.chart,
                    n = e.getPlotBox(),
                    s = i.inverted;
                return i.renderer.symbols.circle(n.translateX + (s ? e.yAxis.len - this.plotY : this.plotX) - t, n.translateY + (s ? e.xAxis.len - this.plotX : this.plotY) - t, 2 * t, 2 * t)
            }
        }), t(vi.prototype, {
            onMouseOver: function() {
                var t = this.chart,
                    e = t.hoverSeries;
                e && e !== this && e.onMouseOut(), this.options.events.mouseOver && qe(this, "mouseOver"), this.setState("hover"), t.hoverSeries = this
            },
            onMouseOut: function() {
                var t = this.options,
                    e = this.chart,
                    i = e.tooltip,
                    n = e.hoverPoint;
                n && n.onMouseOut(), this && t.events.mouseOut && qe(this, "mouseOut"), i && !t.stickyTracking && (!i.shared || this.noSharedTooltip) && i.hide(), this.setState(), e.hoverSeries = null
            },
            setState: function(t) {
                var e = this.options,
                    i = this.graph,
                    n = this.graphNeg,
                    s = e.states,
                    e = e.lineWidth,
                    t = t || "";
                this.state !== t && (this.state = t, s[t] && s[t].enabled === !1 || (t && (e = s[t].lineWidth || e + (s[t].lineWidthPlus || 0)), i && !i.dashstyle && (t = {
                    "stroke-width": e
                }, i.attr(t), n && n.attr(t))))
            },
            setVisible: function(t, e) {
                var i, n = this,
                    s = n.chart,
                    o = n.legendItem,
                    r = s.options.chart.ignoreHiddenSeries,
                    a = n.visible;
                i = (n.visible = t = n.userOptions.visible = t === _ ? !a : t) ? "show" : "hide", Ve(["group", "dataLabelsGroup", "markerGroup", "tracker"], function(t) {
                    n[t] && n[t][i]()
                }), s.hoverSeries === n && n.onMouseOut(), o && s.legend.colorizeItem(n, t), n.isDirty = !0, n.options.stacking && Ve(s.series, function(t) {
                    t.options.stacking && t.visible && (t.isDirty = !0)
                }), Ve(n.linkedSeries, function(e) {
                    e.setVisible(t, !1)
                }), r && (s.isDirtyBox = !0), e !== !1 && s.redraw(), qe(n, i)
            },
            setTooltipPoints: function(t) {
                var e, i, n, s, o = [],
                    r = this.xAxis,
                    a = r && r.getExtremes(),
                    l = r ? r.tooltipLen || r.len : this.chart.plotSizeX,
                    h = [];
                if (this.options.enableMouseTracking !== !1 && !this.singularTooltips) {
                    for (t && (this.tooltipPoints = null), Ve(this.segments || this.points, function(t) {
                            o = o.concat(t)
                        }), r && r.reversed && (o = o.reverse()), this.orderTooltipPoints && this.orderTooltipPoints(o), t = o.length, s = 0; t > s; s++)
                        if (r = o[s], e = r.x, e >= a.min && e <= a.max)
                            for (n = o[s + 1], e = i === _ ? 0 : i + 1, i = o[s + 1] ? ue(pe(0, ce((r.clientX + (n ? n.wrappedClientX || n.clientX : l)) / 2)), l) : l; e >= 0 && i >= e;) h[e++] = r;
                    this.tooltipPoints = h
                }
            },
            show: function() {
                this.setVisible(!0)
            },
            hide: function() {
                this.setVisible(!1)
            },
            select: function(t) {
                this.selected = t = t === _ ? !this.selected : t, this.checkbox && (this.checkbox.checked = t), qe(this, t ? "select" : "unselect")
            },
            drawTracker: Xe.drawTrackerGraph
        }), t(oe, {
            Axis: O,
            Chart: z,
            Color: oi,
            Point: yi,
            Tick: B,
            Renderer: R,
            Series: vi,
            SVGElement: D,
            SVGRenderer: ri,
            arrayMin: C,
            arrayMax: A,
            charts: Oe,
            dateFormat: G,
            format: b,
            pathAnim: F,
            getOptions: function() {
                return X
            },
            hasBidiBug: Pe,
            isTouchDevice: Ae,
            numberFormat: x,
            seriesTypes: We,
            setOptions: function(t) {
                return X = e(!0, X, t), I(), X
            },
            addEvent: Ze,
            removeEvent: Ke,
            createElement: f,
            discardElement: M,
            css: g,
            each: Ve,
            extend: t,
            map: Ue,
            merge: e,
            pick: u,
            splat: p,
            extendClass: m,
            pInt: i,
            wrap: v,
            svg: Me,
            canvas: Le,
            vml: !Me && !Le,
            product: "Highcharts",
            version: "4.0.3"
        })
    }();
