$(function(){
	//1.真实姓名框
	var real_Name = $("#muser_realName");//真实姓名框
	var rm_Isopen = $("#muser_rmIsopen");//真实姓名checkbox
	chekboxIsOk(real_Name,rm_Isopen);
	real_Name.keyup(function(){
		chekboxIsOk(real_Name,rm_Isopen);
	});
	//2.公司框
	var muser_Company_Input = $("#muser_company");//公司框
	var muser_CompanyIsopen_Checkbox = $("#muser_companyIsopen");//公司checkbox
	chekboxIsOk(muser_Company_Input,muser_CompanyIsopen_Checkbox);
	muser_Company_Input.keyup(function(){
		chekboxIsOk(muser_Company_Input,muser_CompanyIsopen_Checkbox);
	});
	//3.职位框
	var muser_Career_Input = $("#muser_career");//职位框
	var muser_CareerIsopen_Checkbox = $("#muser_careerIsopen");//职位框checkbox
	chekboxIsOk(muser_Career_Input,muser_CareerIsopen_Checkbox);
	muser_Career_Input.keyup(function(){
		chekboxIsOk(muser_Career_Input,muser_CareerIsopen_Checkbox);
	});
	//4.城市框
	var muser_city_Input = $("#muser_city");//城市框
	var muser_cityIsopen_Checkbox = $("#muser_cityIsopen");//城市框checkbox
	chekboxIsOk(muser_city_Input,muser_cityIsopen_Checkbox);
	muser_city_Input.keyup(function(){
		chekboxIsOk(muser_city_Input,muser_cityIsopen_Checkbox);
	});
	//5.新浪框
	var muser_sina_Input = $("#muser_sinaUrl");//新浪框
	var muser_sinaIsopen_Checkbox = $("#muser_sinaUrlIsopen");//新浪框checkbox
	chekboxIsOk(muser_sina_Input,muser_sinaIsopen_Checkbox);
	muser_sina_Input.keyup(function(){
		chekboxIsOk(muser_sina_Input,muser_sinaIsopen_Checkbox);
	});
	//6.腾讯框
	var muser_blog_Input = $("#muser_blogUrl");//腾讯框
	var muser_blogIsopen_Checkbox = $("#muser_blogUrlIsopen");//腾讯框checkbox
	chekboxIsOk(muser_blog_Input,muser_blogIsopen_Checkbox);
	muser_blog_Input.keyup(function(){
		chekboxIsOk(muser_blog_Input,muser_blogIsopen_Checkbox);
	});
	//7.城市框
	var muser_weixin_Input = $("#muser_weixin");//城市框
	var muser_weixinIsopen_Checkbox = $("#muser_weixinIsopen");//城市框checkbox
	chekboxIsOk(muser_weixin_Input,muser_weixinIsopen_Checkbox);
	muser_weixin_Input.keyup(function(){
		chekboxIsOk(muser_weixin_Input,muser_weixinIsopen_Checkbox);
	});
	
	//框为空  不让勾选 的公共方法 
	function chekboxIsOk(objInput,objCheck){
		if(objInput.val() != null && objInput.val().trim() != ''){
			objCheck.removeAttr("disabled");
		}else{
			objCheck.removeAttr("checked");
			objCheck.attr("disabled","disabled");
		}
	}
	
	
			//失去焦点验证字段
	$("input[valid]").blur(function(){
		validEmpty($(this));
	});
	$("textarea[valid]").blur(function(){
		validEmpty($(this));
	});
	
	//用户名更改验证
//	$("#muser_userName").blur(function(){
//		var params ={
//			name:'nickname',
//			param:$("#muser_userName").val()
//		};
//		$.post('user/rajax.json',params,function(data){
//			data = $.parseJSON(data);
//			if(data.status=='n'){
//				$("#muser_userName").addClass("redborder");
//				$("#muser_userName").attr("valid",false);
//				$("#muser_userName_msg").html(data.info);
//			}else{
//				$("#muser_userName_msg").html("");
//			}
//		});
//	});
	//手机失去焦点验证
	$("#muser_mobile").blur(function(){
		if(!validationPhone($(this).val())&&!isEmpty($(this).val())){
			$(this).addClass("redborder");
			$(this).attr("valid",false);
		}
	});
	//邮箱失去焦点验证
	$("#muser_oftenEmail").blur(function(){
		if(!validationEmail($(this).val())&&!isEmpty($(this).val())){
			$(this).addClass("redborder");
			$(this).attr("valid",false);
		}
	});
	
	if($("#muser_identityType").val()==1){
		$("#lmuser_identityText").val("上传身份证");
	}else{
		$("#lmuser_identityText").val("上传营业执照");
	}
	$("#muser_identityType").change(function(){
		if($("#muser_identityType").val()==1){
			$("#lmuser_identityText").val("上传身份证");
		}else{
			$("#lmuser_identityText").val("上传营业执照");
		}
	});
//	//为文件标签绑定事件
//	$(".file").click(function(){
//		$(this).attr("id","uploadfile")
//		
//	});
});

