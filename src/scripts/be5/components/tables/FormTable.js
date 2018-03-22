import React            from 'react';
import PropTypes        from 'prop-types';
import Document         from '../../containers/Document';
import TableForm        from './TableForm';
import {registerDocument} from '../../core/documents';
import Table from "./Table";


class FormTable extends TableForm {

  render() {
    const {
      frontendParams,
      value
    } = this.props;

    return (
      <div className="form-table">
        <Document frontendParams={{documentName: "form"}} />
        <Table frontendParams={{documentName: frontendParams.documentName, operationDocumentName: "form"}} value={value}/>
     </div>
    );
  }

}

FormTable.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('formTable', FormTable);

export default FormTable;
