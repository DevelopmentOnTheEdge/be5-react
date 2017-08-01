import React                from 'react';
import be5                  from '../be5';
import Forms                from '../services/forms';
import PropertySet          from 'beanexplorer-react';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';

import '../../../css/form.css';

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

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value);
  },
  
  getFormValues() {
    return this._getRawFormValues().filter(field => field.value != null);
  },
  
  // refresh() {
  //   this._reload(this.state.bean.values);
  // },
  
  _reloadOnChange(controlName) {
    this._reload(this.state.bean.values.concat([{ name: '_reloadcontrol_', value: controlName }]));
  },

  getRequestParams(values){
    return {
      entity: this.state.entity,
      query: this.state.query,
      operation: this.state.operation,
      selectedRows: this.state.selectedRows,
      values: JSON.stringify(values)
    }
  },

  _reload(values) {
    Forms.load(this.getRequestParams(values), this.props.value.documentName);
  },

  apply() {
    // if (this.props.value.customAction) {
    //   const values = _.object(_.map(this._getRawFormValues(), m => [ m.name, m.value ]));
    //   const structuredAction = be5.url.parse(this.props.value.customAction);
    //   be5.url.set(be5.url.form(structuredAction.positional, _.extend({}, structuredAction.named, values)));
    //   return;
    // }
    if (this.props.isEmbedded !== true) {
      be5.net.request('form/apply', this.getRequestParams(this.state.bean.values), data => {
        Forms.performOperationResult(data, this.props.value.documentName)
      });
    } else {
      be5.net.request('form/apply', this.getRequestParams(this.state.bean.values));
    }
  },
  
  // cancel() {
  //   be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  // },

  _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
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
  },

  render() {
    return (
      <div className="row">
        <div className={'formBox container ' + (this.state.cssClass || 'formBoxDefault')}>
          <h1>{this.state.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
            <PropertySet fields={this.state.bean} onChange={this._onFieldChange}/>
            {this._createFormActions()}
          </form>
        </div>
      </div>
    );
  }
});

export const HtmlResult = React.createClass({
  
  displayName: 'HtmlResult',
  
  propTypes: {
    value: React.PropTypes.string.isRequired
  },
  
  render() {
    const back = () => { history.back(); };
    
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: this.props.value}}/>
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

