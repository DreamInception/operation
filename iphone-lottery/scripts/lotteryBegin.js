		var userId = 1;
		$(document).ready(function() {
			init();
			window.history.forward(1); 
		});
		
		window.onload = function() {
			var per1 = 0.405;
			var articleHeight = $(".lotteryArticle").height();
			var topFontHeight1 = articleHeight*per1;
			$(".lotteryArticle .myTicketSection ").css("top",topFontHeight1);
			
			var per2 = 0.11;
			var topFontposition1 = articleHeight*per2;
			$(".lotteryArticle .fontPostion7 ").css("top",topFontposition1);
			
			var per3 = 0.06;
			var haveTicketTableHeight = articleHeight*per3;
			$(".lotteryArticle .mytable ").css("height",haveTicketTableHeight);
			
			var myTicketSectionHeight = $(".myTicketSection").css("height").split("px")[0];
			
		};
		
		function init(){
			userId = storage.get("userId");
			//alert(userId);
			//userId = "2016080913818284481";
			//userId = "11";
			//获取奖券信息
			getMyTicket();
		}
	
		function getMyTicket() {
			$.ajax({
				type: "get",
				url: "/api/user-ticket/"+userId+"/user-ticket",
				dataType: "json",
				success: function(data) {
					var orignalData = data;
					/*orignalData  = 
					{
						"count": 2,
						"items": [
						{
							"userId": 1,
							"ticketAutoId": 1234560,
							"ticketFrom": "活动1",
							"createTime": "2016-09-21 15:56:14"
						},
						{
							"userId": 1,
							"ticketAutoId": 1234561,
							"ticketFrom": "活动2",
							"createTime": "2016-09-21 15:56:14"
						},
						{
							"userId": 1,
							"ticketAutoId": 1234562,
							"ticketFrom": "活动3",
							"createTime": "2016-09-21 15:56:14"
						},
						{
							"userId": 1,
							"ticketAutoId": 1234563,
							"ticketFrom": "活动4",
							"createTime": "2016-09-21 15:56:14"
						},
						{
							"userId": 1,
							"ticketAutoId": 1234564,
							"ticketFrom": "活动5",
							"createTime": "2016-09-21 15:56:14"
						}
						]
					}*/
					
					var amount1 = orignalData.items.length;
					amount1 += "张";
					$("#myTCount").text(amount1);
					var num = (amount1+"").length;
					$(".lotteryArticle .fontPostion3").css("left",(27-num*1)+"%");
					
					var amount2 = orignalData.count+"张";
					//amount2 += "张";
					$("#totalTCount").text(amount2);
					var num = (amount2+"").length;
					$(".lotteryArticle .fontPostion5").css("left",(70-num*1)+"%");
					
					if(orignalData.items.length > 0){
						$(".noTickets").css("display","none");
						$(".haveTickets").css("display","block");
						
						handleTableData(orignalData.items);
					}
					else{
						$(".haveTickets").css("display","none");
						$(".noTickets").css("display","block");
					}
					
				},
				error: function() {
					//testAmout();
					alert("服务器错误!");
				}
				});
		}
	
		function handleTableData(data) {
			//默认取前三条
			var count = data.length<3?data.length:3;
			for(var i = 0; i < count; i++) {
				var num = i+1;
				var lotteryNum = data[i].ticketAutoId;
				var lotteryFrom = data[i].ticketFrom;
				$(".lotteryArticle .mytable tbody").append('<tr><td>'+num+'</td><td class="rightTd">'+lotteryNum+'</td><td class="rightTd">'+lotteryFrom+'</td>');
	
			}
			return data;
		}
		
		function showMyTicket(){
			window.location.href = 'prizeResult.html';
		}
		
		function testAmout(){
					var amount1 = 12222+"张";
					$("#myTCount").text(amount1);
					var num = (amount1+"").length;
					$(".lotteryArticle .fontPostion3").css("left",(26-num*1)+"%");
					
					var amount2 = 11324+"张";
					$("#totalTCount").text(amount2);
					var num = (amount2+"").length;
					$(".lotteryArticle .fontPostion5").css("left",(69-num*1)+"%");
					
					if(orignalData.items.length > 0){
						$(".noTickets").css("display","none");
						$(".haveTickets").css("display","block");
						
						handleTableData(orignalData.items);
					}
					else{
						$(".haveTickets").css("display","none");
						$(".noTickets").css("display","block");
					}
		}
