import http from './http';
import createStore from './createStore';

export default (resource, initialState) => createStore({
  _state: initialState,
  
  init() {
    this._load();
  },
  
  refresh() {
    this._load();
  },
  
  getState() {
    return this._state;
  },
  
  _load() {
    http.get(resource, {}, this._onLoad.bind(this));
  },
  
  _onLoad(res) {
    this._state = res.value;
    this.emitChangeEvent();
  }
});
