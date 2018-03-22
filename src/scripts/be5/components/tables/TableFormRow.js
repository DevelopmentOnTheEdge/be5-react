import React            from 'react';
import PropTypes        from 'prop-types';
import Document         from '../../containers/Document';
import TableForm        from './TableForm';
import {registerDocument} from '../../core/documents';
import Table from "./Table";


class TableFormRow extends TableForm {

  render() {
    const {
      frontendParams,
      value
    } = this.props;

    return (
      <div className="row">
        <div className="col-lg-6">
          <Table frontendParams={{documentName: frontendParams.documentName, operationDocumentName: "form"}} value={value}/>
        </div>
        <div className="col-lg-6">
          <Document frontendParams={{documentName: "form"}} />
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
