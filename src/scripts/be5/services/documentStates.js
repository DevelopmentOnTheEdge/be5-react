const states = {};

export function getDocumentState(key) {
  return states[decodeURI(key)];
}

export function setDocumentState(key, value) {
  states[decodeURI(key)] = value;
}

export function getDocumentStates() {
  return states;
}

export function clearDocumentState(key) {
  delete states[decodeURI(key)];
}
