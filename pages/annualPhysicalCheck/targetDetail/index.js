// 引入高德 js api
<script src="https://webapi.amap.com/maps?v=2.0&key=a5f58e993c4963f5e563fdc87881fb53&plugin=AMap.RangingTool,AMap.MouseTool,AMap.Visual"></script>
<!--引入UI组件库（1.1版本） -->
<script src="//webapi.amap.com/ui/1.1/main.js?v=1.1.1"></script>


    const amapStyleIcon = document.querySelector('.amap-style-icon');
    const amapStyleList = document.querySelector('.amap-style-list');
    const amapToolboxIcon = document.querySelector('.amap-toolbox .amap-toolbox-operation-icon');
    const amapToolboxList = document.querySelector('.amap-toolbox-list');

    amapStyleIcon.addEventListener('click', (e) => {
    amapStyleList.classList.toggle('hide-amap-style-list');
});
    amapToolboxIcon.addEventListener('click', (e) => {
    const amapToolboxList = document.querySelector('.amap-toolbox-list-container');
    amapToolboxList.classList.toggle('amap-toolbox-list-hide');
})


    var map = new AMap.Map('middle-amap-container',{
    zoom: 12,
    center: [116.39,39.9]
});
    var visual = new AMap.Visual('amap://visual/04bb9a09bc060f3f6daac9bb37780ec9', map);

    AMapUI.loadUI(['control/BasicControl'], function(BasicControl) {

    const  zoomCtrl = new BasicControl.Zoom({
    theme: 'dark',
    position: 'br',
    showZoomNum: false
});

    map.addControl(zoomCtrl);
    const zoomInOperation = document.querySelector('.zoom-in');
    const zoomOutOperation = document.querySelector('.zoom-out');

    zoomInOperation.addEventListener('click', (e) => {
    zoomCtrl.zoomIn();
});
    zoomOutOperation.addEventListener('click', (e) => {
    zoomCtrl.zoomOut();
});

});

    //默认样式
    ruler = new AMap.RangingTool(map);
    const rangingDistanceOperation = document.querySelector('.ranging-distance');

    rangingDistanceOperation.addEventListener('click', (e) => {

    const target = e.currentTarget;
    const img = target.children[0];
    if (target.classList.contains('show-ranging-distance-close-icon')) {
    img.src = '../../../public/images/icons/toolbox-ruler.svg';
    target.title = '测量距离';
    target.classList.remove('show-ranging-distance-close-icon');
    //关闭，并清除覆盖物
    ruler.turnOff(true);
    // ruler.close()
} else {
    img.src = '../../../public/images/icons/close.svg';
    target.title = '关闭测量距离';
    target.classList.add('show-ranging-distance-close-icon')
    ruler.turnOn();
}
});


    const mouseTool = new AMap.MouseTool(map);

    /**
    * 测量面积
    * @param type
    */
    function draw(){
    mouseTool.measureArea({
        strokeColor:'#80d8ff',
        fillColor:'#80d8ff',
        fillOpacity:0.5
        //同 Polygon 的 Option 设置
    });
}

    const measureAreaOperation = document.querySelector('.measure-area');

    measureAreaOperation.addEventListener('click', (e) => {
    const target = e.currentTarget;
    const img = target.children[0];
    if (target.classList.contains('show-measure-area-close-icon')) {
    img.src = '../../../public/images/icons/toolbox-area.svg';
    target.title = '测量面积';
    target.classList.remove('show-measure-area-close-icon');
    //关闭，并清除覆盖物
    mouseTool.close(true);
} else {
    img.src = '../../../public/images/icons/close.svg';
    target.title = '关闭测量面积';
    target.classList.add('show-measure-area-close-icon')
    draw();
}
});


    const clearLayerOperation = document.querySelector('.clear-layer');

    clearLayerOperation.addEventListener('click', (e) => {
    // 清除地图上所有添加的覆盖物
    map.clearMap();
})



    const allStyleNameList = Array.from(document.querySelectorAll('.style-name'));

    // 切换地图样式
    amapStyleList.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('style-name')) {

    console.log(visual._visualStyle.map.style)
    const selected = allStyleNameList.find(item => item.classList.contains('style-name-selected'));


    selected.classList.remove('style-name-selected');
    target.classList.add('style-name-selected');
    const mapstyle = target.dataset.mapstyle;

    let styleUrl;

    if (mapstyle === 'default') {
    styleUrl = visual._visualStyle.map.style;
} else {
    styleUrl = `amap://styles/${mapstyle}`;
}

    map.setMapStyle(styleUrl);
}

});

