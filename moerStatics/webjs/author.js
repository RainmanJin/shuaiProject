$(function(){
	//------------------初始化设置1.文章 粉丝 关注数量 2.赞和关注状态------------------
	//用户等级初始化
	var user_level = $("#userLevel").val();
	if (user_level == 2) {
		$("#userLevelB").css('display','');
		$("#userLevelB").attr('class','strong_red');
	}else if(user_level == 3){
		$("#userLevelB").css('display','');
		$("#userLevelB").attr('class','strong_blue');
	}
	//关注数量
	var attentionsCount = myAttentionsCount(the_id);
	//粉丝数量
	var fansCount = myFansCount(the_id);
	$("#attentionsCount").text(attentionsCount);
	$("#fansCount").text(fansCount);
	//关注状态初始化：1是已关注，2是未关注
	var att_type = $("#attType").val();
	if (att_type == 1) {
		$("#attTypeB").addClass('banner_button_l_select');
	}else{
		$("#attTypeB").removeClass('banner_button_l_select');
	}
});
//---------------------------js---------------------------------------
//---------------------------添加和取消关注start----------------------------
function attentionsOnclick(thiz){
	var obj = $(thiz);
	//如果是未关注状态，加关注
	if (obj.attr('class')=='banner_button_l') {
		obj.removeClass('banner_button_l_select');
		submitAttentions(the_id,true,function(data){
			data = parseObj(data);
			if (data.success == true) {
				//alert("关注成功")
				obj.addClass('banner_button_l_select');
			}
		});
	}else {
		//如果是已关注状态，取消关注
		submitAttentions(the_id,false,function(data){
			data = parseObj(data);
			if (data.success == true) {
				//alert("取消成功")
				obj.attr('class','banner_button_l');
			}
		});
	}
}
//---------------------------------加关注end---------------------------------
//---------------------------------赞article和活动 start---------------------------------
function zanArticleOnclick(thiz){
	var obj = $(thiz);
	var the_article_id = obj.attr('id');
	var zan_text = parseInt(obj.text());
	var zan_type = obj.parent().attr('id');
	//如果是文章
	if (zan_type == '1') {
		//未赞状态，加赞
		if (obj.attr('class')=='praise_button') {
			zanWenZhang(the_article_id,'Y',function(data){
				obj.text(zan_text+1);
				obj.attr('class','praise_button praise_button_select');
			});
		}else {
		//已赞状态，取消赞 
			zanWenZhang(the_article_id,'N',function(data){
				obj.text(zan_text-1);
				obj.attr('class','praise_button');
			});
		}
	}else{
	//如果是活动
		//未赞状态，加赞
		if (obj.attr('class')=='praise_button') {
			zanHuoDong(the_article_id,'Y',function(data){
				obj.text(zan_text+1);
				obj.attr('class','praise_button praise_button_select');
			});
		}else {
		//已赞状态，取消赞 
			zanHuoDong(the_article_id,'N',function(data){
				obj.text(zan_text-1);
				obj.attr('class','praise_button');
			});
		}
	}
}
//---------------------------------赞article和活动 end-----------------------------------
