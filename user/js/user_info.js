$(function() {
    //表单验证
    layui.form.verify({
        email: [/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, '邮箱格式不正确,请检查!', ],
        nickname: [
            /^[\S]{1,6}$/, '字符必须1到6位，且不能出现空格'
        ],
    });
    getUserInfo()
    $('#reset').click(function() {
        getUserInfo()
    })

});

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(response) {
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            layui.form.val('formTest', response.data)
        }
    });
    $('[class="layui-form"]').submit(function(e) {
        e.preventDefault();
        console.log($(this).serialize());
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(response) {
                if (response.status !== 0) {
                    return layer.msg(response.message)
                }
                layer.msg(response.message);
                window.parent.getUserInfo()
            }
        })
    })
}