var doc = document;
var oDel = doc.getElementsByClassName('del')[0];
var oSha = doc.getElementsByClassName('shadow')[0];
var oSure = doc.getElementsByClassName('sure')[0];
var oNo = doc.getElementsByClassName('no')[0];
var oContxt = doc.getElementsByClassName('contxt')[0];
var oBack = doc.getElementsByClassName('rollback')[0];
//console.log(oContxt.innerHTML);

oDel.onclick = function() {
    oSha.style.display = 'block';
}

oSure.onclick = function() {
    oContxt.innerHTML = '';
    oSha.style.display = 'none';

}
oNo.onclick = function() {
    oSha.style.display = 'none';

}
oBack.onclick = function() {
    window.location.href = 'diary-text.html';
}