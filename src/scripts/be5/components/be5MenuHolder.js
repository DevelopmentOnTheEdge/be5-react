import _ from 'underscore';
import be5 from '../be5';
import bus from '../core/bus';

const listeners = [];

var actions = []; // all actions from backend

var tree = {};

const menu = {
  find: function(coords) {
    return _(actions).findWhere(coords);
  },
  getRaw: function() {
    return tree;
  }
};

const getMenu = function() {
  return menu;
};

const addListener = function(listener) {
  listeners.push(listener);
};

const changed = function() {
  _(listeners).each(function(listener) {
    listener(menu);
  });
};

const copyId = function(item) {
  return { entity: item.entity, query: item.query, operation: item.operation };
};

const updateActions = function() {
  const resultActions = [];
  
  _(tree.root).each(item => {
    if (item.hasOwnProperty('action')) {
      resultActions.push(_.extend({}, item.id, { action: item.action, title: item.title }));
    }
    _(item.children || []).each(qitem => {
      resultActions.push(_.extend({}, qitem.id, { action: qitem.action, title: qitem.title }));
    });
  });
  
  actions = resultActions;
};

const load = function() {
  be5.net.request('menu/withIds', {}, data => {
    tree = data;
    updateActions(data);
    changed();
  });
};

load();

export default {
  // function(listener)
  addListener: addListener,
  // function()
  changed: changed,
  // function()
  getMenu: getMenu,
  // function()
  reload: load
};
