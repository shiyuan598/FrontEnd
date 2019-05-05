$(function(){
    var videoList = [];
    var openList = false;
    var currentRecorder = null;
    $(".recorderList>li>span").click(function(){
        $(".recorderList>li>span").removeClass("currentRecorderSpan");
        $(this).addClass("currentRecorderSpan");
        $(".currentVideo").removeClass("currentVideo");
        var recorder = $(this).html();
        if(!openList || currentRecorder != recorder){
            console.log("录像机：" + recorder);            
            getVideoList(recorder);
            currentRecorder = recorder;
            openList = !openList;            
        }else{//隐藏列表
            $(".currentRecorderSpan + ul").html("");
            openList = !openList;
        }        
    });

    function getVideoList(recorder){
        $(".currentRecorderSpan + ul").html("");       
        videoList["通道1"] = 1;
        videoList["通道2"] = 2;
        videoList["通道3"] = 3;
        videoList["通道4"] = 4;
        videoList["通道5"] = 5;
        videoList["通道6"] = 6;

        for(var i=0; i<6; i++){
            $(".currentRecorderSpan + ul").append("<li id = '" + i + "'>" + "通道" + i + "</li>");
        }
        $(".currentRecorderSpan + ul>li:first").addClass("currentVideo");
        $(".currentRecorderSpan + ul>li").click(function(){
            $(this).addClass("currentVideo").siblings().removeClass("currentVideo");
            console.log("通道：" + $(this).html());
        })
    }

});