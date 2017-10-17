import React              from 'react';
import be5                from '../../be5';
import Document           from '../document';
import TableForm          from './tableForm';
import TablesCollections  from '../../services/tablesCollections';


class AddressesTable extends TableForm
{
  componentDidMount(){
    super.componentDidMount();
    be5.url.process("formSelectCompany", "#!form/companies/Selection view SelectCompany/SelectCompany");
  }

  render() {
    return (
      <div className="addresses-table-form">
        <div className="selectCompany">
          <span className="selectCompany__label">Выбор организации</span>
          <Document documentName={"formSelectCompany"} onChange={()=>{
            super.updateDocuments();
            super.onChange();
          }} />
        </div>
        <Document documentName={"table"} operationDocumentName={"form"} onChange={this.onChange}/>
        {super.tableInfo()}
        <Document documentName={"form"} onChange={this.onChange} />
      </div>
    );
  }

}

TablesCollections.registerTable("addressesTable", AddressesTable);