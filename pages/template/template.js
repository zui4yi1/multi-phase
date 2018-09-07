
$(function () {

    var tpl = listTemplate.slice(0);
    tpl.splice(5, 1, '<span>{{item.aplyDate}}</span>');
    tpl.splice(8, 1, '<span>{{item.statusNm}}</span>');
    tpl.splice(12, 1, '<div>{{item.reason}}</div>');
    tpl.splice(15, 1, '<button v-if="item.status==\'03\'" v-on:click.stop="submitAply(item)">提交</button><button v-if="item.status==\'02\'" v-on:click.stop="cancelAply(item)">取消</button>');


    var tpl2 = new mf.template(listTemplate);
    tpl2.replace(5, '<span>{{item.aplyDate}}</span>');
    tpl2.replace(8, '<span>{{item.statusNm}}</span>');
    tpl2.replace(12, '<div>{{item.reason}}</div>');
    tpl2.replace(15, '<button v-if="item.status==\'03\'" v-on:click.stop="submitAply(item)">提交</button><button v-if="item.status==\'02\'" v-on:click.stop="cancelAply(item)">取消</button>');

    // 直接用索引的方式arr[i]=''替换也是可以的

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
                template: tpl2.toString(),
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
        }
    });
});
