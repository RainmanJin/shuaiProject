
//加载更多
function loadmore(from){
	var keyword = $("#search_text").val();
	++page;
	if(from == "investment"){
		$.post("/investmentLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(from == "scoop"){
		$.post("/investmentLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(from == "marketDyna"){
		$.post("/marketDynaLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(from == "wapIndex"){
		$.post("/investmentLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(from =="payRecord"){
		$(".list-more").detach();
		$.post("/payRecordLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from,
			"orderType"    : orderType1
		},function(data){
			$("#payRecordList").append(data);
		});
	}else if(from =="userCenter"){
		$(".list-more").detach();
		$.post("/userCenterLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : from,
			"authorId" : authorId
		},function(data){
			$("#content_list").append(data);
		});
	}
	
}
function removeLoad(){
	if(total/5<page){
		$(".list-more").remove();
	}
}