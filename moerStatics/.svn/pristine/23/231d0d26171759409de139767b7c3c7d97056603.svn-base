//==================================== 赞 start  yzj 2014-11-22 11:28:17 ============================
/**
 * 赞文章
 * 
 * @param id：文章id
 * @param operateType:Y=赞；N=取消赞
 * @param backFun
 *            :回调函数
 */
function zanWenZhang(id, operateType, backFun) {
	zanProcess(id, operateType, 1, backFun);
}

/**
 * 文章评论的赞
 * 
 * @param id
 *            :评论的id
 * @param operateType
 *            :Y=赞；N=取消赞
 * @param backFun
 *            :回调函数
 */
function zanWzPinglun(id, operateType, backFun) {
	zanProcess(id, operateType, 2, backFun);
}

/**
 * 赞活动
 * 
 * @param id:活动id
 * @param operateType:Y=赞；N=取消赞
 * @param backFun
 *            :回调函数
 */
function zanHuoDong(id, operateType, backFun) {
	zanProcess(id, operateType, 3, backFun);
}

/**
 * 活动评论的赞
 * 
 * @param id
 *            :活动评论id
 * @param operateType:Y=赞；N=取消赞
 * @param backFun
 *            :回调函数
 */
function zanHdPingLun(id, operateType, backFun) {
	zanProcess(id, operateType, 4, backFun);
}

/**
 * 赞处理
 * 
 * @param id:目标id
 * @param operateType
 *            ：操作类型Y=赞；N=取消赞
 * @param zanType：zanType
 *            =1:赞文章；2:文章评论的赞；3赞活动；4：活动评论的赞
 * @param backFun
 *            :回调函数
 */
function zanProcess(id, operateType, zanType, backFun) {
	// 处理操作
	$.loginPost(webPath + "/wapcommon_doZan.json", {
		targetId : id,
		isDoZan : operateType,
		zanType : zanType
	}, function(data) {
		data = parseObj(data);
		// 是否登录
			if (data.errorCode != -999) {
				// 回调函数，自行处理
			if (!isEmpty(backFun)) {
				backFun(data);
			}
		} else {
			// 登录框
			login(window.location.href);
		}
	});
}
// ==================================== 赞 end yzj 2014-11-22 11:28:17
// ============================

// ==================================== 收藏 start yzj 2014-11-22 14:00:34
// ============================
/**
 * 收藏文章
 * 
 * @param id：文章id
 * @param operateType:Y=收藏；N=取消收藏
 * @param backFun
 *            :回调函数
 */
function scWenZhang(id, operateType, backFun) {
	scProcess(id, operateType, 1, backFun);
}

/**
 * 收藏活动
 * 
 * @param id:活动id
 * @param operateType:Y=收藏；N=取消收藏
 * @param backFun
 *            :回调函数
 */
function scHuoDong(id, operateType, backFun) {
	scProcess(id, operateType, 2, backFun);
}

/**
 * 收藏处理
 * 
 * @param id:目标id
 * @param operateType
 *            ：操作类型Y=收藏；N=取消收藏
 * @param zanType：zanType
 *            =1:收藏文章；2：收藏活动
 * @param backFun
 *            :回调函数
 */
function scProcess(id, operateType, collectType, backFun) {
		// 处理操作
		$.loginPost(webPath + "/wapcommon_doCollect.json", {
			targetId : id,
			isDoCollect : operateType,
			collectType : collectType
		}, function(data) {
			data = parseObj(data);
			// 是否登录
				if (data.errorCode != -999) {
					// 回调函数，自行处理
				if (!isEmpty(backFun)) {
					backFun(data);
				}
			} else {
				login();
			}
		});
}
/**
 * 弹出二维码
 * 
 * @param selectEl:jquery选择去
 */
function showQRcode(jQselectEl) {
	$(jQselectEl).slideToggle(400);
}

// ==================================== 收藏 end yzj 2014-11-22 14:00:34
// ============================

// =================================弹出层 start wbx 2014-11-23
// 19:50:50===========================

