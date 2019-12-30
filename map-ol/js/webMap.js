/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-02-27
 * @desc:地图
 */
define(["jquery", "ol", "layers", "qinghai", "common", "config"], function ($, ol, layers, qinghai,common, config) {
    var webMap = {
        map: null,
        center: [116, 38],
        zoom: 8,
        projectList: null, //工程列表，查询时会用到
        districtSource: null, //区划，定位区划时会用到
        // currentDistrict: null,
        init: function (center, zoom, extent) {
            var self = this;
            this.center = center || [116, 39];
            this.zoom = zoom || 6;
            var minLon = 91.7,
                maxLon = 100.5,
                minLat = 33.3,
                maxLat = 37;
            this.extent = extent || [minLon, minLat, maxLon, maxLat];

            var olMap = new ol.Map({
                layers: [
                    // layers.googleMap,
                    layers.googleRaster
                    // layers.offlineMapLayer
                    // layers.offlineMapLabel
                ],
                target: "map",
                controls: ol.control.defaults({
                    zoom: false,
                    attribution: false
                }),

                view: new ol.View({
                    center: ol.proj.transform(self.center, "EPSG:4326", "EPSG:3857"),
                    zoom: self.zoom,
                    minZoom: 5,
                    maxZoom: 18,
                    projection: "EPSG:3857"
                    // zoomFactor: 2,
                    // extent: ol.proj.transformExtent(self.extent, "EPSG:4326", "EPSG:3857")
                })
            });
            webMap.map = olMap;
            renderSync();
        },

        loadDistrict: function () { //加载区划数据
            loadDistrict();
        },

        loadProject: function () { //加载工程数据
            return loadProject();
        },

        addSelectInteraction: function (layer) { //添加选择的交互处理-工程详情页面
            var self = this;
            var container = document.getElementById("project-info");
            var closer = document.getElementById("project-info-closer");
            var overlay = new ol.Overlay({
                element: container,
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            closer.onclick = function () {
                overlay.setPosition(null);
                closer.blur();
            };
            self.map.addOverlay(overlay);

            var selectInteraction = new ol.interaction.Select({
                layers: [layer],
                hitTolerance: 20
            });
            selectInteraction.on("select", function (evt) {
                var feature = evt.selected[0];
                if (!feature) {
                    return;
                }
                var properties = feature.getProperties();
                var content = document.getElementById("project-info-content");
                content.innerHTML = "<ul>\
                                        <li title=" + properties.name + "><span class='left-column'>名称：</span><span class='right-column'>" + properties.name + "</span></li>\
                                        <li><span class='left-column'>工程状态：</span><span class='right-column'>" + properties.stateName + "</span></li>\
                                        <li title=" + properties.address + "><span class='left-column'>地址：</span><span class='right-column'>" + properties.address + "</span></li>\
                                        <li title=" + properties.builtUnit + "><span class='left-column'>建设单位：</span><span class='right-column'>" + properties.builtUnit + "</span></li>\
                                        <li><span class='left-column'>建筑面积：</span><span class='right-column'>" + properties.area + "</span></li>\
                                        <li><span class='left-column'>平时用途：</span><span class='right-column'>" + properties.pacetimeuseName + "</span></li>\
                                        <li><span class='left-column'>战时用途：</span><span class='right-column'>" + properties.wartimeuseName + "</span></li>\
                                    </ul>";
                var coordinate = feature.getGeometry().getCoordinates();
                overlay.setOffset([8, -4]);
                overlay.setPosition(coordinate);
            });
            self.map.addInteraction(selectInteraction);
        }
    };
    return webMap;

    function renderSync(map) { //渲染地图
        var map = webMap.map;
        map.on("change:view", function () {
            map.renderSync();
            console.log("view changeing...");
        })
    }

    //start 添加行政区划
    function loadDistrict() {
        var format = new ol.format.GeoJSON();
        var source = new ol.source.Vector();
        var featureArray = format.readFeatures(qinghai.data);
        for (var i = 0, length = featureArray.length; i < length; i++) {
            var feature = featureArray[i];
            feature.getGeometry().transform("EPSG:4326", "EPSG:3857");
            feature.setId(feature.get("code"));//把id作为key,方便查找
            source.addFeature(feature);
        }
        var districtStyle = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(65, 110, 220, 0.95)",
                width: 2
            })
        });
        var districtLayer = new ol.layer.Vector({
            source: source,
            style: districtStyle
        });
        webMap.map.addLayer(districtLayer);
        webMap.districtSource = source;
    }//end 添加行政区划

    //start 添加工程数据
    function loadProject() {
        var projectList = [];
        var source = new ol.source.Vector();

        $.ajax({
            type: "get",
            url: config.rootUrl + "/listProjectInfo",
            dataType: "json",
            success: function (res) {
                if(res && res.length){
                    for (var i = 0, len = res.length; i < len; i++) {
                        var info = res[i];
                        var point = new ol.geom.Point();
                        point.setCoordinates([Number(info.longitude), Number(info.latitude)]);
                        var feature = new ol.Feature({
                            geometry: point.transform("EPSG:4326", "EPSG:3857"),
                        });
                        info.area = !info.area ? "" : info.area + " m<sup>2</sup>";
                        info = removeNull(info);
                        feature.setProperties(info);
                        projectList.push(info);//把全部工程缓存起来，搜索时用
                        feature.setStyle(getImgStyle(info.pacetimeuse, info.state));
                        source.addFeature(feature);
                    }
                    webMap.projectList = projectList;
                    var projectLayer = new ol.layer.Vector({
                        source: source,
                        zIndex: 100
                    });
                    webMap.map.addLayer(projectLayer);
                    webMap.addSelectInteraction(projectLayer);
                }
            },
            error: function (xhr, mes, e) {
                common.printInfo(mes, "初始化时查询工程信息");
            }
        });

        //获取样式的方法
        function getImgStyle(paceUseCode, stateCode) {
            var paceUse = paceUseCode || "2N",
                state = stateCode || 4,
                src = "./resource/img/project/" + paceUse + "_" + state + ".png",
                styleIcon = new ol.style.Icon({
                    src: src,
                    opacity: 0.95,
                    // scale: 0.12,
                    // imgSize: [5, 5],
                    snapToPixel: true
                });

            return new ol.style.Style({
                image: styleIcon
            });
        }

        //把查询结果中字面量null转换为""
        function removeNull(obj){
            Object.keys(obj).forEach(function(key){
                obj[key] = (obj[key] == null || (obj[key]).toString().toLowerCase() == "null") ? "" : obj[key];
            });
            return obj;
        }

    }//end 添加点数据

});