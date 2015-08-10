function deleteMsg(id){
	MOER.confirm("您确定要删除该消息？",function(){
		$.post('deletesysmsg.json',"msysMsg_id=" +id,function(data){
			//获取数据
			data = $.parseJSON(data);
			if(data.success){
				$("#tr_"+id).remove();
				MOER.alertSuccess("删除成功！");
			}else{
				MOER.alertError(data.message);
			}
		});
	});
}

function deletesMsg(){
	var ids = "";
	$("input[name=msysMsg_id]").each(function(){
		if(ids!=""){
			ids+=",";
		}
		ids+=$(this).val();
	});
	var page_no = $("#page_num .red").text();
	if (page_no > 1) {
		page_no = page_no - 1;
	}
	var page_url = "usersysmsg.htm?page="+page_no;
	MOER.confirm("您确定要删除当前页的消息？",function(){
		$.post('deletessysmsg.json',"ids=" +ids,function(data){
			//获取数据
			data = $.parseJSON(data);
			if(data.success){
				location.href = page_url;
			}else{
				MOER.alertError(data.message);
			}
		});
	});
}