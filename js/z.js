/*

position:  left   top  right bottom center  {left:X,top:X}
fixed:true  false 默认true
t: 若有此属性  带标题 
tColor:  带标题 此属性生效  标题颜色
tfSize:标题字体大小
z:弹框内容
zColor:弹框字体颜色
zfSize:弹框内容字体大小
type: 1 带确认按钮 （重要性提示） 2 无确认按钮 空白点击隐藏（不重要提示性用）  3带确定与取消 返回true false(用户选择性用) 
border:'1px solid #ccc' 弹出框的边框
box-show:弹出框的阴影
box-bgColor:弹出框背景色
*/
(function(window){
	var d=document,
	cover=d.createElement('div'),
	box=cover.cloneNode(true),
	title=cover.cloneNode(true),
	z=cover.cloneNode(true),
	footer=cover.cloneNode(true),
	btnSure=d.createElement('span'),
	btnCancel=btnSure.cloneNode(true),
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
			position:'relative'
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
			overflow:'auto'
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

	function setStyle(ele,style){
			for (var i in style){
				ele.style[i]=style[i];
			}
	}

	
	cover.appendChild(box);


	
	title.innerHTML='提示';
	box.appendChild(title);

	
	
	var str='确认同意协议，继续下一步操作？';
	/*for (var i=0;i<5;i++){
		str+=str;
	}*/
	z.innerHTML=str;
	box.appendChild(z);

	

	
	
	btnSure.innerHTML='确定';
	btnCancel.innerHTML='取消';
	
	
	footer.appendChild(btnCancel);
	footer.appendChild(btnSure);
	box.appendChild(footer);

	d.querySelectorAll('body')[0].appendChild(cover);
	
	function addEvent(target,type,handler){
		if(target.addEventListener) target.addEventListener(type,handler,false);
		else if (target.attachEvent) target.attachEvent('on'+type,function(evet){return handler.call(target,event);})
		else {z.innerHTML='浏览器版本过低，请升级你的浏览器方可正常使用。谢谢！';}
	}
	function  hasPrototype(obj){
		if(typeof obj !== 'underfind') return true;
		else return false;
	}
	function close(){
		cover.parentNode.removeChild(cover);
	}
	function stop(event){
		var e=event || window.event;
		if (e.stopPropagation) e.stopPropagation();
		else if(window.event) window.event.cancelBubble = true;
	}

	addEvent(btnSure,'click',function(){
		close();
		return true;
	});
	addEvent(btnCancel,'click',function(){
		close();
		return false;
	});
	addEvent(cover,'click',function(){
		close();
	})
	addEvent(box,'click',function(e){stop(e);});

	var i=0;	
	function show(options){
		console.log(i);
		i++;
	}
	show.prototype={

	}	
	function zDialog(str,options){
		if(typeof str !== 'string'){
			throw new Error("typeError:understard the type of '"+ typeof str +"' in zDialog('type str,type object');");
		}else{
			var obj=document.querySelectorAll(str);
			if (typeof options !== 'underfind') for(var i=0,len=obj.length;i<len;i++) addEvent(obj[i],'click',function(){show(options);});
			else throw new Error("typeError:understard the type of '"+ typeof options +"' in zDialog('type str,type object');");
		}
	};
	zDialog.prototype.initStyle=function(options){
		if (hasPrototype(options.coverStyle)) for(var i in options.coverStyle) dialog.coverStyle[i]=options.coverStyle[i];
		if (hasPrototype(options.boxStyle)) for(var i in options.boxStyle) dialog.boxStyle[i]=options.boxStyle[i];
		if (hasPrototype(options.titleStyle)) for(var i in options.titleStyle) dialog.titleStyle[i]=options.titleStyle[i];
		if (hasPrototype(options.zStyle)) for(var i in options.zStyle) dialog.zStyle[i]=options.zStyle[i];
		if (hasPrototype(options.footerStyle)) for(var i in options.footerStyle) dialog.footerStyle[i]=options.footerStyle[i];
		if(hasPrototype(options.btnSureStyle)) for(var i in options.btnSureStyle) dialog.btnSureStyle[i]=options.btnSureStyle[i];
		if(hasPrototype(options.btnCancelStyle)) for(var i in options.btnCancelStyle) dialog.btnCancelStyle[i]=options.btnCancelStyle[i];
	}
	
	function overallStyle(){
		setStyle(cover,dialog.coverStyle);
		setStyle(box,dialog.boxStyle);
		setStyle(title,dialog.titleStyle);
		setStyle(z,dialog.zStyle);
		setStyle(footer,dialog.footerStyle);
		setStyle(btnSure,dialog.btnSureStyle);
		setStyle(btnCancel,dialog.btnCancelStyle);
		for (var i in dialog) {
			i=i.substring(0,-6);
			console.log(i);
		}
	}
	window.$z=function(str,options){
		return new zDialog(str,options);
	};
	$z.prototype.init=function(options){
		zDialog.prototype.initStyle(options);
	}
	$z.init=$z.prototype.init;
	$z.s=dialog;
}(window));
var a='312';
//console.log($z('body',{width:123,color:'red'}));
var av={x:1,b:{3:3}};
console.log(typeof av);
console.log($z)
$z.init({
	coverStyle:{
		backgroundColor:'red'	
	}
})
window.onload=function(){
	$z('.text1',{
		title:'警告！',
		z:'请不要再觉得她狠可爱。'
	});
	var i=4,b=i;
	b=5;
	console.log(i);


}