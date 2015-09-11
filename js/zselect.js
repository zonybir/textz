(function(window){
	function select(str,content){
		if (typeof str === 'string'){
			str=str.replace(/\s{2,}/g,' ').replace(/^\s || \s$/g,'').replace(/\s*,\s*/g,',');
			console.log(str);
		}
	}
	window.$=select;
}(window))