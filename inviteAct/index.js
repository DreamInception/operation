/**
 * Created by GuoXiang on 2016/7/26.
 */
document.addEventListener('DOMContentLoaded', loaded, false);
var   myscroll;
var width = $(window).width(),
    height = $(window).height();
function loaded(){
    var direction = null;
    setTimeout(function(){
        myscroll = new iScroll('wrapper',{
            onScrollMove: function(){
                if(this.y<(this.maxScrollY-5)){
                    console.log("向下拉");
                    direction = 'down';
                }
                else if(this.y>(this.maxScrollY+5)){
                    console.log("向上拉");
                    direction = 'up';
                }
            },
            onScrollEnd: function(){
                console.log("success");
                if(direction=='down'){
                    $(".scroller").animate({marginTop:"-"+height});
                }
                else if(direction=='up'){
                    $(".scroller").animate({marginTop:"0"});
                }
            }
        });
    },100)
}
window.onload = function () {


    initPics();
    showAnimation();
    FastClick.attach(document.body);



    function initPics() {
        $(".page1").css("height", height);
        $(".page2").css("height",height);
        $(".staticPic img:eq(0)").css({
            "width": width * 0.165,
            "left": width * 0.793,
            "top": height * 0.02
        });
        $(".staticPic img:eq(1)").css({
            "width": width * 0.592,
            "left": width * 0.189,
            "top": height * 0.062
        });
        $(".staticPic img:eq(2)").css({
            "width": width * 0.905,
            "left": width * 0.016,
            "top": height * 0.234
        });
        $(".firstFriend img").css({
            "width": width * 0.093,
            "left": width * 0.225,
            "top": height * 0.434
        });
        $(".line1").css({
            "width": width * 0.075,
            "left": width * 0.322,
            "top": height * 0.465
        });
        $(".line2").css({
            "width": width * 0.03,
            "left": width * 0.222,
            "top": height * 0.496
        });
        $(".line3").css({
            "width": width * 0.158,
            "left": width * 0.244,
            "top": height * 0.52
        });
        $(".secondFriend img").css({
            "width": width * 0.046,
            "left": width * 0.193,
            "top": height * 0.54
        });
        $(".rate1").css({
            "width": width * 0.17,
            "left": width * 0.296,
            "top": height * 0.346
        });
        $(".rate2").css({
            "width": width * 0.18,
            "left": width * 0.264,
            "top": height * 0.545
        });
        $(".flipPage").css({
            "top": height * 0.812
        })
        var btnWidth1 = $(".lookBtn").width();
        $(".lookBtn").css("height",btnWidth1* 176/518);
        var btnWidth2 = $(".inviteBtn").width();
        $(".inviteBtn").css("height",btnWidth2* 198/746);
    }

    function showAnimation(){
        window.setTimeout(firstPart,500);
    }
    function firstPart(){
        $(".line1").parent().removeClass("hidden");
        window.setTimeout(function(){
            $(".firstFriend img:eq(0)").addClass("hidden");
            $(".firstFriend img:eq(1)").removeClass("hidden");
            window.setTimeout(function(){
                $(".rate1").removeClass("hidden");
                window.setTimeout(secondPart,500);
            },500);

        },200);
    }
    function secondPart(){
        $(".line2").parent().removeClass("hidden");
        window.setTimeout(function(){
            $(".secondFriend img:eq(0)").addClass("hidden");
            $(".secondFriend img:eq(1)").removeClass("hidden");
            window.setTimeout(thirdPart,500);
        },500);

    }
    function thirdPart(){
        $(".line3").parent().removeClass("hidden");
        window.setTimeout(function(){
            $(".rate2").removeClass("hidden");
        },500);
    }
};