	var userTele = "";
	var userId = "";
	$(document).ready(function() {
		init();
	});


	window.onload = function() {
		$("body").css("background","#f42f42");
		var tableSectionHeight =$(".tableSection").css("width").split("px")[0]*0.84;
		var tablePadding = tableSectionHeight*0.25;
		var tableHeight = (tableSectionHeight-tablePadding)*0.9

		//($(window).height() - $(".headImg").css("height").split("px")[0] - $(".buttonImg").css("height").split("px")[0]) * 0.8;
		//alert(tableSectionHeight);
		$(".inviteInfoArticle .tableSection").css("height", tableSectionHeight);
		//$(".bodyActicle .mytable").css("padding-top", tablePadding);
		$(".inviteInfoArticle .mytable").css("height", tableHeight);
		//alert($(".bodyActicle .tableSection").css("height"));
	};

	function init(){
		userId = storage.get("userId");
		//userId = '2016090513122648303';
		//初始化我的邀请列表
		initMyInvite();
	}

	function initMyInvite() {
		$.ajax({
			type: "get",
			url: "/api/user-award/"+userId+"/award-invest",
			dataType: "JSON",
			success: function(data) {
				/*var data = {success:true,data:[
					{user:'13611111111',state:'已投资'},
					{user:'13611112222',state:'未投资'},
					{user:'13611113333',state:'已投资'},
					{user:'13611114444',state:'未投资'},
					{user:'13611115555',state:'已投资'},
				]};*/
				/*if(data.success) {
					var orignalData = data.data;
					var hData = handleData(data.data);
				} else {
					alert(data.msg);
				}*/
				var orignalData = data;
				var hData = handleData(orignalData);
			},
			error: function() {
				alert("服务器错误!");
			}
		});
	}

	function handleData(data) {
		if(data.items.length == 0){
			$(".inviteInfoArticle .noTickets").css("display","block");
			$(".inviteInfoArticle .mytable").css("display","none");	
		}
		else{
			$(".inviteInfoArticle .noTickets").css("display","none");
			$(".inviteInfoArticle .mytable").css("display","block");	
			for(var i = 0; i < data.items.length; i++) {
			var mobile = data.items[i].userMobile;
			var ifInvest = data.items[i].flag;
			mobile = mobile.split('');
			mobile.splice(3, 4, '****');
			mobile = mobile.join('');
			if(ifInvest){
				$(".inviteInfoArticle .mytable tbody").append('<tr><td>'+mobile+'</td><td class="rightTd" style="color:red">'+"已投资"+"</td>");
			}
			else{
				$(".inviteInfoArticle .mytable tbody").append('<tr><td>'+mobile+'</td><td class="rightTd">'+"未投资"+"</td>");
			}

		}
		}
		
		return data;
	}
	
	function generateCode(){
		//获取手机号
		$.ajax({
			type: "get",
			url: "/api/user/"+userId,
			dataType: "JSON",
			success: function(data) {
				var url = "/operation/iphone-lottery/remmend-reg.html?telephone="+encodeURIComponent(data.userMobile);
				userTele = data.userMobile;
				//alert(userTele);
				if(!userTele||userTele == ""){
					alert("获取用户手机号失败");
					return;
				}
				window.location.href = '/operation/iphone-lottery/poster.html?telephone='+encodeURIComponent(userTele);

			},
			error: function() {
				alert("服务器错误!");
			}
		});
		
	}
	
