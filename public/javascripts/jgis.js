// TODO: SB OpenSource licensing!

// Fraunhofer Institute for Computer Graphics Research (IGD)
// Competence Center Spatial Information Management (GEO)
//
// Copyright (c) 2013-2014 Fraunhofer IGD. All rights reserved.
//
// This source code is property of the Fraunhofer IGD and underlies
// copyright restrictions. It may only be used with explicit
// permission from the owner.

// TODO: global error handling (Browser-Events)
// TODO: toolbar widget implementation so that it can be displayed within the div of each gis3dwidget
// TODO: layer widget the same as for toolbar widget
// TODO: show and hide layers!
// TODO: There are dependencies to jQuery and jQueryUI. How to handle this?



/**
 * The jGis singleton..
 * @type {{}}
 */
var jGis = {
    bootstrap: function(x3domjs, x3domcss) {
        log('Going to load x3dom libs..');

        var jsLink = $("<script type='text/javascript' src='"+x3domjs+"'>");
        $("head").append(jsLink);

        var cssLink = $("<link rel='stylesheet' type='text/css' href='"+x3domcss+"'>");
        $("head").append(cssLink);
    },

    init: function() {
        $('<div class="gis3d_widget"></div>').replaceAll("gis3d");

        var gis3dElms = $(".gis3d_widget").get();
        if(gis3dElms && gis3dElms.length > 0) {
            for(var i=0; i<gis3dElms.length; i++) {
                var gis3dElm = gis3dElms[i];
                gis3dElm.innerHTML = '<x3d id="x3dElement"><scene></scene></x3d>';
                var x3dElm = $(gis3dElm).find("x3d").get(0);
                var sceneElem = $(gis3dElm).find("x3d > scene").get(0);
                var id = "gis3d_widget_" + i;
                var gis3DWidget = new Gis3DWidget(id, gis3dElm, x3dElm, sceneElem);
                x3dGis.addGis3DWidget(gis3DWidget);
            }
        }
        this.ready();
    },

    ready: function() {
        log('jGis is ready...');
    }
}

$(document).ready(function () {
    jGis.init();
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
    $("#x3dElement").mouseup(function(event){
        ($('#x3dom-x3dElement-canvas').width($("#x3dElement").width()).height($("#x3dElement").height()));
    })
})

$(function(){
    $('#CanvasHeight , #CanvasWidth').keypress(function(event){
        if(event.keyCode == 13){
            $('#setValues').click();
            setCanvasSize();
        }
    })
})

function log(message) {
    if (window.console) {
        console.log(message);
    }
}

setCanvasSize = function(){
    var canvasWidth = $("#CanvasWidth").val();
    var canvasHeight = $("#CanvasHeight").val();
    if(canvasWidth && canvasHeight != null){
        $("#x3dElement").width(canvasWidth).height(canvasHeight);
    }else{
        alert('Enter both height and width');
    }
}
setDefaultCanvasSize = function(){
    $("#x3dElement").width(1024).height(768);
    $("#x3dom-x3dElement-canvas").width(1024).height(768);
    $("#CanvasWidth").val(1024);
    $("#CanvasHeight").val(768);
}

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
jGis.bootstrap(x3domjs, x3domcss);