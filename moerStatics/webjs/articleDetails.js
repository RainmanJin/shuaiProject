/**
 * 获取传入时间与当前时间差
 * @param datetime
 * @return strTime 格式化后的字符串时间
 */
//1为评价 2为评论
var flag=1;
function getTimeDiff2(endtime,starttime,isDate){
	var startDate;
	if(!isEmpty(starttime)){
		startDate=new Date(starttime);
	}else{
		startDate=new Date();
	}
	var endDate= new Date(endtime); 
	var df=(startDate.getTime()-endDate.getTime());
	if(df===0){
		return "刚刚";
	}else if(Math.floor(df/1000)<60){
		return Math.floor(df/1000)+"秒前";
	}else if(Math.floor(df/1000/60)<60){
		return Math.floor(df/1000/60)+"分钟前";
	}else if(Math.floor(df/1000/60/60)<24){
		return Math.floor(df/1000/60/60)+"小时前";
	}else{
		if(isDate){
			return formatDate(endDate);
		}else{
			return formatTime2(endDate);
		}		
	}
}
/** 更新当前评论时间*/
function updateCommentCurtime(){
	var currentTime=null;
	//获取当前服务器时间
	$.post('getCurrentTime.json',{},function(data){
		if(data.success){
			currentTime=data.data.datetime;			
		}
		var createTimes= $('.createTime');
		$.each(createTimes,function(){
			var obj = $(this);
			var content = obj.attr("createTime");
			obj.text(getTimeDiff2(content,currentTime));
		});
	},'json');
}

//赞文章
function zanWZ(obj){
	obj.disabled=true;
	var isZan =$(obj).hasClass("share_select6");
	var countSpan=$(obj).next("span");
	var count=Number(countSpan.text());
	var optType="Y";
	if(isZan){
		optType="N";
	}
	if(commentType=='1'){
		zanWenZhang(articleId,optType,resultProcess);
	}else if(commentType=='2'){
		zanHuoDong(articleId,optType,resultProcess)
	}
	function resultProcess(data){
		if(data.success){
			obj.disabled=false;
			if(isZan){
				$(obj).removeClass('share_select6');
				countSpan.text(--count);
			}else{
				$(obj).addClass('share_select6');
				countSpan.text(++count);
			}			
		}else{
			obj.disabled=false;
			MOER.alertError(data.message);
		}
	}
}
//收藏文章
function scWZ(obj){
	obj.disabled=true;
	var isSC =$(obj).hasClass("share_select7");
	var countSpan=$(obj).next("span");
	var count=Number(countSpan.text());
	var optType="Y";
	if(isSC){
		optType="N";
	}
	
	if(commentType=='1'){
		scWenZhang(articleId,optType,resultProcess);
	}else if(commentType=='2'){
		scHuoDong(articleId,optType,resultProcess)
	}
	function resultProcess(data){
		if(data.success){
			obj.disabled=false;
			if(isSC){
				$(obj).removeClass('share_select7');
				countSpan.text(--count);
			}else{
				$(obj).addClass('share_select7');
				countSpan.text(++count);
			}			
		}else{
			obj.disabled=false;
			MOER.alertError(data.message);
		}
	}
}
//赞文章评论
function zanWZPL(obj,id){
	obj.disabled=true;
	var isZan =$(obj).hasClass("operation1_select");
	var count=Number($(obj).val());
	var optType="Y";
	if(isZan){
		optType="N";
	}
	if(commentType=='1'){
		zanWzPinglun(id,optType,resultProcess);
	}else if(commentType=='2'){
		zanHdPingLun(id,optType,resultProcess)
	}
	
	function resultProcess(data){
		if(data.success){
			obj.disabled=false;
			if(isZan){
				$(obj).removeClass('operation1_select');
				$(obj).val(--count);
			}else{
				$(obj).addClass('operation1_select');
				$(obj).val(++count);
			}			
		}else{
			obj.disabled=false;
			MOER.alertError(data.message);
		}
	}
}
//关注
function guanZhu(obj,id){
	if(isLogin()){
		obj.disabled=true;
		var isGuanZhu =$(obj).hasClass("man_button_attion_select");
		var count=Number($(obj).val());
		var optType=true;
		if(!isGuanZhu){
			optType=false;
			MOER.confirm("确认取消关注吗？",function(){
				doSubmit();
			});
		}else{
			doSubmit();
		}
			
		function doSubmit(){
			submitAttentions(id,optType,function(data){
				if(data.success){
					obj.disabled=false;
					if(isGuanZhu){
						$(obj).removeClass('man_button_attion_select');
					}else{
						$(obj).addClass('man_button_attion_select');
					}			
				}else{
					obj.disabled=false;
					MOER.alertError(data.message);
				}
			});
		}
	}
}