//验证是否为空
function validEmpty(item){
	if(isEmpty(item.val())){
		item.addClass("redborder");
		item.attr("valid",false);
	}else{
		if(item.css('color')=='rgb(178, 178, 178)'){
			item.addClass("redborder");
			item.attr("valid",false);
		}else{
			item.removeClass("redborder");
			item.attr("valid",true);
		}
	}
}
//用户名更改验证
function validUserName(){
	var params ={
	name:'nickname',
	param:$("#muser_userName").val()
	};
	$.post('user/rajax.json',params,function(data){
		data = $.parseJSON(data);
		if(data.status=='n'){
			$("#muser_userName").addClass("redborder");
			$("#muser_userName").attr("valid",false);
			scroll_offset = $("#muser_userName").offset();
		//需要获取table的坐标，减去头部固定的高度，得到正确的纵坐标 定位题目
			$("body,html").animate({
			   scrollTop:scroll_offset.top-150  //让body的scrollTop等于pos的top，就实现了滚动
			},0);
			$("#muser_userName_msg").html(data.info);
			return false;
		}else{
			return true;
			$("#muser_userName_msg").html("");
		}
	});
}

/**
	提交验证
*/
function validParam(){
	//验证是否为空
	$("input[valid]").each(function(){
		validEmpty($(this));
	});
	//验证是否为空
	$("textarea[valid]").each(function(){
		validEmpty($(this));
	});
	
	//验证是否为手机号
	if(!validationPhone($("#muser_mobile").val())&&!isEmpty($("#muser_mobile").val())){
		$("#muser_mobile").addClass("redborder");
		$("#muser_mobile").attr("valid",false);
	}
	
	//验证是否为邮箱
	if(!validationEmail($("#muser_oftenEmail").val())&&!isEmpty($("#muser_oftenEmail").val())){
		$("#muser_oftenEmail").addClass("redborder");
		$("#muser_oftenEmail").attr("valid",false);
	}
	
	//验证是否全部正确
	if($("input[valid=false]").length<1&&$("textarea[valid=false]").length<1){
		if(userType!=1){
			//验证是否选择行业
			var industry ="";
			$("#industry .table_check").each(function(){
				if($(this).is(":checked")){
					if(!isEmpty(industry)){
						industry+=",";
					}
					industry +=$(this).val();
				}
			});
			if(isEmpty(industry)){
				MOER.alertError("请选择行业！",1);
				return false;
			}else{
				return true;
			}
		}else{
			return true;
		}
	}else{
		var scroll_offset = $("input[valid=false]:eq(0)").offset();  //得到pos这个div层的offset，包含两个值，top和left
		if(!scroll_offset){
			scroll_offset = $("textarea[valid=false]:eq(0)").offset();
		}
		//需要获取table的坐标，减去头部固定的高度，得到正确的纵坐标 定位题目
		$("body,html").animate({
		   scrollTop:scroll_offset.top-150  //让body的scrollTop等于pos的top，就实现了滚动
		},0);
		return false;
	}
}

//提交申请
function updateUserInfo(){
	//判断当前是否为申请状态
//	var valid = validUserName();
//	if(valid){
		var valid = validParam();
	if(valid){
		MOER.process();
		//获取关注领域checkbox
		var industry ="";
		$("#industry .table_check").each(function(){
			if($(this).is(":checked")){
				if(!isEmpty(industry)){
					industry+=",";
				}
				industry +=$(this).val();
			}
		});
		var url = "updateWebUserInfo.json?"+$("#userForm").serialize();
		var param={
			muser_rmIsopen: $("#muser_rmIsopen").is(":checked")?'Y':'N',
			muser_companyIsopen:$("#muser_companyIsopen").is(":checked")?'Y':'N',
			muser_careerIsopen:$("#muser_careerIsopen").is(":checked")?'Y':'N',
			muser_cityIsopen:$("#muser_cityIsopen").is(":checked")?'Y':'N',
			muser_sinaUrlIsopen:$("#muser_sinaUrlIsopen").is(":checked")?'Y':'N',
			muser_blogUrlIsopen:$("#muser_blogUrlIsopen").is(":checked")?'Y':'N',
			muser_weixinIsopen:$("#muser_weixinIsopen").is(":checked")?'Y':'N',
			muser_industry:industry,
			muser_capacityAptitude:$("#muser_capacityAptitude").css('color')=='rgb(178, 178, 178)'?'':$("#muser_capacityAptitude").val(),
			muser_persionDescribe:$("#muser_persionDescribe").css('color')=='rgb(178, 178, 178)'?'':$("#muser_persionDescribe").val()
		};
		$.post(url,param,function(data){
			easyDialog.close();
			data = $.parseJSON(data);
			if(data.success){
				MOER.alertSuccess(data.message);
			}else{
				MOER.alertError(data.message);
			}
		});
	}
//	}
}
//上传图片
function uploadImg(imgId,uploadid){
	var imgurlId =  $("#"+imgId).attr('imgurlId');
	MOER.process();
	var url = 'upload_upload.json';
	url += "?id="+$("#"+imgId).attr('uploadurl');
	url+="&uploadType=1";
	
	$.ajaxFileUpload({  
		url: url,  
		secureuri: true,  
		fileElementId: uploadid,  
		dataType: 'json', 
		success: function(data, status) { 
			if(data.success==true) {
				var obj = $.parseJSON(data.message);
				var path = obj.filename;
				$("#"+imgId).val(path);
				var allpath = server_path+path;
				
			    	$("#"+imgurlId+" img").attr('src',allpath);
			    	easyDialog.close();
			}else {
				MOER.alertError(data.message);
				//easyDialog.close();
					if(data.errorCode==10003) {
						//TRIG.messager.alert("<t:text key="tools.resource.fileexist"/>");
					}else{
						//TRIG.successHandle(data);
					}
			}
		}	//文件上传的success事件
	});
}
