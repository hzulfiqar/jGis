// GIS3DOM
// 
// Copyright 2014 Fraunhofer IGD
// 
// Released unter the terms of MIT and GPL as
// shipped with this software.
// 

/**
 * Class Gis3DLayer
 * 
 * @param id the layer's node id
 * @param name the name as shown to the user
 * @param uri the uri of the layer's resource
 * @constructor
 */
function Gis3DLayer(id, name, uri) {
    this.id = id;
    this.name = name;
    this.uri = uri;
}

Gis3DLayer.prototype.getId = function() {
    return this.id;
};

Gis3DLayer.prototype.getName = function() {
    return this.name;
};

Gis3DLayer.prototype.getUri = function() {
    return this.uri;
};

