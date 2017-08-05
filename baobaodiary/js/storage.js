

var storage = {
  fetch: function (STORAGE_KEY) {
    var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    return data
  },
  save: function (data, STORAGE_KEY) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }
}