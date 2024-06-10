import React, { useState, useEffect, useRef } from 'react';
import bus from '../core/bus';
import Document from '../containers/Document';
import Alert from 'react-s-alert';
import { Modal } from 'reactstrap';
import { MAIN_MODAL_DOCUMENT } from "../constants";

const Be5Components = (props) => {
  const [modal, setModal] = useState(false);
  const [className, setClassName] = useState(props.className);
  const documentRef = useRef(null);

  const open = () => {
    setClassName(null);
    setModal(true);
  };

  const close = () => {
    setModal(false);
  };

  const setModalDialogClassName = (params) => {
    setClassName(params.className);
  };

  useEffect(() => {
    bus.listen("mainModalClose", close);
    bus.listen("mainModalOpen", open);
    bus.listen("setModalDialogClassName", setModalDialogClassName);

    bus.listen("alert", (data) => {
      if (data.timeout == null || data.timeout > 0) {
        const alertConfig = {
          position: 'top-right',
          timeout: data.timeout > 0 ? 1000 * data.timeout : 5000
        };

        if (data.type === 'error') {
          Alert.error(data.msg, alertConfig);
        } else {
          Alert.success(data.msg, alertConfig);
        }
      }
    });
  }, []);

  return (
    <div>
      <Alert stack={{ limit: 10 }} html={true} />
      <Modal isOpen={modal} toggle={close} className={className} backdrop={"static"}>
        <Document ref={documentRef} frontendParams={{ documentName: MAIN_MODAL_DOCUMENT }} />
      </Modal>
    </div>
  );
}

export default Be5Components;
