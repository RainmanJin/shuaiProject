/**
 * Created by wangshuai on 2015/9/14.
 */

var moerReq = "http://moer.jiemian.com/";

//点赞事件
$(document).on("click",".moerdynamic-zan",function(){
  var _this = $(this);
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  if (eventtype == 3 || eventtype == 5){
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    if(_this.hasClass("moerdynamic-zan-y") == false){
      $.ajax({
        url: moerReq+"saveMApplaudRel.json",
        data:{
          mApplaudRel_answerId:objectid,
          type:1,
          answerContent:"",
          userId:userId,
          questionId:questionid
        },
        dataType: "json",
        success:function(result){
          if(result.rs.success == true){
            if(!isNaN(_this.html())){
            _this.addClass("moerdynamic-zan-y").html(Number(_this.html())+1);
            }else{
              _this.addClass("moerdynamic-zan-y").html("1");
            }
          }
        }
      })
    }else{
      $.ajax({
        url: moerReq+"deleteMApplaudRel.json",
        data:{
          mApplaudRel_answerId:objectid
        },
        dataType: "json",
        success:function(result){
          if(result.rs.success == true){
            if(Number(_this.html()) == 1){
              _this.removeClass("moerdynamic-zan-y").html("赞");
            }else{
              _this.removeClass("moerdynamic-zan-y").html(Number(_this.html())-1);
            }
          }
        }
      })
    }
  }else{
    var artDozan = "Y";
    if(_this.hasClass("moerdynamic-zan-y") == true){
      artDozan = "N";
    }
    $.ajax({
      url: moerReq+"wapcommon_doZan.json",
      data:{
        targetId:objectid,
        isDoZan: artDozan,
        zanType:1
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(artDozan == "Y"){
            if(!isNaN(_this.html())){
              _this.addClass("moerdynamic-zan-y").html(Number(_this.html())+1);
            }else{
              _this.addClass("moerdynamic-zan-y").html("1");
            }
          }else{
            if(Number(_this.html()) == 1){
              _this.removeClass("moerdynamic-zan-y").html("赞");
            }else{
              _this.removeClass("moerdynamic-zan-y").html(Number(_this.html())-1);
            }
          }
        }
      }
    })
  }
});

// 回答收藏&&取消收藏
$(document).on("click",".moerdynamic-dropdown-collection",function(){
  var _this = $(this);
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  var collection = _this.attr("collection");
  if (eventtype == 3 || eventtype == 5) {
    if(collection == "Y"){
      actcollection = 2;
    }else{
      actcollection = 1;
    }
    $.ajax({
      url: moerReq+"updateAnswerCollectLog.json",
      data: {
        mAnswer_id: objectid,
        type: actcollection
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(actcollection == 1){
            _this.attr("collection","Y").html("取消收藏");
          }else{
            _this.attr("collection","N").html("收藏");
          }
        }
      }
    });
  }else{
    if(collection == "Y"){
      actcollection = "N";
    }else{
      actcollection = "Y";
    }
    $.ajax({
      url: moerReq+"wapcommon_doCollect.json",
      data: {
        targetId: objectid,
        isDoCollect: actcollection,
        collectType:1
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(actcollection == "Y"){
            _this.attr("collection","Y").html("取消收藏");
          }else{
            _this.attr("collection","N").html("收藏");
          }
        }
      }
    });
  }
});

