var mf = mf || {};
/**
 * mf-echarts对原插件echarts做了以下封装:
 * 只取简单的几种图形：拆线（包括面积）、柱图、饼图（环、玫瑰），一共6个
 */
mf.echarts = (function () {
    // 需要的参数，均是id, x, y,data,legend, 五个参数，其中id非必须
    // 统一颜色、位置，边矩
    // TODO  多相需要解决这种，参数继承的覆盖的问题！
    // 以下所有的都是标准的图形
    var render = function (option) {
        var myChart = echarts.init(document.getElementById(option.id || 'chartWrap'));

        // 很容易冲突的属性，命名为_data?
        var defaultOps = {};
        if (option._legend) { //只有一个series时，legend不能点击
            defaultOps.legend = option._legend instanceof Array ? { left: 30, top: 20, selectedMode: option.series.length > 1, data: option._legend.slice(0, option.series.length) } : option._legend;
        }

        //若未设置type, 默认x轴的类型为category， y轴为value
        if (option._x || option._y) {
            option.xAxis = option._x instanceof Array ? { type: 'category', data: option._x } : (option._x || { type: 'category' });
            option.yAxis = option._y instanceof Array ? { type: 'value', data: option._y } : (option._y || { type: 'value' });
        }
        // 设置组件边矩，基本上填满容器。若不需要这么多，可以设置div的padding样式

        // 设置line和bar的边矩, 默认只有x轴和y轴各一条，多条的和pie的在边矩在多相函数里面定义
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
        return myChart.setOption($.extend(defaultOps, option));

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
            series.push($.extend(defaultSeriesOps, option._data, option));
        } else { //是个数组
            if (option._data[0][0] === undefined) { // 第二种一维数组[]形式，即只有一条series
                series.push($.extend(defaultSeriesOps, {
                    name: option._legend[0] || '',
                    data: option._data
                }, option));

            } else { // 第三种混合型
                for (var i = 0; i < option._data.length; i++) {
                    // 区别数组或对象
                    if (option._data[i] instanceof Array) {
                        series.push($.extend(defaultSeriesOps, {
                            name: option._legend[i] || '',
                            data: option._data[i]
                        },option));
                    } else {
                        series.push($.extend(defaultSeriesOps, option._data[i],option));
                    }
                }
            }
        }
        return series;
    }

    /**
     * 单饼图，
     */
    function setPieSeries(option) {

        // 标准pie 不需要name属性，同样legend也不需要, 因为单个饼肯定不需要，而若多个饼则肯定是分开的

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

        // _data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 548, name: '搜索引擎' }]
        // 或者对象格式
        // 若是多饼图，则第一个对象元素，必定有center和data属性，故可依此判断

        // 暂时只有单饼图，多饼图的不扩展了，太复杂不便于作为介绍性的例子
        // 想扩展的可以根据：第一个对象元素，必定有center和data属性，故可依此判断
        if (option._data[0].center && option._data[0].data) {
            series.push($.extend(defaultSeriesOps, option._data));
        } else {
            series.push($.extend(defaultSeriesOps, { data: option._data }));
        }

        return series;
    };

    var line = function (option) {
        // 拼接series, 需要legend, data两个参数
        var ops = {
            series: setLineSeries('line', option)
        };
        return render($.extend(ops, option));
    };

    //TODO area失效了
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
            series: setLineSeries('bar', option)
        };
        return render($.extend(ops, option));

    };
    var pie = function (option) {
        // 去坐标而是出现坐标轴了
        var ops = {
            series: setPieSeries(option),
            grid: { // 设置边矩
                right: 30, // 覆盖默认的10
            }
        };
        // pie无坐标
        option._x = undefined;
        option._y = undefined;
        return render($.extend(ops, option));
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
        return pie($.extend(ops, option));
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
        return pie($.extend(ops, option));
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