/**
 * Created by wangshuai on 2015/9/14.
 */

var moerReq = "http://moer.jiemian.com/";
var userId = "100653137";

//点赞事件
$(document).on("click",".moerdynamic-zan",function(){
  var _this = $(this);
  var eventtype = _this.parents(".moerdynamic-item").attr("eventtype");
  var objectid = _this.parents(".moerdynamic-item").attr("objectid");
  if (eventtype == 3 || eventtype == 5){
    if(_this.hasClass("moerdynamic-zan-y") == false){
      $.ajax({
        url: moerReq+"saveMApplaudRel.json",
        data:{
          mApplaudRel_answerId:objectid,
          type:1,
          answerContent:"",
          userId:userId,
          questionId:2617
        },
        dataType: "json",
        success:function(result){
          if(result.rs.success == true){
            _this.addClass("moerdynamic-zan-y").html(Number($(this).html())+1);
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
            _this.removeClass("moerdynamic-zan-y").html(Number($(this).html())-1);
          }
        }
      })
    }
  }else{
    var artDozan = "Y";
    if(_this.hasClass("moerdynamic-zan-y") == false){
      artDozan = "N";
    }
    $.ajax({
      url: moerReq+"wapcommon_doZan.json",
      data:{
        targetId:objectid,
        idDoZan: artDozan,
        zanType:1
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(artDozan == Y){
            _this.addClass("moerdynamic-zan-y").html(Number($(this).html())+1);
          }else{
            _this.removeClass("moerdynamic-zan-y").html(Number($(this).html())-1);
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
      collection = 1;
    }else{
      collection = 2;
    }
    $.ajax({
      url: moerReq+"updateAnswerCollectLog.json",
      data: {
        mAnswer_id: objectid,
        type: collection
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(collection == 1){
            _this.attr("collection","N").html("已收藏");
          }else{
            _this.attr("collection","Y").html("收藏");
          }
        }
      }
    });
  }else{
    if(collection == "N"){
      collection = "Y";
    }
    $.ajax({
      url: moerReq+"wapcommon_doCollect.json",
      data: {
        targetId: objectid,
        isDoCollect: collection,
        collectType:1
      },
      dataType: "json",
      success:function(result){
        if(result.success == true){
          if(collection == 1){
            _this.attr("collection","N").html("已收藏");
          }else{
            _this.attr("collection","Y").html("收藏");
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
    if(commentopen == 0){
      $.ajax({
        url: moerReq+"showAnswerComments.json",
        data: {
          mAnswer_mainAnswerId: objectid,
          mAnswer_questionId: 2005
        },
        dataType: "json",
        success: function(result){
          result = eval(result);
          if(result.success == true){
            result = result.data.answerCommentForMainAnswerList;
            _this.attr("commentopen","1");
            comment += "<div class='dynamic-comment'><em></em><div class='dynamiccomment-input'><input type='text' placeholder='写下你的评论...'/><span>取消</span><button>评论</button></div>";
            for(var i=0;i<result.length;i++){
              comment += "<div class='dynamiccomment-item'>";
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
            comment += "</div>";
            _this.parents(".moerdynamic-footer").after(comment);
          }
        }
      });
    }else{
      _this.parents(".moerdynamic-footer").siblings(".dynamic-comment").remove();
      _this.attr("commentopen","0");
    }
  }else{
    if(commentopen == 0){
      $.ajax({
        url: moerReq+"getArticleCommentsJson.json",
        data: {
          articleId: objectid
        },
        dataType: "json",
        success: function(result){
          result = eval(result);
          if(result.success == true){
            result = result.data.evaluateList;
            _this.attr("commentopen","1");
            comment += "<div class='dynamic-comment'><em></em><div class='dynamiccomment-input'><input type='text' placeholder='写下你的评论...'/><span>取消</span><button>评论</button></div>";
            for(var i=0;i<result.length;i++){
              comment += "<div class='dynamiccomment-item'>";
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
            comment += "</div>";
            _this.parents(".moerdynamic-footer").after(comment);
          }
        }
      });
    }else{
      _this.parents(".moerdynamic-footer").siblings(".dynamic-comment").remove();
      _this.attr("commentopen","0");
    }
  }
});