// 信息对话框
var MOER = MOER || {};
/**
 * 失败提示框
 */
MOER.alertError = function(msg, timer) {
	// 时间是否为空
	if (isEmpty(timer)) {
		timer = 1 * 1000;
	} else {
		timer *= 1000;
	}
	var winhtml = "";
	winhtml += '<div class="pop_ip_style1 pop_ip_style2" id="errorBox">';
	if (timer == 0) {
		winhtml += '<a class="close_btn" id="closeBtn" href="javascript:void(0)"></a>';
	}
	winhtml += '<p><span>' + msg + '</span></p></div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'errorBox',
		fixed : false,
		autoClose : timer,
		callback : removeBox
	});
};
/**
 * 成功提示框
 */
MOER.alertSuccess = function(msg, timer) {
	// 时间是否为空
	if (isEmpty(timer)) {
		timer = 1 * 1000;
	} else {
		timer *= 1000;
	}
	var winhtml = "";
	winhtml += '<div class="pop_ip_style1" id="successBox">';
	if (timer == 0) {
		winhtml += '<a class="close_btn" id="closeBtn" href="javascript:void(0)"></a>';
	}
	winhtml += '<p><span>' + msg + '</span></p></div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'successBox',
		fixed : false,
		autoClose : timer,
		callback : removeBox
	});

};

/**
 * 发布提示框
 */
MOER.pubAlert = function(msg, timer) {
	// 时间是否为空
	if (isEmpty(timer)) {
		timer = 0;
	} else {
		timer *= 1000;
	}
	var winhtml = "";
	winhtml += '<div class="pop_ip_style1_1" id="pubBox">';
	if (timer == 0) {
		winhtml += '<a class="close_btn" id="closeBtn" href="javascript:void(0)"></a>';
	}
	winhtml += '<p><span>' + msg + '</span></p>';
	winhtml += '<code>即将进入<a href="userCenterRelease.htm">我的发布</a>页面</code></div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'pubBox',
		fixed : false,
		autoClose : timer,
		callback : function() {
			location.href = "userCenterRelease.htm";
		}
	});

};

/**
 * 公共confirm msg：提示信息 fn：确定执行方法
 */
MOER.confirm = function(msg, fn) {
	var winhtml = "";
	winhtml += '<div class="pop_ip_style4" id="confirmBox">';
	winhtml += '<p>' + msg + '</p>';
	winhtml += ' <form>';
	winhtml += ' <input type="button"  value="取消" class="pop_button_l" id="cancelBtn"/>';
	winhtml += '    <input  type="button"  value="确定 " class="pop_button_r" id="ascertainBtn"/>';
	winhtml += '  </form>';
	winhtml += '</div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'confirmBox',
		fixed : false,
		callback : removeBox
	});
	$("#cancelBtn").click(function() {
		easyDialog.close();
	});
	$("#ascertainBtn").click(function() {
		easyDialog.close();
		fn.call();
	});
};

/**
 * 加入购物车提示
 */
MOER.shopConfirm = function() {
	var winhtml = "";
	winhtml += '<div class="pop_ip_style3" id="confirmBox">';
	winhtml += '<p><span>成功加入购物车！</span></p>';
	winhtml += ' <form>';
	winhtml += ' <input type="button"  value="继续浏览" class="pop_button_l" id="continueShop"/>';
	winhtml += '    <input  type="button"  value="去购物车 " class="pop_button_r" id="gotoShopCart"/>';
	winhtml += '  </form>';
	winhtml += '</div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'confirmBox',
		fixed : false,
		callback : removeBox
	});
	$("#continueShop").click(function() {
		// TODO 继续购物执行

			easyDialog.close();
		});
	$("#gotoShopCart").click(function() {
		// TODO 去购物执行
			//easyDialog.close();
		location.href="toShoppingCart.htm";
	});
};

/**
 * 公共confirm msg：提示信息 fn：确定执行方法 type:1,删除组合；2,删除股票
 */
