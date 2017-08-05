var conlist = document.getElementsByClassName('conlist')[0];//上面 ul
var spans = conlist.getElementsByTagName('span');//上面时间容器
var conbot = document.getElementsByClassName('conbot')[0];//下面 ul
var spansTar = conbot.getElementsByTagName('span');//下时间容器
var strongs = conbot.getElementsByTagName('strong');//下时倒计时的strong容器
var contxt = document.getElementById("contxt");//内容容器
var memodetails = document.getElementsByClassName('memodetails')[0];
var btnPrev = memodetails.getElementsByTagName('span')[0];//返回上一页按钮
var btnEdi = document.getElementById("btnEdi");           //编辑按钮
/*------------------数据处理-----------------*/
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
/*------------------数据处理结束-----------------*/
var dateId = Number(location.search.split('=')[1]);
//找到符合dataid的数据
var Data = FindData(data,dateId);//目标数据所在数组（仅有一条）
console.log(Data)
/*-----------通过找到的数据  渲染本页------------*/
//渲染上下时间----分2种情况（1.之前 没设置目标时间，只有文字提示  len==1    2.有目标时间  len==3）
var len = Data[0].time.split('-').length; 
if(len==3){
	spans[0].innerHTML = spansTar[0].innerHTML = Data[0].time;
	spans[1].innerHTML = spansTar[1].innerHTML = Data[0].hours +':'+ Data[0].minutes;
	//设置目标时间
	var targetTime = new Date();
	var Y = spans[0].innerHTML.split('-')[0];//年
	var M = spans[0].innerHTML.split('-')[1];//月
	var D = spans[0].innerHTML.split('-')[2];//日
	var H = spans[1].innerHTML.split(':')[0]; //时
	var Mi = spans[1].innerHTML.split(':')[1]; //时
	
	targetTime.setFullYear(Y);
	targetTime.setMonth(M-1);
	targetTime.setDate(D);
	targetTime.setHours(H);
	targetTime.setMinutes(Mi);
	//console.log(targetTime)
	//计算剩余时间----------------------刘钊帮忙做
	var timer = null;
	timer = setInterval(function(){
		var New = new Date();
		//剩余时间
		var syTime = (targetTime - New)/1000;  
		if(syTime>0){
			var SyMonth = Math.floor(syTime/86400/30);             //月
			var SyDay =	Math.floor(syTime/86400);               //天
			var SyHour = Math.floor(syTime%86400/3600);		      //时
			var SyMin= Math.ceil(syTime%86400%3600/60);		          //分
			//换算
			strongs[0].innerHTML = SyMonth+'月';
			strongs[1].innerHTML = SyDay+'天';
			strongs[2].innerHTML = SyHour+'时';
			strongs[3].innerHTML = SyMin+'分';
			
		}else{
			strongs[0].innerHTML = '：时间已经到了';
			strongs[0].style.color = 'red';
		}
		
		
	},1000)

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
	strongs[0].innerHTML = '：之前没设置目标时间'
}


console.log()

//渲染内容
contxt.innerHTML = Data[0].con;
var date = spans[0].innerHTML;
//返回上一页按钮---跳转到列表页
btnPrev.onclick = function(){
	location.href = 'memoIndex.html?date='+date;
}
//点击编辑按钮---跳转到编辑页
var dataid = Data[0].id;
btnEdi.onclick = function(){
	location.href = 'MemoWrite.html?dataid='+dataid;
}




















//contxt内容渲染
/*contxt.innerHTML = data[0].con;*/
//上，下--时间赋值
/*var date = location.search.substring(6);//2018-11-11&12:42
var dateBefore = date.split('&')[0];
var dateAfter = date.split('&')[1];
spans[0].innerHTML = spansTar[0].innerHTML = dateBefore;
spans[1].innerHTML = spansTar[1].innerHTML = dateAfter;*/

    
//设置目标时间
/*var targetTime = new Date();
var Y = dateBefore.split('-')[0];//年
var M = dateBefore.split('-')[1];//月
var D = dateBefore.split('-')[2];//日
var H = dateAfter.split(':')[0]; //时
var Mi = dateAfter.split(':')[1]; //时
targetTime.setFullYear(Y);
targetTime.setMonth(M-1);
targetTime.setDate(D);
targetTime.setHours(H);
targetTime.setMinutes(Mi);*/
//计算剩余时间
/*var timer = null;
timer = setInterval(function(){
	var New = new Date();
	//剩余时间
 	//倒计时  计算不明白了 
	var syTime = (targetTime - New)/1000/60;  
	var SyMonth = Math.floor(syTime);             //月
	var SyDay =	Math.floor(syTime);               //天
	var SyHour = Math.floor(syTime);		  //时
	var SyMin= Math.ceil(syTime);		  //分
	
	strongs[0].innerHTML = SyMonth;
	strongs[1].innerHTML = SyDay;
	strongs[2].innerHTML = SyHour;
	strongs[3].innerHTML = SyMin;
},1000)*/
//点击编辑 ----跳转到编辑页
/*btnEdi.onclick = function(){
	location.href = 'memoWrite.html?date='+dateBefore;
}
*/