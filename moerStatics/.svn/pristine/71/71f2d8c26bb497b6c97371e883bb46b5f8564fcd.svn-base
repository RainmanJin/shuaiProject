function goBack(){
	window.history.go(-1);
}

function goIndex(){
	location.href="wapIndex.htm";
}
/** 是否是空 */
function isEmpty(obj) {
	if (!obj || obj == "" || obj == null) {
		return true;
	}
	return false;
}

/**
 * 格式化时间 yyyy-MM-dd
 * @param date
 */
function formatDate(date){
	 var y = date.getFullYear();  
	 var m = date.getMonth() + 1;  
	 var d = date.getDate();  
	 return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);  
}

/**
 * 格式化时间 yyyy-MM-dd HH:mm:ss
 * @param date
 */
function formatTime(date){
	 var y = date.getFullYear();  
	 var m = date.getMonth() + 1;  
	 var d = date.getDate();
	 var hour = date.getHours();
	 var minute = date.getMinutes();
	 var second = date.getSeconds();
	 return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)+' '+(hour < 10 ? '0' + hour : hour)+':'+(minute < 10 ? '0' + minute : minute)+':'+(second < 10 ? '0' + second : second);  
}

/**
 * 格式化时间 yyyy-MM-dd HH:mm
 * @param date
 */
function formatTime2(date){
	 var y = date.getFullYear();  
	 var m = date.getMonth() + 1;  
	 var d = date.getDate();
	 var hour = date.getHours();
	 var minute = date.getMinutes();
	 return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)+' '+(hour < 10 ? '0' + hour : hour)+':'+(minute < 10 ? '0' + minute : minute);  
}
/**
 * 获取传入时间与当前时间差
 * @param datetime
 * @return strTime 格式化后的字符串时间
 */
function getTimeDiff2(endtime,starttime,isDate){
	var startDate;
	if(!isEmpty(starttime)){
		startDate=new Date(starttime);
	}else{
		startDate=new Date();
	}
	var endDate= new Date(endtime); 
	var df=(startDate.getTime()-endDate.getTime());
	if(df===0){
		return "刚刚";
	}else if(Math.floor(df/1000)<60){
		return Math.floor(df/1000)+"秒前";
	}else if(Math.floor(df/1000/60)<60){
		return Math.floor(df/1000/60)+"分钟前";
	}else if(Math.floor(df/1000/60/60)<24){
		return Math.floor(df/1000/60/60)+"小时前";
	}else{
		if(isDate){
			return formatDate(endDate);
		}else{
			return formatTime2(endDate);
		}		
	}
}

//取出html代码中的内容
function stripHTMLTag(str) {
    str = new String(str);
    // 去除HTML tag
    str = str.replace(/<\/?[^>]*>/g,'');
    // 去除行尾空白
    str = str.replace(/[ | ]*\n/g,'\n');
    // 去除多余空行
    str = str.replace(/\n[\s| | ]*\r/g,'\n');
    // 去掉&nbsp;
    str = str.replace(/&nbsp;/ig,'');
            
    return str;
}

/**
 * 获取html脚本中的第一个图片路径
 * @param str
 * @return
 */
function getImgSrc(str){
	var matches = /src="(.*?)"/gi,results=null,i=len=0;
	results=matches.exec(str);
	if(results){
		for(i=1,len=results.length;i<len;i++){
			return results[i];
		}
	}
}