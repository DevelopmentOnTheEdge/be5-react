import http from 'be5/core/http';
import createStore from 'be5/core/createStore';

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
