var week = document.getElementsByClassName('week')[0];
var add = document.getElementById('add');
var shadow = document.getElementsByClassName('shadow')[0];
var icons = document.getElementsByClassName('icons')[0];
var active = document.getElementsByClassName('active')[0];
var xjt = document.getElementById('xjt');
var choicedate = document.getElementsByClassName('choicedate')[0];
var Year = document.getElementById('Year');
var Month = document.getElementById('Month');
var DatE = document.getElementById('Date');
var sure = document.getElementsByClassName('sure')[0];
var no = document.getElementsByClassName('no')[0];
var lis = week.getElementsByTagName('li');
var Box = document.getElementsByClassName('Box');
//日期对象
var date = new Date();
var chooseDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
// 获取记账按钮
var keepAccountsBtn = document.getElementById('keepAccountsBtn');
keepAccountsBtn.onclick = function() {
	location.href = 'keep_accounts_list.html?date=' + chooseDate;
};
var rijiBtn = document.getElementById('rijiBtn');
rijiBtn.onclick = function() {
	location.href = 'diary-text.html?date=' + chooseDate;
};
var beiwangBtn = document.getElementById('beiwangBtn');
beiwangBtn.onclick = function() {
	location.href = 'memoIndex.html?date=' + chooseDate;
};
//年
var selectedYear = date.getFullYear();
//月
var selectedMonth = date.getMonth() + 1;
xjt.innerHTML = selectedYear+'年'+selectedMonth+'月<img src="../images/xiajiantou.png" class="xiajiantou"/>';
//天
var nowDate = date.getDate();
//阴历需要用到的变量
var CalendarData = new Array(100);
var madd = new Array(12);
var tgString = "甲乙丙丁戊己庚辛壬癸";
var dzString = "子丑寅卯辰巳午未申酉戌亥";
var numString = "一二三四五六七八九十";
var monString = "正二三四五六七八九十冬腊";
var weekString = "日一二三四五六";
var sx = "鼠牛虎兔龙蛇马羊猴鸡狗猪";
var cYear, cMonth, cDay, TheDate;
CalendarData = new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95);
madd[0] = 0;
madd[1] = 31;
madd[2] = 59;
madd[3] = 90;
madd[4] = 120;
madd[5] = 151;
madd[6] = 181;
madd[7] = 212;
madd[8] = 243;
madd[9] = 273;
madd[10] = 304;
madd[11] = 334;
//生成日期
setCalendar(selectedYear, selectedMonth);
add.onclick = function() {
	shadow.style.display = 'block';
	icons.style.display = 'block';
	active.style.display = 'block';
}
active.onclick = function(){
	shadow.style.display = 'none';
	icons.style.display = 'none';
	active.style.display = 'none';
}
var CArr = colorArr();
//点击日期变色
for(var i = 0; i < lis.length; i++) {
	var BoxDiv = Box[i].getElementsByTagName('div');
	BoxDiv[1].style.background = CArr[0];
	BoxDiv[2].style.background = CArr[0];
	BoxDiv[4].style.background = CArr[1];
	BoxDiv[5].style.background = CArr[2];
	week.style.background = CArr[0];
	setTimeout(function(i) {
		Mtween({
			el: Box[i],
			target: {
				rotateY: 110
			},
			time: 330,
			callBack: function() {
				Mtween({
					el: Box[i],
					target: {
						rotateY: 90
					},
					time: 300
				})
			}
		})
	}, i * 20, i)
	lis[i].index = i;
	lis[i].onclick = function() {
		var Div = Box[this.index].getElementsByTagName('div')[1];
		for(var i = 0; i < lis.length; i++) {
			var DivB = Box[i].getElementsByTagName('div')[1];
			DivB.style.background = '';
		}
		Div.style.background = '#f6f7c6';
		var day = this.getElementsByTagName('i')[0].innerText;
		var year = selectedYear;
		var month = selectedMonth;
		chooseDate = year + '-' + month + '-' + day;
	}
}
for(var i = 0; i < Box.length; i++) {
	var BoxD = Box[i].getElementsByTagName('div')[1];
	if(BoxD.classList.contains('thisday')) {
		BoxD.style.background = '#3cc5bc';
	}
}
//设置年，月，日
xjt.onclick = function() {
	shadow.style.display = 'block';
	choicedate.style.display = 'block';
	renderYearAndMonth();
	var lisY = Year.getElementsByTagName('li');
	var lisM = Month.getElementsByTagName('li');
	var lisD = DatE.getElementsByTagName('li');
	//上一年
	lisY[0].onclick = function() {
		var val = parseFloat(lisY[2].innerHTML);
		lisY[3].innerHTML = (val + 1) + '年';
		move(Year, {
			top: -30
		}, 500, 'linear', function() {
			lisY[0].innerHTML = lisY[1].innerHTML;
			lisY[1].innerHTML = lisY[2].innerHTML;
			lisY[2].innerHTML = lisY[3].innerHTML;
			lisY[3].innerHTML = '';
			Year.style.cssText = '';
		})
	}
	//下一年
	lisY[2].onclick = function() {
		lisY[3].innerHTML = lisY[2].innerHTML;
		lisY[2].innerHTML = lisY[1].innerHTML;
		lisY[1].innerHTML = lisY[0].innerHTML;
		Year.style.top = '-30px';
		var val = parseFloat(lisY[0].innerHTML);
		lisY[0].innerHTML = (val - 1) + '年';
		move(Year, {
			top: 0
		}, 500, 'linear', function() {
			Year.style.cssText = '';
		})
	}
	//上个月
	lisM[0].onclick = function() {
		var val = parseFloat(lisM[2].innerHTML);
		if(val >= 12) {
			val = 0;
		}
		lisM[3].innerHTML = (val + 1) + '月';
		move(Month, {
			top: -30
		}, 500, 'linear', function() {
			lisM[0].innerHTML = lisM[1].innerHTML;
			lisM[1].innerHTML = lisM[2].innerHTML;
			lisM[2].innerHTML = lisM[3].innerHTML;
			lisM[3].innerHTML = '';
			Month.style.cssText = '';
		})
	}
	//下个月
	lisM[2].onclick = function() {
		lisM[3].innerHTML = lisM[2].innerHTML;
		lisM[2].innerHTML = lisM[1].innerHTML;
		lisM[1].innerHTML = lisM[0].innerHTML;
		Month.style.top = '-30px';
		var val = parseFloat(lisM[0].innerHTML);
		if(val <= 1) {
			val = 13;
		}
		lisM[0].innerHTML = (val - 1) + '月';
		move(Month, {
			top: 0
		}, 500, 'linear', function() {
			Month.style.cssText = '';
		})
	}
	//上一天
	lisD[0].onclick = function() {
		//当前月
		var m = parseFloat(lisM[1].innerHTML);
		var date = new Date();
		date.setMonth(m);
		date.setDate(0);
		//当前选中月的天数
		var d = date.getDate();
		var val = parseFloat(lisD[2].innerHTML);
		if(val >= d) {
			val = 0;
		}
		lisD[3].innerHTML = (val + 1) + '日';
		move(DatE, {
			top: -30
		}, 500, 'linear', function() {
			lisD[0].innerHTML = lisD[1].innerHTML;
			lisD[1].innerHTML = lisD[2].innerHTML;
			lisD[2].innerHTML = lisD[3].innerHTML;
			lisD[3].innerHTML = '';
			DatE.style.cssText = '';
		})
	}
	//下一天
	lisD[2].onclick = function() {
		var m = parseFloat(lisM[1].innerHTML);
		var date = new Date();
		date.setMonth(m);
		date.setDate(0);
		//当前选中月的天数
		var d = date.getDate();
		lisD[3].innerHTML = lisD[2].innerHTML;
		lisD[2].innerHTML = lisD[1].innerHTML;
		lisD[1].innerHTML = lisD[0].innerHTML;
		DatE.style.top = '-30px';
		var val = parseFloat(lisD[0].innerHTML);
		if(val <= 1) {
			val = d + 1;
		}
		lisD[0].innerHTML = (val - 1) + '日';
		move(DatE, {
			top: 0
		}, 500, 'linear', function() {
			DatE.style.cssText = '';
		})
	}
	sure.onclick = function() {
		var selectedYear = parseFloat(lisY[1].innerHTML);
		var selectedMonth = parseFloat(lisM[1].innerHTML);
		var selectedDate = parseFloat(lisD[1].innerHTML);
		shadow.style.display = '';
		choicedate.style.display = '';
		week.innerHTML = '';
		setCalendar(selectedYear, selectedMonth, selectedDate);
		xjt.innerHTML = '' + selectedYear + '年' + selectedMonth + '月<img src="../images/xiajiantou.png" alt="" class="xiajiantou"/>';
		for(var i = 0; i < lis.length; i++) {
			var BoxDiv = Box[i].getElementsByTagName('div');
			BoxDiv[1].style.background = CArr[0];
			BoxDiv[2].style.background = CArr[0];
			BoxDiv[4].style.background = CArr[1];
			BoxDiv[5].style.background = CArr[2];
			week.style.background = CArr[0];
			setTimeout(function(i) {
				Mtween({
					el: Box[i],
					target: {
						rotateY: 110
					},
					time: 330,
					callBack: function() {
						Mtween({
							el: Box[i],
							target: {
								rotateY: 90
							},
							time: 300
						})
					}
				})
			}, i * 20, i)
			lis[i].index = i;
			lis[i].onclick = function() {
				var Div = Box[this.index].getElementsByTagName('div')[1];
				for(var i = 0; i < lis.length; i++) {
					var DivB = Box[i].getElementsByTagName('div')[1];
					DivB.style.background = '';
				}
				Div.style.background = '#f6f7c6';
				var day = this.getElementsByTagName('i')[0].innerText;
				var year = selectedYear;
				var month = selectedMonth;
				chooseDate = year + '-' + month + '-' + day;
			}
		}
		for(var i = 0; i < Box.length; i++) {
			var BoxD = Box[i].getElementsByTagName('div')[1];
			if(BoxD.classList.contains('thisday')) {
				BoxD.style.background = '#3cc5bc';
			}
		}
	}
	no.onclick = function() {
		shadow.style.display = '';
		choicedate.style.display = '';
	}
}
/**************************函数********************************/
//生成日期，参数：selectedYear：年，selectedMonth：月
function setCalendar(selectedYear, selectedMonth, selectedDate) {
	--selectedMonth;
	// 这个月的第一天是星期几
	var date = new Date(selectedYear, selectedMonth);
	date.setDate(1);
	//这个月的第一天的星期
	var firstDateInWeekDay = date.getDay();
	if(firstDateInWeekDay == 0) {
		firstDateInWeekDay = 7;
	}
	//这个月有几天
	var date = new Date(selectedYear, selectedMonth);
	//变为下一个月
	date.setMonth(date.getMonth() + 1);
	//下个月第零天
	date.setDate(0);
	//这个月的天数
	var totalDay = date.getDate();
	var dayInWeek = date.getDay();
	//上个月有几天
	var date = new Date(selectedYear, selectedMonth);
	date.setDate(0);
	//上个月的天数
	var prevTotalDay = date.getDate();
	//上个月要显示的开始日期
	var disDay = prevTotalDay - firstDateInWeekDay + 1;
	var str = '';
	for(var i = 1; i <= totalDay; i++) {
		var className = 'thisweek';
		var disDayInWeek = (i + firstDateInWeekDay - 1);
		if(!selectedDate) {
			selectedDate = undefined;
			if(i === nowDate) {
				className += ' thisday';
			}
		} else {
			if(i === selectedDate) {
				className += ' thisday';
			}
		}
		if(disDayInWeek % 7 == 0 || disDayInWeek % 7 == 6) {
			className += ' thisweekend';
		}
		str += '<li><div class="Box"><div></div><div class="' + className + '"><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth + 1, i) + '</span></div><div></div><div></div><div></div><div><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth + 1, i) + '</span></div></div></li>';
	}
	var beforeBlankDay = '';
	// 最开始是星期天, 所以要+1，填补之前的空格
	for(var i = prevTotalDay - firstDateInWeekDay + 1; i <= prevTotalDay; i++) {
		beforeBlankDay += '<li><div class="Box"><div></div><div><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth, i) + '</span></div><div></div><div></div><div></div><div><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth, i) + '</span></div></div></li>';
	}
	var afterBlankDay = '';
	// 该月份之后的这个星期加上去
	// 最大是星期6
	if((totalDay + firstDateInWeekDay + 6 - dayInWeek) == 35) {
		var DayInWeek = 6 - dayInWeek + 7;
	} else {
		var DayInWeek = 6 - dayInWeek;
	}
	for(var i = 1; i <= DayInWeek; i++) {
		afterBlankDay += '<li><div class="Box"><div></div><div><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth + 2, i) + '</span></div><div></div><div></div><div></div><div><i>' + i + '</i><span>' + showLen(selectedYear, selectedMonth + 2, i) + '</span></div></div></li>';
	}
	week.innerHTML = beforeBlankDay + str + afterBlankDay;
	var lis = week.getElementsByTagName('li');
	for(var i = 0; i < lis.length; i++) {
		lis[i].onOff = true;
	}
}
//选择年，月的范围
function renderYearAndMonth() {
	var date = new Date();
	var y = date.getFullYear() - 1;
	var m = date.getMonth();
	var d = date.getDate() - 1;
	for(var i = 0; i < 3; i++) {
		Year.innerHTML += '<li>' + (y + i) + '年</li>';
	}
	Year.innerHTML += '<li></li>';
	for(var i = 0; i < 3; i++) {
		Month.innerHTML += '<li>' + (m + i) + '月</li>';
	}
	Month.innerHTML += '<li></li>';
	for(var i = 0; i < 3; i++) {
		DatE.innerHTML += '<li>' + (d + i) + '日</li>';
	}
	DatE.innerHTML += '<li></li>';
}
//阴历
function GetBit(m, n) {
	return(m >> n) & 1;
}

