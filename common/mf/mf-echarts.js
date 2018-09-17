var mf = mf || {};
/**
 * mf-echarts对原插件echarts做了以下封装:
 * 只取简单的几种图形：拆线（包括面积）、柱图、饼图（环、玫瑰），一共6个
 * 参数很多，主要的是series, 参数分为二块，全局的和series的属性
 * 
 * 必须定义风格，才成设置mf
 */
mf.echarts = (function () {
    // 非配置参数，共有id,xAxis,yAxis,legend, 以及series中的data
    // 其中id可以默认，故非必传
    // xAxis和yAxis是line和bar才需传，
    // 需要的参数，均是id, x, y,seriesdata,legend,seriesOps, 6个参数，其中id非必须

    // TODO 还一个进一步的优化，所各配置项写在一个“配置对象”了。。。换项目时，直接改“配置对象”即可
    // 即参数分为四类：数据、功能性配置、风格性配置、自定义配置。后两个可以单独抽出来做为一个对象，换项目时，
    // 直接改这个即可
    // “配置对象”可以在完成之后，再进行抽离，也可以一开始时就抽离出来了

    // 统一颜色、位置，边矩
    // 以下所有的都是标准的图形
    var render = function (option) {
        var myChart = echarts.init(document.getElementById(option._id || 'chartWrap'));

        var defaultOps = {};
        if (option._legend) { //只有一个series时，legend不能点击
            defaultOps.legend = option._legend instanceof Array ? { left: 30, top: 0, selectedMode: option._legend.length > 1, data: option._legend } : $.extend({ selectedMode: false }, option._legend);
        }

        //若未设置type, 默认x轴的类型为category， y轴为value
        if (option._x || option._y) {
            option.xAxis = option._x instanceof Array ? { type: 'category', data: option._x } : (option._x || { type: 'value' });
            option.yAxis = option._y instanceof Array ? { type: 'value', data: option._y } : (option._y || { type: 'value' });
        }
        defaultOps.grid = {
            left: 30,
            top: 60, // 注意留legend的空间
            right: 10, // 右边无Y轴
            bottom: 30
        }
        // defaultOps.textStyle= {}; //设置全局的文本的字体样式
        // defaultOps.color = []; //设置全局的颜色
        // defaultOps.backgroundColor = ''; // 设置全局的背景颜色


        // 为echarts对象加载数据 
        return myChart.setOption($.extend(true, defaultOps, option));

    };

    /**
     * 从_data中取值, _data的格式：每个sery可以数组或对象
     */
    function setLineSeries(type, option) { // line或bar
        var series = [];
        if (!option._data) {
            return series;
        }
        var defaultSeriesOps = {
            type: type,
            // line和bar类的一些通用样式可以在这里设置
            itemStyle: {},
            lineStyle: {}
        };

        // 设置数据
        if (!(option._data instanceof Array)) { // 第一种对象{}形式
            series.push($.extend(true, defaultSeriesOps, option._seriesOps, option._data));
        } else { //是个数组
            if (option._data[0][0] === undefined) { // 第二种一维数组[]形式，即只有一条series
                series.push($.extend(true, defaultSeriesOps, option._seriesOps, {
                    name: option._legend[0] || '',
                    data: option._data
                }));

            } else { // 第三种混合型
                for (var i = 0; i < option._data.length; i++) {
                    // 区别数组或对象
                    if (option._data[i] instanceof Array) {
                        series.push($.extend(true, defaultSeriesOps, option._seriesOps, {
                            name: option._legend[i] || '',
                            data: option._data[i]
                        }));
                    } else {
                        series.push($.extend(true, defaultSeriesOps, option._seriesOps, option._data[i]));
                    }
                }
            }
        }
        return series;
    }

    /**
     * 单饼图 和 线图不一样，后者是一组数据对应一个图例，前者是一个value对应一个
     * 饼图的比较特殊，一个value就对应一个name, 本例中因为要显示labelLine，若data为[1,3444]数值则无法显示label
     * 比较特殊，故定义_data的元素都必须是value,name的值对
     */
    function setPieSeries(option) {

        var series = [];
        if (!option._data) {
            return series;
        }

        var defaultSeriesOps = {
            type: 'pie',
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '24',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
            //  labelLine: {}
        };

        // 暂时只有单饼图，多饼图的不扩展了，太复杂不便于作为介绍性的例子
        if (option._data[0].center && option._data[0].data) {
            series.push($.extend(true, defaultSeriesOps, option._seriesOps, option._data)); // 注意继承顺序
        } else {
            series.push($.extend(true, defaultSeriesOps, { data: option._data }, option._seriesOps)); // 注意继承顺序
        }

        return series;
    };

    /**
     * _id
     * _x, _y
     * _data: 一个series时可为[]或{}, 多个时[[],{}], 里面的series可以[]和{}混合
     * _seriesOps
     * _lengend
     * 
     */
    var line = function (option) {
        // 拼接series, 需要legend, data两个参数
        var ops = {
            series: setLineSeries('line', option)
        };
        return render($.extend(true, ops, option));
    };

    var area = function (option) {
        var ops = {
            itemStyle: {
                normal: { areaStyle: 'default' }
            }
        };
        return line($.extend(true, { _seriesOps: ops }, option)); // 注意ops 深拷贝至option的_seriesOps属性之上
    };
    var bar = function (option) {
        var ops = {
            series: setLineSeries('bar', option)
        };
        return render($.extend(true, ops, option));

    };
    var pie = function (option) {
        var ops = {
            series: setPieSeries(option),
            grid: { // 设置边矩
                right: 30, // 覆盖默认的10
            }
        };
        // pie无坐标
        option._x = undefined;
        option._y = undefined;
        return render($.extend(true, ops, option));
    };
    var ring = function (option) {
        var ops = {
            radius: ['50%', '70%'],
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
        };
        return pie($.extend(true, { _seriesOps: ops }, option)); // 注意ops 深拷贝至option的_seriesOps属性之上
    };
    var rose = function (option) {
        var ops = {
            radius: ['10%', '70%'],
            roseType: 'angle',
            itemStyle: {
                normal: {
                    label: {
                        show: true
                    },
                    labelLine: {
                        show: true
                    }
                },
                emphasis: {
                    label: {
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                }
            },
        };
        return pie($.extend(true, { _seriesOps: ops }, option)); // 注意ops 深拷贝至option的_seriesOps属性之上
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