// GIS3DOM
// 
// Copyright 2014 Fraunhofer IGD
// 
// Released unter the terms of MIT and GPL as
// shipped with this software.
// 

// TODO this is stuff that I would really not like to see at all

// inform jshint about x3dom global
// TODO why is this X3DOM_SECURITY_OFF here anyway? Seems to work fine without prob.
/* global X3DOM_SECURITY_OFF:true */

X3DOM_SECURITY_OFF = true;
var x3domjs = '/x3dom/x3dom-full.debug.js';
var x3domcss = '/x3dom/x3dom.css';
jGis.bootstrap(x3domjs, x3domcss);
