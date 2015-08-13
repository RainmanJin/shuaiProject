//验证手机
function validationPhone(mobile){
	var phoneTest=/^1\d{10}$/;
	var isPhone=phoneTest.test(mobile);
	if(!isPhone)
	{
		return false;
	}
	return true;
}
//密码
function validationPwd(pwd){
	var pwdTest=/^[a-zA-Z\d]{5,16}$/;
	var isPwd=pwdTest.test(pwd);
	if(!isPwd)
	{
		return false;
	}
	return true;
}

//验证邮箱正则
function validationEmail(email){
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	if(!reg.test(email)){
		return false;
	}
	return true;
}

	/**是否是空*/
function isEmpty(obj){
	if(!obj || obj=="" || obj==null){
		return true;
	}
	return false;
}
//当数据为空时不验证
function emptyVaila(el){return isEmpty($(el).val());}



