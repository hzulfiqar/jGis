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
    gis3DWidgets: new Array(),

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
                this.addGis3DWidget(gis3DWidget);
            }
        }
        this.ready();
    },

    ready: function() {
        log('jGis is ready...');
    },

    addGis3DWidget: function(gis3DWidget) {
        // TODO: SB check if this is a valid Gis3DWidget..
        this.gis3DWidgets[this.gis3DWidgets.length] = gis3DWidget;
    },

    getNumberOfGis3DWidgets: function() {
        return this.gis3DWidgets.length;
    },

    getGis3DWidgetAt: function(index) {
        if(index >= 0 && index < this.gis3DWidgets.length) {
            return this.gis3DWidgets[index];
        }

        return null;
    },

    getGis3DWidget: function() {
        if(this.gis3DWidgets.length > 0) {
            return this.gis3DWidgets[0];
        }

        return null;
    }
}

/**
 * Class Gis3DWidget
 *
 * @param gis3dElm
 * @param x3dElm
 * @param sceneElm
 * @constructor
 */
function Gis3DWidget (id, gis3dElm, x3dElm, sceneElm) {
    this.id = id;
    this.gis3dElm = gis3dElm;
    this.x3dElem = x3dElm;
    this.sceneElm = sceneElm;

    this.layerWidgetElm = null;
    this.toolbarWidgetElm = null;

    this.layers =  new Array();
}

Gis3DWidget.prototype.getX3DElm = function() {
    return this.x3dElem;
};

Gis3DWidget.prototype.setNavigationMode = function(navigationMode) {
    switch(navigationMode){
        case "Examine" :   this.x3dElem.runtime.examine(); break;
        case "Walk" :      this.x3dElem.runtime.walk(); break;
        case "LookAt" :    this.x3dElem.runtime.lookAt(); break;
        case "Fly" :       this.x3dElem.runtime.fly(); break;
        case "Helicopter": this.x3dElem.runtime.helicopter(); break;
        case "Game" :      this.x3dElem.runtime.game(); break;
        case "LookAround": this.x3dElem.runtime.lookAround(); break;
    }
};

Gis3DWidget.prototype.showAll = function() {
  this.x3dElem.runtime.showAll();
  this.x3dElem.runtime.resetView();
};

Gis3DWidget.prototype.getLayers = function() {
    return this.layers;
};

Gis3DWidget.prototype.addLayer = function(name, uri) {
    var index = this.layers.length;
    var id = this.id + '_layer_' + index;
    var layer = new Gis3DLayer(id, name, uri);
    this.layers[index] = layer;
    $(this.sceneElm).append('<transform><inline id="'+id+'" url="'+uri+'"></inline></transform>');
};

Gis3DWidget.prototype.showLayerWidget = function() {
    if(!this.layerWidgetElm) {
        $(this.gis3dElm).append('<div class="gis3d_layer_widget"></div>');
        this.layerWidgetElm = $(this.gis3dElm).find(".gis3d_layer_widget").get(0);
    }

    if(this.layerWidgetElm) {
        // remove all children
        $(this.layerWidgetElm).empty();
        // add children
        $(this.layerWidgetElm).append('Layers: ');
        $(this.layerWidgetElm).append('<input type="button" value="x" name="x" onclick=toggleLayerWidget()>');
        for(var ind=0; ind<this.layers.length; ind++) {
            var layer = this.layers[ind];
            var id = 'layer_checkbox_'+layer.getId();
            // TODO: it has to be checked whether the layer is currently visible or not!
          $(this.layerWidgetElm).append('<br><input type="checkbox"  checked="checked" id="'+id+'" onchange=jGis.getGis3DWidget().showOrHideLayer(this)><label for="'+id+'">'+layer.getName()+'</label>');
        }
       $(this.layerWidgetElm).show();
    }
};
Gis3DWidget.prototype.showOrHideLayer = function(layerWidget) {
    jGis.getGis3DWidget().checkLayerVisibility(layerWidget);
}
//  Shows or hides layer based on the status of the checkbox
Gis3DWidget.prototype.checkLayerVisibility = function (layerWidget) {

       var layerWidgetId = layerWidget.id;
    // extracts layer Id from layerWidget Id
       var layerId = layerWidgetId.slice(15);
       var layerWidgetElement = document.getElementById(layerWidgetId);
       var layerElement = document.getElementById(layerId);
          if (layerWidgetElement.checked) {
           layerElement.render = "true";
           layerElement.load = "true";
       }
       else {
           layerElement.render = "false";
           layerElement.load = "false";
       }

    };


