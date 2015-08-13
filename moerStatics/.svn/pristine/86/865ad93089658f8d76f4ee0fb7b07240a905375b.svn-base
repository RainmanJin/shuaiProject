$(function () {
	Highcharts.setOptions({
		global: {
			useUTC: false //关闭文件默认时区，采用数据时间显示
		}
	});
});
var tooltipChart = {//
	chartVar: null,//highcharts() 对象传入  在load时传入
	SVGElements: {},
	tooltipWidth: null,
	buildTooltip: function (text, coord, isLeft) {
		// we've to check if exists and remove it
		try {
			this.SVGElements.destroy();
		} catch (e) {
			// nothing
		}
		try {
			// first of all we've to build a group to put the elements
			this.SVGElements = this.chartVar.renderer.g().attr({'zIndex': 11}).add();
			//将tooltip放在左边  coord[0] 左坐标位置正确的，coord[1]传入的是图表高度
			// build tooltip text
			var textContainer = this.chartVar.renderer.text(text, coord[0], coord[1])
				.attr({
					'zIndex': 10
				})
				.add(this.SVGElements);
			// get text 'box'
			var box = textContainer.getBBox();
			tooltipChart.tooltipWidth = box.width;
			// build  tooltip square according to the text location, then place the container behind the text
			this.chartVar.renderer.rect(box.x, box.y, box.width, box.height, 1)
				.attr({
					'stroke-width': 1,            // border width
					'stroke': '#a8a8a8',        // border color
					'zIndex': 9,
					'fill': 'white',            // background color
					'fill-opacity': 0.85,        // background opacity
					'isShadow': false
				})
				.add(this.SVGElements);
		} catch (e) {
			return false;
		}
	}
};
var orgHighchartsRangeSelectorPrototypeRender = Highcharts.RangeSelector.prototype.render;
Highcharts.RangeSelector.prototype.render = function (min, max) {
	orgHighchartsRangeSelectorPrototypeRender.apply(this, [min, max]);
	var leftPosition = this.chart.plotLeft,
		topPosition = this.chart.plotTop,
		space = 0;
	this.zoomText.attr({
		x: leftPosition,
		y: topPosition
	});
	leftPosition += this.zoomText.getBBox().width;
	for (var i = 0; i < this.buttons.length; i++) {
		this.buttons[i].attr({
			x: 750 - leftPosition,
			y: topPosition - 30
		});
		leftPosition += this.buttons[i].width + space;
	}
};
var originalDrawPoints = Highcharts.seriesTypes.column.prototype.drawPoints;
Highcharts.seriesTypes.column.prototype.drawPoints = function () {
	var merge = Highcharts.merge,
		series = this,
		chart = this.chart,
		points = series.points,
		i = points.length;
	var seriesPointAttr;
	while (i--) {
		var candlePoint = chart.series[0].points[i];
		if (candlePoint.open != undefined && candlePoint.close != undefined) {  //如果是K线图 改变矩形条颜色，否则不变
			var color = (candlePoint.open < candlePoint.close) ? '#DD2200' : '#33AA11';
			seriesPointAttr = merge(series.pointAttr);
			seriesPointAttr[''].fill = color;
			seriesPointAttr.hover.fill = Highcharts.Color(color).brighten(0.3).get();
			seriesPointAttr.select.fill = color;
		} else {
			seriesPointAttr = merge(series.pointAttr);
		}
		points[i].pointAttr = seriesPointAttr;
	}
	originalDrawPoints.call(this);
};


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