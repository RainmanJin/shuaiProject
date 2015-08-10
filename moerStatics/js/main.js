//顶部文字滚动
var Scroll=null;
$(document).ready(function(){
function $(element){
if(arguments.length>1){
for(var i=0,length=arguments.length,elements=[];i<length;i++){
elements.push($(arguments[i]));
}
return elements;
}
if(typeof element=="string"){
return document.getElementById(element);
}else{
return element;
}
}
var Class={
create:function(){
return function(){
this.initialize.apply(this,arguments);
}
}
}
Function.prototype.bind=function(object){
var method=this;
return function(){
method.apply(object,arguments);
}
}
Scroll=Class.create();
Scroll.prototype={
initialize:function(element,height){
this.element=$(element);
this.element.innerHTML+=this.element.innerHTML;
this.height=height;
this.maxHeight=this.element.scrollHeight/2;
this.counter=0;
this.scroll();
this.timer="";
this.element.onmouseover=this.stop.bind(this);
this.element.onmouseout=function(){this.timer=setTimeout(this.scroll.bind(this),1000);}.bind(this);
},
scroll:function(){
if(this.element.scrollTop<this.maxHeight){
this.element.scrollTop++;
this.counter++;
}else{
this.element.scrollTop=0;
this.counter=0;
}
if(this.counter<this.height){
this.timer=setTimeout(this.scroll.bind(this),20);
}else{
this.counter=0;
this.timer=setTimeout(this.scroll.bind(this),3000);
}
},
stop:function(){
clearTimeout(this.timer);
}
}
//var myscroll=new Scroll("myscroll",40);
  }) 
 
//顶部文字下拉框  
  var j  = jQuery.noConflict();
	//top.jsp 顶部股票滚动鼠标移入，移除
  j(document).ready(function(){
	  j(".cls_container").hover(
		  function(){
			  j(".pop_up_box").show()
		  	return false;
		  },function(){
			  j(".pop_up_box").hide();
			  return false;
		  }
	  ); 
//    j(".cls_container ").mouseout(function(){
//    	j(".pop_up_box").slideUp(400)
//    	return false;
//    }); 
  }); 
  
   
/*  j(document).ready(function(){
  j(" .top_nav .t12 ").click(function(){
  j(".pop_down_box").slideToggle(400)
  return false;
  }); 
  
    })*/
	   
	
  j(document).ready(function(){
  j(" #kk ").click(function(){
  j(".dim_search").slideToggle(400)
  return false;
  }); 
  
    })
	
	  j(document).ready(function(){
  j(" td input.kk ").click(function(){
  j(".dim_search2").slideToggle(400)
  return false;
  }); 
  
    })
		  j(document).ready(function(){
  j(" .add_group input ").click(function(){
  j(".dim_search3").slideToggle(400)
  return false;
  }); 
  
    })
	
//关注取消切换  
 var j  = jQuery.noConflict();
 /* j(document).ready(function(){  
j("#idContainer2 input").click(function(){//给id为btn的元素添加点击事件
    j(this).toggleClass('und');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
})*/
 var j  = jQuery.noConflict();
//j(document).ready(function(){
//	j(".ct:gt(0)").hide();
//	j(".menu li").click(function(){
//		j(this).addClass("selected").siblings().removeClass();
//		var selContent=j(".menu li").index(this);
//		j(".ct").eq(selContent).show().siblings().hide();
//	})
//})


  j(document).ready(function(){  
j("input.article_buttonA").click(function(){//给id为btn的元素添加点击事件
j(".displayA").css("display","block");//每次点击的时候，将当前的元素切换active样式
j(".displayB").css("display","none");                        //如果有，则去掉，否则添加
});
})


 

  j(document).ready(function(){  
j("input.article_buttonB").click(function(){//给id为btn的元素添加点击事件
j(".displayB").css("display","block");//每次点击的时候，将当前的元素切换active样式
j(".displayA").css("display","none");                        //如果有，则去掉，否则添加
});
})



j(document).ready(function(){
	j(".indexL_invest li").hover(function(){
				j(this).find("h2 a").css("color","#E84C3D");	
		j(this).find("div").css("border-bottom","3px solid #E84C3D");	
	},function(){
		j(this).find("h2 a").css("color","#333333");	
		j(this).find("div").css("border-bottom","1px solid #ccc");	
	});
});

