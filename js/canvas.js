window.onload=function(){
    var canvas=document.getElementById('text');
    var context=canvas.getContext('2d');
     context.fillStyle='#666';//填充的样式

    context.strokeStyle='red';//边框样式

    context.lineWidth=1;//图形边框宽度
     //绘制矩形 context.fillRect(x,y,width,height) strokeRect(x,y,width,height)
    //x:矩形起点横坐标（坐标原点为canvas的左上角，当然确切的来说是原始原点，后面写到变形的时候你就懂了，现在暂时不用关系）
    //y:矩形起点纵坐标   width:矩形长度    height:矩形高度
    context.fillRect(0,0,50,50);//填充的矩形
    context.strokeRect(70, 0, 50, 50);//空心的矩形
    context.fillStyle='rgba(23,23,23,0.5)';
    context.fillRect(35,60,50,50);
            
            //清除矩形区域 context.clearRect(x,y,width,height)
            //x:清除矩形起点横坐标           y:清除矩形起点纵坐标             width:清除矩形长度            height:清除矩形高度
            context.clearRect(40,25,40,40);

            //圆弧context.arc(x, y, radius, starAngle,endAngle, anticlockwise)
            //x:圆心的x坐标              y:圆心的y坐标            straAngle:开始角度              endAngle:结束角度               anticlockwise:是否逆时针（true）为逆时针，(false)为顺时针
            //ps：经过试验证明书本上ture是顺时针，false是逆时针是错误的，而且无论是逆时针还是顺时针，角度都沿着顺时针扩大
            context.fillStyle='rgba(255,0,0,0.8)';
            context.beginPath();
            context.arc(60,45,20,0, Math.PI * 2,true);
            context.closePath();
                context.fill();
                //context.stroke(); 绘制边框的
                 /*得出的结论有：*号为重点
                1、系统默认在绘制第一个路径的开始点为beginPath
                *2、如果画完前面的路径没有重新指定beginPath，那么画第其他路径的时候会将前面最近指定的beginPath后的全部路径重新绘制
                3、每次调用context.fill（）的时候会自动把当次绘制的路径的开始点和结束点相连，接着填充封闭的部分
                ps：书本的结论是 如果没有closePath那么前面的路劲会保留，实验证明正确的结论是 如果没有重新beginPath那么前面的路劲会保留
                ps1：如果你真心凌乱了，那么记住每次画路径都在前后加context.beginPath() 和context.closePath()就行*/

                 //绘制线段 context.moveTo(x,y) context.lineTo(x,y)
                //x:x坐标                 y:y坐标
                /*每次画线都从moveTo的点到lineTo的点，
                如果没有moveTo那么第一次lineTo的效果和moveTo一样，
                每次lineTo后如果没有moveTo，那么下次lineTo的开始点为前一次lineTo的结束点*/

                context.strokeStyle='rgba(0,255,0,0.6)';
                context.fillStyle='rgba(0,0,255,0.2)';
                context.beginPath();
                context.lineTo(0,0);
                context.lineTo(120,0);
                context.lineTo(60,55);
                context.lineTo(120,110);
                context.lineTo(0,110);
                context.lineTo(0,0);
                context.closePath();
                context.fill();
                context.stroke();

             context.strokeStyle='red';
             context.beginPath();
             context.moveTo(100,100);
             context.moveTo(100,200);


             //绘制贝塞尔曲线（贝济埃、bezier） context.bezierCurveTo(cp1x,cp1y,cp2x,cp2y,x,y)             
             //cp1x:第一个控制点x坐标            cp1y:第一个控制点y坐标            cp2x:第二个控制点x坐标            cp2y:第二个控制点y坐标             x:终点x坐标             y:终点y坐标
             
             context.moveTo(0,0);
             context.bezierCurveTo(10,200,50,0,200,50);
             context.stroke();
             context.strokeStyle='rgba(75,45,120,0.3)';
            //绘制二次样条曲线 context.quadraticCurveTo(qcpx,qcpy,qx,qy)
             //qcpx:二次样条曲线控制点x坐标            qcpy:二次样条曲线控制点y坐标            qx:二次样条曲线终点x坐标            qy:二次样条曲线终点y坐标
            
             context.moveTo(0,0);
             context.quadraticCurveTo(220,200,200,0);
             context.stroke();
              context.strokeStyle='rgba(200,180,20,0.4)';

              //线性渐变 var lg= context.createLinearGradient(xStart,yStart,xEnd,yEnd)
              //线性渐变颜色lg.addColorStop(offset,color)
             // xstart:渐变开始点x坐标             ystart:渐变开始点y坐标             xEnd:渐变结束点x坐标             yEnd:渐变结束点y坐标             offset:设定的颜色离渐变结束点的偏移量(0~1)             color:绘制时要使用的颜色

             var lg=context.createLinearGradient(0,0,0,50);
             lg.addColorStop(0,'rgb(255,0,0)');
             lg.addColorStop(0.5,'rgb(0,255,2)');
             lg.addColorStop(1,'rgb(0,0,255)');
             context.fillStyle=lg;
             context.fillRect(230,0,50,50);
             context.stroke();
             context.closePath();
             //context.fill();


             context.strokeStyle='rgba(255,0,0,0.5)';
             context.moveTo(230,65);

             context.bezierCurveTo(200,30,210,100,230,110);
             context.stroke();
             
             //context.rotate(Math.PI/4);
             context.moveTo(230,65);
             context.bezierCurveTo(260,30,250,100,230,110);
             context.stroke();



}