import React                from 'react';
import be5                  from '../../be5';
import Document             from '../../components/document';
import BootstrapModal       from '../bootstrapModal';
import Form                 from './form.js';
import FormsCollections     from '../../services/formsCollections';
import Properties           from '../../components/properties/properties';
import PropertyInput        from '../../components/properties/propertyInput';


class AddressesForm extends Form
{
  constructor(props) {
    super(props);

    this.state = Object.assign({}, this.props.value, { allFieldsFilled: false,
       buildingFormUrl: "",
       apartmentFormUrl: ""});


    this._showAddBuilding = this._showAddBuilding.bind(this);
    this._showAddApartment = this._showAddApartment.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._confirm = this._confirm.bind(this);
  }

  _showAddBuilding(){
    //be5.url.process("BootstrapModal", "#!loading"); todo open after load
    be5.url.process("BootstrapModal", '#!form/buildings/All records/Insert/kladrStreetCode=' + this.state.data.attributes.bean.values.Street);
    this.refs.modal.open();
  }

  _showAddApartment(){
    //be5.url.process("BootstrapModal", "#!loading");
    be5.url.process("BootstrapModal", "#!form/properties/All%20records/Insert/buildingID=" + this.state.data.attributes.bean.values.buildingNo);
    this.refs.modal.open();
  }

  _closeModal() {
    this.refs.modal.close();
  }

  _confirm() {
    this._closeModal();
    this._reload(this.state.data.attributes.bean.values);
  }

  render() {
    const attributes = this.state.data.attributes;
    const bootstrapModal = (
      <BootstrapModal ref="modal" title="Добавить"
                      onCancel={this._closeModal} cancel={be5.messages.cancel} >
        <Document documentName={"BootstrapModal"} onChange={()=>{
          this._confirm()
        }}/>
      </BootstrapModal>
    );

    return (
      <div className="row">
        <div className={'formBox col-12 max-width-970 ' + (attributes.cssClass || 'formBoxDefault')}>
          <h1>{attributes.title}</h1>
          <form className="" onSubmit={this._applyOnSubmit}>
              <Properties bean={attributes.bean} ids={[4,5,6]}
                          localization={be5.messages.property} onChange={this._onFieldChange} />
              <div className='row'>
                <div className='property-group col-12'>
                  <div className='property-groop-box'>
                    <Properties bean={attributes.bean} ids={[7,8,9,10,11]} localization={be5.messages.property} onChange={this._onFieldChange} />
                    <div className="row">
                      <div className="form-group property col-lg-2 required">
                        <label htmlFor="districtField" className="form-control-label">Здание:</label>
                        <div className="controls">
                          <PropertyInput path={"/buildingNo"} bean={attributes.bean} localization={be5.messages.property} onChange={this._onFieldChange} />
                        </div>
                        <button type="button" className="btn btn-primary btn-sm show-modal-btn" onClick={this._showAddBuilding}
                           disabled={!this.state.data.attributes.bean.values.Street} >Добавить здание</button>
                      </div>

                      <div className="form-group property col-lg-2 required">
                        <label htmlFor="districtField" className="form-control-label">Квартира:</label>
                        <div className="controls">
                          <PropertyInput path={"/propertyID"} bean={attributes.bean} localization={be5.messages.property} onChange={this._onFieldChange} />
                        </div>
                        <button type="button" className="btn btn-primary btn-sm show-modal-btn" onClick={this._showAddApartment}
                          disabled={!this.state.data.attributes.bean.values.buildingNo}>Добавить квартиру</button>
                      </div>
                    </div>
                  </div>
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

FormsCollections.registerForm("addressesForm", AddressesForm);