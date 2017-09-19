import React          from 'react';
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
      {title: 'Адреса', url: '#!table/occupancies/For companies'},
      {title: 'Документ-основание', url: '#!table/contractor/All records'},
    ];

    //move selectCompany to Адреса и Документ-основание?
    return (
      <div>
        <div className="float-right selectCompany">
          <span className="selectCompany__label">Выбор организации</span>
          <Document documentName={"formSelectCompany"} onChange={()=>{
            this.refresh()
          }} />
        </div>
        <h1 style={{marginBottom: 13 + 'px'}}>Организация</h1>
        <Navs ref="navs" steps={steps} tabs startAtStep={0} />
      </div>
    );
  }

}

be5.registerAction('companies', (documentName) =>{
  changeDocument(documentName, { component: Companies, value: {} })
});
