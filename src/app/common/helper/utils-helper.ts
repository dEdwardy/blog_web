// 辅助工具
export const Utils = {
  // 设置本地存储
  setLocalStorage(key, val){
    window.localStorage.setItem(key, val);
  },
  // 获取本地存储
  getLocalStorage(key){
    return window.localStorage.getItem(key);
  },
  // 设置Cookie
  setCookie(name,value) { 
    var Days = 30; 
    var exp = new Date(); 
    exp.setTime(exp.getTime() + Days*24*60*60*1000); 
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toUTCString(); 
  },
  // 获取Cookie
  getCookie(name) { 
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]); 
    else 
      return null; 
  },
  //删除cookies 
  delCookie(name) { 
    var exp = new Date(); 
    exp.setTime(exp.getTime() - 1); 
    var cval = this.getCookie(name); 
    if(cval!=null) 
        document.cookie= name + "="+cval+";expires="+exp.toUTCString(); 
  },
  // maxlength限制
  limitKeyUp(e){
    e = e || window.event;
    let target = e.target || e.srcElement;
    let value = target.value;
    let maxLength = target.getAttribute('maxlength');
    let result = {status: true, message: ''};
    if(maxLength){
      if(value.length >= maxLength){
        result = {status: false, message: '最大长度为'+maxLength};
      }
    }
    return result;
  },
  // keyup事件
  keyup(e, keyAry, fn) {
    e = e || window.event;
    let target = e.target || e.srcElement;
    let keyCode = e.keyCode;
    if(typeof(keyAry) == 'function'){
      fn = keyAry;
      keyAry = undefined;
    }

    if(keyAry){
      let i = 0, len = keyAry.length, keyItem;
      for(;i<len;i++){
        keyItem = keyAry[i];
        if(keyItem == keyCode){
          if(fn){
            fn(e, keyCode, target);
          }
        }
      }
    }
    else{
      fn(e, keyCode, target);
    }
  },
  // 回车事件
  enter(e, fn){
    Utils.keyup(e, [13], fn);
  },
  //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
  timeago(dateTimeStamp){
    var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    var hour = minute * 60;
    var day = hour * 24;
    var week = day * 7;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();   //获取当前时间毫秒
    var diffValue = now - dateTimeStamp;//时间差

    if(diffValue < 0){
        return '刚刚';
    }
    var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    var hourC = diffValue/hour;
    var dayC = diffValue/day;
    var weekC = diffValue/week;
    var monthC = diffValue/month;
    var result = '';
    if(monthC >= 1 && monthC <= 3){
        result = Math.floor(monthC) + "月前"
    }else if(weekC >= 1 && weekC <= 3){
        result = Math.floor(weekC) + "周前"
    }else if(dayC >= 1 && dayC <= 6){
        result = Math.floor(dayC) + "天前"
    }else if(hourC >= 1 && hourC <= 23){
        result = Math.floor(hourC) + "小时前"
    }else if(minC >= 1 && minC <= 59){
        result = Math.floor(minC) + "分钟前"
    }else if(diffValue >= 0 && diffValue <= minute){
        result = "刚刚"
    }else {
      var datetime = new Date();
      datetime.setTime(dateTimeStamp);
      var Nyear = datetime.getFullYear();
      var Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      var Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      var Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      var Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate
    }
    return result;
  }
};