var express = require('express');
////express.Router 可以认为是一个微型的只用来处理中间件与控制器的 app，它拥有和 app 类似的方法
var router = express.Router();
var Photo = require("../model/Photo");
var path = require("path");
var fs = require("fs");
var multer = require('multer');
var join = path.join;
////由于Express4中没有bodyparser中间件， 就不能用app.use(express.bodyparser())，用body-parser+multer两个中间件替代上传文件，
////其中multer中间件解析后会在req中加入file/files对象，dest为上传到的地址, upload.single("<name>")中的name要与<input type="file">中的name一致
var upload = multer({ dest: 'public/uploads/' });
/////用于解析客户端请求的body内容，此处引用使用于文件上传
//app.use(express.bodyParser());

 router.get('/', function(req, res, next) {
     /////res.render(“page.ejs”,{title:“你好吗？”});
 	res.render("photo", {
 		title:"File Upload",
        isImage:false
 	});
 });
 ////取url中的值用 req.query.xxx 来取得。 所以get请求用req.query.xxx。post请求的前端数据用req.body.xxx来取得
router.post('/upload',upload.single("photo[file]"), function(req, res, next){
    var img = req.file;
    if(img.mimetype.split("/")[0]!="image"){
        res.render("photo", {
            title:"Only image is allow",
            isImage:false
        });
    }else{
        var index = img.path.indexOf("\\");
        var name = req.body.photo.name||img.originalname;
        var newPath =img.path.slice(0, img.path.indexOf("\\", index+1)+1) + name + "." + img.mimetype.split("/")[1];
        fs.rename(img.path, newPath , function(err){
            if(err) return next(err);
            ////写数据进入mongodb
            Photo.create({
                name:name,
                path: newPath.slice(newPath.indexOf("\\"), newPath.length),
                type:img.mimetype
            }, function(err){
                if(err) return next(err);
                /////犯错 写成了req.redirect(“”);
                res.redirect("/");
            });
        });
    }
});
module.exports=router;