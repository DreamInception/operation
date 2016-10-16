/**
 * Created by GuoXiang on 2016/9/10.
 */
var sendMsgTxt = new function () {
    this.show = function(setTxt){

        var timer = null;
        var leftSecond = 60;
        var prop = true;
        setTxt(leftSecond+'s',prop);
        timer = setInterval(setRemainTime, 1000);

        function setRemainTime() {
            if (leftSecond > 0) {
                prop = true;
                setTxt(leftSecond+'s',prop);
                leftSecond--;
            }
            else{
                clearInterval(timer);
                prop = false;
                setTxt('重发',prop);
            }
        }
    }

}
function getUrlParam() {
    var result = new Object();
    var url = window.location.search;
    if(url.indexOf('?')!=-1){
        var str = url.substr(1);
        var strs = str.split("&");
        for(var i=0; i< strs.length; i++){
            var key = strs[i].split('=')[0];
            var value = strs[i].split('=')[1];
            result[key] = value;
        }
        return result;
    } else {
        return {};
    }
}

var injectHeaders = function(header){
    var h = header || {};
    h['Doro-client']='H5';
    return h;
}
var rest = new function(){
    var successCode = '0000';
    var invalidSession= '4001';

    this.post = function(request, dataHandler, errorHandler){
        Vue.http.post(request.url, request.data, {
            headers: injectHeaders(request.headers),
            params : request.params
        }).then(function (response) {
            rest.response(response, dataHandler);
        },function (response) {
            rest.error(response, errorHandler);
        });
    };

    this.get = function(request, dataHandler, errorHandler){
        var outtime=showMask();
        Vue.http.get(request.url, {
            headers: injectHeaders(request.headers),
            params : request.params
        }).then(function (response) {
            rest.response(response, dataHandler);
            hideMask(outtime);
        },function (response) {
            rest.error(response, errorHandler);
            hideMask(outtime);
        });
    };

    this.put = function(request, dataHandler, errorHandler){
        var outtime=showMask();
        Vue.http.put(request.url, request.data, {
            headers: injectHeaders(request.headers),
            params : request.params
        }).then(function (response) {
            rest.response(response, dataHandler);
            hideMask(outtime);
        },function (response) {
            rest.error(response, errorHandler);
            hideMask(outtime);
        });
    };

    this.response = function(response, dataHandler, errorHandler){
        var responseData = response.data;
        if(dataHandler){
            dataHandler(responseData);
        }
    };

    this.error = function(response, errorHandler){
        var responseData = response.data;
        if( responseData==null){
            return;
        }
        if(responseData.error){
            var err = responseData.error;
            if(errorHandler){
                errorHandler(responseData);
            } else {
                alert(err.message + '('+err.code+')');
            }
            if(err.code == invalidSession){
                storage.set('userId', null);
                storage.set('user', null);
                window.location.href = '/h5/html/user/login.html?from='+ encodeURIComponent(window.location.pathname+window.location.search);
            }
        } else if (responseData.status){
            alert(responseData.statusText+'('+responseData.status+')');
        }
    }
}