'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var listeners = [];

var actions = []; // all actions from backend

var tree = {};

var menu = {
  find: function find(coords) {
    return (0, _underscore2.default)(actions).findWhere(coords);
  },
  getRaw: function getRaw() {
    return tree;
  }
};

var getMenu = function getMenu() {
  return menu;
};

var addListener = function addListener(listener) {
  listeners.push(listener);
};

var changed = function changed() {
  (0, _underscore2.default)(listeners).each(function (listener) {
    listener(menu);
  });
};

var copyId = function copyId(item) {
  return { entity: item.entity, query: item.query, operation: item.operation };
};

var updateActions = function updateActions() {
  var resultActions = [];

  (0, _underscore2.default)(tree.root).each(function (item) {
    if (item.hasOwnProperty('action')) {
      resultActions.push(_underscore2.default.extend({}, item.id, { action: item.action, title: item.title }));
    }
    (0, _underscore2.default)(item.children || []).each(function (qitem) {
      resultActions.push(_underscore2.default.extend({}, qitem.id, { action: qitem.action, title: qitem.title }));
    });
  });

  actions = resultActions;
};

var load = function load() {
  _be2.default.net.request('menu/withIds', {}, function (data) {
    tree = data;
    updateActions(data);
    changed();
  });
};

load();

var _default = {
  // function(listener)
  addListener: addListener,
  // function()
  changed: changed,
  // function()
  getMenu: getMenu,
  // function()
  reload: load
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(actions, 'actions', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(tree, 'tree', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(listeners, 'listeners', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(menu, 'menu', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(getMenu, 'getMenu', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(addListener, 'addListener', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(changed, 'changed', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(copyId, 'copyId', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(updateActions, 'updateActions', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(load, 'load', 'src/scripts/be5/components/be5MenuHolder.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/be5MenuHolder.js');
}();

;