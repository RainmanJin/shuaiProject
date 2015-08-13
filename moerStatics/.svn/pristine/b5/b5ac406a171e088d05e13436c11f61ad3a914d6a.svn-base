
var dirtyWord =[];
$.post("wordsJs.json","",function(data){
	data = data.replace(",,", ",");
	if(!isEmpty(data)){
		var dataArr = data.split(",");
		$.each(dataArr,function(i,obj){
			dirtyWord.push(obj);
		});
	}
});

/*
* 对传进来的messageValue过滤并返回新内容
* messageValue --- 要过滤的语句
*/
function filterWord(messageValue) {
    // 根据文本域的id获取文本域对象内容
    var messageValue_new = messageValue;
    for (var i = 0; i < dirtyWord.length; i++) {
        messageValue_new = filterOneWord(messageValue_new, dirtyWord[i]); //过滤单个词语并返回过滤后的内容
    }
    return messageValue_new;
}
/*
* 这个函数用来过滤单个词语, 如果messageValue中含有oneDirtyWord, 则用"^_^"替换这个oneDirtyWord
* messageValue --- 要过滤的语句
* oneDirtyWord --- 要过滤的单词
*/
function filterOneWord(messageValue, oneDirtyWord) {
    var wordIndex = messageValue.lastIndexOf(oneDirtyWord); // 得到messageValue所包含的oneDirtyWord的位置, 如果不包含则返回 - 1
    var messageValue_new = messageValue;
    var strRep = "";
	for ( var int = 0; int < oneDirtyWord.length; int++) {
		strRep  += "*";
	}
    while (wordIndex != -1) {//循环判断并替换所有的oneDirtyWord
    	
        messageValue_new = messageValue_new.replace(oneDirtyWord, strRep);
        wordIndex = messageValue_new.lastIndexOf(oneDirtyWord);
    }
    return messageValue_new;
}
/*
* 是否包含敏感词
* messageValue --- 要过滤的语句
* oneDirtyWord --- 要过滤的单词
*/
function isContainWords(messageValue) {
	var flag = false;
    //是否有敏感词
    for (var i = 0; i < dirtyWord.length; i++) {
    	var oneDirtyWord = dirtyWord[i];
	  var wordIndex = messageValue.lastIndexOf(oneDirtyWord); // 得到messageValue所包含的oneDirtyWord的位置, 如果不包含则返回 - 1
	  while (wordIndex != -1) {//循环判断并替换所有的oneDirtyWord
		  flag = true;
		  break;
	  }
    }
    return flag;
}
