"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Extensions by extension point names.
 */
var extensions = {};

/**
 * Registers an extension.
 * @param {string} extensionPoint
 * @param {any} definition
 */
function extend(extensionPoint, definition) {
  if (!extensions[extensionPoint]) {
    extensions[extensionPoint] = [];
  }
  extensions[extensionPoint].push(definition);
};

/**
 * Gets all extension of the extension point.
 * @param {string} extensionPoint
 * @returns {Array}
 */
function getExtensions(extensionPoint) {
  if (!extensions[extensionPoint]) {
    return [];
  }
  return extensions[extensionPoint];
};

var _default = {
  /* function(extensionPoint: string, definition: any) */
  extend: extend,
  /* function(extensionPoint: string): any[] */
  get: getExtensions
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(extend, "extend", "src/scripts/be5/core/ext.js");

  __REACT_HOT_LOADER__.register(getExtensions, "getExtensions", "src/scripts/be5/core/ext.js");

  __REACT_HOT_LOADER__.register(extensions, "extensions", "src/scripts/be5/core/ext.js");

  __REACT_HOT_LOADER__.register(_default, "default", "src/scripts/be5/core/ext.js");
}();

;