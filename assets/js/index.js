$(function() {
    $('#out').on('click', function() {
        layer.confirm('确定退出吗?', function() {
            // 删除凭证
            localStorage.removeItem('token');
            //跳转到登录页面
            location.href = '/login.html';
            layer.close(index)
        })
    });
    getUserInfo()
});

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(response) {
            if (response.status !== 0) {
                return layer.msg('获取用户基本信息失败!' + response.message)
            }
            renderAvatar(response.data)
        }
    })
}
//根据昵称判断头像选择
function renderAvatar(res) {
    let name = res.nickname || res.username;
    $('#welcome').html('欢迎\t' + name)
    if (res.user_pic) {
        $('[class="text-avatar"]').css('display', 'none')
            .siblings('img').css('display', 'inline-block')
        $('[class="layui-nav-img"]').attr('src', res.user_pic)
    } else {
        $('[class="text-avatar"]').html(name[0].toUpperCase())
    }
}