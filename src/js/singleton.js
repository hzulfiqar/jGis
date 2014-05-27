// GIS3DOM
// 
// Copyright 2014 Fraunhofer IGD
// 
// Released unter the terms of MIT and GPL as
// shipped with this software.
// 


/**
 * The jGis singleton..
 * @type {{}}
 */
var jGis = {
    gis3DWidgets: [],

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
};
