/*
* blogController: Create, Read, Update, Delete.
* method: index, new, create, edit, update, show, destroy.
*/

var blogController = {
	index: function(res){
		res.end("blog index.");
	},
	new: function(res){
		res.end("new blog.");
	},
	create: function(){

	},
	edit: function(){

	},
	update: function(){

	},
	show: function(res){
		res.end("blogs show.");
	},
	destroy: function(){
		
	}
}

module.exports = blogController;