function dsguanZhu(obj,id){
	if(isLogin()){
		obj.disabled=true;
		var isGuanZhu =$(obj).hasClass("btn-attention-1");
		var count=Number($(obj).val());
		var optType=true;
		if(!isGuanZhu){
			optType=false;
			MOER.confirm("确认取消关注吗？",function(){
				doSubmit();
			});
		}else{
			doSubmit();
		}
			
		function doSubmit(){
			submitAttentions(id,optType,function(data){
				if(data.success){
					obj.disabled=false;
					if(isGuanZhu){
						$(obj).removeClass('btn-attention-1');
						$(obj).addClass('btn-attention-2');
						$(obj).html("<i></i>已关注");
					}else{
						$(obj).removeClass('btn-attention-2');
						$(obj).addClass('btn-attention-1');
						$(obj).html("<i></i>加关注");
					}			
				}else{
					obj.disabled=false;
					MOER.alertError(data.message);
				}
			});
		}
	}
}

//提交评论
function submitComment(obj){
	obj.disabled=true;//禁用按钮
	var target = $(obj).attr('target');
	var buyflag = $(obj).attr('buyflag');
	var scoop = $(obj).attr('scoop');
	var prevObj;
	//target=='1' 评论或者评价 buyflag 由bugbuyflag确定
	if(target=='1'){
		prevObj = $(obj).parent().prev();
	}else{
		prevObj = $(obj).prev();
	}
	var content = prevObj.val();
	if(isEmpty(content)){
		prevObj.focus();
		obj.disabled=false;
		return;
	}else{
		//过滤敏感词
		if(isContainWords(content)){
			content=filterWord(content);
		}
		if(content.length<5){
			MOER.alertError("最少输入5个字");
			prevObj.focus();
			obj.disabled=false;
			return;
		}
		if(content.length>1000){
			MOER.alertError("字数超过限制");
			prevObj.focus();
			obj.disabled=false;
			return;
		}
		var targetId = $(obj).attr('targetId');
		var rcId = $(obj).attr('rcid');
		var commentId = $(obj).attr("commentid");
		var param={}		
		param.rcId=rcId;
		param.commentType=commentType;
		param.articleId=articleId;
		param.content=content;
		param.target=target;
		param.targetId=targetId;
		param.commentId=commentId;
		param.buyflag = buyflag;
		//添加新评论
		$.post("userCommentAdd.json",param,function(data){
			try {
				data=$.parseJSON(data);
				if(webIslogin(data)){
					obj.disabled=false;
					MOER.alertError(data.message);
				}else{
					obj.disabled=false;
				}
			} catch (e) {
				prevObj.val('');
				//启用按钮
				obj.disabled=false;
				//页面评论数+1
				commentAndEvaluateTotal=commentAndEvaluateTotal+1;
				$('[type="commentAndEvaluateTotal"]').text("点评（"+(commentAndEvaluateTotal)+"）");				
				localData.remove(prevObj.attr("name"));
				if(target=='1'){
					$("#wordsTip").html('最少输入<span class="red">5</span>个字');
					if(buyflag=='true'){
						//评价数加一
						evaluateTotal=evaluateTotal+1;
						$("#ctoal").text(evaluateTotal);
						$("tbody[id=allCommentTbody]:eq(0)").prepend(data);
						flag=1;
					}else{
						//评论数加1
						commentTotal=commentTotal+1;
						$("#tab-comment").text("评论("+commentTotal+")");
						$("tbody[id=allCommentTbody]:eq(1)").prepend(data);
						flag=2;
					}
					if(scoop=="true"){
						//评价数加一
						evaluateTotal=evaluateTotal+1;
						$("#ctoal").text(evaluateTotal);
						$("tbody[id=allCommentTbody]:eq(0)").prepend(data);
						flag=1;
					}
				}else if(target=='2'){
	        		//更新子评论总数量
	        		var curSubTotalObj=$("input[name='subCommentTotalBtn"+targetId+"']");
	        		var curSubTotal=curSubTotalObj.val();
	        		curSubTotalObj.val(Number(curSubTotal)+1);
	        		//如果没有显示子评论的div就显示出来
	        		var isHidden=$(curSubTotalObj).parent().parent().next("div").next("div").is(':hidden');
	        		if(isHidden){
	        			curSubTotalObj.trigger('click');        			
	        		}
	        		if(!isEmpty(commentId)){
	        			$("#subReplyBtn"+commentId).trigger('click');
	        		}
	        		if(isEmpty(rcId)){
	        			$("#subCommentTbody"+targetId).prepend(data);
	        		}else{
	        			$("#subTr"+commentId).after(data);
	        		}
				}
				commentInit();
			}

		});
	}
}

