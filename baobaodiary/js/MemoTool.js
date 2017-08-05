//一位数字转双数
function two(n){
	if(n<10 && n.length==1){
		return '0'+n;
	}else{
		return n;
	}
}
//找最大id
function maxId(data){
	var max = 0;
	data.forEach(function(a){
		if(a.id>max){
			max = a.id;
		}
	})
	return max;
}
//找符合dateId的数据
function FindData(data,dateId){
	var Data = [];//符合dateId的数据---一条
	data.forEach(function(a){
		if(a.id==dateId){
			Data.push(a);
		}
	})
	return Data;
}