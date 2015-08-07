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
      $("#main-cont").animate({left:"212px"},"fast");
      $("#sidebar").animate({left:0},"fast").andSelf().attr("show",1);
    }else {
      $(".float-block").hide();
      $("#main-cont").css('width',"100%");
      $("#sidebar").animate({left:"-212px"},"fast").andSelf().attr("show",0);
      $("#main-cont").animate({left:0},"fast");
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
  $("#dd-select-1 li").click(function(){
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
  function dsBtn(){
    var priceVal = $("#ds-price-cont .ds-select").attr("value");
    if(priceVal == ""){
      alert("自定义金额为空或不合法！");
    }else{
      alert("支付金额为"+priceVal);
    }
  }
  $("#ds-btn").bind("click",function(){dsBtn()})

  // 分享按钮，点击显示和隐藏
  $("#share-btn").click(function(){
    $(".share-float").show();
    $("#share-dialog").animate({bottom:"0px"},"fast");
  })
  $("#share-cancel").click(function(){
    $(".share-float").hide();
    $("#share-dialog").animate({bottom:"-157px"},"fast");
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
  $(window).scroll(function(){
    scrollArticleBtn();
  })

  try {
    var fkBtnTop = $("#article-fk").offset().top + 30;
  }catch(error){};
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

  function footBottom(){
    var wHeight = $(window).height();
    var fOffsetTop = $(".footer").offset().top;
    console.log(wHeight);
    console.log(fOffsetTop);
    if(wHeight > fOffsetTop) {
      $(".footer").css({"position":"fixed","bottom":0});
    }else{
      $(".footer").css("position","relative");
    }
  }
  //footBottom();

  // 需要在屏幕大小改变的时候执行的函数
  $(window).resize(function(){
    dsPerson();
    //footBottom();
  });

  // 判断页面是否有上级
  console.log(document.referrer);
  console.log(window.location.host);
  var goBack = document.referrer;
  if(goBack == "" || goBack == window.location.href){
    $(".header-back").addClass('header-home').andSelf().removeClass('header-back');
    $(".header-back").attr("href",window.location.host);
  }

})