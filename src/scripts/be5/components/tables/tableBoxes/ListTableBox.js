import React, {Component} from 'react';
import {registerTableBox} from "../../../core/registers/tableBoxes";
import TablePagination from "../TablePagination";


class OneColumnListTableBox extends Component {
  render() {
    const list = this.props.value.data.attributes.rows.map((col, idx) => {
      return <li key={idx} dangerouslySetInnerHTML={{__html: col.cells[0].content}}/>;
    });

    return (
      <div>
        <ul className="listTableBox">
          {list}
        </ul>
        <TablePagination {...this.props}/>
      </div>
    );
  }
}

registerTableBox('oneColumnList', OneColumnListTableBox);

export default OneColumnListTableBox;