MOER.stockConfirm = function(msg, fn, type) {
	var winhtml = "";
	winhtml += '<div class="pop_ip_style5" id="confirmBox">';
	winhtml += '<h1>';
	if (type == 1) {
		winhtml += '删除组合';
	} else {
		winhtml += '删除股票';
	}
	winhtml += '<a class="close_btn" id="closeBtn"></a></h1>';
	winhtml += '<p>你确定删除<span>' + msg + '</span>';
	if (type == 1) {
		winhtml += '吗？</p>';
	} else {
		winhtml += '这只股票吗？</p>';
	}
	winhtml += ' <form>';
	winhtml += ' <input type="button"  value="取消" class="pop_button_l" id="cancelBtn"/>';
	winhtml += '    <input  type="button"  value="确定 " class="pop_button_r" id="ascertainBtn"/>';
	winhtml += '  </form>';
	winhtml += '</div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'confirmBox',
		fixed : false,
		callback : removeBox
	});
	$("#cancelBtn").click(function() {
		easyDialog.close();
	});
	$("#ascertainBtn").click(function() {
		easyDialog.close();
		fn.call();
	});
};

/**
 * 公共confirm tip:抬头 msg：组合名 len:最大输入字符数 val:修改前的值
 * 
 * fn：确定执行方法 创建修改组合
 */
MOER.groupConfirm = function(tip, msg, val, len, fn) {
	var winhtml = "";
	if (!val)
		val = "";
	winhtml += '<div class="pop_ip_style6" id="confirmBox">';
	winhtml += '<h1>' + tip + '<a class="close_btn" id="closeBtn"   href="javascript:void(0)"></a></h1>';
	winhtml += '<table cellpadding="0" cellspacing="10">';
	winhtml += '	<tr><td width="52" align="right">' + msg
			+ '</td><td><input type="text" id="groupName" value="' + val
			+ '" maxLength="' + len + '"/></td></tr>';
	winhtml += '	</table>';
	winhtml += ' <form>';
	winhtml += ' <input type="button"  value="取消" class="pop_button_l" id="cancelBtn"/>';
	winhtml += '    <input  type="button"  value="确定 " class="pop_button_r" id="ascertainBtn"/>';
	winhtml += '  </form>';
	winhtml += '</div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'confirmBox',
		fixed : false,
		callback : removeBox
	});
	$("#cancelBtn").click(function() {
		easyDialog.close();
	});
	$("#ascertainBtn").click(function() {
		// easyDialog.close();
			fn.call();
		});
};

/**
 * 发送私信 name 发给谁(昵称) other 发给谁(ID)
 * isReload是否刷新
 * isCheck不需要验证好友关系
 * backFun 回调函数
 */
MOER.sendLetter = function(name, other, isReload,isCheck,backFun) {
	isCheck = 1;
	$('.pop_ip_style7').remove();
	var winhtml = "";
	winhtml += '<div class="pop_ip_style7" id="letterBox">';
	winhtml += '<h1>发送私信<a class="close_btn" id="closeBtn"></a></h1>';
	winhtml += '<table cellpadding="0" cellspacing="10">';
	winhtml += '<tr><td width="52" align="right">发给：</td><td><input type="text" value="' + name + '" readonly/></td></tr>';
	winhtml += '<tr><td width="52" align="right" valign="top">内容：</td><td><textarea id="fastReply"></textarea></td></tr>';
	winhtml += '<tr><td colspan="2" align="right"><input  type="button"  value="发送" class="pop_button_r" id="sendLetter"/></td></tr>';
	winhtml += '</table>';
	winhtml += '</div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'letterBox',
		fixed : false
	});
	$("#sendLetter").click(
			
		function() {
			var csMsg = $("#fastReply").val();
			MOER.process();
			var url="csReply.json?other=" +other+"&isCheck="+(typeof(isCheck)=="undefined"?"":isCheck);
			$.loginPost(url,{msg:csMsg},
				function(data) {
					easyDialog.close();
					$("#letterBox").remove(); // 直接移除上一个发送弹出框的关闭按钮。
					if (data.success) {
						MOER.alertSuccess("发送成功！");
						
						if (isEmpty(isReload)) {
							location.reload();// 重新刷新页面
						}else{
							//请求成功的回调函数，自行处理
							if(!isEmpty(backFun)){
								backFun(data);
							}
						}
					} else {
						MOER.alertError(data.message);
					}
				});
		});
};

