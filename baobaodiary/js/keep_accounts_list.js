// 获取用户点击的日期
var Search = location.search;
var time = new Date();
var year = time.getFullYear();
var month = time.getMonth()+1;
var day = time.getDate();
var date = Search?Search.split('=')[1]:year+'-'+month+'-'+day;
//var date = location.search.split('=')[1];
// 获取总容器
var wrap = document.getElementById('wrap');
// 获取账单信息容器
var accountDate = document.getElementById('accountDate');
// 渲染日期
accountDate.innerHTML = `<span>${date}</span><span>${getWeekDayByDate(date)}</span>`
// 获取账单容器
var accountBox = document.getElementById('accountBox');
// 获取账单列表容器
var accountList = document.getElementById('accountList');
// 获取记账按钮
var accountBtn = document.getElementById('accountBtn');
// 获取后退按钮
var backBtn = document.getElementById('backBtn')
// 获取总收入容器
var incomeTotalSpan = document.getElementById('incomeTotal');
// 获取总支出容器
var payTotalSpan = document.getElementById('payTotal');
// 获取总收支差额容器
var paymentBalanceSpan = document.getElementById('paymentBalance');

// 获取设置预算按钮
var budgetBtn = document.getElementById('budgetBtn');

// 获取预算容器
var budgetP = budgetBtn.getElementsByTagName('p')[0];
var budgetImg = budgetBtn.getElementsByTagName('img')[0];
var budgetSpan = budgetBtn.getElementsByTagName('span')[0];


// 点击预算按钮, 跳转到预算页面
budgetBtn.onclick = function () {
  location.href = 'keep_accounts_budget.html?date=' + date;
}

// 点击记账按钮, 跳转到记账新增页面
accountBtn.onclick = function () {
  location.href = 'keep_accounts_add.html?date=' + date;
}

// 点击后退按钮, 跳转到上一页
backBtn.onclick = function () {
  location.href = 'home.html';
}

// 自定义storage的key
var STORAGE_KEY = 'keep-accounts-1.0'

// 获取storage里面所有的数据
var renderData = getStorageDataByKey(STORAGE_KEY, accountData);
if (renderData) {
  if (renderData.length > 0) {
    renderAccount();
  } else {
    getTotalMoneyFn();
  }
}

// 获取要渲染的账单信息
function getAccountObj () {
  var accountObj = null;
  renderData.forEach(function (item) {
    if (item.date == date) {
      accountObj = item;
    }
  });
  return accountObj;
}

// 渲染账单列表方法
function renderAccount () {
  var accountObj = getAccountObj();
  var payAccountsStr = '';
  var incomeAccountsStr = '';
  if (accountObj) {
    var payArr = accountObj.payAccounts;
    var incomeArr = accountObj.incomeAccounts;
    var payTotal = 0;
    var incomeTotal = 0;
    if (payArr.length > 0 || incomeArr.length > 0) {
      payArr.forEach(function (item) {
        payAccountsStr += `<li>支出￥${item.price}</li>
                              <li><img src="../images/${item.typeImg}.png" alt=""><span>${item.type}</span>
                              <span class="licai" style="color: #eb8656;">+￥${item.price}</span>
                            </li>`;
        payTotal += parseFloat(item.price);
      });
      incomeArr.forEach(function (item) {
        incomeAccountsStr += `<li>收入￥${item.price}</li>
                                  <li><img src="../images/${item.typeImg}.png" alt=""><span>${item.type}</span>
                                  <span class="licai">+￥${item.price}</span>
                              </li>`;
        incomeTotal += parseFloat(item.price);
      });
      accountList.innerHTML = payAccountsStr + incomeAccountsStr; 
      payTotalSpan.innerHTML = payTotal == 0 ? '' : payTotal;
      incomeTotalSpan.innerHTML =  incomeTotal == 0 ? '' : incomeTotal;
      paymentBalanceSpan.innerHTML = Math.abs(incomeTotal - payTotal) == 0 ? '' : Math.abs(incomeTotal - payTotal);
    } else {
      renderEmptyPage();
    }
    if (accountObj.budgetMoney) {
      var percent = payTotal / accountObj.budgetMoney;
      if (payTotal > accountObj.budgetMoney) {
        move(budgetImg,{left: 105},1000,'linear');
        move(budgetP,{width: 120},1000,'linear');
        budgetSpan.innerHTML = '预算超额: ' + (payTotal - accountObj.budgetMoney) + '元';
        budgetSpan.style.color = '#ec8758';
      } else {
        budgetSpan.innerHTML = '预算余额: ' + (accountObj.budgetMoney - payTotal) + '元';
        budgetSpan.style.color = '#84eaa8';
        var budgetImgLeft = percent * 120 - 10;
        if (budgetImgLeft < 0) {
          budgetImgLeft = 0;
        }
        move(budgetImg,{left: budgetImgLeft},1000,'linear');
        move(budgetP,{width: (percent * 120)},1000,'linear');
      }
    }
  } else {
    renderEmptyPage();
  }
} 

// 如果没有账单信息, 渲染空页面样式
function renderEmptyPage () {
    accountList.style.border = 'none';
    accountBox.style.background = 'url(../images/accountEmpty.png) no-repeat';
    wrap.style.backgroundColor = '#ece6e7';
    wrap.style.backgroundImage = 'none';
}