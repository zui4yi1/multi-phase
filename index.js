$(function () {

    var pageHeaderPath = 'pages/';
    var menus = [{
        title: 'mf菜单',
        isMenuHeader: true
    }, {
        title: 'ajax',
        url: pageHeaderPath + 'ajax/ajax.html'
    }, {
        title: 'jqGrid',
           url: pageHeaderPath + 'jqGrid/jqGrid.html'
    }, {
        title: 'dialog',
       // url: 'html1.html'
    }, {
        title: 'msgbox',
       // url: 'html1.html'
    }, {
        title: 'i18n',
        url: pageHeaderPath + 'i18n/i18n.html'
    }];

    mf.bTabs.initTabs(menus);
    mf.bTabs.addTab('frontTab', '首页', '', $('#frontPage').children());
});


