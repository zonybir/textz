/*

position:  left   top  right bottom center  {left:X,top:X}
fixed:true  false 默认true
t: 若有此属性且值为false  则不带标题 此时tStyle属性无效
tStyle:无t属性或者t属性为true 时 生效   设置标题样式 eg  tStyle{coloe:red,fontSize:'18px',backgroundColor:#fff}
z:弹框内容  必有属性
zStyle:弹框 文字 box 的样式。    eg  zStyle{coloe:red,fontSize:'18px',backgroundColor:#fff}
type: 1 带确认按钮 （重要性提示） 2带确定与取消 返回true false(用户选择性用)   3无任何按钮 空白点击隐藏（不重要提示性用）

btnSureText:弹出框 确定按钮文字      type取值  1   、2 时生效
btnCancelText:取消按钮文字	         type取值  2  时生效
*/
(function(window){
	var d=document,
	cover=d.createElement('div'),
	dialog={
		coverStyle:{
		 	position:'fixed',
			width:'100%',
			height:'100%',
			zIndex:999,
			backgroundColor:'rgba(0,0,0,.6)',
			top:'0px'
			},
		boxStyle:{
			width:'200px',
			backgroundColor:'#fff',
			margin:'0 auto',
			top:'10%',
			position:'relative',
			minWidth:'220px'
			},
		titleStyle:{
			fontSize:'16px',
			color:'#fff',
			borderBottom:'1px solid #ccc',
			backgroundColor:'#8593B7',
			textAlign:'center',
			padding:'5px 10px'
			},
		zStyle:{
			fontSize:'14px',
			textAlign:'left',
			color:'#666',
			backgroundColor:'#fff',
			padding:'10px 15px',
			maxHeight:'221px',
			overflow:'auto',
			minHeight:'50px'
			},
		footerStyle:{
			padding:'5px 5px',
			backgroundColor:'#D2D2D2',
			color:'#333',
			fontSize:'16px',
			textAlign:'right'
		},
		btnCancelStyle:{
			width:'40px',
			padding:'2px 10px',
			color:'#fff',
			backgroundColor:'#8593B7',
			textAlign:'center',
			cursor:'pointer',
			fontSize:'14px',
			borderRadius:'5px',
			marginRight:'10px'
			},
		btnSureStyle:{
			width:'40px',
			padding:'2px 10px',
			color:'#fff',
			backgroundColor:'#8593B7',
			textAlign:'center',
			cursor:'pointer',
			fontSize:'14px',
			borderRadius:'5px',
			marginRight:'5px'
			}
	};	
	function addEvent(target,type,handler){
		if(target.addEventListener) target.addEventListener(type,handler,false);
		else if (target.attachEvent) target.attachEvent('on'+type,function(evet){return handler.call(target,event);})
		else {z.innerHTML='浏览器版本过低，请升级你的浏览器方可正常使用。谢谢！';}
	}
	function stop(event){
		var e=event || window.event;
		if (e.stopPropagation) e.stopPropagation();
		else if(window.event) window.event.cancelBubble = true;
	}
	function show(options){
		this.options=options;
		this.init();		 
	};
	show.prototype={
		cloneAndApeendNode:function(){
			this.box=cover.cloneNode(true),
			this.title=cover.cloneNode(true),
			this.z=cover.cloneNode(true),
			this.footer=cover.cloneNode(true),
			this.btnSure=d.createElement('span'),
			this.btnCancel=this.btnSure.cloneNode(true),
			this.box.appendChild(this.title);
			this.box.appendChild(this.z);
			this.box.appendChild(this.footer);
			this.cover=cover.cloneNode(true);
		},
		setT:function(){
			var _t=this;
			if (_t.options.t == false || _t.options.t == 'false'){
				_t.title.parentNode.removeChild(_t.title);
			}else {
				if( typeof _t.options.tStyle === 'object')_t.setStyle(_t.title,_t.options.tStyle);
				if(_t.options.tText) _t.title.innerHTML=_t.options.tText;
				else _t.title.innerHTML='提示';
			}
		},
		setZ:function(){
			var _t=this;
			if(typeof _t.options.z !== 'string') throw new Error('thr dialog\'s content don\'t allow empty.please add the prototype of z.');
			else{
				if (typeof _t.options.zStyle === 'object') _t.setStyle(_t.z,_t.options.zStyle);
				_t.z.innerHTML=_t.options.z;
			}
		},
		setBtn:function(){
			var _t=this;
			if (typeof _t.options.type !== 'underfind'){
				switch (_t.options.type){
					case 0:{
						_t.footer.parentNode.removeChild(_t.footer);
						addEvent(_t.cover,'click',function(){_t.close();});
						break;
					}
					case 1:{
						_t.footer.appendChild(_t.btnSure);
						if(_t.options.btnSureText) _t.btnSure.innerHTML=_t.options.btnSureText;
						else _t.btnSure.innerHTML='确定';
						if(_t.checkCallback('sureFun')) addEvent(_t.btnSure,'click',function(){_t.sureFun();});
						addEvent(_t.btnSure,'click',function(){_t.close();});
						_t.clickCoverHide();
						break;
					}
					case 2:{
						_t.footer.appendChild(_t.btnCancel);
						if(_t.options.btnCancelText) _t.btnCancel.innerHTML=_t.options.btnCancelText;
						else _t.btnCancel.innerHTML='取消';
						_t.footer.appendChild(_t.btnSure);
						if(_t.options.btnSureText) _t.btnSure.innerHTML=_t.options.btnSureText;
						else _t.btnSure.innerHTML='确定';
						addEvent(_t.btnSure,'click',function(){_t.close();});
						if(_t.checkCallback('sureFun')) addEvent(_t.btnSure,'click',function(){_t.sureFun();});
						addEvent(_t.btnCancel,'click',function(){_t.close();});
						if(_t.checkCallback('cancelFun')) addEvent(_t.btnCancel,'click',function(){_t.cancelFun();});
						break;
					}
					default:
						break;
				}
			}else {	//无type属性时 的默认类型
				if(_t.options.btnSureText) _t.btnSure.innerHTML=_t.options.btnSureText;
				else _t.btnSure.innerHTML='确定';
				_t.footer.appendChild(_t.btnSure);
				if(_t.checkCallback('sureFun')) addEvent(_t.btnSure,'click',function(){_t.sureFun();});
				addEvent(_t.btnSure,'click',function(){_t.close();});
				_t.clickCoverHide();
			}
		},
		overallStyle:function(){
			var _t=this;
			_t.setStyle(this.cover,dialog.coverStyle);
			_t.setStyle(this.box,dialog.boxStyle);
			_t.setStyle(this.title,dialog.titleStyle);
			_t.setStyle(this.z,dialog.zStyle);
			_t.setStyle(this.footer,dialog.footerStyle);
			_t.setStyle(this.btnSure,dialog.btnSureStyle);
			_t.setStyle(this.btnCancel,dialog.btnCancelStyle);
		},
		clickCoverHide:function(){
			var _t=this;
			if (this.options.clickCoverHide == true || this.options.clickCoverHide == 'true') addEvent(this.cover,'click',function(){_t.close();})
		},
		checkCallback:function(str){
			if(typeof this.options[str] === 'function') return true;
			else return false;
		},
		sureFun:function(){
			this.options.sureFun();
		},
		cancelFun:function(){
			this.options.cancelFun();
		},
		close:function(){
			this.cover.parentNode.removeChild(this.cover);
		},
		setStyle:function(ele,obj){for(var i in obj)ele.style[i]=obj[i];},
		init:function(){
			this.cloneAndApeendNode();
			this.overallStyle();
			this.setT();
			this.setZ();
			this.setBtn();
			var _t=this;

			
			addEvent(this.box,'click',stop);
			this.cover.appendChild(this.box);
			d.querySelectorAll('body')[0].appendChild(this.cover);
		}
	}	
	function zDialog(str,options){zDialog.prototype.start(str,options);};
	zDialog.prototype.start=function(str,options){
		if(typeof str !== 'string'){
			throw new Error("typeError:understard the type of '"+ typeof str +"' in zDialog('type str,type object');");
		}else{
			var obj=document.querySelectorAll(str);
			if (typeof options !== 'underfind') for(var i=0,len=obj.length;i<len;i++) addEvent(obj[i],'click',function(){new show(options);});	
			else throw new Error("typeError:understard the type of '"+ typeof options +"' in zDialog('type str,type object');");
		}
	}
	zDialog.prototype.initStyle=function(options){
		if (options.coverStyle) for(var i in options.coverStyle) dialog.coverStyle[i]=options.coverStyle[i];
		if (options.boxStyle) for(var i in options.boxStyle) dialog.boxStyle[i]=options.boxStyle[i];
		if (options.titleStyle) for(var i in options.titleStyle) dialog.titleStyle[i]=options.titleStyle[i];
		if (options.zStyle) for(var i in options.zStyle) dialog.zStyle[i]=options.zStyle[i];
		if (options.footerStyle) for(var i in options.footerStyle) dialog.footerStyle[i]=options.footerStyle[i];
		if(options.btnSureStyle) for(var i in options.btnSureStyle) dialog.btnSureStyle[i]=options.btnSureStyle[i];
		if(options.btnCancelStyle) for(var i in options.btnCancelStyle) dialog.btnCancelStyle[i]=options.btnCancelStyle[i];
		return this;
	};
	zDialog.init=zDialog.prototype.initStyle;
	zDialog.start=zDialog.prototype.start;
	window.$z=zDialog;
}(window));
window.onload=function(){
	var a=321;
	$z.init({
		boxStyle:{
			backgroundColor:'red',
			width:'100px'
		},
		coverStyle:{
			fontSize:'18px'
		}
	}).start('.text1',{
		type:1,
		z:'人们说',
		tText:'我们都有一个家。',
		btnSureText:'同意',
		zStyle:{
			textAlign:'center',
			color:'red'
		},
		sureFun:function(){
			console.log('zonybir\'s love.');
		},
		t:true,
		clickCoverHide:true
	});
	$z('.text2',{
		type:2,
		z:'我们都还在这里?',
		tText:'提示2',
		tStyle:{
			textAlign:'center'
		},
		sureFun:function(){
			console.log('你选择的是的，对不起，回答错误。');
			a++;
		},
		cancelFun:function(){
			console.log('你选择的不是，恭喜你答对了。');
		},
		btnSureText:'是的',
		btnCancelText:'不是'
	})
	//$z('.text2',{z:'fefefefefwefwfwfewfwefwefwfe'});
}