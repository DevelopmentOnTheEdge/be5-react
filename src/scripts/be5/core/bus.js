const listeners = (function() {
  const listenersObject = {};
  
  return function(key, replacement) {
    if (replacement) {
      listenersObject[key] = replacement;
    }
    if (!listenersObject[key]) {
      listenersObject[key] = [];
    }
    return listenersObject[key];
  };
})();

function listen(eventType, listener) {
  listeners(eventType).push(listener);
};

function notListen(eventType, listener) {
  delete listeners(eventType).listener;
};

function fire(type, event = {}) {
  listeners(type).forEach(listener => listener(event));
};

function replaceListeners(eventType, listener) {
  listeners(eventType, [listener]);
};

export default {
  /* function(eventType: string, listener: function(event: object)) */
  listen: listen,
  /* function(type: string, event: object) */
  fire: fire,
  /* function(eventType: string, listener: function(event: object)) */
  listenSolus: replaceListeners
};
