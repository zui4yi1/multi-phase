var mf = mf || {};
/**
 * mf-i18n对原插件i18n做了以下扩展:
 * 加载资源、批量翻译、自动翻译、获取数组、获取单数据
 */
mf.i18n = (function () {

    $.cookie('language','cn') // set language
    
    var loadResource = function (sourceName, callback) {
        $.i18n.properties({
            name: sourceName,
            path: '../../common/resource/',
            mode: 'map',
            language: getLanguage(),
            async: true,
            callback: function () {
                if (callback instanceof Function) {
                    callback();
                }
            }
        });
    };

    function getLanguage() {
        var supportLans = ['cn', 'en'];
        var lan = $.cookie("language"); 
        return supportLans.indexOf(lan) > -1 ? lan : 'cn';
    }

    /**
     * 批量翻译，定义资源文件里数据的格式
     * @param {*} key_prefix 
     * @param {*} ids 
     * @param {*} context 
     */
    var batchTranslate = function (key_prefix, ids, context) {

        var context = $(context || '#mainPage');
        for (var i = 0; i < ids.length; i++) {
            var dom = context.find('#' + ids[i] + '_label');
            var value = prop(key_prefix + '.' + ids[i]);
            var hasColon = dom.hasClass('i18n-label-colon')
            dom.text(value + (hasColon ? ': ' : ''));
        }
    };

    /**
     * 对需要翻译的添加class: i18n-label, 若需要添加冒号，则再加一个class: i18n-label-colon
     */
    var autoTranslate = function (key_prefixs, context) {
        var context = $(context || '#mainPage');
        key_prefixs  = key_prefixs instanceof Array ? key_prefixs : [key_prefixs]; // 若不是数组则转为数组处理
        context.find('.i18n-label').each(function (inx, dom) {
            var id = dom.id.replace('_label', '');
            var value = '';
            for (var i=0;i<key_prefixs.length;i++){ //key_prefixs一般就两三个，故时间复杂度仍为O(n)
                value = prop(key_prefixs[i] + '.' + id);
                if (value && value != '[' + key_prefixs[i] + '.' + id + ']') {
                    break;
                }
            }
            var hasColon = $(dom).hasClass('i18n-label-colon')
            $(dom).text(value + (hasColon ? ': ' : ''));
        });
    };

    var props = function (key_prefixs,keys) {
        return $.map(keys, function (key) {
            return $.i18n.prop(key_prefixs + '.'+ key); // 一般不用考虑点位符, 所以简单的取值
        });
    };
    var prop = function () {
        return $.i18n.prop.apply(this, arguments);
    };
    return {
        loadResource: loadResource,
        batchTranslate: batchTranslate,
        autoTranslate: autoTranslate,
        props: props,
        prop: prop
    };
})();