
//旧密码不能为空判断
$(function(){
	$('#oldpassword').blur(function(){
		  var oldpassword = "";
		  oldpassword = $('#oldpassword').val();
		  if(oldpassword!= ""){
			  oldpasswordNotNull = true;
			  $('#oldpassword').next('span').hide();
		  }else{
			  $('#oldpassword').next('span').show();
		  }
	});
});


//新密码不能为空判断
$(function(){
	$('#password').blur(function(){
		  var password = "";
		  password = $('#password').val();
		  if(password!= ""){
			  passwordNotNull = true;
			  $('#password').next('span').hide();
		  }else{
			  $('#password').next('span').show();
		  }
	});
});

//密码确认绑定光标消失判断两次输入密码是否一致
$(function(){
	$('#repassword').blur(function(){
		  var password = "";
		  password = $('#password').val();
		  var repassword = "";
		  repassword = $('#repassword').val();
		  if(password == repassword){
			  passwordSame = true;
			  $('#repassword').next('span').hide();
		  }else{
			  $('#repassword').next('span').show();
		  }
	});
});
//给密码修改串口的保存按钮绑定事件
$(function(){
	$('#fixPasswordSubmit').bind("click",function(){
		  if($('#oldpassword').val()==""){
			  $('#oldpassword').next('span').show();
		  }else if($('#password').val()==""){
			  $('#password').next('span').show();
		  }else if($('#password').val() != $('#repassword').val()){
			  $('#repassword').next('span').show();
		  }else { 
			//请求修改密码
			  $.post("userCenterSet_updateUserPwd.json","uid="+$('#userId').val()+"&oldpassword="+$('#oldpassword').val()+"&password="+$('#password').val(),function(data){ 
				 var data = $.parseJSON(data);
				  if(data.success){
					 MOER.alertSuccess(data.message);
				  }else{
					  MOER.alertError(data.message);
				  }			  
			  });
		  }
	});
});
