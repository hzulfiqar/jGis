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


function Gis3D (gis3dElm, x3dElm, sceneElm) {
    this.gis3dElm = gis3dElm;
    this.x3dElem = x3dElm;
    this.sceneElm = sceneElm;
}

Gis3D.prototype.getX3DElm = function() {
    return this.x3dElem;
};

Gis3D.prototype.setNavigationMode = function(navigationMode) {
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

Gis3D.prototype.showAll = function() {
  this.x3dElem.runtime.showAll();
  this.x3dElem.runtime.resetView();
};


// TODO: method definitions of the Gis3D class!

var gis3DCanvases = new Array();


$(document).ready(function () {
    $('<div class="giswidget"></div>').replaceAll("gis3d")
    var gis3dElms = $(".giswidget").get();
    if(gis3dElms && gis3dElms.length > 0) {
        for(var i=0; i<gis3dElms.length; i++) {
            var gis3dElm = gis3dElms[i];
            gis3dElm.innerHTML = '<x3d width="800px" height="600px"><scene></scene></x3d>';

            var x3dElm = $(gis3dElm).find("x3d").get(0);
            var sceneElem = $(gis3dElm).find("x3d > scene").get(0);
            var gis3D = new Gis3D(gis3dElm, x3dElm, sceneElem);
            gis3DCanvases[i] = gis3D;

            // load some x3d data from the server
            $(gis3dElm).find("x3d > scene").append('<transform><inline id="inline_element" url="/x3d/Historical_Building.x3d"></inline></transform>');
        }
    }
});



loadX3dom = function(x3domjs, x3domcss) {
    log('Going to load x3dom libs..');

    var jsLink = $("<script type='text/javascript' src='"+x3domjs+"'>");
    $("head").append(jsLink);

    var cssLink = $("<link rel='stylesheet' type='text/css' href='"+x3domcss+"'>");
    $("head").append(cssLink);
}

function log(message) {
    if (window.console) {
        console.log(message);
    }
}

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
loadX3dom(x3domjs, x3domcss);