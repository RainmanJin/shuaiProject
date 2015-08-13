//赞文章
function zanWZ(obj) {
	$.post('validationGoReward.json',{"":""},function(data){
		data = parseObj(data);
		if(data.success==true){
			obj.disabled = true;
			var isZan = $("#zanID").val();
			var countSpan = $(obj).children("span").children("em");
			var count = Number(countSpan.text());
			var optType = "Y";
			if (isZan == "Y") {
				optType = "N";
			}
			
			function resultProcess(data) {
				if (data.success) {
					obj.disabled = false;
					if (isZan == "Y") {
						$(obj).children('i').removeClass("icon-unzan").andSelf().children('i').addClass("icon-zan");
						$("#zanID").val("N");
						countSpan.text(--count);
					} else {
						$(obj).children('i').removeClass("icon-zan").andSelf().children('i').addClass("icon-unzan");
						$("#zanID").val("Y");
						countSpan.text(++count);
					}
				} else {
					obj.disabled = false;
					MOER.alertError(data.message);
				}
			}
			zanWenZhang(articleId,optType,resultProcess);
		}else{
			MOER.alertError(data.message,1);
			location.href="http://passport.jiemian.com?from=moer&backurl="+encodeURIComponent(window.location.href);
		}
	});
	
	
}

