var graphtype = 0;
var prov="湖北";
var graphlist = ["新增确诊","累计确诊","累计死亡"];
function lineGraph() {

    // var dom = [document.getElementById("line0"),
    // document.getElementById("line1"),
    // document.getElementById("line2")];
    var dom = document.getElementById("provgraph");
    var myChart = echarts.init(dom);
    var app = {};

    option = null;
    option = {
        title: {
            show: true,
            text: prov + graphlist[graphtype],
            left: 'center',
            textStyle: {
                color: 'black',
                fontSize: '16'
            }
        },
        xAxis: {
            type: 'category',
            data: ['1.25', '1.26', '1.27', '1.28', '1.29', '1.30', '1.31']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [Math.ceil(Math.random() * 820),
            Math.ceil(Math.random() * 932),
            Math.ceil(Math.random() * 901),
            Math.ceil(Math.random() * 934),
            Math.ceil(Math.random() * 1290),
            Math.ceil(Math.random() * 1330),
            Math.ceil(Math.random() * 1320)],
            type: 'line',
            smooth: true
        }]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }

}
lineGraph();