/**
 * Created by GuoXiang on 2016/2/22.
 */
$(function(){
    var height = $(window).height();
    storage = window.sessionStorage;

    if(!storage.getItem("count")){
        storage.setItem("count",1);
        hasApp();
    }
    $("#download").click(function(){
        if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
            if(/(MicroMessenger)/i.test(navigator.userAgent)){
                console.log("MicroMessenger userAgent is "+navigator.userAgent);
                $("#mask2").css("display","block");
            }
            else{
                console.log("Apple userAgent is "+navigator.userAgent);
                window.location.href = "https://itunes.apple.com/cn/app/duo-rou-li-cai-bi10-hai-duo/id1067328168?mt=8";
            }

        }
        else{
            console.log("Android userAgent is "+navigator.userAgent);
            window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.duorou.duorouandroid";
        }
    });
    $("#mask2").click(function(){
        $(this).css("display","none");
    });


    function hasApp() {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            /* ios手机在微信端显示mask page */
            if (/(MicroMessenger)/i.test(navigator.userAgent)) {
                console.log("MicroMessenger userAgent is " + navigator.userAgent);
                $("#mask2").css("display", "block");
            }
            /* ios手机在手机浏览器跳到app store */
            else {
                console.log("Apple userAgent is " + navigator.userAgent);
                openIosApp("openDuorou://");
            }

        }
        else {
            /* android手机无论在微信还是浏览器都跳到android market */
            console.log("Android userAgent is " + navigator.userAgent);
            openAndroidApp("jingyuan://duorou.com/main");
            setTimeout(function(){
                window.location.reload();
            },1000);

        }
    }

    function openIosApp(passUrl){
        var createObj = document.getElementById('jumpApp');
        if(!createObj){
            createObj = document.createElement('a');
            createObj.id = 'jumpApp';
            createObj.style.display = 'none';
            document.body.appendChild(createObj);
        }
        createObj.href = passUrl;
        createObj.dispatchEvent(customClickEvent());
    }
    function openAndroidApp(passUrl){
        var ifr = document.createElement('iframe');
        ifr.src = passUrl;
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
    }
    function customClickEvent(){
        var clickEvt;
        if (window.CustomEvent) {
            clickEvt = new window.CustomEvent('click', {
                canBubble: true,
                cancelable: true
            });
        } else {
            clickEvt = document.createEvent('Event');
            clickEvt.initEvent('click', true, true);
        }

        return clickEvt;
    }
});