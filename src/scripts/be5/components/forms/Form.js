import React           from 'react';
import PropTypes       from 'prop-types';
import classNames      from 'classnames';
import be5             from '../../be5';
import forms           from '../../services/forms';
import PropertySet     from 'beanexplorer-react';
import JsonPointer     from 'json-pointer';
import ErrorPane       from "../ErrorPane";
import Transition      from 'react-transition-group/Transition';
import {registerDocument} from '../../core/documents';


class Form extends React.Component
{
  constructor(props) {
    super(props);
    this.state = this.props.value;

    this._onFieldChange = this._onFieldChange.bind(this);
    this._setValue = this._setValue.bind(this);
    this._applyOnSubmit = this._applyOnSubmit.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentDidMount() {
    forms.changeLocationHash(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.value, {wasValidated: false, submitted: false}));
  }

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
  }

  _reloadOnChange(controlName) {
    if(!this.state.submitted)
    {
      this.setState({submitted: true}, () => {
        const values = Object.assign({}, this.state.data.attributes.bean.values, {'_reloadcontrol_': controlName});

        forms.load(this.getParams(values), this.props.frontendParams);
      });
    }
  }

  apply() {
    this.setState({wasValidated: false});
    if(!this.state.submitted)
    {
      this.setState({submitted: true}, () => {
        forms.apply(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
      });
    }
  }
  
  // cancel() {
  //   be5.url.set(be5.url.create('table', [this.state.entity, this.state.query], this.state.parameters));
  // },

  _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  }

  _setValue(name, value) {
    if(!this.state.submitted)
    {
      JsonPointer.set(this.state.data.attributes.bean, "/values" + name, value);
    }
  }

  _onFieldChange(name, value) {
    const attributes = this.state.data.attributes;
    this._setValue(name, value);

    this.forceUpdate(() => {
      if (attributes.bean.meta[name].reloadOnChange === true ||
          attributes.bean.meta[name].autoRefresh === true ) {
        this._reloadOnChange(name);
      }
    });
  }

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
  }

  _createOkAction(addCssClasses) {
    const {bsSize, submitText} = this.state.data.attributes.layout;
    return (
      <Transition in={this.state.submitted} timeout={200}>
        {(state) => (
          <button
            type="submit"
            className={classNames(
              "btn btn-primary",
              {'btn-sm' : bsSize === 'sm'},
              {'btn-lg' : bsSize === 'lg'},
              addCssClasses
            )}
            onClick={() => this.setState({wasValidated: true})}
            title={this.state.submitted ? be5.messages.submitted: ""}
            disabled={state === 'entered'}
          >
          {submitText || be5.messages.Submit}
          </button>
        )}
      </Transition>
    );
  }
  
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
  }

  _getErrorPane(){
    const errorModel = this.state.data.attributes.errorModel;

    if(errorModel){
      return <ErrorPane value={{errors: [errorModel], meta: this.state.meta}}/>
    }else{
      return null;
    }
  }

  render() {
    const attributes = this.state.data.attributes;

    return (
      <div className="row">
        <div className={'formBox ' + (attributes.layout.formBoxCssClasses || 'col-12 max-width-970 formBoxDefault')}>
          <h1 className="form-component__title">{attributes.title}</h1>
          <form
            id={this.state.meta._ts_}
            onSubmit={this._applyOnSubmit}
            className={classNames(
              this.state.wasValidated ? 'was-validated' : '',
              attributes.layout.formClassName
            )}
          >
            <PropertySet
              bean={attributes.bean}
              onChange={this._onFieldChange}
              localization={be5.messages.property}
              bsSize={attributes.layout.bsSize}
            />
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
}

Form.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('form', Form);

export default Form;