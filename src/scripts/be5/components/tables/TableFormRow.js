import React            from 'react';
import PropTypes        from 'prop-types';
import Document         from '../../containers/Document';
import TableForm        from './TableForm';
import {registerDocument} from '../../core/documents';


class TableFormRow extends TableForm
{
  render() {
    return (
      <div className="row">
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "form", parentDocumentName: "table"}} />
        </div>
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} type="table" />
        </div>
      </div>
    );
  }

}

TableFormRow.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('tableFormRow', TableFormRow);

export default TableFormRow;
