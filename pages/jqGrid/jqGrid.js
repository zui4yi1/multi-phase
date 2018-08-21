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
    var testData = [{
        id:32,
        invdate:'2012',
        name:'aaaa',
        amount: 2332.22,
        tax: 22,
        total:2,
        note:'2222'
    }];
    var ops1 = {
        url: 'jqGridData.action',
        id: 'list1',
        pagerId: 'pager1',
        noFillLines: true
    };
 //   mf.jqGrid.multiSelect(colModel, colNames, ops1);

    // 但块状参数仍然封装成为一个option, 这样最方便
    mf.jqGrid.noPager({
        url: 'jqGridData.action',
        id: 'list1',
      //  pagerId: 'pager1',
     //   noFillLines: true,
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
     //   var data = mf.jqGrid.getSelRowDatas('list1');
     //   console.info(data)
        $('#list1').jqGrid('addRowData',5,testData)

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


