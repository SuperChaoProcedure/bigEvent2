 //表单验证
 layui.form.verify({
     //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
     pwd: [
         /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
     ],
     same: function(value) {
         let oldpwd = $('[name="oldPwd"]').val()
         if (oldpwd === value) {
             return '不允许新旧密码一致!'
         }
     },
     repwd: function(value) {
         let newpwd = $('[name="newPwd"]').val()
         if (newpwd !== value) {
             return '两次新密码输入不一致!'
         }
     }
 });
 $(function() {
     $('[class="layui-form"]').submit(function(e) {
         e.preventDefault();
         let form = layui.form.val('formTest')
         $.ajax({
             method: 'POST',
             url: '/my/updatepwd',
             data: form,
             success: function(response) {
                 if (response.status !== 0) {
                     return layer.msg(response.message)
                 }
                 layer.msg(response.message)
             }
         })

     })
 })