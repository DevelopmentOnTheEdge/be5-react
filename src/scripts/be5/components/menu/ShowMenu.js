import React, {useEffect, useState} from 'react';
import bus from "../../core/bus";

const ShowMenu = (props) => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        bus.listen('showMenu', data => setShow(data.show));
    }, [])

    return show ? props.children : <div className={"d-none"}>{props.children}</div>
}

export default ShowMenu