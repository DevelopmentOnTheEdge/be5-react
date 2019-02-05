const states = [];

function set(name, value) {
  states[name] = value;
}

function get(name) {
  return states[name];
}

function getAll() {
  return states;
}

export default {
  set: set,
  get: get,
  getAll: getAll
};
