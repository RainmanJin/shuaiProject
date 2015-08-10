//回显数据
$(function(){
	$.post('userCenterSet_findAccountList.json','',function(data){
		var data = $.parseJSON(data);
		for(var i = 0 ; i<data.length;i++){
			if(data[i].mProceedsAccount_accountType == "1"){
				$('#cart_name').val(data[i].mProceedsAccount_cartName);
				$('#accountYHK').val(data[i].mProceedsAccount_account);
				$('#opening_bank').val(data[i].mProceedsAccount_openingBank);
				$('#sub_branch').val(data[i].mProceedsAccount_subBranch);
				$('#mobile').val(data[i].mProceedsAccount_mobile);
				$('#ID_number').val(data[i].mProceedsAccount_extend1);
				$('#account_sex').val(data[i].mProceedsAccount_sex);
			}else{
				$('#accountZFB').val(data[i].mProceedsAccount_account);
				$('#mobileZFB').val(data[i].mProceedsAccount_mobile);
			}
		}
	});
});

//身份证校验
var ID_numberReg = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
//身份证号不能为空
$(function(){
	$('#ID_number').blur(function(){
		  var ID_number = "";
		  ID_number = $('#ID_number').val().trim();
		  if(!ID_numberReg.test(ID_number)){
			  if(ID_number != ""){
				  $('#ID_number').next('span').empty();
				  $('#ID_number').next('span').append("<span style='color:red;front-size:18px'>身份证号格式不正确</span>");
			  }else{
				  $('#ID_number').next('span').empty();
				  $('#ID_number').next('span').append("<span style='color:red;front-size:18px'>身份证号不能为空</span>");
			  }
		  }else{
			  $('#ID_number').next('span').empty();
		  }
	});
});

//银行卡持有者不能为空
$(function(){
	$('#cart_name').blur(function(){
		  var cart_name = "";
		  cart_name = $('#cart_name').val();
		  if(cart_name!= ""){
			  $('#cart_name').next('span').hide();
		  }else{
			  $('#cart_name').next('span').show();
		  }
	});
});
var accountReg = /^([0-9]{15,})$/;
//银行账号不能为空
$(function(){
	$('#accountYHK').blur(function(){
		  var account = "";
		  account = $('#accountYHK').val();
		  if(!accountReg.test(account)){
			  if(account != ""){
				  $('#accountYHK').next('span').empty();
				  $('#accountYHK').next('span').append("<span style='color:red;front-size:18px'>银行账号格式不正确</span>");
			  }else{
				  $('#accountYHK').next('span').empty();
				  $('#accountYHK').next('span').append("<span style='color:red;front-size:18px'>银行账号不能为空</span>");
			  }
		  }else{
			  $('#accountYHK').next('span').empty();
		  }
	});
});
//所属银行不能为空
$(function(){
	$('#opening_bank').blur(function(){
		  var opening_bank = "";
		  opening_bank = $('#opening_bank').val();
		  if(opening_bank!= ""){
			  $('#opening_bank').next('span').hide();
		  }else{
			  $('#opening_bank').next('span').show();
		  }
	});
});
//开户支行不能为空
$(function(){
	$('#sub_branch').blur(function(){
		  var sub_branch = "";
		  sub_branch = $('#sub_branch').val();
		  if(sub_branch!= ""){
			  $('#sub_branch').next('span').hide();
		  }else{
			  $('#sub_branch').next('span').show();
		  }
	});
});

var mobliereg = /^(1[345678]\d{9})$/;
//手机号码不能为空
$(function(){
	$('#mobile').blur(function(){
		  var mobile = "";
		  mobile = $('#mobile').val();
		  if(mobliereg.test(mobile)){
			  $('#mobile').next('span').empty();
		  }else{
			  if(mobile!= ""){
				  $('#mobile').next('span').empty();
				  $('#mobile').next('span').append("<span style='color:red;front-size:18px'>手机格式不正确</span>");
			  }else{
				  $('#mobile').next('span').empty();
				  $('#mobile').next('span').append("<span style='color:red;front-size:18px'>手机不能为空</span>");
			  } 
		  }
		  
	});
	
});


