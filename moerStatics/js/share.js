var _moer_url =  encodeURIComponent(window.location.href);


/*$(function() {
	var _moer_title = $('title').html();
	var _moer_content = "";
	var _moer_pic = encodeURIComponent($('body').find('img').eq(0).attr('src'));
	if(!isEmpty(share_config))
	{
		if(!isEmpty(share_config.title)) {
			_moer_title = share_config.title;
		}
		if(!isEmpty(share_config.content)) {
			_moer_content = share_config.content;
		}
		if(!isEmpty(share_config.imageUrl)) {
			_moer_pic = encodeURIComponent(share_config.imageUrl);
		}
	}

	if (isEmpty(_moer_pic))
	{
		_moer_pic = '';
	}

	// sina分享
	$('.share_sina').click(function() {
		//shareSina(_moer_title,_moer_content,,_moer_pic,_moer_url);
		var _moer_share_title = '【'+_moer_title+'】'+ _moer_content;
		if (!isEmpty($(this).attr('data')))
		{
			_moer_share_title += '...@'+$(this).attr('data');
		}
		var _moer_source = '';
		var _moer_appkey = '435105312';
		var _moer_ralateUid = '';

		var _sina_url = 'http://service.weibo.com/share/share.php?title='+_moer_share_title+'&url='+_moer_url+'&source='+_moer_source+'&appkey='+_moer_appkey+'&pic='+_moer_pic+'&searchPic=false&relateUid='+_moer_ralateUid+"&changweibo=yes";
		window.open(_sina_url);
		
		//分享次数addShareNumber(this, $(this).attr('url'));
	});
	
	// QQ好友分享
	$('.share_qq').click(function() {
		var _moer_share_desc = _moer_content;
		var _moer_share_title = _moer_title;
		var _moer_site = 'jiemian';

		var _QQ_share_url = 'http://connect.qq.com/widget/shareqq/index.html?url='+_moer_url+'&showcount=0&desc='+_moer_share_desc+'&summary='+_moer_share_desc+'&title='+_moer_share_title+'&site='+_moer_site+'&pics'+_moer_pic;
		window.open(_QQ_share_url);
		
		//addShareNumber(this, $(this).attr('url'));
	});

	// QQ空间
	$('.share_qzone').click(function() {
		var _Qzone_share_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ _moer_url +'&title='+ _moer_title +'&pics='+ _moer_pic +'&summary='+ _moer_content;
		window.open(_Qzone_share_url);
		//addShareNumber(this, $(this).attr('url'));
	});

	// 雪球分享
	$('.xueqiu_sina').click(function() {

		var _xueqiu_url = 'http://xueqiu.com/service/share?url='+_moer_url+'&title='+_moer_title+'&content='+_moer_content;
		window.open(_xueqiu_url);
		
		//分享次数addShareNumber(this, $(this).attr('url'));
	});
	
	// QQ微博
	$('.share_qq_weibo').click(function() {
		var _moer_QQ_weibo_title = encodeURIComponent('【'+ _moer_title +'】'+ _moer_content);
		var _moer_QQ_appkey = '';
		var _moer_site = '';
		
		var _Qweibo_share_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title='+_moer_QQ_weibo_title+'&url='+ _moer_url +'&appkey='+_moer_QQ_appkey+'&site='+_moer_site+'&pic='+_moer_pic;
		window.open(_Qweibo_share_url);
		//addShareNumber(this, $(this).attr('url'));
	});

	// 微信分享
	$('.share_weixin').click(function() {
		$("#share_weixin_url").attr("src",'http://s.jiathis.com/qrcode.php?url='+_moer_url);
//		showQRcode(".qr_box1");
		//addShareNumber(this, $(this).attr('url'));
	});
	// 关闭微信弹窗
	$('body').on('click','.share_winxin_close', function() {
		//$('.share_weixin_win').remove();
	});
	function addShareNumber(obj, url) {
		if ($(obj).attr('share') == 'true')
		{
			$.get(url, {}, function(data) {
				$(obj).attr('share', 'false');
			});
		}
	}
});*/

/**
 *  分享新浪微博
 * @param _moer_title
 * @param _moer_content
 * @param _moer_pic
 * @param data
 * @param url :可以为空
 * @returns
 */
function shareSina(_moer_title,_moer_content,_moer_pic,data,url){
	var _moer_share_title = '【'+_moer_title+'】'+ _moer_content;
	if (!isEmpty(data))
	{
		_moer_share_title += '...@'+data;
	}
	if(!isEmpty(url)){
		_moer_url=url;
	}
	var _moer_source = '';
	var _moer_appkey = '435105312';
	var _moer_ralateUid = '';

	var _sina_url = 'http://service.weibo.com/share/share.php?title='+_moer_share_title+'&url='+_moer_url+'&source='+_moer_source+'&appkey='+_moer_appkey+'&searchPic=false&relateUid='+_moer_ralateUid+"&changweibo=yes";
	if(!isEmpty(_moer_pic)){
		_sina_url+='&pic='+_moer_pic;
	}
	window.open(_sina_url);
}

/**
 * 分享qq微博
 * @param _moer_title
 * @param _moer_content
 * @param _moer_pic
 * @param url
 * @returns
 */
function shareQqWeiBo(_moer_title,_moer_content,_moer_pic,url){
	if(!isEmpty(url)){
		_moer_url=url;
	}
	var _moer_QQ_weibo_title = encodeURIComponent('【'+ _moer_title +'】'+ _moer_content);
	var _moer_QQ_appkey = '';
	var _moer_site = '';
	
	var _Qweibo_share_url = 'http://share.v.t.qq.com/index.php?c=share&a=index&title='+_moer_QQ_weibo_title+'&url='+ _moer_url +'&appkey='+_moer_QQ_appkey+'&site='+_moer_site+'&pic='+_moer_pic;
	window.open(_Qweibo_share_url);
}

/**
 * 分享QQ空间
 * @param _moer_title
 * @param _moer_content
 * @param _moer_pic
 * @param url
 */
function shareQqZone(_moer_title,_moer_content,_moer_pic,url){
	if(!isEmpty(url)){
		_moer_url=url;
	}
	var _Qzone_share_url = 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='+ _moer_url +'&title='+ _moer_title +'&pics='+ _moer_pic +'&summary='+ _moer_content;
	window.open(_Qzone_share_url);
}

/**
 * 分享雪球
 * @param _moer_title
 * @param _moer_content
 * @param _moer_pic
 * @param url
 */
function shareXueQiu(_moer_title,_moer_content,_moer_pic,url){
	if(!isEmpty(url)){
		_moer_url=url;
	}
	var _xueqiu_url = 'http://xueqiu.com/service/share?url='+_moer_url+'&title='+_moer_title+'&content='+_moer_content;
	window.open(_xueqiu_url);
}
/**
 * 分享微信
 * @param jqSel:jquery的选择器例如 .qrCode #qrCode
 * @param url :要变成二维码的url
 */
function shareWeiXin(jqSel,url){
	if(!isEmpty(url)){
		_moer_url=url;
	}
	$("#share_weixin_url").attr("src",'http://s.jiathis.com/qrcode.php?url='+_moer_url);
	showQRcode(jqSel);
}
