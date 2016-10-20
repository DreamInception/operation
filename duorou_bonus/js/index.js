$(function(){
    var width = $(window).width();
        height = $(window).height();
        msgHeight = $(".showMsg").height();
        salary = 0;
        appearance = 0;
        moral = 0;
        door_index = 1;
        door_status = false;
        pb_Status = false;
        rs_Status = false;
        ps_Status = true;
        rb_Status = true;
        clickCount = 0;
        tryCash = 0;
        flowSum = 0;
        moneySum = 0;
        phoneBill = 0;
        spendTime = 0;
    function showSection(id){
        var obj = $("#" + id);
        obj.show();
    }
    function hideSection(id){
        var obj = $("#" + id);
        obj.hide();
    }
    function doorToggle(){
        if(door_index==1){
            if(!door_status){
                $(".divDoor1 .close").hide();
                $(".divDoor1 .open").show();
                door_status = true;
            }
            else{
                $(".divDoor1 .open").hide();
                $(".divDoor1 .close").show();
                door_index++;
                door_status = false;
            }
        }else if(door_index==2){
            if(!door_status){
                $(".divDoor2 .close").hide();
                $(".divDoor2 .open").show();
                door_status = true;
            }
            else{
                $(".divDoor2 .open").hide();
                $(".divDoor2 .close").show();
                door_index++;
                door_status = false;
            }
        }else{
            if(!door_status){
                $(".divDoor3 .close").hide();
                $(".divDoor3 .open").show();
                door_status = true;
            }
            else{
                $(".divDoor3 .open").hide();
                $(".divDoor3 .close").show();
                door_index = 1;
                door_status = false;
            }
        }
    }
    function light_Rotate(id,light_status){
        if(!light_status){
            $("#"+id).rotate({
                angel: -2,
                animateTo: 2,
                center: ["50%","0"],
                during: 300
            })
            light_status =  true;
        }else if(light_status){
            $("#"+id).rotate({
                angel: 2,
                animateTo: -2,
                center: ["50%","0"],
                during: 300
            })
            light_status = false;
        }
        return light_status;
    }

    function getRandomNum(min,max){
        var range = max - min;
            sNum = Math.random();
            result = min + Math.round(range * sNum);
            console.log("generate random num is"+ result);
        return result;
    }

    function getRandomDec(min,max) {
        var min = min * 10;
        max = max * 10;
        var range = max - min;
        sNum = Math.random();
        result = min + Math.round(range * sNum);
        console.log("generate random num is" + result);
        result = result / 10;
        return result;
    }
    function cal_Time(){
        var timer = setInterval(function(){
            min = parseInt($(".minute").html());
            sec = parseInt($(".second").html());
            console.log("min="+min+"sec="+sec);
            leftTime = min * 60 + sec;

            if(leftTime>0){
                leftTime--;
                var first = parseInt(leftTime / 60);
                second = leftTime % 60;
                $('.minute').html('0'+first);
                if(second<10){
                    $('.second').html('0'+second);
                }else{
                    $('.second').html(second);
                }
            }
            else {
                spendTime = 90;
                saveData();
                window.location.href = "lastPage.html";
                console.log("spend time on find red pocket"+spendTime);
                clearInterval(timer);

            }

        },1000);

    }
    function saveData(){
        var storage = window.sessionStorage;
        storage.setItem("tryCash",tryCash);
        storage.setItem("flowSum",flowSum);
        storage.setItem("moneySum",moneySum);
        storage.setItem("phoneBill",phoneBill);
        storage.setItem("spendTime",spendTime);
        storage.setItem("clickCount",clickCount);
    }
    init();
    function init(){
        $(".played_txt").css("padding-top",height*0.33);
        $(".readLink").css("padding-top",height*0.09);
        $(".passLink").css("padding-top",height*0.11);
        $(".div_element").css("height",height*0.5);
        $(".monkey").css("padding-top",height*0.145);
        $(".div_Btn").css("bottom",height*0.134);
        $(".div_moneyBtn").css("top",height*0.705);
        $(".div_findBtn").css("bottom",height*0.114);
        $(".inputBox1,.inputBox2,.inputBox3").css("padding-top",height*0.5);
        $(".divTitle").css("padding-top",height*0.053);
        $(".divDoor1,.divDoor2,.divDoor3").css("padding-top",height*0.45);
        $(".close img").css("height",height*0.407);
        $(".open img").css("height",height*0.42);
        $(".cap").css("padding-top",height*0.03);
        $(".maskBg").css("height",parseInt(height)-parseInt(msgHeight));
        $(".showWindow").css("margin-top",height*0.34);
        setInterval(function(){
            pb_Status = light_Rotate("pinkBig",pb_Status);
            rs_Status = light_Rotate("redSmall",rs_Status);
            ps_Status = light_Rotate("pinkSmall",ps_Status);
            rb_Status = light_Rotate("redBig",rb_Status);
        },1000);
        $("#jump").click(function(){
            movePage1();
        })

        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
        $('body').on('dblclick', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });

        $("#readLink").click(function(){
            $("#played").hide();
            $("#jump").unbind("click");
        })
        $("#passLink").click(function(){
            $("#passed").hide();
            $("#jump").unbind("click");
        })
    }
    function movePage1(){
        hideSection("page0");
        showSection("page1");
        $('select').niceSelect();
        $("#submit1").click(function(){
            salary = parseInt($("#salary option:selected").val());
            appearance = parseInt($("#appearance option:selected").val());
            moral = parseInt($("#moral option:selected").val());
            console.log("save salary value is "+parseInt($("#salary option:selected").val()));
            console.log("save appearance value is "+parseInt($("#appearance option:selected").val()));
            console.log("save moral value is "+parseInt($("#moral option:selected").val()));
            movePage2();
        });

    }

    function movePage2(){
        hideSection("page1");
        showSection("page2");
        appTxt = encodeURIComponent($("#appearance option:selected").text());
        moralTxt = encodeURIComponent($("#moral option:selected").text());
        console.log("encode appearance is"+appTxt);
        console.log("encode moral is"+moralTxt);
        $("#yApp").text(decodeURIComponent(appTxt));
        $("#yMoral").text(decodeURIComponent(moralTxt));
        console.log("decode appearance is"+decodeURIComponent(appTxt));
        console.log("decode moral is"+decodeURIComponent(moralTxt));
        tryCash = getRandomNum(6000,25000);
        $("#money").text(tryCash);

        $("#submit2").click(function(){
            movePage3();
        });
    }
    function movePage3(){
        hideSection("page2");
        showSection("page3");
        setInterval(doorToggle,500);
        $(".divDoor1").click(function(){
            moveSubPage1();
        });
        $(".divDoor2").click(function(){
            moveSubPage2();
        });
        $(".divDoor3").click(function(){
            moveSubPage3();
        });
    }
    function moveSubPage1(){
        hideSection("page3");
        showSection("subPage1");
        cal_Time();
        $("#page1_Up,#page1_Mid,#page1_Down").bind("click",function(){
            $("#maskBg1").show();
            if(clickCount==0){
                $("#showMsg1").show();
                $("#trySalary1").show();
                $("#pocketNum1").text("1/3");
                $("#tryNum1_0").text(tryCash);
                $("#tryNum1_1").text(tryCash+"元");
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg1").show();
                    $("#trySalary1").show();
                });
            }
            else if(clickCount==1){
                $("#empty1").show();
                $("#pocketNum1").text("2/3");
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg1").show();
                    $("#empty1").show();
                });
            }else if(clickCount==2){
                $("#phoneBill").show();
                $("#selectBtn1_1").hide();
                $("#selectBtn1_2").show();
                $("#pocketNum1").text("3/3");
                phoneBill = 5;
                $("#phoneTax1_0").text(phoneBill);
                $("#phoneTax1_1").text(phoneBill+'元');
                clickCount++;
            }
            console.log("find red pocket number="+clickCount);
        })
        $("#selectBtn1_1").click(function(){
            $("#maskBg1").hide();
            $(".showWindow").find(".swo").hide();
        })
        $("#selectBtn1_2").click(function(){
            min = parseInt($(".minute").html());
            sec = parseInt($(".second").html());
            leftTime = min * 60 + sec;
            spendTime = 90 - leftTime;
            saveData();
            window.location.href = "lastPage.html";
            console.log("spend time on find red pocket"+spendTime);
        })

    }
    function moveSubPage2(){
        hideSection("page3");
        showSection("subPage2");
        cal_Time();
        $("#page2_Up,#page2_Mid,#page2_Down").bind("click",function(){
            $("#maskBg2").show();
            if(clickCount==0){
                $("#showMsg2").show();
                $("#trySalary2").show();
                $("#pocketNum2").text("1/3");
                $("#tryNum2_0").text(tryCash);
                $("#tryNum2_1").text(tryCash+"元");
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg2").show();
                    $("#trySalary2").show();
                });
            }
            else if(clickCount==1){
                $("#mobileFlow").show();
                $("#pocketNum2").text("2/3");
                flowSum = getRandomNum(30,50);
                $("#flowNum2_0").text(flowSum);
                $("#flowNum2_1").text(flowSum+'M');
                clickCount++;
            }
            else if(clickCount==2){
                $("#empty2").show();
                $("#selectBtn2_1").hide();
                $("#selectBtn2_2").show();
                $("#pocketNum2").text("3/3");
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg2").show();
                    $("#empty2").show();
                });
            }
            console.log("find red pocket number="+clickCount);
        })
        $("#selectBtn2_1").click(function(){
            $("#maskBg2").hide();
            $(".showWindow").find(".swo").hide();
        })
        $("#selectBtn2_2").click(function(){
            min = parseInt($(".minute").html());
            sec = parseInt($(".second").html());
            leftTime = min * 60 + sec;
            spendTime = 90 - leftTime;
            saveData();
            window.location.href = "lastPage.html";
            console.log("spend time on find red pocket"+spendTime);
        })
    }
    function moveSubPage3(){
        hideSection("page3");
        showSection("subPage3");
        cal_Time();
        $("#page3_Up,#page3_Mid,#page3_Down").bind("click",function(){
            $("#maskBg3").show();
            if(clickCount==0){
                $("#showMsg3").show();
                $("#trySalary3").show();
                $("#pocketNum3").text("1/3");
                $("#tryNum3_0").text(tryCash);
                $("#tryNum3_1").text(tryCash+'元');
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg3").show();
                    $("#trySalary3").show();
                });
            }
            else if(clickCount==1){
                $("#empty3").show();
                $("#pocketNum3").text("2/3");
                clickCount++;
                $(this).unbind("click").bind("click",function(){
                    $("#maskBg3").show();
                    $("#empty3").show();
                });
            }else if(clickCount==2){
                $("#cashSum").show();
                $("#selectBtn3_1").hide();
                $("#selectBtn3_2").show();
                $("#pocketNum3").text("3/3");
                moneySum = getRandomDec(0.6,1.5);
                $("#moneyNum3_0").text(moneySum);
                $("#moneyNum3_1").text(moneySum+"元");
                clickCount++;
            }
            console.log("find red pocket number="+clickCount);
        })
        $("#selectBtn3_1").click(function(){
            $("#maskBg3").hide();
            $(".showWindow").find(".swo").hide();
        })
        $("#selectBtn3_2").click(function(){
            min = parseInt($(".minute").html());
            sec = parseInt($(".second").html());
            leftTime = min * 60 + sec;
            spendTime = 90 - leftTime;
            saveData();
            window.location.href = "lastPage.html";
            console.log("spend time on find red pocket"+spendTime);
        })
    }

});