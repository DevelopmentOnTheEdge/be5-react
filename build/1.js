webpackJsonp_name_([1],{

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var createMandatoryArgumentError = function createMandatoryArgumentError(message) {
  return {
    name: 'MandatoryArgumentError',
    message: message
  };
};

var createArgumentEqualityError = function createArgumentEqualityError(message) {
  return {
    name: 'ArgumentEqualityError',
    message: message
  };
};

var _default = {
  passed: function passed(argument, message) {
    if (!argument) {
      throw createMandatoryArgumentError(message || 'argument is missing');
    }
    return argument;
  },
  eq: function eq(arg1, arg2, message) {
    if (arg1 !== arg2) {
      throw createArgumentEqualityError(message || arg1 + ' should be equal to ' + arg2);
    }
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(createMandatoryArgumentError, 'createMandatoryArgumentError', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/preconditions.js');

  __REACT_HOT_LOADER__.register(createArgumentEqualityError, 'createArgumentEqualityError', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/preconditions.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/preconditions.js');
}();

;

/***/ }),

/***/ 228:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = __webpack_require__(9);

var _be2 = _interopRequireDefault(_be);

var _preconditions = __webpack_require__(227);

var _preconditions2 = _interopRequireDefault(_preconditions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  load: function load(params, callback) {
    _preconditions2.default.passed(params.entity);
    _preconditions2.default.passed(params.query);
    _preconditions2.default.passed(params.operation);

    var requestParams = {
      entity: params.entity,
      query: params.query,
      operation: params.operation,
      values: params.values || '',
      selectedRows: params.selectedRows || ''
    };
    _be2.default.net.request('form', requestParams, callback);
  }
};
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/services/forms.js');
}();

;

/***/ }),

/***/ 230:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performOperationResult = undefined;

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _be = __webpack_require__(9);

var _be2 = _interopRequireDefault(_be);

var _changeDocument = __webpack_require__(60);

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _bus = __webpack_require__(24);

var _bus2 = _interopRequireDefault(_bus);

var _forms = __webpack_require__(228);

var _forms2 = _interopRequireDefault(_forms);

var _registerDocumentType = __webpack_require__(231);

var _registerDocumentType2 = _interopRequireDefault(_registerDocumentType);

var _beanexplorerReact = __webpack_require__(232);

var _beanexplorerReact2 = _interopRequireDefault(_beanexplorerReact);

var _jsonPointer = __webpack_require__(233);

var _jsonPointer2 = _interopRequireDefault(_jsonPointer);

var _underscore = __webpack_require__(59);

var _underscore2 = _interopRequireDefault(_underscore);

__webpack_require__(235);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var performOperationResult = exports.performOperationResult = function performOperationResult(_ref) {
  var value = _ref.value;

  switch (value.status) {
    case 'RENDER_HTML':
      (0, _changeDocument2.default)({ type: 'htmlResult', value: { content: value.value } });
      return;
    case 'REDIRECTED':
      _be2.default.url.set(value.details);
      return;
    case 'REFRESH_ALL':
      _be2.default.url.set("");
      _bus2.default.fire('LoggedIn');
      return;
    case 'GO_BACK':
      if (window.history.length >= 2) {
        window.history.back();
        return;
      }
      // TODO redirect to the query instead of showing this message:
      (0, _changeDocument2.default)({ type: 'htmlResult', value: { content: 'The action was successful' } });
      return;
    case 'DEFAULT_ACTION':
    default:
      (0, _changeDocument2.default)({ type: 'htmlResult', value: { content: 'The action was successful' } });
      return;
  }
};

