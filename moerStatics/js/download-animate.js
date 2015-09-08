/**
 * Created by wangshuai on 2015/9/8.
 */


$(function(){
  $("#moerdown").fullpage({
    'navigation': true,
    'css3': true,
    'scrollingSpeed': 1000,
    'continuousVertical':true,
    afterLoad: function(anchorLink, index){
      if(index == 1){
        $(".moerdown-pcont").hide();
        $('.section1 h1').show().addClass('fadeInDown animated1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeInDown animated1');
        });
        $('.section1 .moerdown-ewm').show();
        $('.section1 .moerdown-btn').show().addClass('fadeInUp animated1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeInUp animated1');
        });
      }
      if(index == 2){
        $('.section2 *').show().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeIn animated');
        });
      }
      if(index == 3){
        $('.section3 *').show().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeIn animated');
        });
      }
      if(index == 4){
        $('.section4 *').show().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeIn animated');
        });
      }
    },
    onLeave: function(index,nextIndex){
      if(index == '1'){
        $('.section1 h1').hide();
        $('.section1 .moerdown-ewm').hide();
        $('.section1 .moerdown-btn').hide();
        $(".moerdown-pcont").hide();
        $(".moerdown-phone").show().addClass('fadeIn animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
          $(this).removeClass('fadeIn animated');
        });
        if(nextIndex == "2"){
          $(".moerdown-pcont").show();
          $(".moerdown-pscroll").css("top",0);
        }
        if(nextIndex == "3") {
          $(".moerdown-pcont").show();
          $(".moerdown-pscroll").css("top",-445);
        }
        if(nextIndex == "4"){
          $(".moerdown-pcont").show();
          $(".moerdown-pscroll").css("top",-890);
        }
      }
      if(index == '2'){
        $('.section2 *').hide();
        if(nextIndex == "1"){
          $(".moerdown-phone").addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).hide().removeClass('fadeOutUp animated');
          });
        }
        if(nextIndex == "3"){
          $(".moerdown-pscroll").animate({
            top: -445
          },800);
        }
        if(nextIndex == "4"){
          $(".moerdown-pscroll").animate({
            top: -890
          },800);
        }
      }
      if(index == '3'){
        $('.section3 *').hide();
        if(nextIndex == "1"){
          $(".moerdown-phone").addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).hide().removeClass('fadeOutUp animated');
          });
        }
        if(nextIndex == "2"){
          $(".moerdown-pscroll").animate({
            top: 0
          },800);
        }
        if(nextIndex == "4"){
          $(".moerdown-pscroll").animate({
            top: -890
          },800);
        }
      }
      if(index == '4'){
        $('.section4 *').hide();
        if(nextIndex == "1"){
          $(".moerdown-phone").addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).hide().removeClass('fadeOutUp animated');
          });
        }
        if(nextIndex == "2"){
          $(".moerdown-pscroll").animate({
            top: 0
          },800);
        }
        if(nextIndex == "3"){
          $(".moerdown-pscroll").animate({
            top: -445
          },800);
        }
      }
    },
    afterRender: function(){
      $('.section1 h1').show().addClass('fadeInDown animated1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('fadeInDown animated1');
      });
      $('.section1 .moerdown-ewm').show();
      $('.section1 .moerdown-btn').show().addClass('fadeInUp animated1').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass('fadeInUp animated1');
      });
    }
  });
});