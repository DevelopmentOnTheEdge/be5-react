import React from 'react';
import { registerTableBox } from "../../../core/registers/tableBoxes";

const JsonFormatTableBox = ({ value }) => {
  const { columns, rows, parameters, layout } = value.data.attributes;
  const names = columns.map(col => col.name);
  const array = rows.map(row => {
    const obj = {};
    names.forEach((name, idx) => {
      if (row.cells.length - 1 >= idx) {
        obj[name] = row.cells[idx].content;
      }
    });
    return obj;
  });

  const prettyJson = parameters._prettyJson_ === 'yes' || layout._prettyJson_ === 'yes';
  const content = prettyJson ? (
    <pre className="jsonTableBox" dangerouslySetInnerHTML={{ __html: JSON.stringify(array, null, 4) }} />
  ) : (
    <div className="jsonTableBox" dangerouslySetInnerHTML={{ __html: JSON.stringify(array) }} />
  );

  return content;
};

registerTableBox('json', JsonFormatTableBox);

export default JsonFormatTableBox;