/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-02-27
 * @desc:地图测量
 */
define(["ol", "jquery"], function (ol, $) {

    var measure = {
        init: init, //初始化测量
        exit: exit, //退出测量
        clear: clear //清除测量时绘制的图形及overlays
    };
    return measure;

    var olMap,
        olDraw,
        olSource,
        lineStyle,
        tooltipOverlays;

    function init(map) {
        olMap = map;
        tooltipOverlays = [];
        olSource = new ol.source.Vector();
        lineStyle = new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#cd6600',
                width: 4
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        });
        var vector = new ol.layer.Vector({
            source: olSource,
            style: lineStyle
        });
        map.addLayer(vector);

        var sketch, //current draw feature
            measureTooltipElement,
            measureTooltip;

        function addInteraction() {
            olDraw = new ol.interaction.Draw({
                source: olSource,
                type: "LineString",
                // style: lineStyle
            });
            map.addInteraction(olDraw);

            var listener;
            olDraw.on("drawstart", function (evt) { //开始绘制时添加提示
                createMeasureTooltip();
                sketch = evt.feature;
                var tooltipCoord = evt.coordinate;
                listener = sketch.getGeometry().on("change", function (evt) {
                    var geom = evt.target;
                    var output = formatLength(geom);
                    tooltipCoord = geom.getLastCoordinate();
                    measureTooltipElement.innerHTML = output;
                    measureTooltip.setPosition(tooltipCoord);
                });
            });

            olDraw.on("drawend", function (evt) { //结束绘制
                measureTooltipElement.className = 'tooltip tooltip-static';
                measureTooltip.setOffset([6, -12]);
                sketch = null;
                measureTooltipElement = null;
                createMeasureTooltip();
                ol.Observable.unByKey(listener);
            });
        }

        function createMeasureTooltip() { //创建提示框
            if (measureTooltipElement) {
                measureTooltipElement.parentNode.removeChild(measureTooltipElement);
            }
            measureTooltipElement = document.createElement('div');
            measureTooltipElement.className = 'tooltip tooltip-measure';
            measureTooltip = new ol.Overlay({
                element: measureTooltipElement,
                offset: [0, -15],
                positioning: 'bottom-center'
            });
            map.addOverlay(measureTooltip);
            tooltipOverlays.push(measureTooltip);
        }

        addInteraction();
    }

    function formatLength(line) { //格式化线的长度
        var length = ol.Sphere.getLength(line);
        var output;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) + ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) + ' ' + 'm';
        }
        return output;
    }

    function exit() {
        if (olMap && olDraw) {
            olMap.removeInteraction(olDraw);
        }
        clear();
    }

    function clear() {
        if (olMap && tooltipOverlays) { //清除overlays
            tooltipOverlays.forEach(function (item) {
                if (item) {
                    item.setPosition(null);
                    olMap.removeOverlay(item);
                }
            });
        }
        if (olSource) { //清除feature
            olSource.clear();
        }
        olMap && olMap.renderSync(); //渲染地图
    }
});