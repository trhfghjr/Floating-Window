 /*拖拽图片*/
            var oImg=document.getElementById("pic1");


            var disX=0;
            var disY=0;//鼠标当前坐标
            var prevX=0;
            var prevY=0;
            var iSpeedX=0;
            var iSpeedY=0;
            var Timer=null;

            oImg.style.width=0;
            oImg.style.height=0;
            oImg.style.left=document.documentElement.clientWidth/2+'px';
            oImg.style.top=document.documentElement.clientHeight/2+'px';


            function Change(iTarget){//从屏幕中间弹出
                var offsetL=oImg.offsetLeft;
                var offsetT=oImg.offsetTop;


                var timer=setInterval(function(){
                    if (oImg.offsetWidth==iTarget){
                        clearInterval(timer);
                        startMove();
                    }else {
                        oImg.style.width=oImg.offsetWidth+10+'px';
                        oImg.style.height=oImg.offsetHeight+10+'px';
                        oImg.style.left=offsetL-oImg.offsetWidth/2+'px';
                        oImg.style.top=offsetT-oImg.offsetHeight/2+'px';




                    }
                },60);
            }
            Change(210);




            oImg.onmousedown=function(ev){
                var ev=ev||window.event;
                clearInterval(Timer);

                disX=ev.clientX-oImg.offsetLeft;
                disY=ev.clientY-oImg.offsetTop;

                prevX=ev.clientX;
                prevY=ev.clientY;


                document.onmousemove=function(){
                    //                  alert(1);
                    var ev=ev||window.event;
                    oImg.style.left=ev.clientX-disX+'px';
                    oImg.style.top=ev.clientY-disY+'px';

                    iSpeedX=ev.clientX-prevX;
                    iSpeedY=ev.clientY-prevY;//扔出时的速度

                    prevX=ev.clientX;
                    prevY=ev.clientY;

                    var oBox=document.createElement("div");
                    oBox.className='box';
                    oBox.style.left=ev.clientX+'px';
                    oBox.style.top=ev.clientY+'px';
                    document.body.appendChild(oBox);//创建速度点



                };//onmousemove
                document.onmouseup=function(){

                    document.onmousemove=null;
                    document.onmouseup=null;

                    startMove();
                };//onmouseup
                return false;
            };//onmousedown
            function startMove(){
                clearInterval(Timer);
                Timer= setInterval(function(){
                    iSpeedY+=3;
                    var L=oImg.offsetLeft+iSpeedX;
                    var T=oImg.offsetTop+iSpeedY;
                    if (L<0){
                        L=0;
                        iSpeedX*=-1;
                        iSpeedX*=0.75;
                    }
                    else if (L>document.documentElement.clientWidth-oImg.offsetWidth){
                        L=document.documentElement.clientWidth-oImg.offsetWidth;
                        iSpeedX*=-1;
                        iSpeedX*=0.75;
                    }//左右碰撞
                    if (T<0){
                        T=0;
                        iSpeedY*=-1;
                        iSpeedY*=0.75;

                    }
                    else if (T>document.documentElement.clientHeight-oImg.offsetHeight){
                        T=document.documentElement.clientHeight-oImg.offsetHeight;
                        iSpeedY*=-1;
                        iSpeedY*=0.75;
                        iSpeedX*=0.75;
                    }//上下碰撞
                    oImg.style.left=L+'px';
                    oImg.style.top=T+'px';
                },30);
            }
