$(function () {

    // mf.jqGrid.multiSelect(colModel, colNames, ops1);

    // 但块状参数仍然封装成为一个option, 这样最方便
    mf.jqGrid.multiSelect({
        url: 'jqGridData.action',
        id: 'list1',
        pagerId: 'pager1',     
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
    });

    $('#btn').click(function(){
        var data = mf.jqGrid.getSelRowDatas('list1');
        console.info(data)

    });
    mf.jqGrid.singleSelect({
        url: 'jqGridData.action',
        id: 'list2',
        pagerId: 'pager2',     
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
    });
    mf.jqGrid.noPager({
        url: 'jqGridData.action',
        id: 'list3',
        pagerId: 'pager3',     
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
    });
});


