
var mf = mf || {};

/**
 * mf-jqGrid对原插件jqGrid做了以下扩展:
 * a. 简化参数，简化到最关心的两个业务参数colModels和colNames，以及补充属性options
 * b. 对常用的应用进行多相，如单选，多选，不可勾选，无翻页，5行模式等
 * c. 做了一个统一风格的例子：对可翻页的表若行数不够10行，则填充10行，以确保表高度不变，背景不变(如何改变原组件代码会更简单，但不建议修改原组件的代码)
 */
mf.jqGrid = (function () {

    //TODO edit模式

    /**
     * 所有基函数都定义为render.  若多相函数不满足的，可自行添加，或直接调用render但并不建议.
     */
    var render = function (options) {
        options = options || {};
        var id = options.id || 'gridTable';
        var table = $('#' + id);
        var pagerId = options.pagerId || 'gridPage';
        var url = options.url || undefined;

        if (typeof url == 'string') {
            options.url = mf.util.jsonFileName(url);
        }

        var defaultOps = {
            datatype: 'json',
            colNames: options.colNames,
            colModel: options.colModels,
            height: '230px', // 23 * 10
            sortname: 'id',
            sortorder: 'desc',
            mtype: 'post',
            viewrecords: true,
            emptyrecords: 'no records!'
        };
        defaultOps.gridComplete = function () {
            if (options.gridCompleteCallBack instanceof Function) {
                options.gridCompleteCallBack();
            }
            //填充10行, 斑马色
            if (!options.noFillLines) {
                var tdLength = table.find('tr:first td').length;
                var tr = '<tr class="ui-widget-content jqgrow fillRows">';
                for (var i = 0; i < tdLength; i++) {
                    tr += '<td></td>';
                }
                tr += '</tr>';
                var rowNum = table.jqGrid('getGridParam', 'rowNum');
                var records = table.jqGrid('getGridParam', 'records');   //获取当前记录数
                var html = '';
                for (var i = 0; i < (rowNum - records); i++) {
                    html += tr;
                }
                table.append(html);

            }
        };
        defaultOps.beforeSelectRow = function (rowId) {
            if (!rowId) return false; // 填充行无rowId, 不能有点击事件
            return true;
        };

        var pagerOps = {
            rowNum: 10,
            rowList: [10, 20, 30],
            pager: '#' + pagerId,
        };

        return table.jqGrid($.extend(defaultOps, pagerOps, options));
    };

    /**
     * 单选
     */
    var singleSelect = function (options) {
        var id = options.id || 'gridTable';
        var table = $('#' + id);

        var ops = {
            multiselect: true,
            multiboxonly: true,
            gridCompleteCallBack: function () {
                $('#cb_' + id).hide(); //隐藏全选按钮
            },
            onSelectRow: function (rowId) {
                table.find('#jqg_' + rowId).prop('checked', true); //强制设置复选框选中状态
            }

        }
        return render($.extend(ops, options));
    };

    /**
     * 多选
     */
    var multiSelect = function (options) {
        var id = options.id || 'gridTable';
        var table = $('#' + id);
        var ops = {
            multiselect: true, //属性有问题，点击行取消后，就不能再选中了

            onSelectRow: function (rowId, status) {
                table.find('#jqg_' + rowId).prop('checked', status); //强制设置复选框选中状态
            },
            onSelectAll: function (aRowids, status) {
                for (var i = 0; i < aRowids.length; i++) {
                    if (aRowids[i])
                        table.find('#jqg_' + aRowids[i]).prop('checked', status); //强制设置复选框选中状态
                }
                // 去除填充行的高亮颜色
                if (status) {
                    table.find('.fillRows').removeClass('ui-state-highlight');
                }
            }
        };
        return render($.extend(ops, options));
    };

    /**
     * 每页5行
     */
    var fiveRows = function (options) {
        var ops = {
            rowNum: 5,
            rowList: [5, 10],
            height: '115px'
        };
        return render($.extend(ops, options));
    };
    /**
     * 不显示翻页
     */
    var noPager = function (options) {
        var ops = {
            noFillLines: true, //指定告诉render, 无翻页模式不需要填充10行            
            pager: null,
            height: 'auto'
        };
        return render($.extend(ops, options));
    };

    var getRowId = function (id) {
        var isMultiselect = $('#' + id).jqGrid('getGridParam', 'multiselect');

        // 若多选，再判断是否为单选
        if (isMultiselect) {
            isMultiselect = !$('#' + id).jqGrid('getGridParam', 'multiboxonly');
        }

        var ids = $('#' + id).jqGrid('getGridParam', isMultiselect ? 'selarrrow' : 'selrow');

        if (isMultiselect) { // 需要去除填充行
            var len = ids.length;
            for (var i = len - 1; i >= 0; i--) {
                if (!ids[i])
                    ids.splice(i, 1);
            }
        }
        return ids;
    }

    /**
     * 获取选中行的数据
     */
    var getSelRowDatas = function (id) {
        var table = $('#' + id);
        var rowIds = getRowId(id);

        if (!rowIds) {
            return null;
        } else if (rowIds instanceof Array) {
            var arr = [];
            for (var i = 0; i < rowIds.length; i++) {
                arr.push(table.jqGrid('getRowData', rowIds[i]));
            }
            return arr;
        } else {
            return table.jqGrid('getRowData', rowIds);
        }
    };


    return {
        render: render,

        singleSelect: singleSelect,
        multiSelect: multiSelect,
        fiveRows: fiveRows,
        noPager: noPager,

        getRowId: getRowId,
        getSelRowDatas: getSelRowDatas
    };
})();