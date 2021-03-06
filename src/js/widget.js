// GIS3DOM
// 
// Copyright 2014 Fraunhofer IGD
// 
// Released unter the terms of MIT and GPL as
// shipped with this software.
// 


/**
 * Class Gis3DWidget
 *
 * @param id
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

    this.layers = [];
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
        $(this.gis3dElm).append('<div id="gis3dLayerWidget" class="gis3d_layer_widget"></div>');
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
          $(this.layerWidgetElm).append('<br><input type="checkbox"  checked="checked" id="'+id+'" onchange=gis3dom.getGis3DWidget().showOrHideLayer(this.id,this.checked)><label for="'+id+'">'+layer.getName()+'</label>');
        }
       $(this.layerWidgetElm).show();
    }
};

//  Shows or hides layer based on the status of the checkbox
Gis3DWidget.prototype.showOrHideLayer = function (layerWidgetId, isChecked) {
    // extracts layer Id from layerWidget Id
       var layerId = layerWidgetId.slice(15);
       var layerElement = document.getElementById(layerId);
          if (isChecked) {
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
        $(this.gis3dElm).prepend('<div id="gis3dToolbarWidget" class="gis3d_toolbar_widget ui-widget-header ui-corner-all"></div>');
        this.toolbarWidgetElm = $(this.gis3dElm).find(".gis3d_toolbar_widget").get(0);
    }

    if(this.toolbarWidgetElm) {
        $(this.toolbarWidgetElm).empty();
        $(this.toolbarWidgetElm).append('<input type="button" name="nav_mode" value="Show All" onclick=gis3dom.getGis3DWidget().showAll()>');
        for(var ind=0; ind < this.toolbarNavigationModes.length; ind++) {
            $(this.toolbarWidgetElm).append('<input type="button" name="nav_mode" value="'+this.toolbarNavigationModes[ind]+'" onclick= gis3dom.getGis3DWidget().setNavigationMode("'+this.toolbarNavigationModes[ind]+'")>');
        }
        //$(this.toolbarWidgetElm).append('<input type ="button" value="HideLayerWidget" onclick="gis3dom.getGis3DWidget().toggleWidget(this)">');
        var divElement = $(this.toolbarWidgetElm).append('<input type ="button" value="HideLayerWidget">');
        var btnElement = divElement.get(0).lastChild;
        btnElement.addEventListener("click", this.toggleWidget,false);
   }
    $(this.toolbarWidgetElm).show();
};

Gis3DWidget.prototype.toggleWidget = function(event){
    var targetElement = event.target ? event.target : event.srcElement;
    $('.gis3d_layer_widget').toggle();
    if(targetElement.value === "HideLayerWidget"){
        targetElement.value = "ShowLayerWidget";
    }else{
        targetElement.value = "HideLayerWidget";
    }
};

Gis3DWidget.prototype.showToolbarButton = function() {
    $(this.gis3dElm).after('<input type ="button" id ="toggleToolbarWidget" name="radio" value="HideToolbarWidget">');
    this.btnToggleToolbarWidget = document.getElementById("toggleToolbarWidget");
    this.btnToggleToolbarWidget.addEventListener("click", function(){gis3dom.getGis3DWidget().toggleWidget("gis3dToolbarWidget");},false);
};

Gis3DWidget.prototype.hideLayerWidget = function() {
     $(this.layerWidgetElm).hide();
};

Gis3DWidget.prototype.hideToolbarWidget = function() {
     $(this.toolbarWidgetElm).hide();
};

Gis3DWidget.prototype.setCanvasSize = function(canvasWidth, canvasHeight){
    $('#x3dElement').width(canvasWidth).height(canvasHeight);
};

Gis3DWidget.prototype.setDefaultCanvasSize = function(){
    $("#x3dElement").width(1024).height(768);
    $("#CanvasWidth").val(1024);
    $("#CanvasHeight").val(768);
};
