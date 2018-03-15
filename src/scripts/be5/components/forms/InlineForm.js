import React           from 'react';
import classNames      from 'classnames';
import be5             from '../../be5';
import Form            from './Form';
import {Property}      from 'beanexplorer-react';


class InlineForm extends Form
{
  render() {
    const attributes = this.state.data.attributes;
    const commonProps = {
      bean: attributes.bean,
      onChange: this._onFieldChange,
      localization: be5.messages.property,
      inline: true,
      rowClass:"d-flex",
    };

    const properties = attributes.bean.order.map(p => (
      <Property key={p} path={p} {...commonProps} bsSize={attributes.layout.bsSize}/>
    ));

    return (
      <form
        onSubmit={this._applyOnSubmit}
        className={classNames('form-inline', attributes.cssClass, this.state.wasValidated ? 'was-validated' : '')}
      >
        <label className={classNames(
          "mb-2 mr-sm-2",
          {'col-form-label-sm' : attributes.layout.bsSize === "sm"},
          {'col-form-label-lg' : attributes.layout.bsSize === "lg"}
        )}>
          <strong>{attributes.title}</strong>
        </label>
        {properties}
        {this._createOkAction('mb-2')}
        {this._getErrorPane()}
      </form>
    );
  }

}

be5.ui.forms.registerForm('inline', InlineForm);

export default InlineForm;