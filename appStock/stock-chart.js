$(function () {
	Highcharts.setOptions({
		global: {
			useUTC: false //关闭文件默认时区，采用数据时间显示
		},
		lang: {
			contextButtonTitle: "图表导出菜单",
			decimalPoint: ".",
			downloadJPEG: "下载JPEG图片",
			downloadPDF: "下载PDF文件",
			downloadPNG: "下载PNG文件",
			downloadSVG: "下载SVG文件",
			drillUpText: "返回 {series.name}",
			loading: "加载中",
			months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
			noData: "没有数据",
			numericSymbols: ["千", "兆", "G", "T", "P", "E"],
			printChart: "打印图表",
			resetZoom: "恢复缩放",
			resetZoomTitle: "恢复图表",
			shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			thousandsSep: ",",
			weekdays: ["星期一", "星期二", "星期三", "星期三", "星期四", "星期五", "星期六", "星期天"]
		}
	});
});
function fsStock() {
	$.getJSON("candlestick-and-volume.json", function (result) {
		// split the data set into ohlc and volume
//	stock_status =
		var data = result.data;
		var ohlc = [],
			test = [],
			volume = [],
			dataLength = data.length;
		var minTime = data[0][0];
		console.log(minTime);
		var maxTime = minTime + 19794000;
		console.log(maxTime);
		console.log(stock_status);
		if (stock_status == 0) {
//		  data = [data[0][0],data[0][2],data[0][2],0];
			ohlc.push([
				data[0][0], // the date  x
				data[0][2]  // the data  y
			]);
			volume.push([
				data[0][0], // the date	 x
				data[0][2]	// the data  y
			]);
			test.push([
				data[0][0], // the date	 x
				0	// the data  y
			])
		} else {
			for (i = 0; i < dataLength; i++) {
				ohlc.push([
					data[i][0], // the date  x
					data[i][1]  // the data  y
				]);
				volume.push([
					data[i][0], // the date	 x
					data[dataLength - 1][2]	// the data  y
				]);
				var tdV = data[i][3];
				if (i > 0) {
					tdV = data[i][3] - data[i - 1][3];
				}
				if (tdV < 0) {
					tdV = 0;
				}
				test.push([
					data[i][0], // the date	 x
					tdV	// the data  y
				])
			}
		}
//	  console.log(data);
		// set the allowed units for data grouping
		var groupingUnits = [
			['minute', [1]],
			['hour', [1]],
			['day', [1]],
			['week', [1]]
		];

		// create the chart minute
		$('#line-Chart').highcharts('StockChart', {
			rangeSelector: {
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
				selected: 0,
				enabled: false,
				inputEnabled: false
			}, title: {
				text: ''
			}, chart: {
				alignTicks: false,
				type: 'line'
			}, xAxis: {
				endOnTick: true,
				//startOnTick:true,
				max: maxTime,
				min: minTime,
				labels: {
					formatter: function () {
						return Highcharts.dateFormat('%H:%M', this.value);
					}
				},
				//top: 300,
				ordinal: false,
				tickPixelInterval: 140,
				//minRange: 21600000,
				//minRange: 19800000,
				//   minTickInterval: 3600000,
				showLastLabel: !0

				//offset: -18,
				// gridLineWidth: 1,
				// gridLineColor: "#F0F0F0",
				// dateTimeLabelFormats: {
				//     millisecond: "%H:%M",
				//     second: "%H:%M",
				//     minute: "%H:%M",
				//     day: "%m.%d",
				//     week: "%m.%d",
				//     month: "%Y/%m",
				//     year: "%Y\u5e74"
				// },
//        events: {
//            afterSetExtremes: function() {
//            	var chart = $('#line-Chart').highcharts();
//                var index = data.length-1;
////                console.log(data[index][0],data[index][1]);
////                console.log(data[index][0],data[index][3]);
//                chart.xAxis.max();
//                chart.series[0].addPoint([data[index][0],data[index][1]],true,true);
//                chart.series[1].addPoint([data[index][0],data[index][3]],true,true);
//            	console.log('Set extremes to ' + minTime + ', ' + e.max);
////            	var t = chart.pointer.normalize();
////                MarketIndexChart.updateChartSeriesData(minTime, maxTime), MarketIndexChart.setChartTickInterval(minTime, maxTime)
//            },
//            setExtremes: function() {}
//        },
				//minRange: 198e5,
				//minTickInterval: 36e5,
				//showLastLabel: !0
			},
			yAxis: [{
				plotLines: [{
					color: 'red',           //线的颜色，定义为红色
					dashStyle: 'ShortDot',     //默认值，这里定义为实线
					value: 0,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
					width: 2                //标示线的宽度，2px
				}],
				labels: {
					formatter: function () {
						return "";
						//return (this.value > 0 ? ' + ' : '') + this.value + '%';
					},
					style: {
						color: '#89A54E'
					}
				},

				height: '75%',
				tickPixelInterval: 60,
				lineWidth: 0,
				opposite: true, //y轴位置  left  right
				offset: 0, //y轴与数据区位置
				tickPositioner: function () {
					// return null != this.dataMin && null != this.dataMax ? HighStockExt.calTickPositions(this.dataMin, this.dataMax) : void 0
				}
			},
				{
					labels: {
						formatter: function () {
							var a = this.value / 100;
							var b = -past_back_price * a;
							var c = past_back_price - b;
							return Math.round(c * 100) / 100;

						},
						style: {
							color: '#89A54E'
						}
					},
					linkedTo: 0,
					height: '75%',
					gridLineWidth: 0,
					tickPixelInterval: 60,
					lineWidth: 0,
					opposite: false, //y轴位置  left  right
					offset: 0 //y轴与数据区位置
				},
				{
					labels: {
						formatter: function () {
							return this.value / 10000 + "万";
						},
						style: {
							color: '#000000'
						}
					},
					title: {
						text: ''
					},
					top: '80%',
					height: '10%',
					lineWidth: 2,
					tickPixelInterval: 25,
					opposite: true, //y轴位置  left  right
					offset: 0 //y轴与数据区位置
				}],
			series: [
				{
					type: 'spline',
					name: '当前价格',
					data: ohlc,
					animation: true,
					color: '#4572A7',
					yAxis: 0,
					compare: 'percent',
					dataGrouping: {
						units: groupingUnits
					}
				},
				/* {
				 type: 'line',
				 name: '当前价格',
				 data: ohlc,
				 animation:true,
				 color: '#4572A7',
				 yAxis: 1,
				 compare: 'percent',
				 dataGrouping: {
				 units: groupingUnits
				 }
				 },*/
				{
					type: 'column',
					name: '成交量',
					data: test,
					yAxis: 2,
					dataGrouping: {
						units: groupingUnits
					}
				}],
			credits: {
				enabled: false
			},
			tooltip: {
				enabled: true,
				formatter: function () {
					var s = '<b>' + Highcharts.dateFormat(' %Y-%m-%d %H:%M:%S', this.x) + '</b>';
					$.each(this.points, function () {
						s += '<br/>' + '<tspan  style="fill:' + this.series.color + ';" x="8" dy="16">●</tspan>' + this.series.name + ':' + Math.round(this.y * 100) / 100;
					});
					return s;
				},
//        crosshairs: [true, true],   /*x+y数据标尺*/
				crosshairs: {
					dashStyle: 'dash',
					/*数据 标尺线样式*/
					color: 'red'
				}
			},
			/*下部时间拖拉选择*/
			navigator: {
				enabled: false, /*关闭时间选择*/
				series: {
					data: ohlc
				},
				baseseries: 10
			},
			scrollbar: {
				enabled: false /*关闭下方滚动条*/
			},
			/*数据点设置*/
			plotOptions: {
				series: {
					marker: {
						enabled: false,
						/*数据点是否显示*/
						radius: 5
						/*数据点大小px*/
						//fillColor:'#ff3300'                                /*数据点颜色*/
					},
					dataLabels: {
						enabled: false,
						/*在数据点上显示数值*/
						format: '{y}'
					}
					//enableMouseTracking: false   /*关闭tip层*/
				}
			}
		});
		function getForm() {
			$.getJSON("getStockTiming.json?stockcode=" + stockcode + "&day=1", function (data) {
				var chart = $('#line-Chart').highcharts();
				var index = data.length - 1;
//            console.log(data[index][0],data[index][1]);
//            console.log(data[index][0],data[index][3]);
				chart.series[0].addPoint([data[index][0], data[index][1]], true, true);
				chart.series[1].addPoint([data[index][0], data[index][3]], true, true);
			});
		}

		$(document).ready(function () {
			//每隔20秒自动调用方法，实现图表的实时更新
			var mydate = new Date();
			myHours = mydate.getHours();
			if (stock_status != 0) {
				if ((myHours >= 9 && myHours < 12 ) || (myHours >= 13 && myHours <= 15)) {
					window.setInterval(getForm, 50000);
				}
			}
		});
	})
}
fsStock();
function checkLogin(){
	var url = "islogin.json";
	var flag = 0;

	$.ajax({
		type:"post",
		url:url,
		async:false,
		success:function(data){
			data=eval("("+data+")");
			if(data.success==false){
				passport.sdk.login('moer',window.location.href,'');
				flag = 0;
			}else{
				flag = 1;
			}
		}
	});
	return flag;
}