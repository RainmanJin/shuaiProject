$(document).ready(function(){

  $("#comments-cancel").click(function(){
    $(this).parent().remove();
  });

  $(".comments-packup").click(function(){
    $(this).parent().next().remove();
    $(this).hide();
  });

  // 评论块中 赞
  $(".comments-praise").click(function(){
    if($(this).attr("zan") == 0) {
      $(this).siblings("h5").children("em").html("sdklfjklsd");
      $(this).children("em").html("取消赞");
      $(this).attr("zan",1);
    }else{
      $(this).siblings("h5").children("em").html("45678");
      $(this).children("em").html("赞");
      $(this).attr("zan",0);
    }
  })

  $(".wdcontrol-comments").click(function(){
    $(".comments-packup").show();
    if($(this).parent().siblings(".wdlist-comments").length < 1){
      $(this).parent().after(); //在after()里面添加数据
    }
  });

  $(".wdcontrol-share").click(function(){
    $("#wdpopup-share").show();
  });

  $(".wdcontrol-collect").click(function(){
    $(this).find("u").html("已收藏");
  });

  $(".wdcontrol-report").click(function(){
    $("#wdpopup-report").show();
  });

  $("input[name=popupRadio]").click(function(){
    if($(this).hasClass("popupRadio7") == true){
      $(".wdpopup-report-area").removeAttr("disabled");
    }else{
      $(".wdpopup-report-area").attr("disabled","disabled");
    }
  });

})
