const listeners = (function () {
  const listenersObject = {};

  return function (key, replacement) {
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
  //console.log("listen: " + eventType + " " + listener);
};

//function notListen(eventType, listener) {//fix not work
//  delete listeners(eventType);
//  //console.log("notListen: " + eventType + " " + listener);
//};

function fire(type, event = {}) {
  listeners(type).forEach(listener => listener(event));
};

function replaceListeners(eventType, listener) {
  listeners(eventType, [listener]);
};

export default {
  /* function(eventType: string, listener: function(event: object)) */
  listen: listen,
  //notListen: notListen,
  /* function(type: string, event: object) */
  fire: fire,
  /* function(eventType: string, listener: function(event: object)) */
  replaceListeners: replaceListeners
};
