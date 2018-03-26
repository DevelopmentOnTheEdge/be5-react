import React           from 'react';
import classNames      from 'classnames';
import be5             from '../../be5';
import Form            from './Form';
import {Property}      from 'beanexplorer-react';
import {registerDocument} from '../../core/documents';


class InlineMiniForm extends Form
{
  render() {
    const attributes = this.state.data.attributes;

    const commonProps = {
      bean: attributes.bean,
      onChange: this._onFieldChange,
      localization: be5.messages.property,
      inline: true,
      rowClass:"d-flex",
      bsSize: attributes.layout.bsSize,
      className: 'mr-sm-2'
    };

    const properties = attributes.bean.order.map(p => (
      <Property key={p} path={p} {...commonProps} />
    ));

    return (
      <form
        id={this.state.meta._ts_}
        onSubmit={this._applyOnSubmit}
        className={classNames(
          'form-inline',
          this.state.wasValidated ? 'was-validated' : '',
          attributes.layout.formClassName || 'form-inline-mini'
        )}
      >
        <label className={classNames(
          "mr-sm-2",
          {'col-form-label-sm' : attributes.layout.bsSize === "sm"},
          {'col-form-label-lg' : attributes.layout.bsSize === "lg"}
        )}>
          <strong>{attributes.title}</strong>
        </label>
        {properties}
        {this._createOkAction('')}
        {this._getErrorPane()}
      </form>
    );
  }

}

registerDocument('inlineMiniForm', InlineMiniForm);

export default InlineMiniForm;