/**
 * 举报
 */
MOER.report = function(resourId, type) {
	var winhtml = "";
	winhtml += '<div class="pop_ip_style8" id="reportBox"> ';
	winhtml += '<h1>举报<a class="close_btn" id="closeBtn"   href="javascript:void(0)"></a></h1> ';
	winhtml += '<table cellpadding="0" cellspacing="10"> ';
	winhtml += '<tr><td>请选择理由：</td></tr> ';
	winhtml += '<tr class="radioTR"><td> <label style="width:100%;display: inline-block;"><input type="radio" name="report" value="1"/><span style="margin-left:5px;">广告等垃圾信息</span></label></td></tr> ';
	winhtml += '<tr class="radioTR"><td> <label style="width:100%;display: inline-block;"><input type="radio" name="report" value="2"/><span style="margin-left:5px;">不友善信息</span></label></td></tr> ';
	winhtml += '<tr class="radioTR"><td> <label style="width:100%;display: inline-block;"><input type="radio" name="report" value="3"/><span style="margin-left:5px;">其他</span></label></td></tr> ';
	winhtml += '<tr><td> <input type="text" class="because_text" /></td></tr> ';
	winhtml += '<tr><td align="right"><input  type="button"  value="确定" class="pop_button_r" id="reportBtn"/></td></tr> ';
	winhtml += '</table> ';
	winhtml += '</div> ';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'reportBox',
		fixed : false,
		callback : removeBox
	});

	$("#reportBtn").click(function() {
		var chk = $("#reportBox input[name='report']:checked");
		if (chk.length > 0) {
			var reason = "";
			if (chk.val() != "3") {
				reason = chk.next('span').text();
			} else if (chk.val() == "3") {
				var because_text = $("#reportBox .because_text").val();
				if (isEmpty(because_text)) {
					mbox.tips('请填写原因', $("#reportBox .because_text"), {
						guide : 1,
						time : 2
					});
					return false;
				} else {
					reason = because_text;
				}
			}
			doInForm(resourId, reason, type, function(data) {
				easyDialog.close();
				if (data.success) {
					MOER.alertSuccess("举报成功", 1);
				} else {
					MOER.alertError(data.message, 1);
				}
			});
		} else {
			mbox.tips('请选择理由', $("#reportBox input[name='report']").next(), {
				guide : 1,
				time : 2
			});
			return false;
		}
	});
};

/**
 * 提交等待的弹出层
 * 
 * @param timer:可以为空，延迟多少秒，默认为0；需要传入数字类型,单位为秒
 * @param content
 *            :可以为空，如果为空默认显示”加载中“
 */
MOER.process = function(timer, content) {
	// 是否为空
	if (isEmpty(content)) {
		content = "处理中...";
	}
	// 时间是否为空
	if (isEmpty(timer)) {
		timer = 0;
	} else {
		timer *= 1000;
	}
	var winhtml = "";
	winhtml += '<div class="pop_ip_style1" id="tipBox">';
	winhtml += '<p><span style="padding-left:0px;background:none;">' + content + '</span></p></div>';
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'tipBox',
		fixed : false,
		autoClose : timer,
		callback : removeBox,
		lock : true
	});
};

/**
 * 清除弹出框
 * 
 * @return
 */
function removeBox() {
	$("#easyDialogBox").remove();
}

// =================================弹出层 end wbx 2014-11-23
// 19:50:50===========================

// ================================= 举报 start ===========================
/**
 * 提交举报
 * 
 * @param resourId:举报的id
 * @param reason:举报的原因
 * @param type:举报的类型，1:举报评论/回复；2：举报私信
 * @param backFun:回调函数，可以为空
 */
