/*
* 路由配置函数
*/
var routerHelper = {
	//HTTP method
	//params: path_name, controllers对象, controller_name, action_name
	get: function(path,controller, action){
		var controllerRouter = {};
		var currentController = this.controllers[controller + 'Controller'];

		for(var key in currentController)
		{
			if(key == action){
				this.stack[path] = currentController[key];
				console.log("get method added for: / :", path);
			}
		}
	}
}

module.exports = routerHelper;