var Form = _react2.default.createClass({
  propTypes: {
    value: _react2.default.PropTypes.object.isRequired
  },

  displayName: 'Form',

  getInitialState: function getInitialState() {
    return _underscore2.default.extend({}, this.props.value, { allFieldsFilled: false });
  },
  componentDidMount: function componentDidMount() {
    for (var key in this.refs) {
      if (this.refs[key].onFormDidMount) this.refs[key].onFormDidMount();
    }
    this.setState({ allFieldsFilled: this._allFieldsFilled() });
  },


  //  componentDidMount() {
  //    for (var key in this.refs) {
  //      if(this.refs[key].onFormDidMount)
  //        this.refs[key].onFormDidMount();
  //
  //      if(this.refs[key].childNodes){
  //        for (var key2 in this.refs[key].childNodes) {
  //          if(this.refs[key].childNodes[key2].onFormDidMount)
  //            this.refs[key].childNodes[key2].onFormDidMount();
  //        }
  //      }
  //    }
  //  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  },
  getFormValues: function getFormValues() {
    return this._getRawFormValues().filter(function (field) {
      return field.value != null;
    });
  },
  refresh: function refresh() {
    this._reload(this.state.bean.values);
  },
  _reloadOnChange: function _reloadOnChange(controlName) {
    this._reload(this.state.bean.values.concat([{ name: '_reloadcontrol_', value: controlName }]));
  },


  //  _getAllParameters() {
  //    var params = Object.assign({}, this.props.value.parameters);
  //    var formVals = this.state.dps.values;//this.getFormValues();
  //    for (let formVal of formVals) {
  //      delete params[formVal.name];
  //    }
  //    for (let paramName in params) {
  //      formVals.push({ name: paramName, value: this.state.parameters[paramName] });
  //    }
  //     return formVals;
  //  },

  _reload: function _reload(values) {
    var _this = this;

    _forms2.default.load({
      entity: this.state.entity,
      query: this.state.query,
      operation: this.state.operation,
      values: JSON.stringify(values),
      selectedRows: this.state.selectedRows
    }, function (data) {
      _this.setState(data.value, _this.forceUpdate);
    });
  },
  apply: function apply() {
    if (this.props.value.customAction) {
      var values = _underscore2.default.object(_underscore2.default.map(this._getRawFormValues(), function (m) {
        return [m.name, m.value];
      }));
      var structuredAction = _be2.default.url.parse(this.props.value.customAction);
      _be2.default.url.set(_be2.default.url.form(structuredAction.positional, _underscore2.default.extend({}, structuredAction.named, values)));
      return;
    }

    var data = {
      entity: this.state.entity,
      query: this.state.query,
      operation: this.state.operation,
      selectedRows: this.state.selectedRows,
      values: JSON.stringify(this.state.bean.values)
    };
    if (this.props.isEmbedded !== true) {
      _be2.default.net.request('form/apply', data, function (document) {
        if (document.type === 'form') {
          (0, _changeDocument2.default)({ component: Form, value: document.value });
        } else {
          performOperationResult({ component: HtmlResult, value: document.value });
        }
      });
    } else {
      _be2.default.net.request('form/apply', data);
    }
  },
  cancel: function cancel() {
    _be2.default.url.set(_be2.default.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  },
  _applyOnSubmit: function _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        this.state.title
      ),
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-md-12 col-lg-8 offset-lg-2' },
          _react2.default.createElement(
            'form',
            { className: 'formBox', onSubmit: this._applyOnSubmit },
            _react2.default.createElement(_beanexplorerReact2.default, { fields: this.state.bean, onChange: this._onFieldChange }),
            this._createFormActions()
          )
        )
      )
    );
    //<PropertySet fields={this.state.fields} onChange={this._onFieldChange}/>
  },
  _getRawFormValues: function _getRawFormValues() {
    return this.state.bean.map(function (field) {
      return { name: field.name, value: field.value, required: !field.canBeNull };
    });
  },
  _getRequredValues: function _getRequredValues() {
    return this._getRawFormValues().filter(function (field) {
      return field.required;
    });
  },
  _onFieldChange: function _onFieldChange(name, value) {
    var _this2 = this;

    _jsonPointer2.default.set(this.state.bean, "/values" + name, value);

    this.forceUpdate(function () {
      _this2.setState({ allFieldsFilled: _this2._allFieldsFilled() });

      if (_this2.state.bean.meta[name].hasOwnProperty('reloadOnChange') || _this2.state.bean.meta[name].hasOwnProperty('autoRefresh')) {
        _this2._reloadOnChange(name);
      }
    });
  },
  _createFormActions: function _createFormActions() {
    if (this.state.hideActions === true) {
      return null;
    }
    return _react2.default.createElement(
      'div',
      { className: 'formActions' },
      this._createOkAction(),
      ' ',
      this._createCancelAction()
    );
  },
  _createOkAction: function _createOkAction() {
    return _react2.default.createElement(
      'button',
      { type: 'button', className: 'btn btn-primary', onClick: this.apply, disabled: !this.state.allFieldsFilled },
      _be2.default.messages.OK
    );
  },
  _createCancelAction: function _createCancelAction() {
    if (!this.props.value.showCancel) {
      return null;
    }

    return _react2.default.createElement(
      'button',
      { type: 'button', className: 'btn btn-secondary', onClick: function onClick() {
          return history.back();
        } },
      _be2.default.messages.cancel
    );
  },
  _allFieldsFilled: function _allFieldsFilled() {
    var _this3 = this;

    return this.state.bean.order.every(function (field) {
      return _this3.state.bean.meta[field].hasOwnProperty('canBeNull') || _jsonPointer2.default.get(_this3.state.bean, "/values" + field) !== '';
    });
  }
});

