/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-03-13
 * @desc:热点管理
 */
define(["jquery", "ol", "measure", "config", "common"], function ($, ol, measure, config, common) {
    var poi = {
        map: null,
        source: null, //临时绘制热点的source
        layer: null, //临时放置热点的图层
        poiArr: null, //热点
        eventListener: null, //地图注册的事件
        interactions: [], //地图交互
        init: function (webMap) {
            var self = this;
            self.map = webMap.map;
            self.source = new ol.source.Vector();
            $("#poi-info-window").show();
            loadPoi(); // 加载热点数据
            initTools(); // 初始化工具
        },
        exit: function () {
            var self = this;
            self.source && self.source.clear();
            self.map.removeLayer(self.layer);
            removeInteractions();
            if (poi.eventListener) { //取消已注册的地图事件
                ol.Observable.unByKey(poi.eventListener);
            }
        }
    };
    return poi;

    function initTools() {
        $("#poi-info-closer").click(function () { // 关闭
            $("#poi-info-window").hide();
            poi.exit();
        });

        //删除热点
        $("#poi-tool-delete").click(function () {
            var info = "确定删除该热点吗？",
                btnHTML = '<input id="btn-enter" type="button" title="确定" value="确定" class="info-btn">\
                           <input id="btn-cancel" type="button" title="取消" value="取消" class="info-btn">',
                cancelBtnCallback = function () {
                    $("#info-window").hide();
                },
                enterBtnCallback = function () {
                    var id = $(".poi-info-foucs").attr("id");
                    var url = config.rootUrl + "/deletePOI";
                    $.post(url, {id: id}, function (data, textStatus, jqXHR) {
                        common.printInfo(data, "删除热点结果");
                        $("#info-window").hide();
                        loadPoi(); //加载热点
                    }, "json");
                };
            common.showInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback);
        });

        // 编辑热点
        $("#poi-tool-edit").click(function () {
            flyToPoi();
            if (poi.eventListener) { //取消已注册的地图事件
                ol.Observable.unByKey(poi.eventListener);
            }
            removeInteractions(); //清除地图交互

            var id = $(".poi-info-foucs").attr("id"),
                longitude = $(".poi-info-foucs").attr("longitude"),
                latitude = $(".poi-info-foucs").attr("latitude"),
                poiName = getPoiNameById(id),
                listener = null,
                coord = [Number(longitude), Number(latitude)];

            var modify = new ol.interaction.Modify({source: poi.source}),
                snap = new ol.interaction.Snap({
                    source: poi.source,
                    pixelTolerance: 12
                });
            poi.map.addInteraction(modify);
            poi.map.addInteraction(snap);
            poi.interactions.push(modify);//记录添加的交互
            poi.interactions.push(snap);
            listener = modify.on("modifyend", function (event) {
                //把获取到坐标后，转换为经度和纬度，放入框中
                var coord = event.mapBrowserEvent.coordinate,
                    longLat = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326");
                $("#poi-long").val(longLat[0].toFixed(6));
                $("#poi-lat").val(longLat[1].toFixed(6));
                // 取消验证提示
                $("#tips-long div").hide();
                $("#tips-lat div").hide();
                overlay.setPosition(coord);
                common.printInfo(coord);
            });
            poi.eventListener = listener; //记录当前注册的事件

            var info = getPoiInfoHTML(longitude, latitude, poiName);
            var btnHTML = getBtnHTML();
            var cancelBtnCallback = function () { //点击取消按钮时，清除屏幕上绘制的点
                overlay.setPosition(null);
                poi.source.clear();
                poi.map.removeLayer(poi.layer);
                poi.map.renderSync();
            };
            var enterBtnCallback = function () { //点击确定按钮时，清除屏幕上绘制的点，取消注册的事件，去掉交互
                if (!checkInput()) { //检查输入
                    return;
                }
                clearFun(); //清理临时绘制的图标及交互

                longitude = $("#poi-long").val().trim();
                latitude = $("#poi-lat").val().trim();
                poiName = $("#poi-name").val().trim();
                coord = [Number(longitude), Number(latitude)];
                editPoi(id, poiName, longitude, latitude); //编辑热点
            };

            var clearFun = function () { //点击关闭按钮时，清除屏幕上绘制的点，取消注册的事件
                overlay.setPosition(null);
                poi.source.clear();
                poi.map.renderSync();
                poi.map.removeLayer(poi.layer);
                ol.Observable.unByKey(listener);
                poi.map.removeInteraction(modify);
                poi.map.removeInteraction(snap);
            };

            common.showTailInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback, clearFun, checkFun);
            //显示提示弹窗
            var overlay = new ol.Overlay({
                element: document.getElementById("tail-info-window"),
                autoPan: true,
                autoPanAnimation: {
                    duration: 250
                }
            });
            poi.map.addOverlay(overlay);
            overlay.setOffset([4, -4]);
            overlay.setPosition(ol.proj.transform(coord, "EPSG:4326", "EPSG:3857"));
        });

        // 添加热点
        $("#poi-tool-add").click(function () {
            if (poi.eventListener) { //取消已注册的地图事件
                ol.Observable.unByKey(poi.eventListener);
            }
            removeInteractions(); //清除地图交互

            var listener = null,
                info = "请在地图上点击添加热点",
                btnHTML = '<input id="btn-enter" type="button" title="确定" value="确定" class="info-btn">\
                           <input id="btn-cancel" type="button" title="取消" value="取消" class="info-btn">',
                cancelBtnCallback = function () {
                    poi.source.clear();
                    $("#info-window").hide();
                },
                enterBtnCallback = function () {
                    $("#info-window").hide();
                    listener = poi.map.on("singleclick", function (event) {
                        var coord = event.coordinate,
                            longLat = ol.proj.transform(coord, "EPSG:3857", "EPSG:4326"),
                            longitude = Number(longLat[0]).toFixed(6),
                            latitude = Number(longLat[1]).toFixed(6),
                            poiName = "",
                            feature = common.createFeature(coord);
                        poi.source.clear();
                        poi.source.addFeature(feature);

                        var layer = new ol.layer.Vector({
                            source: poi.source,
                            zIndex: 101
                        });
                        poi.map.addLayer(layer);

                        // //显示提示弹窗
                        // var overlay = new ol.Overlay({
                        //     element: document.getElementById("tail-info-window"),
                        //     autoPan: true,
                        //     autoPanAnimation: {
                        //         duration: 250
                        //     }
                        // });

                        info = getPoiInfoHTML(longitude, latitude, poiName);
                        btnHTML = getBtnHTML();
                        cancelBtnCallback = function () {
                            overlay.setPosition(null);
                            poi.source.clear();
                            poi.map.renderSync();
                        };
                        enterBtnCallback = function () {
                            if (!checkInput()) { //检查输入
                                return;
                            }
                            clearFun(); //清理临时绘制的图标及交互

                            longitude = $("#poi-long").val().trim();
                            latitude = $("#poi-lat").val().trim();
                            poiName = $("#poi-name").val().trim();

                            addPoi(longitude, latitude, poiName); //添加热点
                        };
                        var clearFun = function () {
                            overlay && overlay.setPosition(null);
                            poi.source.clear();
                            poi.map.removeLayer(layer);
                            poi.map.renderSync();
                            ol.Observable.unByKey(listener);
                        };
                        common.showTailInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback, clearFun, checkFun);
                        //显示提示弹窗
                        var overlay = new ol.Overlay({
                            element: document.getElementById("tail-info-window"),
                            autoPan: true,
                            autoPanAnimation: {
                                duration: 250
                            }
                        });
                        poi.map.addOverlay(overlay);
                        overlay.setOffset([4, -4]);
                        overlay.setPosition(coord);
                    });
                    poi.eventListener = listener;
                };
            common.showInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback);
        });

        // 定位热点
        $("#poi-tool-flyto").click(function () {
            flyToPoi();
        });
    }

    function flyToPoi() {
        var longitude = $(".poi-info-foucs").attr("longitude");
        var latitude = $(".poi-info-foucs").attr("latitude");
        var coordinate = [Number(longitude), Number(latitude)];
        showPoi(coordinate);
        common.flyTo(coordinate);
    }

    function addPoi(longitude, latitude, name) { //添加热点
        var url = config.rootUrl + "/addPOI";
        var data = {
            name: name,
            longitude: longitude,
            latitude: latitude
        }
        $.post(url, data, function (data, textStatus, jqXHR) {
            common.printInfo(data, "添加热点结果");
            loadPoi(); //加载热点
        }, "json");
    }

    function editPoi(id, name, longitude, latitude) { //编辑热点
        var url = config.rootUrl + "/updatePOI";
        var data = {
            id: id,
            name: name,
            longitude: longitude,
            latitude: latitude
        }
        $.post(url, data, function (data, textStatus, jqXHR) {
            common.printInfo(data, "编辑热点结果");
            loadPoi(); //加载热点
        }, "json");
    }

    function showPoi(coord) { //在图上显示一个热点
        var feature = common.createFeature(ol.proj.transform(coord, "EPSG:4326", "EPSG:3857"));
        poi.source = poi.source || new ol.source.Vector();
        poi.source.clear();
        poi.source.addFeature(feature);
        poi.layer = new ol.layer.Vector({
            source: poi.source,
            zIndex: 102
        });
        poi.map.addLayer(poi.layer);
    }

    function loadPoi(id) { //获取热点列表
        $.ajax({
            type: "get",
            url: config.rootUrl + "/listPOI",
            dataType: "json",
            success: function (res) {
                var html = "";
                if (res && res.length) {
                    poi.poiArr = res;
                    for (var i = 0, len = res.length; i < len; i++) {
                        var item = res[i];
                        html += "<li id=" + item.id + " longitude=" + item.longitude + " latitude=" + item.latitude + " value=" + item.name + "><span class='num'>" + (i + 1) + "</span><span  class='text'>" + item.name + "</span></li>";
                    }
                }
                var foucsClass = "poi-info-foucs";
                $("#poi-info-content ul").html(html);
                if (id) {
                    $("#" + id).addClass(foucsClass);
                } else {
                    $("#poi-info-content ul li:first").addClass(foucsClass);
                }

                $("#poi-info-content ul li").click(function () {
                    $(this).addClass(foucsClass).siblings().removeClass(foucsClass);
                });

                $("#poi-info-content ul li").dblclick(function () {
                    common.printInfo("dbclick...");
                    flyToPoi();
                });
            },
            error: function (xhr, mes, e) {
                common.printInfo(mes, "获取热点信息");
            }
        });
    }

    function getPoiNameById(id) {
        var arr = poi.poiArr;
        if (!arr) {
            return;
        }
        for (var i = 0, len = arr.length; i < len; i++) {
            if (arr[i].id == id) {
                return arr[i].name;
            }
        }
    }

    function getPoiInfoHTML(longitude, latitude, name) {
        var info = "<ul>\
                            <li id='tips-long'><div>经度格式不对，请检查</div><li/>\
                            <li><label>经度：</label><input id='poi-long' value='" + longitude + "'><li/>\
                            <li id='tips-lat'><div>纬度格式不对，请检查</div><li/>\
                            <li><label>纬度：</label><input id='poi-lat' value='" + latitude + "'><li/>\
                            <li id='tips-name'><div>请输入名称</div><li/>\
                            <li><label>名称：</label><input id='poi-name' value='" + name + "' placeholder='请输入15字以内'><li/>\
                        </ul>";
        return info;
    }

    function getBtnHTML() {
        var btnHTML = '<input id="tail-btn-enter" type="button" title="确定" value="确定" class="info-btn">\
                       <input id="tail-btn-cancel" type="button" title="取消" value="取消" class="info-btn">';
        return btnHTML;
    }

    //清除地图交互
    function removeInteractions() {
        if (poi.interactions && poi.interactions.length) {
            for (var i = 0, len = poi.interactions.length; i < len; i++) {
                poi.map.removeInteraction(poi.interactions[i]);
            }
        }
    }

    //检查输入的值是否合适
    function checkFun() {
        $("#poi-long").blur(function () {
            var check = checkLongLat($(this).val().trim());
            if (!check) {
                $("#tips-long div").show();
                $("#poi-long").focus();
            }
        });
        $("#poi-long").keydown(function () {
            $("#tips-long div").hide();
        });

        $("#poi-lat").blur(function () {
            var check = checkLongLat($(this).val().trim());
            if (!check) {
                $("#tips-lat div").show();
                $("#poi-lat").focus();
            }
        });
        $("#poi-lat").keydown(function () {
            $("#tips-lat div").hide();
        });

        $("#poi-name").blur(function () {
            var check = checkNotNull($(this).val().trim());
            if (!check) {
                $("#tips-name div").show();
                $("#poi-name").focus();
            }
        });
        $("#poi-name").keydown(function () {
            $("#tips-name div").hide();
        });
    }

    function checkInput() {
        var check = checkLongLat($("#poi-long").val().trim());
        if (!check) {
            $("#tips-long div").show();
            $("#poi-long").focus();
            return false;
        }

        var check = checkLongLat($("#poi-lat").val().trim());
        if (!check) {
            $("#tips-lat div").show();
            $("#poi-lat").focus();
            return false;
        }

        var check = checkNotNull($("#poi-name").val().trim());
        if (!check) {
            $("#tips-name div").show();
            $("#poi-name").focus();
            return false;
        }
        return true;
    }

    function checkLongLat(data) {
        var pattern = /^[1-9]\d{1,2}\.\d*$|^[1-9]\d*$/;
        return pattern.test(data);
    }

    function checkNotNull(data) {
        if (!data) {
            return false;
        }
        return true;
    }
});