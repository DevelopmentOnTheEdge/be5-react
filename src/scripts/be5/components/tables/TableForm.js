import React            from 'react';
import PropTypes        from 'prop-types';
import be5              from '../../be5';
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
    changeDocument("form", { value: "" } );
    changeDocument("table", { value: this.props.value });
  }

  render() {
    return (
      <div className="table-form">
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} documentType="table" />
        <HelpInfo value={this.props.value.data.attributes.layout.helpInfo} />
        <Document frontendParams={{documentName: "form"}} />
      </div>
    );
  }

  refresh() {
    if(this.props.value.data.links.self !== undefined) {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.data.links.self);
    }
  }

}

TableForm.propTypes = {
  value: PropTypes.object.isRequired,
  frontendParams: PropTypes.object.isRequired
};

registerDocument('tableForm', TableForm);

export default TableForm;
