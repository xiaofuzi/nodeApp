/*
* 路由选择, 根据不同的路由选择执行不同的controllerAction.
*/

var app = require("./lib/nodeApp");
var routerHelper = require("./helpers/routerHelper");

app.extendApp(routerHelper);

var controllers = app.controllers;

function routeConfig(){
	//路由自定义配置,单个
	app.get('/', 'blog', 'index');


	//自定义路由设置,批量配置
	var allRouter = {};
	app.init(allRouter);

}

exports.routeConfig = routeConfig;





