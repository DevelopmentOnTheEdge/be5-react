import React          from 'react';
import be5            from '../be5';
import Navs           from '../components/navs';
import changeDocument from '../core/changeDocument';


class Services extends React.Component
{
  render()
  {
    const steps = [
      {title: 'Группы МСП', url: '#!table/welfareGroups/General information'},
      {title: 'Территория предоставления услуг', url: '#!table/companies2welfareGroups/All records'},
      {title: 'Виды МСП', url: '#!table/welfareTypes/General information'},
      {title: 'Сведения для ЕГИССО', url: '#!table/localMSZ/Info For Egisso'},
      {title: 'НПА', url: '#!table/localNPA/All records'},
      {title: 'Правила приема документов', url: '#!table/assignmentRules/All records'},
    ];

    return (
      <div>
        <h1>Услуги - Общие сведения</h1>
        <Navs steps={steps} tabs startAtStep={0} />
      </div>
    );
  }

}

be5.registerAction('services', (documentName) =>{
  changeDocument(documentName, { component: Services, value: {} })
});
