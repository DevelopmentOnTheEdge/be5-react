import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


class BootstrapModal extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);

  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  close() {
    this.setState({ modal: false });
  }

  open() {
    this.setState({ modal: true });
  }
  
  render() {
    let confirmButton = null;
    let cancelButton = null;
    let restoreButton = null;

    if (this.props.confirm) {
      confirmButton = (
        <Button color="primary" onClick={()=>{this.props.onConfirm && this.props.onConfirm()}}>{this.props.confirm}</Button>
      );
    }
    
    if (this.props.cancel) {
      cancelButton = (
        <Button color="default" onClick={() => {this.props.onCancel && this.props.onCancel()}}>{this.props.cancel}</Button>
      );
    }

    // Attempt to introduce a button to restore password
    // if (this.props.restore) {
    //   restoreButton = (
    //     <Button color="default" onClick={this._restore}>{this.props.restore}</Button>
    //   );
    // }

    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>{this.props.title}</ModalHeader>
        <ModalBody>
          {this.props.children}
        </ModalBody>
        <ModalFooter>
          {restoreButton}{' '}
          {cancelButton}{' '}
          {confirmButton}
        </ModalFooter>
      </Modal>

    );
  }

 // _restore() {
 //    this.props.onRestore && this.props.onRestore();
 //  }
}

export default BootstrapModal;