//银行卡账号保存按钮绑定事件
$(function(){
	$('#proceeds_account_yhk').bind("click",function(){
		if($('#cart_name').val() == ""){
			$('#cart_name').next('span').show();
		}else if(!ID_numberReg.test($('#ID_number').val().trim())){
			if($('#ID_number').val().trim() != ""){
				  $('#ID_number').next('span').empty();
				  $('#ID_number').next('span').append("<span style='color:red;front-size:18px'>身份证号格式不正确</span>");
			  }else{
				  $('#ID_number').next('span').empty();
				  $('#ID_number').next('span').append("<span style='color:red;front-size:18px'>身份证号不能为空</span>");
			  }
		}else if(!accountReg.test($('#accountYHK').val())){
			  if($('#accountYHK').val() != ""){
				  $('#accountYHK').next('span').empty();
				  $('#accountYHK').next('span').append("<span style='color:red;front-size:18px'>银行账号格式不正确</span>");
			  }else{
				  $('#accountYHK').next('span').empty();
				  $('#accountYHK').next('span').append("<span style='color:red;front-size:18px'>银行账号不能为空</span>");
			  }
		}else if($('#opening_bank').val() == ""){
			$('#opening_bank').next('span').show();
		}else if($('#sub_branch').val() == ""){
			$('#sub_branch').next('span').show();
		}else if($('#mobile').val() == ""){
			$('#mobile').next('span').append("<span style='color:red;front-size:18px'>手机不能为空</span>");
		}else if(mobliereg.test(mobile)){
			  $('#mobile').next('span').empty();
			  if(mobile!= ""){
				  $('#mobile').next('span').empty();
				  $('#mobile').next('span').append("<span style='color:red;front-size:18px'>手机格式不正确</span>");
			  }else{
				  $('#mobile').next('span').empty();
				  $('#mobile').next('span').append("<span style='color:red;front-size:18px'>手机不能为空</span>");
			  } 
		 }else{
			//如果都不为空，则可以提交
			$.post('userCenterSet_updateCount.json','mProceedsAccount_accountType='+$("input[name='account_type']:checked").val()+'&mProceedsAccount_cartName='+$("#cart_name").val()+'&mProceedsAccount_account='+$("#accountYHK").val()+'&mProceedsAccount_openingBank='+$("#opening_bank").val()+'&mProceedsAccount_subBranch='+$("#sub_branch").val()+'&mProceedsAccount_mobile='+$("#mobile").val()+'&mProceedsAccount_extend1='+$('#ID_number').val().trim()+'&mProceedsAccount_sex='+$("#account_sex").val(),function(data){
				var data = $.parseJSON(data);
				if(data.success){
					MOER.alertSuccess("保存成功");
				}else{
					MOER.alertError("保存失败");
				}
			});
		}
	});
});

//支付宝------------------------------------------------------------------------------

//支付本不能为空
$(function(){
	$('#accountZFB').blur(function(){
		  var accountZFB = "";
		  accountZFB = $('#accountZFB').val();
		  if(accountZFB!= ""){
			  $('#accountZFB').next('span').hide();
		  }else{
			  $('#accountZFB').next('span').show();
		  }
	});
});

//手机号码可以为空，但是填写后必须格式正确
$(function(){
	$('#mobileZFB').blur(function(){
		  var mobile = "";
		  mobile = $('#mobileZFB').val();
		  if(mobliereg.test(mobile) || mobile== ""){
			  $('#mobileZFB').next('span').empty();
		  }else{
			  $('#mobileZFB').next('span').empty();
			  $('#mobileZFB').next('span').append("<span style='color:red;front-size:18px'>手机格式不正确</span>");
		  }
		  
	});
	
});

$(function(){
	$('#proceeds_account_zfb').bind("click",function(){
		//如果都为空，则不可以提交
		var mobile = $('#mobileZFB').val();
		if($('#accountZFB').val() == ""){
			$('#accountZFB').next('span').show();
		}else{
			//如果输入了号码单格式不正确
			 if( mobile!= "" && !mobliereg.test(mobile)){
				 $('#mobileZFB').next('span').empty();
				  $('#mobileZFB').next('span').append("<span style='color:red;front-size:18px'>手机格式不正确</span>");
			 }else{
				$.post('userCenterSet_updateCount.json','mProceedsAccount_accountType='+$("input[name='account_type']:checked").val()+'&mProceedsAccount_account='+$("#accountZFB").val()+'&mProceedsAccount_mobile='+$("#mobileZFB").val(),function(data){
					var data = $.parseJSON(data);
					if(data.success){
						MOER.alertSuccess("保存成功");
					}else{
						MOER.alertError("保存失败");
					}
				});
			 }	
		}
	});
});
