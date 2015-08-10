function gotoCompare(t) {
	$('.asSwitchBtn li[data-target="compare_stock"]').trigger("click"), $("#" + t).trigger("click")
}
var Order = {
	init: function () {
		Order.updateTotalMoney(), Order.limitPriceRadioClickHandle(), Order.stockSizeInputEventHandle(), Order.limitPriceInputEventHandle(), $("*[data-click-tip], *[data-hover-tip]").ClickHoverTip($("#BubbleBox"))
	}, buyStock: function () {
		$(".trade_type").val("OrderBuy");
		var t = $(".j_stock_est_shares").attr("step");
		$(".j_stock_est_shares").val(t).attr("min", t).attr("max", 1e6), Order.updateTotalMoney(), Amount.adjustKbdStyle($(".j_stock_est_shares"))
	}, sellStock: function (t) {
		$(".trade_type").val("OrderSell");
		var e = parseInt($(t).attr("stock_total")), a = e >= 0 ? o > e ? 0 : e : 0;
		$(".j_stock_est_shares").val(a);
		var o = $(".j_stock_est_shares").attr("step"), i = e >= o ? o : 0, n = e >= 0 ? o > e ? 0 : e : 0;
		$(".j_stock_est_shares").attr("min", i).attr("max", n), Order.updateTotalMoney(), Amount.adjustKbdStyle($(".j_stock_est_shares"))
	}, addStockNumber: function (t) {
		Amount.add(t), this.updateTotalMoney()
	}, subStockNumber: function (t) {
		Amount.reduce(t), this.updateTotalMoney()
	}, addStockPrice: function (t) {
		1 != Order.isMarket() && (Amount.priceAdd(t), this.updateTotalMoney())
	}, subStockPrice: function (t) {
		1 != Order.isMarket() && (Amount.priceReduce(t), this.updateTotalMoney())
	}, setPrice: function (t) {
		1 != Order.isMarket() && ($("#order_limit_price").val(t), this.updateTotalMoney())
	}, isMarket: function () {
		return "0" != $("#order_type").val() && "limit" != $("#order_type").val()
	}, limitPriceRadioClickHandle: function () {
		$(".selectoption .order_type").on("click", function () {
			if ("0" != $(this).attr("data-value") && "limit" != $(this).attr("data-value"))$("#order_limit_price").css("background", "#efefef").val("\u5e02\u4ef7\u59d4\u6258").attr("disabled", "disabled"); else {
				var t = $("#order_limit_price").attr("price");
				$("#order_limit_price").css("background", "#fff").val(t).removeAttr("disabled")
			}
			setTimeout("Order.updateTotalMoney();", 100)
		}), $("#order_limit_price").on("keyup", function () {
			Order.updateTotalMoney()
		})
	}, updateTotalMoney: function () {
		Order.refreshCanTradeAlert();
		var t = parseInt($(".j_stock_est_shares").val());
		$("#order_stocks_total").html(t), t = isNaN(t) ? 0 : t;
		var e = parseFloat(1 == Order.isMarket() ? $(".j_stock_price").first().val() : $("#order_limit_price").val());
		isNaN(e) && (e = 0);
		var a = (t * e).toFixed(2);
		$("#order_total_money").val(a), $("#j_stock_total_money").text(accounting.formatMoney(a, "")), $("#j_order_total_money").text(accounting.formatMoney(a, ""))
	}, refreshCanTradeAlert: function () {
		if ($("input[name=trade_radio][value=buy]").is(":checked")) {
			var t = Order.canBuyCount(), e = parseInt($(".j_stock_est_shares").val()), e = isNaN(e) ? 0 : e, a = parseInt($(".j_stock_est_shares").attr("step")), o = Math.min(t, Math.max(e, a)), i = e % a == 0;
			$(".orderTable .quantity .num").html("\u6700\u591a\u53ef\u4e70<i>" + t + "</i>\u80a1"), i && $(".j_stock_est_shares").attr("max", t).val(o)
		} else {
			var t = $("input[name=trade_radio][value=sell]").attr("stock_total");
			$(".orderTable .quantity .num").html("\u6700\u591a\u53ef\u5356<i>" + t + "</i>\u80a1")
		}
		Amount.adjustKbdStyle($(".j_stock_est_shares"))
	}, canBuyCount: function () {
		var t = parseFloat(1 == Order.isMarket() ? $(".orderTable .price .adjustCount input").attr("price") : $(".orderTable .price .adjustCount input").val()), e = parseFloat($(".tradeInfo span:first i:first").attr("data")), a = parseInt($(".j_stock_est_shares").attr("step"));
		return 0 >= t || isNaN(t) ? 0 : Math.floor(e / t / a) * a
	}, loadCanSellShares: function (t, e) {
		$.get("/stocks/" + e + "/trade_infos", {account_id: t}, function (e) {
			var a = parseInt(e.shares);
			$("input[name=trade_radio][value=sell]").attr("stock_total", a), $("input[name=trade_radio][value=sell]").is(":checked") && $(".adjustCount:eq(1) input").val(a).attr("max", a).attr("min", a > 0 ? 100 : 0), $("#trading_account_id").val(t), $(".tradeInfo>em:first").text(e.broker_info), $(".tradeInfo span:eq(0) i:first").text(accounting.formatMoney(e.usable_cash, e.unit)).attr("data", e.usable_cash), $(".tradeInfo span:eq(1) i:first").text(accounting.formatMoney(e.total_cash, e.unit)).attr("data", e.total_cash), e.is_pt ? ($("#order_type").parent().find(".selectoption li[data-value!=0]").addClass("hide"), $("#order_type").parent().find(".selectoption li[data-value=0]").trigger("click")) : $("#order_type").parent().find(".selectoption li").removeClass("hide"), Order.updateTotalMoney(), Account.checkLogined(t)
		})
	}, checkOrderNewForm: function () {
		$("#btn_submit").attr("disabled", "disabled"), $("#btn_submit").html("\u4e0b\u5355\u4e2d");
		var t = Order.checkOrderValues();
		return 1 == t && (t = Order.ajaxCreateOrder(!1)), 1 == t ? (setTimeout("Order.enableSubmitBtn();", 1e3), $("#myFocus").length > 0 && $("#orderTable").appendTo("#myFocus")) : Order.enableSubmitBtn(), !1
	}, ajaxCreateOrder: function (t) {
		return $.ajax({
			url: "/orders",
			type: "POST",
			dataType: "json",
			async: !1,
			data: {order: Order.getOrderParams(), trade_type: $("#order_trade_type").val()},
			success: function (e) {
				0 == e.login ? (Account.showLogin($("#trading_account_id").val(), $(".tradeInfo em:first").text(), $(".tradeInfo em:first").attr("communication")), t = !1) : 1 == e.error ? (CaishuoAlert(e.error_msg), t = !1) : (window.open("/orders/" + e.order_id), t = !0)
			}
		}), t
	}, enableSubmitBtn: function () {
		$("#btn_submit").removeAttr("disabled"), $("#btn_submit").html("\u4e0b\u5355")
	}, getOrderParams: function () {
		var t = {}, e = {}, a = {};
		return a.est_shares = $(".j_stock_est_shares").val(), a.base_stock_id = $(".buying-power").find(".j_stock_id").val(), a.order_type = $("input[name='order[order_type]']").val(), a.limit_price = $("#order_limit_price").val(), e[0] = a, t.order_details_attributes = e, t.gtd = $("#order_expiry").val(), t.trading_account_id = $("#trading_account_id").val(), t
	}, stockSizeInputEventHandle: function () {
		$(".j_stock_est_shares").on("keyup", function (t) {
			"37" != t.which && "39" != t.which && "8" != t.which && (Amount.checkInputIsNumber(this), Order.updateTotalMoney())
		}), $(".j_stock_est_shares").on("blur", function () {
			Amount.adjustUserInputNumber(this), Order.updateTotalMoney()
		})
	}, limitPriceInputEventHandle: function () {
		$("#order_limit_price").on("keyup", function (t) {
			if ("37" == t.which || "39" == t.which || "8" == t.which)return !0;
			var e = $(this).val().replace(/[^0-9\.]+/, "").replace(/[^0-9\.]+/, "");
			e = "" == e ? "" : e.match(/([0-9]+.?[0-9]{0,3})/)[0], $(this).val(e)
		}), $("#order_limit_price").on("blur", function () {
			var t = $("#order_limit_price"), e = parseFloat(t.attr("max")), a = parseFloat(t.attr("min")), o = parseFloat(t.val()) || 0;
			t.next().removeClass("limit").end().prev().removeClass("limit"), !isNaN(e) && o > e ? (t.val(e), t.next().addClass("limit")) : !isNaN(a) && a > o && (t.val(a), t.prev().addClass("limit")), Order.updateTotalMoney()
		})
	}, checkOrderValues: function () {
		var t = !0;
		if ("disabled" != $("#order_limit_price").attr("disabled")) {
			var e = $.trim($("#order_limit_price").val());
			"" == e && (CaishuoAlert("\u8bf7\u586b\u5199\u9650\u4ef7\uff01"), t = !1)
		}
		return parseInt($(".j_stock_est_shares").first().val()) <= 0 && (CaishuoAlert("\u80a1\u7968\u6570\u91cf\u4e0d\u5408\u6cd5\uff01"), t = !1), t
	}
}, StockShow = {
	stock_id: null,
	money_unit: "$",
	stock_previous_close_price: null,
	clicked_period: !1,
	kline_datas: {},
	day_datas: {},
	six_months_datas: {},
	one_day_minutes_datas: {},
	week_minutes_datas: {},
	stock_chart: null,
	show_minutes_time: !0,
	current_chart_datas_name: "1dm",
	update_stock_chart_datas: !0,
	start_trade_timestamp: null,
	end_trade_timestamp: null,
	start_trade_timestamp_of_utc: null,
	end_trade_timestamp_of_utc: null,
	six_months_ago_timestamp: null,
	market_area: null,
	init: function () {
		StockShow.followHandle(), StockShow.chartTypeButtonClickHandle(), StockShow.timePeriodClickHandle(), StockShow.setMinutesChart(), $(".sortcolumn").columnsortable(), $(".compare_chart").drawsquare(), BasketMiniChart.init(), StockShow.syncStockRtLogs(), StockShow.bindNewsClickHandle(), StockShow.bindTradingFlowClickHandle(), setInterval("StockRealtime.rtHeartbeat();", 12e4), setInterval("StockMinutePrice.AjaxUpdateMinutes(StockShow.start_trade_timestamp_of_utc,StockShow.end_trade_timestamp_of_utc);", 6e4)
	},
	syncStockRtLogs: function () {
		"cn" == StockShow.market_area && $.get("/ajax/stocks/" + StockShow.stock_id + "/rt_logs")
	},
	bindNewsClickHandle: function () {
		$(".j_news_tag").on("click", function () {
			StockShow.syncStockNews(), StockShow.syncStockNotify()
		})
	},
	syncStockNews: function () {
		("cn" == StockShow.market_area || "hk" == StockShow.market_area) && $.get("/ajax/stocks/" + StockShow.stock_id + "/news")
	},
	syncStockNotify: function () {
		("cn" == StockShow.market_area || "hk" == StockShow.market_area) && $.get("/ajax/stocks/" + StockShow.stock_id + "/announcements")
	},
	bindTradingFlowClickHandle: function () {
		$(".j_trading_flow_tag").on("click", function () {
			StockShow.syncStockTradingFlows(), StockShow.syncTradingFlowPieChart(), StockShow.bubbleSyncTradingFlows(), StockShow.syncIndustryTradingFlows()
		})
	},
	syncStockTradingFlows: function () {
		"cn" == StockShow.market_area && $.get("/ajax/stocks/" + StockShow.stock_id + "/trading_flows")
	},
	bubbleSyncTradingFlows: function () {
		"cn" == StockShow.market_area && $.get("/ajax/stocks/" + StockShow.stock_id + "/bubble_trading_flows")
	},
	syncTradingFlowPieChart: function () {
		"cn" == StockShow.market_area && $.get("/ajax/stocks/" + StockShow.stock_id + "/flow_charts")
	},
	syncIndustryTradingFlows: function () {
		"cn" == StockShow.market_area && $.get("/ajax/stocks/" + StockShow.stock_id + "/industry_percent_flows", {}, function (t) {
			StockShow.setIndustryTradingFlowChart("j_industry_percent_flows", t)
		})
	},
	setIndustryTradingFlowChart: function (t, e) {
		$("#" + t).highcharts({
			global: {useUTC: !1},
			chart: {style: {fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"', fontSize: "12px"}},
			title: {text: null, x: -20},
			xAxis: {
				type: "datetime",
				dateTimeLabelFormats: {day: "%m-%d", week: "%m-%d", month: "%m\u6708", year: "%Y\u5e74"}
			},
			yAxis: {
				title: {text: null},
				labels: {format: "{value}%"},
				plotLines: [{value: 0, width: 1, color: "#808080"}],
				min: 0
			},
			tooltip: {
				xDateFormat: "%Y-%m-%d",
				shared: !0,
				useHTML: !0,
				style: {padding: "12px"},
				borderColor: "#dfdfdf",
				backgroundColor: "rgba(255, 255, 255, 0.85)",
				shadow: !1,
				valueDecimals: 2,
				formatter: function () {
					var t = '<b style="line-height: 25px;">' + Highcharts.dateFormat("%Y-%m-%d", this.x) + "</b>";
					return $.each(this.points, function (e, a) {
						t += '<br/><span style="line-height: 25px;color:' + a.series.color + '">' + a.series.name + '\uff1a<span style="color:' + a.point.y + '">' + a.point.y.toFixed(2) + " %</span></span>"
					}), t
				}
			},
			credits: {enabled: !1},
			legend: {enabled: !1},
			plotOptions: {line: {marker: {enabled: !1}, shadow: !1, states: {hover: {lineWidth: 1}}, threshold: null}},
			series: [{name: "\u5c0f\u5355", data: e[0], color: "#87bdee"}, {
				name: "\u5927\u5355",
				data: e[1],
				color: "#7DCD6D"
			}, {name: "\u8d85\u5927\u5355", data: e[2], color: "#8600FF"}, {
				name: "\u4e3b\u529b",
				data: e[3],
				color: "#0000E3"
			}]
		})
	},
	setTradingFlowPieChart: function (t) {
		Highcharts.getOptions().plotOptions.pie.colors = ["#f05050", "#f48484", "#f9b9b9", "#fcdcdc", "#cdedd8", "#94d7ac", "#71ca90", "#4dbd74"], $(".stockFoundPieChart").highcharts({
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: !1
			},
			title: !1,
			tooltip: !1,
			credits: {enabled: !1},
			plotOptions: {
				pie: {
					enableMouseTracking: !1,
					innerSize: "60%",
					cursor: "pointer",
					dataLabels: {
						enabled: !1, formatter: function () {
							return this.percentage > 0 ? "<b>" + this.point.name + "</b>:<br />" + Highcharts.numberFormat(this.percentage, 2) + "%" : void 0
						}, style: {color: Highcharts.theme && Highcharts.theme.contrastTextColor || "black"}
					}
				}
			},
			series: [{
				type: "pie",
				name: "Browser share",
				data: [["\u8d85\u5927\u5355\u6d41\u5165", t[0]], ["\u5927\u5355\u6d41\u5165", t[1]], ["\u4e2d\u5355\u6d41\u5165", t[2]], ["\u5c0f\u5355\u6d41\u5165", t[3]], ["\u5c0f\u5355\u6d41\u51fa", t[4]], ["\u4e2d\u5355\u6d41\u51fa", t[5]], ["\u5927\u5355\u6d41\u51fa", t[6]], ["\u8d85\u5927\u5355\u6d41\u51fa", t[7]]]
			}]
		})
	},
	followHandle: function () {
		$(".follow_or_unfollow").on("click", function () {
			StockShow.followOrUnfollowStock(StockShow.stock_id, this)
		}), $(document).on("click", ".j_follow_basket", function () {
			return StockShow.followBasket(isLogined(), $(this).parents("li").attr("basket-id"), $(this)), !1
		})
	},
	followOrUnfollowStock: function (t, e) {
		$(e).hasClass("loading") || ($(e).addClass("loading").html($(e).hasClass("b_btn") ? "\u52a0\u5165\u4e2d" : "\u5220\u9664\u4e2d"), $.post("/ajax/stocks/" + t + "/follow_or_unfollow", {}, function (t) {
			setTimeout(function () {
				t.is_follow ? $(e).removeClass("loading b_btn").addClass("w_btn").html("\u5220\u9664\u81ea\u9009") : $(e).removeClass("loading w_btn").addClass("b_btn").text("\u52a0\u5165\u81ea\u9009")
			}, 200)
		}))
	},
	followBasket: function (t, e, a) {
		t ? $.post("/ajax/baskets/" + e + "/follow", {}, function (t) {
			var e = $(a).next().find(".heart").next();
			1 == t.followed ? ($(a).parent().removeClass().addClass("themeItem favAdded"), e.text(parseInt(e.text()) + 1)) : ($(a).parent().removeClass().addClass("themeItem"), e.text(parseInt(e.text()) - 1))
		}) : CaishuoAlert("\u8bf7\u767b\u5f55\uff01")
	},
	chartTypeButtonClickHandle: function () {
		$("#chart_type_btns li").on("click", function () {
			$(this).addClass("active").siblings().removeClass("active")
		})
	},
	showQuotePricesChartDiv: function () {
		$("#chart_div > div:eq(2)").hide(), $("#kline_time_period").hide(), $("#chart_div > div:eq(1)").show(), $("#time_period").show()
	},
	showKlinesChartDiv: function (t) {
		$("#chart_div > div:eq(1)").hide(), $("#time_period").hide(), $("#chart_div > div:eq(2)").show(), $("#kline_time_period").show(), StockShow.setKlineChart(t), StockShow.displayKlineBtns(t)
	},
	displayKlineBtns: function (t) {
		$("#kline_time_period li").removeClass("active").hide(), $(".kl_btn_" + t).show();
		var e = "week" == t ? 3 : 1;
		$(".kl_btn_" + t + ":eq(" + e + ")").addClass("active")
	},
	timePeriodClickHandle: function () {
		$("#time_period li").on("click", function () {
			$(this).addClass("active").siblings().removeClass("active"), StockShow.clicked_period = !0, StockShow.setChartExtremes(parseInt($(this).attr("data")), StockShow.end_trade_timestamp + 288e5)
		}), $("#kline_time_period li").on("click", function () {
			$(this).addClass("active").siblings().removeClass("active"), StockShow.clicked_period = !0, StockShow.setKlineChartExtremes(parseInt($(this).attr("data")), StockShow.end_trade_timestamp + 288e5)
		})
	},
	setChartExtremes: function (t, e) {
		var a = $("#stock_chart").highcharts();
		a.xAxis[0].setExtremes(t, e)
	},
	setKlineChartExtremes: function (t, e) {
		var a = $("#kline_chart").highcharts();
		a.xAxis[0].setExtremes(t, e)
	},
	clearChartBtnActive: function () {
		this.clicked_period ? this.clicked_period = !1 : ($("#time_period li").removeClass("active"), $("#kline_time_period li").removeClass("active"))
	},
	setChartOpions: function () {
		Highcharts.setOptions({
			lang: {
				rangeSelectorFrom: "",
				rangeSelectorTo: "\u81f3",
				rangeSelectorZoom: "",
				weekdays: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"]
			}
		})
	},
	setKlineChart: function (t) {
		var e = StockShow.getKlineButtonsByType(t), a = "day" == t ? 2592e6 : null;
		$("#kline_chart").html(""), void 0 == StockShow.kline_datas[t] ? $.get("/ajax/stocks/" + StockShow.stock_id + "/klines", {type: t}, function (o) {
			StockShow.kline_datas[t] = StockShow.getOhlcAndVolumeDatas(o), StockShow.drawKlineChart(t, e, a)
		}) : StockShow.drawKlineChart(t, e, a)
	},
	drawKlineChart: function (t, e, a) {
		var o = StockShow.kline_datas[t], i = StockShow.getKlineXaixsIntervalByType(t), n = o.ohlc.length, r = o.ohlc[0].x, s = o.ohlc[n - 1].x;
		if (s - r >= i)var c = null, l = !0; else var c = r + i, l = !1;
		HighStockExt.setKlineVolumeColor(), StockShow.setChartOpions(), $("#kline_chart").highcharts("StockChart", {
			chart: {
				margin: 0,
				marginRight: 18,
				spacingBottom: 10,
				spacingTop: 0
			},
			chart: {style: {fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"', fontSize: "12px"}, panning: !1},
			rangeSelector: {
				enabled: !0,
				buttons: e,
				selected: 0,
				inputEnabled: !1,
				inputDateFormat: "%Y-%m-%d",
				inputStyle: {color: "#1f1f1f", fontWeight: "bold"},
				labelStyle: {color: "#0b1318", fontWeight: "bold"}
			},
			plotOptions: {
				candlestick: {
					color: "#4daf7b",
					lineColor: "#4daf7b",
					upLineColor: "#e4462e",
					upColor: "#e4462e",
					turboThreshold: Number.MAX_VALUE,
					dataGrouping: {enabled: !1, groupPixelWidth: 10, units: StockShow.klineGroupingUnits},
					tooltip: {crosshairs: [!0, !0]}
				},
				column: {
					turboThreshold: Number.MAX_VALUE,
					dataGrouping: {enabled: !1, groupPixelWidth: 10, units: StockShow.klineGroupingUnits},
					colorByPoint: !0
				},
				line: {lineWidth: 1, enableMouseTracking: !1}
			},
			title: {text: null},
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
					afterSetExtremes: function () {
						StockShow.clearChartBtnActive()
					}
				},
				tickInterval: a,
				top: 62,
				ordinal: l,
				max: c
			},
			yAxis: [{
				opposite: !0,
				offset: -20,
				title: {text: null},
				labels: {align: "right"},
				height: 200,
				top: 10,
				gridLineColor: "#F0F0F0",
				tickPixelInterval: 40
			}, {
				opposite: !0,
				offset: -20,
				title: {text: null},
				labels: {align: "right"},
				top: 220,
				height: 60,
				tickPixelInterval: 30,
				gridLineColor: "#F0F0F0"
			}],
			navigator: {height: 30},
			scrollbar: {liveRedraw: !1},
			credits: {enabled: !1},
			tooltip: {
				crosshairs: [!0, !1],
				followPointer: !0,
				positioner: function (t, e, a) {
					var o = this.chart;
					return a.plotX + 2 * t >= o.plotWidth ? {x: a.plotX - t - 30, y: 50} : {x: a.plotX + 50, y: 50}
				},
				shared: !0,
				useHTML: !0,
				borderColor: "#dfdfdf",
				backgroundColor: "rgba(255, 255, 255, 0.85)",
				shadow: !1,
				valueDecimals: 2,
				style: {padding: "12px"},
				formatter: function () {
					var t = '<b style="line-height: 25px;">' + Highcharts.dateFormat("%Y-%m-%d %A", this.x) + "</b>";
					return $.each(this.points, function (e, a) {
						0 == a.series.index ? (t += '<br/><span style="line-height: 25px;">\u5f00\u76d8\u4ef7\uff1a' + a.point.open.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6700\u9ad8\u4ef7\uff1a' + a.point.high.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6700\u4f4e\u4ef7\uff1a' + a.point.low.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6536\u76d8\u4ef7\uff1a' + a.point.close.toFixed(2) + "</span>", t += '<br/><span style="line-height: 25px;">\u6da8\u8dcc\u989d\uff1a' + StockShow.upOrDownStyle(a.point.change, !1) + "</span>", t += '<br/><span style="line-height: 25px;">\u6da8\u8dcc\u5e45\uff1a' + StockShow.upOrDownStyle(a.point.change_percent, !0) + "</span>", StockShow.setKlineInfo(Highcharts.dateFormat("%Y-%m-%d", this.x), a.point.open, a.point.high, a.point.low, a.point.close, StockShow.humanizedVolume(a.point.volume), a.point.change_percent.toFixed(2) + "%", a.point.ma5, a.point.ma10, a.point.ma20, a.point.ma30)) : t += '<br/><span style="line-height: 25px;">\u6210\u4ea4\u91cf\uff1a' + StockShow.humanizedVolume(a.y) + "</span>"
					}), t
				},
				xDateFormat: "%Y-%m-%d"
			},
			series: [{type: "candlestick", name: "AAPL", data: o.ohlc, zIndex: 20}, {
				type: "line",
				name: "ma5",
				data: o.ma5,
				yAxis: 0,
				color: "#D2691E"
			}, {type: "line", name: "ma10", data: o.ma10, yAxis: 0, color: "#6A5ACD"}, {
				type: "line",
				name: "ma20",
				data: o.ma20,
				yAxis: 0,
				color: "#4daf7b"
			}, {type: "line", name: "ma30", data: o.ma30, yAxis: 0, color: "#D02090"}, {
				type: "column",
				name: "Volume",
				data: o.volume,
				yAxis: 1
			}]
		}, function () {
			setTimeout(function () {
				$("#kline_chart .highcharts-button").hide()
			}, 0), StockShow.showKlineInfosDiv()
		});
		var d = o.ohlc[o.ohlc.length - 1];
		StockShow.setKlineInfo(Highcharts.dateFormat("%Y-%m-%d", d.x), d.open, d.high, d.low, d.close, StockShow.humanizedVolume(d.volume), d.change_percent.toFixed(2) + "%", d.ma5, d.ma10, d.ma20, d.ma30)
	},
	setKlineInfo: function (t, e, a, o, i, n, r, s, c, l, d) {
		$("#kline_info span:eq(0)").text(t), $("#kline_info span:eq(1)").text(e.toFixed(2)), $("#kline_info span:eq(2)").text(a.toFixed(2)), $("#kline_info span:eq(3)").text(o.toFixed(2)), $("#kline_info span:eq(4)").text(i.toFixed(2)), $("#kline_info span:eq(5)").text(n), $("#kline_info span:eq(6)").text(r), $("#kline_mainfo span:eq(0)").text(s), $("#kline_mainfo span:eq(1)").text(c), $("#kline_mainfo span:eq(2)").text(l), $("#kline_mainfo span:eq(3)").text(d)
	},
	showKlineInfosDiv: function () {
		$("#kline_info").show(), $("#kline_mainfo").show()
	},
	hideKlineInfosDiv: function () {
		$("#kline_info").hide(), $("#kline_mainfo").hide()
	},
	upOrDownStyle: function (t, e) {
		var a = e ? "%" : "";
		return t >= 0 ? "<span style='color:red;'>" + calPrefix(t) + t.toFixed(2) + a + "</span>" : "<span style='color:#00A600;'>" + calPrefix(t) + t.toFixed(2) + a + "</span>"
	},
	getOhlcAndVolumeDatas: function (t) {
		var e = [], a = [], o = [], n = [], r = [], s = [], c = t.length;
		for (i = 0; i < c; i++) {
			var l = 0 == i ? 0 : t[i].close - t[i - 1].close, d = 0 == i ? 0 : 100 * l / t[i - 1].close, h = StockShow.calKlineMaData(t, i, 5), u = StockShow.calKlineMaData(t, i, 10), p = StockShow.calKlineMaData(t, i, 20), _ = StockShow.calKlineMaData(t, i, 30);
			e.push({
				x: t[i].date,
				y: t[i].high,
				open: t[i].open,
				high: t[i].high,
				low: t[i].low,
				close: t[i].close,
				change: l,
				change_percent: d,
				volume: t[i].volume,
				ma5: h.toFixed(2),
				ma10: u.toFixed(2),
				ma20: p.toFixed(2),
				ma30: _.toFixed(2),
				kline: !0
			}), a.push({
				x: t[i].date,
				y: t[i].volume
			}), o.push([t[i].date, h]), n.push([t[i].date, u]), r.push([t[i].date, p]), s.push([t[i].date, _])
		}
		return {ohlc: e, volume: a, ma5: o, ma10: n, ma20: r, ma30: s}
	},
	calKlineMaData: function (t, e, a) {
		var o = a > e ? 0 : e - a + 1, i = 0, n = 0;
		for (j = o; j <= e; j++)i += t[j].close, n += 1;
		return i / n
	},
	getKlineButtonsByType: function (t) {
		switch (t) {
			case"week":
				return [{type: "month", count: 12, text: "1\u5e74"}];
			case"month":
				return [{type: "year", count: 3, text: "3\u5e74"}];
			default:
				return [{type: "month", count: 3, text: "3\u6708"}]
		}
	},
	getKlineXaixsIntervalByType: function (t) {
		switch (t) {
			case"week":
				return 78624e5;
			case"month":
				return 31536e6;
			default:
				return 2592e6
		}
	},
	humanizedVolume: function (t) {
		return t >= 1e8 ? (t / 1e8).toFixed(2) + "\u4ebf\u80a1" : t >= 1e4 ? (t / 1e4).toFixed(2) + "\u4e07\u80a1" : t.toFixed(2) + "\u80a1"
	},
	setMinutesChart: function () {
		void 0 == StockShow.one_day_minutes_datas.prices ? $.get("/ajax/stocks/" + StockShow.stock_id + "/quote_prices", {}, function (t) {
			StockShow.adjustedDayDatas(t.prices), StockShow.adjustedOneDayMinuteDatas(t.one_day_minutes), StockShow.drawMinutesChart(StockShow.one_day_minutes_datas.prices, StockShow.one_day_minutes_datas.volume, StockShow.navigatorDatas()), HighStockExt.setMinuteChartYaxisMinMax(StockShow.getOneDayMinutesMaxMin()), HighStockExt.actionsAfterMinuteChartRedrawed(), StockShow.adjustedWeekMinutesDatas(t.week_minutes), StockShow.adjustedSixMonthsDatas(t.six_months)
		}) : $("#time_period li:first").trigger("click")
	},
	updateChartSeriesData: function (t, e) {
		var a = StockShow.selectStockChartDatas(t + 10, e);
		if (1 == StockShow.update_stock_chart_datas) {
			var o = $("#stock_chart").highcharts();
			o.series[0].setData(a.prices, !1), o.series[1].setData(a.volume, !1), o.redraw()
		}
		HighStockExt.actionsAfterMinuteChartRedrawed()
	},
	selectStockChartDatas: function (t) {
		var e = {}, a = {min: null, max: null};
		if (StockShow.update_stock_chart_datas = !0, StockShow.show_minutes_time = !1, t >= parseInt($("#time_period li:eq(0)").attr("data")))e = StockShow.one_day_minutes_datas, StockShow.show_minutes_time = !0, StockShow.current_chart_datas_name = "1dm", a = StockShow.getOneDayMinutesMaxMin(), HighStockExt.minute_chart_compare_value = StockShow.stock_previous_close_price; else if (t >= parseInt($("#time_period li:eq(1)").attr("data")))e = StockShow.week_minutes_datas, StockShow.show_minutes_time = !0, StockShow.current_chart_datas_name = "5dm", HighStockExt.minute_chart_compare_value = e.prices[0] ? e.prices[0].y : 0; else if (t >= StockShow.six_months_ago_timestamp)e = StockShow.six_months_datas, StockShow.update_stock_chart_datas = "day-6m" == StockShow.current_chart_datas_name ? !1 : !0, StockShow.current_chart_datas_name = "day-6m", HighStockExt.minute_chart_compare_value = StockShow.firstValueByStartTimestamp(e.prices, t); else {
			e = StockShow.day_datas, StockShow.update_stock_chart_datas = "day" == StockShow.current_chart_datas_name ? !1 : !0, StockShow.current_chart_datas_name = "day";
			var o = StockShow.firstValueByStartTimestamp(e.prices, t);
			null != o && (HighStockExt.minute_chart_compare_value = o)
		}
		return HighStockExt.setMinuteChartYaxisMinMax(a), e
	},
	firstValueByStartTimestamp: function (t, e) {
		for (index in t)if (t[index].x >= e - 10)return t[index].y
	},
	navigatorDatas: function () {
		var t = StockShow.one_day_minutes_datas.prices[0], e = t ? t.y : null, a = [{
			x: StockShow.end_trade_timestamp,
			y: e
		}];
		return StockShow.day_datas.prices.concat(a)
	},
	adjustedDayDatas: function (t) {
		var e = StockShow.getPricesAndVolumeDatas(t);
		StockShow.day_datas.prices = e.prices, StockShow.day_datas.volume = e.volume
	},
	adjustedSixMonthsDatas: function (t) {
		StockShow.six_months_datas = StockShow.getPricesAndVolumeDatas(t)
	},
	adjustedOneDayMinuteDatas: function (t) {
		var e = StockShow.getPricesAndVolumeDatas(t), a = e.prices.length > 0 ? e.prices.slice(-1)[0].x : StockShow.end_trade_timestamp, o = StockShow.minuteDatasAppendedPoints(a);
		StockShow.one_day_minutes_datas.prices = this.exceptDatasAfterEndTime(e.prices).concat(o), StockShow.one_day_minutes_datas.volume = this.exceptDatasAfterEndTime(e.volume).concat(o)
	},
	exceptDatasAfterEndTime: function (t) {
		var e = [];
		return $.each(t, function (a) {
			t[a].x <= StockShow.end_trade_timestamp && e.push(t[a])
		}), e
	},
	minuteDatasAppendedPoints: function (t) {
		var e = Math.floor((StockShow.end_trade_timestamp - t) / 6e4), a = [];
		for (i = 0; i < e; i++)a.push({x: t + 6e4 * (i + 1), y: null});
		return a
	},
	getOneDayMinutesMaxMin: function () {
		var t, e, a = [StockShow.stock_previous_close_price];
		return $.each(StockShow.one_day_minutes_datas.prices, function (t) {
			var e = StockShow.one_day_minutes_datas.prices[t].y;
			null != e && a.push(e)
		}), $.each(a, function (o) {
			(void 0 == t || t < a[o]) && (t = a[o]), (void 0 == e || e > a[o]) && (e = a[o])
		}), {min: e, max: t}
	},
	adjustedWeekMinutesDatas: function (t) {
		StockShow.week_minutes_datas = StockShow.getPricesAndVolumeDatas(t)
	},
	getPricesAndVolumeDatas: function (t) {
		var e = [], a = [], o = t.length;
		for (i = 0; i < o; i++)e.push({x: t[i][0], y: t[i][1]}), a.push({x: t[i][0], y: t[i][2]});
		return {prices: e, volume: a}
	},
	drawMinutesChart: function (t, e, a) {
		StockShow.setChartOpions(), $("#stock_chart").highcharts("StockChart", {
			chart: {
				margin: 0,
				marginTop: 10,
				marginRight: 68,
				marginLeft: 55,
				spacingBottom: 10,
				style: {fontFamily: '"Helvetica Neue", Arial, "Microsoft YaHei"', fontSize: "12px"},
				animation: !1,
				panning: !1
			},
			rangeSelector: {
				enabled: !1,
				inputEnabled: !0,
				inputDateFormat: "%Y-%m-%d",
				buttons: [],
				inputStyle: {color: "#1f1f1f", fontWeight: "bold"},
				labelStyle: {color: "#0b1318", fontWeight: "bold"}
			},
			plotOptions: {
				line: {
					turboThreshold: Number.MAX_VALUE,
					dataGrouping: {enabled: !1},
					connectNulls: !0,
					color: "#4183c4",
					threshold: null,
					lineWidth: 1.2,
					states: {hover: {lineWidth: 1.2}}
				},
				area: {
					turboThreshold: Number.MAX_VALUE,
					dataGrouping: {enabled: !1},
					connectNulls: !0,
					fillColor: {
						linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
						stops: [[0, "rgba(135, 189, 238, 1)"], [1, "rgba(135, 189, 238, 0)"]]
					},
					color: "#87bdee",
					threshold: null
				},
				column: {color: "#d0d0d0", turboThreshold: Number.MAX_VALUE, dataGrouping: {enabled: !1}},
				series: {
					point: {
						events: {
							mouseOver: function () {
								HighStockExt.pointMouseOverAction(this)
							}, mouseOut: function () {
								HighStockExt.pointMouseOutAction(this)
							}
						}
					}
				}
			},
			title: {text: null},
			xAxis: {
				offset: -18,
				gridLineWidth: 1,
				gridLineColor: "#F0F0F0",
				dateTimeLabelFormats: {
					millisecond: "%H:%M",
					second: "%H:%M",
					minute: "%H:%M",
					day: "%m-%d",
					week: "%m-%d",
					month: "%Y/%m",
					year: "%Y\u5e74"
				},
				events: {
					afterSetExtremes: function (t) {
						StockShow.clearChartBtnActive(), StockShow.updateChartSeriesData(t.min, t.max), StockShow.setChartTickInterval(t.min, t.max)
					}, setExtremes: function () {
					}
				},
				minRange: 216e5,
				minTickInterval: 36e5,
				showLastLabel: !0
			},
			yAxis: [{
				opposite: !1, offset: -10, title: {text: null}, labels: {
					align: "right", formatter: function () {
						return ""
					}
				}, height: 200, gridLineColor: "#F0F0F0", tickPixelInterval: 40, tickPositioner: function () {
					return null != this.dataMin && null != this.dataMax ? HighStockExt.calTickPositions(this.dataMin, this.dataMax) : void 0
				}
			}, {
				opposite: !1,
				offset: -10,
				title: {text: null},
				labels: {align: "right"},
				top: 220,
				height: 60,
				gridLineColor: "#F0F0F0",
				tickPixelInterval: 30
			}],
			credits: {enabled: !1},
			navigator: {series: {data: a}, adaptToUpdatedData: !1, height: 30},
			scrollbar: {liveRedraw: !1},
			tooltip: {
				crosshairs: [!1],
				positioner: function () {
					return {x: 50, y: -8}
				},
				shared: !0,
				useHTML: !0,
				shadow: !1,
				borderColor: "rgba(255, 255, 255, 0)",
				backgroundColor: "rgba(255, 255, 255, 0)",
				valueDecimals: 2,
				style: {},
				formatter: function () {
					var t = "";
					return $.each(this.points, function (e, a) {
						if (0 == a.series.index) {
							t += '<span style="margin-left:10px">\u5f53\u524d\u4ef7\uff1a' + a.y.round(HighStockExt.minute_round_digit);
							var o = HighStockExt.valueChangePercent(a.y), i = 0 == o ? "gray" : o > 0 ? "red" : "#00A600";
							t += "<span style='color:" + i + ";'>(", t += o > 0 ? "+" : "", t += o.toFixed(2) + "%)</span>"
						} else t += '<span style="margin-left:10px">\u6210\u4ea4\u91cf\uff1a' + StockShow.humanizedVolume(a.y) + "</span>"
					}), t += '<span style="margin-left:10px"></span>', t += StockShow.show_minutes_time ? "\u65f6\u95f4\uff1a" + Highcharts.dateFormat("%Y-%m-%d %H:%M", this.x) : "\u65f6\u95f4\uff1a" + Highcharts.dateFormat("%Y-%m-%d", this.x)
				}
			},
			series: [{type: "line", name: "minutes", enabledCrosshairs: !0, data: t}, {
				type: "column",
				name: "Volume",
				data: e,
				yAxis: 1
			}]
		}, function () {
			setTimeout(function () {
				$("#stock_chart .highcharts-button").hide()
			}, 0)
		})
	},
	setChartTickInterval: function (t, e) {
		var a, o = $("#stock_chart").highcharts(), i = e - t, n = !0;
		i > 15768e7 ? a = 23652e6 : i > 93312e6 ? a = 15552e6 : i > 31104e6 ? a = 7776e6 : i > 15552e6 ? a = 2592e6 : i > 7776e6 ? a = 18144e5 : i > 2592e6 ? a = 6048e5 : i > 864e6 ? a = 6048e5 : i > 864e5 ? (a = 864e5, n = !1) : a = 36e5, o.xAxis[0].update({
			minTickInterval: a,
			showLastLabel: n
		})
	}
}, StockMinutePrice = {
	AjaxUpdateMinutes: function (t, e) {
		var a = (new Date).getTime();
		a >= t && e + 12e5 >= a && this.updateMinutesChart()
	}, updateMinutesChart: function () {
		$.get("/ajax/stocks/" + StockShow.stock_id + "/minutes", {}, function (t) {
			StockShow.adjustedOneDayMinuteDatas(t.one_day_minutes), ["\u4eca\u65e5"].indexOf($("#time_period .active").text()) >= 0 && $("#time_period .active").trigger("click")
		})
	}, update: function (t) {
		var e = t.timestamp, a = t.price, o = t.volume;
		StockMinutePrice.appendToMinutesPrices({x: e, y: a}), StockMinutePrice.appendToMinutesVolume({
			x: e,
			y: o
		}), ["\u4eca\u65e5", "5\u65e5"].indexOf($("#time_period .active").text()) >= 0 && $("#time_period .active").trigger("click")
	}, appendToMinutesPrices: function (t) {
		StockShow.one_day_minutes_datas.prices = StockMinutePrice.mergeDatas(StockShow.one_day_minutes_datas.prices, t), StockShow.week_minutes_datas.prices = StockMinutePrice.mergeDatas(StockShow.week_minutes_datas.prices, t)
	}, appendToMinutesVolume: function (t) {
		StockShow.one_day_minutes_datas.volume = StockMinutePrice.mergeDatas(StockShow.one_day_minutes_datas.volume, t), StockShow.week_minutes_datas.volume = StockMinutePrice.mergeDatas(StockShow.week_minutes_datas.volume, t)
	}, mergeDatas: function (t, e) {
		return StockMinutePrice.checkDataIsPresent(t, e) ? t : (t.push(e), t.sort(function (t, e) {
			return t.x - e.x
		}))
	}, checkDataIsPresent: function (t, e) {
		return $.each(t, function () {
			return $(this).x == e.x ? !0 : void 0
		}), !1
	}
}, HighStockExt = {
	previous_close_line: null,
	minute_chart: void 0,
	minute_chart_compare_value: null,
	minute_round_digit: 2,
	getMinuteChart: function () {
		return void 0 == HighStockExt.minute_chart && (HighStockExt.minute_chart = $("#stock_chart").highcharts()), HighStockExt.minute_chart
	},
	hackPointerRunPointActions: function () {
		Highcharts.Pointer.prototype.runPointActions = function (t) {
			var e, a, o, i, n, r, s = this, c = s.chart, l = c.series, d = c.tooltip, h = c.hoverPoint, u = c.hoverSeries, p = c.chartWidth, _ = s.getIndex(t);
			if (d && s.options.tooltip.shared && (!u || !u.noSharedTooltip)) {
				for (o = [], i = l.length, n = 0; i > n; n++)l[n].visible && l[n].options.enableMouseTracking !== !1 && !l[n].noSharedTooltip && l[n].singularTooltips !== !0 && l[n].tooltipPoints.length && (a = l[n].tooltipPoints[_], a && a.series && (a._dist = Math.abs(_ - a.clientX), p = Math.min(p, a._dist), o.push(a)));
				for (i = o.length; i--;)o[i]._dist > p && o.splice(i, 1);
				o.length && o[0].clientX !== s.hoverX && (d.refresh(o, t), s.hoverX = o[0].clientX)
			}
			e = u && u.tooltipOptions.followPointer, u && u.tracker && !e ? (a = u.tooltipPoints[_], a && a !== h && a.onMouseOver(t)) : d && e && !d.isHidden && (r = d.getAnchor([{}], t), d.updatePosition({
				plotX: r[0],
				plotY: r[1]
			})), d && !s._onDocumentMouseMove && (s._onDocumentMouseMove = function (t) {
				Highcharts.charts[c.index] && Highcharts.charts[c.index].pointer.onDocumentMouseMove(t)
			}, Highcharts.addEvent(document, "mousemove", s._onDocumentMouseMove)), $.each(c.axes, function (e) {
				c.axes[e].drawCrosshair(t, Highcharts.pick(a, h))
			}), o && o.length > 0 ? o[0].onMouseOver(t) : null
		}
	},
	actionsAfterMinuteChartRedrawed: function () {
		this.drawPreviousClosePriceLine(), this.drawMinuteChartPercentYaxis()
	},
	pointMouseOverAction: function (t) {
		var e = t.series.chart, a = e.renderer, o = e.plotLeft, i = e.plotTop, n = e.plotWidth, r = e.plotHeight, s = t.plotX, c = t.plotY;
		if (t.series.options.enabledCrosshairs) {
			var l = a.g("cross-hairs").attr({zIndex: 7}).add();
			a.path(["M", o, i + c, "L", o + n, i + c]).attr({
				"stroke-width": 1,
				opacity: .5,
				stroke: "black",
				zIndex: 2
			}).add(l), a.path(["M", o + s, i, "L", o + s, i + r]).attr({
				"stroke-width": 1,
				opacity: .5,
				stroke: "black",
				zIndex: 2
			}).add(l), HighStockExt.addYvalueAndComparePercent(t, l, e)
		}
	},
	addYvalueAndComparePercent: function (t, e, a) {
		var o = a.renderer, i = a.plotLeft, n = a.plotTop, r = t.y, s = t.x, c = a.plotWidth, l = t.plotY, d = StockShow.show_minutes_time ? 40 : 70, h = r >= 1e4 ? Math.round(r) : r.round(HighStockExt.minute_round_digit), u = HighStockExt.valueChangePercent(r).toFixed(2) + "%", p = StockShow.show_minutes_time ? Highcharts.dateFormat("%H:%M", s) : Highcharts.dateFormat("%Y-%m-%d", s);
		o.rect(i - 50, n + l - 10, 50, 20, 0).attr({
			"stroke-width": 1,
			stroke: "#dedede",
			fill: "#f0f0f0",
			zIndex: 8
		}).add(e), o.rect(i + c, n + l - 10, 50, 20, 0).attr({
			"stroke-width": 1,
			stroke: "#dedede",
			fill: "#f0f0f0",
			zIndex: 8
		}).add(e), o.rect(i + t.plotX - d / 2, n + 275, d, 20, 0).attr({
			"stroke-width": 1,
			stroke: "#dedede",
			fill: "#f0f0f0",
			zIndex: 8
		}).add(e), o.text(h, i - 5, n + l + 5).attr({
			zIndex: 9,
			"text-anchor": "end"
		}).add(e), o.text(u, i + c + 5, n + l + 5).attr({zIndex: 9}).add(e), o.text(p, i + t.plotX, n + 290).attr({
			zIndex: 9,
			"text-anchor": "middle"
		}).add(e)
	},
	pointMouseOutAction: function () {
		$(".highcharts-cross-hairs").remove()
	},
	addLineByYValue: function (t, e) {
		var a = t.renderer, o = t.plotLeft, i = t.plotWidth, n = HighStockExt.calculateValueYPixelOfMinuteChart(t, e), r = a.path(["M", o, n, "L", o + i, n]).attr({
			fill: "none",
			"stroke-width": 1,
			zIndex: 2,
			opacity: .9,
			stroke: "red",
			dashstyle: "5 8 3 9"
		}).add();
		return r
	},
	drawPreviousClosePriceLine: function () {
		if (this.destroyPreviousClosePriceLine(), "1dm" == StockShow.current_chart_datas_name) {
			var t = $("#stock_chart").highcharts();
			this.previous_close_line = this.addLineByYValue(t, StockShow.stock_previous_close_price)
		}
	},
	destroyPreviousClosePriceLine: function () {
		null !== this.previous_close_line && void 0 !== this.previous_close_line.d && this.previous_close_line.destroy()
	},
	setMinuteChartYaxisMinMax: function (t) {
		this.getMinuteChart().yAxis[0].update(t)
	},
	drawMinuteChartPercentYaxis: function () {
		$(".highcharts-percent-yaxis").remove();
		var t = this.getMinuteChart(), e = t.renderer, a = e.g("percent-yaxis").attr({zIndex: 7}).add(), o = t.yAxis[0].tickPositions;
		$.each(o.slice(0, o.length - 1), function (i) {
			var n = HighStockExt.valueChangePercent(o[i]), r = HighStockExt.calculateValueYPixelOfMinuteChart(t, o[i]), s = 0 == n ? "gray" : n >= 0 ? "red" : "#00A600";
			e.text(o[i], 50, r).css({
				color: s,
				"text-anchor": "end"
			}).add(a), e.text(n.toFixed(2) + "%", 680, r).css({color: s}).add(a)
		});
		var i = t.yAxis[1].labelGroup.element.children || [];
		$.each(i, function (t) {
			var o = i[t].attributes.y.value;
			e.text(i[t].innerHTML, 680, o).add(a)
		})
	},
	calculateValueYPixelOfMinuteChart: function (t, e) {
		var a = 200, o = t.yAxis[0], i = o.min, n = o.max, r = t.plotTop;
		return (n - e) * a / (n - i) + r
	},
	valueChangePercent: function (t) {
		t = HighStockExt.invertValueString(t).toFixed(HighStockExt.minute_round_digit);
		var e = this.minute_chart_compare_value;
		return 0 == e ? 0 : 100 * (t - e) / e
	},
	invertValueString: function (t) {
		var e = parseFloat(t);
		return /.*k$/.test(t) ? 1e3 * e : e
	},
	setKlineVolumeColor: function () {
		var t = Highcharts.seriesTypes.column.prototype.drawPoints;
		Highcharts.seriesTypes.column.prototype.drawPoints = function () {
			for (var e = Highcharts.merge, a = this, o = this.chart, i = a.points, n = i.length; n--;) {
				var r = o.series[0].points[n];
				if (void 0 != r && 1 == r.kline) {
					var s = r.open <= r.close ? "#e4462e" : "#4daf7b", c = e(a.pointAttr);
					c[""].fill = s, c.hover.fill = Highcharts.Color(s).brighten(.1).get(), c.select.fill = s, i[n].pointAttr = c
				}
			}
			t.call(this)
		}
	},
	calTickPositions: function (t, e) {
		var a, o, i, n, r = [];
		a = Math.min(this.minute_chart_compare_value, t), o = Math.max(this.minute_chart_compare_value, e), n = this.adjustPositionIncrement(o, a), i = this.adjustMinuteCompareValue(n);
		for (var s = AccMath.sub(i, n); s + n > a; s = AccMath.sub(s, n))r.push(s);
		for (var s = i; o >= s - n; s = AccMath.add(s, n))r.push(s);
		return i == r.sort(function (t, e) {
			return t - e
		})[r.length - 1] && r.push(AccMath.add(i, n)), r.sort(function (t, e) {
			return t - e
		})
	},
	adjustPositionIncrement: function (t, e) {
		var a, o, i = [1, 2, 2.5, 5, 10], n = (t - e) / 4;
		if (n >= 1)a = n.toString().split(".")[0].length - 1, o = Math.pow(10, a); else {
			var r = n.toString().split(".")[1] || "0";
			a = r.length - parseInt(r).toString().length + 1, o = Math.pow(.1, a)
		}
		for (index in i) {
			var s = (i[index] * o).round(a + 1);
			if (s >= n) {
				n = s;
				break
			}
		}
		return n
	},
	adjustMinuteCompareValue: function (t) {
		var e = t >= .1 ? 2 : 3;
		return this.minute_round_digit = e, this.minute_chart_compare_value = this.minute_chart_compare_value.round(e), this.minute_chart_compare_value
	}
}, StockRealtime = {
	rtHeartbeat: function () {
		var t = (new Date).getTime();
		t >= StockShow.start_trade_timestamp_of_utc && t <= StockShow.end_trade_timestamp_of_utc + 12e5 && $.get("/ajax/stocks/" + StockShow.stock_id + "/rt.js")
	}, update: function (t) {
		var e = parseFloat(t.last), a = parseInt(t.volume), o = parseFloat(t.change_from_previous_close), i = parseFloat(t.percent_change_from_previous_close), n = accounting.formatMoney(parseFloat(t.bid_prices), ""), r = StockRealtime.formatVolume(parseInt(t.bid_sizes)), s = accounting.formatMoney(parseFloat(t.offer_prices), ""), c = StockRealtime.formatVolume(parseInt(t.offer_sizes)), l = accounting.formatMoney(parseFloat(t.low), ""), d = accounting.formatMoney(parseFloat(t.high), ""), h = accounting.formatMoney(parseFloat(t.low52_weeks), ""), u = accounting.formatMoney(parseFloat(t.high52_weeks), ""), p = t.rt_logs, _ = parseFloat($("#stock_realtime_price em").text()), m = o > 0 ? "plus" : "mins", k = o > 0 ? "+" : "", f = parseFloat($("#rt_bid").text().replaceAll(",", "")), S = parseFloat(t.bid_prices) > f ? "plus" : "mins", g = $("#rt_bid_size").text(), v = parseFloat($("#rt_offer").text().replaceAll(",", "")), x = parseFloat(t.offer_prices) > v ? "plus" : "mins", w = $("#rt_offer_size").text();
		if (e != _) {
			var y = e > _ ? "plus" : "mins", b = accounting.formatMoney(e, "");
			$("#stock_realtime_price em").attr("class", m).text(b), $("#stock_realtime_price").backgroundAnim(y);
			var M = k + accounting.formatMoney(o, "");
			M += "(" + k + accounting.formatMoney(i, "") + "%)", $("#stock_realtime_updown em").attr("class", m).text(M), $("#stock_realtime_updown").backgroundAnim(y)
		}
		if (parseFloat(t.bid_prices) != f)$("#rt_bid").text(n), $("#rt_bid").backgroundAnim(S), $("#rt_bid_size").text(r); else if (r != g) {
			var C = StockRealtime.compareVolume(r, g) ? "plus" : "mins";
			$("#rt_bid_size").text(r), $("#rt_bid_size").backgroundAnim(C)
		}
		if (parseFloat(t.offer_prices) != v)$("#rt_offer").text(s), $("#rt_offer").backgroundAnim(x), $("#rt_offer_size").text(c); else if (c != w) {
			var T = StockRealtime.compareVolume(c, w) ? "plus" : "mins";
			$("#rt_offer_size").text(c), $("#rt_offer_size").backgroundAnim(T)
		}
		$("#day_low").text(l), $("#day_high").text(d), $("#year_low").text(h), $("#year_high").text(u), $("#StockTradeInfo li").remove(), $.each(p, function (t) {
			var e, a = p[t].split(","), o = a[1], i = StockRealtime.formatVolume(parseInt(a[2])), n = a[3].split(" ")[1];
			e = "<li><span>" + n + "</span><span>" + o + "</span><span>" + i + "</span></li>", $("#StockTradeInfo").append(e)
		}), this.updateKline(e, parseFloat(t.high), parseFloat(t.low), a)
	}, formatVolume: function (t) {
		return t >= 1e8 ? accounting.formatMoney(t / 1e8, "") + "\u4ebf" : t >= 1e4 ? accounting.formatMoney(t / 1e4, "") + "\u4e07" : accounting.formatNumber(t)
	}, compareVolume: function (t, e) {
		return t.endsWith("\u4e07") && !e.endsWith("\u4e07") ? !0 : !t.endsWith("\u4e07") && e.endsWith("\u4e07") ? !1 : parseFloat(t.replaceAll(",", "")) > parseFloat(e.replaceAll(",", ""))
	}, drawRealtimePointToChart: function (t, e) {
		var a = new Date(e + " +0000").getTime(), o = new Date, i = o.getTime() - 6e4 * o.getTimezoneOffset() - 6e4;
		if (i > a)return !1;
		if (console.log(i), console.log(a), $("#time_period li:eq(0)").hasClass("active")) {
			var n = $("#stock_chart").highcharts();
			n.renderer, StockRealtime.findLatestPointXAxisOfPrice(n), HighStockExt.calculateValueYPixelOfMinuteChart(n, t)
		}
	}, findLatestPointXAxisOfPrice: function (t) {
		var e = t.series[0].data, a = e[0];
		return $.each(e, function (t) {
			e[t].x > a.x && null != e[t].y && (a = e[t])
		}), a.plotX + t.plotLeft + 2.6
	}, updateKline: function (t, e, a, o) {
		this.updateKlineByType("day", t, e, a, o), this.updateKlineByType("week", t, e, a, o), this.updateKlineByType("month", t, e, a, o)
	}, updateKlineByType: function (t, e, a, o, i) {
		var n = StockShow.kline_datas[t];
		if (n) {
			var r = n.ohlc, s = r[r.length - 1], c = r[r.length - 2], l = n.volume, d = l[l.length - 1], h = (new Date).getTime();
			if (!(s.x + 864e5 < h)) {
				s.high = Math.max(a, s.high), s.low = Math.min(o, s.low), s.close = e, c && (s.change = s.close - c.close, s.change_percent = 100 * s.change / c.close), "day" == t && (d.y = i);
				var u = {
					day: 1,
					week: 2,
					month: 3
				}, p = u[t], _ = $("#chart_type_btns .active").index(), m = $("#kline_chart").highcharts(), k = m.series[0].points, f = k[k.length - 1], S = m.series[5].points, g = S[S.length - 1], v = f.open < f.close ? "#e4462e" : "#4daf7b";
				p == _ && f.x == s.x && (g.update({y: d.y, color: v}), f.update({
					high: s.high,
					low: s.low,
					close: s.close,
					change: s.change,
					change_percent: s.change_percent
				}))
			}
		}
	}
}, Stock = {
	init: function () {
		"" != trade_param && Stock.toggleTrade(), Stock.pageHandler()
	}, toggleTrade: function (t) {
		$("#trade_div").toggle(), "true" != $(t).attr("loaded") && ($(t).attr("loaded", "true"), Stock.loadTradeContent(gon.account_id))
	}, loadTradeContent: function (t) {
		var e = t ? {account_id: t} : {};
		$.get("/stocks/" + gon.stock_id + "/trade", e, function () {
			Order.init(), $("#trade_div").show(), Stock.changeTradeType()
		})
	}, changeTradeType: function () {
		"sell" == trade_param && ($("#buy_sell_options input:last").trigger("click"), Order.sellStock($("#buy_sell_options input:last")))
	}, loadCanSellShares: function (t) {
		$.get("/stocks/" + gon.stock_id + "/trade_infos", {account_id: t}, function (e) {
			var a = parseInt(e.shares);
			$("input[name=trade_radio][value=sell]").attr("stock_total", a), $("input[name=trade_radio][value=sell]").is(":checked") && $(".adjustCount:eq(1) input").val(a).attr("max", a).attr("min", a > 0 ? 100 : 0), $("#trading_account_id").val(t), $(".tradeInfo>em:first").text(e.broker_info), $(".tradeInfo span:eq(0) i:first").text(accounting.formatMoney(e.usable_cash, e.unit)).attr("data", e.usable_cash), $(".tradeInfo span:eq(1) i:first").text(accounting.formatMoney(e.total_cash, e.unit)).attr("data", e.total_cash), e.is_pt ? ($("#order_type").parent().find(".selectoption li[data-value!=0]").addClass("hide"), $("#order_type").parent().find(".selectoption li[data-value=0]").trigger("click")) : $("#order_type").parent().find(".selectoption li").removeClass("hide"), Order.updateTotalMoney(), Account.checkLogined(t)
		})
	}, pageHandler: function () {
		$(".compare_title .asSwitchBtn li").click(function () {
			var t = $(this).attr("data-target");
			$(this).addClass("active").siblings().removeClass(), $("." + t).addClass("fixtop").fadeIn(function () {
				$(this).removeClass("fixtop")
			}), $("." + $(this).siblings().attr("data-target")).fadeOut()
		}), $("#StockInfoSwitch .asSwitchBtn li").click(function () {
			$(this).addClass("active").siblings().removeClass(), $("#StockBasicInfo").toggle(0 == $(this).index() && $(this).hasClass("active")), $("#StockTradeInfo").toggle(1 == $(this).index() && $(this).hasClass("active"))
		}), $(".tabSwitch").tabso({
			cntSelect: ".MultiTabDisplayArea",
			tabEvent: "click"
		}), $("*[data-click-tip], *[data-hover-tip]").ClickHoverTip($("#BubbleBox"))
	}
};
!function (t) {
	t.fn.drawsquare = function () {
		return t(this).each(function () {
			t(this).find("div.chart").each(function () {
				var e = t(this).children().eq(0), a = t(this).children().eq(1), o = parseFloat(e.attr("data-value")), i = parseFloat(a.attr("data-value")), n = o * i;
				if (n > 0 || 0 > n) {
					var r = Math.abs(o) / (Math.abs(o) + Math.abs(i));
					return e.height(100 * r + "%"), a.height(100 * (1 - r) + "%"), 0 > o && (a.css("top", 0), e.addClass("upsidedown")), void(0 > i && (e.css("top", 0), a.addClass("upsidedown")))
				}
				0 == o && e.height("10%"), 0 == i && a.height("10%"), isNaN(o) && isNaN(i) || (isNaN(o) && 0 != i ? (e.height("0"), a.height("100%"), 0 > i && (e.css("top", 0), a.addClass("upsidedown"))) : isNaN(i) && 0 != o && (e.height("100%"), a.height("0"), 0 > o && (a.css("top", 0), e.addClass("upsidedown"))))
			})
		})
	}
}(jQuery);