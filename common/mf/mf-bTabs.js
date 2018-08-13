
var mf = mf || {};

/**
 * mf-bTabs对原插件bTabs做了以下扩展
 * a. 简化参数
 * b. 支持动态添加菜单
 * c. 支持添加一个指定doms的tabs，而非必须url
 * d. 支持无url的菜单项，不可点击并置灰
 */
$.extend(mf, (function () {

    //计算内容区域高度
    function calcHeight() {
        var browserHeight = $(window).innerHeight();
        var topHeight = $('#mainFrameHeadBar').outerHeight(true);
        var tabMarginTop = parseInt($('#mainFrameTabs').css('margin-top'));//获取间距
        var tabHeadHeight = $('ul.nav-tabs', $('#mainFrameTabs')).outerHeight(true) + tabMarginTop;
        var contentMarginTop = parseInt($('div.tab-content', $('#mainFrameTabs')).css('margin-top'));//获取内容区间距
        var contentHeight = browserHeight - topHeight - tabHeadHeight - contentMarginTop;
        $('div.tab-content', $('#mainFrameTabs')).height(contentHeight);
    }

    /**
     *  菜单更多的是js动态的，这样便于维护。解放html
     */
    function addMenu(menuArr) {
        var ul = $('.menuSideBar ul');
        var appendEle = '';
        var li = '';
        $.each(menuArr, function (inx, menu) {
            if (menu.isMenuHeader === true) {
                li = '<li class="nav-header">' + menu.title + '</li>';
                li += '<li class="nav-divider"></li>';
            } else {
                // 支持无url的项，并置灰
                li = '<li mid="tab' + inx + '" funurl="' + (menu.url || '') + '">';
                li += '<a tabindex="-1" href="javascript:void(0);" ' + (!menu.url ? ' style="color: #bbb;"' : "") + ' >' + menu.title + '</a></li>';
            }
            appendEle += li;
        });
        ul.append(appendEle);

        //菜单点击
        $('a', $('#menuSideBar')).on('click', function (e) {
            e.stopPropagation();
            var li = $(this).closest('li');
            var menuId = $(li).attr('mid');
            var url = $(li).attr('funurl');
            var title = $(this).text();

            if (!url)
                return false;

            // 菜单点击添加tab, 也可以直接用原插件的功能: $('#mainFrameTabs').bTabsAdd(menuId, title, url);
            addTab(menuId, title, url);

            //计算Tab可用区域高度
            calcHeight();
        });

    }
    /**
     *  原插件已提供，但为了便于动态添加无关闭按钮的固定tab, 再定义一个
     */
    var addTab = function (id, title, url, doms, noClose) {
        // 无url, 则放置一个doms, 无关闭按钮
        // 若需要关闭按钮，可通过以下方式: $('#mainFrameTabs').bTabsAdd(id, title, url)添加一个本地的简单url，然后删除iframe, 再添加content
        if (!url && doms) {

            if (noClose === undefined || noClose === true) {
                var ul = $('ul.nav-tabs');
                var li = '<li role="presentation" class="active noclose">';
                li += '<a href="#' + id + '" data-toggle="tab">' + title + '</a></li>';
                ul.append(li);

                var tabContent = $('div.tab-content');
                var $div = $('<div class="tab-pane active" id="' + id + '"></div>').append(doms);
                tabContent.append($div);
            } else {
                //先用一个空页面作参数，以执行内置的bTabsAdd()函数, 然后删了iframe并加入doms
                $('#mainFrameTabs').bTabsAdd(id, title, 'test.html'); //test.html为空页面
                $('#bTabs_' + id).empty().append(doms);
            }
        } else {
            $('#mainFrameTabs').bTabsAdd(id, title, url);
            if (noClose) {
                $('ul.nav-tabs li:last-child button').hide();
            }
        }
    };

    /**
     * 完成所有tab组件相关的初始化
     * @param menuArr: 菜单项数据，每个项包含三个属性title, url, isMenuHeader(可选)
     */
    var initTabs = function (menuArr) {
        // 通过js动态生成菜单
        if (menuArr instanceof Array && menuArr.length > 0) {
            addMenu(menuArr);
        }
        //初始化
        $('#mainFrameTabs').bTabs();
    };
    return {
        addTab: addTab,
        initTabs: initTabs
    }
})());