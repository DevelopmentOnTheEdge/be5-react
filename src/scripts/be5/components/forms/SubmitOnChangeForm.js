import React from 'react';
import be5 from '../../be5';
import classNames from 'classnames';
import Form from './Form';
import {PropertyInput} from 'beanexplorer-react';
import {registerDocument} from '../../core/registers/documents';


class SubmitOnChangeForm extends Form {
  constructor(props) {
    super(props);
    this.state = this.props.value;

    this._onFieldChangeAndSubmit = this._onFieldChangeAndSubmit.bind(this);
  }

  _onFieldChangeAndSubmit(name, value) {
    super._setValue(name, value);
    super.apply();
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <form
        id={this.state.meta._ts_}
        className={classNames(
          'submit-onchange-form',
          this.state.wasValidated ? 'was-validated' : '',
          attributes.layout.classes
        )}
      >
        <PropertyInput
          id={0}
          bean={attributes.bean}
          localization={be5.messages.property}
          onChange={() => {
          }}
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
