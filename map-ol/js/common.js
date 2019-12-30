/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-03-06
 * @desc:通用方法
 */
define(["ol", "config"], function (ol, config) {

    var commonApp = {
        map: null,
        init: function (map) {
            this.map = map;
        },

        moveTo: function (location, zoom) { //定位-moveTo
            var self = this;
            var location = center || config.map.defaultCenter,
                zoom = zoom || 10;
            self.map.getView().animate({
                center: ol.proj.transform(center, "EPSG:4326", "EPSG:3857"),
                zoom: zoom,
                duration: 2000
            });
        },

        flyTo: function (location, zoom) { //start: 定位-flyTo
            var self = this;
            var duration = 2000;
            var zoom = zoom || 16;
            var parts = 2;
            var called = false;
            var done = function () {
            };
            var view = self.map.getView();

            function callback(complete) {
                --parts;
                if (called) {
                    return;
                }
                if (parts === 0 || !complete) {
                    called = true;
                    done(complete);
                }
            }

            view.animate({
                center: ol.proj.transform(location, "EPSG:4326", "EPSG:3857"),
                duration: duration
            }, callback);
            var curentZoom = view.getZoom();
            curentZoom = curentZoom > 9 ? 9 : curentZoom - 1;
            view.animate({
                zoom: curentZoom,
                duration: duration / 2
            }, {
                zoom: zoom,
                duration: duration / 2
            }, callback);
        },//end: 定位-flyTo

        printInfo: function (str, name) { //调试时打印信息
            if (config.isDebug) {
                if (str) {
                    name = name ? (name + ": ") : "";
                    console.log(name + str);
                }
            }
        },

        getArgsFromHref: function (sHref, sArgName) { //获取url中的参数
            var args = sHref.split("?");
            var retval = "";

            if (args[0] == sHref){ /*参数为空*/
                return retval;
                /*无需做任何处理*/
            }
            var str = args[1];
            args = str.split("&");
            for (var i = 0; i < args.length; i++) {
                str = args[i];
                var arg = str.split("=");
                if (arg.length <= 1) continue;
                if (arg[0] == sArgName) retval = arg[1];
            }
            return retval;
        },

        createFeature: function (coord, imgUrl) { //创建feature
            var src = imgUrl || "./resource/img/icon/point.png"; // 图标
            var point = new ol.geom.Point();
            point.setCoordinates(coord);
            var feature = new ol.Feature({
                geometry: point
            });
            console.info(point);
            var style = new ol.style.Style({
                image: new ol.style.Icon({
                    src: src,
                    opacity: 0.95,
                    snapToPixel: true
                })
            });
            feature.setStyle(style);

            return feature;
        },

        showInfoWindow: fnShowInfoWindow, //显示提示框

        showTailInfoWindow: fnShowTailInfoWindow //显示有小三角的提示框

    }
    return commonApp;

    /**
     * 显示信息提示框
     * @param info 提示框的内容
     * @param btnHTML 按钮内容
     * @param cancelBtnCallback 点击取消按钮的回调
     * @param enterBtnCallback 点击确定按钮的回调
     */
    function fnShowInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback) {
        //1.提示框内容
        info && $("#info-window-text").html(info);
        //2.按钮内容
        btnHTML && $("#info-window-btncon").html(btnHTML);
        //3.按钮点击事件
        //关闭按钮
        $("#info-window-closer").click(cancelBtnCallback);
        //取消按钮
        $("#btn-cancel").click(cancelBtnCallback);
        //确定按钮
        $("#btn-enter").click(enterBtnCallback);
        //4.显示提示框
        $("#info-window").show();
    }

    /**
     * 显示有三角的信息提示框
     * @param info 提示框的内容
     * @param btnHTML 按钮内容
     * @param cancelBtnCallback 点击取消按钮的回调
     * @param enterBtnCallback 点击确定按钮的回调
     * @param closeFun 点击关闭按钮的回调
     * @param checkFun 校验
     */
    function fnShowTailInfoWindow(info, btnHTML, cancelBtnCallback, enterBtnCallback, closeFun, checkFun) {
        //显示提示框
        $("#tail-info-window").removeClass("ol-popup-hide");
        //1.提示框内容
        info && $("#tail-info-window-text").html(info);
        //2.按钮内容
        btnHTML && $("#tail-info-window-btncon").html(btnHTML);
        //3.按钮点击事件
        //关闭按钮
        $("#tail-info-window-closer").click(closeFun);
        //取消按钮
        $("#tail-btn-cancel").click(cancelBtnCallback);
        //确定按钮
        $("#tail-btn-enter").click(enterBtnCallback);

        checkFun && checkFun();
    }

    function flash(feature, map) {
        var geometry = feature.getGeometry().clone(),
            listener = map.on("postcompose", animate);

        function animate(event) {
            var vectorContext = event.vectorContext;
            var frameState = event.frameState;

            var elapsed = frameState - new Date().getTime(),
                duration = 3000,
                elapsedRatio = elapsed / duration,
                opacity = ol.easing.easeOut(1 - elapsedRatio);

            var style = new ol.style.Style({
                fill: new ol.style.Fill({
                    color: "rgba(255, 0, 0, " + opacity + ")"
                }),
                stroke: new ol.style.Stroke({
                    color: "rgba(65, 110, 220, 0.95)",
                    width: 2
                })
            });
            vectorContext.setStyle(style);
            vectorContext.drawGeometry(geometry);
            if (elapsed > duration) {
                ol.Observable.unByKey(listener);
                return;
            }
            map.render();
        }
    }

});



