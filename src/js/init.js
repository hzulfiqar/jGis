// GIS3DOM
// 
// Copyright 2014 Fraunhofer IGD
// 
// Released unter the terms of MIT and GPL as
// shipped with this software.
// 

$(document).ready(function () {
    gis3dom.init();
    gis3dom.bootstrap();
    //Setting the default size of canvas and making it resizable
    $("#x3dElement").resizable();
    $("#x3dElement").width(1024).height(768);
    $("#CanvasWidth").val($("#x3dElement").width());
    $("#CanvasHeight").val($("#x3dElement").height());

    $('#x3dElement').bind('resize', function(){
        // Update Height and Width values when size changes
        $("#CanvasWidth").val($("#x3dElement").width());
        $("#CanvasHeight").val($("#x3dElement").height());
    });
});

$(function(){
    $('#CanvasHeight , #CanvasWidth').keypress(function(event){
        if(event.keyCode === 13){
            $('#setValues').click();
            gis3dom.getGis3DWidget().setCanvasSize();
        }
    });
});

function log(message) {
    if (window.console) {
        window.console.log(message);
    }
}

