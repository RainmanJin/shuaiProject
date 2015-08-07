// 搜索框
$(document).ready(function(){
  function search(){
    $(".search").bind("click",function(){
      $(".search-cont").fadeToggle();
    })
  }
  search();

  // 侧边栏弹出导航
  function menuToggle(){
    if($("#sidebar").attr("show") == 0) {
      var mainWidth = $(window).width();
      $(".float-block").show();
      $("#main-cont").css('width',$(window).width());
      $("#main-cont").animate({left:"212px"},100);
      $("#sidebar").animate({left:0},100).andSelf().attr("show",1);
      $("body").attr("onmousewheel","return false");/* 20150323 */
      $("body").attr("ontouchmove","return false");/* 20150324 */
    }else {
      $(".float-block").hide();
      $("#main-cont").css('width',"100%");
      $("#sidebar").animate({left:"-212px"},100).andSelf().attr("show",0);
      $("#main-cont").animate({left:0},100);
      $("body").removeAttr("onmousewheel");/* 20150323 */
      $("body").removeAttr("ontouchmove");/* 20150324 */
    }
  }
  $("#menu-bar,.float-block").click(function(){menuToggle()})

  // 投资观点个人介绍
  // $("#tzgd-person").width($(window).width()-80);
  // $(window).resize(function(){
  //   console.log("窗口大小改变");
  //   $("#tzgd-person").width($(window).width()-80);
  // })

  // 订单页面，底部金额
  var ddPrice = $("#dd-price").text();
  $("#realPrice").text(ddPrice);

  //确认订单切换
  $("#dd-select-1 li,#dd-select-3 li,#dd-select-4 li").click(function(){
    $(this).addClass("dd-select").andSelf().siblings('li').removeClass('dd-select');
  })

  $("#dd-select-2 li").click(function(){
    if($(this).hasClass('yhq-select') == true){
      $(this).removeClass('yhq-select');
      $("#realPrice").text(ddPrice);
    }else{
      $(this).addClass('yhq-select').andSelf().siblings('li').removeClass('yhq-select');
      $("#realPrice").text(ddPrice - ($(this).children('em').children('.yhq-price').text()));
    }
  })

  // 打赏金额
  $("#ds-input").change(function(){
    $("#ds-price-cont .ds-other-price").attr("value",$(this).val())
  })
  $("#ds-price-cont li").bind("click",function(){
    if($(this).hasClass("ds-select") == false){
      $(this).addClass("ds-select").andSelf().siblings("li").removeClass("ds-select");
    }
  })
/*  function dsBtn(){
    var priceVal = $("#ds-price-cont .ds-select").attr("value");
    if(priceVal == ""){
      alert("自定义金额为空或不合法！");
    }
  }
  $("#ds-btn").bind("click",function(){dsBtn()})*/

  // 分享按钮，点击显示和隐藏
  $("#share-btn").click(function(){
    $(".share-float").show();
    $("#share-dialog").animate({bottom:"0px"},"fast");
    $("body").attr("onmousewheel","return false");/* 20150323 */
    $("body").attr("ontouchmove","return false");/* 20150324 */
  })
  $("#share-cancel,.share-float").click(function(){
    $(".share-float").hide();
    $("#share-dialog").animate({bottom:"-157px"},"fast");
    $("body").removeAttr("onmousewheel");/* 20150323 */
    $("body").removeAttr("ontouchmove");/* 20150324 */
  })

  // 改变字体大小
  $("#font-size").click(function(){
    if($(this).hasClass("font-sm")){
      //$("#article p").css("font-size",16);
      $("#article p").css({"font-size":16,"line-height":"25px"});
      $(this).addClass("font-lg").andSelf().removeClass("font-sm");
    }else{
      // $("#article p").css("font-size",18);
      $("#article p").css({"font-size":18,"line-height":"30px"});
      $(this).addClass("font-sm").andSelf().removeClass("font-lg");
    }
  })

  // header-back 返回按钮

  // 文章页面，马上付款

  try{
	  var fkBtnTop = $("#article-fk").offset().top;
  }catch(error){}
  
  var wHeight = $(window).height();
  
  if(fkBtnTop <= wHeight){
    $("#msfk-fixed").hide();
  }
  
  function scrollArticleBtn(){
    if(fkBtnTop <= $(window).scrollTop()){
      $("#msfk-fixed").show("slow");
    }else{
      $("#msfk-fixed").hide("slow");
    }
  }

  $(window).scroll(function(){
    scrollArticleBtn();
  })

  // 文章打赏人数列表
  function dsPerson(){
    var dsHeight = $(".ds-author-list").height();
    if(dsHeight>=45){
      $(".ds-author-list ul").css("text-align","left");
    }else{
      $(".ds-author-list ul").css("text-align","center");
    }
  }
  dsPerson();

  var fOffsetTop = $(".footer").offset().top + 74;
  function footBottom(){
    var wHeight = $(window).height();
    if(wHeight > fOffsetTop) {
      $(".footer").css({"position":"fixed","bottom":0});
    }else{
      $(".footer").css("position","static");
    }
  }
  footBottom();

  // 需要在屏幕大小改变的时候执行的函数
  $(window).resize(function(){
    //dsPerson();
    footBottom();
  });
  
  // 
  /*var goBack = document.referrer;
  if(goBack.length == 0){
    $(".header-back").addClass('header-home').andSelf().removeClass('header-back');
    $(".header-home").attr("href","http://"+window.location.host);
  }
  $(".header-back").bind("click",function(){
	  window.history.go(-1);
  });   //这一部分是20150324注释的 
  */

  // 20150325 添加
  $(".bank-tab div").each(function(n){
    $(this).click(function(){
      if($(this).hasClass("tab-select") == false){
        $(this).addClass("tab-select").andSelf().siblings().removeClass('tab-select');
        $(".bank-tab-cont .bank-tab-list").hide();
        $(".bank-tab-cont .bank-tab-list").eq(n).show();
      }
    })
  })
})