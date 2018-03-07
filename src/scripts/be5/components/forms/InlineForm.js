import React           from 'react';
import classNames      from 'classnames';
import be5             from '../../be5';
import Form            from './Form';
import formsCollection from '../../services/formsCollection';
import PropertySet     from 'beanexplorer-react';


class InlineForm extends Form
{
  render() {
    const attributes = this.state.data.attributes;

    return (
      <form
        onSubmit={this._applyOnSubmit}
        className={classNames('form-inline', attributes.cssClass, this.state.wasValidated ? 'was-validated' : '')}
      >
        <PropertySet
          bean={attributes.bean}
          onChange={this._onFieldChange}
          localization={be5.messages.property}
          inline
          rowClass="d-flex"
        />
        {this._createOkAction('mb-2')}
        {this._getErrorPane()}
      </form>
    );
  }

}

formsCollection.registerForm('inline', InlineForm);

export default InlineForm;