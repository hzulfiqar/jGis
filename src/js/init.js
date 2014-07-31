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
    gis3dom.getGis3DWidget().setCanvasSize("1024", "768");

    $(this.x3dElem).bind('resize', function(){
        $("#CanvasWidth").val($(this.x3dElem).width());
        $("#CanvasHeight").val($(this.x3dElem).height());
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

