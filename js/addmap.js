var map = echarts.init(document.getElementById("mapchart"));
var option = {
    title: {
        show: true,
        text: '某次疫情统计',
        left: 'center',
        textStyle: {
            color: 'red',
            fontSize: '16'
        }
    },
    tooltip: {
        trigger: "item",
        backgroundColor: 'opacity',
        // alwaysShowContent:true,
        position: function (point, params, dom, rect, size) {
            $(dom).html(`
            <ul id="prov">
            <li><span>${params.name}</span></li>
            <li><span>新增确诊</span><span>${Math.ceil(Math.random() * 1000)}</span></li>
            <li><span>新增疑似</span><span>${Math.ceil(Math.random() * 3000)}</span></li>
            <li><span>新增治愈</span><span>${Math.ceil(Math.random() * 2000)}</span></li>
            <li><span>新增死亡</span><span>${Math.ceil(Math.random() * 100)}</span></li>
            </ul>
            `);
            // return ['2%', '70%'];//固定浮框的位置
        },
        textStyle : {
            color: 'black',
            decoration: 'none',
            fontSize: 15       
        },
    },
    roamController: {
        x: "right",
        mapTypeControl: {
            china: true
        }
    },
    series: {
        name: "疫情统计",
        type: "map",
        // roam:true,//支持鼠标缩放和移动
        zoom: 1.2,//地图放大1.2倍
        mapType: "china",
        mapValueCalculation: "sum",
        label: {//图形上的文本标签,拥有label的一系列属性
            // show: true
        },
        emphasis: {//高亮状态下的样式
            label: {
                show: true
            },
            itemStyle: {
                areaColor: '#FEF200',
                borderColor: '#D8B915',
                borderWidth: 2
            },
        },
        itemStyle: {
            // color: function (params) {
            //     var colorList = [
            //         '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
            //         ......
            //     ];
            //     return colorList[params.dataIndex]
            // },
            color: function (params) {//seriesIndex, dataIndex, data, value
                if (params.value < 2000) {
                    return '#ffcccc'
                } else if (params.value > 2000 && params.value <= 4000) {
                    return '#ff8080'
                } else if (params.value > 4000 && params.value <= 6000) {
                    return '#ff3333'
                } else if (params.value > 6000 && params.value <= 8000) {
                    return '#cc0000'
                } else if (params.value > 8000) {
                    return '#800000'
                }
            }
        },
        data: [
            {
                // value: [8920,123,456],//如果有更多数据可以这样存放，然后用params.data.value[i]获取
                value: 8920,
                name: "江苏",
            },
            {
                value: 8588,
                name: "浙江"
            },
            {
                value: 8215,
                name: "四川"
            },
            {
                value: 7586,
                name: "广东"
            },
            {
                value: 6324,
                name: "山东"
            },
            {
                value: 6112,
                name: "福建"
            },
            {
                value: 5989,
                name: "湖南"
            },
            {
                value: 5448,
                name: "广西"
            },
            {
                value: 4994,
                name: "辽宁"
            },
            {
                value: 4528,
                name: "江西"
            },
            {
                value: 4767,
                name: "安徽"
            },
            {
                value: 4573,
                name: "贵州"
            },
            {
                value: 4544,
                name: "湖北"
            },
            {
                value: 3903,
                name: "山西"
            },
            {
                value: 3747,
                name: "吉林"
            },
            {
                value: 3342,
                name: "黑龙江"
            },
            {
                value: 3345,
                name: "河南"
            },

            {
                value: 2887,
                name: "甘肃"
            },
            {
                value: 2837,
                name: "台湾"
            },
            {
                value: 2673,
                name: "内蒙古"
            },
            {
                value: 2177,
                name: "海南"
            },
            {
                value: 2074,
                name: "新疆"
            },
            {
                value: 2783,
                name: "河北"
            },
            {
                value: 2354,
                name: "上海"
            },
            {
                value: 2093,
                name: "北京"
            },
            {
                value: 2034,
                name: "重庆",
            },
            {
                value: 1932,
                name: "天津"
            },

            {
                value: 1872,
                name: "云南"
            },
            {
                value: 1838,
                name: "青海"
            },
            {
                value: 1626,
                name: "西藏"
            },
            {
                value: 1563,
                name: "陕西"
            },
            {
                value: 1172,
                name: "宁夏"
            },
            {
                value: 677,
                name: "香港"
            },
            {
                value: 443,
                name: "澳门"
            },
            {
                name: '南海诸岛', value: 0,
                itemStyle: {
                    normal: {
                        opacity: 0,
                        label: { show: false },
                        borderWidth: "0", borderColor: "#10242b", areaStyle: { color: '#10242b' }
                    }
                }
            },
        ]
    }
};

map.setOption(option);
map.on('click', function (params) {
    prov = params.name;
    lineGraph();
});
map.dispatchAction({
    type: 'showTip',//默认显示江苏的提示框
    seriesIndex: 0,//这行不能省
    dataIndex: 0
});


$('li.tobdy').mouseenter(function () {
    var thisIndex = $(this).index() - 2;//同辈的最前面还有两个li
    // $.each(data,function (i) {
    //     data[i].selected = false;
    // });
    // data[thisIndex].selected = true;
    // map.setOption(option);
    map.dispatchAction({
        type: 'mapSelect',
        seriesIndex: 0,
        dataIndex: thisIndex
    });

    map.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: thisIndex
    });
});

$('li.tobdy').mouseleave(function () {
    var thisIndex = $(this).index() - 2;
    // data[thisIndex].selected = false;
    // map.setOption(option);
    map.dispatchAction({
        type: 'mapUnSelect',
        seriesIndex: 0,
        dataIndex: thisIndex
    });
    map.dispatchAction({
        type: 'hideTip',
        seriesIndex: 0,
        dataIndex: thisIndex
    });
});
// map.on('click',function (params) {
//     console.log(params.data.value);
// });

window.onresize = function () {
    map.resize();
};