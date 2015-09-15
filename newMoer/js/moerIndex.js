/**
 * Created by wangshuai on 2015/9/14.
 */

var moerReq = "http://jian.jiemian.com/";
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
        dataType: "jsonp",
        success:function(result){
          if(result.rs.success == true){
            _this.addClass("moerdynamic-zan-y").html(Number($(this).html())-1);
          }
        }
      })
    }else{
      $.ajax({
        url: moerReq+"deleteMApplaudRel.json",
        data:{
          mApplaudRel_answerId:objectid
        },
        dataType: "jsonp",
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
      dataType: "jsonp",
      success:function(result){
        if(result.success == true){
          if(artDozan == Y){
            _this.addClass("moerdynamic-zan-y").html(Number($(this).html())-1);
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
      dataType: "jsonp",
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
      dataType: "jsonp",
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
  var open = _this.attr("open");
  if (eventtype == 3 || eventtype == 5) {

  }
});