/**
 * Created by GuoXiang on 2016/9/21.
 */
/**
 * Created by GuoXiang on 2016/9/8.
 */
$(function(){
    init();
    function init(){
        var btnWidth = $(".gainPrizeBtn").width();
        $(".gainPrizeBtn").css("height",btnWidth * 140 / 907);
    }
});

var prop_second_vm = new Vue({
    el: '#recommend-reg-container ',
    data: {
        sendTxt: '发送',
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
            errorMsg: '',
            //pswErrorMsg: ''
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
                    recomment: vm.recomment,
                    fromChannel: getUrlParam().channel || 'lotteryActivity',
                    //wechatToken: null
                }
            },function(data){
                window.location.href = "regSuccess.html";
            });

        },
        checkFormValid: function(msg1,msg2){
            var vm = this;
            if(msg1==null && msg2==null){
                vm.isDisable = false;
            }else{
                vm.isDisable = true;
            }
        },
        phoneblur: function(){
            var vm = this;
            if (/^1[3|4|5|6|7|8]\d{9}$/.test(vm.phoneNum)) {
                vm.validateForm.errorMsg = null;
            } else {
                vm.validateForm.errorMsg = '手机号格式不正确';
            }
            vm.checkFormValid(vm.validateForm.phoneErrorMsg,vm.validateForm.errorMsg);
        },
        pswblur: function(){
            var vm = this;
            if (/^(\w){6,20}$/.test(vm.password)) {
                vm.validateForm.errorMsg = null;
            } else {
                vm.validateForm.errorMsg = '登录密码6到20位';
            }
            vm.checkFormValid(vm.validateForm.phoneErrorMsg,vm.validateForm.errorMsg);
        }
    },
    ready: function(){
        this.getImgCode();
        var inviteNumber = decodeURIComponent(getUrlParam().telephone);
        if(inviteNumber && inviteNumber!=null && inviteNumber!="undefined"){
            this.recomment =  enycryptPhoneNum(inviteNumber);
        }else{
            this.recomment = null;
        }

    }
});


