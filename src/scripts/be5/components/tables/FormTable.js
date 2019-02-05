import React from 'react';
import PropTypes from 'prop-types';
import Document from '../../containers/Document';
import TableForm from './TableForm';
import HelpInfo from "../HelpInfo";
import {registerDocument} from '../../core/registers/documents';


class FormTable extends TableForm {
  render() {
    return (
      <div className="form-table">
        <Document frontendParams={{documentName: "form", parentDocumentName: "table"}}/>
        <HelpInfo value={this.props.value.data.attributes.layout.helpInfo}/>
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} type="table"/>
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
