$(function(){


    var Bmonth = 0;
        height = $(window).height();
        shareHeight = $(".share").height();
        storage = window.sessionStorage;
        birth_month = 0;
        birth_day = 0;
    console.log("window's height==="+height);
    init();

    function fixedShow(id){
        $("#"+id).show();
    }
    function fixedHide(id){
        $("#"+id).hide();
    }
    function init(){
        //$(".share").css("top",height+'px');
        setTimeout(function(){
            $(".contentWrap .form").css("display","block");
        },500);
        if (!storage.getItem("birth_month") || !storage.getItem("birth_day")) {
            storage.setItem("birth_month", 01);
            storage.setItem("birth_day", 01);
        }
		$(".shareText span").html("来测一下你的星座<br/>多肉君是个神马鬼？");
        $('.submit').click(function(){
            Bmonth = $(".sel_month").val();
            Bday = $(".sel_day").val();
            if(Bmonth>=1 && Bmonth <= 12){
                storage.setItem("birth_month",Bmonth);
                storage.setItem("birth_day",Bday);
                console.log("save Birth month ="+Bmonth);
                console.log("savc Birth day ="+Bday);
            }
            fixedHide("section1");
            fixedShow("section2");
            movePage2();
        });
    }

    function movePage2(){
        setTimeout(function(){
            $(".container .ssd").css("display","block");
        },500);
		$(".shareText span").html("来测一下你的星座<br/>多肉君是个神马鬼？");
        $('.sel_seed').click(function(){
            fixedHide("section2");
            fixedShow("section3");
            movePage3();
        });
    };
    function movePage3(){
        setTimeout(function(){
            $(".container .condition").css("display","block");
        },500);
		$(".shareText span").html("来测一下你的星座<br/>多肉君是个神马鬼？");
        $('.sel_cond').click(function(){
            fixedHide("section3");
            fixedShow("section4");
            movePage4();
        });

    }
    function movePage4(){
        var timer = setInterval(function(){
            min = parseInt($(".minute").html());
            sec = parseInt($(".second").html());
            console.log("min="+min+"sec="+sec);
            var sum = min * 60 + sec;

            if(sum>0){
                sum--;
                var first = parseInt(sum / 60);
                second = sum % 60;
                $('.minute').html('0'+first);
                if(second<10){
                    $('.second').html('0'+second);
                }else{
                    $('.second').html(second);
                }
            }
            else {
                clearInterval(timer);
                $('#before_status').css("display","none");
                $('#after_status').css("display","block");
                $('.submit2').css('display',"block");
            }
        },1000);
        $(".submit2").click(function(){
            $(".result").css("display","block");
            showChildPage();
        });
        $(".sbtn1").click(function(){
            $(".maskPage").css("display","block");
        });
        $(".maskPage").click(function(){
            $(".maskPage").css("display","none");
        });
        $(".sbtn2").click(function(){
            fixedHide("section4");
            fixedShow("section5");

        });
    }
    function showChildPage(){
            birth_month = parseInt(storage.getItem("birth_month"));
            birth_day = parseInt(storage.getItem("birth_day"));
        console.log("get birth month==="+birth_month);
        console.log("get birth day==="+birth_day);

        $('.result').find('.analysis').css("display","none");
        if((birth_month==12 && birth_day>=22 && birth_day<=31)||(birth_month==1 && birth_day>=1 && birth_day<=19) || birth_month==0 || birth_day==0) {
            $('#analysis1').css("display", "block");
			$(".shareText span").html("摩羯座的福娘<br/>将会帮你：升职");
        }
        else if((birth_month==1 && birth_day>=20 && birth_day<=31)||(birth_month==2 && birth_day>=1 && birth_day<=18)) {
            $('#analysis2').css("display", "block");
			$(".shareText span").html("水瓶座的绯杜鹃<br/>将会帮你：被追");
        }
        else if((birth_month==2 && birth_day>=19 && birth_day<=29)||(birth_month==3 && birth_day>=1 && birth_day<=20)) {
            $('#analysis3').css("display", "block");
			$(".shareText span").html("双鱼座的仙人掌<br/>将会帮你：中奖");
        }
        else if((birth_month==3 && birth_day>=21 && birth_day<=31)||(birth_month==4 && birth_day>=1 && birth_day<=19)) {
            $('#analysis4').css("display", "block");
			$(".shareText span").html("白羊座的熊童子<br/>将会帮你：升杯");
        }
        else if((birth_month==4 && birth_day>=20 && birth_day<=30)||(birth_month==5 && birth_day>=1 && birth_day<=20)) {
            $('#analysis5').css("display", "block");
			$(".shareText span").html("金牛座的草芦荟<br/>将会帮你：逆袭");
        }
        else if((birth_month==5 && birth_day>=21 && birth_day<=31)||(birth_month==6 && birth_day>=1 && birth_day<=21)) {
            $('#analysis6').css("display", "block");
			$(".shareText span").html("双子座的不夜城芦荟<br/>将会帮你：变帅");
        }
        else if((birth_month==6 && birth_day>=22 && birth_day<=30)||(birth_month==7 && birth_day>=1 && birth_day<=22)) {
            $('#analysis7').css("display", "block");
			$(".shareText span").html("巨蟹座的京之华锦<br/>将会帮你：涨粉");
        }
        else if((birth_month==7 && birth_day>=23 && birth_day<=31)||(birth_month==8 && birth_day>=1 && birth_day<=22)) {
            $('#analysis8').css("display", "block");
			$(".shareText span").html("狮子座的生石花<br/>将会帮你：涨停");
        }
        else if((birth_month==8 && birth_day>=23 && birth_day<=31)||(birth_month==9 && birth_day>=1 && birth_day<=22)) {
            $('#analysis9').css("display", "block");
			$(".shareText span").html("处女座的红辉艳<br/>将会帮你：变瘦");
        }
        else if((birth_month==9 && birth_day>=23 && birth_day<=30)||(birth_month==10 && birth_day>=1 && birth_day<=23)) {
            $('#analysis10').css("display", "block");
			$(".shareText span").html("天秤座的令箭荷花<br/>将会帮你：脱单");
        }
        else if((birth_month==10 && birth_day>=24 && birth_day<=31)||(birth_month==11 && birth_day>=1 && birth_day<=22)) {
            $('#analysis11').css("display", "block");
			$(".shareText span").html("天蝎座的锦晃星<br/>将会帮你：加薪");
        }else if((birth_month==11 && birth_day>=23 && birth_day<=30)||(birth_month==12 && birth_day>=1 && birth_day<=21)) {
            $('#analysis12').css("display", "block");
			$(".shareText span").html("射手座的大型玉露<br/>将会帮你：艳遇");
        }
    }









});