//评论
$(document).on("click",".moerdynamic-comment",function(){
  var _this = $(this);
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  var commentopen = _this.attr("commentopen");
  var comment = "";
  if (eventtype == 3 || eventtype == 5) {
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    if(commentopen == 0){
      _this.attr("commentopen","1");
      comment += "<div class='dynamic-comment'><em></em><div class='dynamiccomment-form'><input type='text' placeholder='写下你的评论...' class='dynamiccomment-input'/><span class='dynamiccomment-cancel'>取消</span><button type='button' class='dynamiccomment-submit' disabled>评论</button></div>";
      $.ajax({
        url: moerReq+"showAnswerComments.json",
        data: {
          mAnswer_mainAnswerId: objectid,
          mAnswer_questionId: questionid
        },
        async: false,
        dataType: "json",
        success: function(result){
          result = eval(result);
          if(result.success == true){
            result = result.data.answerCommentForMainAnswerList;
            for(var i=0;i<result.length;i++){
              comment += "<div class='dynamiccomment-item' relpyid='"+ result[i].mAnswer_id +"'>";
              comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ result[i].mAnswer_createUserId +"'><img src='"+ result[i].answerUserHeadImage +"' /></a></div>";
              comment += "<div class='dynamiccomment-right'>";
              comment += "<h3><a href='/authorHome.htm?theId="+ result[i].mAnswer_createUserId +"'>"+ result[i].answerUserName +"</a></h3>";
              comment += "<p>"+ result[i].mAnswer_content +"</p>";
              comment += "<div class='dynamiccomment-footer'>";
              comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
              comment += "<span class='dynamiccomment-time'>"+ result[i].mAnswer_createTime +"</span>";
              comment += "</div>";
              comment += "</div>";
              comment += "</div>";
            }
            if(result.length>4){
              comment += "<div class='dynamiccomment-more'>更多评论</div>";
            }
          }
        }
      });
      comment += "</div>";
      _this.parents(".moerdynamic-footer").after(comment);
    }else{
      _this.parents(".moerdynamic-footer").siblings(".dynamic-comment").remove();
      _this.attr("commentopen","0");
    }
  }else{
    if(commentopen == 0){
      _this.attr("commentopen","1");
      comment += "<div class='dynamic-comment'><em></em><div class='dynamiccomment-form'><input type='text' placeholder='写下你的评论...' class='dynamiccomment-input'/><span class='dynamiccomment-cancel'>取消</span><button type='button' class='dynamiccomment-submit' disabled>评论</button></div>";
      $.ajax({
        url: moerReq+"getArticleCommentsJson.json",
        data: {
          articleId: objectid
        },
        async: false,
        dataType: "json",
        success: function(result){
          result = eval(result);
          if(result.success == true){
            result = result.data.evaluateList;
            for(var i=0;i<result.length;i++){
              comment += "<div class='dynamiccomment-item' relpyid='"+ result[i].mComment_id +"'>";
              comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ result[i].user_id +"'><img src='"+ result[i].user_portraitUrl +"' /></a></div>";
              comment += "<div class='dynamiccomment-right'>";
              comment += "<h3><a href='/authorHome.htm?theId="+ result[i].user_id +"'>"+ result[i].user_name +"</a></h3>";
              comment += "<p>"+ result[i].mComment_content +"</p>";
              comment += "<div class='dynamiccomment-footer'>";
              comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
              comment += "<span class='dynamiccomment-time'>"+ result[i].mComment_createTime +"</span>";
              comment += "</div>";
              comment += "</div>";
              comment += "</div>";
            }
            if(result.length>4){
              comment += "<div class='dynamiccomment-more'>更多评论</div>";
            }
          }
        }
      });
      comment += "</div>";
      _this.parents(".moerdynamic-footer").after(comment);
    }else{
      _this.parents(".moerdynamic-footer").siblings(".dynamic-comment").remove();
      _this.attr("commentopen","0");
    }
  }
});

