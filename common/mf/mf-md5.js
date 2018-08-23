
var mf = mf || {};

/**
 * mf-md5对原插件md5做了以下扩展:
 */
mf.md5 = (function () {
    var preEnc = function (str) {
        var encStr = '3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127';
        return encStr + str;
    };
    //后处理与预处理不能位置同一台服务器上，若算法也泄露，也会被穷举而破解的
    var suffEnc = function (mdStr) {
        //取前三位的Unicode码值
        var unicode0 = mdStr.charCodeAt(0);
        var unicode1 = mdStr.charCodeAt(1);
        var unicode2 = mdStr.charCodeAt(2);
        var locIndex = (unicode0 + unicode1 + unicode2) % 32 || 17;
        return mdStr.charAt(locIndex) + mdStr.substr(1, locIndex - 1) + mdStr.charAt(0) + mdStr.substr(locIndex + 1);
    };
    var enc = function (str) {
        return suffEnc(md5(preEnc(str)));
    };
    return {        
        preEnc: preEnc, // 不建议暴露，删掉
        suffEnc: suffEnc,// 不建议暴露，删掉
        enc: enc,
    };
})();