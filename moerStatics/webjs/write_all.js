$(function(){
		getPageList();
	
});
	/*var fouse=null;
		$(function(){
			$("td").find(":input").click(function(){
			if($(this).hasClass('add')){
				//取消关注				
				fouse=$(this);
				var param={"ids":$(this).attr('id')}
				$.post('writerCollection_deletes.json',param,function(data){
					data = parseObj(data);
						if(data.success==true) {
						 alert("取消关注！");
						 *fouse.removeClass('add');
						}
					});
				
			}else{
				//加关注				
				* fouse=$(this);
				submitAttentions(1,$(this).attr('id'),true)				var param={"mAttentions_wasFollowerId":$(this).attr('id')}
				$.post('writerCollection_add.json',param,function(data){
					data = parseObj(data);
						if(data.success==true) {
						alert("关注成功！");						fouse.addClass('add');
				
						}
					});
			
			}
		
  });
    });*/





//查询后台数据库
function getPageList(){
	var url = location.href;
	var reg=new RegExp("/(\\w+).htm","i");
	/*var r = url.match(reg);
	var authorType = r[2] == "scoop" ? "2" : "1";*/
	url=url.replace(reg,"/writerCollection_findPageList.json");
	$.post(url,"",function(data){
		$("#writeAll").html(data);
		//添加分页页码
		getpage($("#writeAll input[name=total]").val(),$("#writeAll input[name=page]").val(),$("#writeAll input[name=pagesize]").val(),'page_mun_style7');
		if($("#writeAll input[name=total]").val()==0){
			$(".page_num_group").hide();
		}else{
			$(".page_num_group").show();
		}
//		getpage('<s:property value="investmentList.total"/>','<s:property value="page"/>','<s:property value="pagesize"/>','page_mun_style6');
		//初始化分页点击事件
		
		var url = location.href;
		if(url.match(new RegExp("page=(\\w*)","gm"))){
			//http://localhost:8085/moer/investment_investmentInit.htm?onColumns=TZGD_LICAI&page=22
			//http://localhost:8085/moer/investment_investmentInit.htm?page=1
			url=url.replace(new RegExp("page=(\\w*)","gm"),"page=");
		}else if(url.match(new RegExp(".htm(\\w+)","gm"))){
			//http://localhost:8085/moer/investment_investmentInit.htm?onColumns=TZGD_LICAI
			url += "&page=";
		}else{
			//http://localhost:8085/moer/investment_investmentInit.htm
			url += "?page=";
		}
		btnclick(url);
		//关注、取消关注
			var fouse=null;
			$("#writeAll td :input").click(function(){
				if($(this).hasClass('add')){
				//取消关注
				fouse=$(this);
				var param={"ids":$(this).attr('id')}
				$.post('writerCollection_deletes.json',param,function(data){
					data = parseObj(data);
						if(data.success==true) {
						// alert("取消关注！");
						fouse.removeClass('add');
						}
					});
			}else{
				//加关注
				fouse=$(this);
				//submitAttentions(1,$(this).attr('id'),true)
				var param={"mAttentions_wasFollowerId":$(this).attr('id')}
				$.post('writerCollection_add.json',param,function(data){
					data = parseObj(data);
						if(data.success==true) {
						//alert("关注成功！");
						fouse.addClass('add');
				
						}
					});
			
			}
				
			});
	
	});
	
		
	
}

