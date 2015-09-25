
//加载更多
function loadmore(fromParam){
	var keyword = $("#search_text").val();
	++page;
	if(fromParam == "investment"){
		$.post("/investmentHTLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"fromParam"    : fromParam,
			"from" : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(fromParam == "scoop"){
		$.post("/investmentHTLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"fromParam"    : fromParam,
			"from" : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(fromParam == "marketDyna"){
		//$.post("/wapHTMarketDynaList.htm",{
		$.post("/marketHTDynaLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"from"    : fromParam
		},function(data){
			$("#content_list").append(data);
		});
	}else if(fromParam == "wapIndex"){
		$.post("/investmentHTLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"fromParam"    : fromParam,
			"from" : from
		},function(data){
			$("#content_list").append(data);
		});
	}else if(fromParam =="payRecord"){
		$(".list-more").detach();
		$.post("/payRecordLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"fromParam"    : fromParam,
			"from" : from,
			"orderType"    : orderType1
		},function(data){
			$("#payRecordList").append(data);
		});
	}else if(fromParam =="userCenter"){
		$(".list-more").detach();
		$.post("/userHTCenterLoadMore.htm",{
			"nextPage"    : page,
			"keyword" : keyword,
			"fromParam"    : fromParam,
			"from" : from,
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