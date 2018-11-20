import React from 'react';
import bus from '../../core/bus';
import {ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {registerDocument} from '../../core/documents';
import Table from "./Table";
import be5 from "../../be5";
import FrontendAction from "../../services/model/FrontendAction";
import {CLOSE_MAIN_MODAL} from "../../constants";
import {executeFrontendActions} from "../../services/frontendActions";


class ModalTable extends Table
{
  render() {
    const attributes = this.props.value.data.attributes;
    return (
      <div>
        <ModalHeader tag='h5' toggle={() => bus.fire("mainModalClose")} >{attributes.title}</ModalHeader>
        <ModalBody>
          {super.render()}
        </ModalBody>
        <ModalFooter>
          {this._createModalCloseAction()}
        </ModalFooter>
      </div>
    );
  }

  _createModalCloseAction() {
    const layout = this.props.value.data.attributes.layout;
    const action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
    return (
      <button type="button" className="btn btn-secondary" onClick={() => executeFrontendActions(action, this.props.frontendParams)}>
        {layout.cancelActionText || be5.messages.close}
      </button>
    );
  }
}

registerDocument('modalTable', ModalTable);

export default ModalTable;
