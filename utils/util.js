const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function myFormatTime(date){
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [hour, minute, second].map(formatNumber).join(':')
}

function myFormatDate(date){
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function json2Form(json) {  var str = [];  for (var p in json) {  str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));  }  return str.join("&"); } 

function timeStamp2String(time){
  var datetime = new Date();
  datetime.setTime(time);
  var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
  var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
  var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
  return hour+":"+minute+":"+second;
}

module.exports = {   
  formatTime: formatTime,
  myFormatTime:myFormatTime,
  myFormatDate:myFormatDate,
  timeStamp2String:timeStamp2String,
  json2Form: json2Form} 

