import React          from 'react';
import PropTypes      from 'prop-types';
import be5            from '../../be5';
import Document       from '../Document';
import Table          from './table';
import changeDocument from '../../core/changeDocument';
import formService           from '../../services/forms';
import StaticPage     from '../../components/staticPage';
import { Collapse, Button } from 'reactstrap';


class TableForm extends React.Component
{
  constructor(){
    super();
    this.state = {helpCollapse: false};
    this.tableInfo = this.tableInfo.bind(this);
    this.helpCollapseToggle = this.helpCollapseToggle.bind(this);
  }

  helpCollapseToggle() {
    this.setState({ helpCollapse: !this.state.helpCollapse });
  }

  componentDidUpdate(){
    //console.log("TableForm componentDidUpdate");
    this.updateDocuments();
  }

  componentDidMount(){
    this.updateDocuments();
  }

  updateDocuments(){
    const attr = this.props.value.data.attributes;
    changeDocument("table", { component: Table, value: this.props.value });
    if(this.state.tableInfo === undefined && attr.layout.tableInfo !== undefined)
    {
      be5.url.process("table-form-info", "#!static/" + attr.layout.tableInfo);
      this.setState({tableInfo: attr.layout.tableInfo});
    }

    if(attr.layout.defaultOperation !== undefined){
      //console.log("attributes.layout.defaultOperation: " + attributes.layout.defaultOperation);
      //TODO вместо замены старой формы на StaticPage.createValue('', ''), делать все поля READ_ONLY и кнопку disabled
      //changeDocument("form", { component: StaticPage, value: StaticPage.createValue('', '')}); - баг форма пропадает, ошибки обновления

      const params = {
        entity: attr.category,
        query: attr.page || 'All records',
        operation: attr.layout.defaultOperation,
        values: {},
        operationParams: attr.parameters
      };

      formService.load(params, {documentName: "form", parentDocumentName: "table"});
    }else{
        changeDocument("form", {
          component: StaticPage,
          value: StaticPage.createValue('', attr.layout.textInFormDocument || "")
        });
    }

  }
  //
  // onChange(){
  //   const value = this.props.value;
  //   Tables.load({
  //     entity: value.data.attributes.category,
  //     query: value.data.attributes.page,
  //     params: value.data.attributes.parameters},
  //     (data, documentName) =>{
  //       changeDocument(documentName, { component: Table, value: data });
  //     }, "table");
  // }

  tableInfo(){
    const attributes = this.props.value.data.attributes;
    if(attributes.layout.tableInfo !== undefined) {
      return (
        <div className="clearfix max-width-970">
          <Button color="info" className="btn-sm" onClick={this.helpCollapseToggle} style={{ marginBottom: '1rem' }}>
            {be5.messages.helpInfo}
          </Button>
          <Collapse isOpen={this.state.helpCollapse}>
            <div className="alert alert-success" role="alert">
              <Document frontendParams={{documentName: "table-form-info"}} />
            </div>
          </Collapse>
        </div>
      )
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="table-form">
        <Document frontendParams={{documentName: "table", operationDocumentName: "form"}} onChange={this.onChange}/>
        {this.tableInfo()}
        <Document frontendParams={{documentName: "form"}} onChange={this.onChange} />
      </div>
    );
  }

  refresh() {
    if(this.props.value.links.self !== undefined) {
      be5.url.process(this.props.frontendParams.documentName, "#!" + this.props.value.links.self);
    }
  }

}

export default TableForm;