Gis3DWidget.prototype.showToolbarWidget = function() {
    this.toolbarNavigationModes = new Array("Examine","Fly","Game","Helicopter","LookAt","LookAround", "Walk");

    if(!this.toolbarWidgetElm) {
        $(this.gis3dElm).prepend('<div input class="gis3d_toolbar_widget ui-widget-header ui-corner-all"></div>');
        this.toolbarWidgetElm = $(this.gis3dElm).find(".gis3d_toolbar_widget").get(0);
    }

    if(this.toolbarWidgetElm) {
        $(this.toolbarWidgetElm).empty();
        $(this.toolbarWidgetElm).append('<input type="button" name="nav_mode" value="Show All" onclick=jGis.getGis3DWidget().showAll()>');
        for(var ind=0; ind < this.toolbarNavigationModes.length; ind++) {
            $(this.toolbarWidgetElm).append('<input type="button" name="nav_mode" value="'+this.toolbarNavigationModes[ind]+'" onclick= jGis.getGis3DWidget().setNavigationMode("'+this.toolbarNavigationModes[ind]+'")>');
        }
        $(this.toolbarWidgetElm).append('<input type  ="button" id = "btnLayer" name ="radio" value="HideLayerWidget" onclick="toggleLayerWidget()    ">');

   }
    $(this.toolbarWidgetElm).show();
};

Gis3DWidget.prototype.showToolbarButton = function() {
    $(this.gis3dElm).after('<input type ="button" id ="toggleToolbarWidget" name="radio" value="HideToolbarWidget" onclick="toggleToolbarWidget()">');
}

function toggleToolbarWidget() {
      if(jGis.getGis3DWidget) {
        // set the navigation mode on the first gis3d canvas!
        var navState = $('.toolbar_widget, .ui-widget-header, .ui-corner-all').css('display');
        //Nav widget is already visible
        if(navState == "block")
        {
            $('#toggleToolbarWidget').val('ShowToolbarWidget'); //changing the text of the button
            jGis.getGis3DWidget().hideToolbarWidget();//hide nav widget

        }
        else //if navState == "none" Nav widget is not visible
        {
            $('#toggleToolbarWidget').val('HideToolbarWidget'); //changing the text of the button
            jGis.getGis3DWidget().showToolbarWidget();//show nav widget
        }

    }
}


function toggleLayerWidget() {
    if(jGis.getGis3DWidget) {
        // set the navigation mode on the first gis3d canvas!
        var navState = $('.gis3d_layer_widget').css('display');
        //Nav widget is already visible
        if(navState == "block")
        {
            $('#btnLayer').val('ShowLayerWidget'); //changing the text of the button
            jGis.getGis3DWidget().hideLayerWidget();//hide nav widget

        }
        else //if navState == "none" Nav widget is not visible
        {
            $('#btnLayer').val('HideLayerWidget'); //changing the text of the button
            jGis.getGis3DWidget().showLayerWidget();//show nav widget
        }

    }
}


/**
 * Class Gis3DLayer
 *
 * @param name
 * @param uri
 * @constructor
 */
function Gis3DLayer(id, name, uri) {
    this.id = id;
    this.name = name;
    this.uri = uri;
}

Gis3DLayer.prototype.getId = function() {
    return this.id;
}

Gis3DLayer.prototype.getName = function() {
    return this.name;
}

Gis3DLayer.prototype.getUri = function() {
    return this.uri;
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
            jGis.getGis3DWidget().setCanvasSize();
        }
    })
})

function log(message) {
    if (window.console) {
        console.log(message);
    }
}

Gis3DWidget.prototype.hideLayerWidget = function() {
     $(this.layerWidgetElm).hide();
}

Gis3DWidget.prototype.hideToolbarWidget = function() {
     $(this.toolbarWidgetElm).hide();
}

Gis3DWidget.prototype.setCanvasSize = function(){
    var canvasWidth = $("#CanvasWidth").val();
    var canvasHeight = $("#CanvasHeight").val();
    if(canvasWidth && canvasHeight != null){
        $("#x3dElement").width(canvasWidth).height(canvasHeight);
    }else{
        alert('Enter both height and width');
    }
}
Gis3DWidget.prototype.setDefaultCanvasSize = function(){
    $("#x3dElement").width(1024).height(768);
    $("#CanvasWidth").val(1024);
    $("#CanvasHeight").val(768);
}

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
jGis.bootstrap(x3domjs, x3domcss);