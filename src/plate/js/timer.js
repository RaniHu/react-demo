/**
 * Created by huran on 2017/5/26.
 */
//设置倒计时
window.onload =function () {
    setTimer();
}
var setTimer = function () {

    var showElement = document.querySelectorAll(".timer_item");                                       //显示倒计时的元素
    //获取倒计时
    function getTimer(show_element, set_date) {
        var disTime = parseInt(set_date) * 1000 - (+new Date());           //距离时间

        //时分秒不足10的补0
        function checkTimer(i) {
            if (i < 10) {
                i = '0' + i;
            }
            return i;
        }

        //距离开始或仅剩时间
        if (disTime > 0) {
            var d = Math.floor(disTime / 1000 / 60 / 60 / 24);              //天
            var h = Math.floor(disTime / 1000 / 60 / 60 % 24) + d * 24;     //时
            var s = Math.floor(disTime / 1000 / 60 % 60);                   //分
            var m = Math.floor(disTime / 1000 % 60);                        //秒
            h = checkTimer(h);
            m = checkTimer(m);
            s = checkTimer(s);

            //对应元素显示倒计时
            var timeHour = show_element.querySelector(".timer_hour");
            var timeMin = show_element.querySelector(".timer_min");
            var timeSec = show_element.querySelector(".timer_sec");
            timeHour.innerHTML = h + ':';
            timeMin.innerHTML = s + ':';
            timeSec.innerHTML = m;
            setTimeout(function () {
                getTimer(show_element, set_date);
            }, 1000);
        }
        //已结束
        else {
            show_element.querySelector(".timer_hour").innerHTML = "00:";
            show_element.querySelector(".timer_min").innerHTML = "00:"
            show_element.querySelector(".timer_sec").innerHTML = "00"
        }
    }

    //初始化
    function timerInit() {
        for (var i = 0; i < showElement.length; i++) {
            var setTime = showElement[i].getAttribute("data-timestamp");
            (function (element, set_time) {
                setTimeout(function () {
                    getTimer(element, set_time);
                }, 1000);
            })(showElement[i], setTime);
        }
    }

    timerInit();
} ;