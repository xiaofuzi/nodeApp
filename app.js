/*
* 程序启动入口
*/

var http = require("http"),
       url = require("url"),
       App = require("./lib/nodeApp").init(),
       router = require("./router");

//服务器回调函数
function onRequest(request, response){
	var pathname = url.parse(request.url).pathname;
	console.log("Request for" + pathname + " received.");

	router.routeConfig();
	App.router(request, response, pathname);
}

http.createServer(onRequest).listen(3000);
console.log("Server has started, the port is: http://localhost:3000");