var HtmlResult = _react2.default.createClass({

  displayName: 'HtmlResult',

  propTypes: {
    content: _react2.default.PropTypes.string.isRequired
  },

  render: function render() {
    var back = function back() {
      history.back();
    };
    var content = $('<div/>').html(this.props.content);
    _be2.default.ui.convertLinks(content);

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { className: 'content', dangerouslySetInnerHTML: { __html: content.html() } }),
      _react2.default.createElement(
        'div',
        { className: 'linkBack' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-secondary btn-sm', onClick: back },
          _be2.default.messages.back
        )
      )
    );
  }
});

var _default = Form;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(performOperationResult, 'performOperationResult', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(Form, 'Form', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(HtmlResult, 'HtmlResult', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/components/form.js');
}();

;

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _be = __webpack_require__(9);

var _be2 = _interopRequireDefault(_be);

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(type, reactClass) {
  _be2.default.ui.registerDocumentType(type, _react2.default.createElement.bind(undefined, reactClass));
};

exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/core/registerDocumentType.js');
}();

;

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__(7)):"function"==typeof define&&define.amd?define("beanexplorer-react",["react"],t):"object"==typeof exports?exports["beanexplorer-react"]=t(require("react")):e["beanexplorer-react"]=t(e.react)}(this,function(e){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var r={};return t.m=e,t.c=r,t.i=function(e){return e},t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=3)}([function(t,r){t.exports=e},function(e,t,r){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),u=r(0),c=function(e){return e&&e.__esModule?e:{default:e}}(u),i=function(e){function t(e){n(this,t);var r=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.handleChange=r.handleChange.bind(r),r}return a(t,e),l(t,[{key:"handleChange",value:function(e){this.props.onChange(this.props.path,this._getValueFromEvent(e))}},{key:"_getValueFromEvent",value:function(e){if(!e)return"";if(!e.target)return e.value;var t=e.target;return"checkbox"===t.type?t.checked:t.value}},{key:"render",value:function(){var e=this,t=this.props.meta,r=this.props.value,n=this.props.name+"Field",o=this.handleChange,a={checkBox:{normal:function(){return c.default.createElement("input",{type:"checkbox",id:n,key:n,value:r,checked:r,onChange:o,className:e.props.controlClassName||"form-check-input"})},readOnly:function(){return c.default.createElement("input",{type:"checkbox",id:n,key:n,value:r,checked:r,disabled:"true",className:e.props.controlClassName||"form-check-input"})}},comboBox:{normal:function(){var a=t.options.map(function(e){return c.default.DOM.option({key:e.value,value:e.value},e.text)});return c.default.DOM.select({id:n,ref:"editableComboBox",key:n,defaultValue:r,onChange:o,className:e.props.controlClassName||"form-control"},a)},readOnly:function(){var n=t.options.filter(function(e){return e.value===r}),o=n.length?n[0].text:r;return e.createStatic(o)}},textArea:{normal:function(){return c.default.createElement("textarea",{placeholder:t.placeholder,id:n,rows:t.rows||3,cols:t.columns,value:r,onChange:o,className:e.props.controlClassName||"form-control"})},readOnly:function(){return e.createStatic(r)}},textInput:{normal:function(){return c.default.createElement("input",{type:"text",placeholder:t.placeholder,id:n,key:n,value:r,onChange:o,className:e.props.controlClassName||"form-control"})},readOnly:function(){return e.createStatic(r)}},passwordInput:{normal:function(){return c.default.createElement("input",{type:"password",placeholder:t.placeholder,id:n,key:n,value:r,onChange:o,className:e.props.controlClassName||"form-control"})},readOnly:function(){return e.createStatic("******")}}},l=a[t.type]||a.textInput,u=l[t.readOnly?"readOnly":"normal"](),i=c.default.createElement("label",{htmlFor:n,className:this.props.labelClassName},t.displayName||n),s=t.message?c.default.createElement("span",{className:this.props.messageClassName||"form-control-feedback"},t.message):void 0,p=void 0;return p="error"===t.status?"has-danger":t.status?"has-"+t.status:"","checkBox"===t.type?c.default.createElement("div",{className:(this.props.classNameFormCheck||"form-check property")+" "+p},c.default.createElement("label",{className:"form-check-label"},u," "+t.displayName||n)):c.default.createElement("div",{className:(this.props.classNameFormFroup||"form-group property")+" "+p},i,c.default.createElement("div",{className:"controls"},u,s))}},{key:"createStatic",value:function(e){return c.default.createElement("p",{className:"form-control-static",dangerouslySetInnerHTML:{__html:e}})}}]),t}(u.Component),s=i;t.default=s;!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(i,"Property","/home/uuinnk/workspace/github/beanexplorer-react/src/components/Property.js"),__REACT_HOT_LOADER__.register(s,"default","/home/uuinnk/workspace/github/beanexplorer-react/src/components/Property.js"))}()},function(e,t,r){"use strict";function n(e,t,r){if(3===arguments.length)return n.set(e,t,r);if(2===arguments.length)return n.get(e,t);var o=n.bind(n,e);for(var a in n)n.hasOwnProperty(a)&&(o[a]=n[a].bind(o,e));return o}var o=r(4);e.exports=n,n.get=function(e,t){for(var r=Array.isArray(t)?t:n.parse(t),o=0;o<r.length;++o){var a=r[o];if(!("object"==typeof e&&a in e))throw new Error("Invalid reference token: "+a);e=e[a]}return e},n.set=function(e,t,r){for(var o=Array.isArray(t)?t:n.parse(t),a=o[0],l=0;l<o.length-1;++l){var u=o[l];"-"===u&&Array.isArray(e)&&(u=e.length),a=o[l+1],u in e||(a.match(/^(\d+|-)$/)?e[u]=[]:e[u]={}),e=e[u]}return"-"===a&&Array.isArray(e)&&(a=e.length),e[a]=r,this},n.remove=function(e,t){var r=Array.isArray(t)?t:n.parse(t),o=r[r.length-1];if(void 0===o)throw new Error('Invalid JSON pointer for remove: "'+t+'"');var a=n.get(e,r.slice(0,-1));if(Array.isArray(a)){var l=+o;if(""===o&&isNaN(l))throw new Error('Invalid array index: "'+o+'"');Array.prototype.splice.call(a,l,1)}else delete a[o]},n.dict=function(e,t){var r={};return n.walk(e,function(e,t){r[t]=e},t),r},n.walk=function(e,t,r){var a=[];r=r||function(e){var t=Object.prototype.toString.call(e);return"[object Object]"===t||"[object Array]"===t},function e(l){o(l,function(o,l){a.push(String(l)),r(o)?e(o):t(o,n.compile(a)),a.pop()})}(e)},n.has=function(e,t){try{n.get(e,t)}catch(e){return!1}return!0},n.escape=function(e){return e.toString().replace(/~/g,"~0").replace(/\//g,"~1")},n.unescape=function(e){return e.replace(/~1/g,"/").replace(/~0/g,"~")},n.parse=function(e){if(""===e)return[];if("/"!==e.charAt(0))throw new Error("Invalid JSON pointer: "+e);return e.substring(1).split(/\//).map(n.unescape)},n.compile=function(e){return 0===e.length?"":"/"+e.map(n.escape).join("/")}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),c=r(0),i=n(c),s=r(1),p=n(s),f=r(2),d=n(f),h=function(e){function t(){return o(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),u(t,[{key:"render",value:function(){var e=this,t=[],r=null,n=null,o=[],a=function(){t.length>0&&(n?o.push(e._createGroup(t,n,r)):Array.prototype.push.apply(o,t)),t=[]},l=!0,u=!1,c=void 0;try{for(var s,f=this.props.fields.order[Symbol.iterator]();!(l=(s=f.next()).done);l=!0){var h=s.value,y=h.substring(h.lastIndexOf("/")+1),m=this.props.fields.meta[h],b=d.default.get(this.props.fields,"/values"+h),v=m.groupId||null,g=m.groupName||null;v!==n&&(a(),r=g,n=v);var _=i.default.createElement(p.default,{meta:m,name:y,value:b,path:h,key:y,ref:y,onChange:this.props.onChange});t.push(_)}}catch(e){u=!0,c=e}finally{try{!l&&f.return&&f.return()}finally{if(u)throw c}}return a(),i.default.createElement("div",{className:"property-set"},o)}},{key:"_createGroup",value:function(e,t,r){return i.default.createElement("div",{className:"property-group",key:t,ref:t},i.default.createElement("h3",null,r),e)}}]),t}(c.Component),y=h;t.default=y;!function(){"undefined"!=typeof __REACT_HOT_LOADER__&&(__REACT_HOT_LOADER__.register(h,"PropertySet","/home/uuinnk/workspace/github/beanexplorer-react/src/components/PropertySet.js"),__REACT_HOT_LOADER__.register(y,"default","/home/uuinnk/workspace/github/beanexplorer-react/src/components/PropertySet.js"))}()},function(e,t){var r=Object.prototype.hasOwnProperty,n=Object.prototype.toString;e.exports=function(e,t,o){if("[object Function]"!==n.call(t))throw new TypeError("iterator must be a function");var a=e.length;if(a===+a)for(var l=0;l<a;l++)t.call(o,e[l],l,e);else for(var u in e)r.call(e,u)&&t.call(o,e[u],u,e)}}])});

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(234);
module.exports = api;


/**
 * Convenience wrapper around the api.
 * Calls `.get` when called with an `object` and a `pointer`.
 * Calls `.set` when also called with `value`.
 * If only supplied `object`, returns a partially applied function, mapped to the object.
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 * @returns {*}
 */

function api (obj, pointer, value) {
    // .set()
    if (arguments.length === 3) {
        return api.set(obj, pointer, value);
    }
    // .get()
    if (arguments.length === 2) {
        return api.get(obj, pointer);
    }
    // Return a partially applied function on `obj`.
    var wrapped = api.bind(api, obj);

    // Support for oo style
    for (var name in api) {
        if (api.hasOwnProperty(name)) {
            wrapped[name] = api[name].bind(wrapped, obj);
        }
    }
    return wrapped;
}


/**
 * Lookup a json pointer in an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @returns {*}
 */
api.get = function get (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);

    for (var i = 0; i < refTokens.length; ++i) {
        var tok = refTokens[i];
        if (!(typeof obj == 'object' && tok in obj)) {
            throw new Error('Invalid reference token: ' + tok);
        }
        obj = obj[tok];
    }
    return obj;
};

/**
 * Sets a value on an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 */
api.set = function set (obj, pointer, value) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer),
      nextTok = refTokens[0];

    for (var i = 0; i < refTokens.length - 1; ++i) {
        var tok = refTokens[i];
        if (tok === '-' && Array.isArray(obj)) {
          tok = obj.length;
        }
        nextTok = refTokens[i + 1];

        if (!(tok in obj)) {
            if (nextTok.match(/^(\d+|-)$/)) {
                obj[tok] = [];
            } else {
                obj[tok] = {};
            }
        }
        obj = obj[tok];
    }
    if (nextTok === '-' && Array.isArray(obj)) {
      nextTok = obj.length;
    }
    obj[nextTok] = value;
    return this;
};

