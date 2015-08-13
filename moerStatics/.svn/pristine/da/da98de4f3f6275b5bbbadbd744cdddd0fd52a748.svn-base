//添加标签
var lablId = -1;
var stocks = "";
//股票是否必填
var stocksRequired = false;
function getVstocks(){
	if($("#authorArticle_stocks").val()!=""){
		//加载股票下拉
		$.post('stock_findVstock.json','stockCode_code='+$("#authorArticle_stocks").val(),function(data){
			if(!isEmpty(data)){
				//获取数据
				data = $.parseJSON(data);
				var codes = "";
				$.each(data,function(i,n){
					codes+=("<code stockno='"+n.stockCode_no+"' id='code_"+n.stockCode_no+"'>"+n.stockCode_name+"("+n.stockCode_code+")</code>");
				});
				$(".dim_search").html(codes);
				$(".dim_search").show();
				
				//选中的code添加class stock_select
				bindstyle();
				//绑定点击事件
				bindclick();
			}
		});
	}else{
		$(".dim_search").html("");
		$(".dim_search").hide();
	}
}

/**
 * 为加载出的code添加事件
 * @return
 */
function bindclick(){
	//选择股票事件
	$(".dim_search code").click(function() {
		if($(this).attr("class")!="stock_select"){
	        var str = $(this).attr("stockno");
	        if (isNan(str) != true) {
	        	$(this).addClass("stock_select");
	            var li_id = $(".label li:last-child").attr('id');
	            if (li_id != undefined) {
	                li_id = li_id.split('_');
	                li_id = parseInt(li_id[1]) + 1;
	            } else {
	                li_id = 0;
	            }
	            $(this).attr("id","code_"+li_id)
	            $(".label_box").css("display", "block");
	            var text = "<li id='li_" + li_id + "'><a href='javascript:;' onclick='deletes(" + li_id + ");' ><span></span>" + $(this).html() + "</a><input type='hidden' name='label[" + li_id + "].name' value='" + str + "'></li>";
	            $(".label").append(text);
	        }
		}
		$(".dim_search").html("");
		$(".dim_search").hide();
		$("#authorArticle_stocks").val("");
	});
}

/**
 * 查询code后为code添加选中样式
 */
 
function bindstyle(){
	 $(".label li input").each(function(){
	    	$("#code_"+$(this).val()).addClass("stock_select");
	    });
}
//删除股票标签
function deletes(id) {
    $("#li_" + id).remove();
    //重新加载authorArticle_stocks input框中的值
    var li_id = $(".label li:last-child").attr('id');
    if (li_id == undefined) {
        $(".label_box").css("display", "none");
    }
}

function loadOnColumn(){
	$.getJSON("wapcommon_findByNoList.json?id="+"TZGD_LANMU", function(data){
		constructRadio(data,'#divOncolumn','authorArticle_onColumn');
	});
}

function loadIndustry(){
	$.getJSON("wapcommon_findByNoList.json?id="+"TZGD_HANGYE", function(data){
		constructRadio(data,'#divIndustry','authorArticle_industry');
	});	
}

function loadOnSubcolumn(parentRadio){
	var id=parentRadio.val();
	var data=$(document).data("kv_onSubcolumn"+id);
	
	if(data){
		constructRadio(data,'#divOnSubcolumn','authorArticle_onSubcolumn');
		return;
	}
	
	$.getJSON("wapcommon_findByNoList.json?id="+id, function(data){
		$(document).data("kv_onSubcolumn"+id,data);//进行缓存
		constructRadio(data,'#divOnSubcolumn','authorArticle_onSubcolumn');
	});	
}

function constructRadio(data,container,name){
	var radiosHtml='';
	
	if(!data ||data.length==0){
		$(container).html(radiosHtml);
		return;
	}
	
	//radiosHtml+=constructOnRadio(name,'','请选择');
	for(var i=0;i<data.length;i++){
		var dataName=data[i].sysDictionary_dictionaryName;
		var dataNo=data[i].sysDictionary_dictionaryNo;
		radiosHtml+=constructOnRadio(name,dataNo,dataName);
	}
	$(container).html(radiosHtml);
}

function constructOnRadio(name,key ,value){
	return '<span><input type="radio" name="'+name+'" value="'+key+'" id="'+key+'" /><label for="'+key+'">'+value+'</label></span>';
}


