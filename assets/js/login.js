$(function() {
    $('#goReg').on('click', function() {
        $('.regBox').show();
        $('.loginBox').hide();

    })
    $('#goLogin').on('click', function() {
        $('.loginBox').show()
        $('.regBox').hide()
    });

    //自定义验证规则
    let form = layui.form
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        same: function(value) {
            let pwd = $('.regBox [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!';
            }
        },
    });
    //发送注册ajax请求
    $('#reg_form').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: { username: $('.regBox [name=username]').val(), password: $('.regBox [name=password]').val() },
            success(response) {
                console.log(response);
                if (response.status !== 0) {
                    return layer.msg('用户名被占用，请更换其他用户名！', { icon: 2, time: 1000 })
                }
                layer.msg("注册成功！快去登录吧!", { icon: 1, time: 1000 });
                $('#goLogin').click()
            }
        })
    });
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success(response) {
                console.log(response);
                if (response.status !== 0) {
                    return layer.msg('登录失败!', { time: 2000 })
                }
                layer.msg('登录成功!欢迎加入!', { icon: 1, time: 1000 })
                    // 将token保存到原地存储方便以后访问有权限的接口
                localStorage.setItem('token', response.token);
                //登陆成功后让页面跳转
                location.href = '/index.html';
            }
        })
    })
})