/**
 * Removes an attribute
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 */
api.remove = function (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);
    var finalToken = refTokens[refTokens.length -1];
    if (finalToken === undefined) {
        throw new Error('Invalid JSON pointer for remove: "' + pointer + '"');
    }

    var parent = api.get(obj, refTokens.slice(0, -1));
    if (Array.isArray(parent)) {
      var index = +finalToken;
      if (finalToken === '' && isNaN(index)) {
        throw new Error('Invalid array index: "' + finalToken + '"');
      }

      Array.prototype.splice.call(parent, index, 1);
    } else {
      delete parent[finalToken];
    }
};

/**
 * Returns a (pointer -> value) dictionary for an object
 *
 * @param obj
 * @param {function} descend
 * @returns {}
 */
api.dict = function dict (obj, descend) {
    var results = {};
    api.walk(obj, function (value, pointer) {
        results[pointer] = value;
    }, descend);
    return results;
};

/**
 * Iterates over an object
 * Iterator: function (value, pointer) {}
 *
 * @param obj
 * @param {function} iterator
 * @param {function} descend
 */
api.walk = function walk (obj, iterator, descend) {
    var refTokens = [];

    descend = descend || function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Object]' || type === '[object Array]';
    };

    (function next (cur) {
        each(cur, function (value, key) {
            refTokens.push(String(key));
            if (descend(value)) {
                next(value);
            } else {
                iterator(value, api.compile(refTokens));
            }
            refTokens.pop();
        });
    }(obj));
};

