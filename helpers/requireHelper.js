/*
* import all the file of the given dir.
*/
var fs = require('fs');

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

module.exports = requireDir;