/**评论内容初始化*/
function commentInit(){
	var spanObj =$(".evaluation_box");
	if(commentAndEvaluateTotal>0){
		spanObj.show();
		if(evaluateTotal>0){
			$("tbody[id=allCommentTbody]:eq(0) tr:last").find("td").css("border-bottom","0px");
			$("#evaluation").show();
			$("#tab-evaluation").show();
			$("#tab-evaluation").removeClass("current");
			$("#tab-evaluation").addClass("current");
			$("#comment").hide();
			$("#tab-comment").removeClass("current")
			if(commentTotal==0){
				flag=1;
				getpage(evaluateTotal,curPage,rows,'page_mun_style5',false);
				$("#tab-comment").hide();
			}else{
				if(evaluateTotal>commentTotal){
					getpage(evaluateTotal,curPage,rows,'page_mun_style5',false);
				}else{
					getpage(commentTotal,curPage,rows,'page_mun_style5',false);
				}
				$("#tab-comment").show();
			}
		}else{
			flag=2;
		    $("#tab-evaluation").removeClass("current")
			$("#evaluation").hide();
			$("#tab-evaluation").hide();
			$("#comment").show();
			$("#tab-comment").show();
			$("#tab-comment").removeClass("current");
			$("#tab-comment").addClass("current");
			getpage(commentTotal,curPage,rows,'page_mun_style5',false);
		}
		if(flag==1){
			$("#evaluation").show();
			$("#tab-evaluation").show();
			$("#tab-evaluation").removeClass("current");
			$("#tab-evaluation").addClass("current");
			$("#comment").hide();
			$("#tab-comment").removeClass("current")
		}else if(flag==2){
			$("#comment").show();
			$("#tab-comment").show();
			$("#tab-comment").removeClass("current");
			$("#tab-comment").addClass("current");
			$("#evaluation").hide();
			$("#tab-evaluation").removeClass("current")
		}
	}else{
		getpage(commentAndEvaluateTotal,curPage,rows,'page_mun_style5',false);
		spanObj.hide();
		$("div.page_num_group").hide();
	}	
}

var localData = {
    issessionStorage:window.sessionStorage?true:false,
    set:function(key,value){
        if(this.issessionStorage){
            window.sessionStorage.setItem(key,value);
        }
    },
    get:function(key){
        if(this.issessionStorage){
            return window.sessionStorage.getItem(key);
        }
    },
    remove:function(key){
        if(this.issessionStorage){
        	window.sessionStorage.removeItem(key);
        }
    },
    removeLocalAll:function(){
    	window.sessionStorage.clear();
    }
}

function sendLetter(name,other){
	if(isLogin()){
		MOER.sendLetter(name,other,false);
	}
}

