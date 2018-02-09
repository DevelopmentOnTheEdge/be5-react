import React                from 'react';
import PropTypes            from 'prop-types';
import be5                  from '../../be5';
import formService          from '../../services/forms';
import PropertySet          from '../properties/propertySet';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';
import Document             from "../document";


const Form = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired
  },
  
  displayName: 'Form',
  
  getInitialState() {
    return _.extend({}, this.props.value, { allFieldsFilled: false });
  },

  componentDidMount() {
    formService.changeLocationHash(this.props.value);

    for (let key in this.refs) {
      if(this.refs[key].onFormDidMount)
        this.refs[key].onFormDidMount();
    }
    this.setState({ allFieldsFilled: this._allFieldsFilled() });
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.value, () => {
      this.setState({ allFieldsFilled: this._allFieldsFilled() });
    });
  },
  
  getFormValues() {
    return this._getRawFormValues().filter(field => field.value != null);
  },
  
  refresh() {
    this._reload(this.state.data.attributes.bean.values);
  },
  
  _reloadOnChange(controlName) {
    const attributes = this.state.data.attributes;
    this._reload(Object.assign({}, attributes.bean.values, { '_reloadcontrol_': controlName }));
  },

  getRequestParams(values){
    const attributes = this.state.data.attributes;
    return {
      entity: attributes.entity,
      query: attributes.query,
      operation: attributes.operation,
      selectedRows: attributes.selectedRows,
      values: JSON.stringify(values),
      operationParams: JSON.stringify(attributes.operationParams),
      _ts_: new Date().getTime()
    }
  },

  _reload(values) {
    formService.load(this.getRequestParams(
      Object.assign({}, JSON.parse(this.props.value.hashParams), values)
    ), this.props.value.documentName);
  },

  apply() {
    const attributes = this.state.data.attributes;
    be5.net.request('form/apply', this.getRequestParams(
      Object.assign({}, JSON.parse(this.props.value.hashParams), attributes.bean.values) ), data => {
      formService.performOperationResult(data, this.props.value.hashParams, this.props.value.documentName, this.props.onChange, true)
    });
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
    return attributes.bean.order.every(field => {
      let filled = attributes.bean.meta[field].hasOwnProperty('canBeNull') ||
                        JsonPointer.get(attributes.bean, "/values" + field) != '';
      // if(be5.debug && !filled){
      //   console.log(field);
      // }
      return filled;
    });
  },

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div className="row">
        <div className={'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault')}>
          <h1 className="form-component__title">{attributes.title}</h1>
          <form onSubmit={this._applyOnSubmit}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
            {this._createFormActions()}
          </form>
          <br/>
        </div>
        <div className="col-12">
          <Document documentName={this.props.value.documentName +"_errors"} onChange={this.onChange} />
        </div>
      </div>
    );
    //<button onClick={this.refresh}>refresh</button>
  }
});

export const HtmlResult = React.createClass({
  
  displayName: 'HtmlResult',
  
  propTypes: {
    value: PropTypes.shape({
      data: PropTypes.shape({
        attributes: PropTypes.object.isRequired,
        meta: PropTypes.shape({
          _ts_: PropTypes.isRequired
        })
      })
    }),
  },

  componentDidMount() {
    console.log(this.props.value);
    formService.changeLocationHash(this.props.value);
  },

  render() {
    const back = () => { history.back(); };
    const attributes = this.props.value.data.attributes;

    let message = attributes.message;
    if(attributes.status === 'finished' && attributes.message === undefined){
        message = be5.messages.successfullyCompleted;
    }

    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: message}}/>
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

