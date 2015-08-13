$(document).ready(function(){
	$(".evaluation_box table td form input.operation2").unbind('click').bind('click',function(){
		if(isLogin()){
			$(this).parent().parent().next("div").slideToggle(400).siblings('.message_box').slideUp(400);
		}		
	});
	$(".evaluation_box table td form input.operation3").unbind('click').bind('click',function(){
		$(this).parent().parent().next("div").next("div").slideToggle(400).siblings('.reply_box').slideUp(400);
	});
	$(".commend-body").hover(
		function(){
			$(this).children("form").children("a").css("display","inline-block");			
		},
		function(){
			$(this).children("form").children("a").css("display","none");
		}
	);
	updateCommentCurtime();
	
    $(".ds-body ul li,.ds-other-price").each(function(n){
        $(this).click(function(){
          if((!$(this).hasClass("ds-li-active")) && n!=6) {
            $(this).addClass("ds-li-active").andSelf().siblings().removeClass("ds-li-active");
            $(".ds-price").hide()
          }else if (n == 6) {
            $(".ds-body ul li").removeClass("ds-li-active");
            $(".ds-price").css("display","inline-block");
          }
        })
      });
      $(".shang-user-toggle").bind("click",function(){
        if($(this).children("i").hasClass("icon-tab-top") == false){
          $(this).children("i").removeClass("icon-tab-down");
          $(this).children("i").addClass("icon-tab-top");
          $(".shang-user").hide();
        }else {
          $(this).children("i").removeClass("icon-tab-top");
          $(this).children("i").addClass("icon-tab-down");
          $(".shang-user").show();
        }
      });
      if($(".shang-user-list a").length <= 30){
        $(".shang-more").css("display","none");
      }
      $(".shang-more-slide").bind("click",function(){
        if($(this).children("i").hasClass("icon-tab-top") == true) {
          $(this).children("i").removeClass("icon-tab-top");
          $(this).children("i").addClass("icon-tab-down");
          $(".ds-author-sub").show();
          $(".shang-user-list").css("max-height","inherit");
          $(this).children("span").text("收起");
        }else{
          $(this).children("i").removeClass("icon-tab-down");
          $(this).children("i").addClass("icon-tab-top");
          $(".shang-user-list").css("max-height",92);
          $(".ds-author-sub").hide();
          $(this).children("span").text("展开");
        }
      });
});