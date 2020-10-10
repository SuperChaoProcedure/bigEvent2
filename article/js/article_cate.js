$(function() {
        //数据渲染
        render_cate()
            //给添加分类绑定事件
        $('#add_cate').click(function() {
            let index = layer.open({
                title: '添加文章分类',
                content: $('#article_tpl').html(),
                type: 1,
                area: ['500px', '250px'],
            });
            //监听表单提交事件
            $('[class="layui-form"]').on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    method: 'POST',
                    url: '/my/article/addcates',
                    data: $(this).serialize(),
                    success: function(response) {
                        if (response.status !== 0) {
                            return layer.msg(response.message)
                        }
                        layer.msg(response.message)
                        render_cate()
                    }
                })
                layer.close(index)
            })
        });

        //添加删除功能
        //1.委托删除按钮绑定事件给tbody
        $('tbody').on('click', '#delete', function() {
                //2.获取当前点击按钮中行的id
                let id = $(this).attr('data-id');
                //删除提示
                layer.confirm('Are you sure you want to delete?', { icon: 3, title: '提示' }, function(index) {
                    // 3.发起ajax请求
                    $.ajax({
                        method: 'GET',
                        url: '/my/article/deletecate/' + id,
                        success(response) {
                            if (response.status !== 0) {
                                return layer.msg(response.message, { time: 1000 })
                            }
                            layer.msg(response.message, { time: 1000 })
                                //4.渲染删除后的数据
                            render_cate()
                            layer.close(index)
                        }
                    })
                })
            })
            //添加编辑功能
            //1.委托删除按钮绑定事件给tbody
        $('tbody').on('click', '#edit', function() {
            let edit = layer.open({
                title: '添加文章分类',
                content: $('#edit-content').html(),
                type: 1,
                area: ['500px', '250px'],
            });
            //1.获取当前行id
            let id = $(this).attr('data-id');

            getData(id)
            $('#change-form').on('submit', function(e) {
                e.preventDefault();
                $.ajax({
                    method: 'POST',
                    url: '/my/article/updatecate',
                    data: $(this).serialize(),
                    success: function(response) {
                        if (response.status !== 0) {
                            return layer.msg(response.message)
                        }
                        //更新成功提示
                        layer.msg(response.message, { time: 1000 })
                        render_cate()
                        layer.close(edit)
                    }
                })
            })
        });

    })
    //渲染分类数据
function render_cate() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success(response) {
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            let htmlFragment = template('Render', response.data)
            $('tbody').html(htmlFragment)
        }
    })
}
//根据id获取且填充数据
function getData(id) {
    //根据 Id 获取文章分类数据
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success(response) {
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            // 填充数据
            //这种填充方式可以给所有name属性添加值 为后面发起更新数据ajax做准备
            layui.form.val("formTest", response.data);
        }
    })
}