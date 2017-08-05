var oDiarybot = document.getElementsByClassName('diarybot')[0];
var p = oDiarybot.getElementsByTagName('p')[0];
var fanhui = document.getElementsByClassName('diarytop')[0].getElementsByTagName('img')[0];
var tishi = document.getElementsByClassName('tishi')[0];
var cunt = document.getElementsByClassName('cunt')[0].getElementsByTagName('i')[0];
var conul = document.getElementsByClassName('con-ul')[0];

p.onclick = function() {
    location.href = 'diary-text.html';
}
p.onmouseenter = function(){
	this.style.cursor = 'pointer';
}
fanhui.onclick = function(){
	 location.href = 'home.html';
}
var STORAGE_KEY = 'riji-data';
var data = storage.fetch(STORAGE_KEY);
console.log(data)
var html = '';
for(var i=0;i<data.length;i++){
	html += `
	<li>
    	<div class="clearfix">
            <h3 class="fl">${data[i].title}</h3>
            <div class="fr">
            	<img src="${data[i].face}" class="fl">
                <img src="${data[i].wather}" class="fl">
            </div>
        </div>
        <span>${data[i].time}</span>
        <p>${data[i].content}</p>
    </li>`
}
conul.innerHTML = html;
if(data.length){
	tishi.style.display = 'none';
}else{
	tishi.style.display = 'block';
}
cunt.innerHTML = data.length;