$(function(){
	$(".article_menu_ct:gt(0)").hide();
	$(".write_article_menu li").click(function(){
		$(this).addClass("article_menu_selected").siblings().removeClass();
		var selContent=$(".write_article_menu li").index(this);
		$(".article_menu_ct").eq(selContent).show().siblings().hide();
	})
	//初始创建编辑框
//	createKindEditor('authorArticle_content');
//	var ke1content = "<span style=\"color:#999999;\">活动详情描述，最好包含主题、参与嘉宾、对投资者的好处等重要内容。也可插入活动海报。</span>";
//	createKindEditor1('mActivityOffline_content',ke1content);

	//加载栏目下拉
	//setFrontNameNoByNo('authorArticle_onColumn','MOER_TOUZIGUANDIAN',true);
	//加载栏目radio 2015-4-27 15:02:16 刘青
	loadOnColumn();
	
	//给一级栏目加事件
	$(document).delegate('#divOncolumn  input','click',function(){
		loadOnSubcolumn($(event.target));
	});
	
	//加载行业下拉
	//setFrontNameNoByNo('authorArticle_industry','TZGD_HANGYE',true);	
	//加载行业radio 2015-4-27 15:02:22 刘青
	loadIndustry();
	
	//选择股票事件
	$("#authorArticle_stocks").keyup(function(){
		getVstocks();
	});
	
	//-----------------文本框焦点验证--------------------
	//文章标题
	$("#authorArticle_title").blur(function(){
		if($("#authorArticle_title").css('color')=='rgb(178, 178, 178)'){
			$("#authorArticle_title").addClass("redborder");
		}else{
			$("#authorArticle_title").removeClass("redborder");
		}
	});
	
	//一级栏目
	$('#divOncolumn,#divOnSubcolumn,#divIndustry').click(function(){
		$(this).removeClass("redborder");
	});
	
	
	
	//栏目
	$("#authorArticle_onColumn").change(function(){
		if($('#authorArticle_onColumn option:selected').val().replace(/ /gm,"")==''){
			$("#authorArticle_onColumn").addClass("redborder");
		}else{
			$("#authorArticle_onColumn").removeClass("redborder");
		}
		//判断栏目是否为-沪深、美股、港股，如果是则股票必填
		if("TZGD_HUSHEN,TZGD_GANGGU,TZGD_MEIGU".indexOf($('#authorArticle_onColumn option:selected').val())>-1&&$('#authorArticle_onColumn option:selected').val()!=''){
			$("#authorArticle_stocks").next('span').html("（必填）");
			$("#authorArticle_stocks").next('span').css("color","rgb(255, 0, 0)");
			stocksRequired = true;
		}else{
			$("#authorArticle_industry").removeClass("redborder");
			$("#authorArticle_stocks").next('span').html("（选填）");
			$("#authorArticle_stocks").next('span').css("color","");
			stocksRequired = false;
		}	
	});
	//行业去掉验证
/*	$("#authorArticle_industry").change(function(){
		//判断栏目是否为-沪深、美股、港股，如果是则股票必填
		if(stocksRequired){
			if($('#authorArticle_industry option:selected').val().replace(/ /gm,"")==''){
				$("#authorArticle_industry").addClass("redborder");
			}else{
				$("#authorArticle_industry").removeClass("redborder");
			}
		}
	});*/
	//摘要
	$("#authorArticle_summary").blur(function(){
		if($("#authorArticle_summary").css('color')=='rgb(178, 178, 178)'){
			$("#authorArticle_summary").addClass("redborder");
		}else{
			$("#authorArticle_summary").removeClass("redborder");
		}
	});
	$("#authorArticle_summary").on('input propertychange',function(){
		//总长度300
		var maxlen = 300;
		//当前长度
		var nowlen = $(this).val().length;
		//剩余长度 
		var restlen = maxlen-nowlen;
		$("#authorArticle_summary_tip").css("text-indent","260px");
		$("#authorArticle_summary_tip").html("当前已输入"+nowlen+"个字符, 您还可以输入"+restlen+"个字符");
	});
	//活动标题
	$("#mActivityOffline_title").blur(function(){
		if($("#mActivityOffline_title").css('color')=='rgb(178, 178, 178)'){
			$("#mActivityOffline_title").addClass("redborder1");
		}else{
			$("#mActivityOffline_title").removeClass("redborder1");
		}
	});
	//活动时间
	$("#mActivityOffline_time").blur(function(){
		if($("#mActivityOffline_time").val()==''){
			$("#mActivityOffline_time").addClass("redborder1");
		}else{
			$("#mActivityOffline_time").removeClass("redborder1");
		}
	});
	
	//活动城市
	$("#mActivityOffline_city").blur(function(){
		if($("#mActivityOffline_city").val().replace(/ /gm,"")==''){
			$("#mActivityOffline_city").addClass("redborder1");
		}else{
			$("#mActivityOffline_city").removeClass("redborder1");
		}
	});
	//活动摘要
	$("#mActivityOffline_summary").blur(function(){
		if($("#mActivityOffline_summary").val().replace(/ /gm,"")==''){
			$("#mActivityOffline_summary").addClass("redborder1");
		}else{
			$("#mActivityOffline_summary").removeClass("redborder1");
		}
	});
	$("#mActivityOffline_summary").on('input propertychange',function(){
		//总长度300
		var maxlen = 300;
		//当前长度
		var nowlen = $(this).val().length;
		//剩余长度 
		var restlen = maxlen-nowlen;
		$("#mActivityOffline_summary_tip").css("text-indent","260px");
		$("#mActivityOffline_summary_tip").html("当前已输入"+nowlen+"个字符, 您还可以输入"+restlen+"个字符");
	});
	//单选按钮选择事件
	$("#articlePrice").click(function(){
		$("input[name='authorArticle_price']:last").prop("checked",true); 
		$("#articlePrice").removeClass("redborder");
	});
	$("input[type=radio][name=authorArticle_price]").click(function(){
		$("#articlePrice").removeClass("redborder");
	});
	$("#activityPrice").click(function(){
		$("input[name='mActivityOffline_price']:last").prop("checked",true); 
		$("#activityPrice").removeClass("redborder1");
	});
	$("input[type=radio][name=mActivityOffline_price]").click(function(){
		$("#activityPrice").removeClass("redborder1");
	});
	$("#otherStatement").click(function(){
		//$("input[name='authorArticle_relatedstatement']").click();
		//$("input[name='authorArticle_relatedstatement']:last").prop("checked",true); 
		$("#relatedstatement").css("color","");
	});
	
	$("input[name='authorArticle_relatedstatement']").click(function(){
		$("#relatedstatement").css("color","");
		if( document.getElementsByName("authorArticle_relatedstatement")[0].checked==true){
			$(".warning").show();
		}else{
			$(".warning").hide();
		}
		if(document.getElementsByName("authorArticle_relatedstatement")[4].checked==true){
			$("#otherStatement").show();
		}else{
			$("#otherStatement").hide();
		}
	});
	
});