function doInForm(resourId, reason, type, backFun) {

	// 不能为空
	if (isEmpty(resourId) || isEmpty(type) || isEmpty(reason)) {
		easyDialog.close();
		MOER.alertError("举报失败", 2);
		return;
	}
	// 参数
	var paramObj = {};
	paramObj.resourId = resourId;
	paramObj.reason = reason;
	paramObj.type = type;
	// 请求
	$.loginPost(webPath + "/doInForm.json", paramObj, function(data) {
		data = parseObj(data);
		if (!isEmpty(backFun)) {
			backFun(data);
		}
	});

}
/**
 * 是否已经举报过
 * 
 * @param resourId
 *            举报的id
 * @param type
 *            举报的类型，1:举报评论/回复；2：举报私信
 * @return
 */
function isExistsInform(resourId, type) {
	if (isLogin()) {
		// 参数
		var paramObj = {};
		paramObj.resourId = resourId;
		paramObj.type = type;
		// 请求
		$.loginPost(webPath + "/isExistsInform.json", paramObj, function(data) {
			data = parseObj(data);
			if (data.success) {
				MOER.report(resourId, type);
			} else {
				MOER.alertError(data.message, 2);
				return false;
			}
		});
	}
}
/**
 * 初始化 摩尔金融撰稿人服务 用户
 * type = 1代表 账号只在成为撰稿人的  5个页面中使用  1.成为撰稿人默认页面 2.填写撰稿人信息页面 3.审核等待页面 4.审核失败页面 5.撰写文章页面
 * type = 2代表 账号只在个人中心右边问号中用到
 */ 
function get_moerUser(type) {
	var nameObj = $(".help_box h3");
	var attention_A = $("#moerUserOne");
	var _url = 'moerUserAttention.json';
	$.post(_url,{"type":type},function(data){
		data = $.parseJSON(data);
		nameObj.text(data.muser.muser_userName);
		attention_A.attr('moerUserId',data.muser.muser_webUserId);
		if (data.success) {
			if(data.muser.attType == 1){
				attention_A.attr('class','man_button_attion');
			}else{
				attention_A.attr('class','man_button_attion man_button_attion_select');
			}
		}
	});
}

// 对  摩尔金融撰稿人服务 加关注
function add_moerAttention() {
	var obj = $("#moerUserOne");
	var user_id = obj.attr('moerUserId');
		//未关注状态，加关注
	if (obj.attr('class') == 'man_button_attion man_button_attion_select') {
		submitAttentions(user_id,true,function(data){
			data = parseObj(data);
			if (data.success == true) {
				obj.attr('class','man_button_attion');
			}else {
				MOER.alertError("关注失败",2);
			}
		});
	}else {
		//取消关注
		submitAttentions(user_id,false,function(data){
			data = parseObj(data);
			if (data.success == true) {
				obj.attr('class','man_button_attion man_button_attion_select');
			}else {
				MOER.alertError("取消失败",2);
			}
		});
	}
}
// 发表建议
function publish_succeed() {
	var textareaObj = $("#suggestContent");
	var inputObj = $("#contact");
	// NO.1 校验
	var suggestContent = textareaObj.val();
	var contact = inputObj.val();
	var validContent = false;
	var validContact = false;
	if (isEmpty(suggestContent)
			|| '如果您想对我们的产品提出意见或建议，请在这里填写，您的建议是摩尔金融进步的动力！' == suggestContent) {
		textareaObj.toggleClass("redborder", true);
	} else {
		textareaObj.removeClass("redborder");
		validContent = true;
	}
	if (isEmpty(contact) || '建议留下邮箱/QQ号/手机号以便我们回复您。' == contact) {
		inputObj.addClass("redborder", true);
	} else {
		inputObj.removeClass("redborder");
		validContact = true;
	}

	if (!validContent || !validContact) {
		return;
	}

	// 过滤关键词
	if (isContainWords(suggestContent)) {
		suggestContent = filterWord(suggestContent);
	}
	if (isContainWords(contact)) {
		contact = filterWord(contact);
	}

	// NO.2 发送
	var url = "mOpinionAdd.json";
	var queryParams = {
		"suggestContent" : suggestContent,
		"contact" : contact
	};
	$.post(url, queryParams, function(data) {
		data = $.parseJSON(data);
		if (data.success) {
			$(".leave_word").toggleClass('box_display').next('div').addClass(
					"box_display");
			textareaObj.val('如果您想对我们的产品提出意见或建议，请在这里填写，您的建议是摩尔金融进步的动力！');
			inputObj.val('建议留下邮箱/QQ号/手机号以便我们回复您。');
			MOER.alertSuccess("提交成功");
		}
	});

}

