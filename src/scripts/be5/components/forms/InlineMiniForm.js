import React from 'react';
import classNames from 'classnames';
import be5 from '../../be5';
import Form from './Form';
import {Property} from 'beanexplorer-react';
import {registerDocument} from '../../core/registers/documents';
import JsonPointer from 'json-pointer';
import {asyncSelectLoadOptions} from "../../services/tables";

class InlineMiniForm extends Form {
  render() {
    const attributes = this.props.value.data.attributes;

    const commonProps = {
      bean: attributes.bean,
      onChange: this._onFieldChange,
      reloadOnChange: this._onReloadOnChange,
      selectLoadOptions: asyncSelectLoadOptions,
      localization: be5.messages.property,
      inline: true,
      rowClass: "d-flex",
      bsSize: attributes.layout.bsSize,
      className: 'mr-sm-2'
    };

    const properties = attributes.bean.order.map(path => (
      <Property key={path} path={path} {...commonProps} value={JsonPointer.get(this.state.values, path)}/>
    ));

    const baseClasses = attributes.layout.baseClasses || 'form-inline-mini';
    return (
      <div className={classNames('be5-form', this.getFormClass(), baseClasses, attributes.layout.classes)}>
        <form
          onSubmit={this._applyOnSubmit}
          className={classNames('form-inline', {'was-validated': this.state.wasValidated})}
        >
          {attributes.title !== "" ?
            <label className={classNames(
              "mr-sm-2",
              {'col-form-label-sm': attributes.layout.bsSize === "sm"},
              {'col-form-label-lg': attributes.layout.bsSize === "lg"}
            )}>
              <strong>{attributes.title}</strong>
            </label>
          : null}
          {properties}
          {this._createSubmitAction()}
          {this._getErrorPane()}
        </form>
      </div>
    );
  }

}

registerDocument('inlineMiniForm', InlineMiniForm);

export default InlineMiniForm;