//评论回复
$(document).on("focus",".dynamiccomment-input",function(){
  $(this).siblings("span").css("display","inline-block");
  $(this).siblings("button").css("display","inline-block");
});
$(document).on("click",".dynamiccomment-cancel",function(){
  $(this).hide().siblings("button").hide();
  $(this).siblings("input").val("");
});
$(document).on("keyup",".dynamiccomment-input",function(){
  var thisVal = $(this).val();
  if(thisVal.length != 0){
    $(this).siblings("button").removeAttr("disabled");
  }else{
    $(this).siblings("button").attr("disabled","disabled");
  }
});
$(document).on("click",".dynamiccomment-submit",function(){
  var _this = $(this);
  _this.attr("disabled","disabled");
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  if (eventtype == 3 || eventtype == 5) {
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    var actionuid = _this.parents(".moerdynamic-item").attr("actionuid");
    var replyContent = _this.siblings(".dynamiccomment-input").val();
    _this.parents(".moerdynamic-item").children(".moerdynamic-body").children("p").eq(0).children("span").remove();
    var answerContent = _this.parents(".moerdynamic-item").children(".moerdynamic-body").children("p").eq(0).html();
    answerContent = answerContent.replace(/<[^>]+>/g,"");
    answerContent = answerContent.substring(0,20);
    $.ajax({
      url: moerReq+"saveAnswerComment.htm",
      data:{
        mAnswer_mainAnswerId: objectid,
        mAnswer_isAnonymous: 0,
        mAnswer_questionId: questionid,
        mAnswer_replyUserId: actionuid,
        mAnswer_replyId:objectid,
        mAnswer_content: replyContent,
        answerContent: answerContent,
        format: "json"
      },
      dataType: "json",
      success: function(result){
        _this.removeAttr("disabled");
        if(result.success == true){
          var data = eval(result.data);
          var comment = "";
          comment += "<div class='dynamiccomment-item' relpyid='"+ data.mAnswer_id +"'>";
          comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ data.mAnswer_createUserId +"'><img src='"+ data.answerUserHeadImage +"' /></a></div>";
          comment += "<div class='dynamiccomment-right'>";
          comment += "<h3><a href='/authorHome.htm?theId="+ data.mAnswer_createUserId +"'>"+ data.answerUserName +"</a></h3>";
          comment += "<p>"+ replyContent +"</p>";
          comment += "<div class='dynamiccomment-footer'>";
          comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
          comment += "<span class='dynamiccomment-time'>"+ data.mAnswer_createTime +"</span>";
          comment += "</div>";
          comment += "</div>";
          comment += "</div>";
          if($(".dynamic-comment .dynamiccomment-item").length > 0){
            $(".dynamic-comment .dynamiccomment-item").eq(0).before(comment);
          }else{
            $(".dynamic-comment").append(comment);
          }
          _this.siblings(".dynamiccomment-input").val("");
        }
      }
    });
  }else{
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    var replyContent = _this.siblings(".dynamiccomment-input").val();
    $.ajax({
      url: moerReq+"userCommentAdd.json",
      data:{
        commentType: 1,
        articleId: objectid,
        content: replyContent,
        target: 1,
        targetId: 0,
        format: "json"
      },
      dataType: "json",
      success: function(result){
        _this.removeAttr("disabled");
        if(result.success == true){
          var data = eval(result.data);
          var comment = "";
          comment += "<div class='dynamiccomment-item' relpyid='"+ data.mComment_id +"'>";
          comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ data.mComment_createUserId +"'><img src='"+ data.muser_imgSmall +"' /></a></div>";
          comment += "<div class='dynamiccomment-right'>";
          comment += "<h3><a href='/authorHome.htm?theId="+ data.mComment_createUserId +"'>"+ data.mComment_createUser +"</a></h3>";
          comment += "<p>"+ data.mComment_content +"</p>";
          comment += "<div class='dynamiccomment-footer'>";
          comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
          comment += "<span class='dynamiccomment-time'>"+ data.mComment_createTime +"</span>";
          comment += "</div>";
          comment += "</div>";
          comment += "</div>";
          if($(".dynamic-comment .dynamiccomment-item").length > 0){
            $(".dynamic-comment .dynamiccomment-item").eq(0).before(comment);
          }else{
            $(".dynamic-comment").append(comment);
          }
          _this.siblings(".dynamiccomment-input").val("");
        }
      }
    });
  }
});

