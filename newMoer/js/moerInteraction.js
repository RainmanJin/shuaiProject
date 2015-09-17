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