import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import changeDocument from '../core/changeDocument';
import BootstrapModal from '../components/bootstrapModal';
import Form from '../components/forms/form.js';
import formsCollections from '../services/formsCollections.js';
import Forms                from '../services/forms';
import PropertySet          from '../components/properties/propertySet';
import Properties          from '../components/properties/properties';
import JsonPointer          from 'json-pointer';
import _                    from 'underscore';

class AddressesForm extends Form {

  constructor(props) {
    super(props);

    this._showAddBuilding = this._showAddBuilding.bind(this);
    this._showAddApartment = this._showAddApartment.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  _showAddBuilding(){
    be5.url.process("BootstrapModal", "#!loading");
    be5.url.process("BootstrapModal", '#!form/_test_/Test%201D/AddBuilding/street=РОССИЙСКАЯ УЛ');
    this.refs.modal.open();
  }

  _showAddApartment(){
    be5.url.process("BootstrapModal", "#!loading");
    be5.url.process("BootstrapModal", "#!form/_test_/Test%201D/AddApartment");
    this.refs.modal.open();
  }

  _closeModal() {
    this.refs.modal.close();
  }

  _confirm() {
    console.log("_confirm");
    this._closeModal();
  }

  render() {
    const bootstrapModal = (
      <BootstrapModal ref="modal" title="Добавить"
                      onCancel={this._closeModal} cancel={be5.messages.cancel} >
        <Document documentName={"BootstrapModal"} />
      </BootstrapModal>
    );

    return (
      <div className="row">
        <div className={'formBox container ' + (this.state.cssClass || 'formBoxDefault')}>
          <h1>{this.state.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
            <div className="row">
              <Properties bean={this.state.bean} ids={[0,1,2,3,4,5,6,7,8,9]}
                          localization={be5.messages.property} onChange={this._onFieldChange} />

              <div className='property-group col-xs-12'>
                <div className='property-groop-box'><div className="row">
                    <Properties bean={this.state.bean} ids={[10,11]}
                                                        localization={be5.messages.property} onChange={this._onFieldChange} />

                    <Properties bean={this.state.bean} ids={[12]}
                                                        localization={be5.messages.property} onChange={this._onFieldChange} />
                    <Properties bean={this.state.bean} ids={[13]}
                                                        localization={be5.messages.property} onChange={this._onFieldChange} />

                    <div className="col-md-2">
                      <button type="button" className="btn btn-primary btn-sm up-btn" onClick={this._showAddBuilding}>Добавить здание</button>
                    </div>
                    <div className="col-md-2">
                      <button type="button" className="btn btn-primary btn-sm up-btn" onClick={this._showAddApartment}>Добавить квартиру</button>
                    </div>
                </div></div>
              </div>

            </div>
            {this._createFormActions()}
          </form>
          {bootstrapModal}
        </div>
      </div>
    );
  }

}

export default AddressesForm;