/**
 * Created by GuoXiang on 2016/9/8.
 */
$(function(){
    var totalWidth = $(window).width();
    var totalHeight = totalWidth * 4122/1242;
    init(totalWidth,totalHeight);
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
function init(width,height){
    var banner_height = height * 1264/4122;
    var banner_top = height * 1384/4122;
    var button_height = height * 285/4122;
    var button_top = height * 2695/4122;
    $(".propagate-activity-container").css("height",height);
    $(".sc-pos").css({
        "height":banner_height,
        "top":banner_top
    });
    $(".banner").css("paddingTop",banner_height*0.18);
    $(".downloadBtn").css({
        "height": button_height,
        "top": button_top
    });
    $(".sc-pos").css("paddingTop",banner_height* 0.083)

}