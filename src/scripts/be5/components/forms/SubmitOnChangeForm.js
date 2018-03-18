import React           from 'react';
import be5             from '../../be5';
import classNames      from 'classnames';
import Form            from './Form';
import {PropertyInput} from 'beanexplorer-react';


class SubmitOnChangeForm extends Form
{
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
          className={classNames('submit-onchange-form', attributes.layout.formCssClass)}
        >
          <PropertyInput
            id={0}
            bean={attributes.bean}
            localization={be5.messages.property}
            onChange={this._onFieldChangeAndSubmit}
            bsSize={attributes.layout.bsSize}
          />
          <div className="col-12">
            {this._getErrorPane()}
          </div>
        </form>
    );
  }

}

be5.ui.forms.registerForm('submitOnChange', SubmitOnChangeForm);

export default SubmitOnChangeForm;