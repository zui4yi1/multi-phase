var mf = mf || {};

/**
 * mf-msgbox对原插件zebra-dialog做了以下扩展:
 * a. 封装常用的类型info, succ, fail, error, warn, confirm，
 * b. 每种类型的按钮事件都附加便捷的回调函数
 * c. 对不同的类型，设置不同的opacity，越重要的提示颜色越深
*/
mf.msgbox = (function () {

    // msgbox配置简单，不需要定义render作为基准风格
    // var render = function(){};

    var info = function (content, callback, ops) {
        return new $.Zebra_Dialog(content, $.extend({
            title: '提示',
            type: 'information',
            overlay_opacity: 0.3,
            buttons: [
                {
                    caption: 'OK',
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                }
            ]
        }, ops));
    };
    var succ = function (content, callback, ops) {
        return new $.Zebra_Dialog(content || '操作成功', $.extend({
            title: '提示',
            type: 'confirmation',
            overlay_opacity: 0.3,
            buttons: [
                {
                    caption: 'OK',
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                }
            ]
        }, ops));
    };
    var fail = function (content, callback, ops) {
        return new $.Zebra_Dialog(content || '操作失败', $.extend({
            title: '提示',
            type: 'warning',
            overlay_opacity: 0.9,
            buttons: [
                {
                    caption: 'close',
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                }
            ]
        }, ops));
    };
    var error = function (content, callback, ops) {
        return new $.Zebra_Dialog(content, $.extend({
            title: '提示',
            type: 'error',
            overlay_opacity: 0.9,
            buttons: [
                {
                    caption: 'close',
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                }
            ]
        }, ops));
    };
    var warn = function (content, callback, ops) {
        return new $.Zebra_Dialog(content, $.extend({
            title: '提示',
            type: 'warning',
            overlay_opacity: 0.5,
            buttons: [
                {
                    caption: 'close',
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                }
            ]
        }, ops));
    };
    var confirm = function (content, callback, ops) {
        return new $.Zebra_Dialog(content, $.extend({
            title: '提示',
            type: 'question',
            overlay_opacity: 0.6,
            buttons: [
                {
                    caption: '确定',                    
                    callback: function () {
                        if (callback instanceof Function)
                            callback();
                        return true;
                    }
                },
                {
                    caption: 'cancel',
                    callback: function () {
                        return true;
                    }
                }
            ]
        }, ops));
    };
    return {
        info: info,
        succ: succ,
        fail: fail,
        error: error,
        warn: warn,
        confirm: confirm
    };
})();
