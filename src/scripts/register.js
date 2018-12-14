
$('.code_refresh').click(function () {
    $(this).prev().click();
});
        
document.getElementById("btn").onclick=function(){
        verification_code1(2);
}
function verification_code1(num){
    var coddds = $("#activeuser").val();
    var sj_code = document.getElementById('mobile_activation').value;
    var yaz_ma =$("#yaz_ma_pcheck_code2").val();
    //alert(yaz_ma);
    if(sj_code == ''){
        $('#mobile_activation').after("<div class='ztips'>请输入您来电订购时登记的手机号码</div>");
        wait=0;
        return;
    }else if(coddds !=''){
        wait=0;
        return;
    }
    var json_data="";
    $.ajax({
            type : 'post',
            url : '/flow/auth/sendverifycode',
            data : {
                "username" : sj_code , 
                "nameType" : "mobile" , 
                "num"      : 211 ,
                "type" : "regist" , 
                "code" : $("#yaz_ma_pcheck_code2").val()
            },
            dataType : 'json',
            success : function(data)
            {
                if(data.code == -400604) {
                    alert('每天只能发送五条短信！');
                    $('#check_box_code'+num).val(0);
                }
                else if(data.code == -400605) {
                    alert('短信发送间隔不得少于90秒！');
                    $('#check_box_code'+num).val(0);
                } else if(data.code==-400601){
                    $('#check_box_code'+num).val(0);
                    $("#yaz_ma_pcheck_code2").after('<div id="aaacheck" class="etips">验证码错误！</div>');
                    var codesrc = $("#checkcode2").attr("src");
                    $("#checkcode2").attr("src",codesrc + "&random=" + Math.random());
                } else if(data.code !== 0){
                    $('#check_box_code'+num).val(0);
                    $('#sj_code').after('<div class="ztips" id="iphoness">请输入常用手机号，避免忘记</div>');
                } else {
                    $('#check_box_code'+num).val(1);
                    $("#iphoness").remove();
                    $("#aaacheck").remove();
                    time(document.getElementById("btn"),2);
                }
                $('#aaab').remove();
            }
    });
}

var wait = 90;
function time(o, num) {

    if (wait == 0) {
        o.removeAttribute("disabled", false);
        $('#ymztip').remove();
        o.value = "获取短信验证码";
        codesrc = document.getElementById("checkcode" + num).src;
        document.getElementById("checkcode" + num).src = codesrc + "&random=" + Math.random();
        wait = 90;
    } else {
        o.setAttribute("disabled", true);
        o.value = "重新发送(" + wait + '秒' + ")";

        if (wait == 90) {
            $("#btn5").after('<div id="ymztip" class="etips">验证码已经发送,请查收!</div>');
        }
        if (wait <= 87) {
            $("#ymztip").remove();
        }
        wait--;
        setTimeout(function(){
                time(o, num)
            },
        1000);

    }
}

document.getElementById("btn5").onclick = function () {
    if ($("#etips").length > 0) {
        return false;
    } else {
    }
    verification_code(1);

};

function verification_code(num) {
    var sj_code = document.getElementById('sj_code').value;
    if (sj_code == "") {
        $('#sj_code').after('<div class="ztips" id="etips">请输入常用手机号，避免忘记</div>');
        return false;
    }
    var check_code = $("#yaz_ma_pcheck_code").val();
    if (check_code == "") {
        $("#yaz_ma_pcheck_code").after('<div id="aaacheck" class="etips">验证码错误！</div>');
        return false;
    }
    var json_data = "";
    json_data += '&username' + '=' + sj_code + '&code=' + check_code + "&num=1";
    $.ajax({
        type: 'post',
        url: '/flow/auth/sendverifycode',
        data: json_data,
        dataType: 'json',
        success: function (date) {
            if (date.code == -400604) {
                alert('每天只能发送五条短信！');
                $('#check_box_code' + num).val(0);
            }
            else if (date.code == -400605) {
                alert('短信发送间隔不得少于90秒！');
                $('#check_box_code' + num).val(0);

            } else if (date.code == -400601) {
                $('#check_box_code' + num).val(0);
                $("#yaz_ma_pcheck_code").after('<div id="aaacheck" class="etips">验证码错误！</div>');
                codesrc = document.getElementById("checkcode1").src;
                document.getElementById("checkcode1").src = codesrc + "&random=" + Math.random();
            } else if (date.code !== 0) {
                $('#check_box_code' + num).val(0);
                $('#sj_code').after('<div class="ztips" id="iphoness">请输入常用手机号，避免忘记</div>');
                alert(data.msg);
            } else {
                $('#check_box_code' + num).val(1);
                $("#iphoness").remove();
                $("#aaacheck").remove();
                time(document.getElementById("btn5"), 1);
            }
            $('#aaab').remove();
        }
    })

}

$('.code_refresh').click(function(){
    $(this).prev().click();
});