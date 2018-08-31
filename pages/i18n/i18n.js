$(function () {

    $.cookie('language','cn') // set language
    mf.i18n.loadResource('message', function () {
        mf.i18n.batchTranslate('user', ['name', 'age', 'userTitle'], '#part1');
        mf.i18n.autoTranslate(['score', 'common'], '#part2');
    });

    mf.jqGrid.noPager({
        url: 'members.action',
        colNames: mf.i18n.props('user', ['name', 'age']), //一行代码搞定
        colModel: [
            { name: 'name', width: 100 },
            { name: 'age', width: 100 }
        ]
    });
});