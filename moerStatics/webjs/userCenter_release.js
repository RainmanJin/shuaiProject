//编辑文章
	function editArticle(articleID){
		location.href='editarticle.htm?articleID='+articleID;
	}
	//1上架,2下线
	function updateArticleStatus(articleID,thiz){
		var msg = "" ; 
		var status = $(thiz).attr("name");
		var articleName = $("#tr_"+articleID+" h2").text();
		if(status==2){
			msg = "您确定要下架该文章？";
		}else{
			msg = "您确定要上线该文章？";
		}	
		MOER.confirm(msg,function(){
			var params={
				authorArticle_articleStatus:status,
				ids:articleID
			}
			$.post('updateArticleStatus.json',params,function(data){
				data = $.parseJSON(data);
				if(data.success){
					if(status==2){
						$(thiz).attr("name",1);
						$(thiz).html("上线");
						$("#tr_"+articleID+" code").removeClass("articles_style1");
						$("#tr_"+articleID+" code").addClass("articles_style2");
						$("#tr_"+articleID+" code").html("已下架");
						$("#tr_"+articleID+" h2").html(articleName);
						MOER.alertSuccess("下架成功！");
					}else{
						$(thiz).attr("name",2);
						$(thiz).html("下架");
						$("#tr_"+articleID+" code").removeClass("articles_style2");
						$("#tr_"+articleID+" code").addClass("articles_style1");
						$("#tr_"+articleID+" code").html("上架文章");
						$("#tr_"+articleID+" h2").html('<a style="text-decoration: none" target="_blank" href="articleDetails.htm?articleId='+articleID+'">'+articleName+'</a>');
						MOER.alertSuccess("上线成功！");
					}	
				}else{
					MOER.alertError(data.message);
				}
			});
		});
	}
	
	//删除
	function deleteArticle(articleID){
		MOER.confirm("您确定要删除该文章？",function(){
			var params={
				authorArticle_id:articleID
			}
			$.post('deleteArticle.json',params,function(data){
				data = $.parseJSON(data);
				if(data.success){
					$("#tr_"+articleID).remove();
					MOER.alertSuccess("删除成功！");
				}else{
					MOER.alertError(data.message);
				}
			});
		});	
	}
	
	
	//编辑活动
	function editActivity(activityID){
		location.href='editactivity.htm?activityID='+activityID;
	}
	//1上架,2下线
	function updateActivityStatus(activityID,thiz){
		var msg = "" ; 
		var status = $(thiz).attr("name");
		var activityName = $("#tr_"+activityID+" h2").text();
		if(status==2){
			msg = "您确定要下架该活动？";
		}else{
			msg = "您确定要上线该活动？";
		}	
		MOER.confirm(msg,function(){
			var params={
				mActivityOffline_activityStatus:status,
				mActivityOffline_id:activityID
			}
			$.post('updateActivityStatus.json',params,function(data){
				data = $.parseJSON(data);
				if(data.success){
					if(status==2){
						$(thiz).attr("name",1);
						$(thiz).html("上线");
						$("#tr_"+activityID+" code").removeClass("articles_style1");
						$("#tr_"+activityID+" code").addClass("articles_style2");
						$("#tr_"+activityID+" code").html("已下架");
						$("#tr_"+activityID+" h2").html(activityName);
						MOER.alertSuccess("下架成功！");
					}else{
						$(thiz).attr("name",2);
						$(thiz).html("下架");
						$("#tr_"+activityID+" code").removeClass("articles_style2");
						$("#tr_"+activityID+" code").addClass("articles_style1");
						$("#tr_"+activityID+" code").html("上架文章");
						$("#tr_"+activityID+" h2").html('<a style="text-decoration: none" target="_blank" href="activityDetails.htm?activityId='+activityID+'">'+activityName+'</a>');
						MOER.alertSuccess("上线成功！");
					}	
				}else{
					MOER.alertError(data.message);
				}
			});
		});
	}
	
	//删除
	function deleteActivity(activityID){
		MOER.confirm("您确定要删除该文章？",function(){
			var params={
					mActivityOffline_id:activityID
			}
			$.post('deleteActivity.json',params,function(data){
				data = $.parseJSON(data);
				if(data.success){
					$("#tr_"+activityID).remove();
					MOER.alertSuccess(data.message);
				}else{
					MOER.alertError(data.message);
				}
			});
		});	
	}