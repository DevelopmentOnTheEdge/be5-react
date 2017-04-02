/**
 * Extensions by extension point names.
 */
const extensions = {};

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

export default {
  /* function(extensionPoint: string, definition: any) */
  extend: extend,
  /* function(extensionPoint: string): any[] */
  get: getExtensions
};
