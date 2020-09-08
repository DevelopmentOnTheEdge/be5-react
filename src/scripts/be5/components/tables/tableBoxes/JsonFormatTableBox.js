import React, {Component} from 'react';
import {registerTableBox} from "../../../core/registers/tableBoxes";

class JsonFormatTableBox extends Component {
    render() {
        const {columns, rows} = this.props.value.data.attributes;
        const names = columns.map(col => col.name);
        const array = rows.map(row => {
            const obj = {};
            names.forEach((name, idx) => {
                if (row.cells.length - 1 >= idx) {
                    obj[name] = row.cells[idx].content;
                }
            })
            return obj;
        })
        return (
            <div  className="jsonTableBox" dangerouslySetInnerHTML={{__html:JSON.stringify(array)}}/>
        );
    }
}

registerTableBox('json', JsonFormatTableBox);

export default JsonFormatTableBox;
