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




var goods_id = document.getElementById("goods_id").value;
$.ajax({
    url: '/flow/goods/GoodsPromote',
    type: 'POST',
    data: 'goods_id=' + goods_id,
    dataType: 'JSON',
    success: function (data) {
        if (data) {
            $(".a-good-infos").html(data.curr_html);
            $("#preview").append(data.icon_html);
            if (data.tax_html) {
                $("#taxation-tip").html(data.tax_html);
            } else {
                $("#taxation").hide();
            }

            setTimeout(function () {
                var tprice = $("#rel_price").attr('alt');
                if (tprice == "0.00" || tprice == 0) {
                    $(".sh-shopping-cart").addClass('disabled').html("暂时无法购买");
                }
                var HISTimeNew = new TimeRun($(".HIS_time_new"), 'D天H时I分S秒');
                HISTimeNew.run();
            }, 500);
        } else {
            $(".a-good-infos").html('获取商品信息失败!');
        }
    }
});
                       


var goods_cid = document.getElementById("goods_cid").value;
var goods_id = document.getElementById("goods_id").value;
$.ajax({
    url: '/flow/goods/GoodsSimilar',
    type: 'POST',
    data: 'goods_cid=' + goods_cid + '&goods_id=' + goods_id,
    dataType: 'text',
    success: function (data) {
        document.getElementById("final_buy").innerHTML = data;
    }
});
                 

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
   