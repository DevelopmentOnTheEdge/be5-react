import React, {useEffect, useState} from 'react';
import * as PropTypes from "prop-types";

const ShowMenu = (props) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        setShow(props.show);
    }, [props.show])

    return show ? props.children : <div className={"d-none"}>{props.children}</div>
}

ShowMenu.propTypes = {
    show: PropTypes.bool.isRequired,
}

ShowMenu.defaultProps = {
    show: true,
}

export default ShowMenu