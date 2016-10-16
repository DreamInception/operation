/**
 * Created by GuoXiang on 2016/9/22.
 */
var auth_vm = new Vue({
    el: '#authentication_container',
    data:{
        tokenKey: null,
        validateUrl: '/api/app-auth-login/{tokenKey}/authentication',
        userId: null,
        redirectUrl: null
    },
    methods: {
        validateUser: function(){
            var vm = this;
            rest.get({
                url: '/api/app-auth-login/'+vm.tokenKey+'/authentication'
            },function(data){
                vm.userId = data.userId;
                vm.redirectUrl = data.redirectUrl;
                //alert(vm.userId);
                storage.set('userId',vm.userId);
                if(vm.redirectUrl){
                    window.location.href = vm.redirectUrl;
                }
            })
        }
    },
    ready: function(){
    	//alert("sssa");
        var vm = this;
        //if(getUrlParam.token==null){
        //    return;
        //}
        //vm.tokenKey = getUrlParam.token;
        var parm = getUrlParam();
        vm.tokenKey = parm.token;
        //vm.tokenKey = '	';
        vm.validateUser();
    }
})