//判断是否为空
function isNan(obj) {
    try {
        return obj == 0 ? true: !obj;
    } catch(e) {
        return true;
    }
}

//提交内容到编辑器
function subToEdit(){
	var content="";
	$("#articleContent textarea").each(function(){
		if($(this).val()){
			content+=$(this).val()+"<br/>";
		}
	});
	//将内容放入编辑器
//	ke.html(content);
	editor.setContent(content);
	//跳转到编辑器
	$('.write_article_menu li:eq(0)').addClass("article_menu_selected");
	$('.write_article_menu li:eq(1)').removeClass("article_menu_selected");
	$(".article_menu_ct:eq(0)").show();
	$(".article_menu_ct:eq(1)").hide();
	$('.write_article_menu li').unbind("click");
	
}

//-------------------------提交文章 start -------------------------------------
//获取要存储的字段
function getArticleParam(){
	editor.execCommand( 'autotypeset' );
	//利益相关声明
	var statement = $('input[name=authorArticle_relatedstatement]:radio:checked').val();
	if(isEmpty(statement)){
		statement = $("#otherStatement").val(); 
	}
	//价格设置
	var price = $('input[name=authorArticle_price]:radio:checked').val();
	if(""==price){
		price = $("#articlePrice").val();
	}
	//涉及股票
	$(".label li input").each(function(){
    	if(""!=stocks){
    		stocks+=",";
    	}
    	stocks+=$(this).val();
	});
	//过滤敏感词
//	var content = ke.html();
	var content = editor.getContent();
	content = content.replace(/&nbsp;/g,"");
	if(isContainWords(content)){
		content = filterWord(content);
	}
	var articlepreview;
	var preview = content.substring(0,300)+"...";
    var img_index = preview.lastIndexOf('<img');
    if(img_index > 150){
        articlepreview = preview.substring(0, img_index)+"...";
    }else{
        articlepreview = preview;
    }
	//获取参数
	var param = {
		authorArticle_title:$("#authorArticle_title").val(),
		
		/*---------2015-4-27 18:55:44 刘青 前台一级栏目，行业表现形式修改，添加二级栏目-----------
		//authorArticle_onColumn:$('#authorArticle_onColumn option:selected').val(),
		//authorArticle_industry:$('#authorArticle_industry option:selected').val(),
		*/
		authorArticle_onColumn:$('[name="authorArticle_onColumn"]:checked').val(),		
		authorArticle_onSubcolumn:$('[name="authorArticle_onSubcolumn"]:checked').val(),
		authorArticle_industry:$('[name="authorArticle_industry"]:checked').val(),
		
		authorArticle_mainStock:stocks.substring(0,stocks.indexOf(",")),
		authorArticle_stocks:stocks,
		authorArticle_price:price,
		authorArticle_summary:$("#authorArticle_summary").val(),
		authorArticle_content:content,
		authorArticle_relatedstatement:statement,
		authorArticle_preview:articlepreview
	}; 
	
	//验证
	var valid = true;
	//判断标题是否为空
	if($("#authorArticle_title").css('color')=='rgb(178, 178, 178)'){
		$("#authorArticle_title").addClass("redborder");
		valid = false;
	}

	if(!param.authorArticle_onColumn){ 
		$('#divOncolumn').addClass("redborder");
		valid = false;
	}
	
	if($('[name="authorArticle_onSubcolumn"]').length>0&&!param.authorArticle_onSubcolumn){
		$('#divOnSubcolumn').addClass("redborder");
		valid = false;
	}
	
/*	if(!param.authorArticle_industry){

		$("#divIndustry").addClass("redborder");
		valid = false;
	}*/
	
	if(param.authorArticle_price.replace(/ /gm,"")==''||isNaN(param.authorArticle_price)||(param.authorArticle_price>10000)){
		$("#articlePrice").addClass("redborder");
		valid = false;
	}

	if(param.authorArticle_summary.replace(/ /gm,"")==''||param.authorArticle_summary=="简短概括你的文章论点，即摘要。"){
		$("#authorArticle_summary").addClass("redborder");
		valid = false;
	}

	if(param.authorArticle_content.replace(/ /gm,"")==''){ 
		valid = false;
	}
	if(!param.authorArticle_relatedstatement){
		$("#authorArticle_relatedstatement").addClass("redborder");
		valid = false;
	}
	if(stocksRequired&&stocks.replace(/ /gm,"")==''){
		valid = false;
	}
	if(valid){
		
		return param;
	}else{
		var scroll_offset = $(".redborder:eq(0)").offset();  //得到pos这个div层的offset，包含两个值，top和left
		
		if(!scroll_offset){
			if(stocksRequired&&stocks.replace(/ /gm,"")==''){ 
				scroll_offset = $("#authorArticle_stocks").offset();
	//		}else if(!ke.html()){
			}else if(!editor.getContent()){
				scroll_offset = $(".ke-container").offset();
			}else{
				$("#relatedstatement").css("color","red");
				scroll_offset = $("#relatedstatement").offset();
			}
		}
		
		//需要获取table的坐标，减去头部固定的高度，得到正确的纵坐标 定位题目
		$("body,html").animate({
		   scrollTop:scroll_offset.top-150//让body的scrollTop等于pos的top，就实现了滚动
		},0);
	}
}

