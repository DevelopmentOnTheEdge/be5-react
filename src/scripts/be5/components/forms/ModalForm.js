import React           from 'react';
import be5             from '../../be5';
import bus             from '../../core/bus';
import classNames      from 'classnames';
import Form            from './Form';
import PropertySet     from 'beanexplorer-react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {registerDocument} from '../../core/documents';


class ModalForm extends Form
{
  render() {
    const attributes = this.state.data.attributes;
    return (
      <div>
        <ModalHeader tag='h5' toggle={() => bus.fire("mainModalClose")} >{attributes.title}</ModalHeader>
        <form
          id={this.state.meta._ts_}
          onSubmit={this._applyOnSubmit}
          className={classNames(
            'form-modal',
            this.state.wasValidated ? 'was-validated' : '',
            attributes.layout.formClassName
          )}
        >
          <ModalBody>
            <PropertySet
              bean={attributes.bean}
              onChange={this._onFieldChange}
              localization={be5.messages.property}
              bsSize={attributes.layout.bsSize}
            />
          </ModalBody>
          <div className="col-12">
            {this._getErrorPane()}
          </div>
          <ModalFooter>
            {this._createOkAction()}
          </ModalFooter>
        </form>
      </div>
    );
  }

}

registerDocument('modalForm', ModalForm);

export default ModalForm;
