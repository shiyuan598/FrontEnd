/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-02-27
 * @desc:主模块
 */
require.config({
    baseUrl: "./js",
    paths: {
        "jquery": "lib/jquery/jquery-3.3.1",
        "ol": "lib/ol-debug",
        "qinghai": "qinghaiDistrict",
        "webMap": "webMap",
        "layers": "layers",
        "mapTools": "mapTools",
        "config": "config",
        "measure": "measure",
        "search": "search",
        "poi": "poi",
        "common": "common",
        "linkage": "linkage",
        "img2base64": "lib/img2base64"
    },
    shim: {
        "saveAs": {
            exports: "saveAs"
        }
    }
});

require(["jquery", "ol", "webMap", "mapTools", "search", "poi", "linkage", "config", "common"], function ($, ol, webMap, mapTools, search, poi, linkage, config, common) {

    $(function () {
        var userid = common.getArgsFromHref(window.location.href, "userid") || "user001";//获取用户Id
        webMap.init(config.map.defaultCenter, config.map.defaultZoom); //初始化地图
        webMap.loadDistrict(); //加载区划
        webMap.loadProject(); //加载工程数据
        mapTools.init(webMap); //初始化工具条
        search.init(webMap); //初始化搜索
        linkage.init(webMap, userid); //初始化联动
        // poi.init(webMap);
    });

});
