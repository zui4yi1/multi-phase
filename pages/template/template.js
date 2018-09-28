
$(function () {

    new Vue({
        el: '#app',
        data: function () {
            return {
                items: []
            };
        },
        components: {
            'holiday-list': {
                props: ['items'],
                //   template: tpl.join('').replace(/\s+/g, ' '),
                //  template: tpl2.toString(),
                template: [
                    '<div class="listWrap">',
                    '   <div class="itemList" v-for="(item, inx) in items">',
                    '       <div class="itemWrap" >',
                    '           <div class="item-header">',
                    '               <div class="header-left">',
                    '                   <slot name="headLeft" :item="item" ></slot>',
                    '               </div>',
                    '               <div class="header-right">',
                    '                   <slot name="headRight" :item="item" ></slot>',
                    '               </div>',
                    '           </div>',
                    '           <div class="item-body">',
                    '                <slot name="itemBody" :item="item" ></slot>',
                    '           </div>',
                    '           <div class="item-footer">',
                    '                <slot name="itemFooter" :item="item" ></slot>',
                    '           </div>',
                    '       </div>',
                    '   </div>',
                    '</div>'].join('').replace(/\s+</g, '<') //replace, 去掉对齐用的空白符
                   ,methods:{} //组件自带公共方法于此定义
            }
        },
        mounted: function () {
            var condititon = {
                emptyId: '12345'
            };
            var _this = this;
            mf.ajax('holidays.action', condititon, function (data) {
                _this.items = data.holidaysList;
            });
        },
        methods: {
            submitAply: function (item) {
                console.info(item)
            },
            cancelAply: function (item) {
                console.info(item)
            },
            viewAply: function (item) {
                console.info(item)
            }
        }
    });
});
