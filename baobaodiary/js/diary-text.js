//后退
var rollback = document.getElementsByClassName('rollback')[0];
//保存
var save = document.getElementsByClassName('save')[0];
//心情天气
var mw = document.getElementsByClassName('mood_weather')[0];
//选择背景按钮
var bjchoose = document.getElementsByClassName('bjchoose')[0];
var bj = document.getElementsByClassName('bj')[0];
//选择字体样式按钮
var fontchoose = document.getElementsByClassName('fontchoose')[0];
//隐藏的天气心情选框
var wm = document.getElementsByClassName('wm')[0];
//心情图标
var mood = document.getElementsByClassName('mood')[0];
var moodImg = mood.getElementsByTagName('img')[0];
var bjPic = document.getElementsByClassName('bj-pic')[0];
var bjPicLis = bjPic.getElementsByTagName('li');
var bjPicSpan = bjPic.getElementsByTagName('span');
var main = document.getElementsByClassName('main')[0];
bjPicSpan[0].style.display = 'block';
// 天气按钮
var weather = document.getElementsByClassName('weather')[0];
var weatherImg = weather.getElementsByTagName('img')[0];
var md = document.getElementsByClassName('md')[0];
var mlis = md.getElementsByTagName('li');
var mspan = md.getElementsByTagName('span');
var wr = document.getElementsByClassName('wr')[0];
var wlis = wr.getElementsByTagName('li');
var wspan = wr.getElementsByTagName('span');
var zs = document.getElementsByClassName('zs')[0];
var fontchoose = document.getElementsByClassName('fontchoose')[0];
var font = document.getElementsByClassName('font')[0];
var zh = document.getElementsByClassName('zh')[0];
var zhLis = zh.getElementsByTagName('li');
var zhSpan = zh.getElementsByTagName('span');
var fontcolor = document.getElementsByClassName('fontcolor')[0];
var fontcolorL = fontcolor.getElementsByTagName('li');
var fontcolorS = fontcolor.getElementsByTagName('span');
var fontzs = document.getElementsByClassName('fontzs')[0];
var contxt = document.getElementsByClassName('contxt')[0];
var arrImg = ['../images/riji/furious.png', '../images/riji/cute.png', '../images/riji/funny.png', '../images/riji/happy.png', '../images/riji/sad.png'];
var warrImg = ['../images/riji/wr1.png', '../images/riji/wr2.png', '../images/riji/wr3.png', '../images/riji/wr4.png', '../images/riji/wr5.png', '../images/riji/wr6.png', '../images/riji/wr7.png', '../images/riji/wr8.png', '../images/riji/wr9.png', '../images/riji/wr10.png', '../images/riji/wr11.png', '../images/riji/wr12.png', '../images/riji/wr13.png', '../images/riji/wr14.png', '../images/riji/wr15.png', '../images/riji/wr16.png'];
var arrBj = ['../images/riji/ys3.png', '../images/riji/ys1.png', '../images/riji/ys2.png', '../images/riji/ys4.png'];
main.style.background = 'url(' + arrBj[0] + ')';
var arrFont = ['12px', '14px', '16px', '18px', '20px'];
var arrColor = ['#2b2b2b', '#fff', '#f0b6c7', '#b63432', '#a0a0a0'];
moodImg.src = arrImg[1];
weatherImg.src = warrImg[0];
//点击出现选择心情天气界面
//获取心情界面取消按钮
var cancel = document.getElementsByClassName('cancel')[0];
//获取心情界面确定按钮
var ok = document.getElementsByClassName('ok')[0];
mw.onclick = function() {
    wm.style.display = 'block';
    Mtween({
    	el:wm,
    	target:{left:0},
    	time:150
    })
    //获取心情ul和li
    for (var i = 0; i < mlis.length; i++) {
        mspan[i].style.display = 'none';
    }
    mspan[1].style.display = 'block';
    for (var i = 0; i < mlis.length; i++) {
        mlis[i].index = i;
        //点每个表情
        mlis[i].onclick = function() {
            for (var i = 0; i < mlis.length; i++) {
                mspan[i].style.display = 'none';
            }
            mspan[this.index].style.display = 'block';
        }
    }
    for (var i = 0; i < wlis.length; i++) {
        wspan[i].style.display = 'none';
    }
    wspan[0].style.display = 'block';
    for (var i = 0; i < wlis.length; i++) {
        wlis[i].index = i;
        wlis[i].onclick = function() {
            for (var i = 0; i < wlis.length; i++) {
                wspan[i].style.display = 'none';
            }
            wspan[this.index].style.display = 'block';
        }
    }
    //点击取消按钮
    cancel.onclick = function() {
    	Mtween({
    	el:wm,
    	target:{left:402},
    	time:150,
    	callBack:function(){
    		wm.style.display = 'none';
    	}
    })
            
        }
        //点击确定
    ok.onclick = function() {
        for (var i = 0; i < mlis.length; i++) {
            if (mspan[i].style.display == 'block') {
                var mspanImg = arrImg[i];
            }
        }
        for (var i = 0; i < wlis.length; i++) {
            if (wspan[i].style.display == 'block') {
                var wspanImg = warrImg[i];
            }
        }
        Mtween({
	    	el:wm,
	    	target:{left:402},
	    	time:150,
	    	callBack:function(){
	    		wm.style.display = 'none';
	    	}
    	})
        moodImg.src = mspanImg;
        weatherImg.src = wspanImg;
    }
}
bjchoose.onclick = function() {
    bj.style.display = 'block';
    Mtween({
    	el:bj,
    	target:{bottom:0},
    	time:150
    })
    for (var i = 0; i < bjPicLis.length; i++) {
        bjPicLis[i].index = i;
        bjPicLis[i].onclick = function() {
            for (var i = 0; i < bjPicLis.length; i++) {
                bjPicSpan[i].style.display = '';
            }
            bjPicSpan[this.index].style.display = 'block';
            main.style.background = 'url(' + arrBj[this.index] + ')';
        }
    }
}
zs.onclick = function() {
	Mtween({
    	el:bj,
    	target:{bottom:-152},
    	time:150,
    	callBack:function(){
    		bj.style.display = 'none';
    	}
    })
    
}
fontchoose.onclick = function() {
    font.style.display = 'block';
    Mtween({
    	el:font,
    	target:{bottom:0},
    	time:150
    })
    for (var i = 0; i < zhLis.length; i++) {
        zhLis[i].index = i + 1;
        zhLis[i].onclick = function() {
            for (var i = 0; i < zhLis.length; i++) {
                zhSpan[i + 1].style.display = '';
            }
            zhSpan[this.index].style.display = 'block';
            contxt.style.fontSize = arrFont[this.index - 1];
        }
    }
    for (var i = 1; i < fontcolorL.length; i++) {
        fontcolorL[i].index = i + 1;
        fontcolorL[i].onclick = function() {
            for (var i = 1; i < fontcolorL.length; i++) {
                fontcolorS[i + 1].style.display = '';
            }
            fontcolorS[this.index].style.display = 'block';
            contxt.style.color = arrColor[this.index - 1];
        }
    }
}
fontzs.onclick = function() {
    Mtween({
    	el:font,
    	target:{bottom:-134},
    	time:150,
    	callBack:function(){
    		font.style.display = 'none';
    	}
    })
};
// document.cookie = "name=yes"
//// 获取用户点击的日期
//var Search = location.search;
// var time = new Date();
//var year = time.getFullYear();
//var month = time.getMonth()+1;
//var day = time.getDate();
//var hours = time.getHours();
//var minutes = time.getMinutes();
//var Time = Search?Search.split('=')[1]:year+'-'+month+'-'+day+' '+hours+':'+minutes;
//var p = document.getElementsByClassName('txt')[0].getElementsByTagName('p')[0];
//p.innerHTML = Time;
var STORAGE_KEY = 'riji-data';
var data = storage.fetch(STORAGE_KEY);
console.log(data)
save.onclick = function() {
	var title = document.getElementsByClassName('title')[0];
    var txtarea = document.getElementsByTagName('textarea')[0];
    var p = document.getElementsByClassName('txt')[0].getElementsByTagName('p')[0];
	if(title.value!=''&&title.value!='点击添加标题'&&txtarea.value!=''){
		var js = {
			time:p.innerHTML,
			title:title.value,
			content:txtarea.value,
			face:moodImg.src,
			wather:weatherImg.src
        };
        data.push(js);
		storage.save(data,STORAGE_KEY);
		
		window.location.href = 'diaryhomepage.html';
	}
    
}
//返回按钮
rollback.onclick = function() {
    if(contxt.value != ''){
        // alert('您要保存所做的修改吗?')
    }else{
        window.location.href = 'diaryhomepage.html';
    }
    
}
var title = document.getElementsByClassName('title')[0];
title.onfocus = function(){
	this.value = '';
}
