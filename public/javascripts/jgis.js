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



$(document).ready(function () {
    $('<div class="giswidget"></div>').replaceAll("gis3d")
    var gis3dElms = $(".giswidget").get();
    if(gis3dElms && gis3dElms.length > 0) {
        for(var i=0; i<gis3dElms.length; i++) {
            var gis3dElm = gis3dElms[i];
            gis3dElm.innerHTML = '<x3d width="800px" height="600px"><scene></scene></x3d>';

            var x3dElm = $(gis3dElm).find("x3d").get(0);
            var sceneElem = $(gis3dElm).find("x3d > scene");

            // load some x3d data from the server
            $(gis3dElm).find("x3d > scene").append('<inline id="inline_element" url="/x3d/Palatin_Gelaende.x3d"></inline>');
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