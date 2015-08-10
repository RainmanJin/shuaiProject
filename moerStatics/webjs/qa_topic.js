function followTopic(obj){
	checkLogin();
	var topicId = $(obj).attr("topicId");
	$.post("followTopic.json",{topicId:topicId},
	function(data){
		data = parseObj(data);
      	if(data.success == true){
//      		MOER.alertError("关注成功！",2);
      		$(obj).html("取消关注");
      		$(obj).attr("onclick","deleteFollowRel(this)");
      	}
//      	else
//      		MOER.alertError("关注失败",2);
	});
}


function deleteFollowRel(obj){
	checkLogin();
	var topicId = $(obj).attr("topicId");
	$.post("deleteFollowRel.json",{topicId:topicId},
	function(data){
		data = parseObj(data);
      	if(data.success == true){
      		if($(obj).attr("deltype")=="followedtopic"){
      			$(obj).parents(".gzht-list").remove();
      		}
      		else{
      			$(obj).html("<i></i>加关注");
      			$(obj).attr("onclick","followTopic(this)");
      		}
//      		MOER.alertError("取消关注成功！",2);
      		}
//      	else
//      		MOER.alertError("取消关注失败",2);
	});
}



function loadMoreTopic(obj){
	checkLogin();
	var begin=$('.loading-more-lg').attr("actionData");
	var url = 'moerTopicAllQuestions.htm?begin='+begin;
 	$.get(url,function(html){
 		var total=$('#totaltopic').val();
 		var pagesize=$('#pagesize').val();
 		if(parseInt(begin)*pagesize < total){
 			$('.loading-more-lg').attr("actionData",parseInt(begin)+1);
 		}
 		else{
 			$('.loading-more-lg').hide();
 		}
 		$(".ht-cont").append(html);
 	});
}

function followAnswer(obj){
	checkLogin();
	var isAdd=$(obj).attr("isAdd");
	var answerId=$(obj).attr("answererId");
	var url="frontattention.json?"+"attentionUser="+answerId+"&isAdd="+isAdd;
	$.get(url,function(data){
		data = parseObj(data);
      	if(data.success == true){
      		if(isAdd == "true"){
//      			MOER.alertError("关注成功！",2);
      			$(obj).html("取消关注");
      			$(obj).attr("isAdd","false");
      		}
      		else{
//      			MOER.alertError("取消关注成功！",2);
      			$(obj).html("<i></i>加关注");
      			$(obj).attr("isAdd","true");
      		}
      	}
//      	else{
//      		if( isAdd=true ){
//      			MOER.alertError("关注失败",2);
//      		}
//      		else {
//      			MOER.alertError("取消关注失败",2);
//      		}
//      	}
	});
}

function loadMoreAllQuestion(obj){
	checkLogin();
	var topicId=$(obj).attr('topicId');
	var next=$(obj).attr('next');
	var url ="moreTopicAllQuestions.htm?topicId="+topicId+"&pageNo="+next;
	$.get(url,function(html){
		
		$('.allq-list').append(html);
		$(obj).attr('next',parseInt(next)+1);
		if(html.replace(/(^\s*)|(\s*$)/g,"")==""){
			$(obj).hide();
		}
	});
}

function loadMoreFollowedTopicQuestions(obj){
	checkLogin();
	var next=$(obj).attr('next');
	var url="moreFollowedTopicQuestion.htm?pageNo="+next;
	$.get(url,function(html){
		$('.gzht-cont').append(html);
		$(obj).attr('next',parseInt(next)+1);
		if(html.replace(/(^\s*)|(\s*$)/g,"")==""){
			$(obj).hide();
		}
	});
}

function popupAskShow(){
	checkLogin();
	$.post("toPubMQuestion.htm",{},function(data){
		$("#question_writeLocation").empty();
		 $("#question_writeLocation").append(data);
			$(".wdpopup").css("height",$("html").height());
			$(".wdpopup-ask").css("top",$(window).scrollTop()+80);
//		 var wdpopupProblem = new UE.Editor();
//		 wdpopupProblem.render("wdpopupProblem");
	});
}

