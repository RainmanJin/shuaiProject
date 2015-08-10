
var path = "js/candlestick-and-volume.json";
$(function() {
  $.getJSON(path, function(result) {
    var data = result.data;
    // split the data set into ohlc and volume
    var ohlc = [],
      test=[],
      volume = [],
      dataLength = data.length;
      
    for (i = 0; i < dataLength; i++) {
      ohlc.push([
        data[i][0], // the date
        data[i][1], // open
        data[i][2], // high
        data[i][3], // low
        data[i][4] // close
      ]);

      // test.push([
      //   data[i][0], // the date
      //   data[i][4] // close
      // ]);
      
      volume.push([
        data[i][0], // the date
        data[i][5] // the volume
      ])
    }

    // set the allowed units for data grouping
    var groupingUnits = [
      ['second', [1]],
      ['minute', [1]],
      ['hour', [1]],
      ['day', [1]],
      ['week', [1]],
      ['month', [1]],
      ['year', [1]]
    ];

    // create the chart
    $('#line-Chart').highcharts('StockChart', {
      rangeSelector: {
        buttons: [{
          type: 'minute',
          count: 50,
          text: '今天'
        }, {
          type: 'hour',
          count: 5,
          text: '一星期'
        }, {
          type: 'month',
          count: 1,
          text: '一个月'
        }, {
          type: 'month',
          count: 6,
          text: '半年'
        }, {
          type: 'year',
          count: 1,
          text: '一年'
        }, {
          type: 'all',
          text: '全部'
        }],
        buttonTheme: {
          width: 50,
        },
        enabled: true,
        allButtonsEnabled: false,
        selected: 0,
        //右上角时间格式
        //inputDateFormat: '%Y-%m-%d',
        //inputEditDateFormat: '%Y-%m-%d',
      },
      title: {
        text: 'AAPL Historical'
      },
      xAxis: {
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
        labels: {
//           formatter:function(){
//     return this.value;
// }
          //format: '{value:%m-%d}',
          // format: '{value:%Y-%m-%d}',
          rotation: 0,
          align: 'left',
          style: {
              color: '#000000'
          }
        },
        // title: {
        //   text: '时间(天)',
        //   align: 'high'
        // }
      },
      // yAxis: [{
      //   title: {
      //       text: 'OHLC'
      //   },
      //   height: 180,
      //   lineWidth: 2
      // },
      yAxis: [{
        // labels: {
        //   formatter:function(){
        //     if(this.value <=100) { 
        //       return "第一等级("+this.value+")";
        //     }else if(this.value >100 && this.value <=200) { 
        //       return "第二等级("+this.value+")"; 
        //     }else { 
        //       return "第三等级("+this.value+")";
        //     }
        //   }
        // },
        title: {
          text: '数' + '<br>' + '量' + '<br>' + '(人)',
          rotation: '0',
          /*标题旋转度*/
          y: -100,
          x: 10,
          /*标题位置*/
        },
        //alternateGridColor: '#FDFFD5', //隔区变色
        height: 200,
        lineWidth: 1,
        opposite: false, //y轴位置  left  right
        offset: 0, //y轴与数据区位置
      },{
        labels: {
          formatter:function(){
            // if(this.value <=100) { 
            //   return "第一等级("+this.value+")";
            // }else if(this.value >100 && this.value <=200) { 
            //   return "第二等级("+this.value+")"; 
            // }else { 
            //   return "第三等级("+this.value+")";
            // }
            return "sdfasd"
          }
        },
        //alternateGridColor: '#FDFFD5', //隔区变色
        height:200,
        lineWidth:0,
        opposite: true, //y轴位置  left  right
        offset: 0, //y轴与数据区位置
      },{
        labels: {
          format: '{value}',
          style: {
            color: '#000000'
          }
        },
        title: {
          text: ''
        },
        top: 350,
        height: 50,
        lineWidth: 0,
        opposite: true, //y轴位置  left  right
        offset: 10, //y轴与数据区位置
      }],
      
      series: [{
        type: 'line',
        name: 'AAPL',
        data: ohlc,
        yAxis: 0,
        dataGrouping: {
          units: groupingUnits
        }
      },
      {
        type: 'line',
        name: 'AAPL',
        data: ohlc,
        yAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      },
      {
        type: 'column',
        name: 'Volume',
        data: volume,
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
        /*
        type: 'datetime',
        dateTimeLabelFormats:{
          day:'%Y-%m-%d'
        },*/
        formatter: function() {
          var s = '<b>' + Highcharts.dateFormat(' %Y-%m-%d', this.x) + '</b>';
          $.each(this.points, function() {
              s += '<br/>' + '<tspan  style="fill:' + this.series.color + ';" x="8" dy="16">●</tspan>' + this.series.name + ':' + this.y;
          });
          return s;
        },
        //crosshairs: [true, true],   /*x+y数据标尺*/
        crosshairs: {
          dashStyle: 'dash',
          /*数据 标尺线样式*/
          color: 'red',
        }
      },
      /*下部时间拖拉选择*/
      // navigator: {
      //     enabled: true, 关闭时间选择
      //     baseseries: 10
      // },
      navigator: {
          // series: {
          //     data: i
          // },
          adaptToUpdatedData: !1,
          height: 30
      },
      scrollbar: {
          liveRedraw: !1,
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
            format: '123'
          },
          //enableMouseTracking: false   /*关闭tip层*/
        }
      },
    });
  });
});