// ================================= 举报 end===========================

$(function() {

	// 退出
	$("a[exit]").click(function() {
		logout();
	});
	// 登录
	$("a[login]").click(function() {
		login();
	});
	// 建议弹窗 鼠标离开后隐藏
	$("#jianyi").mouseleave(function() {
		$(".leave_word").hide();
	});
	// 问题弹窗 鼠标离开后隐藏
	$(".help_box").mouseleave(function() {
		$(".help_box").hide();
	});
	// 发表建议
	$(".leave_word input.publish_button").click(function() {
		publish_succeed();
	});
	// 关注 摩尔金融撰稿人服务
	$("#moerUserOne").click(function() {
		add_moerAttention();
	});
	// -------意见和建议 -------
	$("#suggestContent").focus(function() {
		if (this.value == '如果您想对我们的产品提出意见或建议，请在这里填写，您的建议是摩尔金融进步的动力！') {
			this.value = '';
		}
	});
	$("#suggestContent").blur(function() {
		if (this.value == '') {
			this.value = '如果您想对我们的产品提出意见或建议，请在这里填写，您的建议是摩尔金融进步的动力！';
		}
	})
	$("#contact").focus(function() {
		if (this.value == '建议留下邮箱/QQ号/手机号以便我们回复您。') {
			this.value = '';
		}
	});
	$("#contact").blur(function() {
		if (this.value == '') {
			this.value = '建议留下邮箱/QQ号/手机号以便我们回复您。';
		}
	});
	$("#suggestionA,#jianyi").click(function() {
		$(".leave_word").show();
	});
	$("#question").click(function() {
		$(".help_box").show();
	});

});

/**
 * 加入购物车
 * 
 * @param goodId 商品Id
 * @param goodType 商品类型
 * @param backFun 回调函数
 * @return
 */
MOER.addShopCart=function(goodId,goodType,backFun){
	/*MOER.process('','处理中....');*/
	$.loginPost('addShoppingCart.json',{mShoppingCart_goodsId:goodId,mShoppingCart_goodsType:goodType},function(data){
		if(data.success==false){
			if(data.errorCode == 98){
				//已购买商品，提示用户，并跳转到购买记录页
				MOER.alertError(data.message,1);
				location.href="payRecord.htm";
			}else{
				MOER.alertError(data.message,1);
			}
		}else{
			easyDialog.close();
			//获取购物车商品数量
			getCartGoodsTotal();
			MOER.shopConfirm();
			//回调函数，自行处理
			if(!isEmpty(backFun)){
				backFun(data);
			}
		}
	});
}

/**
 * 马上付费，活动、文章
 */
MOER.goToConfirmOrder=function(goodsId,goodsType){
//	MOER.process('','处理中....');
	$.loginPost('registrationGoods.json',{goodsId:goodsId,goodsType:goodsType},function(data){
		if(data.success==false){
			MOER.alertError(data.message,1);
			if(data.errorCode == 986){
				location.href="payRecord.htm";
			}
		}else{
//			easyDialog.close();
			if(typeof(data.data)=="undefined"){
				MOER.alertSuccess("报名成功！",1);
				location.href="payRecord.htm";
			}else{
				//去确认订单页
				location.href="toShoppingOrder.htm";
				//alert("去确认订单页");
			}
		}
	});
}

/**
 * wap端马上付款
 */
