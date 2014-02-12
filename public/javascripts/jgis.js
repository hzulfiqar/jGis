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
// TODO: toolbar widget
// TODO: layer widget



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
        $('<div class="giswidget"></div>').replaceAll("gis3d");

        var gis3dElms = $(".giswidget").get();
        if(gis3dElms && gis3dElms.length > 0) {
            for(var i=0; i<gis3dElms.length; i++) {
                var gis3dElm = gis3dElms[i];
                gis3dElm.innerHTML = '<x3d width="800px" height="600px"><scene></scene></x3d>';

                var x3dElm = $(gis3dElm).find("x3d").get(0);
                var sceneElem = $(gis3dElm).find("x3d > scene").get(0);
                var gis3DWidget = new Gis3DWidget(gis3dElm, x3dElm, sceneElem);
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
function Gis3DWidget (gis3dElm, x3dElm, sceneElm) {
    this.gis3dElm = gis3dElm;
    this.x3dElem = x3dElm;
    this.sceneElm = sceneElm;

    this.layers =  new Array();
}

Gis3DWidget.prototype.getX3DElm = function() {
    return this.x3dElem;
};

Gis3DWidget.prototype.setNavigationMode = function(navigationMode) {
    switch(navigationMode){
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

Gis3DWidget.prototype.addLayer = function(name, uri) {
    var layer = new Gis3DLayer(name, uri);
    var index = this.layers.length;
    var id = index + '_' + name;

    this.layers[index] = layer;
    $(this.sceneElm).append('<transform><inline id="'+id+'" url="'+uri+'"></inline></transform>');
};


/**
 * Class Gis3DLayer
 *
 * @param name
 * @param uri
 * @constructor
 */
function Gis3DLayer(name, uri) {
    this.name = name;
    this.uri = uri;
}

Gis3DLayer.prototype.getName = function() {
    return this.name;
}

Gis3DLayer.prototype.getUri = function() {
    return this.uri;
}


$(document).ready(function () {
    jGis.init();
});

function log(message) {
    if (window.console) {
        console.log(message);
    }
}

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
jGis.bootstrap(x3domjs, x3domcss);