//回复评论的回复
$(document).on("click",".dynamiccomment-reply",function(){
  var replayComment = "<div class='dynamiccomment-sub'><input class='dynamiccomment-input' type='text' placeholder='写下你的回复...'/><button type='button' disabled class='dynamiccomment-sub-submit'>评论</button></div>";
  if($(this).parents(".dynamiccomment-footer").siblings(".dynamiccomment-sub").length < 1){
    $(this).parents(".dynamiccomment-footer").after(replayComment);
    $(this).parents(".dynamiccomment-footer").siblings(".dynamiccomment-sub").children("input").focus();
  }
});
$(document).on("click",".dynamiccomment-sub-submit",function(){
  var _this = $(this);
  _this.attr("disabled","disabled");
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  if (eventtype == 3 || eventtype == 5) {
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    var replyContent = _this.siblings(".dynamiccomment-input").val();
    var replyId = _this.parents(".dynamiccomment-item").attr("relpyid");
    _this.parents(".moerdynamic-item").children(".moerdynamic-body").children("p").eq(0).children("span").remove();
    var answerContent = _this.parents(".moerdynamic-item").children(".moerdynamic-body").children("p").eq(0).html();
    answerContent = answerContent.replace(/<[^>]+>/g,"");
    answerContent = answerContent.substring(0,20);
    $.ajax({
      url: moerReq+"saveAnswerComment.htm",
      data:{
        mAnswer_mainAnswerId: objectid,
        mAnswer_isAnonymous: 0,
        mAnswer_questionId: questionid,
        mAnswer_replyUserId: userId,
        mAnswer_replyId: replyId,
        mAnswer_content: replyContent,
        answerContent: answerContent,
        format: "json"
      },
      dataType: "json",
      success: function(result){
        _this.removeAttr("disabled");
        if(result.success == true){
          var data = eval(result.data);
          var comment = "";
          comment += "<div class='dynamiccomment-item'>";
          comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ data.mAnswer_createUserId +"'><img src='"+ data.answerUserHeadImage +"' /></a></div>";
          comment += "<div class='dynamiccomment-right'>";
          comment += "<h3><a href='/authorHome.htm?theId="+ data.mAnswer_createUserId +"'>"+ data.answerUserName +"</a><span>回复了</span><a href='/authorHome.htm?theId="+ data.mAnswer_replyUserId +"'>"+ data.replyUserName +"</a></h3>";
          comment += "<p>"+ replyContent +"</p>";
          comment += "<div class='dynamiccomment-footer'>";
          comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
          comment += "<span class='dynamiccomment-time'>"+ data.mAnswer_createTime +"</span>";
          comment += "</div>";
          comment += "</div>";
          comment += "</div>";
          $(".dynamic-comment .dynamiccomment-item").eq(0).before(comment);
          _this.siblings(".dynamiccomment-input").val("");
        }else{
        }
      }
    });
  }else{
    var questionid = _this.parents(".moerdynamic-item").attr("questionid");
    var replyContent = _this.siblings(".dynamiccomment-input").val();
    var replyId = _this.parents(".dynamiccomment-item").attr("relpyid");
    $.ajax({
      url: moerReq+"userCommentAdd.json",
      data:{
        commentType: 1,
        articleId: objectid,
        content: replyContent,
        target: 2,
        targetId: replyId,
        format: "json"
      },
      dataType: "json",
      success: function(result){
        _this.removeAttr("disabled");
        if(result.success == true){
          var data = eval(result.data);
          var comment = "";
          comment += "<div class='dynamiccomment-item' relpyid='"+ data.mComment_id +"'>";
          comment += "<div class='dynamiccomment-avatar'><a href='/authorHome.htm?theId="+ data.mComment_createUserId +"'><img src='"+ data.muser_imgSmall +"' /></a></div>";
          comment += "<div class='dynamiccomment-right'>";
          comment += "<h3><a href='/authorHome.htm?theId="+ data.mComment_createUserId +"'>"+ data.mComment_createUser +"</a></h3>";
          comment += "<p>"+ data.mComment_content +"</p>";
          comment += "<div class='dynamiccomment-footer'>";
          comment += "<div class='dynamiccomment-btn'><span class='dynamiccomment-btn-hover'>举报</span><span class='dynamiccomment-reply'>回复</span><span class='dynamiccomment-zan'>赞</span></div>";
          comment += "<span class='dynamiccomment-time'>"+ data.mComment_createTime +"</span>";
          comment += "</div>";
          comment += "</div>";
          comment += "</div>";
          $(".dynamic-comment .dynamiccomment-item").eq(0).before(comment);
          _this.siblings(".dynamiccomment-input").val("");
        }
      }
    });
  }
});

