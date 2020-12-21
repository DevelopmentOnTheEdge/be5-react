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
import {showMenuEvent} from "../../utils/documentUtils";


class ModalForm extends Form {

    constructor(props) {
        super(props);
        this.escListener = this.escListener.bind(this);
    }

    escListener(e){
        if (e.key === "Escape" || e.keyCode === 27){
            showMenuEvent(this.props.value.data, true);
        }
    }

    componentDidMount() {
        super.componentDidMount();
        document.addEventListener('keydown', this.escListener, false);
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        document.removeEventListener('keydown', this.escListener, false);
    }

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
                  showMenuEvent(this.props.value.data, true);
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
                showMenuEvent(this.props.value.data, true);
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
