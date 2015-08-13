function kChartsDay(){
	$.getJSON("getStockDaily.json?stockcode=" + stockcode, function (data) {
		var ohlc = [];
		var volume = [];
		var MA5Array = [];
		var MA10Array = [];
		var MA20Array = [];
		var MA30Array = [];
		var dataLength = data.length;
		var groupingUnits = [
			['second', [1]],
			['minute', [1]],
			['hour', [1]],
			['day', [1]],
			['week', [1]],
			['month', [1]],
			['year', [1]]
		];
		var i = 0;
		var nowDate = data[0][1];
		for (i; i < dataLength; i += 1) {
			var date = data[i][0];
			var starttime = date.replace(new RegExp("-", "gm"), "/");
			var starttimeHaoMiao = (new Date(starttime)).getTime();
			ohlc.push([
				starttimeHaoMiao,
				Math.round(data[i][1] * 100) / 100,
				Math.round(data[i][2] * 100) / 100,
				Math.round(data[i][3] * 100) / 100,
				Math.round(data[i][4] * 100) / 100,
			]);
			volume.push([
				starttimeHaoMiao,
				data[i][5]
			]);
			if (i >= 4) {
				var ma5 = 0.00;
				for (var j = 0; j < 5; j++) {
					ma5 += parseFloat(data[i - j][4]);
				}
				MA5Array.push([
					starttimeHaoMiao,
					Math.round(parseFloat(ma5 / 5) * 100) / 100
				]);
			}
			if (i >= 9) {
				var ma10 = 0.00;
				for (var j = 0; j < 10; j++) {
					ma10 += parseFloat(data[i - j][4]);
				}
				MA10Array.push([
					starttimeHaoMiao,
					Math.round(parseFloat(ma10 / 10) * 100) / 100
				]);
			}
			if (i >= 19) {
				var ma20 = 0.00;
				for (var j = 0; j < 20; j++) {
					ma20 += parseFloat(data[i - j][4]);
				}
				MA20Array.push([
					starttimeHaoMiao,
					Math.round(parseFloat(ma20 / 20) * 100) / 100
				]);
			}
			if (i >= 29) {
				var ma30 = 0.00;
				for (var j = 0; j < 30; j++) {
					ma30 += parseFloat(data[i - j][4]);
				}
				MA30Array.push([
					starttimeHaoMiao,
					Math.round(parseFloat(ma30 / 30) * 100) / 100
				]);
			}
		}
	
		$('#kChart-day').highcharts('StockChart', {
			rangeSelector: {
				buttons: [{
					type: 'all',
					text: '全部'
				}, {
					type: 'year',
					count: 3,
					text: '3年'
				}, {
					type: 'year',
					count: 1,
					text: '1年'
				}, {
					type: 'ytd',
					text: '今年'
				}, {
					type: 'month',
					count: 6,
					text: '6月'
				}, {
					type: 'month',
					count: 3,
					text: '3月'
				}, {
					type: 'month',
					count: 1,
					text: '1月'
				}],
				buttonTheme: {
					fill: 'none',
					stroke: 'none',
					'stroke-width': 0,
					r: 0,
					style: {
						display: 'block',
						color: '#6d6f71',
						fontWeight: 'normal',
						fontSize: '12px',
						width: '100px',
						height: '30px',
						padding: '0 20px',
						border: '1px solid #d5d7d9',
						background: '#ff0000',
						fill: 'none'
					},
					states: {
						hover: {},
						select: {
							fill: '#039',
							style: {
								color: 'white'
							}
						}
					}
				},
				selected: 5,
				enabled: true,
				inputEnabled: false
			},
			title: {
				text: ''
			},
			xAxis: {
				labels: {
					formatter: function () {
	
						return Highcharts.dateFormat('%m-%d', this.value);
					}
				},
				top: 70,
				tickPixelInterval: 100
			},
			yAxis: [
				{//上方柱状图
					categories: [nowDate],
					minTickInterval: 2.5,
					height: 210,
					tickPixelInterval: 40,
					lineWidth: 1,
					opposite: false,
					offset: 1
				}, {//第1根Y抽
	
				}, {//第2根Y轴
	
				}, {//第3根Y抽
	
				}, {//第4根Y抽
	
				}, {
					labels: {
						formatter: function () {
							return this.value / 10000 + "万";
						}
					},
					title: {
						text: ''
					},
					top: 262,
					height: 60,
					tickPixelInterval: 20,
					offset: 0,
					lineWidth: 2
				}
			],
			series: [
				{
					type: 'candlestick',
					name: ' ',
					data: ohlc,
					yAxis: 0,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'line',
					name: '<b style="color:#D2691E">' + 'MA5' + '</b>',
					data: MA5Array,
					lineColor: '#D2691E',
					yAxis: 0,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'line',
					name: '<b style="color:#6A5ACD">' + 'MA10' + '</b>',
					data: MA10Array,
					lineColor: '#6A5ACD',
					yAxis: 0,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'line',
					name: '<b style="color:#4daf7b">' + 'MA20' + '</b>',
					data: MA20Array,
					lineColor: '#4daf7b',
					yAxis: 0,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'line',
					name: '<b style="color:#D02090">' + 'MA30' + '</b>',
					data: MA30Array,
					lineColor: '#D02090',
					yAxis: 0,
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'column',
					name: '成交量',
					data: volume,
					yAxis: 5,
					dataGrouping: {
						units: groupingUnits
					}
				}
			],
			credits: {
				enabled: false
			},
			tooltip: {
				enabled: true,
				formatter: function () {
					var s = '<b>' + Highcharts.dateFormat(' %Y-%m-%d', this.x) + '</b>';
					$.each(this.points, function () {
						s += '<br/>' + '<tspan  style="fill:' + this.series.color + ';" x="8" dy="16">●</tspan>' + this.series.name + ':' + Math.round(this.y * 100) / 100;
					});
					return s;
				},
				crosshairs: {
					dashStyle: 'dash',
					color: 'red',
				}
			},
			scrollbar: {
				height: 15
			},
			navigator: {
				height: 25
			},
			plotOptions: {
				candlestick: {
					color: '#33AA11', //下降块颜色
					lineColor: '#33AA11', //下降块线条颜色
					upColor: '#DD2200', //上升块颜色
					upLineColor: "#DD2200" //上升块线条颜色
				},
				series: {
					lineWidth: 1,
					states: {
						hover: {
							lineWidth: 1
						}
					},
					marker: {
						enabled: false,
						states: {
							hover: {
								enabled: false
							}
						}
					}
				}
			}
		});
	});
	
	//每隔20秒自动调用方法，实现图表的实时更新
	var mydate = new Date();
	myHours = mydate.getHours();
	if (stock_status != 0) {
		if ((myHours >= 9 && myHours < 12 ) || (myHours >= 13 && myHours < 15)) {
			var t = setInterval(function () {
				kChartsDay()
			}, 50000);
		}
	}
}