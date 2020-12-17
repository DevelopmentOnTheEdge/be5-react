import React from 'react';
import bus from '../../core/bus';
import Form from './Form';
import classNames from 'classnames';
import {ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import {registerDocument} from '../../core/registers/documents';
import FrontendAction from "../../services/model/FrontendAction";
import {CLOSE_MAIN_MODAL} from "../../constants";
import {executeFrontendActions} from "../../services/frontendActions";
import be5 from "../../be5";
import {isHideMenuOpertion} from "../../utils/documentUtils";


class ModalForm extends Form {
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
    const layout = this.props.value.data.attributes.layout;
    const action = layout.cancelAction || new FrontendAction(CLOSE_MAIN_MODAL);
    return (
      <button type="button" className="btn btn-secondary close-action-btn"
              onClick={() => {
                  console.log("_createModalCloseAction")
                  if (isHideMenuOpertion(this.props.value.data)) bus.fire('showMenu', {show: true});
                  executeFrontendActions(action, this.props.frontendParams)
                }
              }>
        {layout.cancelActionText || be5.messages.close}
      </button>
    );
  }

  render() {
    const attributes = this.props.value.data.attributes;
    return (
        <div className={classNames('be5-form', this.getFormClass(), attributes.layout.classes)}>
            <ModalHeader tag='h5' toggle={() => {
                console.log("render modal form")
                if (isHideMenuOpertion(this.props.value.data)) bus.fire('showMenu', {show: true});
                bus.fire("mainModalClose")
             }
            }>{attributes.title}</ModalHeader>
            {this._createForm()}
        </div>
    );
  }

}

registerDocument('modalForm', ModalForm);

export default ModalForm;
