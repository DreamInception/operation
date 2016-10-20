/**
 * Created by GuoXiang on 2016/7/27.
 */
$(function(){
    var width = $(window).width(),
        height = $(window).height();
    init();
    function init(){
        $(".contentWrap").css("height",height);
        var width = $(".top").width();
        var circle_height = width*487/920;
        $(".top").css("height",circle_height).css("marginTop",height*0.047);
        $(".left_area").css("width",circle_height);
        $(".right_area").css("width",circle_height);
        $(".bottom").css("height",height*0.67);

    }

    $(".tabs li").on("click",function(){
        var $this = $(this);
        if(!$this.hasClass("activeTab")){
            $this.addClass("activeTab").siblings().removeClass("activeTab");
            var tabId = $this.data("tab");
            $(".friendCircle").hide();
            $("#"+tabId).show();
        }
    })
})