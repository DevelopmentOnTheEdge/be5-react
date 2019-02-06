import React from 'react';
import be5 from '../../be5';
import classNames from 'classnames';
import Form from './Form';
import {PropertyInput} from 'beanexplorer-react';
import {registerDocument} from '../../core/registers/documents';
import JsonPointer from 'json-pointer';

class SubmitOnChangeForm extends Form {
  constructor(props) {
    super(props);

    this._onFieldChangeAndSubmit = this._onFieldChangeAndSubmit.bind(this);
  }

  _onFieldChangeAndSubmit(name, value) {
    super._setValue(name, value);
    super.apply();
  }

  render() {
    const attributes = this.props.value.data.attributes;
    return (
      <form
        className={classNames(
          'submit-onchange-form',
          this.props.wasValidated ? 'was-validated' : '',
          attributes.layout.classes
        )}
      >
        <PropertyInput
          id={0}
          bean={attributes.bean}
          value={JsonPointer.get(attributes.bean.values, attributes.bean.order[0])}
          localization={be5.messages.property}
          onChange={() => {}}
          reloadOnChange={this._onFieldChangeAndSubmit}
          bsSize={attributes.layout.bsSize}
        />
        <div className="col-12">
          {this._getErrorPane()}
        </div>
      </form>
    );
  }

}

registerDocument('submitOnChange', SubmitOnChangeForm);

export default SubmitOnChangeForm;
