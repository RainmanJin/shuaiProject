j(document).ready(function(){
	//隐藏行业子项
	j(".hot_link").hide();
	
	if(getQueryString("todayRm")){
		j(".news_box_left_memu li[name='todayRm']").addClass("news_box_left_memu_left").siblings().removeClass("news_box_left_memu_left");
	}else if(getQueryString("myAttentions")){
		j(".news_box_left_memu li[name='myAttentions']").addClass("news_box_left_memu_left").siblings().removeClass("news_box_left_memu_left");
	}else if(getQueryString("onColumns")){
		var column = getQueryString("onColumns");
		//如果是投资观点的沪深/港股/美股/行业 那么要显示子行业
		if(column=='TZGD_HUSHEN' || column=='TZGD_GANGGU' || column=='TZGD_MEIGU' || column=='TZGD_HANGYE'){
			var str = getQueryString("industrys");
			j(".hot_link").slideToggle(400);
			if(str == ""){
				str = "all";
			}
			j('a[industrys='+str+']').toggleClass('a_select').siblings().removeClass('a_select');
		}
		j(".news_box_left_memu li[name='onColumns'][onColumns=" + getQueryString("onColumns") + "]").addClass("news_box_left_memu_left").siblings().removeClass("news_box_left_memu_left");
	}else{
		j(".news_box_left_memu li[name='todayRm']").addClass("news_box_left_memu_left").siblings().removeClass("news_box_left_memu_left");
	}
	
	//查询数据
	getPageList();
});

//今日热门
function getTodayRm(){
	var url = location.href;
	location.href = url.split("?")[0] + "?todayRm=todayRm&page=";
}
//我的关注
function getMyAttentions(){
	var url = location.href;
	location.href = url.split("?")[0] + "?myAttentions=myAttentions&page=";
}
//股票种类  栏目
function getOnColumns(obj){
	var column = j(obj).attr("onColumns");
	var url = location.href;
	location.href = url.split("?")[0] + "?onColumns=" + column + "&page=";
}
//子行业
function getIndustrys(obj){
	var intry = j(obj).attr("industrys");
	var column = $(".industry.news_box_left_memu_left").attr("oncolumns");
	var url = location.href;
	location.href = url.split("?")[0] + "?onColumns=" + column + "&industrys=" + intry + "&page=";
}

//查询后台数据库
function getPageList(){
	var url = location.href;
	var reg=new RegExp("/(\\w+).htm([?]?)","i");
	var r = url.match(reg);
	var authorType = r[1] == "scoop" ? "2" : "1";
	var rp = "";
	if(r[2] == ""){
		rp = "/investment_findPageList.json?todayRm=todayRm";
	}else{
		rp = "/investment_findPageList.json?";
	}
	url=url.replace(reg, rp);
	j.post(url,"authorType="+authorType,function(data){
		j("#investmenttbl").html(data);
		//添加分页页码
		if(authorType == '1'){
			//投资观点是蓝色分页
			getpage(j("#investmenttbl input[name=total]").val(),j("#investmenttbl input[name=page]").val(),j("#investmenttbl input[name=pagesize]").val(),'page_mun_style6');
		}else{
			//独家报道是红色分页
			getpage(j("#investmenttbl input[name=total]").val(),j("#investmenttbl input[name=page]").val(),j("#investmenttbl input[name=pagesize]").val(),'page_mun_style5');
		}
		if(j("#investmenttbl input[name=total]").val()==0){
//			j(".page_num_group").hide();
			j("#investmenttbl").hide();
		}else{
//			j(".page_num_group").show();
			j("#investmenttbl").show();
		}
//		getpage('<s:property value="investmentList.total"/>','<s:property value="page"/>','<s:property value="pagesize"/>','page_mun_style6');
		//初始化分页点击事件
		var url = location.href;
		if(url.match(new RegExp("page=(\\w*)","gm"))){
			//http://localhost:8085/moer/investment_investmentInit.htm?onColumns=TZGD_LICAI&page=22
			//http://localhost:8085/moer/investment_investmentInit.htm?page=1
			url=url.replace(new RegExp("page=(\\w*)","gm"),"page=");
		}else if(url.match(new RegExp(".htm(\\w+)","gm"))){
			//http://localhost:8085/moer/investment_investmentInit.htm?onColumns=TZGD_LICAI
			url += "&page=";
		}else{
			//http://localhost:8085/moer/investment_investmentInit.htm
			url += "?page=";
		}
		btnclick(url);
	});
	
}

