 //获取cookie、
 export function getCookie(name) {
     var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
     if (arr = document.cookie.match(reg))
         return (arr[2]);
     else
         return null;
 }

 //设置cookie,增加到vue实例方便全局调用
 export function setCookie(c_name, value, expiredays) {
     var exdate = new Date();
     exdate.setDate(exdate.getDate() + expiredays);
     document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
 };

 //删除cookie
 export function delCookie(name) {
     var exp = new Date();
     exp.setTime(exp.getTime() - 1);
     var cval = getCookie(name);
     if (cval != null)
         document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
 };

 //获取当前时间，格式YYYY-MM-DD
 export function getNowFormatDate() {
     var show_day = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
     var date = new Date();
     var seperator1 = "-";
     var year = date.getFullYear();
     var month = date.getMonth() + 1;
     var strDate = date.getDate();
     var day = date.getDay();
     if (month >= 1 && month <= 9) {
         month = "0" + month;
     }
     if (strDate >= 0 && strDate <= 9) {
         strDate = "0" + strDate;
     }
     var currentdate = `<p>` + year + seperator1 + month + seperator1 + strDate + `<span style="margin-left:6px;">` + show_day[day] + `</span>` + `</p>`;
     return currentdate;
 }
 export function changeFormatDate(times) {
     // 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
     var date = new Date(times);
     let Y = date.getFullYear() + '-';
     let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
     let D = date.getDate() + ' ';
     let h = date.getHours() + ':';
     let m = date.getMinutes() + ':';
     let s = date.getSeconds();
     return Y + M + D + h + m + s
 }