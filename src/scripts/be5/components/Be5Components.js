import React from 'react';
import {connect} from 'react-redux'
import bus from '../core/bus';
import Document from '../containers/Document';
import Alert from 'react-s-alert';
import {Modal} from 'reactstrap';
import {MAIN_MODAL_DOCUMENT} from "../constants";


class Be5Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this.setState({modal: true});
  }

  close() {
    this.setState({modal: false});
  }

  componentDidMount() {
    bus.listen("mainModalClose", this.close);
    bus.listen("mainModalOpen", this.open);

    bus.listen("alert", data => {
      if (data.type === 'error') {
        Alert.error(data.msg, {
          position: 'top-right',
          timeout: data.timeout > 0 ? 1000 * data.timeout : 5000
        });
      } else {
        Alert.success(data.msg, {
          position: 'top-right',
          timeout: data.timeout > 0 ? 1000 * data.timeout : 5000
        });
      }
    });
  }

  render() {
    return (
      <div>
        <Alert stack={{limit: 10}} html={true}/>
        <Modal isOpen={this.state.modal} toggle={this.close} className={this.props.className} backdrop={"static"}>
          <Document ref="document" frontendParams={{documentName: MAIN_MODAL_DOCUMENT}}/>
        </Modal>
      </div>
    );

  }

}

export default Be5Components;
