/**
 * @company:gsafety
 * @author:wangshiyuan
 * @date:2019-03-06
 * @desc:搜索
 */
define(["ol", "jquery", "common", "config"], function (ol, $, common, config) {

    var searchApp = {
        map: null,
        init: init
    };
    return searchApp;

    var searchedList = null, //查询的工程列表
        projectList = null, //工程列表
        pageSize = 4, //结果页工程的条数
        totalPage, //总页数
        currentPage, //当前页
        source = new ol.source.Vector(),
        layer = null;
    function init(webMap) { //传入工程列表
        common.init(webMap.map); //初始化工具
        searchApp.map = webMap.map;
        searchedList = [];
        pageSize = config.pageSize;
        //search - start
        $("#keyword-clear").click(function () {
            $("#keyword").val("");
            $("#res").slideUp();
        });

        $("#search").click(function () {
            projectList = webMap.projectList;
            searchedList = [];
            $("#res").show();
            var keyword = $("#keyword").val();
            if (keyword.trim() == "") {
                searchedList = projectList;
            } else {
                projectList.map(function (item) {
                    var name = item.name,
                        address = item.address;
                    if (name.indexOf(keyword) > -1 || address.indexOf(keyword) > -1) {
                        searchedList.push(item);
                    }
                });
            }
            showPageInfo(searchedList, 1); //展示第一页数据
        });

        $("#firstPage").click(function () {
            showPageInfo(searchedList, 1); //展示第一页数据
        });

        $("#prePage").click(function () {
            var pageNum = currentPage > 1 ? currentPage - 1 : 1;
            showPageInfo(searchedList, pageNum); //展示上一页数据
        });

        $("#nextPage").click(function () {
            var pageNum = currentPage < totalPage ? currentPage + 1 : totalPage;
            showPageInfo(searchedList, pageNum); //展示下一页数据
        });

        $("#lastPage").click(function () {
            showPageInfo(searchedList, totalPage); //展示最后一页数据
        });
        //search - end
    }

    //start-显示搜索页面数据列表
    function showPageInfo(arr, pageNum) {
        var size = pageSize || 3, //页面大小
            num = pageNum || 1, //当前页码
            startIndex = (num - 1) * size; //起始的数据编号
        currentPage = num; //当前页
        totalPage = Math.ceil(arr.length / size); //总页数
        $("#pageInfo").text("第" + currentPage + "页 / 共" + totalPage + "页");
        if (!arr.length) {
            var info = '<div style = "height:200px; color:#363636; padding:15px;">\
                                未查询到数据...\
                            </div>';
            $("#search-result-list").html(info);
            return;
        }
        $("#search-result-list").html("");

        for (var i = 0; i < size; i++) {
            var index = startIndex + i,
                item = arr[startIndex + i];
            if (item) {
                var text = '<div class="search-warp clearfix">\
                                <span class="num">' + (index + 1) + '</span>\
                                <div class="searchinfor-right">\
                                    <p>名称：<span>' + item.name + '</span></p>\
                                    <p>地址：<span>' + item.address + '</span></p>\
                                    <p>平时用途：<span>' + item.pacetimeuseName + '</span></p>\
                                    <input class="pointLong" type="hidden" value="' + item.longitude + '"/>\
                                    <input class="pointLat" type="hidden" value="' + item.latitude + '"/>\
                                </div>\
                             </div>';
                $("#search-result-list").append(text);

                // 点击定位
                $("#search-result-list .search-warp").click(function () {
                    var longitude = $(this).find("input.pointLong").val();
                    var latitude = $(this).find("input.pointLat").val();
                    // common.moveTo([Number(longitude), Number(latitude)]);
                    common.flyTo([Number(longitude), Number(latitude)]);
                    showPoint([Number(longitude), Number(latitude)]);
                });
            }
        }
    }//end-显示搜索页面数据列表

    function showPoint(coord) { //在图上显示一个提示的点
        var feature = common.createFeature(ol.proj.transform(coord, "EPSG:4326", "EPSG:3857"));
        source = source || new ol.source.Vector();
        source.clear();
        source.addFeature(feature);
        layer = new ol.layer.Vector({
            source: source,
            zIndex: 102
        });
        searchApp.map.addLayer(layer);
        setTimeout(removePoint, 7*1000);
    }

    function removePoint(){
        source && source.clear();
        layer && searchApp.map.removeLayer(layer);
    }

});