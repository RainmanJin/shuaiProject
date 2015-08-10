$(document).ready(function (){
	//最小字号
	var min='16px'; 	
	//最大字号
	var max='20px';	

	var elm = $('.wap_strContent p');  

	
	//放大字体
	$('a.fontSizePlus').click(function() {
		elm.css({'fontSize' : max});
		$('a.fontSizeMinus').css("display","inline");
		$(this).hide();
		//取消一个单击事件
		return false;	
	});

	$('a.fontSizeMinus').click(function() {
		//如果字体大小更大或比最小值相等
		elm.css({'fontSize' : min});
		$('a.fontSizePlus').css("display","inline");
		$(this).hide();
		//取消一个单击事件
		return false;	
		
	});
	
	//重置字体大小
	//$('a.fontReset').click(function () {
		//设置默认字体大小
		// elm.css({'fontSize' : reset});
	//});
	//分享
	$(".wap_weibo,.wap_qq,.wap_web").bind('click',function(){
		var thisClass=$(this).attr('class');
		if(thisClass==='share2'){
			shareWeiXin("qr_box1");
		}else{
			var title = $("title:first").text();
			if(title.length>10){
				title=title.substring(0,10);
			}
			var content = (stripHTMLTag($("#strContent").html()));
			if(content.length>100){
				content=content.substring(0,100);
			}
			var pic = getImgSrc($("#strContent").html());			
			if(thisClass==='wap_weibo'){
				var data = $(this).attr('data');
				shareSina(title,content,pic,data);
			}else if(thisClass==='wap_web'){
				shareXueQiu(title,content,pic);
			}else if(thisClass==='wap_qq'){
				shareQqZone(title,content,pic);
			}
		}		
	});
	$(".wap_strContent img").each(function(){
		$(this).css("max-width","90%");
		$(this).attr("width","");
		$(this).attr("height","");
	});
	//updateListCurtime();
});
//一个字符串替换函数
function str_replace(haystack, needle, replacement) {
	var temp = haystack.split(needle);
	return temp.join(replacement);
}

/** 更新当前列表时间*/
function updateListCurtime(){
	var currentTime=null;
	//获取当前服务器时间
	$.post('getCurrentTime.json',{},function(data){
		if(data.success){
			currentTime=data.data.datetime;
		}
		var createTimes= $('.createTime');
		$.each(createTimes,function(){
			var obj = $(this);
			var content = obj.attr("createTime");
			obj.text(getTimeDiff2(content,currentTime,true));
		});
	},'json');
}