function e2c() {
	TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
	var total, m, n, k;
	var isEnd = false;
	var tmp = TheDate.getYear();
	if(tmp < 1900) {
		tmp += 1900;
	}
	total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + madd[TheDate.getMonth()] + TheDate.getDate() - 38;
	if(TheDate.getYear() % 4 == 0 && TheDate.getMonth() > 1) {
		total++;
	}
	for(m = 0;; m++) {
		k = (CalendarData[m] < 0xfff) ? 11 : 12;
		for(n = k; n >= 0; n--) {
			if(total <= 29 + GetBit(CalendarData[m], n)) {
				isEnd = true;
				break;
			}
			total = total - 29 - GetBit(CalendarData[m], n);
		}
		if(isEnd) {
			break
		};
	}
	cYear = 1921 + m;
	cMonth = k - n + 1;
	cDay = total;
	if(k == 12) {
		if(cMonth == Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth = 1 - cMonth;
		}
		if(cMonth > Math.floor(CalendarData[m] / 0x10000) + 1) {
			cMonth--;
		}
	}
}

function GetcDateString() {
	var tmp = "";
	//年
	//	tmp+=tgString.charAt((cYear-4)%10);
	//	tmp+=dzString.charAt((cYear-4)%12);
	//	tmp+="(";
	//	tmp+=sx.charAt((cYear-4)%12);
	//	tmp+=")年 ";
	if(cMonth < 1) {
		//tmp+="(闰)";
		tmp += monString.charAt(-cMonth - 1);
	} else {
		tmp += monString.charAt(cMonth - 1);
	}
	tmp += "月";
	if(cDay == 20) {
		tmp += '二十';
	}
	tmp += (cDay < 11) ? "初" : ((cDay < 20) ? "十" : ((cDay < 30) ? "廿" : "三十"));
	if(tmp.length > 4) {
		tmp = tmp.substring(0, 4);
	}
	if(cDay % 10 != 0 || cDay == 10) {
		tmp += numString.charAt((cDay - 1) % 10);
	}
	return tmp;
}

