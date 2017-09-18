import React                from 'react';
import PropTypes            from 'prop-types';
import be5                  from '../../be5';
import Document             from '../../components/document';
import changeDocument       from '../../core/changeDocument';
import BootstrapModal       from '../bootstrapModal';
import Form                 from './form.js';
import formsCollections     from '../../services/formsCollections.js';
import Forms                from '../../services/forms';
import PropertySet          from '../../components/properties/propertySet';
import Properties           from '../../components/properties/properties';
import PropertyInput        from '../../components/properties/propertyInput';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';


class SubmitOnChangeForm extends Form
{
  constructor(props) {
    super(props);
    this.state = Object.assign({}, this.props.value, { allFieldsFilled: false });

    this._onFieldChangeAndSubmit = this._onFieldChangeAndSubmit.bind(this);
  }

  _onFieldChangeAndSubmit(name, value) {
    super._onFieldChange(name, value);
    console.log("test");
    super.apply();
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
        <div className={'submit-onchange-form' + (attributes.cssClass)}>
          <PropertyInput id={0} bean={attributes.bean} localization={be5.messages.property} onChange={this._onFieldChangeAndSubmit} />
        </div>
    );
  }

}

export default SubmitOnChangeForm;