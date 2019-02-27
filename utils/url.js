/**
 * url相关的方法
 */
var urlCommon = {
    /**
     * 获取url中的参数，以键值对方式返回
     * @returns {键值对表示的参数}
     */
    serilizerUrl: function(url){
        var result = {};
        url = url.split("?")[1];
        var map = url.split("&");
        for (var i = 0, len = map.length; i < len; i++) {
            var key = map[i].split("=")[0];
            var value = map[i].split("=")[1];
            result[key] = value;
        }
        return result;
    }
};