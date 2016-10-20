/**
 * Created by GuoXiang on 2016/5/12.
 */
$(document).ready(function(){
    var step1Money = 910;
    var step2Money = 920;
    var step3Money = 930;
    if(window.sessionStorage.getItem("startmoney")==null ){
        window.sessionStorage.setItem("startmoney","900");
    }
    if(window.sessionStorage.getItem("currentStep")==null ){
        window.sessionStorage.setItem("currentStep",1);
    }
    var plantMoney = parseInt(window.sessionStorage.getItem("startmoney"));
    var currentStep = parseInt(window.sessionStorage.getItem("currentStep"));
function jumpPage() {
   if (plantMoney >= step1Money && currentStep == 1) {
        window.sessionStorage.setItem("startmoney", plantMoney);
        currentStep = 2;
        window.sessionStorage.setItem("currentStep",currentStep);
        window.location.href = "plant_2.html";

    }
    else if (plantMoney >= step2Money && currentStep == 2) {
        window.sessionStorage.setItem("startmoney", plantMoney);
        currentStep = 3;
        window.sessionStorage.setItem("currentStep",currentStep);
        window.location.href = "plant_3.html";
    }
    else if (plantMoney >= step3Money && currentStep == 3) {
        window.sessionStorage.setItem("startmoney", plantMoney);
        currentStep = 4;
        window.sessionStorage.setItem("currentStep",currentStep);
        window.location.href = "plant_4.html";
        //sessionStorage.clear();
    }
    //else {
    //    window.sessionStorage.setItem("startmoney", plantMoney);
    //    window.location.href = "plant_5.html";
    //    currentStep = 5;
    //    window.sessionStorage.setItem("currentStep",currentStep);
    //    $("#totalGold").text(plantMoney);
    //}
}
    setInterval(function () {
        plantMoney = plantMoney + 1;
        $("#currentMoney").text(plantMoney);
        jumpPage();
    }, 1000);
    var top = $('.pageRule').outerHeight();
    //	$('.pageRule').css({'bottom':-top + 'px'});
    $('.pageRule').css({'bottom':'0px'});

    addTouchListeners();
    function addTouchListeners() {
        document.getElementById("pageUp").addEventListener('touchstart', function(e) {
            my=e.touches[0].pageY;
        }, false);

        document.getElementById("pageUp").addEventListener('touchmove', function(e) {
            event.preventDefault();
        }, false);

        document.getElementById("pageUp").addEventListener('touchend', function(e) {

            if(my-e.changedTouches[0].pageY>=0){
                $(".pageRule").animate({bottom:"0px"},100);
                $(".pageUp").hide();
            }else{
                return false;
            }
        }, false);

        document.getElementById("pageRule").addEventListener('touchstart', function(e) {
            y=e.touches[0].pageY;
        }, false);

        document.getElementById("pageRule").addEventListener('touchmove', function(e) {
            event.preventDefault();
        }, false);

        document.getElementById("pageRule").addEventListener('touchend', function(e) {
            if(y-e.changedTouches[0].pageY<=0){
                $(".pageRule").animate({bottom:-top + "px"},100);
                $(".pageUp").show();
            }else{
                return false;
            }
        }, false);
    }



})
