import React from 'react';
import be5 from "../be5";
import Navs from "../components/Navs";
import {registerDocument} from "../core/registers/documents";
import {registerRoute} from "../core/registers/routes";
import changeDocument from "../core/changeDocument";
import {getDocumentState, setDocumentState} from "../services/documentStates";

const SystemCard = (props) => {
  const {title} = props.value;
  be5.ui.setTitle(title);
  const steps = [
    {title: 'Cache', url: '#!table/_system_/Cache'},
    {title: 'Session', url: '#!table/_system_/Session variables'},
    {title: 'System Settings', url: '#!table/systemSettings/All%20records'},
    {title: 'Daemons', url: '#!table/_system_/Daemons'},
    {title: 'DataSource', url: '#!table/_system_/DataSource'},
    {title: 'Http Headers', url: '#!table/_system_/Http Headers'},
    {title: 'Properties', url: '#!table/_system_/System properties'},
    {title: 'Threads', url: '#!table/_system_/Threads'},
    {title: 'UI panel', url: '#!uiPanel'},
  ];

  return (
    <div className="info-card">
      <h1 style={{marginBottom: 13 + 'px'}}>{title}</h1>
      <Navs
        steps={steps}
        tabs
        onOpenNav={id => setDocumentState("#!systemCard", id)}
        startAtStep={getDocumentState("#!systemCard") || 0}
      />
    </div>
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', (frontendParams) => {
  changeDocument(frontendParams.documentName, {
    value: {
      title: "System card"
    },
    frontendParams: {type: 'SystemCard'}
  })
});
