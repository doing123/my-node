var sleep = function () { // 异步的方法
    // promsie: 返回两个对象，一个成功，一个失败
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
            console.log('over');
        }, 3000);
    });
};

var start = async function () {
    console.log('start');
    await sleep();
    console.log('End');
    /**
     * start->over->end
     */
};

start();