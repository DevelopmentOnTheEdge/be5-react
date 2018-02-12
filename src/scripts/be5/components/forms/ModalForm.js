import React           from 'react';
import be5             from '../../be5';
import bus             from '../../core/bus';
import Form            from './form.js';
import PropertySet     from '../properties/propertySet';
import Document        from "../document";
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalForm extends Form
{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.applyAndClose = this.applyAndClose.bind(this);
  }

  componentDidMount(){
    this.initForm();
  }

  applyAndClose(){
    super.apply();
    this.toggle();
  }

  toggle() {
    bus.fire("mainModalToggle");
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div>
        <ModalHeader tag='h5' toggle={this.toggle}>{attributes.title}</ModalHeader>
        <ModalBody>
          <form onSubmit={this._applyOnSubmit}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
          </form>
        </ModalBody>
        <div className="col-12">
          <Document frontendParams={{documentName: this.props.frontendParams.documentName +"_errors"}} onChange={this.onChange} />
        </div>
        <ModalFooter>
          <button type="button" className="btn btn-primary" onClick={this.applyAndClose} disabled={!this.state.allFieldsFilled}>
            {be5.messages.Submit}
          </button>
        </ModalFooter>
      </div>
    );
  }

}

export default ModalForm;