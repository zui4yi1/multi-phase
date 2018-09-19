
var mf = mf || {};

/**
 * mf-dialog对原插件jquery ui dialog做了以下扩展
 * 做企业版的dialog, 由于窗口需要可移动，可改变大小，有标题、内容区、按钮区，故采用经典的jq ui dialog做例子
 */
mf.dialog = (function () {
    // 企业版的主要有两种，编辑窗口和详情窗口。前者需要有两个或三个按钮，提交、(保存)和取消；后者只需要一个关闭按钮
    // 同时窗口也区分大窗口，小窗口和正常窗口(默认)
    // 详情窗口与编辑窗口的主题风格也不一样

    // 如果比较简单，是不建议分离出来的，因为这样一来，mf也变成一个组件了，个人还是推荐不同项目不同的多相
    var mf_conf = {
        render_ops: {
            show: {
                effect: "clip",
                duration: 800,
            },
            hide: {
                effect: "clip",
                duration: 800,
            },
            height: 350,
            width: 500,
        }
    };

    var render = function (id, options) {
        var defaultOps = {
            autoOpen: false,
            show: {
                effect: "clip",
                duration: 600,
            },
            hide: {
                effect: "clip",
                duration: 500,
            },
            height: 310,
            width: 500,
            modal: true
        };
        // import mf conf
        $.extend(defaultOps, mf_conf.render_ops);

        return $('#' + id).dialog($.extend(defaultOps, options));
    };
    //若saveCallback为空，则为2个按钮(提交、取消)，反之为三个按钮(提交、保存、取消)
    var form = function (id, submitCallback, saveCallback, options) {
        var btns = [
            {
                text: "提交",
                icon: "ui-icon-check",
                click: function () {
                    if (submitCallback instanceof Function) {
                        submitCallback();
                    }
                    close(id); // 实际关闭dialog时此处应删除，而在上面的回调函数里进行关闭
                }
            },
            {
                text: "保存",
                icon: "ui-icon-arrowthickstop-1-s",
                click: function () {
                    if (saveCallback instanceof Function) {
                        saveCallback();
                    }
                    close(id); // 实际关闭dialog时此处应删除，而在上面的回调函数里进行关闭
                }
            },
            {
                text: "取消",
                icon: "ui-icon-close",
                click: function () {
                    close(id);
                }
            }
        ];
        // 无保存回调则删除该按钮
        if (!saveCallback) {
            btns.splice(1, 1);
        }
        var ops = {
            buttons: btns
        };
        return render(id, $.extend(ops, options));
    };
    var form_big = function (id, submitCallback, saveCallback, options) {
        var ops = {
            height: 490,
            width: 800,
        };
        return form(id, submitCallback, saveCallback, $.extend(ops, options));

    };
    var form_small = function (id, submitCallback, saveCallback, options) {
        var ops = {
            height: 240,
            width: 400,
        };
        return form(id, submitCallback, saveCallback, $.extend(ops, options));
    };

    var detail = function (id, options) {
        var ops = {
            buttons: [{
                text: "关闭",
                icon: "ui-icon-close",
                click: function () {
                    $(this).dialog("close");
                }
            }],
            classes: { // 设置详情的主题风格
                'ui-dialog': "gray1",
                'ui-dialog-content': 'gray1',
                'ui-dialog-titlebar': 'gray2',
                'ui-dialog-buttonpane': 'gray2',
                'ui-button': 'gray1'
            }
        };
        return render(id, $.extend(ops, options));
    };
    var detail_big = function (id, options) {
        var ops = {
            height: 490,
            width: 800,
        };
        return detail(id, $.extend(ops, options));
    };
    var detail_small = function (id, options) {
        var ops = {
            height: 240,
            width: 400,
        };
        return detail(id, $.extend(ops, options));
    }
    var close = function (id) {
        $('#' + id).dialog("close");
    };
    return {
        render: render,
        close: close,

        form: form,
        form_big: form_big,
        form_small: form_small,

        detail: detail,
        detail_big: detail_big,
        detail_small: detail_small
    }
})();