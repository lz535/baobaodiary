/**
 * 根据年月日计算星期
 * @param {*} date 
 * @return 星期几
 */
function getWeekDayByDate(date) {
  var dateArr = date.split('-');
  var weekDate = new Date(dateArr[0], parseInt(dateArr[1] - 1), dateArr[2]);
  var weekDay = weekDate.getDay();
  switch (weekDay) {
    case 1 : return '星期一';
    break;
    case 2 : return '星期二';
    break;
    case 3 : return '星期三';
    break;
    case 4 : return '星期四';
    break;
    case 5 : return '星期五';
    break;
    case 6 : return '星期六';
    break;
    case 0 : return '星期日';
    break;
  }
}

/**
 * 根据key和渲染的假数据获取浏览器中storageData
 * @param {*} key 
 * @param {*} renderJsData 
 */
function getStorageDataByKey (key, renderJsData) {
  // 先从本地存储里取数据
  var localStorageData = storage.fetch(key);
  if (renderJsData) {
    // 如果本地存储没有数据, 则存入mock(模拟)的数据
    if (!localStorageData || !localStorageData.length) {
      storage.save(renderJsData, STORAGE_KEY);
    } else {
      // 如果本地存储有, 则覆盖 mock(模拟) 数据
      renderJsData = localStorageData;
    }
    return renderJsData;
  } else {
    return localStorageData;
  }
}




