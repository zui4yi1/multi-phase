$(function () {

    var pageHeaderPath = 'pages/';
    var menus = [{
        title: 'mf菜单',
        isMenuHeader: true
    }, {
        title: 'tabs',
    }, {
        title: 'ajax',
        url: pageHeaderPath + 'ajax/ajax.html'
    }, {
        title: 'jqGrid',
        url: pageHeaderPath + 'jqGrid/jqGrid.html'
    }, {
        title: 'modal dialog',
        url: pageHeaderPath + 'dialog/dialog.html'
    }, {
        title: 'msgbox',
        url: pageHeaderPath + 'msgbox/msgbox.html'
    }, {
        title: 'i18n',
        // url: pageHeaderPath + 'i18n/i18n.html'
    }, {
        title: 'md5',
        url: pageHeaderPath + 'md5/md5.html'
    }, {
        title: 'template',
        url: pageHeaderPath + 'template/template.html'
    }, {
        title: 'echarts',
        url: pageHeaderPath + 'echarts/echarts.html'
    }];

    mf.bTabs.initTabs(menus);
    mf.bTabs.addTab('frontTab', '首页', '', $('#frontPage').children());
    localStorage.testMode = '1'
});