//提交文章submit
function saveArticle(status){
	MOER.process();
	var params = getArticleParam();
	if(params){
		params.authorArticle_articleStatus = status;
		$.post('articlefront_saveArticle.json',params,function(data){
			data = $.parseJSON(data);
			easyDialog.close();
			if(data.success==true){
				//跳转页面
				//location.reload();
				if(status==1){
					MOER.pubAlert('发布成功！',3);
				}else{
					MOER.pubAlert('该文章已成功放入草稿箱！',3);
				}
			}else{
				MOER.alertError(data.message);
			}
		});
	}else{
		easyDialog.close();
	}
}
//-------------------------提交文章 end ---------------------------------------


//-------------------------提交活动 start -------------------------------------

//上传图片
function uploadImg(){
	MOER.process();
	var url = 'upload_upload.json';
	url += "?id=/uploadfiles/images/&uploadType=1";
	$.ajaxFileUpload({  
		url: url,  
		secureuri: false,  
		fileElementId: 'uploadfile',  
		dataType: 'json', 
		success: function(data, status) { 
			easyDialog.close();
			if(data.success==true) {
				var obj = $.parseJSON(data.message);
				var path = obj.filename;
				$("#mActivityOffline_picture").val(path);
				$("#mActivityOffline_picture").removeClass("redborder1");
			}else {
				MOER.alertError(data.message);
					if(data.errorCode==10003) {
						//TRIG.messager.alert("<t:text key="tools.resource.fileexist"/>");
					}else{
						//TRIG.successHandle(data);
					}
			}
		}	//文件上传的success事件
	});
}	

