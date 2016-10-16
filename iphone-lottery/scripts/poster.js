/**
 * Created by GuoXiang on 2016/9/22.
 */
window.onload = function(){
	judgeDecive();
}
var poster_vm = new Vue({
    el: '#poster_container',
    data: {

        mergeImg: null,
        codeImg: null
    },
    methods: {
        //merger: function(bgimgElement, qrimgElement){
        //    var bgimg = bgimgElement;
        //    var qrimg = qrimgElement;
        //
        //    var bgimgWidth = bgimg.width;
        //    var bgimgHeight = bgimg.height;
        //    alert(bgimgWidth);
        //    var qrimgWidth = qrimg.width;
        //    var qrimgHeight = qrimg.height;
        //    var drwwidth = (bgimgWidth - qrimgWidth) / 2;
        //    var drwheight = bgimgHeight - 200 - qrimgHeight;
        //    var canvas = document.createElement("canvas");
        //    canvas.width = bgimgWidth;
        //    canvas.height = bgimgHeight;
        //    var ctx = canvas.getContext("2d");
        //    ctx.drawImage(bgimg, 0, 0, bgimgWidth, bgimgHeight);
        //    ctx.drawImage(qrimg, drwwidth, drwheight, qrimg.width, qrimg.height);
        //    var dataurl = canvas.toDataURL('image/jpeg');
        //    return dataurl;
        //}
    },
    ready: function(){
        //var userTele = storage.get(userTele);
        var parm = getUrlParam();
        var telephone = parm.telephone;
 		var urlHeader = window.location.href.split("/operation")[0];
        var contentVal = urlHeader+"/operation/iphone-lottery/remmend-reg.html?telephone="+telephone;
        var url = "/api/qrcode?content="+encodeURIComponent(contentVal);
       // this.codeImg = "/api/qrcode?content="+encodeURIComponent(contentVal);
       window.onload = function(){
        $("#poster_container").append("<img src="+url+" class='codeImg' id='codeImg' style='display:none'>");
        var _this = this;
        
        document.getElementById("codeImg").onload = function(){
        	var mergeUrl = merger(document.getElementById("orginImg"),document.getElementById("codeImg"));
        	$("#mergeImg").attr("src",mergeUrl);
        	document.getElementById("mergeImg").onload = function(){    		
                $(".bgImg").hide();
                $(".mergeImg").show();
        	}
           }
        }
    }
})
function merger(bgimgElement, qrimgElement) {
           /* var bgimg = bgimgElement;
            var qrimg = qrimgElement;
            var bgimgWidth = bgimg.width;
            var bgimgHeight = bgimg.height;
            var qrimgWidth = qrimg.width;
            var qrimgHeight = qrimg.height;
            var drwwidth = (bgimgWidth - qrimgWidth) / 2;
            var drwheight = bgimgHeight - 200 - qrimgHeight;
            var canvas = document.createElement("canvas");
            canvas.width = bgimgWidth;
            canvas.height = bgimgHeight;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(bgimg, 0, 0, bgimgWidth, bgimgHeight);
            ctx.drawImage(qrimg, drwwidth, drwheight, qrimg.width, qrimg.height);
            var dataurl = canvas.toDataURL('image/jpeg');
            return dataurl;*/
            
                var bgimg = bgimgElement;
    var qrimg = qrimgElement;

    var bgimgWidth = bgimg.width;
    var bgimgHeight = bgimg.height;

    var qrimgWidth = qrimg.width;
    var qrimgHeight = qrimg.height;
    alert(qrimgHeight);
    var drwwidth = (bgimgWidth - qrimgWidth) / 2;
    var drwheight = bgimgHeight - 200 - qrimgHeight;
    var canvas = document.createElement("canvas");
    canvas.width = bgimgWidth;
    canvas.height = bgimgHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(bgimg, 0, 0, bgimgWidth, bgimgHeight);
    ctx.drawImage(qrimg, drwwidth, drwheight, qrimg.width, qrimg.height);
    var dataurl = canvas.toDataURL('image/jpeg');
    return dataurl;

        }


function judgeDecive(){
	var result = getDeviceinfo();
	if(result.ios){
		$("#img1").css("display","block");
		$("#img2").css("display","none");
	}
	else if(result.android){
		$("#img2").css("display","block");
		$("#img1").css("display","none");
	}
	else{
		$("#img1").css("display","block");
		$("#img2").css("display","none");
	}
}


