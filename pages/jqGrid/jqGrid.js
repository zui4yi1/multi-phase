$(function () {

    var colNames = ['Inv No', 'Date', 'Client', 'Amount', 'Tax', 'Total', 'Notes'];
    var colModel = [
        { name: 'id', index: 'id', width: 55 },
        { name: 'invdate', index: 'invdate', width: 90 },
        { name: 'name', index: 'name asc, invdate', width: 100 },
        { name: 'amount', index: 'amount', width: 80, align: "right" },
        { name: 'tax', index: 'tax', width: 80, align: "right" },
        { name: 'total', index: 'total', width: 80, align: "right" },
        { name: 'note', index: 'note', width: 150, sortable: false }
    ];
    var ops1 = {
        url: 'jqGridData.action',
        id: 'list1',
        pagerId: 'pager1'
    };
    mf.jqGrid.multiSelect(colModel, colNames, ops1);

    $('#btn').click(function(){
        var data = mf.jqGrid.getSelRowDatas('list1');
        console.info(data)

    });
    // var ops2 = {
    //     url: 'jqGridData.action',
    //     id: 'list2',
    //     pagerId: 'pager2'
    // };
    // mf.jqGrid.singleSelect(colModel, colNames, ops2);
    // var ops3 = {
    //     url: 'jqGridData.action',
    //     id: 'list3',
    //     pagerId: 'pager3'
    // };
    // mf.jqGrid.noPager(colModel, colNames, ops3);
});


