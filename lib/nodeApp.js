var fs = require('fs');
var path = require('path');
var mime = require("./mime").types;

/*
* Router对象作为应用的核心
* router dispach.路由分发处理
*/

//对象遍历函数
function objectMap(objs, callback){
	for(var i  in objs)
	{
		if(objs.hasOwnProperty(i)){
			//向回调函数传递键和值
			callback(i, objs[i]);
		}
	}
}

//对象属性继承
function objExtends(obj, extObj){
	for(var m in obj)
	{
		if(obj.hasOwnProperty(m)){
			extObj[m] = obj[m];
		}
	}
}

/*
* import all the file of the given dir.
*/


function requireDir(path){
	//get  all the file name which under the given path.
	var tmp = fs.readdirSync(path);
	var requiredModule = {};

	for(var i =0; i < tmp.length; i++)
	{
		//将导入的模块存储在 requiredModule 对象中.在保存时将后缀去掉.
		var relativePath = '.' + path+ '/' + tmp[i];
		var tmpKey = tmp[i].slice(0, -3);
		requiredModule[tmpKey] = require(relativePath) ; 
	}
	return requiredModule;
}

//路由分发处理,核心处理程序
var app = {
	stack: [],//controllers array
	init: function(){
		//route defualt config
		app.routerConfig();

		//custom route config
		if(arguments.length > 0){
			for(var i = 1; i < arguments.length; i++)
			      for(var j in arguments[i])
			      {
			      	var controller = arguments[i];
			      	if(controller.hasOwnProperty(j)){
			      		app.stack[j] = controller[j];
			      	}
			      }
		}else{
			console.log("controller missing.");
		}
		return app;
	},
	//将控制器与 Restful URL 对应起来,即个控制器进行默认路由配置
	routerConfig: function(){
		//controllers 为一个复合对象, 第一层为控制器, 第二层为控制器的 Action.
		//路由格式: '/' + controller + '/' + controllerAction
		//action限制为: index, new, create, update, edit, delete.
		var controllers = app.controllers;
		objectMap(controllers, function(key,controller){
			objectMap(controller, function(actionKey, controllerAction){
				var tmpController = key.slice(0, -10);
				var restfulUrl = '/' + tmpController + '/' + actionKey;
				
				app.stack[restfulUrl] = controllerAction;

				//当未指定 action 时,即根目录情况,默认执行 index action.
				if(actionKey == "index"){
					var rootController = '/' + tmpController;
					app.stack[rootController] = controllerAction;
				}
			})
		})
		return app;
	},
	//req, res, path 分别对应 http 请求和响应 以及 pathname.
	router: function(req, res, pathname){
		console.log("About to route a request for "+ pathname);

		//优先显示静态文件,当无静态文件时再动态路由
		app.resources(req, res, pathname,function(){
			if(typeof app.stack[pathname] === "function"){
				app.stack[pathname](res);
			}else{
				console.log("ControllerAction  is missing!");
				return app;
			}
		});
	},
	//方法继承
	extendApp: function(obj){
		objExtends(obj, app);
		return app;
	},
	//静态服务器处理
	resources: function(req, res, pathname, next){
		if(pathname.length > 0){
			staticPath = "public" + pathname;
			fs.exists(staticPath, function(exists){
				if(!exists){
					next(req, res, pathname);
				}else{
					var ext = path.extname(staticPath);
					ext = ext ? ext.slice(1) : 'unknown';
					var contentType = mime[ext] || "text/plain";

					fs.readFile(staticPath, 'binary', function(err, file){
						if(err){
							res.writeHead(500, {
							              	'Content-Type': 'text/plain'});
							res.end(err);
						}else{
							res.writeHead(200, { 'Content-Type': contentType });
							res.write(file, "binary");
							res.end();
						}
					})
				}
			});
		}
	}
}


app.controllers = requireDir("./controllers");

module.exports = app;