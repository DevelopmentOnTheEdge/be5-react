'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HtmlResult = exports.performOperationResult = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _be = require('../be5');

var _be2 = _interopRequireDefault(_be);

var _changeDocument = require('../core/changeDocument');

var _changeDocument2 = _interopRequireDefault(_changeDocument);

var _bus = require('../core/bus');

var _bus2 = _interopRequireDefault(_bus);

var _forms = require('../services/forms');

var _forms2 = _interopRequireDefault(_forms);

var _registerDocumentType = require('../core/registerDocumentType');

var _registerDocumentType2 = _interopRequireDefault(_registerDocumentType);

var _beanexplorerReact = require('beanexplorer-react');

var _beanexplorerReact2 = _interopRequireDefault(_beanexplorerReact);

var _jsonPointer = require('json-pointer');

var _jsonPointer2 = _interopRequireDefault(_jsonPointer);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

require('../../../css/form.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var performOperationResult = exports.performOperationResult = function performOperationResult(data) {
  switch (data.type) {
    case 'form':
      (0, _changeDocument2.default)({ component: Form, value: data.value });
      return;
    case 'operationResult':
      var operationResult = data.value;
      switch (operationResult.status) {
        case 'redirect':
          console.log(operationResult);
          //be5.net.request
          _be2.default.url.set(operationResult.details);
          return;
        case 'finished':
          (0, _changeDocument2.default)({ component: HtmlResult, value: { content: operationResult.message | 'The action was successful' } });
          return;
      }
  }

  //  case 'RENDER_HTML':
  //    changeDocument({ component: HtmlResult, value: { content: value.value } });
  //    return;
  //  case 'REDIRECTED':
  //    be5.url.set(value.details);
  //    return;
  //  case 'REFRESH_ALL':
  //    be5.url.set("");
  //    bus.fire('LoggedIn');
  //    return;
  //  case 'GO_BACK':
  //    if (window.history.length >= 2) {
  //      window.history.back();
  //      return;
  //    }
  //    // TODO redirect to the query instead of showing this message:
  //    changeDocument({ component: HtmlResult, value: { content: 'The action was successful' } });
  //    return;
  //  case 'DEFAULT_ACTION':
  //  default:
  //    changeDocument({ component: HtmlResult, value: { content: 'The action was successful' } });
  //    return;
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
      _be2.default.net.request('form/apply', data, performOperationResult);
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

var HtmlResult = exports.HtmlResult = _react2.default.createClass({

  displayName: 'HtmlResult',

  propTypes: {
    value: _react2.default.PropTypes.string.isRequired
  },

  render: function render() {
    var back = function back() {
      history.back();
    };

    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.value } }),
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

  __REACT_HOT_LOADER__.register(performOperationResult, 'performOperationResult', 'src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(HtmlResult, 'HtmlResult', 'src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(Form, 'Form', 'src/scripts/be5/components/form.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/scripts/be5/components/form.js');
}();

;