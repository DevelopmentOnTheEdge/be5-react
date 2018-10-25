import React from 'react';
import be5 from "../be5";
import Navs from "../components/Navs";
import {registerDocument} from "../core/documents";
import {registerRoute} from "../core/routes";
import changeDocument from "../core/changeDocument";


const SystemCard = (props) =>
{
  const {title} = props.value;
  be5.ui.setTitle(title);
  const steps = [
    {title: 'Cache', url: '#!table/_system_/Cache'},
    {title: 'Daemons', url: '#!table/_system_/Daemons'},
    {title: 'Entities', url: '#!table/_system_/Entities'},
    {title: 'Session variables', url: '#!table/_system_/Session variables'},
    {title: 'Query builder', url: '#!queryBuilder'},
  ];

  return (
    <div className="info-card">
      <h1 style={{marginBottom: 13 + 'px'}}>{title}</h1>
      <Navs steps={steps} tabs startAtStep={0} />
    </div>
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', (documentName) => {
    changeDocument(documentName, {
      value: {title: "System card"},
      frontendParams: {type: 'SystemCard'}
    })
});
