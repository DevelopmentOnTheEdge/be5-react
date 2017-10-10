import React          from 'react';
import be5            from '../be5';
import Navs           from '../components/navs';
import changeDocument from '../core/changeDocument';


class Services extends React.Component
{
  render()
  {
    const steps = [
      {title: be5.messages.welfareGroups__General_information, url: '#!table/welfareGroups/General information'},
      {title: be5.messages.companies2welfareGroups__All_records, url: '#!table/companies2welfareGroups/All records'},
      {title: be5.messages.welfareTypes__General_information, url: '#!table/welfareTypes/General information'},
      {title: be5.messages.localMSZ__Info_For_Egisso, url: '#!table/localMSZ/Info For Egisso'},
      {title: be5.messages.localNPA__All_records, url: '#!table/localNPA/All records'},
      {title: be5.messages.assignmentRules__All_records, url: '#!table/assignmentRules/All records'},
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
