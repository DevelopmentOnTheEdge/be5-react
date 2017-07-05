import React                from 'react';
import be5                  from '../be5';
import changeDocument       from '../core/changeDocument';
import bus                  from '../core/bus';
import Forms                from '../services/forms';
import registerDocumentType from '../core/registerDocumentType';
import PropertySet          from 'beanexplorer-react';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';

import '../../../css/form.css';

export const performOperationResult = ({ value: value }) => {
  switch (value.status)
  {
  case 'RENDER_HTML':
    changeDocument({ type: 'htmlResult', value: { content: value.value } });
    return;
  case 'REDIRECTED':
    be5.url.set(value.details);
    return;
  case 'REFRESH_ALL':
    be5.url.set("");
    bus.fire('LoggedIn');
    return;
  case 'GO_BACK':
    if (window.history.length >= 2) {
      window.history.back();
      return;
    }
    // TODO redirect to the query instead of showing this message:
    changeDocument({ type: 'htmlResult', value: { content: 'The action was successful' } });
    return;
  case 'DEFAULT_ACTION':
  default:
    changeDocument({ type: 'htmlResult', value: { content: 'The action was successful' } });
    return;
  }
};

const Form = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },
  
  displayName: 'Form',
  
  getInitialState() {
    return _.extend({}, this.props.value, { allFieldsFilled: false });
  },

  componentDidMount() {
    for (var key in this.refs) {
      if(this.refs[key].onFormDidMount)
        this.refs[key].onFormDidMount();
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
  
  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  },
  
  getFormValues() {
    return this._getRawFormValues().filter(field => field.value != null);
  },
  
  refresh() {
    this._reload(this.state.bean.values);
  },
  
  _reloadOnChange(controlName) {
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

  _reload(values) {
    Forms.load(
      {
        entity: this.state.entity,
        query: this.state.query,
        operation: this.state.operation,
        values: JSON.stringify(values),
        selectedRows: this.state.selectedRows
      },
      data => {
        this.setState(data.value, this.forceUpdate);
      });
  },

  apply() {
    if (this.props.value.customAction) {
      const values = _.object(_.map(this._getRawFormValues(), m => [ m.name, m.value ]));
      const structuredAction = be5.url.parse(this.props.value.customAction);
      be5.url.set(be5.url.form(structuredAction.positional, _.extend({}, structuredAction.named, values)));
      return;
    }
    
    const data = {
      entity: this.state.entity,
      query: this.state.query,
      operation: this.state.operation,
      selectedRows: this.state.selectedRows,
      values: JSON.stringify(this.state.bean.values)
    };
    if (this.props.isEmbedded !== true) {
      be5.net.request('form/apply', data, document => {
        if (document.type === 'form') {
          changeDocument({ component: Form, value: document.value });
        } else {
          performOperationResult({ component: HtmlResult, value: document.value });
        }
      });
    } else {
      be5.net.request('form/apply', data);
    }
  },
  
  cancel() {
    be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  },
  
  _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  },
  
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <div className="row">
          <div className="col-md-12 col-lg-8 offset-lg-2">
            <form className="formBox" onSubmit={this._applyOnSubmit}>
              <PropertySet fields={this.state.bean} onChange={this._onFieldChange}/>
              {this._createFormActions()}
            </form>
          </div>
        </div>
      </div>
    );
    //<PropertySet fields={this.state.fields} onChange={this._onFieldChange}/>
  },
  
  _getRawFormValues() {
    return this.state.bean.map(field => ({ name: field.name, value: field.value, required: !field.canBeNull }))
  },
  
  _getRequredValues() {
    return this._getRawFormValues().filter(field => field.required);
  },
  
  _onFieldChange(name, value) {
    JsonPointer.set(this.state.bean, "/values" + name, value);

    this.forceUpdate(() => {
      this.setState({ allFieldsFilled: this._allFieldsFilled() });
      
      if (this.state.bean.meta[name].hasOwnProperty('reloadOnChange') ||
          this.state.bean.meta[name].hasOwnProperty('autoRefresh') ) {
        this._reloadOnChange(name);
      }
    });
  },

  _createFormActions() {
    if (this.state.hideActions === true) {
      return null;
    }
    return (
      <div className="formActions">
        {this._createOkAction()}
        {' '}
        {this._createCancelAction()}
      </div>
    );
  },
  
  _createOkAction() {
    return (
      <button type="button" className="btn btn-primary" onClick={this.apply} disabled={!this.state.allFieldsFilled}>
        {be5.messages.OK}
      </button>
    );
  },
  
  _createCancelAction() {
    if (!this.props.value.showCancel) {
      return null;
    }
    
    return (
      <button type="button" className="btn btn-secondary" onClick={() => history.back()}>
        {be5.messages.cancel}
      </button>
    );
  },
  
  _allFieldsFilled() {
    return this.state.bean.order.every(field =>
      this.state.bean.meta[field].hasOwnProperty('canBeNull') ||
      JsonPointer.get(this.state.bean, "/values" + field) !== ''
    );
  }
});

const HtmlResult = React.createClass({
  
  displayName: 'HtmlResult',
  
  propTypes: {
    content: React.PropTypes.string.isRequired
  },
  
  render() {
    const back = () => { history.back(); };
    const content = $('<div/>').html(this.props.content);
    be5.ui.convertLinks(content);
    
    return (
      <div>
        <div className="content" dangerouslySetInnerHTML={{__html: content.html()}}/>
        <div className="linkBack">
          <button className="btn btn-secondary btn-sm" onClick={back}>
            {be5.messages.back}
          </button>
        </div>
      </div>
    );
  }
  
});


export default Form;

