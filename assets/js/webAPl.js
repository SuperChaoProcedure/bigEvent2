$(function() {
    $.ajaxPrefilter(function(options) {
        options.url = 'http://ajax.frontend.itheima.net' + options.url
        if (options.url.indexOf('/my') !== -1) {
            options.headers = { Authorization: localStorage.getItem('token') }
        }
        options.complete = function(response) {
            if (response.responseJSON.status !== 0 && response.responseJSON.message === "身份认证失败！") {
                location.href = '/login.html';
            }
        }
    });
})