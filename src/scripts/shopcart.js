
// 1. 获取数据;

function getMsg(){

      $.ajax("https://list.mogujie.com/search",
      {
            dataType:"jsonp"
      })
      .then(function(res){
            // console.log(res);
            renderPage(res.result.wall.list);
      })

}

var goodsJson = [];

function renderPage(json){
      goodsJson = json;
      var html = "";
      // 根据比例计算图片高度;
      json.forEach(function(ele){
            // console.log(ele);
            html += `   <div class="goods-box">
                              <div class="good-image">
                                    <img src="${ele.show.img}" width=${ 262 } height=${ parseInt(262 / ele.show.w * ele.show.h) } alt="">
                              </div>
                              <div class="good-title">
                                    <p>${ele.title}</p>
                              </div>
                              <div class="line"></div>
                              <div class="good-detail">
                                    <span class="detail-price">
                                          ${ele.price}
                                    </span>
                                    <div class="detail-start">
                                          <i>★</i>
                                          <span>${ele.itemMarks.split(" ")[0]}</span>
                                    </div>
                              </div>
                              <button class="btn-car" data-iid="${ele.iid}">加入购物车</button>
                        </div> `
      });
      
      // console.log(html);
      $(".container-goodslist").html(html);
}
getMsg();

// 购物车;

// 1. 所有的按钮绑定事件; 

$(".container-goodslist").on("click",".btn-car",handleCarClick);

function handleCarClick(event){
      var e = event || window.event;
      var target = e.target || e.srcElement;
      var iid = $(target).attr("data-iid");
      var nowMsg = findJson(iid)[0];
      addCar(nowMsg,iid);
}
// localStroage =>

// 1. 增删改查 ; setItem getItem length key() clear();
// 2. 遵循同源策略; 
// 3. 只能存储纯字符;


function addCar(nowMsg , iid){
      // 存数据;
      // 1. 因为我们要存的数据是对象,但是localstroage可以存储的数据只有字符;
      // object => string;
      $.extend(nowMsg , {count : 1});
      var sNowMsg = JSON.stringify(nowMsg);
      // console.log(sNowMsg);
      // 2. 如果直接进行存储的话会导致购物车里只有一个数据。如果要储存多个，那么购物车里的数据应该以数组为数据类型;
      
      // 3. 还是覆盖是为什么，因为如果已经有了数据,那么这时候我们会覆盖之前的数据;
      // 先把结构取出来 查看一下是否存在，如果存在，我就向里面拼接,如果不存在我再建立结构;

      if(!localStorage.cart){
            localStorage.setItem("cart",`[${sNowMsg}]`);
            return false;
      }
      // 如果存在对结构进行插入;

      // aMsg 变成数组了; localStorage 字符串转换成数组的数据;
      var aMsg = JSON.parse(localStorage.cart);

      // 如果存在数据就不push ， 而是增加 count 值;
      if(!hasIid(aMsg,iid)){
            aMsg.push(nowMsg);
      }

      //localStorage 重新设置；
      localStorage.setItem("cart",JSON.stringify(aMsg));

      console.log(JSON.parse(localStorage.cart));
}



function hasIid(aMsg,iid){
      for(var i = 0 ; i < aMsg.length ; i ++){
            if(aMsg[i].iid === iid){
                  aMsg[i].count ++;
                  return true;
            }
      }
      return false;
}
function findJson(iid){
      return  goodsJson.filter(function(item){
            return  item.iid === iid
      })
}

// 购物车获取;;

$(".car-item").on("mouseenter",function(){
      $(".car-list").show();

      // console.log(getCart())
     $(".car-list ul").html(renderCart());

})
$(".car-item").on("mouseleave",function(){
      $(".car-list").hide();
})

function getCart(){
      if(!localStorage.cart) return 0;
      var aMsg = JSON.parse(localStorage.cart);
      return aMsg;
}

function renderCart(){
      var html = "";
      var cart_json = getCart();
      if(!cart_json) return 0;
      for(var i = 0 ; i < cart_json.length ; i ++){
            html += `<li><img src="${cart_json[i].show.img}"> <span>${cart_json[i].price}</span> <span>${cart_json[i].count}</span></li>`
      }

      return html;
}

$("#clear").on("click",function(){
      localStorage.clear("cart");
})