var express = require('express');
var model = require("../model/Photo");
var router = express.Router();
////下载
router.get("/photo/:id/download", function(req, res, next){
    ////1，获取路由中的id。
    ////2，用id作为标示查询数据库的数据 model.findById(id, function(err, photo){}
    ////3，查出之后，写绝对路径，调用res.download(path, name, callback)；方法
    var id = req.params.id;
    model.findById(id, function(err, photo){
        if (err) return next(err);
        var path = "public"+photo.path;
        var after="";
        ////后缀
        if(photo.type!==""){
            after = photo.type.split("/")[1];
        }
        res.download(path, photo.name+"." + after);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
    /////静态路径默认找到public文件夹下。
    ////update Model.where({ _id: id }).update({ title: 'words' })
    ////删除所有的数据 Model.remove({ artist: 'Anne Murray' }, callback)
    // model.remove({},function(err, data){
    //     console.log(data);
    // });
    ////先查找所有的数据 
    model.find({}, function(err, photos){
        if (err) return next(err);
        res.render('index', {
            title: 'photos',
            photos:photos
            });
    });
});


module.exports = router;
