var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

//模拟的数据库的内容
var dataMain = [
    {
        title: "标题0",
        datetime: "2017-11-20",
        author: "作者",
        content: "锄禾日当午，不如coding苦；对着C++，一调一下午。 都说程序猿是一群苦逼的存在，工作做不完，熬夜熬不够，对象找不着……            都是泪，说不下去了，现在看看几组数据深刻了解下加班的程序猿睡眠状况如何。1、经常加班到深夜，最是渴望健康睡眠            程序猿们总有写不完的代码，加班更是家常便饭。他们晚上的入睡时间接近12点，每天睡眠时间不足8小时。2、平时睡不够，假期去补觉平时加班加得飞起来，程序猿们只好在节假日补觉。每逢周末，程序猿们比平时多睡19分钟；今年春节程序猿们的睡眠时间终于够上了8小时线。为啥不多睡一会儿？因为万恶的生物钟啊……"
    },
    {
        title: "标题1-1",
        datetime: "2017-11-20",
        author: "作者",
        content: "锄禾日当午，不如coding苦；对着C++，一调一下午。 都说程序猿是一群苦逼的存在，工作做不完，熬夜熬不够，对象找不着……            都是泪，说不下去了，现在看看几组数据深刻了解下加班的程序猿睡眠状况如何。1、经常加班到深夜，最是渴望健康睡眠            程序猿们总有写不完的代码，加班更是家常便饭。他们晚上的入睡时间接近12点，每天睡眠时间不足8小时。2、平时睡不够，假期去补觉平时加班加得飞起来，程序猿们只好在节假日补觉。每逢周末，程序猿们比平时多睡19分钟；今年春节程序猿们的睡眠时间终于够上了8小时线。为啥不多睡一会儿？因为万恶的生物钟啊……"
    },
    {
        title: "标题2",
        datetime: "2017-11-20",
        author: "作者",
        content: "3、北上广深的程序猿睡多久            全国程序猿平均睡眠时间为7小时38分钟，上海和北京的程序猿们拖了后腿，深圳和广州的程序猿们超过平均睡眠时间。其中广州比上海每天多睡16分钟，按一年365天来算，这时间相当于波音747绕地球超音速飞行2.5圈！4、一线交通堵成狗，二线节奏慢悠悠            北京程序猿起床了，厦门程序猿还在睡梦中；            北京程序猿在挤地铁，厦门程序猿还在睡梦中；            北京程序猿终于下车了，厦门程序猿嚼着早饭上班去。"
    },
    {
        title: "标题3",
        datetime: "2017-11-20",
        author: "作者",
        content: "5、生男生女都一样，程序猿是命苦的娃            男女程序猿在睡眠时间上基本同步，女性只比男性少睡1.2分钟。只要当了程序猿，大家都是无（yao）性（jia）别（ban）的好战友。6、单身狗只能洗洗睡，恋爱的浪得飞起来            程序猿谈了恋爱之后，平时睡眠时间少了12分钟，周末睡眠时间少了31分钟。毕竟看电影、吃饭、逛公园……都是需要时间的嘛。单身的猿们，还是洗洗睡吧。"
    },
    {
        title: "标题4",
        datetime: "2017-11-20",
        author: "作者",
        content: "7、最悲催的程序猿都在哪里？            睡眠时间最短榜TOP5分别是宁夏、台湾、新疆、澳门、海南，尤其是宁夏的程序猿们，为家乡的发展殚精竭虑，每天睡眠时间不到6小时。一入程序猿深似海，从此睡眠是路人。8、宁夏的程序猿最爱补觉            作为睡眠最短榜的榜首，宁夏的程序猿补觉老狠了。平时只睡5小时53分钟的他们周末睡了8小时34分钟，今年春节更是以9小时25分钟的睡眠时长稳居睡眠最长榜的TOP1！心疼我猿，一年也睡不了多少好觉。9、海南的程序猿最拼命            海南的程序猿平时睡7小时7分钟，周末小小地补了个觉，但是春节程序猿们都拼命得不要不要的，睡的比平时还要少21分钟。好拼命！收下小编这双膝盖！"
    }
];

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

/**
 * 后端渲染
 */
app.use('/list/:id', function (req, res) {
    var id = Number(req.params.id);
    if (typeof id === 'number' && !isNaN(id)) {
        res.render('article', metaData[id - 1]);
    } else {
        res.send('输入有误。。。');
    }
});

/**
 * 前端渲染：处理Ajax请求
 * 通过修改DOM元素页面赋值
 * 不利于seo
 */
app.use('/news/:id', function (req, res) {
    var id = Number(req.params.id);
    if (typeof id === 'number' && !isNaN(id)) {
        res.json(dataMain[id - 1]);
    } else {
        res.send('输入有误。。。');
    }
});

app.listen(3000);