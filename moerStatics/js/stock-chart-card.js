
var path = "js/candlestick-and-volume1.json";
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
        data[i][0],
        data[i][2],
        data[i][4], // the date
      ])
    }

    // set the allowed units for data grouping
    var groupingUnits = [[
      'week',                         // unit name
      [1]                             // allowed multiples
    ], [
      'month',
      [1, 2, 3, 4, 6]
    ]];

    // create the chart
    $('#lineChart-card').highcharts('StockChart', {
      chart: {
        backgroundColor: "#4c5c6e",
        borderColor : "#FFFFFF",
        style: {
          fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif', // default font
          fontSize: '12px'
        },
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        spacingBottom: 10,
        //width: 180,
        height: 70,
      },
      colors: ['#FFFFFF','#828e9a'],
      rangeSelector : {
        enabled: false
      },
      labels: {

      },
      title: {
        text: ''
      },
      xAxis: [{
        labels: {
          style: {"color":"#fff"},
          rotation: 0,
          enabled: false
        },
        //gridLineColor: "#ff0000",
        title: {},
        //alternateGridColor: '#FDFFD5', //隔区变色
        //height: 100,
        lineWidth: 0,
        opposite: false, //y轴位置  left>false  right>true
        offset: 0, //y轴与数据区位置
        ordinal: false
      },{
        labels: {
          style: {"color":"#fff"},
          rotation: 0,
          enabled: false 
        },
        //gridLineColor: "#ff0000",
        title: {},
        //alternateGridColor: '#FDFFD5', //隔区变色
        //height: 100,
        lineWidth: 0,
        opposite: false, //y轴位置  left>false  right>true
        offset: 0, //y轴与数据区位置
        ordinal: false
      }],
      yAxis: [{
        labels: {
          enabled: false
        }
      },{
        labels: {
          enabled: false
        }
      }],
      series: [{
        type: 'line',
        data: ohlc,
        xAxis: 0,
        dataGrouping: {
          units: groupingUnits
        }
      },{
        type: 'line',
        data: volume,
        xAxis: 1,
        dataGrouping: {
          units: groupingUnits
        }
      }],
      credits: {
        enabled:false
      },
      tooltip: {
        enabled: false,
      },
      /*下部时间拖拉选择*/
      navigator: {
          enabled: false, /*关闭时间选择*/
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
          enableMouseTracking: false   /*关闭tip层*/
        }
      },
    });
  });
});