var express = require('express');
var router = express.Router();
var model = require('../models/model.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'pixi.js' });
});

router.get('/demo1', function(req, res, next) {
  res.render('demo1', { title: 'demo1' });
});

router.get('/demo2', function(req, res, next) {
  res.render('demo2', { title: 'demo2' });
});

router.get('/fabric', function(req, res, next) {
  res.render('fabric', { title: 'fabric' });
});

router.get('/fabric1', function(req, res, next) {
  res.render('fabric1', { title: 'fabric1' });
});

/**
 * 获取device表中的列表
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
router.get('/getDeviceList',function(req,res){
  model.Device.findAll().then(function(ret){
    if(!ret){
      return res.send([]);
    }
    for(var i in ret){
      ret[i].data = ret[i].data.toString('utf-8');//JSON.parse(ret[i].data.toString('utf-8'));
    }
    res.send(ret);
  }).catch(function(err){
    console.log('error1:' + err);
  })
})

/**
 * 获取隧道列表
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
router.get('/getTunnelList', function(req,res) {
  model.Tunnel.findAll().then(function(ret) {
    if(!ret) {
      return res.send({msg: '查询错误', flag: false});
    }
    res.send({flag: true, data: ret});
  }).catch(function(err) {
    console.log('error2:' + err);
    return res.send({msg: '查询错误',flag: false});
  })
})

/**
 * 根据id获取画布数据
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
router.get('/getDocData', function(req,res) {
  var id = req.query.id;
  if(!id) {
    return res.send({msg: 'id为空',flag: false});
  }
  model.Doc.findAll({
    where: {
      pro_id: id
    },
    order: [['desc', 'ASC']]
  }).then(function(ret) {
    if(!ret) {
      return res.send({flag: false, msg: '结果为空'});
    }
    var result = ret;
    for(var i in ret) {
      result[i].canvas = JSON.parse(ret[i].canvas.toString('utf-8'));
      result[i].size = JSON.parse(ret[i].size);
    }
    res.send({flag: true, data: result});
  }).catch(function(err) {
    console.log('error3:' + err);
    return res.send({msg: '查询错误',flag: false});
  })
})

module.exports = router;
