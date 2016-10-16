/**
 * Created by GuoXiang on 2016/9/8.
 */
$(function(){
    var totalWidth = $(window).width();
    var totalHeight = totalWidth * 5138/1242;
    init.locateElement(totalWidth,totalHeight);
    var mySwiper = new Swiper('.swiper-container', {
        // Optional parameters
        loop: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        // autoHeight: true,
        // autoplay: true,
        slidesPerSlide: 1,
        speed: 1000,
        // Navigation arrows
        nextButton: '.propagete-button-next',
        prevButton: '.propagete-button-prev',
    });
    setInterval(function(){
        mySwiper.slideNext();
    }, 2000);
});
var prop_second_vm = new Vue({
    el: '#propagate-reg-container ',
    data: {
        sendTxt: '发送验证码',
        msgTxt: null,
        phoneNum: null,
        password: null,
        recomment: null,
        ticket: null,
        imgCodeText : null,
        isDisable: true,
        imgApiUrl : '/api/captcha',
        smsUrl: '/api/sms-captcha',
        regUrl: '/api/user',
        validateForm: {
            phoneErrorMsg: '',
            pswErrorMsg: ''
            //smsErrorMsg: null
        }
    },
    methods : {
        getImgCode : function () {
            var vm = this;
            rest.post({
                url: vm.imgApiUrl
            }, function(data){
                vm.$set('imgData','data:image/png;base64,' + data.image);
                vm.imgKey = data.imgKey;
            });
        },
        sendSms: function () {
            var vm = this;
            vm.sendTxt = '60s';
            sendMsgTxt.show(function (txt, prop) {
                vm.sendTxt = txt;
                vm.disableAttr = prop;
            });
            rest.post({
                url: vm.smsUrl,
                params:{
                    imgKey : vm.imgKey,
                    text: vm.imgCodeText
                },
                data: {
                    phone: vm.phoneNum,
                    type: 'register'
                }
            },function(data){
                vm.ticket = data.ticket;
            }, function(){
                vm.getImgCode();
            })
        },
        submitForm: function(){
            var vm = this;
            rest.post({
                url: vm.regUrl,
                params: {
                    ticket: vm.ticket,
                    text: vm.msgTxt
                },
                data: {
                    userMobile: vm.phoneNum,
                    userPwd: vm.password,
                    //recomment: null,
                    fromChannel: getUrlParam().channel || 'activity',
                    //wechatToken: null
                }
            },function(data){
                console.log(data.userId+'\n'+data.realNameChecked+'\n'+data.isBind);
                alertWin.show();
            });

        },
        closeWin: function(){
            var vm = this;
            alertWin.hide();
        },
        checkFormValid: function(msg1,msg2){
            var vm = this;
            if(msg1==null && msg2==null){
                vm.isDisable = false;
            }else{
                vm.isDisable = true;
            }
        }
    },
    ready: function(){
        this.getImgCode();
    }
});
prop_second_vm.$watch('phoneNum',function(val){
    var vm = this;
    if (/^1[3|4|5|6|7|8]\d{9}$/.test(val)) {
        vm.validateForm.phoneErrorMsg = null;
    } else {
        vm.validateForm.phoneErrorMsg = '手机号格式不对';
    }
    vm.checkFormValid(vm.validateForm.phoneErrorMsg,vm.validateForm.pswErrorMsg);
});
prop_second_vm.$watch('password',function(val){
    var vm = this;
    if (/^(\w){6,20}$/.test(val)) {
        vm.validateForm.pswErrorMsg = null;
    } else {
        vm.validateForm.pswErrorMsg = '登录密码6到20位';
    }
    vm.checkFormValid(vm.validateForm.phoneErrorMsg,vm.validateForm.pswErrorMsg);
});
//prop_second_vm.$watch('msgTxt',function(val){
//    var vm = this;
//    if (/^(\d){6}$/.test(val)) {
//        vm.validateForm.smsErrorMsg = null;
//        return true;
//    } else {
//        vm.validateForm.smsErrorMsg = '验证码必须是6位';
//        return false;
//    }
//    vm.checkFormValid(vm.validateForm.phoneErrorMsg,vm.validateForm.pswErrorMsg,vm.validateForm.smsErrorMsg);
//});


var alertWin = new function(){
    this.show = function(){
        if($(".propagate-reg-container").find(".maskBg").length==0){
            $(".propagate-reg-container").append("<div class='maskBg'></div>");
        }
        $(".reg-Win").show();
        $(".maskBg").show();
    },
    this.hide = function(){
        $(".reg-Win").hide();
        $(".maskBg").hide();
    }
}
var init = new function (){
    this.locateElement = function(width,height){
        var banner_height = height * 1264 / 5138;
        var banner_top = height * 1400 / 5138;
        var button_height = height * 285 / 5138;
        var button_top = height * 3440 / 5138;
        var alert_width = $(".reg-Win").width();
        $(".propagate-reg-container").css("height", height);
        $(".sc-pos").css({
            "height": banner_height,
            "top": banner_top
        });
        $(".banner").css("paddingTop", banner_height * 0.18);
        $(".reg-form-container").css("top", height * 2775 / 5138);
        $(".regBtn").css({
            "height": button_height,
            //"top": button_top
        });
        $(".sc-pos").css("paddingTop", banner_height * 0.083)
        $(".reg-Win").css("height",alert_width * 1076/911);
    }

}

