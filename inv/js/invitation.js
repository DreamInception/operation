$(function(){
    var height = $(window).height();
        storage = window.sessionStorage;
    init();

    function init(){
        $(".inviteMsg").css("padding-top",height*0.595+'px');
        $(".phoneNum").css("margin-top",height*0.045+'px');
        $(".getTryCash").css("margin-top",height*0.02+'px');


        $("#getTryCash").click(function(){
            if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)){
                /* ios手机在微信端显示mask page */
                if(/(MicroMessenger)/i.test(navigator.userAgent)){
                    console.log("MicroMessenger userAgent is "+navigator.userAgent);
                    $("#mask3").css("display","block");
                }
                /* ios手机在手机浏览器跳到app store */
                else{
                    console.log("Apple userAgent is "+navigator.userAgent);
                    window.location.href = "https://itunes.apple.com/cn/app/duo-rou-li-cai-bi10-hai-duo/id1067328168?mt=8"
                }

            }
            else{
                /* android手机无论在微信还是浏览器都跳到android market */
                console.log("Android userAgent is "+navigator.userAgent);
                window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=com.duorou.duorouandroid";
            }


        })

        $("#mask3").click(function(){
            $(this).css(" display","none");
        });
    }



})