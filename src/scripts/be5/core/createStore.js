import _ from 'underscore';

//unused
// function createStore() {
//   const changeListeners = [];
//
//   function addChangeListener(listener) {
//     changeListeners.push(listener);
//   }
//
//   function removeChangeListener(listener) {
//     const index = changeListeners.indexOf(listener);
//     if (index !== -1) {
//       changeListeners.splice(index, 1);
//     }
//   }
//
//   function emitChangeEvent(event) {
//     for (var i = 0; i < changeListeners.length; i++) {
//       changeListeners[i](event);
//     }
//   }
//
//   return {
//     addChangeListener: addChangeListener,
//     removeChangeListener: removeChangeListener,
//     emitChangeEvent: emitChangeEvent
//   };
// };
//
// /**
//  * Creates an inheritant of the base and initializes it.
//  */
// export default function(description) {
//   const store = _.extend(createStore(), description);
//
//   if (typeof store.init === 'function') {
//     store.init();
//   }
//
//   return store;
// };
