import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import be5 from '../../be5';
import {_createBackAction, addUrlHandlers, showMenuEvent, showOperationPopup} from '../../utils/documentUtils';
import forms, {getOperationInfo} from '../../services/forms';
import PropertySet from 'beanexplorer-react';
import JsonPointer from 'json-pointer';
import ErrorPane from "../ErrorPane";
import Transition from 'react-transition-group/Transition';
import {registerDocument} from '../../core/registers/documents';
import {isTrueValueParam, makeSafeForClassName} from "../../utils/utils";
import {
  CONTEXT_PARAMS,
  ENTITY_NAME_PARAM,
  LONG_TIME_OPERATION,
  OPERATION_NAME_PARAM,
  QUERY_NAME_PARAM,
  RELOAD_CONTROL_NAME
} from "../../constants";
import {asyncSelectLoadOptions} from "../../services/tables";
import ProcessingOperationPopUp from "./ProcessingOperationPopUp";


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {values: this.props.value.data.attributes.bean.values};

    this._onFieldChange = this._onFieldChange.bind(this);
    this._onReloadOnChange = this._onReloadOnChange.bind(this);
    this._setValue = this._setValue.bind(this);
    this._applyOnSubmit = this._applyOnSubmit.bind(this);
    this.apply = this.apply.bind(this);
  }

  componentDidMount() {
    showMenuEvent(this.props.value.data, false)
    showOperationPopup(this.props.value.data, false)
    addUrlHandlers($('.be5-form'), this.props.frontendParams.documentName);
  }

  componentWillUnmount() {
    showMenuEvent(this.props.value.data, true)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState(Object.assign({}, {
      values: nextProps.value.data.attributes.bean.values,
      wasValidated: false,
      submitted: false
    }));
  }

  getParams(values) {
    const attr = this.props.value.data.attributes;
    let positional;
    if (this.state.formAction) {
      positional = be5.url.parse(this.state.formAction).positional;
    } else {
      positional = ['form', attr.entity, attr.query, attr.operation];
    }
    const operationInfo = {
      [ENTITY_NAME_PARAM]: positional[1],
      [QUERY_NAME_PARAM]: positional[2],
      [OPERATION_NAME_PARAM]: positional[3],
      [CONTEXT_PARAMS]: JSON.stringify(attr.operationParams)
    };
    return getOperationInfo(operationInfo, values);
  }

  _reloadOnChange(controlName) {
    if (!this.state.submitted) {
      this.setState({submitted: true}, () => {
        const values = Object.assign({}, this.state.values);
        values[RELOAD_CONTROL_NAME] = controlName;

        forms.load(this.getParams(values), this.props.frontendParams);
      });
    }
  }

  apply() {
    this.setState({wasValidated: false});
    if (!this.state.submitted) {
      this.setState({submitted: true}, () => {
        forms.apply(this.getParams(this.state.values), this.props.frontendParams);
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

  _setValue(name, value, callback) {
    if (!this.state.submitted) {
      const newValues = Object.assign({}, this.state.values);
      JsonPointer.set(newValues, name, value);
      this.setState({values: newValues}, callback);
    }
  }

  _onFieldChange(name, value) {
    this._setValue(name, value)
  }

  _onReloadOnChange(name, value) {
    const attributes = this.props.value.data.attributes;
    const {reloadOnChange,autoRefresh,reloadOnClick} = attributes.bean.meta[name];
    const callback = () => {
      if ([reloadOnChange, autoRefresh, reloadOnClick].includes(true)) {
        this._reloadOnChange(name);
      }
    };
    if (value !== undefined) {
      this._setValue(name, value, callback);
    } else {
      callback();
    }
  }

  _createForm() {
    return (
      <form
        onSubmit={this._applyOnSubmit}
        className={classNames({'was-validated': this.state.wasValidated}
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
    const attributes = this.props.value.data.attributes;
    return (
      <PropertySet
        bean={attributes.bean}
        values={this.state.values}
        onChange={this._onFieldChange}
        reloadOnChange={this._onReloadOnChange}
        selectLoadOptions={asyncSelectLoadOptions}
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
        {_createBackAction(this.props.value.data.attributes.layout, this.props.frontendParams)}
      </div>
    );
  }

  _createSubmitAction(actionUrl, name) {
    const attr = this.props.value.data.attributes;
    const {bsSize, submitText} = attr.layout;
    const isPopUp = isTrueValueParam(attr.layout[LONG_TIME_OPERATION]);
    return (
        <Transition in={this.state.submitted} timeout={600}>
          {(state) => (
              <>
                <button
                    type="submit"
                    className={classNames(
                        "btn btn-primary",
                        {'btn-sm': bsSize === 'sm'},
                        {'btn-lg': bsSize === 'lg'}
                    )}
                    onClick={() => this.setState({
                      wasValidated: true,
                      formAction: actionUrl
                    })}
                    title={this.state.submitted ? be5.messages.submitted : ""}
                    disabled={state === 'entered'}
                >
                  {name || submitText || be5.messages.Submit}
                </button>
                <ProcessingOperationPopUp isOpen={isPopUp && state === 'entered'}/>
              </>
          )}
        </Transition>
    );
  }

  _getErrorPane() {
    const errorModel = this.props.value.data.attributes.errorModel;

    if (errorModel) {
      return <ErrorPane value={{errors: [errorModel], meta: this.props.meta}}/>
    } else {
      return null;
    }
  }

  getFormClass() {
    const attributes = this.props.value.data.attributes;
    const entity = makeSafeForClassName(attributes.entity);
    const operation = makeSafeForClassName(attributes.operation);
    return entity + '_' + operation
  }

  render() {
    const attributes = this.props.value.data.attributes;
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
