//获取分页样式
//总条数
var pagingtotal=0;
//每页条数
var pagingpagesize = 0;
//总页数
var paginpages = 0;
//当前页
var paginpageno = 1;
//当前页面请求路径
var paginurl;
//锚标记
var anchorTag;
/**
 * total 总条数
 * pageno 当前页数
 * pagesize 每页条数
 * classStyle 选中页样式
 * showEllipsis 是否显示省略号
 */
function getpage(total,pageno,pagesize,classStyle,showEllipsis) {
	pagingtotal = total;
	pagingpagesize = pagesize;
	paginpageno = pageno;
	classStyle = classStyle||'red';
	showEllipsis=showEllipsis||true;
	//分页html
	var pagehtml = "";
	//总页数
	var pages = Math.ceil(total/pagesize);
	//如果没有分页数据
	if(pages<1){
		$(".page_num").hide();
		$(".page_num_group").hide();
		return;
	}else{
		$(".page_num").show();
		$(".page_num_group").show();
	}
	paginpages = pages;
	if(pageno>pages){
		return;
	}else if(pageno<1){
		return;
	}
	if(pages>7){
		//大于7页
		//起始页
		var pagestart = 1;
		if(pageno>3){//如果当前页小于等于3页
			pagestart += pageno - 3;
		}
		if(pages-pagestart<7){
			pagestart = pages-6;
		}
		
		for(var i=pagestart;i<=pages&&pages-i>-1&&i-pagestart<7;i++){
			pagehtml+="<a style='cursor: pointer;' onclick='clickpage("+i+")'  num='"+i+"'>"+i+"</a>";
		}		
		//是否存在...
		if(pages-pagestart>=7 && showEllipsis){
			pagehtml+="<a>...</a>";//显示前7页
			pagehtml+="<a style='cursor: pointer;' onclick='clickpage("+pages+")'  num='"+pages+"'>"+pages+"</a>";
		}
	}else{
		//小于8页
		for(var i=1;i<=pages;i++){
			pagehtml+="<a style='cursor: pointer;' onclick='clickpage("+i+")'  num='"+i+"'>"+i+"</a>";
		}
	}
	$("#page_num").html(pagehtml);
	//为当前页添加样式
	$("#page_num a[num="+pageno+"]").addClass(classStyle);
	
}
/**
 * 初始按钮事件
 * @param url   articleDetails.htm?articleId=100&page=
 * tag 锚标记 本页面自己定义，点击后需要跳转到指定地点
 * @return
 */
function btnclick(url,tag){
	paginurl = url;
	anchorTag=tag;
	//首页
	if(1!=paginpageno){
		$("#firstpage").click(function(){
			paginurl=url+1;
			if(!isEmpty(anchorTag)){
				paginurl+=anchorTag;
			}
			location.href=paginurl;
		});
	}
	//最后一页
	if(paginpages!=paginpageno){
		$("#lastpage").click(function(){
			if(paginpages>0){
				paginurl=url+paginpages;
				if(!isEmpty(anchorTag)){
					paginurl+=anchorTag;
				}
				location.href=paginurl;
			}
		});
	}
	//上一页
	$("#backpage").click(function(){
		var pageno = parseInt(paginpageno)-1;
		if(pageno>0){
			paginurl=url+pageno;
			if(!isEmpty(anchorTag)){
				paginurl+=anchorTag;
			}
			location.href=paginurl;
		}
	});
	//下一页
	$("#nextpage").click(function(){
		if(paginpageno<paginpages){
			var pageno = parseInt(paginpageno)+1;
			paginurl=url+pageno;
			if(!isEmpty(anchorTag)){
				paginurl+=anchorTag;
			}
			location.href=paginurl;
		}
	});
}
//点击页码
function clickpage(num){
	if(num!=paginpageno&&paginpages>0&&num<=paginpages&&num>0){
		var urlStr= paginurl+num;
		if(!isEmpty(anchorTag)){
			urlStr+=anchorTag;
		}
		location.href=urlStr;
	}
}

$(function(){
	//跳页
	$(".page_num_group input").keypress(function(e) {
        if (e.keyCode == 13) {
            clickpage($(e.target).val());
        }
    });
});