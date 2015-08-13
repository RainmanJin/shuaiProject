//删除某条私信
function delById(other, pmId,obj){
	MOER.confirm("确定要删除吗？删除后不可以回复",function(){
		MOER.process();
		$.loginPost("csDel.json",{
										"pmId": pmId,
										"other": other
									},function(data){
			easyDialog.close();
			if(data.success){
				MOER.alertSuccess("删除成功！");
				$(obj).parent().parent().parent().remove();
				//location.reload();
			}else{
				MOER.alertError(data.message,1); 
			}
		});
	});
}

//删除与某人的所有私信
function del(other){
	MOER.confirm("确定要删除吗？删除后不可以回复",function(){
		MOER.process();
		$.loginPost("csDel.json","other=" + other,function(data){
			easyDialog.close();
			if(data.success){
				MOER.alertSuccess("删除成功！");
				location.reload();
			}else{
				MOER.alertError(data.message,1); 
			}
		});
	});
}

//发消息
function send(other){
	var level = $("#letter_level").val();
	var imgSmall = $("#letter_imgSmall").val();
	var csMsg = $("#csMsg").val().trim();
	
	if(csMsg==null || csMsg==""){
		MOER.alertError("发送内容不能为空！",1);
		return;
	}
	MOER.process();
	var url="csReply.json?other=" + other;
	$.loginPost(url,{msg:csMsg},function(data){
		easyDialog.close();
		if(data.success){
			MOER.alertSuccess("发送成功！");
			var trHtml = "<tr>";
			trHtml += "<td>";
			trHtml += "<img class=\"round_50\" src=\""+data.data.FILE_SERVER_PATH+imgSmall+"\">";
			trHtml += "<span><strong>我：</strong></span>";
			trHtml += "<p>"+csMsg+"</p>";
			trHtml += "<div><a onclick='delById(\"\",\""+(data.data.mPrivateMsgRelation_id-1)+"\",this)'>删除</a></div>";
			if(level==2){
				trHtml += "<img class=\"vip_img\" src=\""+cdn_path+"/images/v1.png\" />";
			}else if(level==3){
				trHtml += "<img class=\"vip_img\" src=\""+cdn_path+"/images/v2.png\" />";
			}
			trHtml += "</td>";
			trHtml += "<td valign=\"top\">"+data.data.pmTime+"</td>";
			$(".private_letter_tr").after(trHtml);
			$("#csMsg").val("");
			//location.reload();
		}else{
			MOER.alertError(data.message,1); 
		}
	});
}

/**
 * 发送私信 name 发给谁(昵称) other 发给谁(ID)
 */
function userSendLetter(name,other,obj){
	MOER.sendLetter(name, other, '1','1',function(data){
		var letter_td = $(obj).parent().parent();
		var letter_pmCnt = letter_td.find("input[type=hidden][name=letter_pmCnt]").val();
		letter_td.find("p").text(data.data.msg);
		letter_td.find(".talk").text("共有"+(parseInt(letter_pmCnt)+1)+"条对话");
		letter_td.find("input[type=hidden][name=letter_pmCnt]").val(parseInt(letter_pmCnt)+1);
		letter_td.parent().find("td").eq(1).text(data.data.pmTime);
	});
}

