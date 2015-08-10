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


var avg_pxyAxisMin;
var avg_pxyAxisMax;
var percentageyAxisMin;
var percentageyAxisMax;
var volume_yAxisMin;
var volume_yAxisMax;
var red = "#ff0000";
var blue = "#00a800";
var isFirstLineColorflag = true;
//保存昨收数据
var yesterdayClose;

function fsStock() {
	$.getJSON("getStockTiming.json?stockcode=" + stockcode + "&day=1", function (data) {
		// split the data set into ohlc and volume
		//今开
		var open_px = data[0][1];
		//昨收
		var preclose_px = data[0][2];
		yesterdayClose = preclose_px;
		isFirstLineColorflag = open_px > preclose_px;
		var date = new Date(data[0][0]);
//		date = date / 1000;
		var result = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
		console.log("begin=" + begin);
		//上午开始时间
		var minStr = result + " " + begin;
		var d1 = new Date(minStr);
		var minTime = d1.getTime();
		//上午中间时间
		var am_midStr = result + " " + am_mid;
		var d2 = new Date(am_midStr);
		var am_midTime = d2.getTime();
		//上午结束时间
		var am_lastStr = result + " " + am_last;
		var d3 = new Date(am_lastStr);
		var am_lastTime = d3.getTime();
		//下午中间时间
		var pm_midStr = result + " " + pm_mid;
		var d4 = new Date(pm_midStr);
		var pm_midTime = d4.getTime();
		//下午结束时间
		var maxStr = result + " " + end;
		var d5 = new Date(maxStr);
		var maxTime = d5.getTime();
		var nowDate = data[0][1];
		var ohlc = [],
			test = [],
			volume = [],
			dataLength = data.length;
		if (stock_status == 0) {
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
			for (var i = 0; i < dataLength; i++) {

				var business_amount = data[i][2];
				var columnColor = red;

				if (i == 0) {//第一笔的 红绿柱 判断依据是根据 今天开盘价与昨日收盘价比较
					if (isFirstLineColorflag == false) {
						columnColor = blue;
					}
					avg_pxyAxisMin = data[i][1];
					avg_pxyAxisMax = data[i][1];
					percentageyAxisMin = Number(100 * (data[i][1] / yesterdayClose - 1));
					percentageyAxisMax = Number(100 * (data[i][1] / yesterdayClose - 1));
					volume_yAxisMin = data[i][3];
					volume_yAxisMax = data[i][3];
				}
				else {
					//除了第一笔，其它都是  返回的 last_px 与前一个对比
					if (data[i - 1][1] - data[i][1] > 0) {
						columnColor = blue;
					}
					business_amount = data[i][2] - data[i - 1][2];
				}
				avg_pxyAxisMin = avg_pxyAxisMin > data[i][1] ? data[i][1] : avg_pxyAxisMin;
				avg_pxyAxisMax = avg_pxyAxisMax > data[i][1] ? avg_pxyAxisMax : data[i][1];
				percentageyAxisMin = percentageyAxisMin > Number(100 * (data[i][1] / yesterdayClose - 1)) ? Number(100 * (data[i][1] / yesterdayClose - 1)) : percentageyAxisMin;
				percentageyAxisMax = percentageyAxisMax > Number(100 * (data[i][1] / yesterdayClose - 1)) ? percentageyAxisMax : Number(100 * (data[i][1] / yesterdayClose - 1));
				volume_yAxisMin = volume_yAxisMin > business_amount ? business_amount : volume_yAxisMin;
				volume_yAxisMax = volume_yAxisMax > business_amount ? volume_yAxisMax : business_amount;


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
		appendTimeMessage(ohlc, volume, data);
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
				buttons: [{
					type: 'day',
					count: 1,
					text: '今日'
				}
				],
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
				enabled: true,
				inputEnabled: false
			}, title: {
				text: ''
			}, chart: {
				alignTicks: false,
				type: 'line'
			},
			xAxis: {
				endOnTick: true,
				showFirstLabel: true,
				showLastLabel: true,
				scrollbar: {enabled: true},
				labels: {
					style: {         //字体样式
						font: 'normal 5px Verdana, sans-serif'
					},
					formatter: function () {
						var returnTime = Highcharts.dateFormat('%H:%M ', this.value);
						if (returnTime == "11:30 ") {
							return "11:30/13:00";
						}
						return returnTime;
					}
				},
				tickPositioner: function () {
					return [minTime, am_midTime, am_lastTime, pm_midTime, maxTime];
				},
				gridLineWidth: 1

			},
			yAxis: [{
				plotLines: [{
					color: 'red',           //线的颜色，定义为红色
					dashStyle: 'ShortDot',     //默认值，这里定义为实线
					value: yesterdayClose,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
					width: 2                //标示线的宽度，2px
				}],
				opposite: false,//是否把它显示到另一边（右边）
				labels: {
					style: {         //字体样式
						font: 'normal 5px Verdana, sans-serif'
					},
					overflow: 'justify',
					align: 'right',
					x: -3,
					y: 5,
					formatter: function () {
						//最新价  px_last/preclose昨收盘-1
						return (this.value).toFixed(2);
					}
				},
				title: {
					text: ''
				},

				tickPixelInterval: 60,
				height: 210,

//        top:'0%',
//        height: '65%',
				lineWidth: 1,
				showFirstLabel: true,
//        showLastLabel:true,

				tickPositioner: function () {    //以yesterdayClose为界限，统一间隔值，从 最小到最大步进
					var positions, tick, increment;
					positions = [];
					tick = Number((avg_pxyAxisMin));
					increment = Number(((avg_pxyAxisMax - avg_pxyAxisMin) / 5));
					var tickMin = Number((avg_pxyAxisMin)), tickMax = Number((avg_pxyAxisMax));
					if (0 == data.length) {//还没有数据时，yesterdayClose 的幅值 在 -1% - 1%上下浮动
						tickMin = 0.99 * yesterdayClose;
						tickMax = 1.01 * yesterdayClose;
					} else if (0 == increment) {//有数据了  但是数据都是一样的幅值
						if (yesterdayClose > Number(avg_pxyAxisMin)) {
							tickMin = Number(avg_pxyAxisMin);
							tickMax = 2 * yesterdayClose - Number(avg_pxyAxisMin);
						} else if (yesterdayClose < Number(avg_pxyAxisMin)) {
							tickMax = Number(avg_pxyAxisMax);
							tickMin = yesterdayClose - (Number(avg_pxyAxisMax) - yesterdayClose);
						} else {
							tickMin = 0.99 * yesterdayClose;
							tickMax = 1.01 * yesterdayClose;
						}
					} else if (avg_pxyAxisMin - yesterdayClose < 0 && avg_pxyAxisMax - yesterdayClose > 0) {//最小值在昨日收盘价下面，最大值在昨日收盘价上面
						var limit = Math.max(Math.abs(avg_pxyAxisMin - yesterdayClose), Math.abs(avg_pxyAxisMax - yesterdayClose));
						tickMin = yesterdayClose - limit;
						tickMax = yesterdayClose + limit;
					} else if (avg_pxyAxisMin > yesterdayClose && avg_pxyAxisMax > yesterdayClose) {//最小最大值均在昨日收盘价上面
						tickMax = avg_pxyAxisMax;
						tickMin = yesterdayClose - (tickMax - yesterdayClose);

					} else if (avg_pxyAxisMin < yesterdayClose && avg_pxyAxisMax < yesterdayClose) {//最小最大值均在昨日收盘价下面
						tickMin = avg_pxyAxisMin;
						tickMax = yesterdayClose + (yesterdayClose - tickMin);
					}
					if (tickMax > 2 * yesterdayClose) {//数据超过100%了
						tickMax = 2 * yesterdayClose;
						tickMin = 0;
					}

					var interval = Number(tickMax - yesterdayClose) / 10;
					tickMax += interval;
					tickMin = yesterdayClose - (tickMax - yesterdayClose);
					increment = (tickMax - yesterdayClose) / 3;
					tick = tickMin;
					var i = 0;
					for (tick; i++ < 10; tick += increment) {
						positions.push(Number(tick));
					}
					return positions;
				},
			},
				{
					opposite: true,//是否把它显示到另一边（右边）
					showFirstLabel: true,
					showLastLabel: true,
					labels: {
						overflow: 'justify',
						style: {         //字体样式
							font: 'normal 5px Verdana, sans-serif'
						},
						align: 'right',
						x: 25,
						y: 5,
						formatter: function () {//最新价  px_last/preclose昨收盘-1
							return (100 * (this.value / past_back_price - 1)).toFixed(2) + "%";
						}
					},
					title: {
						text: ''
					},
					lineWidth: 1,
					tickPixelInterval: 60,
					height: 210,
//          gridLineWidth: 1
					tickPositioner: function () {
						positions = "10%";
						return positions;
					}
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
					top: 265,
					height: 50,
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
//        compare: 'percent',
					dataGrouping: {
						units: groupingUnits
					}
				}, {
					type: 'column',
					name: '成交量',
					data: test,
					yAxis: 2
//            dataGrouping: {
//              units: groupingUnits
//            }
				}
			],
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
			plotOptions: {
				series: {
					marker: {
						enabled: false,
						radius: 1
					},
					dataLabels: {
						enabled: false,
						/*在数据点上显示数值*/
						format: '{y}'
					},
					lineWidth: 1,
					states: {
						hover: {
							enabled: false
						}
					},
					line: {
						marker: {
							enabled: false
						}
					}
				}
			}
		});


//    var chart = $('#line-Chart').highcharts();
//    //基准线
//    chart.yAxis[0].addPlotLine({           //在x轴上增加
//	    value:7.23,                           //在值为2的地方
//	    width:0.1,                           //标示线的宽度为2px
//	    color: 'blue',                  //标示线的颜色
//	    zIndex:1001
//    });

		function getForm() {
			$.getJSON("getStockTiming.json?stockcode=" + stockcode + "&day=1", function (data) {
				var chart = $('#line-Chart').highcharts();
				var index = data.length - 1;
				var secondary = data.length - 2;
				var column = data[index][3] - data[secondary][3];
				//chart.series[0].addPoint([data[index][0],data[index][1]],true,true);
				//chart.series[1].addPoint([data[index][0],column],true,true);
			});
		}

		$(document).ready(function () {
			//每隔20秒自动调用方法，实现图表的实时更新
			var mydate = new Date();
			var myHours = mydate.getHours();
			if (stock_status != 0) {
				if ((myHours >= 9 && myHours < 12 ) || (myHours >= 13 && myHours < 15)) {
//				window.setInterval(getForm,50000);
				}
			}
		});
	})
}


