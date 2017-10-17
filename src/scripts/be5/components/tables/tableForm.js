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
    this.state = {};
    this.onChange = this.onChange.bind(this);
    this.tableInfo = this.tableInfo.bind(this);
  }

  componentDidUpdate(){
    //console.log("TableForm componentDidUpdate");
    this.updateDocuments();
  }

  componentDidMount(){
    this.updateDocuments();
  }

  updateDocuments(){
    const attributes = this.props.value.data.attributes;
    changeDocument("table", { component: Table, value: this.props.value });
    if(this.state.tableInfo === undefined && attributes.layout.tableInfo !== undefined)
    {
      be5.url.process("table-form-info", "#!static/" + attributes.layout.tableInfo);
      this.setState({tableInfo: attributes.layout.tableInfo});
    }

    if(attributes.layout.defaultOperation !== undefined){
      //console.log("attributes.layout.defaultOperation: " + attributes.layout.defaultOperation);
      //TODO вместо замены старой формы на StaticPage.createValue('', ''), делать все поля READ_ONLY и кнопку disabled
      //changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', '')}); - баг форма пропадает, ошибки обновления
      formAction("form",
        attributes.category, attributes.page, attributes.layout.defaultOperation,
        attributes.parameters, attributes.onChange
      );
    }else{
        changeDocument("form", {
          component: StaticPage,
          value: StaticPage.createValue('', attributes.layout.textInFormDocument || "")
        });
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

  tableInfo(){
    const attributes = this.props.value.data.attributes;
    if(attributes.layout.tableInfo !== undefined) {
      return (
        <div className="clearfix max-width-970">
          <button className="btn btn-sm btn-info" type="button" data-toggle="collapse"
                  data-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
            Справка
          </button>
          <div className="collapse" id="collapse1">
            <div className="alert alert-success" role="alert">
              <Document documentName={"table-form-info"} />
            </div>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="table-form">
        <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
        {this.tableInfo()}
        <Document documentName={"form"} onChange={this.onChange} />
      </div>
    );
  }

}

export default TableForm;
