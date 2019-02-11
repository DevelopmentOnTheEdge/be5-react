import React from 'react';
import be5 from "../be5";
import Navs from "../components/Navs";
import {registerDocument} from "../core/registers/documents";
import {registerRoute} from "../core/registers/routes";
import changeDocument from "../core/changeDocument";


const SystemCard = (props) => {
  const {title, documentName, page} = props.value.data.attributes;
  const pageID = parseInt(page || 0);
  be5.ui.setTitle(title + " " + (pageID + 1));
  const steps = [
    {title: 'Cache', url: '#!table/_system_/Cache'},
    {title: 'Daemons', url: '#!table/_system_/Daemons'},
    {title: 'DataSource', url: '#!table/_system_/DataSource'},
    {title: 'Entities', url: '#!table/_system_/Entities'},
    {title: 'Http Headers', url: '#!table/_system_/Http Headers'},
    {title: 'Session', url: '#!table/_system_/Session variables'},
    {title: 'Properties', url: '#!table/_system_/System properties'},
    {title: 'System Settings', url: '#!table/systemSettings/All%20records'},
    {title: 'Threads', url: '#!table/_system_/Threads'},
    {title: 'UI panel', url: '#!uiPanel'},
  ];

  return (
    <div className="info-card">
      <h1 style={{marginBottom: 13 + 'px'}}>{title}</h1>
      <Navs
        steps={steps}
        tabs
        startAtStep={pageID}
        baseUrl={"systemCard"}
        parentDocumentName={documentName}
      />
    </div>
  );
};

registerDocument('SystemCard', SystemCard);

registerRoute('systemCard', (frontendParams, page) => {
  const url = "systemCard" + ((page !== undefined && page !== "0") ? ("/" + page) : "");
  changeDocument(frontendParams.documentName, {
    value: {
      data: {
        attributes: {
          title: "System card",
          documentName: frontendParams.documentName,
          page: page,
        },
        links: {self: url}
      }
    },
    frontendParams: {type: 'SystemCard'}
  })
});
