var mf = mf || {};

/**
 * mf-bTabs对原插件bTabs做了以下扩展:
 * a. 简化参数, 并提供初始化菜单和tabs页的总入口initTabs()
 */
mf.ajax = function (url, data, succ) {

    var testMode = localStorage.testMode === '1' ? true : false;

    // 测试模式，读取本地json文件，里面包含接口的测试数据
    if (testMode) {
        // 取最后两节代码
        var strs = url.replace('.do', '').replace('.action', '').split('/');
        var jsonFileName = strs.length > 1 ? strs[strs.length - 2] + '_' + strs[strs.length - 1] : strs[0];
        $.ajax({
            url: '../../common/testData/' + jsonFileName + '.json', //包含测试数据的json文件
            type: 'GET',
            dataType: 'json',
            data: data,
            success: function (data) {
                if (succ instanceof Function) {
                    succ(data);
                }
            },
            error: function (e) {
                alert('common/testData/' + jsonFileName + '.json文件，或者json文件的数据格式不正确');
            }
        });
        return;
    }

    // 联调正式模式
    $.ajax({
        url: url,
        type: 'POST', // 统一post，若需要get格式，可类似于$.post和$.get进行多样化封装
        dataType: 'json',
        data: data,
        success: function (data) {
            if (succ instanceof Function) {
                succ(data);
            }
        },
        error: function (e) {
            console.error(e);
        }
    });
}
// defalut is post, if $.get is needed
//mf.get = function(){};