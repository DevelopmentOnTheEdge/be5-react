import React            from 'react';
import PropTypes        from 'prop-types';
import be5              from '../../be5';
import tablesCollection from '../../services/tablesCollection';
import Document         from '../Document';
import Table            from './Table';
import changeDocument   from '../../core/changeDocument';
import formService      from '../../services/forms';
import StaticPage       from '../../components/StaticPage';
import HelpInfo         from '../../components/HelpInfo';


class TableForm extends React.Component
{
  constructor(){
    super();
    this.state = {helpCollapse: false};
  }

  componentDidUpdate(){
    this.updateDocuments();
  }

  componentDidMount(){
    this.updateDocuments();
  }

  updateDocuments(){

    changeDocument("table", { component: Table, value: this.props.value });

    //unused
    // const attr = this.props.value.data.attributes;
    // if(attr.layout.defaultOperation !== undefined){
    //   //console.log("attributes.layout.defaultOperation: " + attributes.layout.defaultOperation);
    //   //TODO вместо замены старой формы на StaticPage.createValue('', ''), делать все поля READ_ONLY и кнопку disabled
    //   //changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', '')}); - баг форма пропадает, ошибки обновления
    //
    //   const params = {
    //     entity: attr.category,
    //     query: attr.page || 'All records',
    //     operation: attr.layout.defaultOperation,
    //     values: {},
    //     operationParams: attr.parameters
    //   };
    //
    //   formService.load(params, {documentName: "form", parentDocumentName: "table"});
    // }else{
    //   changeDocument("form", {
    //     component: StaticPage,
    //     value: StaticPage.createValue('', attr.layout.textInFormDocument || "")
    //   });
    // }

  }

  render() {
    return (
      <div className="table-form">
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} />
        <HelpInfo value={this.props.value.data.attributes.layout.helpInfo} />
        <Document frontendParams={{documentName: "form"}} />
      </div>
    );
  }

  refresh() {
    if(this.props.value.links.self !== undefined) {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.links.self);
    }
  }

}

tablesCollection.registerTable('tableForm', TableForm);

export default TableForm;
