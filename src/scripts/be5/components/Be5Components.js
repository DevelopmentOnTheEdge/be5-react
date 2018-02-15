import React, { Component } from 'react';
import bus from '../core/bus';
import be5 from '../be5';
import Document from './Document';
import Alert from 'react-s-alert';
import { Modal } from 'reactstrap';


class Be5Components extends Component
{
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
    this.open = this.open.bind(this);

    this.onChange = this.onChange.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  open() {
    this.setState({ modal: true });
  }

  componentDidMount() {
    bus.listen("mainModalToggle", this.toggle );
    bus.listen("mainModalOpen", this.open );

    bus.listen("alert", data => {
      if (data.type === 'error') {
        Alert.error(data.msg, {
          position: 'top-right',
          timeout: 5000
        });
      } else {
        Alert.success(data.msg, {
          position: 'top-right',
          timeout: 5000
        });
      }
    });
  }

  onChange(){
    //todo
    console.log(this.props, this.state);
  }

  render() {
    return (
      <div>
        <Alert stack={{limit: 10}}/>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <Document ref="document" frontendParams={{documentName: be5.mainModalDocumentName}}/>
        </Modal>
      </div>
    );

  }

  refresh(){

  }

}

export default Be5Components;