$(function(){
	var content = $("#activity_content").html();
	//初始创建编辑框
	createKindEditor('mActivityOffline_content',content);
	
	$("#mActivityOffline_summary").on('input propertychange',function(){
		//总长度300
		var maxlen = 300;
		//当前长度
		var nowlen = $(this).val().length;
		//剩余长度 
		var restlen = maxlen-nowlen;
		$("#mActivityOffline_summary_tip").css("text-indent","260px");
		$("#mActivityOffline_summary_tip").html("当前已输入"+nowlen+"个字符, 您还可以输入"+restlen+"个字符");
	});
});

//保存修改
function saveActivity(){
	var content = ke.html();
	if(isEmpty($("#mActivityOffline_summary").val().replace(/ /gm,""))){
		MOER.alertError("请输入活动摘要！");
		return;
	}else if($("#mActivityOffline_summary").val().length>300){
		MOER.alertError("摘要不能超过300字！");
		return;
	}else if(content.replace(/ /gm,"")==''){
		MOER.alertError("请输入文章内容！");
		return;
	} 
	MOER.process();
	//过滤敏感词
	if(isContainWords(content)){
		content=filterWord(content);
	}
	var params ={
		mActivityOffline_content:content,
		mActivityOffline_summary:$("#mActivityOffline_summary").val(),
		mActivityOffline_id:$("#mActivityOffline_id").val()
	};
	$.post('saveActivityEdit.json',params,function(data){
		data = $.parseJSON(data);
		easyDialog.close();
		if(data.success==true){
			//跳转页面
			//location.reload();
			MOER.pubAlert('活动编辑成功！',3);
		}else{
			MOER.alertError(data.message);
		}
	});
}