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
                gis3dElm.innerHTML = '<x3d width="800px" height="600px"><scene></scene></x3d>';

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
    this.navLayerWidgetElm = null;

    this.layers =  new Array();
    this.navigationLayer = new Array();
}

Gis3DWidget.prototype.getX3DElm = function() {
    return this.x3dElem;
};

Gis3DWidget.prototype.setNavigationMode = function(navigationMode) {
    switch(navigationMode){
        case "showAll" :   this.showAll(); break;
        case "examine" :   this.x3dElem.runtime.examine(); break;
        case "walk" :      this.x3dElem.runtime.walk(); break;
        case "lookAt" :    this.x3dElem.runtime.lookAt(); break;
        case "fly" :       this.x3dElem.runtime.fly(); break;
        case "helicopter": this.x3dElem.runtime.helicopter(); break;
        case "game" :      this.x3dElem.runtime.game(); break;
        case "lookAround": this.x3dElem.runtime.lookAround(); break;
    }
};

Gis3DWidget.prototype.showAll = function() {
  this.x3dElem.runtime.showAll();
  this.x3dElem.runtime.resetView();
};

Gis3DWidget.prototype.getLayers = function() {
    return this.layers;
};

Gis3DWidget.prototype.getNavigationLayers = function() {
    return this.navigationLayer;
};

Gis3DWidget.prototype.addLayer = function(name, uri) {
    var index = this.layers.length;
    var id = this.id + '_layer_' + index;
    var layer = new Gis3DLayer(id, name, uri);

    this.layers[index] = layer;
    $(this.sceneElm).append('<transform><inline id="'+id+'" url="'+uri+'"></inline></transform>');
};

Gis3DWidget.prototype.addNavigationLayer = function(name, elemid) {
    var index = this.navigationLayer.length;
    var elementId = elemid;
    //var id = this.id + '_NavigationLayer_' + index;
    var navlayer = new Gis3DNavLayer(name, elementId);

    this.navigationLayer[index] = navlayer;
    $(this.sceneElm).append('<transform><inline id="'+elementId+'"></inline></transform>');
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
        for(var ind=0; ind<this.layers.length; ind++) {
            var layer = this.layers[ind];
            var id = 'layer_checkbox_'+layer.getId();

            // TODO: it has to be checked whether the layer is currently visible or not!
            $(this.layerWidgetElm).append('<br><input type="checkbox" id="'+id+'" checked="checked"><label for="'+id+'">'+layer.getName()+'</label>');
        }

        //$(this.layerWidgetElm).find("input").button();

        $(this.layerWidgetElm).show();
    }
};

Gis3DWidget.prototype.showNavigationLayerWidget = function() {
    if(!this.navLayerWidgetElm) {
        $(this.gis3dElm).prepend('<div class="gis3d_navLayer_widget ui-widget-header ui-corner-all"></div>');
        this.navLayerWidgetElm = $(this.gis3dElm).find(".gis3d_navLayer_widget").get(0);

        //var navToolbar = $("#toolbar_widget").get();
        //$(navToolbar).append('<div class="gis3d_navLayer_widget"></div>');
        //this.navLayerWidgetElm = $(navToolbar).find(".gis3d_navLayer_widget").get(0);
    }

    if(this.navLayerWidgetElm) {
        // remove all children
        $(this.navLayerWidgetElm).empty();
        // add children
        for(var ind=0; ind<this.navigationLayer.length; ind++) {
            var navigationLayer = this.navigationLayer[ind];
            var id = navigationLayer.getNavId();

            // TODO: it has to be checked whether the layer is currently visible or not!
            $(this.navLayerWidgetElm).append('<input type="button" name="nav_mode" value="'+navigationLayer.getNavName()+'" onclick=setNavigationMode("'+id+'")>');
        }

        //$(this.layerWidgetElm).find("input").button();

        $(this.navLayerWidgetElm).show();
    }
};

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

/**
 * Class Gis3DNavigationLayer
 * @param name
 * @param id
 * @constructor
 * @setNavigationMode()
 */

function Gis3DNavLayer(name, id) {
    this.id = id;
    this.name = name;
}

Gis3DNavLayer.prototype.getNavId = function(){
    return this.id;
}

Gis3DNavLayer.prototype.getNavName = function(){
    return this.name;
}

$(document).ready(function () {
    jGis.init();
});

function log(message) {
    if (window.console) {
        console.log(message);
    }
}
function setNavigationMode(navigationMode) {
    if(jGis.getGis3DWidget) {
        // set the navigation mode on the first gis3d canvas!
        jGis.getGis3DWidget().setNavigationMode(navigationMode);
    }
}

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
jGis.bootstrap(x3domjs, x3domcss);