//添加标签

var lablId = -1;

j(document).ready(function() {
    j("#kk").keydown(function(event) {
        if (event.keyCode == 13) {
            var str = j("#kk").val();
            if (isNan(str) != true) {
                var li_id = j(".label li:last-child").attr('id');
                if (li_id != undefined) {
                    li_id = li_id.split('_');
                    li_id = parseInt(li_id[1]) + 1;
                } else {
                    li_id = 0;
                }
                j(".label_box").css("display", "block");
                var text = "<li id='li_" + li_id + "'><a href='javascript:;' onclick='deletes(" + li_id + ");' ><span></span>" + str + "</a><input type='hidden' name='label[" + li_id + "].name' value='" + str + "'></li>";
                j(".label").append(text);
            }
            j("#kk").val("");
        }
    })
});
function isNan(obj) {
    try {
        return obj == 0 ? true: !obj
    } catch(e) {
        return true;
    }
}


function deletes(id) {
    j("#li_" + id).remove();
    var li_id = j(".label li:last-child").attr('id');
    if (li_id == undefined) {
        j(".label_box").css("display", "none");
    }
}

function addlabl(id) {
    if (lablId == id) {
        return;
    }
    lablId = id;
    var str = j("#add_" + id).text();
    var li_id = j(".label li:last-child").attr('id');
    if (li_id != undefined) {
        li_id = li_id.split('_');
        li_id = parseInt(li_id[1]) + 1;
    } else {
        li_id = 0;
    }
    j(".label_box").css("display", "block");
    var text = "<li id='li_" + li_id + "'><a href='javascript:;' onclick='deletes(" + li_id + ");' >" + str + "</a><input type='hidden' name='label[" + li_id + "].name' value='" + str + "'></li>";
    j(".label").append(text);
}


//tab

/*j(document).ready(function(){
	j(".article_menu_ct:gt(0)").hide();
	j(".write_article_menu li").click(function(){
		j(this).addClass("article_menu_selected").siblings().removeClass();
		var selContent=j(".write_article_menu li").index(this);
		j(".article_menu_ct").eq(selContent).show().siblings().hide();
	})
})*/
j(document).ready(function(){
	j(".isu:gt(0)").hide();
	j(".indexL_stock_ul li").click(function(){
		j(this).addClass("stock_selected").siblings().removeClass();
		var selContent=j(".indexL_stock_ul li").index(this);
		j(".isu").eq(selContent).show().siblings().hide();
	})
})


  j(document).ready(function(){  
j(".a1").click(function(){
	j(this).toggleClass('addition');
        j(".v1").slideToggle(400)                          
});
j(".a2").click(function(){
	j(this).toggleClass('addition');
        j(".v2").slideToggle(400)                          
});
j(".a3").click(function(){
	j(this).toggleClass('addition');
        j(".v3").slideToggle(400)                          
});
j(".a4").click(function(){
	j(this).toggleClass('addition');
        j(".v4").slideToggle(400)                          
});
})
 
  j(document).ready(function(){  
j(".isu tr:odd").each(function(index, element) {
        j(this).find("td").css("background","#f8f8f8");
    });
	})
	
/*	 var j  = jQuery.noConflict();
  j(document).ready(function(){  
j(".viewpoint_top a.add_friend").click(function(){//给id为btn的元素添加点击事件
    j(this).toggleClass('attention');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
})

  j(document).ready(function(){  
j(".index_right_bottom a.add_friend").click(function(){//给id为btn的元素添加点击事件
    j(this).toggleClass('attention');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
})

 var j  = jQuery.noConflict();
j(document).ready(function(){
	j(".attention_ul_ct:gt(0)").hide();
	j(".user_attention_ul li").click(function(){
		j(this).addClass("attention_ul_selected").siblings().removeClass();
		var selContent=j(".user_attention_ul li").index(this);
		j(".attention_ul_ct").eq(selContent).show().siblings().hide();
	})
})
//2014-12-08 影响关注的人点击 查看作者文章的显示
/*j(document).ready(function(){
  j(".attention_man table").hide() ;
  j(".attention_man a.check_article").click(function(){
  //yzj增加
   j(this).toggleClass('check_article_select');
  j(this).next("table").slideToggle(400);

  });

})*/

	 var j  = jQuery.noConflict();
