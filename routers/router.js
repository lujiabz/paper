var user = require("./user");
var posts = require("./post");

module.exports = {
	index:function(req,res){
		if(!req.session.user){
			res.redirect("/login");
		}else{
			res.redirect("/index.html")
		}
	},
	login:function(req,res){
		if(!req.session.user){
			res.redirect("/partial/login.html")
		}else{
			res.redirect("/index.html")
		}		
	},
	register:function(req,res){		
		res.redirect("/partial/register.html")
	},
	signup:function(req,res){

		user.createUser({
			"username":req.body.username,
			"password":req.body.password
		},function(type,err,doce){	
			if(type == "1"){
				// user exist
				res.send("user already exist");
			}else{
				res.redirect("/partial/login.html");
			}		
		});
	},
	signin:function(req,res){
		var info = {
			"username":req.body.username,
			"password":req.body.password
		}
		user.find(info,function(err,doc){
			if(!err){
				if(doc.length == 0){
					res.send("no user")
				}else{				
					req.session.user = doc[0];
					res.redirect("/")
				}			
			}else{
				res.send(error)
			}		
		})
	},
	logout:function(req,res){
		req.session.user = null;
		res.redirect("/login");
	},
	user_profile:function(req,res){
		var id = req.session.user._id;
	
		if(id){
			user.getProfile(id,function(doc){
				res.send(doc)
			});
		}	
	},
	posts:function(req,res){
		posts.find(function(err,doc){
			if(!err){
				res.send(doc)
			}		
		});
	},
	addPost:function(req,res){
		var id = req.session.user._id,
			text = req.body.text,
			name = req.session.user.username;
		
		posts.insert({
			"author":id,
			"text":text,
			"name":name
		},function(err,doc){
			res.send(doc)
		});
	},
	deletePost:function(req,res){
		posts.delete({
			"_id":req.params.id
		},function(err,doc){
			res.send("delete success")
		})
	},
	getPost:function(req,res){
		
	}
}