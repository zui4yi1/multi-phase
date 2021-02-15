var http = require('http')
var fs = require('fs')

var server = http.createServer()
server.on('request',function(request,response){
  //手动配置类似apache
  let wwwUrl = 'C:/Users/Sea/Desktop/study/multi-phase';
  let filePath = '/index.html';
  let url = request.url;
  if(url != '/'){
    filePath = url;
  };
  fs.readFile(wwwUrl + filePath,(err,data) => {
    if(err){
      return response.end('404 not found')
    }
    response.end(data)
  })
})

server.listen(8080, function () {
  console.log('服务已启动，地址：http://localhost:8080/')
})