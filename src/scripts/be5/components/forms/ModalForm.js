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
  }

  componentDidMount(){
    super.componentDidMount();
  }

  toggle() {
    bus.fire("mainModalToggle");
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div>
        <ModalHeader toggle={this.toggle}>{attributes.title}</ModalHeader>
        <ModalBody>
          <form onSubmit={this._applyOnSubmit}>
            <PropertySet bean={attributes.bean} onChange={this._onFieldChange} localization={be5.messages.property}/>
          </form>
        </ModalBody>
        <div className="col-12">
          <Document documentName={this.props.value.documentName +"_errors"} onChange={this.onChange} />
        </div>
        <ModalFooter>
          {this._createFormActions()}
        </ModalFooter>
      </div>
    );
  }

}

export default ModalForm;