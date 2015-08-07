
$(".zxg-tab-slider li.tab-slider").each(function(n){
  $(this).mouseover(function(){
    if(!$(this).hasClass("tab-slider-active")){
      $(this).addClass("tab-slider-active").andSelf().siblings(".tab-slider").removeClass("tab-slider-active");
      $(".block-body .tab-slider-cont").removeClass("tab-slider-show");
      $(".block-body .tab-slider-cont").eq(n).addClass("tab-slider-show");
    }
  })
})


$('.a-author-dialog').each(function(n){
  $(this).hover(function(){
    var thisTop = $(this).offset().top - 183;
    var thisLeft = $(this).offset().left - 15;
    $('.author-dialog').css({"top":thisTop,"left":thisLeft}).andSelf().show();
  },function(){
    $('.author-dialog').hide()
  })
})