/**
 * Tests if an object has a value for a json pointer
 *
 * @param obj
 * @param pointer
 * @returns {boolean}
 */
api.has = function has (obj, pointer) {
    try {
        api.get(obj, pointer);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Escapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.escape = function escape (str) {
    return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
};

/**
 * Unescapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.unescape = function unescape (str) {
    return str.replace(/~1/g, '/').replace(/~0/g, '~');
};

/**
 * Converts a json pointer into a array of reference tokens
 *
 * @param pointer
 * @returns {Array}
 */
api.parse = function parse (pointer) {
    if (pointer === '') { return []; }
    if (pointer.charAt(0) !== '/') { throw new Error('Invalid JSON pointer: ' + pointer); }
    return pointer.substring(1).split(/\//).map(api.unescape);
};

/**
 * Builds a json pointer from a array of reference tokens
 *
 * @param refTokens
 * @returns {string}
 */
api.compile = function compile (refTokens) {
    if (refTokens.length === 0) { return ''; }
    return '/' + refTokens.map(api.escape).join('/');
};


/***/ }),

/***/ 234:
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ 235:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(236);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(20)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js?importLoaders=1!./form.css", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js?importLoaders=1!./form.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 236:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(19)();
// imports


// module
exports.push([module.i, "@CHARSET \"UTF-8\";\r\n.formBox .formActions {\r\n    text-align: center;\r\n}\r\n.formBox .formActions button.formAction {\r\n    display: inline;\r\n    padding: 8px;\r\n    margin: 4px;\r\n    background-color: #DDDDDD;\r\n    cursor: pointer;\r\n    border: none;\r\n    border-radius: 4px;\r\n}\r\n.formBox .formActions button.formAction:hover {\r\n    background-color: #AACCCC;\r\n}\r\n.formBox .formActions button.formAction:active {\r\n    background-color: #40CCCC;\r\n}\r\n.formBox {\r\n    width: 100%;\r\n    padding: 1em;\r\n    border-radius: 0.25rem;\r\n    border: 1px solid rgba(0, 0, 0, 0.125);\r\n    margin-top: 0.5em;\r\n}\r\n\r\n.formBox fieldset {\r\n    margin: 0 1em 1em;\r\n}\r\n.formBox fieldset:first-child {\r\n    margin-top: 1em;\r\n}\r\n\r\n.formBox .formField {\r\n    width: 100%;\r\n    clear: both;\r\n    overflow: auto;\r\n    background-color: #F8F8F8;\r\n    margin: 4px;\r\n    padding: 4px;\r\n    border-radius: 4px;\r\n    position: relative;\r\n}\r\n.formBox .formField:nth-child(odd):not(:hover) {\r\n    background-color: #E0E0F8;\r\n}\r\n.formBox .formField:nth-child(even):not(:hover) {\r\n    background-color: #E0F8E0;\r\n}\r\n.formBox .formField:hover {\r\n    background-color: #D0D0D0;\r\n}\r\n.formBox .formField .formLabel {\r\n    width: 25%;\r\n    word-break: break-all;\r\n    float: left;\r\n}\r\n.formBox .formField input, .formBox .formField select, .formBox .formField textarea {\r\n    width: 70%;\r\n}\r\n\r\n.linkBack {\r\n    margin-top: 1em;\r\n}\r\n\r\n.formBox label {\r\n    margin-bottom: 2px;\r\n}\r\n\r\n.formBox [type=\"checkbox\"],\r\n.formBox [type=\"radio\"]{\r\n    float: left;\r\n    top: 3px;\r\n    position: relative;\r\n    margin-right: 5px;\r\n}\r\n\r\n.formBox .formGroup {\r\n    border-top: 1px solid rgba(0, 0, 0, 0.125);\r\n    padding: 1.4em 0em 1.1em;\r\n    position: relative;\r\n    /* margin-bottom: 1.6em; */\r\n}\r\n\r\n.formBox .formGroup:first-child{\r\n    border: none;\r\n}\r\n\r\n.formBox .formGroup h3 {\r\n    top: -0.8em;\r\n    position: absolute;\r\n    background-color: white;\r\n    padding: 3pt;\r\n    font-size: 1.3em;\r\n    margin: 0px 1em 0;\r\n}\r\n\r\n.form-group .form-control-static {\r\n    min-height: 0;\r\n    border-radius: 4px;\r\n    font-weight: bold;\r\n    padding: 0;\r\n    margin-bottom: 0;\r\n}", ""]);

// exports


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(7);

var _react2 = _interopRequireDefault(_react);

var _be = __webpack_require__(9);

var _be2 = _interopRequireDefault(_be);

var _changeDocument = __webpack_require__(60);

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _forms = __webpack_require__(228);

var _forms2 = _interopRequireDefault(_forms);

var _form = __webpack_require__(230);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = function _default(entity, query, operation, operationParams) {

  var selectedRows = operationParams === undefined || operationParams.selectedRows === undefined ? _be2.default.tableState.selectedRows.join() : operationParams.selectedRows;
  if (operationParams !== undefined && operationParams.selectedRows !== undefined) {
    delete operationParams.selectedRows;
  }
  var params = {
    entity: entity,
    query: query || 'All records',
    operation: operation,
    values: _be2.default.net.paramString(operationParams),
    selectedRows: selectedRows
  };
  _forms2.default.load(params, function (document) {
    if (document.type === 'form') {
      (0, _changeDocument2.default)({ component: _form2.default, value: document.value });
    } else {
      (0, _form.performOperationResult)({ component: _form.HtmlResult, value: document.value });
    }
  });
};

exports.default = _default;
;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, 'default', 'C:/Users/Innokentiy/workspace/dote/be5-react/src/scripts/be5/actions/form.js');
}();

;

/***/ })

});