//----------------------加关注状态start-----------------------------------------
function attentionsOnclick(thiz){
	var obj = $(thiz);
	var user_id = $(obj).attr('userId');
		//未关注状态，加关注
	if (obj.attr('class') == 'man_button_attion man_button_attion_select') {
		submitAttentions(user_id,true,function(data){
			data == parseObj(data);
			if (data.success == true) {
				obj.attr('class','man_button_attion');
			}else {
				MOER.alertError("关注失败",2);
			}
		});
	}else {
		//取消关注
		MOER.confirm("确认取消关注吗？",function(){
			submitAttentions(user_id,false,function(data){
				data == parseObj(data);
				if (data.success == true) {
					obj.attr('class','man_button_attion man_button_attion_select');
				}else {
					MOER.alertError("取消失败",2);
				}
			});
		});
	}
}
//----------------------加关注状态end-----------------------------------------