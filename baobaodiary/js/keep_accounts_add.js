// 获取传过来的日期
var date = location.search.split('=')[1];

// 自定义storage的key
var STORAGE_KEY = 'keep-accounts-1.0';

// 获取storage里面所有的数据
var data = getStorageDataByKey(STORAGE_KEY, accountData);

// 收入按钮
var incomeBtn = document.getElementById('incomeBtn');
// 支出按钮
var payBtn = document.getElementById('payBtn');
// 保存按钮
var saveBtn = document.getElementById('saveBtn');
// 获取后退按钮
var backBtn = document.getElementById('backBtn');
// 单价
var unitPrice = document.getElementById('unitPrice');
// 数量
var quantity = document.getElementById('quantity');
// 备注
var comment = document.getElementById('comment');
// 获取所有的类别
var leiBie = document.getElementsByClassName('leibie')[0];
var dls = leiBie.getElementsByTagName('dl');
// 0 支出 1 收入
var payStatus = 0;

// 类别点击事件
for (var i = 0; i < dls.length; i ++) {
  dls[i].onclick = function () {
    var dt = this.getElementsByTagName('dt')[0];
    var dd = this.getElementsByTagName('dd')[0];
    choseClass.style.background = 'url(../images/' + dt.className + '.png) no-repeat';
    choseClass.style.backgroundSize = '23px 23px';
    choseClass.setAttribute('typeData', dd.innerText);
    choseClass.setAttribute('typeImg', dt.className);
  };
}
// 收入按钮点击事件
incomeBtn.onclick = function () {
  this.classList.add('hover');
  payBtn.classList.remove('hover');
  payStatus = 1;
}

// 支出按钮点击事件
payBtn.onclick = function () {
  this.classList.add('hover');
  incomeBtn.classList.remove('hover');
  payStatus = 0;
}

// 保存按钮点击事件
saveBtn.onclick = function () {
  var unitPriceValue = unitPrice.value;
  var quantityValue = quantity.value;
  var type = choseClass.getAttribute('typeData');
  var typeImg = choseClass.getAttribute('typeImg');
  var commentValue = comment.value;
  
  // if (unitPriceValue == null || unitPriceValue == '' || unitPriceValue == 0) {
  //   alert('请输入金额');
  //   return;
  // }

  var todayData = data.find(function (item) {
    return item.date === date
  })

  var obj = {
    price: unitPriceValue,
    type: type,
    typeImg: typeImg,
    quantity: quantityValue,
    comment: commentValue
  }

  if (!todayData) {
    // 如果今天没有存过, 则重新生成单个数据
    todayData = {
      date: date,
      incomeAccounts: [],
      payAccounts: []
    }
    // 今天数据放到最上面
    data.unshift(todayData)
  }

  if (payStatus === 1) {
    if (todayData.incomeAccounts && Array.isArray(todayData.incomeAccounts)) {
      // 目的为了最新的数据放到最上面
      todayData.incomeAccounts.unshift(obj)
    } else {
      todayData.incomeAccounts = [obj]
    }
  } else if (payStatus === 0) {
    if (todayData.payAccounts && Array.isArray(todayData.payAccounts)) {
      todayData.payAccounts.unshift(obj)
    } else {
      todayData.payAccounts = [obj]
    }
  }

  storage.save(data, STORAGE_KEY)     

  location.href = 'keep_accounts_list.html?date=' + date;
}

// 点击后退按钮, 跳转到上一页
backBtn.onclick = function () {
  //history.go(-1);
  location.href = 'keep_accounts_list.html';
}