var conUl = document.getElementById("conUl");  //createLi的父盒子ul
var btnOk = document.getElementsByClassName('bw-ok')[0];   //对勾
var btnClock = document.getElementsByClassName('bw-clock')[0];   //时钟按钮
var btnPage = document.getElementsByClassName('bw-pages')[0];   //选择模板按钮
var textcon = document.getElementsByTagName('textarea')[0];//textarea
var btnDel = document.getElementsByClassName('del')[0];//删除按钮
var lis = conUl.getElementsByTagName('li');   //所有li列表
var aChecks = conUl.querySelectorAll('.check');  //所有check单选框
var botOprate = document.getElementById("botOprate"); //底部弹出的操作条
var btnChooseall = document.getElementById("chooseAll"); //全选
var btnDelete = document.getElementById("delete"); //删除
//点击√  生成新li和新数据
		// 获取传过来的日期
        var date = location.search.split('=')[1];
        console.log(date);

        var STORAGE_KEY = 'memo-book-1.0';

        // 先从本地存储里取数据
        var localStorageData = storage.fetch(STORAGE_KEY);
        // 如果本地存储没有数据, 则存入mock(模拟)的数据
        if (!localStorageData || !localStorageData.length) {
            storage.save(memoData, STORAGE_KEY);
        } else {
            // 如果本地存储有, 则覆盖 mock(模拟) 数据
            memoData = localStorageData;
        }

        var data = memoData;

var j = {};
var maxId = maxId(data);
btnOk.onclick = function(){
		//点击√生成的数据j，时间日期为当前的
		var New = new Date();
		var nowY = New.getFullYear();
		var nowM = New.getMonth()+1;
		var nowD = New.getDate();
		var nowH = New.getHours();
		var nowMi = New.getMinutes();
		console.log(nowY,nowM)
		var val = textcon.value;//con
		//val 不能为空
		if(val){
			j = {
			id:++maxId,
			/*time:nowY+'-'+nowM+'-'+nowD,
			hours:String(nowH),
			minutes:String(nowMi),*/
			time:'您还设置目标时间哟(双击去设置~)',
			hours:'',
			minutes:'',
			con:val
		}
		data.unshift(j);
		//调用save
		storage.save(data, STORAGE_KEY);
		console.log(data);
		//清空ul
		conUl.innerHTML = '';
		//重新渲染所有数据---包括新增的
		data.forEach(function(a){
			createLi(a)
		})
	}
	
	//问题：  数据存储的问题
	//console.log(data)
}

//点击时钟按钮或者选择模板按钮
btnClock.onclick = btnPage.onclick = function(){
	location.href = 'memoWrite.html?date=' + date;
}

//渲染数据
function createLi(j){   //参数：j 一条数据，
	var li = document.createElement('li');
	conUl.appendChild(li);
	li.setAttribute('dataid', j.id);
	//获取当前时间
	var New = new Date();
	var NewY = New.getFullYear(); //年
	var NewM = New.getMonth()+1;    //月
	var NewD = New.getDate();     //日
	var NewH = New.getHours()     //时
	var NewMi = New.getMinutes(); //分
	//j.time  j.hours  j.minutes都是目标时间
	function str(str){
		if(str.length > 18){
			return str.substring(0,18)+'...';
		}else{
			return str;
		}
	}
	li.innerHTML =  '<p class="bw-now-date">'+NewY+'-'+two(String(NewM))+'-'+two(String(NewD))+'&nbsp;&nbsp;'+two(String(NewH))+':'+two(String(NewMi))+'</p><p class="bw-text">'+str(j.con)+'</p><p class="bw-future-date">'+j.time+'&nbsp;&nbsp;'+two(j.hours)+':'+two(j.minutes)+'</p><span></span><a href="javascript:;" class="check"></a>';
	
	//双击每条数据 ---进入编辑页面
	li.ondblclick = function(){
		location.href = 'memoDetails.html?dataid=' + j.id;
		
	}
}
//创建每条数据
data.forEach(function(a){
	createLi(a)
})

//删除按钮
btnDel.onOff = true;
btnDel.onclick = function(){
	var aChecks = conUl.getElementsByClassName('check');  //所有check单选框
	if(this.onOff){
		this.style.background = 'none';
		this.innerHTML = '取消';
		botOprate.style.display = 'block';
		Mtween({
			el:botOprate,
			target:{
				bottom:0
			},
			time:200
		})
		
		for(var i=0;i<lis.length;i++){
			aChecks[i].style.background = 'url(../images/checked.png)';
			//setTimeout(function(i){
				aChecks[i].style.left = '-27px';
				aChecks[i].style.transition = '200ms';
			//},i*30,i)
		}
	}else{
		this.style.background = 'url(../images/del.png) no-repeat';
		this.innerHTML = '';
		Mtween({
			el:botOprate,
			target:{
				bottom:-50
			},
			time:200,
			callBack:function(){
				botOprate.style.display = 'none';
			}
		})
		
		for(var i=0;i<lis.length;i++){
			//setTimeout(function(i){
//				Mtween({
//					el:aChecks[n],
//					target:{left:-80},
//					time:200,
//					callBack:function(){
//						console.log(n)
						aChecks[i].style.left = '-80px';
					aChecks[i].style.transition = '200ms';
					setTimeout(function(i){
						aChecks[i].style.background = 'none';
					},200,i)
						
//					}
//				})
			//},i*30,i)
		}
	}
	this.onOff = !this.onOff;
	//一个个手动单选---获取最新的
	for(var i=0;i<aChecks.length;i++){
		aChecks[i].onOff = false;
		aChecks[i].onclick = function(){
			console.log(this.onOff)
			if(this.onOff){
				this.style.background = 'url(../images/checked.png)';
				this.onOff = false;
			}else{
				this.style.background = 'url(../images/checked2.png)';
				this.onOff = true;
			}
		}
	}
}

//点击底部 --全选按钮
btnChooseall.onclick = function(){
	var aChecks = conUl.getElementsByClassName('check');  //所有check单选框
	for(var i=0;i<aChecks.length;i++){
		aChecks[i].style.background = 'url(../images/checked2.png)';
		aChecks[i].onOff = true;
	}
}
//点击底部 ---删除按钮
btnDelete.onclick = function(){
	var aChecks = conUl.getElementsByClassName('check');  //所有check单选框
	for(var i=0;i<aChecks.length;i++){
		if(aChecks[i].onOff){
			conUl.removeChild(lis[i]);      //删除结构
			data.splice(i, 1);
			storage.save(data, STORAGE_KEY);
			i--;
		}
	}
}

var searchNow= location.search.split('=')[0].substring(1);
var dataId = location.search.split('=')[1];
if(searchNow = 'dataid'){
	var New = new Date();
	var NewY = New.getFullYear();
	var NewM = New.getMonth()+1;
	var NewD = New.getDate();
	var date = NewY +'-'+ NewM +'-'+ NewD;
	//点击时钟按钮或者选择模板按钮
	btnClock.onclick = btnPage.onclick = function(){
		location.href = 'memoWrite.html?date=' + date;
	}
}
var fanhui = document.getElementsByClassName('fanhui')[0];
fanhui.onclick = function(){
	location.href = 'home.html';
}
