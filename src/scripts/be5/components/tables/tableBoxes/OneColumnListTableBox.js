import React from 'react';
import { registerTableBox } from "../../../core/registers/tableBoxes";
import TablePagination from "../TablePagination";

const OneColumnListTableBox = ({ value, ...props }) => {
  const list = value.data.attributes.rows.map((col, idx) => (
    <li key={idx} dangerouslySetInnerHTML={{ __html: col.cells[0].content }} />
  ));

  return (
    <div>
      <ul className="listTableBox">
        {list}
      </ul>
      <TablePagination value={value} {...props} />
    </div>
  );
};

registerTableBox('oneColumnList', OneColumnListTableBox);

export default OneColumnListTableBox;