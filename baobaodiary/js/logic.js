var box2 = document.getElementById('div');
var con = document.getElementById('con');
var a = document.getElementsByClassName('onoff')[0];
var botSky = document.getElementsByClassName('botsky')[0];
var topSky = document.getElementsByClassName('topsky')[0];
var midSky = document.getElementsByClassName('midsky')[0];
//旋转出场动画
setTimeout(function() {
	box2.style.transform = 'scale(1) rotateY(360deg)';

}, 1500)
//开机关机按钮
var kai = true;
a.onclick = function() {
	if(kai) {
		con.style.display = 'block';
		setTimeout(function() {
			con.style.opacity = 1;
			con.style.transition = '1s';
		}, 100)
	} else {
		setTimeout(function() {
			con.style.opacity = 0;
			con.style.transition = '1s';
		}, 100)
		if(con.style.opacity == 0) {
			con.style.display = 'none';
		}

	}
	kai = !kai;
}

//滑动解锁
var slippping = document.getElementsByClassName('slippping')[0];
var p = slippping.getElementsByTagName('p')[0];
slippping.onmouseenter = function() {
	this.style.opacity = 0.9;
}
slippping.onmouseleave = function() {
	this.style.opacity = 0.3;
}
p.onmousedown = function(ev){
	ev.preventDefault();
	var oldX = ev.clientX;
	var temp = p.offsetLeft;
	slippping.onmousemove = function(ev) {
		var x = ev.clientX - oldX + temp;
		var maxX = slippping.clientWidth - p.offsetWidth-10;
		if(x < 0) {
			x = 0;
		}
		if(x > maxX) {
			x = maxX;
		}
		p.style.left = x + 'px';
		if(x > maxX/2){
			Mtween({
				el: topSky,
				target: {
				top:-26
				},
				time: 200,
				callBack:function(){
					topSky.style.zIndex = 40;
				}
			});
			
		}else{
			topSky.style.zIndex = 500;
			Mtween({
				el: topSky,
				target: {
				top:0
				},
				time: 200
			});
		}
		if(x == maxX){
			setTimeout(function(){
				Mtween({
					el: botSky,
					target: {
					bottom:-246
					},
					time: 2000
				});
				Mtween({
					el: topSky,
					target: {
					top:-246
					},
					time: 2000
				});
				Mtween({
					el: midSky,
					target: {
					top:-136
					},
					time: 2000
				});
			},500)
		}
	}
	document.onmouseup = function(ev) {
		slippping.onmousemove = document.onmouseup = null;
	}
}
