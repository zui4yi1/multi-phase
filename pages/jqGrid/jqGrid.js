$(function () {

    // 但块状参数仍然封装成为一个option, 这样最方便
    //  写稿子时，务必突出这一点，同一套数据，可以任意切换不同的展示
    var ops = {
        url: 'jqGridData.action',
        colNames: ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'],
        colModel: [
            { name: 'id', index: 'id', width: 55 },
            { name: 'invdate', index: 'invdate', width: 90 },
            { name: 'name', index: 'name asc, invdate', width: 100 },
            { name: 'amount', index: 'amount', width: 80, align: "right" },
            { name: 'tax', index: 'tax', width: 80, align: "right" },
            { name: 'total', index: 'total', width: 80, align: "right" },
            { name: 'note', index: 'note', width: 150, sortable: false }
        ]
    };

    mf.jqGrid.multiSelect($.extend({
        caption: '多选',
        id: 'list1',
        pagerId: 'pager1'
    }, ops));

    mf.jqGrid.singleSelect($.extend({
        caption: '单选',
        id: 'list2',
        pagerId: 'pager2'
    }, ops));
    mf.jqGrid.noPager($.extend({
        caption: '无复选框, 不分页',
        id: 'list3',
    }, ops));
});


