import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';
import BootstrapModal from '../components/bootstrapModal';
import Form from '../components/forms/form.js';
import formsCollections from '../services/formsCollections.js';
import Forms                from '../services/forms';
import PropertySet          from '../components/properties/PropertySet';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';

class AddressesForm extends Form {

  constructor(props) {
    super(props);

  }

  render() {

    return (
      <div className="row">
        <div className={'formBox container ' + (this.state.cssClass || 'formBoxDefault')}>
          <h1>{this.state.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
            <PropertySet bean={this.state.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
            {this._createFormActions()}
          </form>
        </div>
      </div>
    );
  }

}
//
// formsCollections.registerForm('addresses', (documentName) =>{
//   changeDocument(documentName, { component: AddressesForm, value: {} })
// });

export default AddressesForm;