MOER.goToConfirmOrderWap=function(goodsId,goodsType){
//	MOER.process('','处理中....');
	$.loginPost('registrationGoods.json',{goodsId:goodsId,goodsType:goodsType},function(data){
		if(data.success==false){
			MOER.alertError(data.message,1);
			if(data.errorCode == 986){
				location.href="payRecord.htm";
			}
		}else{
//			easyDialog.close();
			if(typeof(data.data)=="undefined"){
				MOER.alertSuccess("报名成功！",1);
				location.href="payRecord.htm";
			}else{
				//去确认订单页
//				alert("去订单确认---toShoppingOrder--");
				var wapBrows = navigator.userAgent.toLowerCase();
//			    alert("wapBrows:"+wapBrows);
			    var browsInfo = wapBrows.match(/MicroMessenger\/([\d\.]+)/i) ;
//			    alert("browsInfo:"+browsInfo);
			    if(browsInfo && browsInfo[1] >= "5.0"){
			   // 	alert("微信内置支付确认页---");
				var url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3494adeeee1d6202&redirect_uri="+
	               "http://test.moer.jiemian.com/testMoer/toShoppingOrder.htm&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
			//	location.href="toShoppingOrder.htm";
				location.href=url;
				//alert("去确认订单页");
				}else{
				//	location.href="toShoppingOrder.htm?code=123aaa321bbb";
					location.href="toShoppingOrder.htm";
				}
			}
		}
	});
}

/**
 * 马上打赏
 */