function checkLogin(){
	var url = "islogin.json";
	var flag = 0;

	$.ajax({
		type:"post",
		url:url,
		async:false,
		success:function(data){
			data=eval("("+data+")");
			if(data.success==false){
				passport.sdk.login('moer',window.location.href,'');
				flag = 0;
			}else{
				flag = 1;
			}
		}
	});
	return flag;
}
function redictLogin(url){
	var rurl = "islogin.json";
	$.get(rurl,function(data){
		data=eval("("+data+")");
		if(data.success==false){
			passport.sdk.login('moer',window.location.href,'');
		}
		else {
			location.href=url;
		}
	});
}
function changeRecommond(obj){
	var pageNo = $(obj).attr("pageNo");
	if(pageNo == null){
		pageNo=1;
	}
    var url = 'recommondedAuthorInFeed.htm?pageNo='+pageNo;
 	$.get(url,function(html){
 		$('.moerwd-userlist').remove();
 		$('.wd-tab').after(html);
 		$(obj).attr("pageNo",parseInt(pageNo)+1);
 	});
}
function showOrHideContent(obj){
	   
	var stat = $(obj).attr("stat");
	var aid = $(obj).attr("answerid");
	if(stat == 1){
		$("#content_1_"+aid).hide();
		$("#headimg_"+aid).hide();
		$("#content_2_"+aid).show();
		$("#" +"packup_"+aid).text("收起");
		$("#" +"packup_"+aid).attr("stat",2);
	}else {
		$("#content_1_"+aid).show();
		$("#headimg_"+aid).css({"float":"left","margin-right":"15px","display":"inline"});
		$("#content_2_"+aid).hide();
		$("#" +"packup_"+aid).text("展开全部");
		$("#" +"packup_"+aid).attr("stat",1);
	}
}
function loading_moer_hot_question(obj){
	checkLogin();
	var next=$(obj).attr('next');
	var topicId=$(obj).attr('topicId');
	var url="hotTopicQuestion.htm?topicId="+topicId+"&pageNo="+next;
	$.get(url,function(html){
		$('.htdynamic-cont').append(html);
		$(obj).attr('next',parseInt(next)+1);
		if(html.replace(/(^\s*)|(\s*$)/g,"")==""){
			$(obj).hide();
		}
	});
}
function loadMoreFeed(obj){
	checkLogin();
	var next=$(obj).attr('next');
	//当前answerid之前的id取出
	var curr = $('#currentAnswerId').val();
	var url="lastestFeed.htm?pageNo="+next+"&curr="+curr;
	$.get(url,function(html){
		$('#currentAnswerId').remove();
		$('.gzht-cont').append(html);
		$(obj).attr('next',parseInt(next)+1);
		if(html.replace(/(^\s*)|(\s*$)/g,"")==""){
			$(obj).hide();
		}
	});
}
function loading_moer_topic_hot(obj){
	checkLogin();
	var topicId=$(obj).attr('topicId');
	var next=$(obj).attr('next');
	var url ="topicHotAnswer.htm?topicId="+topicId+"&pageNo="+next;
	$.get(url,function(html){
		$('.htdynamic-list').append(html);
		$(obj).attr('next',parseInt(next)+1);
		if(html.replace(/(^\s*)|(\s*$)/g,"")==""){
			$(obj).hide();
		}
	});
}

//是否有新的feed
function  hasNewFeed(){
	var pageid = $('#pageLastestAnswerId').val();
	if(pageid !== undefined){
		var url ="hasNewFeed.htm?curr="+pageid;
		$.get(url,function(data){
			data=eval("("+data+")");
			if(data.message>0){
				$('.have-dynamic').show();
			}
		});
	
	}
}