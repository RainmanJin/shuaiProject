j(document).ready(function(){
	
	//2015-5-6 10:54:24 刘青 
	
	//动态获取领域信息
	loadOnColumn();
	
	//动态获取行业信息
	loadIndustry();
		
	//投资观点初始化时样式绑定
	$(document).on("click",".screen-list>ul>li",function(){
		$(this).addClass("cur").andSelf().siblings().removeClass("cur");
		if($(this).parent("ul").attr("data-key") == "onColumns"){
			$(".sub-screen ul li").removeClass("subcur");
		}
		if($(this).hasClass("screen-hassub")){
			$(this).find("li").eq(0).addClass("subcur");
		}
		search(1);		
	});
	
	$(document).on("click",".sub-screen>ul>li",function(){
		$(this).addClass("subcur").andSelf().siblings().removeClass("subcur");
		
		search(1);
		return false;
	});
	
//	投资观点翻页
	$(document).on("click",".inverstment-page span",function(){
		var pageNum = 1;
		if($(this).hasClass("page_mun_style1")){
			pageNum = 1;
		}else if($(this).hasClass("page_mun_style2")){
			if(j("#investmenttbl input[name=page]").val() > 1){
				pageNum = (j("#investmenttbl input[name=page]").val()) - 1;
			}else {return false;}
		}else if($(this).hasClass("page_mun_style3")){
			if(j("#investmenttbl input[name=page]").val() < (Math.ceil(j("#investmenttbl input[name=total]").val()/j("#investmenttbl input[name=pagesize]").val()))){
				pageNum = parseInt(j("#investmenttbl input[name=page]").val()) + 1;
			}else {return false;}
		}else if($(this).hasClass("page_mun_style4")){
			pageNum = Math.ceil(j("#investmenttbl input[name=total]").val()/j("#investmenttbl input[name=pagesize]").val());
		}else if($(this).attr("num")){
			pageNum = $(this).attr("num");
		}
		search(pageNum);
		$('html, body').animate({ scrollTop:0 }, 'fast');
	})
	
	$("#input-page").on({
		blur: function(){
			inputPageVal();
		},
		keyup: function(){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==13){ // enter 键
                //要做的事情
				inputPageVal();
			}
		}
	})
	
	//查询数据
	getPageList();
});


function resetScreen(){
	var url = window.location.search;
	var screen = url.split("=");
	var hyFirst = screen[0].replace("?","");
	var hangye = screen[1];
	if(hyFirst == "onSubcolumn"){
		console.info($(".sub-screen ul li[data-value="+hangye+"]").html());
		$(".sub-screen ul li[data-value="+hangye+"]").addClass("subcur").andSelf().siblings().removeClass("subcur")
		$(".sub-screen ul li[data-value="+hangye+"]").parents(".screen-hassub").addClass("cur").siblings().removeClass("cur");
	}else{
		$(".screen-list ul li[data-value="+hangye+"]").addClass("cur");
	}
}


function inputPageVal(){
	var pageNum = $("#input-page").val();
	search(pageNum);
	$('html, body').animate({ scrollTop:0 }, 'fast');
}

function investmentPage(){
	var totalNum = j("#investmenttbl input[name=total]").val();
	var nowPageNum = j("#investmenttbl input[name=page]").val();
	var pageTotalNum = j("#investmenttbl input[name=pagesize]").val();
	var maxPageNum = Math.ceil(totalNum/pageTotalNum);
	var setPageHtml = "";
	
	if(maxPageNum < 2){ 
		$("#inverstment-page").hide();
		$(".blu table tr:last td").css("border","none");
	}else{
		$("#inverstment-page").show();
	}
	
	if(maxPageNum > 9){
		var pagestart = 1;
		if(nowPageNum>3){//如果当前页小于等于3页
			pagestart = nowPageNum - 3;
		}
		
		for(var i=pagestart;i<=maxPageNum && maxPageNum-i>-1 && i-pagestart<7; i++){
			setPageHtml += "<span style='cursor: pointer;'  num='"+i+"'>"+i+"</span>";
		}		
		//是否存在...
		if(maxPageNum-pagestart>=7){
			setPageHtml+="<span>...</span>";//显示前7页
			setPageHtml+="<span style='cursor: pointer;' num='"+maxPageNum+"'>"+maxPageNum+"</span>";
		}
	}else{
		//小于8页
		for(var i=1;i<=maxPageNum;i++){
			setPageHtml += "<span style='cursor: pointer;'  num='"+i+"'>"+i+"</span>";
		}
	}
	$("#page_num").html(setPageHtml);
	$("#page_num span[num="+j('#investmenttbl input[name=page]').val()+"]").addClass("page_mun_style6");
}


