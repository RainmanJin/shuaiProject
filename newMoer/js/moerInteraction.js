/**
 * Created by wangshuai on 2015/9/17.
 */

$(document).on("click",".headersearch-btn",function(){
  $(".headersearch-cont").show();
  $(".headersearch-input").focus();
});
$(".headersearch-input").on({
  "blur": function () {
    $(this).val("");
    $(".headersearch-cont").hide();
    $(".header-dropdown").hide();
  },
  "keydown": function (e) {
    var search_name = $("#search_text").val();
    if(e.keyCode==13){
      location.href = "search.htm?searchName="+search_name;
    }
  }
});
$(document).on("click",".aside-tab a",function(){
  var index = $(this).index();
  $(this).addClass("on").siblings().removeClass("on");
  $(this).parents(".aside-block").children(".asidetab-cont").hide().eq(index).show();
});

//找高手、筛选下拉
$(document).on("click",".zgstab-select span.zgstab-span",function(){
  if($(this).hasClass("zgstab-up") == true){
    $(this).removeClass("zgstab-up");
  }else{
    $(this).addClass("zgstab-up");
  }
  $(this).siblings("ul").stop().slideToggle();
});
//找高手、筛选、选择option
$(document).on("click",".zgstab-select ul li",function(){
  $(".zgstab-span").html($(this).html());
  $(this).hide().andSelf().siblings("li").show();
  $(this).parents("ul").slideUp();
  $("span.zgstab-span").removeClass("zgstab-up");
});
//找高手。周、月、总收益排行
$(document).on("click",".zgs-tab li",function(){
  $(this).addClass("on").siblings("li").removeClass("on");
  var profit = $(this).index();
  //profit 0=周 1=月 2=总
  console.log(profit);
});

//页面加载完成后--加载收益率
$(document).ready(function(){
  profitYield();
});

//加载收益率
function profitYield(){
  $(".profit-yield").each(function(n){
    var yield = Number($(this).attr("yield"));
    if(yield > 0){
      $(this).addClass("profityield-up");
      if(yield > 50){
        $(this).children(".profityield-right").height("100%");
        $(this).children(".profityield-left").height(2*(Number(yield)-50)+"%");
      }else{
        $(this).children(".profityield-right").height(2*Number(yield)+"%");
      }
    }else{
      yield = -(yield);
      $(this).addClass("profityield-down");
      if(yield > 50){
        $(this).children(".profityield-left").height("100%");
        $(this).children(".profityield-right").height(2*(Number(yield)-50)+"%");
      }else{
        $(this).children(".profityield-left").height(2*Number(yield)+"%");
      }
    }
  });
}