// <!-- Initialize Swiper -->
    var swiper = new Swiper('.swiper-container', {
      loop : true,
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
//二维码
$(".yg-phone").on("mouseenter",function(){
    $(".down_app").show();
})
$(".yg-phone").on("mouseleave",function(){
    $(".down_app").hide();
})
//二级菜单
$(".navcart").on("mouseenter",function(){
  $(".qb_fl").show();
})
$(".navcart").on("mouseleave",function(){
  $(".qb_fl").hide();
})

    


    