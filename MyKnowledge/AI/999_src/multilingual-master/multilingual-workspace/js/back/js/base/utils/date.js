// 日付

// 現在日付
var today = new Date();
// 月日を設定
var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); 
// 今年の年を設定
endYear.setFullYear(today.getFullYear());
// 一日をミリ秒に換算
var msPerDay = 24 * 60 * 60 * 1000;
var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;
// 今年の残り日数を返す
var daysLeft = Math.round(daysLeft); 

function JSClock() {
    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();
    var temp = "" + (hour > 12 ? hour - 12 : hour);
    if (hour == 0) temp = "12";
    temp += (minute < 10 ? ":0" : ":") + minute;
    temp += (second < 10 ? ":0" : ":") + second;
    temp += hour >= 12 ? " P.M." : " A.M.";
    return temp;
}
  