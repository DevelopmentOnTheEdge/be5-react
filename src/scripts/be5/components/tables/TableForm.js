import React            from 'react';
import PropTypes        from 'prop-types';
import Document         from '../../containers/Document';
import changeDocument   from '../../core/changeDocument';
import HelpInfo         from '../../components/HelpInfo';
import {registerDocument} from '../../core/documents';


class TableForm extends React.Component
{
  componentDidUpdate(){
    this.updateDocuments();
  }

  componentDidMount(){
    this.updateDocuments();
  }

  updateDocuments(){
    changeDocument("form", { value: null } );
    changeDocument("table", { value: this.props.value });
  }

  render() {
    return (
      <div className="table-form">
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} type="table" />
        <HelpInfo value={this.props.value.data.attributes.layout.helpInfo} />
        <Document frontendParams={{documentName: "form", parentDocumentName: "table"}} />
      </div>
    );
  }

}

TableForm.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('tableForm', TableForm);

export default TableForm;