//关注问题&取消问题
$(document).on("click",".moerdynamic-attention",function(){
  var _this = $(this);
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  if(_this.hasClass("moerdynamic-attention-y") == true){
    $.ajax({
      url:moerReq+"deleteMQuestionFollowRel.json",
      data: {
        mQuestionFollowRel_questionId: objectid
      },
      dataType: "json",
      success: function(result){
        if(result.success == true){
          _this.removeClass("moerdynamic-attention-y").html("关注问题");
        }
      }
    });
  }else{
    $.ajax({
      url:moerReq+"addMQuestionFollowRel.json",
      data: {
        mQuestionFollowRel_questionId: objectid
      },
      dataType: "json",
      success: function(result){
        if(result.success == true){
          _this.addClass("moerdynamic-attention-y").html("已关注");
        }
      }
    });
  }
});

//查看是否有新动态
$(document).ready(function(){
  var t = self.setInterval(function(){hasNewMessage()},100000);
  function hasNewMessage(){
    var toptimeline = $(".moerdynamic-flow .moerdynamic-item").eq(0).attr("feedtime");
    $.ajax({
      url: moerReq+"hasNewIndexFeed.json",
      data: {
        toptimeline: toptimeline
      },
      dataType: "json",
      success: function(result){
        if(result.success == true && result.message > 0){
          $(".moerdynamic-new").show().html("您有"+result.message+"条新动态");
        }else{
          $(".moerdynamic-new").hide();
        }
      }
    });
  }
});

//获取最新动态
$(document).on("click",".moerdynamic-new",function(){
  var _this = $(this);
  var toptimeline = $(".moerdynamic-flow .moerdynamic-item").eq(0).attr("feedtime");
  $.ajax({
    url: moerReq+"getNewFeed.json",
    data: {
      toptimeline: toptimeline
    },
    dataType: "json",
    success: function(result){
      if(result != ""){
        _this.after(result);
        _this.hide();
      }
    }
  });
});

//页面加载新内容
var reload = 0;
$(document).scroll(function(){
  var dHeight = $("body").height() - $(window).height();
  var sBottom = $(document).scrollTop();
  if(dHeight == sBottom){
    reload = 1;
    var nowpage = Number($(".moerdynamic-flow").attr("nowpage"))+1;
    var feedtime = $(".moerdynamic-flow .moerdynamic-item:last").attr("feedtime");
    $.ajax({
      url: moerReq+"indexfeed.json",
      data: {
        pageNo: nowpage,
        foottimeline: feedtime
      },
      async: false,
//      dataType: "json",
      success: function(result){
        if(result != ""){
          $(".moerdynamic-flow").append(result);
          $(".moerdynamic-flow").attr("nowpage",nowpage);
          reload = 0;
        }
      }
    });
  }
});

$(document).ready(function(){
	$.ajax({
      url: moerReq+"indexfeed.json",
      async: false,
      success: function(result){
        if(result != ""){
          $(".moerdynamic-flow").append(result);
        }
      }
    });
});
