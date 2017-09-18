import React          from 'react';
import PropTypes from 'prop-types';
import be5                  from '../be5';
import Document             from '../components/document';
import Navs             from '../components/navs';
import changeDocument from '../core/changeDocument';


class Companies extends React.Component
{
  constructor(props) {
    super(props);

    this.refresh = this.refresh.bind(this);
  }

  componentDidMount(){
    be5.url.process("formSelectCompany", "#!form/companies/Selection view SelectCompany/SelectCompany");
  }

  refresh() {
    this.refs.navs.refresh();
  }

  render() {
    const steps = [
      {title: 'Общие сведения', url: '#!table/companies/Общие сведения'},
      {title: 'Адреса', url: '#!addresses'},
      {title: 'Документ-основание', url: '#!table/contractor/All records'},
    ];

    return (
      <div>
        <div className="float-right">
          <span>Выбор компании</span>
          <Document documentName={"formSelectCompany"} onChange={()=>{
            this.refresh()
          }} />
        </div>
        <h1 style={{marginBottom: 9 + 'px'}}>Организация</h1>
        <Navs ref="navs" steps={steps} tabs startAtStep="0"/>
      </div>
    );
  }

}

be5.registerAction('companies', (documentName) =>{
  changeDocument(documentName, { component: Companies, value: {} })
});
