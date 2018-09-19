
var mf = mf || {};

/**
 * mf-util: mf的通用类，包含以下函数
 * jsonFileName
 */
mf.util = (function () {
    var jsonFileName = function (url) {
        var jsonFileName = url;
        if (isTestMode()) {
            var strs = url.replace('.do', '').replace('.action', '').split('/');
            jsonFileName = strs.length > 1 ? strs[strs.length - 2] + '_' + strs[strs.length - 1] : strs[0];
            jsonFileName = '../../common/testData/' + jsonFileName + '.json';
        }
        return jsonFileName;
    };

    var isTestMode = function () {
        return localStorage.testMode === '1';

    };

    return {
        jsonFileName: jsonFileName,
        isTestMode: isTestMode
    };
})();

/**
 * 用于组件封装, vue app列表类，小块类等很有用
 * 仅html处理即可，事件不需要，除了打开和关闭，每个地方的肯定都不一样
 * 对列表的需要处理属性的问题，如id和name的取法肯定不一样，字段名称不一样
 * 此外，控件显示与否的条件也不一样
 * 有问题就总有解决方案
 */
mf.htmlToObj = (function () {
    var obj = {};
    var init = function (html) {
        obj = $(html);
    };
    var replace = function (selector, html) {
        var parent = obj.find(selector).parent();
        obj = parent.empty().append(html);
        return obj;
    };

    var append = function (selector, html) {
        obj = obj.find(selector).append(html);
        return obj;
    };
    var remove = function (selector) {
        obj = obj.fid(selector).remove();
        return obj;
    };
    var toString = function () {
        return obj.get(0).outerHTML;
    };
    return {
        init: init,
        replace: replace,
        append: append,
        remove: remove,
        toString: toString
    };
})();