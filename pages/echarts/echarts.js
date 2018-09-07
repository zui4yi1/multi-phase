$(function () {
  mf.echarts.area({
    _x: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
    _seriesOps: {},
    _legend: ['销量'],
    //  _data: [[5, 20, 40, 10, 10, 20], [15, 10, 20, 13, 11, 23], { name: '总计', data: [10, 12, 22, 15, 12, 26] }]
    _data: { name: '销量', data: [10, 12, 22, 15, 12, 26] }
    //   _data: [5, 20, 40, 10, 10, 20],    
  });
  mf.echarts.ring({
    _id: 'chartWrap2',
    _seriesOps: {},
    _legend: ['直接访问', '邮件营销', '联盟广告'],
    _data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 548, name: '搜索引擎' }]
  });
});


