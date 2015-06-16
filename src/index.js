function initialize(){
  'use strict';

  require('./leaflet');
  require('./mapbox');
  if(module) module.exports = window.L;
}

initialize();
