var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var photo = require('./routes/photo');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));////输出有颜色区分的日志 
////解析请求主体
app.use(bodyParser.json());
//// bodyParser+multer 等于  express.bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
/////解析cookie
app.use(cookieParser());
////提供public下的静态文件
app.use(express.static(path.join(__dirname, 'public')));
////指定程序路由
//app.use 不是来处理请求的, 而是来加载处理请求的路由模块的参数.
app.use('/users', users);
app.use('/photo', photo);
////在这里用app.use('/photo/:id/download', routes);始终会调用app.get('/', function(){})， 因此直接用app.get('/xxx', function(){})
app.get('/photo/:id/download', routes);
app.use('/', routes);
////由于使用form表单的方式提交，所以在预加载时期就要定义
app.post("/upload", photo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace 仅在生产环境
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err  
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
