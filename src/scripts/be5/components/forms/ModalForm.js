import React from 'react';
import bus from '../../core/bus';
import Form from './Form';
import classNames from 'classnames';
import {ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {registerDocument} from '../../core/documents';
import FrontendAction from "../../services/model/FrontendAction";
import {CLOSE_MAIN_MODAL} from "../../constants";
import {executeFrontendActions} from "../../services/frontendActions";
import be5 from "../../be5";


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
          {' '}
          {this._createModalCloseAction()}
        </ModalFooter>
      </div>
    )
  }

  _createModalCloseAction() {
    const layout = this.state.data.attributes.layout;
    const action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
    return (
      <button type="button" className="btn btn-secondary" onClick={() => executeFrontendActions(action, this.props.frontendParams)}>
        {layout.cancelActionText || be5.messages.close}
      </button>
    );
  }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div className={classNames(attributes.layout.classes)}>
        <ModalHeader tag='h5' toggle={() => bus.fire("mainModalClose")} >{attributes.title}</ModalHeader>
        {this._createForm()}
      </div>
    );
  }

}

registerDocument('modalForm', ModalForm);

export default ModalForm;
