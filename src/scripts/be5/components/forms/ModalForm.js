import React           from 'react';
import be5             from '../../be5';
import bus             from '../../core/bus';
import Form            from './Form';
import PropertySet     from 'beanexplorer-react';
import { ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class ModalForm extends Form
{
  // componentDidMount(){
  //   this.initForm();
  // }

  render() {
    const attributes = this.state.data.attributes;
    return (
      <div>
        <ModalHeader tag='h5' toggle={() => bus.fire("mainModalClose")} >{attributes.title}</ModalHeader>
        <form
          onSubmit={this._applyOnSubmit}
          className={this.state.wasValidated ? 'was-validated' : ''}
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

be5.ui.forms.registerForm('modal', ModalForm);

export default ModalForm;