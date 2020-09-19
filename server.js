const fs = require('fs')
const path = require('path')
const http = require('http')
const server = http.createServer()
server.on('request', (req, res) => {
    let url = req.url
    let fpath = ''
    if (url == '/') {
        fpath = path.join(__dirname, 'index.html')
    } else {
        fpath = path.join(__dirname, url)
    }
    fs.readFile(fpath, function(err, dataStr) {
        if (err) { res.end('404 Not Found 失败') }
        res.end(dataStr)
    })
})
server.listen(80, function() {
    console.log('server running at http://127.0.0.1');
})