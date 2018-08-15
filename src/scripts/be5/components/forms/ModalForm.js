import React from 'react';
import bus from '../../core/bus';
import Form from './Form';
import {ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {registerDocument} from '../../core/documents';


class ModalForm extends Form
{
  _createFormContent() {
    return (
      <div>
        <ModalBody>
          {this._createFormProperties()}
        </ModalBody>
        <div className="col-12">
          {this._getErrorPane()}
        </div>
        <ModalFooter>
          {this._createSubmitAction()}
        </ModalFooter>
      </div>
    )
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div>
        <ModalHeader tag='h5' toggle={() => bus.fire("mainModalClose")} >{attributes.title}</ModalHeader>
        {this._createForm()}
      </div>
    );
  }

}

registerDocument('modalForm', ModalForm);

export default ModalForm;