function search(pageNum){
	var dataValue = "";
	$("#screen-cont .cur").each(function(){
		if($(this).attr("data-value")){
			//dataValue += $(this).attr("data-value");
			if($(this).hasClass("screen-hassub") && $(".subcur").attr("data-value")){
				dataValue += "onSubcolumn";
				dataValue += "=";
				dataValue += $(".subcur").attr("data-value");
				dataValue += "&";
			}
			if($(this).attr("data-value") == "myAttentions"){
				dataValue += "myAttentions=myAttentions&";
			}else{
				dataValue += $(this).parent().attr("data-key");
				dataValue += "=";
				dataValue += $(this).attr("data-value");
				dataValue += "&";
			}
		}
	});
	
	j("#investmenttbl input[name=page]").val(pageNum);
	$('#divNoArticle').hide();
	$("#InvestmentLoading").show();
	$("#investmenttbl").html("");
	$("#inverstment-page").hide();
	
	j.post("/investment_findPageList.json?"+dataValue+"page="+pageNum,"authorType=1",function(data){
		$("#investmenttbl").html(data);
		$("#InvestmentLoading").hide();
		var total=$('[name="total"]').val();
		
		if(total!=0){
			$('#divNoArticle').hide();
		}
		else{
			$('#divNoArticle').show();			
		}		
		
		investmentPage();
	});
	
//	console.info(dataValue);
//	console.info(pageNum);
	//$("#page_num span").removeClass("page_mun_style6");
	//$("#page_num span[num="+pageNum+"]").addClass("page_mun_style6");
//	console.info(dataSubValue)
}


// 添加栏目 或者叫领域。。。
function loadOnColumn(){
	$.getJSON("wapcommon_findByNoList.json?id="+"TZGD_LANMU", function(data){
		var parentUl=$("[data-key='onColumns']");
		for(var i=0;i<data.length;i++){
			var dataName=data[i].sysDictionary_dictionaryName;
			var dataNo=data[i].sysDictionary_dictionaryNo;
			parentUl.append(createOneItem(dataNo,dataName));
		}
		
		//构建二级行业
		loadOnSubcolumn();
		
	});
}

//加载行业
function loadIndustry(){
	$.getJSON("wapcommon_findByNoList.json?id="+"TZGD_HANGYE", function(data){
		var parentUl=$("[data-key='industrys']");
		for(var i=0;i<data.length;i++){
			var dataName=data[i].sysDictionary_dictionaryName;
			var dataNo=data[i].sysDictionary_dictionaryNo;
			parentUl.append(createOneItem(dataNo,dataName));
		}
		$("li[data-value=HY_BUTIANXUANHANGYE]").remove();
	});	
}

//行业或者是领域的 二级
function loadOnSubcolumn(){
	var onColumnLis=$("[data-key='onColumns']").find("li");

	loadOneOnSubcolumn($(onColumnLis[2]));
	loadOneOnSubcolumn($(onColumnLis[3]));
	loadOneOnSubcolumn($(onColumnLis[4]));	
}


function loadOneOnSubcolumn(parentLi){
	$.getJSON("wapcommon_findByNoList.json?id="+parentLi.attr("data-value"), function(data){
		if(data){//如果该一级栏目有二级栏目，则添加
			parentLi.addClass("screen-hassub");
			var subColumnHtml='<div class="sub-screen"><u></u><ul data-key="onSubcolumn"><li>全部</li>';
			
			for(var j=0;j<data.length;j++){
				var dataName=data[j].sysDictionary_dictionaryName;
				var dataNo=data[j].sysDictionary_dictionaryNo;
				subColumnHtml+= createOneItem(dataNo,dataName);
			}
			subColumnHtml+='</ul></div>';
			
			parentLi.append(subColumnHtml);
		}
	});
}

/**
 * 
 * @param code 编码
 * @param text 显示文本
 * @param parentUl 父级 <UL>
 */
function createOneItem(code,text,parentUl){
	return "<li data-value='"+code +"'>"+text+"</li>";
}


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
	$("#InvestmentLoading").show();
	var url = location.href;
	var reg=new RegExp("/(\\w+).htm([?]?)","i");
	var r = url.match(reg);
	var authorType = r[1] == "scoop" ? "2" : "1";
	var rp = "";
	if(r[2] == ""){
		rp = "/investment_findPageList.json?";
//		rp = "/investment_findPageList.json?todayRm=todayRm";
	}else{
		rp = "/investment_findPageList.json?";
	}
	url=url.replace(reg, rp);
	j.post(url,"authorType="+authorType,function(data){
		j("#investmenttbl").html(data);
		$("#InvestmentLoading").hide();
		//添加分页页码
		if(authorType == '1'){
			//投资观点是蓝色分页
			investmentPage();
			resetScreen();
		}
//		else{
//			//独家报道是红色分页
//			getpage(j("#investmenttbl input[name=total]").val(),
//					j("#investmenttbl input[name=page]").val(),
//					j("#investmenttbl input[name=pagesize]").val(),
//					'page_mun_style5');
//		}
		if(j("#investmenttbl input[name=total]").val()==0){
			j("#investmenttbl").hide();
		}else{
			j("#investmenttbl").show();
		}
		//初始化分页点击事件
//		var url = location.href;
//		if(url.match(new RegExp("page=(\\w*)","gm"))){
//			url=url.replace(new RegExp("page=(\\w*)","gm"),"page=");
//		}else if(url.match(new RegExp(".htm(\\w+)","gm"))){
//			url += "&page=";
//		}else{
//			url += "?page=";
//		}
//		btnclick(url);
	});
	
}