//数据补全
function appendTimeMessage(ohlc, volume, data) {

	var date = data[data.length - 1][0];
	var last_dataTime = new Date(date);

	//股票交易早上最后的时间
	var am_lastTime = new Date(last_dataTime);
	am_lastTime.setHours(11, 30, 0, 0);
	//股票交易下午最后的时间
	var pm_startTime = new Date(last_dataTime);
	pm_startTime.setHours(13, 1, 0, 0);
	var pm_lastTime = new Date(last_dataTime);
	pm_lastTime.setHours(15, 0, 0, 0);
	//把时间日期格式转化成utc格式

	function convertDateToUTC(date) {
		return Number(date);
	}

//如果获取的时间11：:30之前的计算
	if (last_dataTime < am_lastTime) {
		var i = last_dataTime;
		i.setMinutes((i.getMinutes() + 1));
		for (; i <= am_lastTime; i.setMinutes((i.getMinutes() + 1))) {
			volume.push([
				convertDateToUTC(i),// the date	 x
				0	// the data  y
			]);
		}
		i = pm_startTime;
		for (; i <= pm_lastTime; i.setMinutes((i.getMinutes() + 1))) {
			volume.push([
				convertDateToUTC(i),// the date	 x
				0	// the data  y
			]);
		}
	} else if (last_dataTime < pm_lastTime) {    //获取的时间下午13:00之后的计算
		var i;
		if (Number(last_dataTime) == Number(am_lastTime)) {
			i = pm_startTime;
		} else {
			i = last_dataTime;
		}
		i.setMinutes((i.getMinutes() + 1));
		for (; i <= pm_lastTime; i.setMinutes((i.getMinutes() + 1))) {
			volume.push([
				convertDateToUTC(i),// the date	 x
				0	// the data  y
			]);
		}
	}
}

fsStock();
