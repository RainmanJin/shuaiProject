/** 
  * 字典相关、下拉框
  * Deyun Chen 2013-05-20
  */
var loadsuccess = true;
var dict = {
	url:{
		parent: TRIG.PATH+ '/dictionary_findByParentList.json',
		NO: TRIG.PATH+ '/dictionary_findByNoList.json'
	},
	width:204,
	editable: false,
	required: false,
	clear: function(id) {
		$('#' + id).combobox('setValue', '');
	},
	setSelectByParent: function(id, pid, sid) {
		var _url = this.url.parent ;
		var _width = this.width;
		var _editable = this.editable;
		var _required = this.required;
		$('#' + id).combobox({   
		    valueField:'sysDictionary_dictionaryId',   
		    textField:'sysDictionary_dictionaryName',
		    editable: _editable,
		    required: _required,
		    width:_width
		});
		if(pid) {
			$.getJSON(_url,'token=' + getToken() +'&id=' + pid,function(data){
				$("#" + id).combobox('loadData', data);
			});
		}
		
		if(sid) {
			$("#" + id).combobox({
				onSelect:function(r) {
					dict.setSelectByParent(sid, r.sysDictionary_dictionaryId);
				}
			});
			var _pid = $("#" + id).combobox('getValue');
			this.setSelectByParent(sid, _pid, null);
		}
	},
	setSelectByNO: function(id, NO, sid) {
		var _url = this.url.NO ;
		var _width = this.width;
		var _editable = this.editable;
		var _required = this.required;
		$('#' + id).combobox({   
		    valueField:'sysDictionary_dictionaryId',   
		    textField:'sysDictionary_dictionaryName',
		    editable: _editable,
		    required: _required,
		    width:_width
		});
		if(NO) {
			$.getJSON(_url,'token=' + getToken() +'&id=' + NO,function(data){
				$("#" + id).combobox('loadData', data);
			});
		}
		
		if(sid) {
			$("#" + id).combobox({
				onSelect:function(r) {
					dict.setSelectByParent(sid, r.sysDictionary_dictionaryId);
				}
			});
			var _pid = $("#" + id).combobox('getValue');
			this.setSelectByParent(sid, _pid, null);
		}
	},
	setSelectByNOAndCode:function(id, NO,flag) {
		var _url = this.url.NO + '?token=' + getToken() +'&id=' + NO;
		var _editable = this.editable;
		var _required = this.required;
		$('#' + id).combobox({  
			url: _url,
		    valueField:'sysDictionary_dictionaryCode',   
		    textField:'sysDictionary_dictionaryName',
		    editable: _editable,
		    required: _required,
		    loadFilter : function (data){
				if(flag){
					data.unshift({'sysDictionary_dictionaryCode':'','sysDictionary_dictionaryName':"--请选择--"});
				}
				return data;
			}
		});
	},
	/**
	 *字典下拉框中 no和name
	 * @param id combobx的Id
	 * @param NO 字典表对应的标示
	 */
	setNameNoByNo:function(id, NO,flag) {
		var _url = this.url.NO + '?id=' + NO;
		var _editable = this.editable;
		var _required = this.required;
		$('#' + id).combobox({  
			url: _url,
		    valueField:'sysDictionary_dictionaryNo',   
		    textField:'sysDictionary_dictionaryName',
		    editable: _editable,
		    required: _required,
		    loadFilter : function (data){
			if(flag){
				data.unshift({'sysDictionary_dictionaryNo':'','sysDictionary_dictionaryName':"--请选择--"});
			}
	    	return data;
	    }
		});
	},
	/**
	 *字典下拉框中 no和name
	 * @param id combobx的Id
	 * @param NO 字典表对应的标示
	 */
	setStocks:function(id,flag) {
		var _url = TRIG.PATH+ '/stock_findBackVstock.json';
		$('#' + id).combobox({  
			url: _url,
		    valueField:'stockCode_no',   
		    textField:'stockCode_name',
		    loadFilter : function (data){
		    	
			if(flag){
			//	data.unshift({'sysDictionary_dictionaryNo':'','sysDictionary_dictionaryName':"--请选择--"});
			}
	    	return data;
	    }
		});
	},
	/**
	 *	后台	字典下拉框中 no和name
	 * @param id combobx的Id
	 * @param NO 字典表对应的标示
	 */
	setBackStocks:function(id) {
		$('#' + id).combobox({  
			valueField:'stockCode_no',   
			textField:'stockCode_name',
			keyHandler: {
				//up: function(){},
				//down: function(){},
				//enter: function(){},
				query: function(q){
					if(loadsuccess){
						loadsuccess = false;
						backLoadStocks(id,q);
					}
				}
			}
		});
	}
};
function backLoadStocks(id,n){
	$.post('stock_findVstock.json','stockCode_code='+n,function(data){
		if(data){
			//获取数据
			data = $.parseJSON(data);
			$("#"+id).combobox('loadData',data);
			$("#"+id).combobox('setValue',n);
			loadsuccess = true;
		}
	});
}
