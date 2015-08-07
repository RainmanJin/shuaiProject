/**
 * Created by wangshuai on 2015/6/25.
 */

function moerQaDialog(){
	this.recommend = function(reText,reShowT){
		var recommendCont = "";
		recommendCont += "<div class='mRecommendCont'><i></i>";
		recommendCont += reText;
		recommendCont += "</div>";
		$("body").append(recommendCont);
		setInterval(function(){$(".mRecommendCont").remove();},reShowT*1000);
	};
	this.publishSucess = function(text,minute,url){
		var publishSucess = "";
		publishSucess += "<div class='mPublishSucess'><i></i>";
		publishSucess += text;
		publishSucess += "<p>\u81EA\u52A8\u8DF3\u8F6C<span id='publishSucessTime'>";
		publishSucess +=  minute;
		publishSucess += "</span>...</p></div>";
		$("body").append(publishSucess);
		var t = self.setInterval(function(){
			$("#publishSucessTime").html(minute-1);
			if(minute <= 1){
				$(".mPublishSucess").remove();
				if(url != "" || url != " "){
					window.location.href = url;
				}
			}
			minute--;
		},1000);
	};
	this.deleteAllDraft = function(){
		var deleteAllDraft = "";
		deleteAllDraft += "<div class='moerFloat'></div>";
		deleteAllDraft += "<div class='mDeleteCont'>";
		deleteAllDraft += "<h1><i class='mDeleteCont-off'></i>\u5220\u9664\u6240\u6709\u8349\u7A3F</h1>";
		deleteAllDraft += "<p>\u4F60\u786E\u5B9A\u8981\u5220\u9664\u6240\u6709\u8349\u7A3F\u5417\uFF1F<br>\u5220\u9664\u540E\u5C06\u65E0\u6CD5\u6062\u590D\u3002</p>";
		deleteAllDraft += "<button class='mDeleteCont-yes' self='alldraft'>\u786E\u5B9A</button>";
		deleteAllDraft += "<button class='mDeleteCont-no'>\u53D6\u6D88</button>";
		deleteAllDraft += "</div>";
		$("body").append(deleteAllDraft);
	};
	this.deleteThisDraft = function(){
		var deleteThisDraft = "";
		deleteThisDraft += "<div class='moerFloat'></div>";
		deleteThisDraft += "<div class='mDeleteCont'>";
		deleteThisDraft += "<h1><i class='mDeleteCont-off'></i>\u5220\u9664\u8349\u7A3F</h1>";
		deleteThisDraft += "<p>\u4F60\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u8349\u7A3F\u5417\uFF1F</p>";
		deleteThisDraft += "<button class='mDeleteCont-yes' self='thisdraft'>\u786E\u5B9A</button>";
		deleteThisDraft += "<button class='mDeleteCont-no'>\u53D6\u6D88</button>";
		deleteThisDraft += "</div>";
		$("body").append(deleteThisDraft);
	};
	this.deleteCollection = function(){
		var deleteCollection = "";
		deleteCollection += "<div class='moerFloat'></div>";
		deleteCollection += "<div class='mDeleteCont'>";
		deleteCollection += "<h1><i class='mDeleteCont-off'></i>\u5220\u9664\u6536\u85CF</h1>";
		deleteCollection += "<p>\u4F60\u786E\u5B9A\u8981\u5220\u9664\u8FD9\u4E2A\u6536\u85CF\u5417\uFF1F</p>";
		deleteCollection += "<button class='mDeleteCont-yes' self='collection'>\u786E\u5B9A</button>";
		deleteCollection += "<button class='mDeleteCont-no'>\u53D6\u6D88</button>";
		deleteCollection += "</div>";
		$("body").append(deleteCollection);
	};
	this.recommendTopic = function(yesOrNo){
		var recommendTopic = "";
		recommendTopic += "<div class='moerFloat'></div>";
		recommendTopic += "<div class='mRecommendList'>";
		recommendTopic += "<h1><i class='mRecommendList-off'></i>\u63A8\u8350\u5230\u8BDD\u9898\u5E7F\u573A</h1>";
		recommendTopic += "<div><input type='radio' id='mRecommedRadio1' class='mRecommedRadio' name='mRecommedRadio' value='radio1' checked/><label for='mRecommedRadio1'>单选1</label></div>";
		recommendTopic += "<div><input type='radio' id='mRecommedRadio2' class='mRecommedRadio' name='mRecommedRadio' value='radio2'/><label for='mRecommedRadio2'>单选2</label></div>";
		recommendTopic += "<div><input type='radio' id='mRecommedRadio3' class='mRecommedRadio' name='mRecommedRadio' value='radio3'/><label for='mRecommedRadio3'>单选3</label></div>";
		recommendTopic += "<div><input type='radio' id='mRecommedRadio4' class='mRecommedRadio' name='mRecommedRadio' value='radio4'/><label for='mRecommedRadio4'>单选4</label></div>";
		recommendTopic += "<div><input type='radio' id='mRecommedRadio5' class='mRecommedRadio' name='mRecommedRadio' value='radio5'/><label for='mRecommedRadio5'>单选5</label></div>";
		recommendTopic += "<button class='mRecommendList-no'>\u53D6&nbsp;\u6D88</button>";
		if(yesOrNo){
			recommendTopic += "<button class='mRecommendList-yes'>\u53D6\u6D88\u63A8\u8350</button>";
		}else{
			recommendTopic += "<button class='mRecommendList-yes'>\u63A8&nbsp;\u8350</button>";
		}
		recommendTopic += "</div>";
		$("body").append(recommendTopic);
	};
}

var moerQa = new moerQaDialog();

$(document).on("click",".mDeleteCont-yes",function(){
	console.log("Sucess!");
	$(".moerFloat,.mDeleteCont").remove();
	if($(this).attr("self") == "alldraft"){
		console.log("删除全部草稿");
	}else if($(this).attr("self") == "thisdraft"){
		console.log("删除这条草稿");
	}else if($(this).attr("self") == "collection"){
		console.log("删除收藏");
	}
});
$(document).on("click",".mDeleteCont-no,.mDeleteCont-off",function(){
	$(".moerFloat,.mDeleteCont").remove();
});
$(document).on("click",".mRecommendList-yes",function(){
	$(".mRecommedRadio").each(function(){
		if($(this).is(":checked")){
			console.log($(this).val());
		};
	});
	$(this).parent().remove();
	$(".moerFloat").remove();
});
$(document).on("click",".mRecommendList-no",function(){
	$(this).parent().remove();
	$(".moerFloat").remove();
});