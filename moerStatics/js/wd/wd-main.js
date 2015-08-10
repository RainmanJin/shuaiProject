$(document).ready(function(){
	//答案最终页连接
	$(document).on("click","span[class*='wdcontrol-time']",function(){
		var classNum = $(this).attr("class");
		classNum = classNum.substring(15,classNum.length);
		window.location.href="http://moer.jiemian.com/showMainAnswerDetail.htm?mAnswer_id="+classNum;
	});
 //修改答案	
  $(document).on("click",".wdmodify-self",function(){
  	if($(".ueAskSelf.edui-default").parent().is(":visible")){
  	alert("请保存之前未修改的答案");
  	return false;
  	}
  	var mainAnswerId=$(this).attr("mAnswer_id");
  	var ueAskSelfid="ueAskSelf_"+mainAnswerId;
  	var siblingsValue = $(this).siblings(".wdfinaldesc-cont").html();
  	$(this).siblings(".wdfinaldesc-cont").hide();
  	$(this).siblings(".wdfinal-ueself").show();
  	$(this).hide();
  	ueAskSelf=UE.getEditor(ueAskSelfid, options);
  	ueAskSelf.addListener("ready", function () {
        // editor准备好之后才可以使用
        ueAskSelf.setContent(siblingsValue);
	});
  });
  //修改答案编辑框的保存按钮
  $(document).on("click",".ueaskself-submit",function(){
  	var This=$(this);
  	var mAnswer_id = $(this).attr("mAnswer_id");
	ueAskSelf.execCommand('autotypeset');
  	var mAnswer_content=ueAskSelf.getContent();
  	if(mAnswer_content==''){
	 MOER.alertError("回答内容不能为空",1);
	 return false;
	}
    mAnswer_content = mAnswer_content.replace(/&nbsp;/g,"");

	  if(isContainWords(mAnswer_content)){
		  mAnswer_content = filterWord(mAnswer_content);
	  }
   	url="updateMAnswer.json";
   	$.ajax({url: url,
   	   async:false, 
   	   dataType:'json',
   	   type: "POST",
   	   data:{'mAnswer_id':mAnswer_id,'mAnswer_content':mAnswer_content},
   	   success: function(data){
   	   if(data){
   	    if(data.rs.success==true) {	  
	  	This.parent().siblings().show();
	  	This.parent().siblings(".wdfinaldesc-cont").html(mAnswer_content);
	  	This.parent().hide();
	  	$("span.wdcontrol-time-"+mAnswer_id).html("编辑于"+data.updateTime);
   	    }else{
   	        MOER.alertError(data.rs.message,1);
   	       }
   	   }
   	    }});
  });
  $(document).on("click","#comments-cancel",function(){
    $(this).parent().remove();
  });
  //评论收起
  $(document).on("click",".comments-packup",function(){
    $(this).parent().next().remove();
    $(this).hide();
  });

  //展开评论
  $(document).on("click",".wdcontrol-comments",function(){
	  var flag = checkLogin();
	  if(flag==0){
		  return false;
	  }
	//$(this).parentsUntil(".wdfinal-body").find(".wdcontrol-comments").children("u").html();
    $(this).siblings(".comments-packup").show();
    if($(this).parent().siblings(".wdlist-comments").length < 1){
    	var mAnswer_mainAnswerId=$(this).attr("mAnswer_mainAnswerId");
    	var This=$(this);
    	var questionId=This.attr("questionId");
    	var page=1;
    	//mAnswer_questionId mAnswer_mainAnswerId
    	$.post("showAnswerCommentForMainAnswerPageList.htm",{'mAnswer_questionId':questionId,'mAnswer_mainAnswerId':mAnswer_mainAnswerId,"page":page},function(data){
    		This.parent().after(data);
    		This.parents(".wdfinal-right").find(".wdcomments-text").children("textarea").focus();
    	});
    }
  });
  //分享浮层tab点击
  $(document).on("click",".wdpopup-tab span",function(){
	  if($(this).hasClass("on") == false){
	  $(this).addClass("on").andSelf().siblings().removeClass("on");
	  if($(this).index() == 1){
	  $(".wdpopup-wx").show();
	  $(".wdpopup-wb").hide();
	  }else{
	  $(".wdpopup-wb").show();
	  $(".wdpopup-wx").hide();
	  }
	  }
  });
  //回答分享
  $(document).on("click",".wdcontrol-share",function(){
	This=$(this);
	var content=This.attr("mainAnswerContent");
	content=content.replace(/<\/?.+?>/g,"");
	content=content.replace(/&nbsp;/g,"");
	var shareAnswerName=This.attr("shareAnswerName");
	var questionTitle=This.attr("questionTitle");
	if(questionTitle){
		$("#questionTitle").val(questionTitle);
	}
	var mainAnswerId=This.attr("mainAnswerId");
	var _moer_url="http://moer.jiemian.com/showMainAnswerDetail.htm?mAnswer_id="+mainAnswerId;
	$("#share_weixin_url").attr("src",'http://s.jiathis.com/qrcode.php?url='+_moer_url);
	$("#share_weixin_url").attr("mainAnswerId",mainAnswerId);
	$("#shareContent").text(content);
	$("#shareAnswerName").val(shareAnswerName);
	$("#shareType").val(0);
    $("#wdpopup-share").show();
  });
  //问题分享
  $(document).on("click","#questionShare",function(){
		This=$(this);
		var content=This.attr("questionTitle");
		var _moer_url ="http://moer.jiemian.com/showQuestionDetail.htm?mQuestion_id="+questionId;
		$("#share_weixin_url").attr("src",'http://s.jiathis.com/qrcode.php?url='+_moer_url);
		$("#shareContent").text(content);
		$("#shareType").val(1);
	    $("#wdpopup-share").show();
	  });
  $(document).on("click","#shareWeiBoSubmit",function(){
	  	//分享主体内容
	  	var content=$("#shareContent").text();
	  	var shareType=$("#shareType").val();
	  	var _moer_url="";
	  	var _moer_share_title =""; 	
	  	if(shareType=="1"){
	  		//分享问题
	  		  _moer_url ="http://moer.jiemian.com/showQuestionDetail.htm?mQuestion_id="+questionId;
	  		_moer_share_title=_moer_share_title+" "+content+" (分享自@摩尔金融)";
	  	}else {
	  		//分享回答
	  		var mainAnswerId=$("#share_weixin_url").attr("mainAnswerId");
	  		_moer_url="http://moer.jiemian.com/showMainAnswerDetail.htm?mAnswer_id="+mainAnswerId;
	  		var shareAnswerName=$("#shareAnswerName").val();
	  		var questionTitle=$("#questionTitle").val();
			//分享问题
	  		var first="【"+questionTitle+"】"+shareAnswerName+":";
	  		var last="...(分享自@摩尔金融)";
	  		var firstLen=first.length;
	  		var lastLen=last.length;
	  		content=content.substr(0,110-firstLen-lastLen);
	  		_moer_share_title=first+content+last;
		}
		var _moer_source = '';
		var _moer_appkey = '435105312';
		var _moer_ralateUid = '';

		var _sina_url = 'http://service.weibo.com/share/share.php?title='+_moer_share_title+'&url='+_moer_url+'&source='+_moer_source+'&appkey='+_moer_appkey+'&searchPic=false&relateUid='+_moer_ralateUid+"&changweibo=yes";
		$("#shareContent").text("");
		$("#shareType").val("");
		$("#wdpopup-share").hide();
		window.open(_sina_url);
  });
  //回答收藏
  $(document).on("click",".wdcontrol-collect",function(){
	  checkLogin();
	  var This=$(this);
	  var type=$(this).attr("collect");
	  var mAnswer_id=$(this).attr("sourceId");
	  url="updateAnswerCollectLog.json";
	  //去收藏
	  if(type==0){
		  type=1;
		  $.ajax({url: url,
			   async:false,
			   dataType:'json',
			   type: "POST",
			   data:{'mAnswer_id':mAnswer_id,'type':type},
			   success: function(data){
			   if(data){
			    if(data.success==true) {
			    	This.attr("collect","1");
			    	This.find("u").html("已收藏");
			    }else{
			    	MOER.alertError(data.message,1);
			       }
			   }
			      }});
	  }else{
		  type=2;
		  $.ajax({url: url,
			   async:false,
			   dataType:'json',
			   type: "POST",
			   data:{'mAnswer_id':mAnswer_id,'type':type},
			   success: function(data){
			   if(data){
			    if(data.success==true) {
			    	This.attr("collect","0");
			    	This.find("u").html("收藏");
			    }else{
			    	MOER.alertError(data.message,1);
			       }
			   }
			      }});
	  }
	  

  });
  //举报问题
  $(document).on("click","#reportQuestion",function(){
	  	var reportSourceId= $(this).attr("reportSourceId");
	  	var sourceCreateUserId= $(this).attr("sourceCreateUserId");
	  	$("#reportSourceId").val(reportSourceId);
	  	$("#sourceCreateUserId").val(sourceCreateUserId);
	  	$("#reportType").val(1);
	    $("#wdpopup-report").show();
	  });
  //举报回答
  $(document).on("click",".wdcontrol-report",function(){
	  	var flag = checkLogin();
	  	if(flag==0){
	  		return false;
	  	}
	  	var reportSourceId= $(this).attr("reportSourceId");
	  	var sourceCreateUserId= $(this).attr("sourceCreateUserId");
	  	$("#reportSourceId").val(reportSourceId);
	  	$("#sourceCreateUserId").val(sourceCreateUserId);
	  	$("#reportType").val(0);
	  	$("#wdpopup-report").show();
  });

  $("input[name=popupRadio]").click(function(){
    if($(this).hasClass("popupRadio7") == true){
      $(".wdpopup-report-area").removeAttr("disabled");
    }else{
      $(".wdpopup-report-area").attr("disabled","disabled");
    }
  });
  //举报保存
  $(document).on("click","#reportBtn",function(){
	  	checkLogin();
	  	var reportSourceId=$("#reportSourceId").val();
	  	var sourceCreateUserId=$("#sourceCreateUserId").val();
		var reportType=$("#reportType").val();
		var accuseReason=$("input[name=popupRadio]:checked").val();
		if(accuseReason=="其他"){
			accuseReason=$("#myreportReason").val();
			if(accuseReason==''){
				MOER.alertError("请选择举报原因",1);
				return false;
			}
		}
		var url="reportMainMAnswer.json";
		if(reportType==1){
			var url="reportMQuestion.json";
		}
	    $.ajax({url: url,
	     async:false,
	     dataType:'json',
	     type: "POST",
	     data:{'reportSourceId':reportSourceId,'sourceCreateUserId':sourceCreateUserId,'accuseReason':accuseReason},
	     success: function(data){
	     if(data){
	      if(data.success==true) {
	    	  $("#reportSourceId").val("");
	    	  $("#sourceCreateUserId").val("");
	    	  $("#reportType").val("");
	    	  $("#wdpopup-report").hide();
	      }else{
	    	  MOER.alertError("举报失败",1);
	      }
	     }
	    }});
  }); 

  //自带的评论弹窗按钮确定
  $(document).on("click","#wdcomments-button",function(){
	  var This=$(this);
	  var answerContent = $(this).parents(".wdfinal-right").find(".wdfinaldesc-cont").text();
    answerContent = answerContent.replace(/&nbsp;/g,"");
	  if(isContainWords(answerContent)){
		  answerContent = filterWord(answerContent);
	  }
    if(answerContent.length > 80){
      answerContent = answerContent.substring(0,80);
    }
	  var mAnswer_mainAnswerId=This.attr("mAnswer_mainAnswerId");
	  var mAnswer_questionId=This.attr("mAnswer_questionId");
	  var mAnswer_replyUserId=This.attr("mAnswer_replyUserId");
	  var mAnswer_replyId=This.attr("mAnswer_replyId");
	  var mAnswer_isAnonymous=This.attr("mAnswer_isAnonymous");
	  var mAnswer_content =This.siblings("textarea").val();
	  if(mAnswer_content==""||mAnswer_content==null){
		  MOER.alertError("评论内容不能为空",1);
		  return false;
	  }
	  //异步添加评论
	  url="saveAnswerComment.htm";
	  $.post(url,{'mAnswer_mainAnswerId':mAnswer_mainAnswerId,'mAnswer_isAnonymous':mAnswer_isAnonymous,
		  'mAnswer_questionId':mAnswer_questionId,'mAnswer_replyUserId':mAnswer_replyUserId,'mAnswer_replyId':mAnswer_replyId,'mAnswer_content':mAnswer_content,'answerContent':answerContent},function(data){
		This.parent().before(data);
    	var commentNumerObj=This.parentsUntil(".wdfinal-body").find(".wdcontrol-comments").children("u");
    	commentNumerObj.html(parseInt(commentNumerObj.html())+1);
    	This.siblings("textarea").val(null);
	  });
  });
  $(document).on("click",".wdcomments-text a",function(){
	  $(this).parents(".wdfinal-right").find(".comments-packup").hide();
	  $(this).parents(".wdlist-comments").remove();
  });
})
