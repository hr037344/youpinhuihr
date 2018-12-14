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







var goods_cid = document.getElementById("goods_cid").value;
var goods_id = document.getElementById("goods_id").value;
$.ajax({
    url: '/flow/goods/GoodsGuess',
    type: 'POST',
    data:'goods_cid='+goods_cid+'&goods_id='+goods_id,
    dataType: 'text',
    success: function(data){
        document.getElementById("all_watching").innerHTML = data;
    }
});
   