//  j(document).ready(function(){  
//j("a.man_button_attion").click(function(){//给id为btn的元素添加点击事件
//    j(this).toggleClass('man_button_attion_select');//每次点击的时候，将当前的元素切换active样式
//                                  //如果有，则去掉，否则添加
//});
//})


 var j  = jQuery.noConflict();
j(document).ready(function(){
	j(".rtt:gt(0)").hide();
	j(".user_right_set li").click(function(){
		j(this).addClass("user_right_set_selected").siblings().removeClass();
		var selContent=j(".user_right_set li").index(this);
		j(".rtt").eq(selContent).show().siblings().hide();
	})
})



// var j  = jQuery.noConflict();
//j(document).ready(function(){
//	j(".rrs:gt(0)").hide();
//	j(".user_right_release li").click(function(){
//		j(this).addClass("user_right_release_selected").siblings().removeClass();
//		var selContent=j(".user_right_release li").index(this);
//		j(".rrs").eq(selContent).show().siblings().hide();
//	})
//})

j(document).ready(function(){
  j(".order_list .order_inf").hide() ;
  j(".order_list a.check_article").click(function(){

  j(this).next("div").slideToggle(400);

  });

})

  j(document).ready(function(){  
j(".order_list a.check_article").click(function(){//给id为btn的元素添加点击事件
    j(this).toggleClass('check_article_select');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
})

//2014-12-08 影响关注的人查看作者文章旁边的图标样式
/*  j(document).ready(function(){  
j("a.check_article").click(function(){//给id为btn的元素添加点击事件
    j(this).toggleClass('check_article_select');//每次点击的时候，将当前的元素切换active样式
                                  //如果有，则去掉，否则添加
});
})*/


 var j  = jQuery.noConflict();
j(document).ready(function(){
	j(".msg:gt(0)").hide();
	j(".menu_share_group li code").click(function(){
		j(this).parent().addClass("menu_share_group_selected").siblings().removeClass();
		var selContent=j(".menu_share_group li code").index(this);
		j(".msg").eq(selContent).show().siblings().hide();
	})
})

j(document).ready(function(){
  j(".menu_share_group li div").hide() ;
  j(".menu_share_group li span").click(function(){

  j(this).next("div").slideToggle(400);

  });

})
  j(document).ready(function(){  
j(".msg table tr:even").each(function(index, element) {
        j(this).find("td").css("background","#F6F9FC");
    });
	})
	
	 var j  = jQuery.noConflict();
j(document).ready(function(){
	j(".blm:gt(0)").hide();
	j(".group_bottom_left_menu li").click(function(){
		j(this).addClass("group_bottom_left_menu_selected").siblings().removeClass();
		var selContent=j(".group_bottom_left_menu li ").index(this);
		j(".blm").eq(selContent).show().siblings().hide();
	})
})

j(document).ready(function(){
//	j(".blu:gt(0)").hide();
	j(".news_box_left_memu li").click(function(){
//		j(this).addClass("news_box_left_memu_left").siblings().removeClass("news_box_left_memu_left");
//		var selContent=j(".news_box_left_memu li ").index(this);
//		j(".blu").eq(selContent).show().siblings().hide();
	})
})

j(document).ready(function(){
	j(".nbl:gt(0)").hide();
	j(".nbl_memu li").click(function(){
		j(this).addClass("nbl_memu_select").siblings().removeClass();
		var selContent=j(".nbl_memu li ").index(this);
		j(".nbl").eq(selContent).show().siblings().hide();
	})
})

j(document).ready(function(){
	j(".nbln:gt(0)").hide();
	j(".nbln_memu li").click(function(){
		j(this).addClass("nbln_memu_select").siblings().removeClass();
		var selContent=j(".nbln_memu li ").index(this);
		j(".nbln").eq(selContent).show().siblings().hide();
	})
})

j(document).ready(function(){
	j(".nbln1:gt(0)").hide();
	j(".nbln1_memu li").click(function(){
		j(this).addClass("nbln1_memu_select").siblings().removeClass();
		var selContent=j(".nbln1_memu li ").index(this);
		j(".nbln1").eq(selContent).show().siblings().hide();
	})
})

  j(document).ready(function(){  
j(".nbln table tr:odd").each(function(index, element) {
        j(this).find("td").css("background","#F7F7F7");
    });
	})
	
	  j(document).ready(function(){  
j(".nbln1 table tr:odd").each(function(index, element) {
        j(this).find("td").css("background","#F7F7F7");
    });
	})
	
	j(document).ready(function(){
  j(".hot_link").hide() ;
  j(" .investment_box li.industry").click(function(){
  j(".hot_link").slideToggle(400);

  });

})

//	j(document).ready(function(){
//  j(".article_share input.share6").click(function(){
//
//  j(this).addClass("share_select6");
//
//  });
//
//})

//	j(document).ready(function(){
//  j(".article_share input.share7").click(function(){
//
//  j(this).addClass("share_select7");
//
//  });
//
//})

//	j(document).ready(function(){
//  j(".evaluation_box table td form input.operation1").click(function(){
//
//  j(this).addClass("operation1_select");
//
//  });
//
//})

//	j(document).ready(function(){
//  j(".evaluation_box table td form input.operation2").click(function(){
//
//  j(this).parent().next("div").slideToggle(400).siblings('div').slideUp(400);
//
//  });
//
//})

//	j(document).ready(function(){
//  j(".evaluation_box table td form input.operation3").click(function(){
//
//  j(this).parent().next("div").next("div").slideToggle(400).siblings('div').slideUp(400);
//
//  });
//
//})






	/*j(document).ready(function(){
  j("#question").click(function(){

  j(".help_box").toggleClass('box_display').siblings('div').removeClass("box_display");

  });

})*/	//取消问题


	/*j(document).ready(function(){
  j("#jianyi").click(function(){

  j(".leave_word").toggleClass('box_display').siblings('div').removeClass("box_display");

  });

}) */	//取消建议意见 

//	j(document).ready(function(){
//  j(".leave_word input.publish_button").click(function(){
//
//  j(".leave_word").toggleClass('box_display').next('div').addClass("box_display");
//
//  });
//
//})

	j(document).ready(function(){
  j(".publish_succeed input").click(function(){

  j(".publish_succeed").toggleClass('box_display');

  });

})


//	j(document).ready(function(){
//  j(".write_all .ct td input").click(function(){
//
//  j(this).toggleClass('add');
//
//  });
//
//})
//	j(document).ready(function(){
//  j(".unified_control").click(function(){
//
//  j(".ct input").toggleClass('add');
//
//  });
//
//})


j(document).ready(function(){
	j(".uc:gt(0)").hide();
	j(".uc_menu li").click(function(){
		j(this).addClass("uc_selected").siblings().removeClass();
		var selContent=j(".uc_menu li ").index(this);
		j(".uc").eq(selContent).show().siblings().hide();
	})
})



j(document).ready(function(){
	j("div.sms:gt(0)").hide();
	j(".search_memu li").click(function(){
		j(this).addClass("search_memu_selected").siblings().removeClass();
		var selContent=j(".search_memu li ").index(this);
		j("div.sms").eq(selContent).show().siblings().hide();
	})
})





//	j(document).ready(function(){
//  j(".banner_box .banner_button_l").click(function(){
//
//  j(this).toggleClass('banner_button_l_select');
//
//  });
//
//})


//	j(document).ready(function(){
//  j(".anthor_right table td a.praise_button").click(function(){
//
//  j(this).addClass('praise_button_select');
//
//  });
//
//})


/*	j(document).ready(function(){
  j("a.close_btn").click(function(){

  j(this).parent().css("display","none"); 

  });

})*/


  j(document).ready(function(){  
j(".article_share input.share2").click(function(){
        j(".qr_box1").slideToggle(400)                          
});
})



	j(document).ready(function(){
  j(".hot_link a").click(function(){

  j(this).toggleClass('a_select').siblings().removeClass('a_select');
  });

})


  j(document).ready(function(){  
j("ul.uc_menu li:last-child span").css("border","0")
})	



	j(document).ready(function () {
             j("div.t12 ").mouseover(function () {
                 j(this).find(".pop_down_box").slideDown(400);
             }); })
			 
	j(document).ready(function () {
             j("div.t12 ").mouseleave(function () {
                 j(this).find(".pop_down_box").slideUp(400);
             }); })
			 
 	j(document).ready(function () {
             j("a.t9 ").mouseover(function () {
                 j(this).find(".qr_box2").slideDown(400);
             }); })
			 
	j(document).ready(function () {
             j("a.t9 ").mouseleave(function () {
                 j(this).find(".qr_box2").slideUp(400);
             }); })       


	j(document).ready(function(){
  j(".evaluation_box table td p").hover(function(){

  j(this).next("form").children("a").css("display","inline");

  });

})


	j(document).ready(function(){
  j(".article_menu_ct form input.warning_input").click(function(){

        j(".warning").slideToggle(400);

  });

})

  var j  = jQuery.noConflict();
  j(document).ready(function(){
  j(".orderList_b_l input.confirm_text ").click(function(){
  j(".confirm_table_box").slideToggle(400)
  return false;
  }); 

})
//wbx-2014.12.04--与某些js冲突，a改为aa
function aa(x,y){
	if(j('#main').length>0){
		l =  j('#main').offset().left;
		w =  j('#main').width();
		if(j('#tbox').length>0){
		 j('#tbox').css('left',(l + w + x) + 'px');
		 j('#tbox').css('bottom',y + 'px');
		}
	}
}
function bb(){
	h =  j(window).height();
	t =  j(document).scrollTop();
	if(t > h){
		 j('#gotop').fadeIn('slow');
	}else{
		 j('#gotop').fadeOut('slow');
	}
}
 j(document).ready(function(e) {		
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
	bb();
	 j('#gotop').click(function(){
		 j(document).scrollTop(0);	
	})
});
 j(window).resize(function(){
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
});

 j(window).scroll(function(e){
	bb();		
})

function aa(x,y){
if(j('#main1').length>0){
	l =  j('#main1').offset().left;
	w =  j('#main1').width();
	 j('#tbox1').css('left',(l + w + x) + 'px');
	 j('#tbox1').css('bottom',y + 'px');
}
}

 j(document).ready(function(e) {		
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
	bb();
	 j('#gotop').click(function(){
		 j(document).scrollTop(0);	
	})
});
 j(window).resize(function(){
	//wbx-2014.12.04--与某些js冲突，a改为aa
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
});

 j(window).scroll(function(e){
	bb();		
})

	j(document).ready(function () {
             j(".indexL_advertisement").mouseover(function () {
                 j(".prev").fadeIn('slow');
				 j(".next").fadeIn('slow');
             }); })
			 
	j(document).ready(function () {
             j(".indexL_advertisement ").mouseleave(function () {
                 j(".prev").fadeOut('slow');
				  j(".next").fadeOut('slow');
             }); })
             
j(document).ready(function(){  
j(".blm table tr:last-child td ").css("border","0")
})	
  j(document).ready(function(){  
j(".blu table tr:last-child td ").css("border","0")
})


  j(document).ready(function(){  
j(".indexL_article ul li:last-child").css("border","0")
})	

  j(document).ready(function(){  
j(".indexL_activity ul li:last-child").css("border","0")
})	

  j(document).ready(function(){  
j(".message_box table tr:last-child td ").css("border","0")
})	


 j(document).ready(function(e) {
	function aa(x,y){
		if(j('#main').length>0){
	l =  j('#main').offset().left;
	w =  j('#main').width();
	 j('#tbox').css('left',(l + w + x) + 'px');
	 j('#tbox').css('bottom',y + 'px');
		}
}
function bb(){
	h =  j(window).height();
	t =  j(document).scrollTop();
	if(t > h){
		 j('#gotop').fadeIn('slow');
	}else{
		 j('#gotop').fadeOut('slow');
	}
}	
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
	bb();
	 j('#gotop').click(function(){
		 j(document).scrollTop(0);	
	})
});
 j(window).resize(function(){
	aa(10,10);//#tbox的div距浏览器底部和页面内容区域右侧的距离
});

 j(window).scroll(function(e){
	bb();		
})

 