$(document).ready(function(){

  	t = setInterval(function() {
  		 zd("addMoney");
  	}, 3000);

  	// setTimeout(function() {
  	// 	  fixedShow("hotspotWrap");
  	// }, 3000);



  	$(".hotClose").click(function(){
  		  $(".hotspotWrap").hide();
  	});

  	var top = $('.pageRule').outerHeight();
  //	$('.pageRule').css({'bottom':-top + 'px'});
  	$('.pageRule').css({'bottom':'0px'});
    
    //addTouchListeners();
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

    $(".pageShare").click(function(){
      	fixedShow("shareDiv");
      	$(".shareDiv").siblings().hide();
      	clearInterval(t);
    });

    $(".shareDiv").click(function(){
    		$(".shareDiv").hide();
    		$(".shareDiv").siblings().show();
    		$(".hotspotWrap").hide();
    		$(".addMoneyWrap").hide();
    })
});

zd("addMoney");

function zd(u){
  	var b=0;
  	var x=setInterval(function(){
      $("#"+u).css("left",(b++)%4<2?0:8 +'px');
    	if(b>5){clearInterval(x);b=0}
  	},50)
}

function fixedShow(id){
    var totalHeight = $(window).height() + 'px';
    $("#" + id).css("height",totalHeight);
    $("#" + id).show();
}
//
//function addGrowAmount(plant_grow_amount,plant_grow_speed_in_second){
//  plant_grow_amount = plant_grow_amount*1 + plant_grow_speed_in_second*1;
//  $('#currentMoney').text(plant_grow_amount.toFixed(2));
//
//    plant_grow_speed_in_second = plant_grow_speed_in_second + 1;
//  //if (plant_grow_amount > next_step_amount) {
//  //  location.reload();
//  //}
//  setTimeout(function(){
//    addGrowAmount();
//  }, 1000);
//}
var plantMoney = 900;
var step1Money = 910;
var step2Money = 920;
var step3Money = 930;
var currentStep = 0;


    if(plantMoney<=step1Money && currentStep!=1){
        window.location.href = "../plant_1.html";
        currentStep = 1;
    }
    else if(plantMoney<=step2Money && currentStep!=2){
        window.location.href = "../plant_2.html";
        currentStep = 2;
    }
    else if(plantMoney<=step3Money && currentStep!=3){
        window.location.href = "../plant_3.html";
        currentStep = 3;
    }
    else{
        window.location.href = "../plant_4.html";
        currentStep = 4;
        $("#totalGold").text(plantMoney);
    }



function addMoney(){
    plantMoney = plantMoney + 1;
    $("#currentMoney").text(plantMoney);
    setInterval(function(){
        addMoney();
    }, 1000);

}