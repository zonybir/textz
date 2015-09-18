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
			fontSize:'18px',
			color:'#CCC',
			borderBottom:'1px solid #ccc',
			backgroundColor:'#eee',
			textAlign:'center',
			padding:'5px 10px'
	}
	setStyle(title,titleStyle);
	title.innerHTML='Title';
	box.appendChild(title);

	var z=d.createElement('div');
	var zStyle={
		fontSize:'16px',
		textAlign:'left',
		color:'#666',
		backgroundColor:'#ccc',
		padding:'10px 10px'
	}
	setStyle(z,zStyle);
	z.innerHTML='z tanchu kuang';
	box.appendChild(z);

	d.querySelectorAll('body')[0].appendChild(cover);
}(window));