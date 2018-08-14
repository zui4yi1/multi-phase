
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
            jsonFileName =  strs.length > 1 ? strs[strs.length - 2] + '_' + strs[strs.length - 1] : strs[0];
            jsonFileName = '../../common/testData/' + jsonFileName + '.json';
        }
        return jsonFileName;
    };
    return {
        jsonFileName: jsonFileName
    }
})();