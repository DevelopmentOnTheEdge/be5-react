import React, {useState, useEffect} from 'react';
import {Modal, ModalHeader, Spinner} from "reactstrap";
import * as PropTypes from "prop-types";
import be5 from "../../be5";


const ProcessingOperationPopUp = ({isOpen, message}) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    useEffect(() => {
        setModal(isOpen);
    }, [isOpen])

    return (
        <>
            <Modal isOpen={modal} toggle={toggle} backdrop={'static'} contentClassName="op-in-progress-modal-css">
                <ModalHeader toggle={toggle} >
                    {message || be5.messages.opInProgress}
                </ModalHeader>
                <span className="d-block text-center pb-3"><Spinner color="dark"/></span>
            </Modal>
        </>
    )
}

ProcessingOperationPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    message: PropTypes.string
}
ProcessingOperationPopUp.defaultProps = {
    isOpen: false,
}

export default ProcessingOperationPopUp;