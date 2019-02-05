import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import be5 from '../../be5';
import forms, {getOperationInfo} from '../../services/forms';
import PropertySet from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import ErrorPane from "../ErrorPane";
import Transition from 'react-transition-group/Transition';
import {registerDocument} from '../../core/registers/documents';
import {_createBackAction} from "../../utils/documentUtils";
import {makeSafeForClassName} from "../../utils/utils";
import {
  CONTEXT_PARAMS, ENTITY_NAME_PARAM, OPERATION_NAME_PARAM, QUERY_NAME_PARAM,
  RELOAD_CONTROL_NAME
} from "../../constants";


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.value;

    this._onFieldChange = this._onFieldChange.bind(this);
    this._onReloadOnChange = this._onReloadOnChange.bind(this);
    this._setValue = this._setValue.bind(this);
    this._applyOnSubmit = this._applyOnSubmit.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, nextProps.value, {wasValidated: false, submitted: false}));
  }

  getParams(values) {
    const attr = this.state.data.attributes;
    const operationInfo = {
      [ENTITY_NAME_PARAM]: attr.entity,
      [QUERY_NAME_PARAM]: attr.query,
      [OPERATION_NAME_PARAM]: attr.operation,
      [CONTEXT_PARAMS]: JSON.stringify(attr.operationParams)
    };
    return getOperationInfo(operationInfo, values);
  }

  _reloadOnChange(controlName) {
    if (!this.state.submitted) {
      this.setState({submitted: true}, () => {
        const values = Object.assign({}, this.state.data.attributes.bean.values);
        values[RELOAD_CONTROL_NAME] = controlName;

        forms.load(this.getParams(values), this.props.frontendParams);
      });
    }
  }

  apply() {
    this.setState({wasValidated: false});
    if (!this.state.submitted) {
      this.setState({submitted: true}, () => {
        forms.apply(this.getParams(this.state.data.attributes.bean.values), this.props.frontendParams);
      });
    }
  }

  _applyOnSubmit(e) {
    // Hitting <enter> in any textbox in Chrome triggers the form submit,
    // even when there is no submit button.
    // That's why I explicitly define the cancellation.
    e.preventDefault();
    this.apply();
  }

  _setValue(name, value) {
    if (!this.state.submitted) {
      JsonPointer.set(this.state.data.attributes.bean, "/values" + name, value);
    }
  }

  _onFieldChange(name, value) {
    this._setValue(name, value);
    this.forceUpdate();
  }

  _onReloadOnChange(name, value) {
    const attributes = this.state.data.attributes;
    if (value !== undefined) this._setValue(name, value);

    this.forceUpdate(() => {
      if (attributes.bean.meta[name].reloadOnChange === true ||
        attributes.bean.meta[name].autoRefresh === true) {
        this._reloadOnChange(name);
      }
    });
  }

  _createForm() {
    return (
      <form
        ref={el => (this.form = el)}
        onSubmit={this._applyOnSubmit}
        className={classNames(
          this.state.wasValidated ? 'was-validated' : ''
        )}
      >
        {this._createFormContent()}
      </form>
    )
  }

  _createFormContent() {
    return (
      <div>
        {this._createFormProperties()}
        {this._createFormActions()}
      </div>
    )
  }

  _createFormProperties() {
    const attributes = this.state.data.attributes;
    return (
      <PropertySet
        bean={attributes.bean}
        onChange={this._onFieldChange}
        reloadOnChange={this._onReloadOnChange}
        localization={be5.messages.property}
        bsSize={attributes.layout.bsSize}
      />
    );
  }

  _createFormActions() {
    return (
      <div className="formActions">
        {this._createSubmitAction()}
        {' '}
        {_createBackAction(this.state.data.attributes.layout, this.props.frontendParams)}
      </div>
    );
  }

  _createSubmitAction(actionData, name) {
    const {bsSize, submitText} = this.state.data.attributes.layout;
    return (
      <Transition in={this.state.submitted} timeout={600}>
        {(state) => (
          <button
            type="submit"
            className={classNames(
              "btn btn-primary",
              {'btn-sm': bsSize === 'sm'},
              {'btn-lg': bsSize === 'lg'}
            )}
            onClick={() => this.setState({
              wasValidated: true,
              formAction: actionData || 'defaultAction'
            })}
            title={this.state.submitted ? be5.messages.submitted : ""}
            disabled={state === 'entered'}
          >
            {name || submitText || be5.messages.Submit}
          </button>
        )}
      </Transition>
    );
  }

  _getErrorPane() {
    const errorModel = this.state.data.attributes.errorModel;

    if (errorModel) {
      return <ErrorPane value={{errors: [errorModel], meta: this.state.meta}}/>
    } else {
      return null;
    }
  }

  getFormClass() {
    const attributes = this.state.data.attributes;
    const entity = makeSafeForClassName(attributes.entity);
    const operation = makeSafeForClassName(attributes.operation);
    return entity + '_' + operation
  }

  render() {
    const attributes = this.state.data.attributes;
    const baseClasses = attributes.layout.baseClasses || 'formBox col-12 max-width-970 formBoxDefault';
    return (
      <div className="row">
        <div className={classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)}>
          <h1 className="form-component__title">{attributes.title}</h1>
          {this._createForm()}
        </div>
        <div className="col-12">
          {this._getErrorPane()}
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('verticalForm', Form);

export default Form;
