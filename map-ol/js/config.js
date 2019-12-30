/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-02-28
 * @desc:配置
 */
define(function () {

    var config = {
        isDebug: true, //是否调试模式，控制console里面的信息输出
        map: { //地图页面
            defaultZoom: 6,//默认的中心和zoom
            defaultCenter: [95, 35],
            fullZoom: 6, //全图时的中心和zoom大小
            fullCenter: [95, 35],
            mapTileUrl: "http://172.16.42.125:9002/mapTile/" //离线地图瓦片地址
        },
        socketRootUrl: "ws://localhost:9003/connect/", //websocket服务地址
        rootUrl: window.location.protocol + "//" + window.location.host + "/" + window.location.pathname.split("/")[1],
        //rootUrl: "http://localhost:9001/gis", //后台接口根地址
        pageSize: 4,//搜索结果页中每页数据条数
        linkage: { //联动
            isGetCoord: false,
            isFitDistrict: false
        },
    };

    return config;
});