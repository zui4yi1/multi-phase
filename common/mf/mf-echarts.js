var mf = mf || {};
/**
 * mf-echarts对原插件echarts做了以下封装:
 * 只取简单的几种图形：拆线（包括面积）、柱图、饼图（环、玫瑰），一共6个
 */
mf.echarts = (function () {
    // 需要的参数，均是id, x, y,data,legend, 五个参数，其中id非必须
    // 统一颜色、位置，边矩
    // TODO  多相需要解决这种，参数继承的覆盖的问题！
    var render = function (option) {
        var myChart = echarts.init(document.getElementById(option.id || 'chartWrap'));

        // 很容易冲突的属性，命名为_data?

        var defaultOps = {};
        if (option._legend) {
            defaultOps.legend = option._legend instanceof Array ? {data: option._legend.slice(0, option.series.length)} : option._legend;
        }
        if (option._x || option._y) {
            option.xAxis = !(option._x instanceof Array) ? (option._x || {type: 'value'}) : option.xAxis = {
                type: 'category',
                data: option._x
            };
            option.yAxis = !(option._y instanceof Array) ? (option._y || {type: 'value'}) : option.yAxis = {
                type: 'category',
                data: option._y
            };
        } 

        // 为echarts对象加载数据 
        return myChart.setOption($.extend(defaultOps, option));

    };

    // 重点在于拼接series
    function setSeries(type, option) {
        var series = [];
        if (!option._data) {
            return series;
        }

        //_data 支持三种格式: {}, [], 及[{},[]]，第三种里面的元素同时支持{}和[]
        // 数组形式时，series的name，从legend中获取，注意确保legend对应的顺序
        if (!(option._data instanceof Array)) { // 第一种对象{}形式
            series.push($.extend({ type: type }, option._data, option));
        } else { //是个数组
            if (option._data[0][0] === undefined) { // 第二种一维数组[]形式，即只有一条series
                series.push($.extend({
                    name: option._legend[0] || '',
                    type: type,
                    data: option._data
                }, option));

            } else { // 第三种混合型
                for (var i = 0; i < option._data.length; i++) {
                    // 区别数组或对象
                    if (option._data[i] instanceof Array) {
                        series.push($.extend({
                            name: option._legend[i] || '',
                            type: type,
                            data: option._data[i]
                        }, option));
                    } else {
                        series.push($.extend({ type: type }, option._data[i], option));
                    }

                }
            }
        }
        return series;
    };
    var line = function (option) {
        // 拼接series, 需要legend, data两个参数
        var ops = {
            series: setSeries('line', option)
        };
        return render($.extend(ops, option), arguments.callee);

    };
    var area = function (option) {
        var ops = {
            itemStyle: {
                normal: { areaStyle: 'default' }
            }
        };
        return line($.extend(ops, option));
    };
    var bar = function (option) { // 同向
        var ops = {
            series: setSeries('bar', option)
        };
        return render($.extend(ops, option));

    };
    var pie = function (option) {
        // 半径太大了，需要处理，哦不不不，而是出现坐标轴了
        var ops = {
            series: setSeries('pie', option)
        };
        return render($.extend(ops, option));

    };
    var ring = function (option) {

    };
    var rose = function (option) {

    };

    return {
        render: render,
        line: line,
        area: area,
        bar: bar,
        pie: pie,
        ring: ring,
        rose: rose
    };
})();