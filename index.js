$(function () {

    var menus = [{
        title: 'mf菜单',
        isMenuHeader: true
    }, {
        title: '页面1',
        url: 'html1.html'
    }, {
        title: '灰菜单',
        //   url: 'html1.html'
    }, {
        title: '页面3',
        url: 'html1.html'
    }];

    mf.bTabs.initTabs(menus);
    mf.bTabs.addTab('frontTab', '首页', '', $('#frontPage'));
});