MOER.goToRewardDlg=function(goodsId,goodsType){
	var winhtml = "";
	winhtml += '<div class="ds-dialogcont" id="rewardDlg">';
	winhtml += '<div class="ds-dialog">';
	winhtml += '<h1>文章打赏<a class="close_btn" id="closeBtn"></a></h1>';
	winhtml += '<div class="ds-body">';
	winhtml += '<ul>';
	winhtml += '<li value="1.00"><a href="javascript:void(0)" title="">￥1.00</a></li>';
	winhtml += '<li value="5.00"><a href="javascript:void(0)" title="">￥5.00</a></li>';
	winhtml += '<li class="ds-li-active" value="10.00"><a href="javascript:void(0)" title="">￥10.00</a></li>';
	winhtml += '<li value="25.00"><a href="javascript:void(0)" title="">￥25.00</a></li>';
	winhtml += '<li value="50.00"><a href="javascript:void(0)" title="">￥50.00</a></li>';
	winhtml += '<li value="100.00"><a href="javascript:void(0)" title="">￥100.00</a></li>';
	winhtml += '</ul>';
	winhtml += '</div>';
	winhtml += '<div class="ds-footer">';
	winhtml += '<a href="javascript:void(0)" class="ds-other-price">其他金额</a>';
	winhtml += '<div class="ds-price">';
	winhtml += '<em>￥</em>';
	winhtml += '<input type="text" class="ds-price-num">';
	winhtml += '</div>';
	winhtml += ' <a href="javascript:void(0)" class="ds-btn" id="payReward">立即支付</a>';
	winhtml += '</div>';
	winhtml += '</div>';
	winhtml += '</div>';
	$(".ds-price-num").keyup(function(){    
        $(this).val($(this).val().replace(/[^0-9.]/g,''));    
    }).bind("paste",function(){  //CTR+V事件处理    
        $(this).val($(this).val().replace(/[^0-9.]/g,''));     
    }).css("ime-mode", "disabled"); //CSS设置输入法不可用
	$('body').append(winhtml);
	easyDialog.open( {
		container : 'rewardDlg',
		fixed : false
	});
	$(".ds-body ul li,.ds-other-price").each(function(n){
	      $(this).click(function(){
	        if((!$(this).hasClass("ds-li-active")) && n!=6) {
	          $(this).addClass("ds-li-active").andSelf().siblings().removeClass("ds-li-active");
	          $(".ds-price").hide().andSelf().children("input").val("");
	        }else if (n == 6) {
	          $(this).addClass("ds-li-active")
	          $(".ds-body ul li").removeClass("ds-li-active");
	          $(".ds-price").css("display","inline-block").andSelf().children("input").focus();
	        }
	      })
	})
	$(".ds-other-price").blur(function(){
		var priceTest = /\D/g;
		var otherPrice = $(".ds-other-price").val();
		var isPrice=priceTest.test(otherPrice);

	})
	$("#payReward").click(
		function() {
			var dsPrice = $("li.ds-li-active").attr("value") || $(".ds-price .ds-price-num").val();
			$.loginPost('registRewardGoods.json',{goodsId:goodsId,goodsType:goodsType,rewardprice:dsPrice},function(data){
				if(data.success==false){
					MOER.alertError(data.message,1);
					if(data.errorCode == 986){
						location.href="payRecord.htm";
					}
				}else{
					easyDialog.close();
						//去确认订单页
						location.href="toShoppingReward.htm";
						//alert("去确认订单页");
				}
			});
		});
}
MOER.showUserCard=function(user_id,posObj)
{
	if(!$(".author-dialog").length>0){

	var thisTop = $(posObj).offset().top - 215;
    var thisLeft = $(posObj).offset().left - 20;
    var pos={"top":thisTop,"left":thisLeft};
    url="wapcommon_getUserBasicInfo.json";
    $.post(url,{"uid":user_id},function(data){
    	data = parseObj(data);
    	MOER.createUserCard(data,pos,posObj);
        $('.author-dialog').css({"top":-180,"left":-22});
    });
	}
}
MOER.createUserCard=function(user_info,pos,posObj)
{
	var winhtml = "";
	winhtml += '<div class="author-dialog">';
	winhtml += '<div class="author-dialog-header">';
	winhtml += '<a href="'+webPath+'/authorHome.htm?theId='+user_info.uid+'" title=""><img src="'+fileServerPath+user_info.imgSmall+'" alt="" class="thumb img-circle"></a>';
	winhtml += '<h4><a href="'+webPath+'/authorHome.htm?theId='+user_info.uid+'" title="">'+user_info.name+'</a><i class="icon icon-hv"></i></h4>';
	if(!isEmpty(user_info.summary)){
		if(user_info.summary.length>14){
			var userSum = user_info.summary.substring(0,13);
			winhtml += '<p>'+userSum+'...</p>';
		}else{
			winhtml += '<p>'+user_info.summary+'</p>';
		}
	}	
	else
		winhtml += '<p>这个家伙有点懒~</p>';
	winhtml += '</div>';
	winhtml += '<div class="author-dialog-body">';
	winhtml += '<p>';
	var attCnt = myAttentionsCount(user_info.uid);
	var fansCnt = myFansCount(user_info.uid);
	winhtml += '<span>文章<code>'+user_info.articleCount+'</code></span>|';
	winhtml += '<span>关注<code>'+attCnt+'</code></span>|';
	winhtml += '<span>粉丝<code>'+fansCnt+'</code></span>';
	winhtml += '</p>';
	winhtml += '<div>';
	
	if(user_info.guanZhu === "N" || user_info.guanZhu == null)
	{
		winhtml += '<span class="btn-attention btn-attention-1 btn-large" onclick="dsguanZhu(this,\''+user_info.uid+'\')"><i></i>加关注</span>';
	}
	else if(user_info.guanZhu === "Y")
		winhtml += '<span class="btn-attention btn-attention-2 btn-large" onclick="dsguanZhu(this,\''+user_info.uid+'\')"><i></i>已关注</span>';
	winhtml += '</a>';
	if(user_info.guanZhu != "S")
	{
		winhtml += '<span class="btn-attention btn-large" onclick="MOER.sendLetter(\''+user_info.name+'\','+user_info.uid+',\'1\')">发私信</span>';	
	}
    
    winhtml += '</div>';
    winhtml +='</div>';
    winhtml +='</div>';
    $(posObj).append(winhtml);
}

/**
 * 获取购物车商品数量
 */
function getCartGoodsTotal(){
	$.loginPost('getTotalCartGoods.json','',function(data){
		if(data>0){
			$("#carCount").text(data);
			$("#carCount").show();
    	}else{
    		$("#carCount").hide();
        }
		
	});
}
