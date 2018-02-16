import React            from 'react';
import be5              from '../../be5';
import formsCollections from '../../services/formsCollections';
import classNames       from 'classnames';
import Form             from './Form';
import PropertyInput    from '../../components/properties/PropertyInput';


class SubmitOnChangeForm extends Form
{
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.value, { allFieldsFilled: false });

    this._onFieldChangeAndSubmit = this._onFieldChangeAndSubmit.bind(this);
  }

  _onFieldChangeAndSubmit(name, value) {
    super._onFieldChange(name, value);
    super.apply();
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
        <div className={classNames('submit-onchange-form', attributes.cssClass)}>
          <PropertyInput id={0} bean={attributes.bean} localization={be5.messages.property} onChange={this._onFieldChangeAndSubmit} />
          <div className="col-12">
            {this._getErrorPane()}
          </div>
        </div>
    );
  }

}

formsCollections.registerForm('submitOnChange', SubmitOnChangeForm);

export default SubmitOnChangeForm;