$(function(){
//	$(".inputWords").focus(function(){
//		isLogin();
//	});
	//页面刷新前事件
	window.onbeforeunload = function(){	
		var textareaArray=$(".inputWords,tbody[id=allCommentTbody] textarea");
		$.each(textareaArray,function(){
			if(!isEmpty($(this).val())){
				localData.set($(this).attr("name"),$(this).val());
			}
		});
	}
	//初始化评论框中的内容
	var textareaArray=$(".inputWords,tbody[id=allCommentTbody] textarea");
	$.each(textareaArray,function(){
		var text=localData.get($(this).attr("name"));
		$(this).val(text);
	});
		
	commentInit();
	//热股榜
	findHotStockMsg('#hotstock_tab');
	//本周热门
	findtWeekHotArticleList('#hotnews_list');
/*	getpage(pageTotal,curPage,rows,'page_mun_style5',false);*/
	btnclick(urlStr,"#oranges");
	//删除主评论或者主评价	
	$("a[name='deleteCommentA']").unbind('click').bind('click',function(){
		if(isLogin()){
			var obj = this;
			MOER.confirm("确认删除吗？",function(){			
				var commentId=$(obj).attr('commentId');
				var buyflag=$(obj).attr('buyflag');
				$.loginPost('userCommentDel.json',{commentId:commentId},function(data){
					if(data.success){
						evaluateTotal=evaluateTotal-1;
						$("#ctoal").text(evaluateTotal);
						if(buyflag=='true'){
							//评价数减1
						/*	$("#tab-evaluation").text("评价("+evaluateTotal+")");*/
						}else if(buyflag=='false'){
							//评论数减1
							evaluateTotal=evaluateTotal+1;
							commentTotal=commentTotal-1;
							$("#tab-comment").text("评论("+commentTotal+")");
							$("#ctoal").text(evaluateTotal);
						}
		
		        		var curSubTotal=$("input[name='subCommentTotalBtn"+commentId+"']").val();
		        		//删除评论时，如果他有子评论，得减去子评论的数目得到评论+评价数
		        		commentAndEvaluateTotal=commentAndEvaluateTotal-Number(curSubTotal)-1;
						$('[type="commentAndEvaluateTotal"]').text("点评("+(commentAndEvaluateTotal)+")");
						$(obj).parent().parent().parent().parent().remove();
						updateCommentCurtime();
						commentInit();
						MOER.alertSuccess(data.message);
					}else{
						MOER.alertError(data.message);
					}
				});			
			});
		}				
	});
	//删除子评论
	$("a[name='subDeleteCommentA']").unbind('click').bind('click',function(){
		if(isLogin()){
			var obj = this;	
			MOER.confirm("确认删除吗？",function(){
				var commentId=$(obj).attr('commentId');//当前评论ID
				$.loginPost('userCommentDel.json',{commentId:commentId},function(data){
					if(data.success){						
						commentAndEvaluateTotal=commentAndEvaluateTotal-1;
						$('[type="commentAndEvaluateTotal"]').text("点评("+(commentAndEvaluateTotal)+")");
						var pCommentId=$(obj).attr('pCommentId');//父评论ID
						var subCommentObj = $('input[name="subCommentTotalBtn'+pCommentId+'"]');
						subCommentObj.val(Number(subCommentObj.val())-1);
						$(obj).parent().parent().parent().parent().remove();
						updateCommentCurtime();
						commentInit();
						MOER.alertSuccess(data.message);					
					}else{
						MOER.alertError(data.message);
					}
				});
			});
		}
	});
		
	//分享
	$(".share1,.share2,.share3,.share4,.share5").bind('click',function(){
		var thisClass=$(this).attr('class');
		if(thisClass==='share2'){
			shareWeiXin("qr_box1");
		}else{
			var title = $("title:first").text();
			if(title.length>10){
				title=title.substring(0,10);
			}
			var content = (stripHTMLTag($("#strContent").html()));
			if(content.length>100){
				content=content.substring(0,100);
			}
			var pic = getImgSrc($("#strContent").html());			
			if(thisClass==='share1'){
				var data = $(this).attr('data');
				shareSina(title,content,pic,data);
			}else if(thisClass==='share3'){
				shareQqWeiBo(title,content,pic);
			}else if(thisClass==='share4'){
				shareXueQiu(title,content,pic);
			}else if(thisClass==='share5'){
				shareQqZone(title,content,pic);
			}
		}		
	});
	//发布评论的字数提示
	$(".inputWords").on('input propertychange',function(){
		var content_limit = $(this).val().length;
        var max_limit = 1000;
        var min_limit = 5;
        var in_limit = max_limit - content_limit;
        var in_limi2 = Math.abs(in_limit);
        var to_limit = min_limit - content_limit;
        if(content_limit < min_limit){
        	$("#wordsTip").html('最少输入<span class="red">'+to_limit+'</span>个字');
        }else if(( min_limit <= content_limit ) && ( content_limit <= max_limit )){
        	$("#wordsTip").html('您还可以输入<span class="red">'+in_limit+'</span>个字');
        }else{
        	$("#wordsTip").html('已经超出<span class="red">'+in_limi2+'</span>个字');
        };
	});
		
	//分享评论
	$("input[name='sinaCheckBox'],input[name='xueqiuCheckBox']").click(function(){
		//勾选分享按钮时
		if($(this).is(':checked')){			
			var title = $("title:first").text();
			var content = $(".inputWords").val();
			if(title.length>10){
				title=title.substring(0,10);
			}
			if(content.length>100){
				content=content.substring(0,100);
			}
			if($(this).attr("name")=="sinaCheckBox"){
				shareSina(title,content);
			}else{
				shareXueQiu(title,content);
			}
			$(this).attr("checked",false);
		}
	});
});