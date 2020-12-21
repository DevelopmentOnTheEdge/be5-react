import React, {useEffect, useState} from 'react';
import * as PropTypes from "prop-types";
import ProcessingOperationPopUp from "../forms/ProcessingOperationPopUp";

const ShowMenu = (props) => {
    const [showMenu, setShowMenu] = useState(true);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        setShowMenu(props.menu);
    }, [props.menu]);

    useEffect(() => {
        setShowPopup(props.popup);
    }, [props.popup]);

    if (showMenu) {
        return props.children;
    } else {
        return <>
                   <div className={"d-none"}>{props.children}</div>
                   <ProcessingOperationPopUp isOpen={showPopup}/>
               </>
    }
}

ShowMenu.propTypes = {
    menu: PropTypes.bool.isRequired,
    popup: PropTypes.bool.isRequired,
}

ShowMenu.defaultProps = {
    menu: true,
    popup: false,
}

export default ShowMenu