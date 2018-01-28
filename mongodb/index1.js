var express = require('express');
var app = express();

app.set('view engine', 'ejs');

var metaData = [
    {
        title: '标题1',
        datetime: '2018-1-28',
        author: 'doing1'
    },
    {
        title: '标题4',
        datetime: '2018-1-28',
        author: 'doing4'
    },
    {
        title: '标题6',
        datetime: '2018-1-28',
        author: 'doing6'
    }
    , {
        title: '标题9',
        datetime: '2018-1-28',
        author: 'doing9'
    }
];

app.use('/list/:id', function (req, res) {
    var id = Number(req.params.id);
    if (typeof id === 'number' && !isNaN(id)) {
        res.render('article', metaData[id - 1]);
    } else {
        res.send('输入有误。。。');
    }
});

app.listen(3000);