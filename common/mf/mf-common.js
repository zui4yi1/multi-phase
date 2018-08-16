
var mf = mf || {};

/**
 * mf-util: mf的通用类，包含以下函数
 * jsonFileName
 */
mf.util = (function () {
    var jsonFileName = function (url) {
        var jsonFileName = url;
        var testMode = localStorage.testMode === '1' ? true : false;
        if (testMode) {
            var strs = url.replace('.do', '').replace('.action', '').split('/');
            jsonFileName = strs.length > 1 ? strs[strs.length - 2] + '_' + strs[strs.length - 1] : strs[0];
            jsonFileName = '../../common/testData/' + jsonFileName + '.json';
        }
        return jsonFileName;
    };

    return {
        jsonFileName: jsonFileName
    };
})();

/**
 * 用于组件封装, vue app列表类，小块类等很有用
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
    var remove = function(selector){
        obj = obj.fid(selector).remove();
        return obj;
    };
    var toString = function(){
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