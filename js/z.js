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
	var d=document;
	function tk(obj){
		if (typeof obj === 'string'){

		}else{

		}
	}
	var cover=d.createElement('div');
	var coverStyle={
		position:'fixed',
		width:'100%',
		height:'100%',
		zIndex:999,
		backgroundColor:'rgba(0,0,0,.6)',
		top:'0px'
	};
	function setStyle(ele,style){
			for (var i in style){
				ele.style[i]=style[i];
			}
	}
	setStyle(cover,coverStyle);
	
	var box=d.createElement('div');
	var boxStyle={
			width:'200px',
			backgroundColor:'#fff',
			margin:'0 auto',
			top:'10%',
			position:'relative'
	}
	setStyle(box,boxStyle);
	cover.appendChild(box);

	var title=d.createElement('div');
	var titleStyle={
			fontSize:'16px',
			color:'#fff',
			borderBottom:'1px solid #ccc',
			backgroundColor:'#8593B7',
			textAlign:'center',
			padding:'5px 10px'
	}
	setStyle(title,titleStyle);
	title.innerHTML='提示';
	box.appendChild(title);

	var z=d.createElement('div');
	var zStyle={
		fontSize:'14px',
		textAlign:'left',
		color:'#666',
		backgroundColor:'#fff',
		padding:'10px 15px',
		maxHeight:'221px',
		overflow:'auto'
	};
	setStyle(z,zStyle);
	var str='我多想回到家乡，再回到她的身旁。让她的温柔善良，来抚慰我的心伤。'
	/*for (var i=0;i<5;i++){
		str+=str;
	}*/
	z.innerHTML=str;
	box.appendChild(z);

	var footer=d.createElement('div');
	var footerStyle={
		padding:'5px 5px',
		backgroundColor:'#D2D2D2',
		color:'#333',
		fontSize:'16px',
		//position:'relative'
		textAlign:'right'
	};
	var btnSure=d.createElement('span');
	var btnStyle={
		//display:'block',
		width:'40px',
		padding:'2px 10px',
		//position:'absolute',
		color:'#fff',
		backgroundColor:'#8593B7',
		textAlign:'center',
		cursor:'pointer',
		fontSize:'14px',
		borderRadius:'5px',

	};
	var btnCancel=d.createElement('span');
	var btnCancelStyle={
		//'float':'right',
		marginRight:'10px'

	};
	var btnSureStyle={
		marginRight:'5px'
	};
	setStyle(footer,footerStyle);
	setStyle(btnSure,btnStyle);
	setStyle(btnSure,btnSureStyle);
	setStyle(btnCancel,btnStyle);
	setStyle(btnCancel,btnCancelStyle);
	
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
		if (hasPrototype(options.coverStyle)) setStyle(cover,options.coverStyle);
		if (hasPrototype(options.boxStyle)) setStyle(box,options.boxStyle);
		if (hasPrototype(options.titleStyle)) setStyle(title,options.titleStyle);
		if (hasPrototype(options.zStyle)) setStyle(z,options.zStyle);
		if (hasPrototype(options.footerStyle)) setStyle(footer,options.footerStyle);
	}
	window.$z=zDialog;
}(window));
var a='312';
//console.log($z('body',{width:123,color:'red'}));
var av={x:1,b:{3:3}};
console.log(typeof av);
window.onload=function(){
	$z('.text1',{
		title:'警告！',
		z:'请不要再觉得她狠可爱。'
	})
}