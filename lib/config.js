/*
* 对指定后缀文件和过期日期(这里设为一年)进行配置
*/

exports.Expires = {
	fileMatch: /^(gif|png|jpg|js|css)$/ig,
	maxAge: 60*60*24*365
};

//压缩编码
exports.Compress = {
	match: /css|js|html /ig
};

//欢迎页面
exports.Welcome = {
	file: "index.html"
};