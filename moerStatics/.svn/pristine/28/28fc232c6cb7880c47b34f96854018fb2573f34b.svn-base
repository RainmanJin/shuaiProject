function fiveStock() {
	$.getJSON("getStockTiming.json?stockcode=" + stockcode + "&day=5", function (data) {
		// split the data set into ohlc and volume
//	  alert("执行一次");
		var ohlc = [],
			test = [],
			volume = [],
			dataLength = data.length;
		past_back_price = data[0][2];
		if (stock_status == 0) {
			for (i = 0; i < dataLength; i++) {
				ohlc.push([
					data[i][0], // the date  x
					data[i][2]  // the data  y
				]);


				volume.push([
					data[i][0], // the date	 x
					data[dataLength - 1][2]	// the data  y
				]);

				test.push([
					data[i][0], // the date	 x
					0	// the data  y
				])
			}
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
		// set the allowed units for data grouping
		var groupingUnits = [
			['minute', [1]],
			['hour', [1]],
			['day', [1]],
			['week', [1]]
		];

		// create the chart minute
		$('#stock-5day').highcharts('StockChart', {
			rangeSelector: {
				buttons: [],
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
			}, xAxis: {
				labels: {
					formatter: function () {
						return Highcharts.dateFormat('%m/%d', this.value);
					}
				},
				top: 5,
				tickPixelInterval: 140
			},
			yAxis: [{
				labels: {
					formatter: function () {
						return (this.value > 0 ? ' + ' : '') + this.value + '%';
					},
					style: {
						color: '#89A54E'
					}
				},
				maxStaggerLines: 3,
				height: '75%',
				tickPixelInterval: 60,
				lineWidth: 0,
				opposite: true, //y轴位置  left  right
				offset: 0 //y轴与数据区位置
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
//    	  tickPositions: [10,15,20,25,30], 
					height: '75%',
					tickPixelInterval: 60,
					lineWidth: 2,
					opposite: false, //y轴位置  left  right
					offset: 1 //y轴与数据区位置
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
					top: '77%',
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
					compare: 'percent',
					dataGrouping: {
						units: groupingUnits
					}
				},
				{
					type: 'spline',
					name: '当前价格',
					data: ohlc,
					animation: true,
					color: '#4572A7',
					yAxis: 1,
					compare: 'percent',
					dataGrouping: {
						units: groupingUnits
					}
				},
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
						//fillColor:'#ff3300'    /*数据点颜色*/
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
	});
}

//fsStock();
