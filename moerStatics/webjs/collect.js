//删除
$(function(){
		//删除收藏
		$("a[collectDel]").click(function(){
			var type = $(this).attr("type");
			var sourceId = $(this).attr("sourceId");
			var id = $(this).attr("collectDel");
			MOER.confirm("确认删除该收藏吗？",function(){
				if(type=='1'){
					scWenZhang(sourceId,"N",function(data){
						delBackFun(data,id);
					});
				}else if(type=='2'){
					scHuoDong(sourceId,"N",function(data){
						delBackFun(data,id);
					});
				}
			
				//删除后的回调函数
				function delBackFun(data,id){
					if(data.success){
						location.reload();
						MOER.alertSuccess("删除成功");
					}else{
						MOER.alertError("删除失败");
					}
				}
			})
			
		});
		
		
		
	});

//加入购物车
function myShopCart(id,type,obj){
	MOER.addShopCart(id,type,function(data){
		if(data.success){
			$(obj).remove();
		}
	});
}