/**
 * Created by GuoXiang on 2016/1/31.
 */
$(function(){

    var height = $(window).height();
    init();
    function init(){
        $(".express").css("padding-top",height*0.1);
        $(".buttons").css("top",height*0.64);
        $(".belTxt").css("top",height*0.8);
        $(".sharePrize").css("padding-top",height*0.02);
        $(".grade").css("padding-top",height*0.062);
        $(".rule_Cap").css("padding-top",height*0.1);
        $(".rule_Txt").css("padding-top",height*0.062);
        $("#sharePrize").click(function(){
            $("#maskPage").show();
        })
        $("#maskPage").click(function(){
            $(this).hide();
        })
        addText();
        $('body').on('touchmove', function (event) {
            event.preventDefault();
        });
        $('body').on('dblclick', function (event) {
            event.preventDefault();
            event.stopPropagation();
        });
        $("#detail").click(function(){
            $("#maskRule").show();
        })
        $("#maskRule").click(function(){
            $(this).hide();
        })
    }
    function addText(){
        var storage = window.sessionStorage;
            tryCashNum = storage.getItem("tryCash");
            flowNum = storage.getItem("flowSum");
            moneyNum = storage.getItem("moneySum");
            pbNum = storage.getItem("phoneBill");
            timeNum = storage.getItem("spendTime");
            click_Count = storage.getItem("click_Count");
        $("#seconds").text(timeNum);
        $("#tryTxt").text(tryCashNum+"元");
        if(flowNum>0){
            $("#option").text(flowNum+'M');
            $("#optionTxt").text("流量红包");
        }
        else if(moneyNum>0){
            $("#option").text(moneyNum+'元');
            $("#optionTxt").text("现金红包");
        }
        else if(pbNum>0){
            $("#option").text(pbNum+'元');
            $("#optionTxt").text("话费红包");
        }
    }












})