function GetLunarDay(solarYear, solarMonth, solarDay) {
	//solarYear = solarYear<1900?(1900+solarYear):solarYear;
	if(solarYear < 1921 || solarYear > 2020) {
		return "";
	} else {
		solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
		e2c(solarYear, solarMonth, solarDay);
		return GetcDateString();
	}
}
//显示阴历，参数：yy：年，mm：月，dd：天
function showLen(yy, mm, dd) {
	if(yy < 100) {
		yy = "19" + yy;
	}
	var showCal = GetLunarDay(yy, mm, dd);
	if(showCal.substring(2) == '初一') {
		showCal = showCal.substring(0, 2);
	}
	if(showCal.length > 2) {
		showCal = showCal.substring(2);
	}
	return showCal;
}
//栅格
function Enter(n) {
	if(!lis[n].onOff) {
		return;
	}
	lis[n].onOff = false;
	var X = parseInt(Math.random() * 360);
	var Y = parseInt(Math.random() * 360);
	//rotateX：围绕x轴进行旋转，rotateY：围绕y轴进行旋转，translateZ：沿z轴位移
	lis[n].style.transform = "translateZ(400px) rotateX(" + X + "deg) rotateY(" + Y + "deg)";
	lis[n].style.opacity = 0.5;
	//先向z轴方向位移0.5s，再回到原来位置需0.5s，正好等于transition=1s
	setTimeout(function() {
		lis[n].style.transform = "translateZ(0px)";
		lis[n].style.opacity = "1";
	}, 500)
	var m = 0;
	for(var i = 0; i < lis.length; i++) {
		if(!lis[i].onOff) {
			m++;
		}
	}
	if(m == lis.length) {
		setTimeout(function() {
			for(var i = 0; i < lis.length; i++) {
				lis[i].onOff = true;
			}
		}, 500)
	}
	if(lis[n + 7]) {
		setTimeout(function() {
			Enter(n + 7);
		}, 100)
	}
	if(lis[n + 1] && (Math.floor((n + 1) / 7) == Math.floor(n / 7))) {
		setTimeout(function() {
			Enter(n + 1);
		}, 100)
	}
	if(lis[n - 1] && (Math.floor((n - 1) / 7) == Math.floor(n / 7))) {
		setTimeout(function() {
			Enter(n - 1);
		}, 100)
	}
	if(lis[n - 7]) {
		setTimeout(function() {
			Enter(n - 7);
		}, 100)
	}
}
//随机返回一种颜色，第一个：侧面，第二个：后面，第三个：正面
function colorArr() {
	var arrCol = [
		['paleturquoise', '#4cbdbd', '#ecdede'],
		['mistyrose', '#febfb8', 'mistyrose'],
		['#ecdede', 'rosybrown', 'paleturquoise']
	];
	arrCol.sort(function() {
		return Math.random() - 0.5;
	})
	return arrCol[0];
}
//返回首页
var fan = document.getElementsByClassName('datetop')[0].getElementsByTagName('span')[0].getElementsByTagName('img')[0];
fan.onclick = function() {
	location.href = 'home.html';
}