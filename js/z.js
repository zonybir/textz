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
			color:'#333',
			borderBottom:'1px solid #ccc',
			backgroundColor:'#8593B7',
			textAlign:'center',
			padding:'5px 10px'
	}
	setStyle(title,titleStyle);
	title.innerHTML='Title';
	box.appendChild(title);

	var z=d.createElement('div');
	var zStyle={
		fontSize:'14px',
		textAlign:'left',
		color:'#666',
		backgroundColor:'#fff',
		padding:'10px 15px'
	};
	setStyle(z,zStyle);
	z.innerHTML='我爱你，爱了整整一个曾经。再见！';
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
}(window));