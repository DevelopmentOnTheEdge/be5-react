import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import Document       from '../document';
import Table          from './table';
import Tables         from '../../services/tables';
import changeDocument from '../../core/changeDocument';
import formAction     from '../../actions/form';
import {HtmlResult}   from '../../components/forms/form';
import StaticPage     from '../../components/staticPage';


class TableForm extends React.Component
{
  constructor(){
    super();
    this.onChange = this.onChange.bind(this);
  }

  componentDidUpdate(){
    console.log("componentDidUpdate");
    this.updateDocuments();
  }

  componentDidMount(){
    this.updateDocuments();
  }

  updateDocuments(){
    const attributes = this.props.value.data.attributes;
    changeDocument("table", { component: Table, value: this.props.value });
    if(attributes.layout.defaultOperation !== undefined){
      console.log("attributes.layout.defaultOperation: " + attributes.layout.defaultOperation);
      changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', '')});
      formAction("form",
        attributes.category, attributes.page, attributes.layout.defaultOperation,
        attributes.parameters, attributes.onChange
      );
    }else{
      console.log("!attributes.layout.defaultOperation");
      changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', attributes.layout.textInFormDocument)});
    }

  }

  onChange(){
    const value = this.props.value;
    Tables.load({
      entity: value.data.attributes.category,
      query: value.data.attributes.page,
      params: value.data.attributes.parameters},
      (data, documentName) =>{
        changeDocument(documentName, { component: Table, value: data });
      }, "table");
  }

  render() {
    return (<div className="table-form">
      <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
      <Document documentName={"form"} onChange={this.onChange} />
     </div>);
  }

}

export default TableForm;
