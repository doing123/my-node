/**
 * 增删改查 及跨’集合‘操作
 * @type {createApplication}
 */
var express = require('express');
var app = express();
var router = require('./router/router.js');
var db = require('./modles/db.js');

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get('/', router.showIndex);

app.get('/add', router.showAdd);

app.get('/doAdd', router.doAdd);

app.get('/edit/:sid', router.edit);

app.get('/doEdit', router.doEdit);

app.get('/delete/:sid', router.remove);

app.listen(3000);