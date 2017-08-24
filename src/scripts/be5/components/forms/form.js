import React                from 'react';
import be5                  from '../../be5';
import formService                from '../../services/forms';
import PropertySet          from '../properties/propertySet';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';


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
    const attributes = this.state.data.attributes;
    this._reload(Object.assign({}, attributes.bean.values, { name: '_reloadcontrol_', value: controlName }));
  },

  getRequestParams(values){
    const attributes = this.state.data.attributes;
    return {
      entity: attributes.entity,
      query: attributes.query,
      operation: attributes.operation,
      selectedRows: attributes.selectedRows,
      values: JSON.stringify(values),
      _ts_: new Date().getTime()
    }
  },

  _reload(values) {
    formService.load(this.getRequestParams(values), this.props.value.documentName);
  },

  apply() {
    const attributes = this.state.data.attributes;
    // if (this.props.value.customAction) {
    //   const values = _.object(_.map(this._getRawFormValues(), m => [ m.name, m.value ]));
    //   const structuredAction = be5.url.parse(this.props.value.customAction);
    //   be5.url.set(be5.url.form(structuredAction.positional, _.extend({}, structuredAction.named, values)));
    //   return;
    // }
//    if (this.props.isEmbedded !== true) {
    be5.net.request('form/apply', this.getRequestParams(attributes.bean.values), data => {
      formService.performOperationResult(data, this.props.value.documentName, this.props.onChange)
    });
    // } else {
    //   be5.net.request('form/apply', this.getRequestParams(this.state.bean.values));
    // }
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
    const attributes = this.state.data.attributes;
    return attributes.bean.map(field => ({ name: field.name, value: field.value, required: !field.canBeNull }))
  },
  
  _getRequredValues() {
    return this._getRawFormValues().filter(field => field.required);
  },
  
  _onFieldChange(name, value) {
    const attributes = this.state.data.attributes;
    JsonPointer.set(attributes.bean, "/values" + name, value);

    this.forceUpdate(() => {
      this.setState({ allFieldsFilled: this._allFieldsFilled() });
      
      if (attributes.bean.meta[name].hasOwnProperty('reloadOnChange') ||
          attributes.bean.meta[name].hasOwnProperty('autoRefresh') ) {
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
        {be5.messages.Submit}
      </button>
    );
  },
  
  _createCancelAction() {
    //const attributes = this.state.data.attributes;
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
    const attributes = this.state.data.attributes;
    return attributes.bean.order.every(field =>
      attributes.bean.meta[field].hasOwnProperty('canBeNull') ||
      JsonPointer.get(attributes.bean, "/values" + field) !== ''
    );
  },

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div className="row">
        <div className={'formBox col-xs-12 max-width-970 ' + (this.state.data.attributes.cssClass || 'formBoxDefault')}>
          <h1 className="form-component__title">{this.state.data.attributes.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
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
      </div>
    );
//    <div className="linkBack">
//              <button className="btn btn-secondary btn-sm" onClick={back}>
//                {be5.messages.back}
//              </button>
//            </div>
  }
  
});


export default Form;

