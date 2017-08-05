var sun = document.getElementsByClassName('quan-sun')[0];
//太阳旋转
var n = 0;
setInterval(function() {
		n++;
		Mtween({
			el: sun,
			target: {
				rotate:n*360
			},
			time: 5000
		})
}, 5000)
//热气球
var reqiqiu = document.getElementsByClassName('sy-rqq')[0];
var on = true;
setInterval(function() {
	if(on) {
		Mtween({
			el: reqiqiu,
			target: {
				top: -20
			},
			time: 1300
		})
	} else {
		Mtween({
			el: reqiqiu,
			target: {
				top: 0
			},
			time: 1300
		})
	}
	on = !on;
}, 1300)
//首页日期获取当前日期
var syDate = document.getElementsByClassName('sy-date')[0];
var date = new Date();
var str = '';
var year = date.getFullYear();
var month = date.getMonth()+1;
var day = date.getDate();
str = year +'.'+month +'.'+day;
syDate.innerHTML = str;
//点击每一项跳转到相应页面
var cut = document.getElementsByClassName('sy-items')[0];
var dls = cut.getElementsByTagName('dl');
var items = cut.getElementsByTagName('dt');
for(var i=0;i<dls.length;i++){
	dls[i].index = i;
	dls[i].onmouseenter = function(){
		this.style.cursor = 'pointer';
	}
	dls[i].onclick = function(){
		switch(this.index){
			case 0:
			location.href = 'diaryhomepage.html';
			break;
			case 1:
			location.href = 'homePage.html';
			break;
			case 2:
			location.href = 'keep_accounts_list.html';
			break;
			default:
			location.href = 'memoIndex.html';
		}
	}
}
for(var i=0;i<items.length;i++){
	items[i].onmouseenter = function(){
		this.style.backgroundPositionY = '44px';
		this.style.transition = '500ms';
	}
	items[i].onmouseout = function(){
		this.style.backgroundPositionY = '0';
		this.style.transition = '500ms';
	}
}
//首页兔子下面的选项
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();
var hours = date.getHours();
var minutes = date.getMinutes();
var time = year+'-'+month+'-'+day+' '+hours+':'+minutes;
var lis = document.getElementsByTagName('li');
for(var i=0;i<lis.length;i++){
	lis[i].index = i;
	lis[i].onmouseenter = function(){
		this.style.cursor = 'pointer';
	}
	lis[i].onclick = function(){
		switch(this.index){
			case 0:
			location.href = 'diary-text.html?time='+time;
			break;
			case 1:
			location.href = 'keep_accounts_add.html?time='+time;
			break;
			default:
			location.href = 'memoWrite.html?time='+time;	
		}
	}
}