//获取要存储的字段
function getActivityParam(){
	//价格设置
	var price = $('input[name=mActivityOffline_price]:radio:checked').val();
	if(""==price){
		price = $("#activityPrice").val();
	}
	//过滤敏感词
//	var content = ke1.html();
	var content = editor2.getContent();
//	if(content!=ke1content){
	if(content!=null && content!=''){
		if(isContainWords(content)){
			content=filterWord(content);
		}
	}else{
		content="";
	}
	//保存参数
	var param = {
		mActivityOffline_title:$("#mActivityOffline_title").val(),
		mActivityOffline_time:$("#mActivityOffline_time").val(),
		mActivityOffline_city:$("#mActivityOffline_city").val(),
		mActivityOffline_price:price,
		mActivityOffline_summary:$("#mActivityOffline_summary").val(),
		mActivityOffline_picture:$("#mActivityOffline_picture").val(),
		mActivityOffline_content:content,
		mActivityOffline_remark:$("#mActivityOffline_remark").val()
	};
	
	//验证
	var valid = true;
	if($("#mActivityOffline_title").css('color')=='rgb(178, 178, 178)'){
		$("#mActivityOffline_title").addClass("redborder1");
		valid = false;
	}
	
	if(param.mActivityOffline_time==''){
		$("#mActivityOffline_time").addClass("redborder1");
		valid = false;
	}

	if(param.mActivityOffline_city.replace(/ /gm,"")==''){
		$("#mActivityOffline_city").addClass("redborder1");
		valid = false;
	}

	if(param.mActivityOffline_price.replace(/ /gm,"")==''||isNaN(param.mActivityOffline_price)){
		$("#activityPrice").addClass("redborder1");
		valid = false;
	}
	if(param.mActivityOffline_picture.replace(/ /gm,"")==''){
		$("#mActivityOffline_picture").addClass("redborder1");
		valid= false;
	}
	if(param.mActivityOffline_summary.replace(/ /gm,"")==''||param.mActivityOffline_summary=="简短概括活动内容。"){
		$("#mActivityOffline_summary").addClass("redborder1");
		valid = false;
	}

	if(param.mActivityOffline_content.replace(/ /gm,"")==''){
		valid = false;
	}
	
	if(valid){
		return param;
	}else{
		var scroll_offset = $(".redborder1:eq(0)").offset();  //得到pos这个div层的offset，包含两个值，top和left
		if(!scroll_offset){
			scroll_offset = $(".article_menu_ct1").offset();
		}
		//需要获取table的坐标，减去头部固定的高度，得到正确的纵坐标 定位题目
		$("body,html").animate({
		   scrollTop:scroll_offset.top-150  //让body的scrollTop等于pos的top，就实现了滚动
		},0);
	}
}

//提交活动submit
function saveActivity(status){
	MOER.process();
	var params = getActivityParam();
	if(params){
		params.mActivityOffline_activityStatus = status;
		$.post('activityfront_saveActivity.json',params,function(data){
			data = $.parseJSON(data);
			easyDialog.close();
			if(data.success==true){
				if(status==1){
					MOER.pubAlert('发布成功！',3);
				}else{
					MOER.pubAlert('该活动已成功放入草稿箱！',3);
				}
			}else{
				MOER.alertError(data.message);
			}
		});
	}else{
		easyDialog.close();
	}
}
//-------------------------提交活动 end ---------------------------------------