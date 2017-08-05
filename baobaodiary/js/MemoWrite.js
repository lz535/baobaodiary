var contxt = document.getElementById("contxt");//textarea
var conlist = document.getElementsByClassName('conlist')[0];
var memoCon = document.getElementsByClassName('memodetailscon')[0];//大背景容器
var spans = conlist.getElementsByTagName('span'); //当前日期容器
var btnStyle = document.getElementById("btnStyle"); //设置样式按钮
var btnTime = document.getElementById("btnTime"); //设置时间按钮
var styleCon = document.getElementsByClassName('setstyle')[0]; //样式容器
var styleLis = styleCon.getElementsByTagName('li'); //样式li
var timeCon = document.getElementsByClassName('settime')[0];   //时间容器
var btnTime = document.getElementById("btnTime");//闹钟容器
var spansTar = btnTime.getElementsByTagName('span');  //目标时间2个  span容器
var confirm = document.getElementById("confirm");//确定按钮
var inpY = document.getElementById("inpY");  //弹出框   年
var inpM = document.getElementById("inpM");  //弹出框   月
var inpD = document.getElementById("inpD");  //弹出框   日
var inpH = document.getElementById("inpH");  //弹出框   时
var inpMi = document.getElementById("inpMi");//弹出框   分
var memodetails = document.getElementsByClassName("memodetails")[0];//返回上一页按钮
var btnPrev = memodetails.getElementsByTagName('span')[0];
var btnRight = document.getElementById("btnRight");

//数据处理
var STORAGE_KEY = 'memo-book-1.0'
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
//点击textarea--清空
contxt.onclick = function(){ 
	this.innerHTML = '';
}

//点击设置背景图的按钮-------背景数组
var arrImgs = ['url(../images/bg1.png)','url(../images/bg2.png)','url(../images/bg3.png)','url(../images/bg4.png)','url(../images/bg5.png)','url(../images/bg6.png)','url(../images/bg7.png)','url(../images/bg8.png)'];
btnStyle.onclick = function(){
	styleCon.style.display = 'block';
}
for(var i=0;i<styleLis.length;i++){
	styleLis[i].index = i;
	styleLis[i].onclick = function(){
		for (var i=0;i<styleLis.length;i++ ) {
			styleLis[i].firstElementChild.style.display = 'none';
		}
		this.firstElementChild.style.display = 'block';
		memoCon.style.background = arrImgs[this.index];
		styleCon.style.display = 'none';
	}
}


//write页面的跳转来源有两个，根据这两个不同来源
/*------------------------跳转来源一：从闹钟-日记本跳转过来-----------------------------------*/
var maxId = maxId(data);
//判断跳转来源
var searchNow = location.search.split('=')[0].substring(1);//date或者dataid
if(searchNow == 'dataid'){   //从列表页的li--预览页传来
	console.log(1)
	dateId = Number(location.search.split('=')[1]);
	//找到符合dateid的数据
	var Data = FindData(data,dateId)[0];
	//渲染页面
	//渲染上下时间-----分2种情况（1.之前 没设置目标时间，只有文字提示  len==1    2.有目标时间  len==3）
	var len = Data.time.split('-').length; 
	if(len==3){
		spans[0].innerHTML = spansTar[0].innerHTML = Data.time;
		spans[1].innerHTML = spansTar[1].innerHTML = Data.hours +':'+ Data.minutes;
	}else{
		//之前没设置目标时间---无法计算剩余时间
		var New = new Date();
		var nowY = New.getFullYear();
		var nowM = New.getMonth()+1;
		var nowD = New.getDate();
		var nowH = New.getHours();
		var nowMi = New.getMinutes();
		console.log(nowY,nowM)
		spans[0].innerHTML = spansTar[0].innerHTML = nowY+'-'+nowM+'-'+nowD;
		spans[1].innerHTML = spansTar[1].innerHTML = nowH+':'+nowMi;
	}
	
	//渲染内容
	contxt.innerHTML = Data.con;
	var date = spans[0].innerHTML;
	//渲染页面完成---------------------------------------
	
}else{
	console.log(2)
	//渲染页面完成---------------------------------------
	//获取search
	var date = location.search.split('=')[1];
	//设置当前时间
	var New = new Date();
	var NewH = New.getHours()     //时
	var NewMi = New.getMinutes(); //分
	spans[0].innerHTML = date;
	spans[1].innerHTML = two(NewH)+':'+two(NewMi);
	//为下面的闹钟 设置默认时间
	spansTar[0].innerHTML = spans[0].innerHTML;
	spansTar[1].innerHTML = spans[1].innerHTML;
}
	//默认de时间  
	var oldY = spans[0].innerHTML.split('-')[0];
	var oldM = spans[0].innerHTML.split('-')[1];
	var oldD = parseFloat(spans[0].innerHTML.split('-')[2]);
	var oldH = spans[1].innerHTML.split(':')[0];
	var oldMi = spans[1].innerHTML.split(':')[1];
	//点击设置时间的按钮
	btnTime.onclick = function(){
		timeCon.style.display = 'block';
		//设置默认input框默认的value
		inpY.value = oldY;
		inpM.value = oldM;
		inpD.value = oldD;
		inpH.value = oldH;
		inpMi.value = oldMi;
	}
	
	//点击确定按钮---设置时间
	confirm.onclick = function(){
		spansTar[0].innerHTML = inpY.value+'-'+two(inpM.value)+'-'+two(inpD.value);
		spansTar[1].innerHTML = two(inpH.value)+':'+two(inpMi.value);
		timeCon.style.display = 'none';
		spans[0].innerHTML = inpY.value+'-'+two(inpM.value)+'-'+two(inpD.value);
		spans[1].innerHTML = two(inpH.value)+':'+two(inpMi.value);
		//清空input框
		inpY.value = inpM.value = inpD.value = inpH.value = inpMi.value = '';
	}
	
	//点击右上角的√按钮
	btnRight.onclick = function(){
		if(searchNow == 'dataid'){
			//修改原来的数据---id不变
			var dateId = Number(location.search.split('=')[1]);
			var DataNow = []; //当前编辑的一条数据
			data.forEach(function(a){
				if(a.id==dateId){
					DataNow.push(a);
				}
			})
			DataNow[0].time = spans[0].innerHTML;
			DataNow[0].hours = spans[1].innerHTML.split(':')[0];
			DataNow[0].minutes = spans[1].innerHTML.split(':')[1];
			DataNow[0].con = contxt.value;
			console.log(data)
			//调用save
			storage.save(data, STORAGE_KEY);
			
			//跳转页面---跳到列表页
			location.href = 'memoIndex.html?dataid='+dateId;
		}else{
			///新编辑的内容  存入数据 -------数据存储的问题
			var j = {
				id:++maxId,
				time:spans[0].innerHTML,
				hours:spans[1].innerHTML.split(':')[0],
				minutes:spans[1].innerHTML.split(':')[1],
				con:contxt.value
			}
			data.unshift(j);
			console.log(data);
			//调用save
			storage.save(data, STORAGE_KEY);
			//跳转页面---跳到列表页
			location.href = 'memoIndex.html?date='+date;
			}
	}
 //点击左上角--返回上一页按钮
 btnPrev.onclick = function(){
 	location.href = 'memoIndex.html';
 }



