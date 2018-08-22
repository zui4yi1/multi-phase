$(function () {

    $('#succ').click(function () {
        mf.msgbox.succ();
    });
    $('#fail').click(function () {
        mf.msgbox.fail();
    });
    $('#error').click(function () {
        mf.msgbox.error('error...');
    });
    $('#info').click(function () {
        mf.msgbox.info('info...');
    });
    $('#warn').click(function () {
        mf.msgbox.warn('warning...');
    });
    $('#confirm').click(function () {
        mf.msgbox.confirm('confirm...', function () {
            console.info('well done!');
        });
    });

    // 更进一步的封装，可以把id一起做为参数，这样就可以把点击事件一起包含在内，不过最好不要这样做，
    // 因为绑定dom的事件不是插件本身的功能
    
    /*     mf.msgbox.succ = function (selector, content, callback, ops) {
            $(selector).click(function () {
                new $.Zebra_Dialog(content || '操作成功', $.extend({
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
            });
        };
        mf.msgbox.succ('#succ');  */

});


