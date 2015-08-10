j(document).ready(function(){
	//页面的按钮选中
	if(getQueryString("rm")){
		j(".menu li[name='rm']").addClass("selected").siblings().removeClass("selected");
	}else if(getQueryString("userLevel")){
		j(".menu li[name='userLevel'][userLevel=" + getQueryString("userLevel") + "]").addClass("selected").siblings().removeClass("selected");
	}else if(getQueryString("onColumns")){
		j(".menu li[name='onColumns'][onColumns=" + getQueryString("onColumns") + "]").addClass("selected").siblings().removeClass("selected");
	}else if(getQueryString("all")){
		j(".menu li[name='all']").addClass("selected").siblings().removeClass("selected");
	}else{
		j(".menu li[name='rm']").addClass("selected").siblings().removeClass("selected");
	}
	getPageList();
	
	//一键关注
	$(".unified_control").click(function(e){
		//登录用户
		var ids = "";
		$("td").find(":input").map(function(o){
			ids += $(this).attr("wrid") + ",";
		});
		
		var url = location.href;
		var reg=new RegExp("/(\\w+).htm","g");   
		url=url.replace(reg,"/wrAttention_addAttentions.json");
		var queryParams = {
			"ids" : ids,
			"isAdd" : "true"
		};
		$.post(url, queryParams, function(data){
			data = $.parseJSON(data);
			if(data.success){
				j(".ct input").toggleClass('add',true);
				MoerMessageAlert("一键关注", "一键关注成功！");
			}else if(data.errorCode == -999){
				//跳到登录页面
				MoerMessageAlert("一键关注", "请登录！");
			}else{
				MoerMessageAlert("一键关注", data.message);
			}
		});
	});
});

//热门
function findRm(){
	var url = location.href;
	location.href = url.split("?")[0] + "?rm=rm&page=";
}
//撰稿人类别 (个人:2或者企业:3) 
function findUserLevel(level){
	var url = location.href;
	location.href = url.split("?")[0] + "?userLevel=" + level +"&page=";
}
//股票种类
function findOnColumns(obj){
//	var column = j(obj).attr("onColumns");
	var url = location.href;
	location.href = url.split("?")[0] + "?onColumns=" + obj + "&page=";
}
//全部
function findAll(){
	var url = location.href;
	location.href = url.split("?")[0] + "?all=all&page=";
}
//全部
function findSs(){
	var url = location.href;
	location.href = url.split("?")[0] + "?page=";
}

//查询后台数据库
function getPageList(){
	var url = location.href;
	var reg=new RegExp("/(\\w+).htm","g");   
	url=url.replace(reg,"/wrAttention_findPageList.json");
	j.post(url,"",function(data){
		//加载list
		$("#InvestmentLoading").hide();
		j("#attentionList").html(data);
		sideFloat();
		//绑定点击事件
		$("td").find(":input").click(function(){
			if($(this).hasClass('add')){
				var fouse=$(this);
				var attentionUser = $(this).attr('wrid');
				var isAdd = false;
				//取消关注
				MOER.confirm("确定取消关注吗？",function(){
					submitAttentions(attentionUser,isAdd,function(data){
						data = parseObj(data);
						if(data.success==true) {
							fouse.removeClass('add');
						}
					});
				});
			}else{
				//加关注
				var fouse=$(this);
				var attentionUser = $(this).attr('wrid');
				var isAdd = true;
				submitAttentions(attentionUser,isAdd,function(data){
					data = parseObj(data);
					if(data.success==true) {
						fouse.addClass('add');
					}
				});
			}
		});
		//添加分页页码
		getpage(j("#attentionList input[name=total]").val(),j("#attentionList input[name=page]").val(),j("#attentionList input[name=pagesize]").val(),'page_mun_style7');
		if(j("#attentionList input[name=total]").val()==0){
//			j(".page_num_group").hide();
		}else{
//			j(".page_num_group").show();
		}
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

