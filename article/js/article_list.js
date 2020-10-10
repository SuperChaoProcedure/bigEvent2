$(function() {
    //执行一个laypage实例
    layui.laypage.render({
        elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
        count: 50, //数据总数，从服务端得到
        limit: 10,
        first: 2,
        limits: [2, 4, 8, 10, 20],
        jump: function(obj, first) {
            //obj包含了当前分页的所有参数，比如：
            // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
            // console.log(obj.limit); //得到每页显示的条数

            //首次不执行
            if (!first) {
                //do something
            }
        }
    });
    initData()


})

function initData() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success(response) {
            if (response.status !== 0) {
                return layer.msg(response.message)
            }
            let htmlFragment = template('category', response.data)
            $('[name="cate_gory"]')[0].insertAdjacentHTML('beforeend', htmlFragment)
            layui.form.render()
        }
    })
}