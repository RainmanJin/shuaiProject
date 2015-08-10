var chart;
//setTimeout(function(){
//	location.reload();
//}, 1*60*1000);
$(function() {
  Highcharts.setOptions({
      global: {
          useUTC: false //关闭文件默认时区，采用数据时间显示
      },
      lang:{
       contextButtonTitle:"图表导出菜单",
       decimalPoint:".",
       downloadJPEG:"下载JPEG图片",
       downloadPDF:"下载PDF文件",
       downloadPNG:"下载PNG文件",
       downloadSVG:"下载SVG文件",
       drillUpText:"返回 {series.name}",
       loading:"加载中",
       months:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
       noData:"没有数据",
       numericSymbols: [ "千" , "兆" , "G" , "T" , "P" , "E"],
       printChart:"打印图表",
       resetZoom:"恢复缩放",
       resetZoomTitle:"恢复图表",
       shortMonths: [ "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"],
       thousandsSep:",",
       weekdays: ["星期一", "星期二", "星期三", "星期三", "星期四", "星期五", "星期六","星期天"]
    }
  });
  $.getJSON("getStockTiming.json?stockcode="+stockcode, function(data) {
    // split the data set into ohlc and volume
//	  alert("执行一次");
	  var ohlc = [],
      test=[],
      volume = [],
      dataLength = data.length;
    for (i = 0; i < dataLength; i++) {
      ohlc.push([
        data[i][0], // the date  x
        data[i][1]  // the data  y
      ]);

      
      volume.push([
        data[i][0], // the date	 x
        data[dataLength-1][2],	// the data  y
      ]);
      
      var tdV = data[i][3];
      if(i>0){
        tdV = data[i][3]-data[i-1][3];
      }
      if(tdV<0){
    	  tdV = 0;
      }
      test.push([
        data[i][0], // the date	 x
        tdV,	// the data  y
      ])
    }

    // set the allowed units for data grouping
    var groupingUnits = [
                         ['minute',[1]],
                         ['hour', [1]], 
                         ['day', [1]],
                         ['week',[1]]
    ];

    // create the chart minute
    $('#line-Chart').highcharts('StockChart', {
      rangeSelector: {
        buttons: [{
          type: 'minute',
          count: 460,
          text: '今日'
        }
//        , {
//          type: 'day',
//          count: 5,
//          text: '5日'
//        }, {
//          type: 'month',
//          count: 1,
//          text: '一个月'
//        }, {
//          type: 'month',
//          count: 6,
//          text: '半年'
//        }, {
//          type: 'year',
//          count: 1,
//          text: '一年'
//        }, {
//          type: 'all',
//          text: '全部'
//        }
        ],
       buttonTheme:{
		fill: 'none',
		stroke: 'none',
		'stroke-width': 0,
		r: 0,
		style:{
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
			hover: {
			},
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
    },title: {
        text: ''
    },tooltip:{   
    	//数据提示框的格式化
    	formatter:function(){  
    	debugger
    	var tip = "";
    	console.log(this.points[0]);
    	tip = this.points[0].series.name+"<br/> ";
    	
    	tip += Highcharts.dateFormat("%Y-%b-%e",this.points[0].point.x,false)+"<br/>";
    	tip += "开盘："+this.points[0].point.open+"<br/>";
    	tip += "高开："+this.points[0].point.high+"<br/>";
    	tip += "低开："+this.points[0].point.low+"<br/>";
    	tip += "收盘："+this.points[0].point.close+"<br/>";
    	return tip;
    	}
    },
    xAxis: {
    	labels: { 
            formatter: function() { 
                    
                           return  Highcharts.dateFormat('%H:%M', this.value); 
            } 
        },
    	top:65,
		tickPixelInterval: 100 
    },
    yAxis: [{
    	plotLines:[{
	        color:'red',           //线的颜色，定义为红色
	        dashStyle:'ShortDot',     //默认值，这里定义为实线
	        value:0,               //定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
	        width:2                //标示线的宽度，2px
	    }],
         labels: {
        	 formatter:function(){
              return (this.value > 0 ? ' + ' : '') + this.value + '%';
             },
             style: {
                 color: '#89A54E'
             }
         },
        height: 210,
        tickPixelInterval:36,
        lineWidth: 1,
        opposite: true, //y轴位置  left  right
        offset: 0, //y轴与数据区位置
      },
      {
    	  labels: {
         	 formatter:function(){
         		var a = this.value/100;
         		var b = -past_back_price*a;
         		var c = past_back_price-b;
         		var d = Math.round(c*100)/100
         		return d;
         		
              },
              style: {
                  color: '#89A54E'
              }
          },
//    	  tickPositions: [10,15,20,25,30], 
          height: 210,
          tickPixelInterval:36,
          lineWidth: 0,
          opposite: false, //y轴位置  left  right
          offset: 1, //y轴与数据区位置
      },
      {
        labels: {
        	formatter:function(){
        		return this.value/10000 + "万";
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
        lineWidth: 0,
        tickPixelInterval:25,
        opposite: true, //y轴位置  left  right
        offset: 10, //y轴与数据区位置
      }],
      series: [
      {
        type: 'line',
        name: '当前价格',
        data: ohlc,
        animation:true,
        color: '#4572A7',
        yAxis: 0,
        compare: 'percent',
        dataGrouping: {
          units: groupingUnits
        }
      },
      {
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
        enabled:false
      },
      tooltip: {
        enabled: true,
        formatter: function() {
          var s = '<b>' + Highcharts.dateFormat(' %Y-%m-%d %H:%M:%S', this.x) + '</b>';
          $.each(this.points, function() {
              s += '<br/>' + '<tspan  style="fill:' + this.series.color + ';" x="8" dy="16">●</tspan>' + this.series.name + ':' + this.y;
          });
          return s;
        },
//        crosshairs: [true, true],   /*x+y数据标尺*/
        crosshairs: {
          dashStyle: 'dash',
          /*数据 标尺线样式*/
          color: 'red',
        }
      },
      /*下部时间拖拉选择*/
      navigator: {
          enabled: true, /*关闭时间选择*/
          series:{
        	  data:ohlc
          },
          baseseries: 10
      },
      scrollbar: {
          enabled: false /*关闭下方滚动条*/
      },
      /*底部滚动条*/
      // scrollbar: {
      //   barBackgroundColor: 'gray',
      //   barBorderRadius: 7,
      //   barBorderWidth: 0,
      //   buttonBackgroundColor: 'gray',
      //   buttonBorderWidth: 0,
      //   buttonArrowColor: 'yellow',
      //   buttonBorderRadius: 7,
      //   rifleColor: 'yellow',
      //   trackBackgroundColor: 'white',
      //   trackBorderWidth: 1,
      //   trackBorderColor: 'silver',
      //   trackBorderRadius: 7
      // },
      /*数据点设置*/
      plotOptions: {
        series: {
          marker: {
            enabled: false,
            /*数据点是否显示*/
            radius: 5,
            /*数据点大小px*/
            //fillColor:'#ff3300'                                /*数据点颜色*/
          },
          dataLabels: {
            enabled: false,
            /*在数据点上显示数值*/
            format: '{y}'
          },
          //enableMouseTracking: false   /*关闭tip层*/
        }
      },
    });
  });
//  	chart = $('#line-Chart').highcharts();    // Highcharts构造函数
//	chart.yAxis[0].addPlotLine({           //在x轴上增加
//    value:70,                           //在值为2的地方
//    width:2,                           //标示线的宽度为2px
//    color: '#FF0000',                  //标示线的颜色
//    id: 'plot-line-1'                  //标示线的id，在删除该标示线的时候需要该id标示
//});
});
