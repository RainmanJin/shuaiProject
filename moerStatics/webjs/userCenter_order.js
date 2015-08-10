var pagesize = 10;
function findOrderDetailList(obj, order_type,id, type){
	var bool = $(obj).hasClass("check_article_select");
	if(!bool){ //如果用户想打开
		$(obj).parent().css({"border-bottom-width":"2px","border-bottom-color":"#ccc"});
		var url_prefix = '';
		if(order_type ==='1')
			url_prefix = 'order';
		else if(order_type ==='2')
			url_prefix = 'reward';
		var url = url_prefix+"_findOrderDetailList.json";
		var queryParams = {
			"id" : id,
			"page" : 1,
			"rows" : pagesize,
			"type" : type
			};
		$.post(url, queryParams, function(data){
			$(obj).next().html(data);
	//		$(obj).toggleClass('check_article_select');//每次点击的时候，将当前的元素切换active样式
	//		$(obj).next("div").slideToggle(400);
		});
	}else{
		$(obj).parent().css({"border-bottom-width":"1px","border-bottom-color":"#ccc"});
	}
	
}

var isClick = true;
function pageClick(obj,pg,total,order_type){
	var totalPage = Math.ceil(total/pagesize);
	var url_prefix = '';
	if(order_type ==='1')
		url_prefix = 'order';
	else if(order_type ==='2')
		url_prefix = 'reward';
	var url =url_prefix+ "_findOrderDetailList.json";
	var queryParams;
	var pp = $(obj).parents(".order_inf").prev();
	var pageText = $(obj).text().trim();
	if(isClick){
		isClick = false;
		if("首页" == pageText){
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : 1,
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}else if("上一页" == pageText){
			var pageno = parseInt($(obj).siblings(".red").attr("ind")) - 1;
			if(pageno<1){
				pageno=1;
			}
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : pageno,
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}else if("下一页" == pageText){
			var pageno=parseInt($(obj).siblings(".red").attr("ind")) + 1;
			if(pageno > totalPage){
				pageno = totalPage;
			}
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : pageno,
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}else if("尾页" == pageText){
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : $(obj).prev().prev().attr("ind"),
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}else if("..." == pageText){
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : $(obj).prev().attr("ind"),
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}else{
			queryParams = {
				"id" : pp.attr("pid"),
				"page" : pg,
				"rows" : pagesize,
				"type" : pp.attr("ptype")
				};
		}
		$.post(url, queryParams, function(data){
			pp.next("div").html(data);
			isClick = true;
		});
	}
}