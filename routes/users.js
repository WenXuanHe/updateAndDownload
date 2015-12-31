var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

////范式路由
router.get('/:id', function(req, res, next) {
  ////以路由的方式传的数据可以用req.params取得
  res.send(req.params.id);
});

module.exports = router;
