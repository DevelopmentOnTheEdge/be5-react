import React           from 'react';
import PropTypes       from 'prop-types';
import be5             from '../../be5';
import forms           from '../../services/forms';
import formsCollection from '../../services/formsCollection';
import PropertySet     from 'beanexplorer-react';
import JsonPointer     from 'json-pointer';
import ErrorPane       from "../ErrorPane";


const Form = React.createClass({
  propTypes: {
    value: React.PropTypes.object.isRequired,
    frontendParams: React.PropTypes.object.isRequired
  },

  displayName: 'Form',
  
  getInitialState() {
    return this.props.value;
  },

  componentDidMount() {
    forms.changeLocationHash(this.props);
  },

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.value, {wasValidated: false}));
  },

  getParams(values){
    const attributes = this.state.data.attributes;
    return {
      entity: attributes.entity,
      query: attributes.query,
      operation: attributes.operation,
      operationParams: attributes.operationParams,
      selectedRows: attributes.selectedRows,
      values: values,
    };
  },

  refresh() {
    forms.load(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
  },
  
  _reloadOnChange(controlName) {
    const values = Object.assign({}, this.state.data.attributes.bean.values, { '_reloadcontrol_': controlName });

    forms.load(this.getParams(values), this.props.frontendParams);
  },

  apply() {
    forms.apply(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
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
      if (attributes.bean.meta[name].reloadOnChange === true ||
          attributes.bean.meta[name].autoRefresh === true ) {
        this._reloadOnChange(name);
      }
    });
  },

  _createFormActions() {
    if (this.state.hideActions === true) {
      return null;
    }
    return (
      <div>
        {this._createOkAction()}
        {' '}
        {this._createCancelAction()}
      </div>
    );
  },

  _createOkAction() {
    return (
      <button type="submit" className="btn btn-primary" onClick={() => this.setState({wasValidated: true})}>
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

  _getErrorPane(){
    const errorModel = this.state.data.attributes.errorModel;

    if(errorModel){
      return <ErrorPane value={{errors: [errorModel], meta: this.state.meta, links: {}}}/>
    }else{
      return null;
    }
  },

  render() {
    const attributes = this.state.data.attributes;

    return (
      <div className="row">
        <div className={'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault')}>
          <h1 className="form-component__title">{attributes.title}</h1>
          <form onSubmit={this._applyOnSubmit} className={this.state.wasValidated ? 'was-validated' : ''}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
            <div className="formActions">
              {this._createFormActions()}
            </div>
          </form>
          <br/>
        </div>
        <div className="col-12">
          {this._getErrorPane()}
        </div>
      </div>
    );
    //<button onClick={this.refresh}>refresh</button>
  }
});

// Form.propTypes = {
//   value: PropTypes.object.isRequired
// };

formsCollection.registerForm('form', Form);

export default Form;

