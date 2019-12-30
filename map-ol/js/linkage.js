/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-03-07
 * @desc:联动
 */
define(["ol", "jquery", "common", "config"], function (ol, $, common, config) {

    var App = {
        map: null,
        districtSource: null,
        userid: null,//用户Id
        socketid: null,//创建websocket时的id, MIS使用userid,GIS使用userid + "gis"，保证同一个用户之间通信
        websocket: null,
        init: function (webMap, userid) {
            this.map = webMap.map;
            this.districtSource = webMap.districtSource;
            this.userid = userid;
            this.socketid = this.userid + "gis";
            initWebSocket(this.socketid);
        },
        getCoordinate: function () { //获取点击位置的坐标
            var self = this,
                info = "请在地图上点击获取坐标",
                btnHTML = '<input id="btn-enter" type="button" title="确定" value="确定" class="info-btn">\
                <input id="btn-cancel" type="button" title="取消" value="取消" class="info-btn">',
                listener = null,
                source = new ol.source.Vector(),
                cancelBtnCallback = function () {
                    $("#info-window").hide();
                },
                enterBtnCallback = function () {
                    $("#info-window").hide();
                    listener = self.map.on("singleclick", function (event) {
                        var coord = event.coordinate,
                            longLat = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326"),
                            zoom = self.map.getView().getZoom();
                        common.printInfo(longLat[0].toFixed(6) + ", " + longLat[1].toFixed(6), "点击位置");
                        common.printInfo(zoom, "当前Zoom");

                        var feature = common.createFeature(coord);
                        source.clear();
                        source.addFeature(feature);
                        var layer = new ol.layer.Vector({
                            source: source,
                            zIndex: 101
                        });
                        self.map.addLayer(layer);

                        info = "确定选取当前位置吗？";
                        btnHTML = '<input id="tail-btn-enter" type="button" title="确定" value="确定" class="info-btn">\
                        <input id="tail-btn-cancel" type="button" title="取消" value="取消" class="info-btn">';
                        cancelBtnCallback = function () {
                            overlay.setPosition(null);
                            source.clear();
                            self.map.renderSync();
                        };
                        enterBtnCallback = function () {
                            overlay.setPosition(null);
                            source.clear();
                            self.map.removeLayer(layer);
                            self.map.renderSync();
                            ol.Observable.unByKey(listener);
                            self.map.un("singleclick");
                            sendLonlat(longLat[0].toFixed(6), longLat[1].toFixed(6)); //把坐标发送给MIS
                        };

                        common.showTailInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback, enterBtnCallback, null);
                        //显示提示弹窗
                        var overlay = new ol.Overlay({
                            element: document.getElementById("tail-info-window"),
                            autoPan: true,
                            autoPanAnimation: {
                                duration: 250
                            }
                        });
                        self.map.addOverlay(overlay);
                        overlay.setOffset([4, -4]);
                        overlay.setPosition(coord);
                    });
                };
            common.showInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback);
        },

        flyTo: function(longitude, latitude){
            common.flyTo([Number(longitude), Number(latitude)]);
        },

        //定位到区划并高亮一下
        flyToDistrict: function (disCode) { //西宁市:630100 海东:630200  玉树:632700  黄南:632300 海西:632800 海南:632500 海北:632200 果洛:632600
            var self = this,
                extent = null,
                feature = self.districtSource.getFeatureById(disCode);
            if (feature) {
                feature.setStyle(new ol.style.Style({
                    fill: new ol.style.Fill({
                        color: "rgba(255, 0, 0, 0.5)"
                    }),
                    stroke: new ol.style.Stroke({
                        color: "rgba(65, 110, 220, 0.95)",
                        width: 2
                    })
                }));
                self.map.renderSync(); //渲染地图
                extent = feature.getGeometry().getExtent();
                self.map.getView().fit(extent, {
                    duration: 2000
                });
                setTimeout(function () {
                    feature.setStyle(new ol.style.Style({
                        stroke: new ol.style.Stroke({
                            color: "rgba(65, 110, 220, 0.95)",
                            width: 2
                        })
                    }));
                }, 4000);
            }
        }

    };
    return App;

    //初始化websocket，用于和MIS通信
    function initWebSocket(socketId){
        var websocket = null;
        //创建socket连接时需要一个id,mis用userid，gis使用userid + "gis",这样能同一个用户的mis和gis通信
        //发送消息时mis系统指定发送给Id为userid + "gis"，gis系统则发送给userid
        websocket = new WebSocket(config.socketRootUrl + socketId);
        window.onbeforeunload = function () { //主动关闭websocket
            websocket.close();
        };
        App.websocket = websocket;

        websocket.onopen = function () {
            common.printInfo("WebSocket打开连接");
        };
        websocket.onclose = function () {
            common.printInfo("WebSocket关闭连接");
        };
        websocket.onerror = function () {
            common.printInfo("WebSocket连接错误");
        };
        websocket.onmessage = function (event) {
            var data = event.data;
            common.printInfo("WebSocket连接返回：" + data);
            var type = JSON.parse(data).message.type.toString();
            switch (type) {
                case "1": //获取坐标
                    App.getCoordinate();
                    break;
                case "2": //定位到坐标
                    var longitude = JSON.parse(data).message.longitude.toString();
                    var latitude = JSON.parse(data).message.latitude.toString();
                    App.flyTo(longitude, latitude);
                    break;
                case "3": //定位到区划
                    var district = JSON.parse(data).message.district.toString();
                    App.flyToDistrict(district);
                    break;
            }
        };
    }

    //发送坐标给mis
    function sendLonlat(longitude, latitude){
        var data = {
            receiver: App.userid,
            message: {
                type: "1", //1 获取坐标，2 定位到坐标， 3 定位到区划
                longitude: longitude,
                latitude: latitude,
                district: "",
                value: ""
            }
        };
        App.websocket.send(JSON.stringify(data));
    }

});