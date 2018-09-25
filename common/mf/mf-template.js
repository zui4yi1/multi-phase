
var mf = mf || {};

/**
 * mf-template对原插件md5做了以下扩展:
 * 使用js原生splice函数即可实现所有功能,
 * 注：使用前需要克隆一下，slice(0)可以很方便的实现
 * 注：为了方便计算索引，newDoms最好是合并后的字符串，而不是数组
 * 此为简洁版本，原节点的结构是固定的，若有修改，也必须在相应的节点修改
 */

// 第5，8，12，15行可替换。若有增、删，需在替换结束后，由后至前，进行操作，确保索引不混乱
// 类似于slot
var listTemplate = [
    '<div class="listWrap">',
    '   <div class="itemList" v-for="(item, inx) in items">',
    '       <div class="itemWrap" >',
    '           <div class="item-header">',
    '               <div class="header-left">',
    '                   <span>test</span><span>test</span><span>test</span>', //第5项
    '               </div>',
    '               <div class="header-right">',
    '                   <span>test</span><span>test</span><span>test</span><span>test</span>', //第8行
    '               </div>',
    '           </div>',
    '           <div class="item-body">',
    '               <span>test</span><span>test</span><span>test</span>',   //第12行
    '           </div>',
    '           <div class="item-footer">',
    '               <button>test</button><button>test</button><button>test</button>', //第15行
    '           </div>',
    '       </div>',
    '   </div>',
    '</div>'
];


mf.template = function (tpls) {

    var doms = tpls.slice(0);
    var toString = function () {
        return doms.join('').replace(/\s+/g, ' '); // 注意去除制表符等长空行
    };

    var append = function (inx, newDoms) {
        doms.splice(inx, 0, newDoms);
    };
    var replace = function () {
        var startInx = arguments[0];
        var num, newDoms;
        if (arguments.length == 2) {
            num = 1;
            newDoms = arguments[1];
        } else {
            num = arguments[1];
            newDoms = arguments[2];
        }
        doms.splice(startInx, num, newDoms);
    };
    var remove = function (startInx, num) {
        doms.splice(startInx, num || 1);
    };
    return {
        append: append,
        replace: replace,
        remove: remove,
        toString: toString
    };
};